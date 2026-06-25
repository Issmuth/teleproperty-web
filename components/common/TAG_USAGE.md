# Tag Component Usage Guide

The `Tag` component provides a consistent, reusable way to display badges, labels, chips, and status indicators across the application.

## Import

```tsx
import { Tag } from '@/components/common/tag';
```

## Basic Usage

```tsx
<Tag>Default Tag</Tag>
```

## Variants

### Built-in Variants

```tsx
// Featured badge (orange background, white text)
<Tag variant="featured" icon={Star}>Featured</Tag>

// For Sale badge (green background, white text)
<Tag variant="forSale">For Sale</Tag>

// Verified badge (white background, green text)
<Tag variant="verified" icon={BadgeCheck} iconSize={10}>Verified</Tag>

// Status badge (green background, white text)
<Tag variant="status">Active</Tag>

// Muted tag (uses theme surfaceMuted/textMuted colors)
<Tag variant="muted">2 Years</Tag>

// Primary tag (uses theme activeSurface/activeText colors)
<Tag variant="primary" size="md">2BR</Tag>

// Amber rating tag (amber background, theme text color)
<Tag variant="amber" icon={Star} iconSize={16}>4.8</Tag>

// Custom colors
<Tag 
  variant="custom" 
  customBg="rgba(255, 255, 255, 0.95)" 
  customColor="#1F2937"
>
  Custom Tag
</Tag>
```

## Sizes

```tsx
// Extra small (9px text, 1.5px padding, rounded-md)
<Tag size="xs">Extra Small</Tag>

// Small (10px text, 2px padding, rounded-lg)
<Tag size="sm">Small</Tag>

// Medium (12px text, 3px padding, rounded-full)
<Tag size="md">Medium</Tag>
```

## With Icons

```tsx
import { Star, BadgeCheck, CircleCheckBig } from 'lucide-react';

// Icon with default size
<Tag variant="featured" icon={Star}>Featured</Tag>

// Icon with custom size
<Tag variant="verified" icon={BadgeCheck} iconSize={10}>Verified</Tag>

// Icon inherits fill for featured variant
<Tag variant="featured" icon={Star}>Featured</Tag>
```

## Theme-Aware Tags

Tags automatically adapt to dark/light mode when using built-in variants like `muted`, `primary`, and `amber`.

```tsx
// Automatically uses theme colors
<Tag variant="muted">{age}</Tag>
<Tag variant="primary" size="md">{unitType}</Tag>
```

## Real-World Examples

### Property Card Badges

```tsx
<Tag variant="featured" icon={Star}>Featured</Tag>
<Tag variant="forSale">For Sale</Tag>
<Tag variant="verified" icon={BadgeCheck} iconSize={10}>Verified</Tag>
```

### Age/Status Tags

```tsx
<Tag variant="muted" size="sm">{age}</Tag>
```

### Unit Type Chips

```tsx
{unitTypes.map((type) => (
  <Tag key={type} variant="primary" size="md">
    {type}
  </Tag>
))}
```

### Rating Tags

```tsx
<Tag variant="amber" size="sm" icon={Star} iconSize={16}>
  {rating}
</Tag>
```

### Custom Styled Tags

```tsx
// Project badge
<Tag 
  variant="custom" 
  customBg="rgba(255, 255, 255, 0.98)" 
  customColor="#0F9D58"
  size="sm"
  icon={CircleCheckBig}
  className="shadow-md"
>
  Verified Project
</Tag>

// Status with indicator
<Tag 
  variant="custom" 
  customBg="rgba(22, 163, 74, 0.3)" 
  customColor="#16A34A"
  size="sm"
>
  <div className="flex items-center gap-1.5">
    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
    <span>Active</span>
  </div>
</Tag>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Content to display inside the tag |
| `variant` | `'featured' \| 'forSale' \| 'verified' \| 'status' \| 'muted' \| 'primary' \| 'amber' \| 'custom'` | `'muted'` | Visual style preset |
| `size` | `'xs' \| 'sm' \| 'md'` | `'xs'` | Size of the tag |
| `icon` | `LucideIcon` | `undefined` | Optional icon component |
| `iconSize` | `number` | auto | Custom icon size (overrides default for size) |
| `customBg` | `string` | `undefined` | Custom background color (used with `variant="custom"`) |
| `customColor` | `string` | `undefined` | Custom text color (used with `variant="custom"`) |
| `className` | `string` | `''` | Additional CSS classes |

## Design Consistency Benefits

- **Uniform appearance**: All tags follow the same design system
- **Theme integration**: Automatically adapts to light/dark mode
- **Size consistency**: Standardized sizing across the app
- **Easy maintenance**: Update all tags by modifying one component
- **Accessibility**: Consistent font weights and sizing improve readability
- **Flexibility**: Support for both preset and custom styles

## Migration Notes

When converting existing tags to use this component:

1. Replace inline `div` or `span` elements with `<Tag>`
2. Choose appropriate variant or use `custom` with your colors
3. Use `size` prop instead of inline Tailwind size classes
4. Pass icons through the `icon` prop instead of rendering separately
5. Additional classes can be passed through `className` if needed
