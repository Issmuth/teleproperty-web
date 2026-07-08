# Keyboard Shortcuts Guide

## Overview

TeleProperty is fully keyboard accessible. You can navigate the entire application using only your keyboard.

---

## Global Shortcuts

### Navigation

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Tab` | Next element | Move to the next interactive element |
| `Shift + Tab` | Previous element | Move to the previous interactive element |
| `Enter` | Activate | Activate buttons, links, and form submissions |
| `Space` | Activate/Toggle | Activate buttons or toggle checkboxes |
| `Escape` | Close/Cancel | Close modals, dropdowns, or cancel actions |
| `Alt + 1` | Skip to main content | Jump directly to main content area |

### Text Input

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Tab` | Next field | Move to next form field |
| `Shift + Tab` | Previous field | Move to previous form field |
| `Enter` | Submit form | Submit the current form |
| `Escape` | Clear/Cancel | Clear input or cancel editing |

---

## Component-Specific Shortcuts

### Modals & Dialogs

| Shortcut | Action |
|----------|--------|
| `Escape` | Close modal |
| `Tab` | Navigate within modal (focus trapped) |

**Focus Trapping**: When a modal is open, Tab and Shift+Tab only cycle through elements within the modal.

### Dropdowns & Menus

| Shortcut | Action |
|----------|--------|
| `Enter` / `Space` | Open dropdown |
| `↑` / `↓` | Navigate options |
| `Enter` | Select option |
| `Escape` | Close dropdown |

### Segmented Controls

| Shortcut | Action |
|----------|--------|
| `Tab` | Focus control |
| `←` / `→` | Navigate segments |
| `Space` | Select segment |

### Gallery/Carousel

| Shortcut | Action |
|----------|--------|
| `Tab` | Focus gallery |
| `←` / `→` | Navigate images |
| `Enter` | Select image |

### Rating Input

| Shortcut | Action |
|----------|--------|
| `Tab` | Focus rating |
| `←` / `→` | Select rating |
| `Enter` / `Space` | Confirm rating |

---

## Page-Specific Shortcuts

### Search & Filters

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus search bar (optional) |
| `Tab` | Navigate to filter button |
| `Enter` | Open filters |

### Property Listings

| Shortcut | Action |
|----------|--------|
| `Tab` | Navigate property cards |
| `Enter` | View property details |

### Property Details

| Shortcut | Action |
|----------|--------|
| `Escape` | Go back |
| `Tab` | Navigate gallery thumbnails |
| `Enter` | View full image |

---

## Accessibility Features

### Skip Links

Press `Tab` immediately after page load to reveal skip links:

1. **Skip to main content** - Bypass navigation and go directly to page content
2. **Skip to navigation** - Jump to main navigation menu
3. **Skip to search** - Jump directly to search functionality

### Focus Indicators

All interactive elements show a visible focus indicator when navigated with keyboard:
- **Primary elements**: Green outline (#0B8F55)
- **Form inputs**: Blue outline
- **Buttons**: Enhanced outline with shadow

### Screen Reader Support

All keyboard shortcuts work seamlessly with screen readers:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

---

## Tips for Keyboard Navigation

### Best Practices

1. **Always use Tab** - Don't rely on mouse position
2. **Watch for focus indicators** - Know where you are on the page
3. **Use Enter and Space consistently** - Enter for links/buttons, Space for checkboxes
4. **Use Escape liberally** - It's your friend for closing things
5. **Use skip links** - Save time on pages you visit frequently

### Common Patterns

**Navigating a form:**
```
1. Tab to first field
2. Enter information
3. Tab to next field
4. Repeat
5. Tab to submit button
6. Press Enter to submit
```

**Opening a modal:**
```
1. Tab to button
2. Press Enter to open modal
3. Tab through modal content (focus is trapped)
4. Press Escape to close modal
5. Focus returns to trigger button
```

**Using a dropdown:**
```
1. Tab to dropdown button
2. Press Enter to open
3. Use arrow keys to navigate
4. Press Enter to select
5. Dropdown closes automatically
```

---

## Browser Compatibility

These shortcuts work in all modern browsers:
- ✅ Chrome / Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Note**: Some browsers may have their own shortcuts that take precedence.

---

## Custom Shortcuts (Optional Future Enhancement)

The following shortcuts could be added in future:

| Shortcut | Action | Priority |
|----------|--------|----------|
| `Ctrl/Cmd + K` | Focus search | Medium |
| `G H` | Go to home | Low |
| `G P` | Go to properties | Low |
| `G J` | Go to projects | Low |
| `G A` | Go to account | Low |
| `?` | Show shortcuts help | Low |

---

## Reporting Issues

If you encounter any keyboard accessibility issues:

1. **Check browser shortcuts** - Ensure no conflict with browser shortcuts
2. **Test in another browser** - Verify if it's browser-specific
3. **Report the issue** - Contact support with:
   - Page URL
   - Shortcut attempted
   - Expected vs actual behavior
   - Browser and version

---

## For Developers

### Implementing Keyboard Support

```tsx
// Button with keyboard support
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Action
</button>

// Custom component with keyboard support
const handleKeyDown = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      handleSelect();
      break;
    case 'Escape':
      handleCancel();
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      handleNavigate(e.key);
      break;
  }
};
```

### Testing Keyboard Accessibility

```bash
# Manual testing checklist
1. Unplug your mouse
2. Use only Tab, Shift+Tab, Enter, Space, Escape, Arrows
3. Navigate through entire page
4. Ensure all interactive elements are reachable
5. Verify focus indicators are visible
6. Test all forms and interactions
```

---

## Resources

- [WebAIM Keyboard Accessibility](https://webaim.org/articles/keyboard/)
- [W3C Keyboard Navigation](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Last Updated**: Current session  
**Maintained By**: Development Team  
**Review Schedule**: Quarterly
