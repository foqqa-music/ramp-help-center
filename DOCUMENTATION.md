# Ramp Help Center - Codebase Documentation

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **Backend**: Supabase (Lovable Cloud) + Edge Functions
- **State**: React Context + TanStack Query

---

## Project Structure

```
src/
├── assets/                 # Static assets (images, logos)
│   └── ramp-logo.png
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui base components
│   └── [feature components]
├── contexts/               # React Context providers
├── data/                   # Static data and type definitions
├── hooks/                  # Custom React hooks
├── integrations/           # External service integrations
│   └── supabase/           # Supabase client and types
├── lib/                    # Utility functions
├── pages/                  # Route page components
├── App.tsx                 # Root component with routing
├── main.tsx                # Entry point
└── index.css               # Global styles + design tokens

supabase/
├── config.toml             # Supabase configuration
└── functions/              # Edge functions
    └── searchHelpCenter/   # AI-powered article search
```

---

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index.tsx` | Home page with search, persona selector, featured topics, articles |
| `/search` | `SearchPage.tsx` | Search results with AI answers and filters |
| `/guides` | `GuidesPage.tsx` | Guides organized by category in 3-column layout |
| `/article/:id` | `ArticlePage.tsx` | Individual article view with chunks |
| `*` | `NotFound.tsx` | 404 page |

---

## Components

### Layout Components
| Component | File | Description |
|-----------|------|-------------|
| `Header` | `Header.tsx` | Dark navbar with logo, nav links, search bar |
| `NavLink` | `NavLink.tsx` | Navigation link with active state styling |
| `SearchBar` | `SearchBar.tsx` | Search input with icon, supports `size="large"` |

### Content Components
| Component | File | Description |
|-----------|------|-------------|
| `ArticleCard` | `ArticleCard.tsx` | Article list item with title, description, badges |
| `CategoryCard` | `CategoryCard.tsx` | Featured topic card with gradient, icon, link |
| `ResourceCard` | `ResourceCard.tsx` | Resource link card with icon and description |
| `ChunkBlock` | `ChunkBlock.tsx` | Article content section with collapsible details |

### Persona Components
| Component | File | Description |
|-----------|------|-------------|
| `PersonaBanner` | `PersonaBanner.tsx` | Shows current persona with change option |
| `PersonaSelector` | `PersonaSelector.tsx` | 3-card persona picker (Customer/Vendor/Exploring) |
| `OnboardingBanner` | `OnboardingBanner.tsx` | CTA banner for setup wizard |

### AI/Search Components
| Component | File | Description |
|-----------|------|-------------|
| `AISearchAnswer` | `AISearchAnswer.tsx` | Displays AI-generated answer with sources |
| `AIAnswerBox` | `AIAnswerBox.tsx` | Container for AI answer with loading state |

### UI Components (shadcn/ui)
Located in `src/components/ui/`:
- `accordion`, `alert`, `avatar`, `badge`, `button`, `card`
- `checkbox`, `dialog`, `dropdown-menu`, `form`, `input`
- `label`, `popover`, `progress`, `scroll-area`, `select`
- `separator`, `sheet`, `skeleton`, `switch`, `table`
- `tabs`, `textarea`, `toast`, `tooltip`, and more...

---

## Contexts

### PersonaContext
**File**: `src/contexts/PersonaContext.tsx`

```typescript
interface Persona {
  type: 'customer' | 'vendor' | 'exploring';
  role?: 'employee' | 'admin' | 'bookkeeper';
  plan?: 'ramp' | 'ramp-plus';
}

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  isExploring: boolean;
}
```

Persists to `localStorage` under key `ramp-help-persona`.

---

## Hooks

| Hook | File | Description |
|------|------|-------------|
| `usePersona` | `PersonaContext.tsx` | Access persona context |
| `useAISearch` | `useAISearch.ts` | Trigger AI search via edge function |
| `useToast` | `use-toast.ts` | Toast notification system |
| `useMobile` | `use-mobile.tsx` | Responsive breakpoint detection |

---

## Data

### Articles
**File**: `src/data/articles.ts`

```typescript
interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  audience: AudienceType[];
  chunks: ArticleChunk[];
}

interface ArticleChunk {
  id: string;
  title: string;
  content: string;
}

type AudienceType = 'employee' | 'admin' | 'bookkeeper' | 'vendor';
```

**Available Articles** (10 total):
1. Communication Preferences
2. Login Troubleshooting
3. Support Contact Methods
4. Reimbursements
5. Receipts & Memos
6. Bill Payment Methods
7. Travel Booking
8. QuickBooks Integration
9. Vendor Portal
10. Faster Payments

---

## Edge Functions

### searchHelpCenter
**File**: `supabase/functions/searchHelpCenter/index.ts`

Calls Ramp's Zendesk Help Center API, fetches top 5 articles, uses LLM to generate synthesized answer with citations.

**Request**:
```json
{ "query": "how do I submit a receipt?" }
```

**Response**:
```json
{
  "answer": "AI-generated answer...",
  "sources": [
    { "title": "Article Title", "url": "https://..." }
  ]
}
```

---

## Design System

### Colors (index.css)
```css
:root {
  --background: 0 0% 96%;        /* #F5F5F5 */
  --foreground: 0 0% 10%;        /* #1A1A1A */
  --primary: 72 100% 50%;        /* #D4FF00 lime accent */
  --card: 165 25% 14%;           /* #1C2B2A dark cards */
  --muted: 0 0% 45%;
}
```

### Typography
- **Font**: Inter (clean, modern sans-serif)
- **Headings**: Bold, large (text-4xl to text-5xl)
- **Body**: Regular weight, good line-height

### Patterns
- Rounded corners: 8-12px (`rounded-lg`, `rounded-xl`)
- Card-based layouts with subtle shadows
- Generous whitespace
- Hover animations with framer-motion
- Gradient backgrounds on category cards

---

## External Resources

| Resource | URL |
|----------|-----|
| Community Forum | community.ramp.com |
| Live Training | ramp.com/training#live-webinars |
| On-Demand Resources | ramp.com/training |
| About Ramp | support.ramp.com/hc/en-us/categories/4408650449043-About-Ramp |

---

## Key Features

1. **Persona-based Content Filtering** - Articles filter based on user role
2. **AI-Powered Search** - Synthesized answers from Zendesk integration
3. **Responsive Design** - Mobile-first with grid layouts
4. **Persistent State** - Persona saved to localStorage
5. **Smooth Animations** - Framer Motion on load and interactions
