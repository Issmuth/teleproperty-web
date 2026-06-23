# Auth Flow Implementation

## Overview
Complete authentication flow copied from the mobile app to the web version with:
- **Full-screen auth experience** - Auth pages cover the entire viewport (not in a side panel)
- **Desktop-optimized navigation** - Desktop shows nav links in header, drawer only on tablet/mobile
- **Responsive design enhancements** for desktop and tablet viewports

## Files Created

### Core Auth Components
- `components/auth/auth-shell.tsx` - Full-screen auth wrapper with gradient hero section
- `components/auth/auth-stepper.tsx` - Step indicator component (1/3, 2/3, 3/3)

### Auth Store & State Management
- `lib/auth/auth-store.ts` - Zustand store for auth state with localStorage persistence
  - Session management
  - Draft state for registration flow
  - Auth actions (sign in, sign out, complete auth)

### Auth Pages
- `app/auth/page.tsx` - Landing page with "Continue with Phone" option
- `app/auth/phone/page.tsx` - Phone number & full name entry (Step 1/3)
- `app/auth/verify/page.tsx` - OTP verification (Step 2/3)
- `app/auth/role/page.tsx` - Role selection (Step 3/3)
- `app/auth/layout.tsx` - Full-screen auth layout wrapper with fixed positioning

### Updated Components
- `components/layout/header.tsx` - Enhanced header:
  - Logo with home link
  - Language selector dropdown
  - Theme toggle
  - Sign In button / User avatar menu (desktop only)
  - Notifications button
  - Menu/drawer button (all screen sizes)
  - Drawer contains all navigation links
  - User profile section in drawer when authenticated
  - Sign out option in drawer

### Translations
Added complete auth translations to all locale files:
- `lib/i18n/locales/en.ts` - English
- `lib/i18n/locales/am.ts` - Amharic
- `lib/i18n/locales/om.ts` - Afan Oromo
- `lib/i18n/locales/ti.ts` - Tigrinya

## Features

### Full-Screen Auth Experience
- `fixed inset-0 z-50` layout covers entire viewport
- Independent from main app navigation
- Immersive authentication experience
- Clean, distraction-free flow

### Responsive Navigation
**Desktop (lg and above):**
- No drawer menu button (hidden with `lg:hidden`)
- Clean header with logo, language, theme, auth, and notifications
- Navigation through page links and site structure

**Tablet/Mobile:**
- Hamburger menu button reveals drawer
- Drawer contains all navigation items
- User profile section in drawer when authenticated
- Sign in button in drawer when not authenticated

### Mobile Layout (Preserved)
- Gradient hero section with brand logo at top
- Back and close buttons in hero
- Step-by-step flow with progress indicator
- Clean, card-based UI
- Content area with rounded top corners

### Tablet Layout
- Similar to mobile but with increased spacing
- Larger text and touch targets
- Enhanced decorative elements

### Desktop Layout (Side-by-Side)
- **Left Half**: Full-height gradient brand section
  - Large brand logo and text
  - Multiple decorative circles
  - Close button in top-right of brand section
- **Right Half**: White/dark content area
  - Back button with text in top-left of content area
  - Centered auth forms (max-width contained)
  - Clean, focused authentication experience
- 50/50 split creates balanced, modern look
- Brand presence maintained throughout flow

### Auth Flow
1. **Landing** (`/auth`) - Choose to continue with phone
2. **Phone Entry** (`/auth/phone`) - Enter full name, phone number, optional referral code
3. **OTP Verification** (`/auth/verify`) - 4-digit OTP input with demo mode
4. **Role Selection** (`/auth/role`) - Choose from 6 roles (Buyer, Owner, Agent, Broker, Developer, Hotel Partner)
5. **Redirect** - Return to original page or home

### State Management
- Zustand store with localStorage persistence
- Automatic rehydration on page load
- Session data persisted across browser sessions
- Draft state cleared on sign out or successful auth

### Role Types
- Buyer / Seeker
- Owner
- Agent
- Broker
- Developer
- Hotel Partner

## User Experience

### Redirect Flow
- Auth pages accept `?redirectTo=/path` query param
- After successful auth, user returns to intended page
- Defaults to home page if no redirect specified

### Demo Mode
- OTP verification accepts any 4-digit code
- Demo notice displayed on verify page
- Perfect for testing and demonstrations

### Responsive Design
- Mobile-first approach
- Tailwind responsive utilities (md:, lg:)
- Smooth transitions and hover effects
- Dark mode support throughout
- Full-screen on all devices for auth
- Desktop navigation optimized with inline links

## Technical Details

### Layout Structure
```
Mobile/Tablet (Stacked):
Auth Layout (fixed inset-0, z-50)
├── Hero Section (gradient, brand logo, decorative circles)
│   ├── Close button (top right)
│   ├── Brand logo + text (center)
│   └── Back button (conditional, left side)
└── Content Area (rounded top, -mt offset)
    └── Page Content (forms, grids, etc.)

Desktop (Side-by-Side):
Auth Layout (fixed inset-0, z-50)
├── Left Half (50% width)
│   ├── Gradient background with decorative circles
│   ├── Large brand logo and text (centered)
│   └── Close button (top right)
└── Right Half (50% width)
    ├── Back button with label (top left)
    └── Centered Content (max-w-lg)
        └── Page Content (forms, grids, etc.)
```

### Responsive Breakpoints
- Mobile: Base styles (< 768px)
- Tablet: `md:` prefix (768px - 1023px)
- Desktop: `lg:` prefix (≥ 1024px)

## Dependencies Added
- `zustand` - State management with persistence

## Next Steps
To implement protected routes:
1. Create middleware to check authentication
2. Add redirect logic for protected pages
3. Display appropriate messaging for unauthenticated access
