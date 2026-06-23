# Layout Width Configuration

## Wide Screen Optimizations

All pages have been updated to better utilize wide screens while maintaining proper alignment and readability.

### Max-Width Strategy

#### Content-Heavy Pages (max-w-7xl)
These pages display multiple items in grids and benefit from maximum width:
- **Home** (`/`) - Property and project cards, services grid
- **Projects** (`/projects`) - Project cards in grid layout
- **Property** (`/property`) - Property listings grid
- **Project Details** (`/projects/[id]`) - Image galleries and info
- **Property Details** (`/property/[id]`) - Image galleries and details

#### Dashboard Pages (max-w-6xl)
Business-focused pages with metrics, cards, and action items:
- **Broker Hub** (`/broker-hub`)
- **Broker Dashboard** (`/broker-dashboard`)
- **Developer Hub** (`/developer-hub`)
- **Developer Dashboard** (`/developer-dashboard`)
- **Account Main** (`/account`)
- **Payments** (`/payments`)
- **Subscriptions** (`/account/subscriptions`)
- **Saved Properties** (`/account/saved`)
- **My Listings** (`/account/listings`)

#### List/Form Pages (max-w-5xl)
Pages with lists or form-heavy content:
- **Payment History** (`/account/payment-history`)
- **Notifications** (`/account/notifications`)
- **Callbacks** (`/account/callbacks`)

#### Form-Focused Pages (max-w-4xl)
Pages primarily focused on single forms or content:
- **My Subscription** (`/account/my-subscription`)

#### Registration Forms (max-w-2xl)
Narrow forms for better focus:
- **Broker Register** (`/broker-register`)
- **Developer Register** (`/developer-register`)

#### Wizard Flows (max-w-3xl)
Multi-step forms that benefit from focused layout:
- **Post Property** (`/post-property`) - All 3 steps
  - Step 1: Role selection
  - Step 2: Property details
  - Step 3: Contact & verification

## Bottom Banner Alignment Fix

### Problem
Fixed banners with `left-0 right-0` were stretching full-width and couldn't be properly centered with the content.

### Solution
Changed from:
```tsx
<div className="fixed bottom-20 lg:bottom-6 left-0 right-0 px-4 lg:px-8 max-w-7xl mx-auto z-20">
```

To:
```tsx
<div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 lg:px-8 z-20">
```

This uses:
- `left-1/2` - Position at 50% from left
- `-translate-x-1/2` - Shift back by 50% of own width (perfect centering)
- `w-full max-w-7xl` - Full width up to max-w-7xl
- Result: Banner is centered and aligned with main content

### Pages with Fixed Banners
- **Projects** (`/projects`) - "Book a site visit" banner (max-w-7xl)
- **Property** (`/property`) - Property promo banner (max-w-7xl)

## Responsive Behavior

### Mobile (< 768px)
- All pages use full width with consistent padding (px-4)
- Content stacks vertically
- Fixed banners appear above bottom navigation

### Tablet (768px - 1024px)
- Padding increases to px-8
- Some grids expand to 2 columns
- Content starts to breathe more

### Desktop (> 1024px)
- Max-width constraints activate
- Content centered with auto margins
- Grids expand to 3-4 columns where appropriate
- Fixed banners perfectly aligned with content
- Generous spacing (py-6, py-8)

## Benefits

1. **Better Wide Screen Usage**: Content no longer appears squeezed on large monitors
2. **Proper Alignment**: All fixed elements align with their parent content containers
3. **Consistent Hierarchy**: Related pages use similar widths (e.g., all dashboards use max-w-6xl)
4. **Readability**: Form pages remain focused with narrower widths
5. **Scalability**: Easy to adjust widths globally by category

## Future Considerations

If content still feels narrow on ultra-wide screens (> 1920px), consider:
- Increasing max-w-7xl pages to max-w-[1600px] or max-w-[1800px]
- Adding breakpoint at 2xl or 3xl for 4-5 column grids
- Adjusting gap spacing on very wide screens
