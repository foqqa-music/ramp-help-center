import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const snitcherApiKey = Deno.env.get('SNITCHER_API_KEY');
    
    if (!snitcherApiKey) {
      console.error('SNITCHER_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Snitcher API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get visitor IP from request headers or body
    let visitorIp: string | null = null;
    
    // Try to get IP from various headers (set by proxies/load balancers)
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    if (forwardedFor) {
      visitorIp = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
      visitorIp = realIp;
    } else if (cfConnectingIp) {
      visitorIp = cfConnectingIp;
    }

    // Also check if IP was passed in body (for testing purposes)
    try {
      const body = await req.json();
      if (body.ip) {
        visitorIp = body.ip;
      }
    } catch {
      // No body or invalid JSON, continue with header-based IP
    }

    if (!visitorIp) {
      console.log('No visitor IP detected');
      return new Response(
        JSON.stringify({ identified: false, reason: 'No IP detected' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Looking up IP: ${visitorIp}`);

    // Call Snitcher API - correct endpoint per docs
    const snitcherResponse = await fetch(`https://api.snitcher.com/company/find?ip=${encodeURIComponent(visitorIp)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${snitcherApiKey}`,
        'Accept': 'application/json',
      },
    });

    if (!snitcherResponse.ok) {
      const errorText = await snitcherResponse.text();
      console.error(`Snitcher API error: ${snitcherResponse.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ identified: false, reason: 'Snitcher API error', status: snitcherResponse.status }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const snitcherData = await snitcherResponse.json();
    console.log('Snitcher response:', JSON.stringify(snitcherData));

    // Check if company was identified
    if (snitcherData.company) {
      return new Response(
        JSON.stringify({
          identified: true,
          company: {
            name: snitcherData.company.name || null,
            industry: snitcherData.company.industry || null,
            size: snitcherData.company.employee_range || snitcherData.company.size || null,
            domain: snitcherData.company.domain || null,
            logo: snitcherData.company.logo || null,
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ identified: false, reason: 'No company found' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in identifyVisitor function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage, identified: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
