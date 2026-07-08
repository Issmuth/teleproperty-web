# Toast Notifications Usage Guide

## Overview

The toast notification system provides accessible, non-intrusive feedback to users. All toasts automatically include proper ARIA live regions for screen reader support.

## Installation

The `ToastContainer` is already added to the root layout (`app/layout.tsx`), so no additional setup is needed.

## Basic Usage

### Import

```tsx
import { toast } from '@/lib/store/toast-store';
```

### Success Messages

```tsx
toast.success('Property saved successfully!');
toast.success('Your listing has been published', 5000); // Custom duration in ms
```

### Error Messages

```tsx
toast.error('Failed to save property');
toast.error('Network error. Please try again.');
```

### Info Messages

```tsx
toast.info('New features available!');
toast.info('Check out our latest properties');
```

### Warning Messages

```tsx
toast.warning('Your session will expire soon');
toast.warning('Please complete your profile');
```

## Real-World Examples

### Form Submission Success

```tsx
const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    toast.success('Form submitted successfully!');
    router.push('/success');
  } catch (error) {
    toast.error('Failed to submit form. Please try again.');
  }
};
```

### Save/Unsave Property

```tsx
const handleToggleSave = async () => {
  try {
    if (isSaved) {
      await removeProperty(propertyId);
      toast.info('Property removed from saved list');
    } else {
      await saveProperty(propertyId);
      toast.success('Property saved successfully!');
    }
  } catch (error) {
    toast.error('Could not update saved properties');
  }
};
```

### Authentication

```tsx
const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    toast.success('Welcome back!');
    router.push('/dashboard');
  } catch (error) {
    toast.error('Invalid credentials. Please try again.');
  }
};
```

### Network Errors

```tsx
const fetchData = async () => {
  try {
    const data = await api.getData();
    return data;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }
};
```

### Copy to Clipboard

```tsx
const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', 2000); // Short duration
  } catch (error) {
    toast.error('Failed to copy');
  }
};
```

## Accessibility Features

### Automatic ARIA Support

Toasts automatically include proper ARIA attributes:

- **Success/Info/Warning**: `role="status"` + `aria-live="polite"`
- **Error**: `role="alert"` + `aria-live="assertive"`
- **All**: `aria-atomic="true"` for complete message announcement

### Screen Reader Behavior

- **Polite** (success, info, warning): Screen reader waits for user to finish current task
- **Assertive** (error): Screen reader interrupts to announce immediately
- **Atomic**: Entire message is announced as one unit

### Keyboard Accessibility

- Close button is keyboard accessible (Tab key)
- Close button has proper `aria-label`
- Enter/Space keys activate close button

## Customization

### Duration

Default duration is 4000ms (4 seconds). You can customize:

```tsx
toast.success('Quick message', 2000);  // 2 seconds
toast.info('Important info', 6000);    // 6 seconds
toast.error('Critical error', 0);      // Stay until manually closed
```

### Manual Dismissal

```tsx
import { useToastStore } from '@/lib/store/toast-store';

const { removeToast } = useToastStore();
removeToast(toastId);

// Or clear all toasts
const { clearAllToasts } = useToastStore();
clearAllToasts();
```

## Best Practices

### Do's ✅

- Use success toasts for completed actions
- Use error toasts for failed operations
- Keep messages concise (1-2 sentences max)
- Use appropriate toast types for context
- Provide actionable error messages

### Don'ts ❌

- Don't use toasts for critical information that must be seen
- Don't show multiple toasts for the same action
- Don't use toasts for navigation instructions
- Don't use very long messages (use modal instead)
- Don't show toasts on page load unless there's an action result

## Examples by Use Case

### E-commerce / Property Platform

```tsx
// Add to cart / Save property
toast.success('Property added to favorites');

// Remove from cart / Unsave property
toast.info('Property removed from favorites');

// Purchase / Contact agent
toast.success('Message sent to agent successfully!');

// Out of stock / Property no longer available
toast.warning('This property is no longer available');
```

### Form Validation

```tsx
// Required field
toast.warning('Please fill in all required fields');

// Invalid format
toast.error('Please enter a valid email address');

// Success
toast.success('Profile updated successfully!');
```

### File Upload

```tsx
// Start
toast.info('Uploading images...');

// Success
toast.success('Images uploaded successfully!');

// Error
toast.error('Upload failed. Max file size is 5MB');
```

## Technical Details

### Toast Types

```typescript
type ToastType = 'success' | 'error' | 'info' | 'warning';
```

### Toast Object

```typescript
type Toast = {
  id: string;           // Auto-generated unique ID
  message: string;      // Toast message content
  type: ToastType;      // Toast type (affects styling and ARIA)
  duration: number;     // Duration in milliseconds
};
```

### Store API

```typescript
const {
  toasts,           // Current toasts array
  addToast,         // Add new toast
  removeToast,      // Remove specific toast
  clearAllToasts,   // Remove all toasts
} = useToastStore();
```

## Styling

Toasts use a fixed position (top-right corner) and automatically stack vertically. They include:

- Smooth fade-in/fade-out animations
- Color-coded backgrounds per type
- Icon indicators
- Close button
- Shadow for depth
- Responsive design (adapts to mobile)

## Testing

When testing components that use toasts:

```tsx
import { toast } from '@/lib/store/toast-store';

jest.mock('@/lib/store/toast-store', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

// In test
expect(toast.success).toHaveBeenCalledWith('Expected message');
```

---

**Note**: The toast system is fully accessible and follows WCAG 2.1 AA guidelines. All toasts include proper ARIA attributes and keyboard support.
