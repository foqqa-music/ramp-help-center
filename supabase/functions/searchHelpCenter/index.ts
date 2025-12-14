import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ZendeskArticle {
  id: number;
  title: string;
  snippet: string;
  html_url: string;
}

interface ZendeskSearchResponse {
  results: ZendeskArticle[];
  count: number;
}

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      console.error("Missing or invalid query parameter");
      return new Response(
        JSON.stringify({ error: "Missing or invalid query parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Searching Zendesk Help Center for:", query);

    // Step 1: Call Zendesk Help Center API
    const zendeskUrl = `https://ramp.zendesk.com/api/v2/help_center/articles/search?query=${encodeURIComponent(query)}`;
    
    const zendeskResponse = await fetch(zendeskUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!zendeskResponse.ok) {
      console.error("Zendesk API error:", zendeskResponse.status, await zendeskResponse.text());
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Zendesk Help Center" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const zendeskData: ZendeskSearchResponse = await zendeskResponse.json();
    console.log("Zendesk returned", zendeskData.count, "results");

    // Step 2: Extract top 5 articles
    const topArticles: SearchResult[] = zendeskData.results.slice(0, 5).map((article) => ({
      title: article.title,
      snippet: article.snippet.replace(/<[^>]*>/g, ""), // Strip HTML tags
      url: article.html_url,
    }));

    if (topArticles.length === 0) {
      console.log("No articles found for query");
      return new Response(
        JSON.stringify({
          answer: "I couldn't find any relevant help articles for your question. Please try rephrasing your query or contact support directly.",
          sources: [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 3: Prepare context for LLM
    const articleContext = topArticles
      .map((article, index) => `Article ${index + 1}: "${article.title}"\nContent: ${article.snippet}\nURL: ${article.url}`)
      .join("\n\n");

    const systemPrompt = `You are a helpful customer support assistant for Ramp. Answer the user's question based on the help articles provided below. Be concise and helpful. Always cite which articles you used by referencing their titles.

Help Articles:
${articleContext}`;

    console.log("Calling Lovable AI with context from", topArticles.length, "articles");

    // Step 4: Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const answer = aiData.choices?.[0]?.message?.content || "Unable to generate an answer.";

    console.log("Successfully generated AI answer");

    // Step 5: Return the answer and sources
    return new Response(
      JSON.stringify({
        answer,
        sources: topArticles,
        query,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in searchHelpCenter function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
