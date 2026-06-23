# Home Page Navigation Implementation

All buttons and components on the home page have been connected to their respective destinations using Next.js router.

## Navigation Mappings

### Hero Section

#### Search Functionality
- **Search Button**: Routes to `/property` or `/projects` based on active segment
- **Query Parameters**: Includes search query as `?q=...` when present
- **Active Segment Logic**:
  - `buy` or `rent`: → `/property`
  - `projects`: → `/projects`

#### Post Property Button
- **"Post Property FREE"**: → `/post-property`

### Featured Projects Section

#### Section Header
- **"See all" Button**: → `/projects`

#### Project Cards
- **Card Click**: → `/projects/{projectId}`
- Example: Diamond Plaza → `/projects/diamond-plaza`

### Featured Properties Section

#### Section Header
- **"Browse all" Button**: → `/property`

#### Property Cards
- **Card Click**: → `/property/{propertyId}`
- Example: Modern family villa → `/property/featured-property-1`

### All Services Section

#### Search Property Banner (Full Width)
- **Banner Click**: → `/property`

#### Post Property Banner (Half Width)
- **Banner Click**: → `/post-property`

#### New Projects Banner (Half Width)
- **Banner Click**: → `/projects`

#### Developer Hub Banner (Half Width)
- **Banner Click**: → `/developer-hub`

#### Verified Brokers Banner (Half Width)
- **Banner Click**: → `/broker-hub`

## Implementation Details

### Router Usage
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();

// Direct navigation
router.push('/property');

// Navigation with query params
router.push(`/property?q=${encodeURIComponent(searchQuery)}`);

// Dynamic routes
router.push(`/projects/${project.id}`);
```

### Search Handler
```tsx
const handleSearch = () => {
  if (activeSegment === 'projects') {
    router.push(searchQuery ? `/projects?q=${encodeURIComponent(searchQuery)}` : '/projects');
  } else {
    router.push(searchQuery ? `/property?q=${encodeURIComponent(searchQuery)}` : '/property');
  }
};
```

### Component Props
All interactive components now accept an `onPress` callback:
- `HomeHero`: `onPostPress`, `onSearchPress`
- `SectionHeader`: `onActionPress`
- `ListingCard`: `onPress`
- `PropertyCard`: `onPress`
- `ServiceBanner`: `onPress`

## Routes Structure

```
/                       → Home page
/property               → Property listings
/property/{id}          → Property details
/projects               → Project listings
/projects/{id}          → Project details
/post-property          → Post property wizard (step 1)
/developer-hub          → Developer hub landing
/broker-hub             → Broker hub landing
```

## User Flow Examples

### Buying Property
1. User lands on home
2. Searches for "Bole apartment"
3. Clicks search → `/property?q=Bole%20apartment`
4. Views filtered results

### Posting Property
1. User clicks "Post Property FREE" button
2. Routes to `/post-property`
3. Completes 3-step wizard

### Exploring Projects
1. User sees featured projects
2. Clicks "See all" → `/projects`
3. Browses all projects
4. Clicks specific project → `/projects/{id}`

### Service Discovery
1. User scrolls to "All Services"
2. Clicks "Developer Hub" banner
3. Routes to `/developer-hub`
4. Views developer services and registration

## Benefits

✅ **Consistent Navigation**: All similar components use the same pattern  
✅ **Type Safety**: TypeScript ensures correct prop usage  
✅ **SEO Friendly**: Uses Next.js router for proper page transitions  
✅ **Query Support**: Search queries are preserved in URL  
✅ **Dynamic Routes**: Supports both static and dynamic routing  
✅ **User Experience**: Smooth client-side navigation without full page reloads
