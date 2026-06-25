# Design System - Dimensions Guide

This guide explains the standardized dimensions and spacing system for consistent UI design.

## Philosophy

Our design system is built on a **4px base unit** system, which provides:
- Visual rhythm and consistency
- Better alignment and spacing
- Easier maintenance
- Predictable scaling

## Quick Reference

### Spacing Scale
```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  12px  (0.75rem)
lg:  16px  (1rem)
xl:  20px  (1.25rem)
2xl: 24px  (1.5rem)
3xl: 32px  (2rem)
4xl: 40px  (2.5rem)
5xl: 48px  (3rem)
6xl: 64px  (4rem)
```

### Icon Sizes
```
xs:  12px
sm:  14px
md:  16px (default)
lg:  18px
xl:  20px
2xl: 24px
3xl: 32px
4xl: 48px
```

### Button Heights
```
sm: 32px  - Small buttons, chips
md: 40px  - Default buttons
lg: 48px  - Primary actions
xl: 56px  - Hero CTAs
```

### Border Radius
```
sm:  6px   - Tags, small elements
md:  8px   - Buttons, inputs
lg:  12px  - Cards, containers (default)
xl:  16px  - Large cards
2xl: 24px  - Feature sections
3xl: 32px  - Hero sections
full: 9999px - Fully rounded
```

## Usage Examples

### Using Tailwind Classes

Instead of arbitrary values, use the predefined class helpers:

```tsx
import { buttonClasses, iconButtonClasses, cardClasses } from '@/lib/design-system/dimensions';

// ❌ BAD - Arbitrary values
<button className="h-11 px-5 rounded-[13px]">Click me</button>

// ✅ GOOD - Using class helpers
<button className={buttonClasses.md}>Click me</button>

// ❌ BAD - Random icon button size
<button className="w-9 h-9 rounded-xl">
  <Icon size={18} />
</button>

// ✅ GOOD - Consistent icon button
<button className={iconButtonClasses.md}>
  <Icon size={iconSize.md} />
</button>

// ❌ BAD - Inconsistent card padding
<div className="p-5 lg:p-7 rounded-3xl">...</div>

// ✅ GOOD - Using card classes
<div className={cardClasses.xl}>...</div>
```

### Using Programmatic Values

For dynamic styling or inline styles:

```tsx
import dimensions from '@/lib/design-system/dimensions';

// Spacing
<div style={{ padding: dimensions.spacing.lg }}>...</div>

// Icon size
<Icon size={dimensions.iconSize.md} />

// Border radius
<div style={{ borderRadius: dimensions.borderRadius.lg }}>...</div>

// Button height
<button style={{ height: dimensions.buttonHeight.md }}>...</button>
```

### Using Helper Functions

For responsive designs:

```tsx
import { getCardPadding, getGap } from '@/lib/design-system/dimensions';

// Responsive card padding (p-4 lg:p-6)
<div className={`${getCardPadding('xl', true)}`}>...</div>

// Responsive gap (gap-3 lg:gap-4)
<div className={`flex ${getGap('lg', true)}`}>...</div>
```

## Common Patterns

### Buttons

```tsx
// Small button
<button className={buttonClasses.sm}>
  Small
</button>

// Default button
<button className={buttonClasses.md}>
  Default
</button>

// Large primary button
<button className={buttonClasses.lg}>
  Primary Action
</button>

// Hero CTA
<button className={buttonClasses.xl}>
  Get Started
</button>
```

### Icon Buttons

```tsx
import { iconButtonClasses, iconSize } from '@/lib/design-system/dimensions';

// Small icon button (back button in headers)
<button className={iconButtonClasses.sm}>
  <ArrowLeft size={iconSize.sm} />
</button>

// Default icon button
<button className={iconButtonClasses.md}>
  <Settings size={iconSize.md} />
</button>

// Large icon button (FAB, primary actions)
<button className={iconButtonClasses.xl}>
  <Plus size={iconSize.xl} />
</button>
```

### Cards

```tsx
import { cardClasses } from '@/lib/design-system/dimensions';

// Compact card
<div className={cardClasses.sm}>
  ...
</div>

// Standard card
<div className={cardClasses.md}>
  ...
</div>

// Feature card
<div className={cardClasses.lg}>
  ...
</div>

// Hero card (responsive)
<div className={cardClasses.xl}>
  ...
</div>
```

### Inputs

```tsx
import { inputClasses } from '@/lib/design-system/dimensions';

// Small input (filters, search)
<input className={inputClasses.sm} />

// Default input (forms)
<input className={inputClasses.md} />

// Large input (hero search)
<input className={inputClasses.lg} />
```

### Spacing & Layout

```tsx
import { gap, spacing } from '@/lib/design-system/dimensions';

// Flex with consistent gap
<div className="flex gap-4">  {/* 16px gap */}
  ...
</div>

// Grid with consistent gap
<div className="grid grid-cols-3 gap-3">  {/* 12px gap */}
  ...
</div>

// Section spacing
<section className="py-6 lg:py-8">  {/* 24px mobile, 32px desktop */}
  ...
</section>
```

## Migration Strategy

When updating existing components:

1. **Identify the pattern**: What type of element is it? (button, icon, card, etc.)
2. **Find the closest standard**: Look up the appropriate class helper or constant
3. **Replace**: Swap arbitrary values with standard values
4. **Test**: Verify the visual appearance is acceptable
5. **Adjust if needed**: If the standard doesn't work, discuss adding a new standard size

## Best Practices

### DO ✅
- Use predefined class helpers (`buttonClasses.md`)
- Use spacing constants for inline styles
- Use icon size constants for icon components
- Keep spacing consistent (stick to 4px multiples)
- Use responsive variants when appropriate

### DON'T ❌
- Don't use arbitrary values like `h-11`, `px-5`, `rounded-[13px]`
- Don't mix spacing systems (don't use 5px, 7px, 15px, etc.)
- Don't create one-off sizes without discussing with the team
- Don't ignore responsive design (use responsive classes)

## Component-Specific Guidelines

### Property Cards
- Image height: `h-36` (144px) on mobile, `h-40` (160px) on desktop
- Card padding: `p-3` (12px)
- Border radius: `rounded-lg` (12px)
- Gap between elements: `gap-2` or `gap-3`

### List Items
- Height: `h-10` to `h-12` (40-48px) for touch targets
- Padding: `px-4 py-3` for comfortable hit area
- Gap: `gap-3` between icon and text

### Modals/Sheets
- Padding: `p-5 lg:p-6` for content
- Border radius: `rounded-2xl lg:rounded-3xl` at top
- Gap between sections: `gap-4 lg:gap-6`

### Forms
- Input height: `h-10` or `h-12` (40-48px)
- Label margin: `mb-2` (8px)
- Field gap: `gap-4` (16px)

## Adding New Standards

If you need a dimension that doesn't exist:

1. **Check if it's truly needed**: Can an existing value work?
2. **Follow the 4px system**: Ensure it's a multiple of 4
3. **Discuss with the team**: Should this be a new standard?
4. **Document the use case**: Why is this specific size needed?
5. **Update this file**: Add examples and guidelines

## Related Files

- `/lib/design-system/dimensions.ts` - The constants and helpers
- `/lib/theme/palette.ts` - Color system
- `/components/common/tag.tsx` - Tag component (uses dimension system)
