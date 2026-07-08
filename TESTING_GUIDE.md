# Accessibility Testing Guide

## Overview

This guide provides comprehensive instructions for testing the accessibility of TeleProperty.

---

## Quick Start Checklist

### Pre-Testing Setup
- [ ] Install axe DevTools browser extension
- [ ] Install screen reader (NVDA for Windows, VoiceOver for macOS)
- [ ] Have multiple browsers ready (Chrome, Firefox, Safari, Edge)
- [ ] Clear browser cache
- [ ] Disable all browser extensions except accessibility tools

---

## 1. Automated Testing

### Using axe DevTools

**Installation:**
- Chrome: [axe DevTools Extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- Firefox: [axe DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)

**Testing Steps:**
1. Open browser DevTools (F12)
2. Navigate to "axe DevTools" tab
3. Click "Scan ALL of my page"
4. Review results:
   - **Critical**: Must fix immediately
   - **Serious**: Fix as soon as possible
   - **Moderate**: Should fix
   - **Minor**: Nice to fix

**Test All Pages:**
- [ ] Home page (/)
- [ ] Property listing (/property)
- [ ] Property details (/property/[id])
- [ ] Projects listing (/projects)
- [ ] Project details (/projects/[id])
- [ ] Auth pages (/auth/*)
- [ ] Account pages (/account/*)
- [ ] Post property flow (/post-property/*)
- [ ] Dashboard pages

**Expected Result:** 0 critical or serious issues

### Using Lighthouse

**Steps:**
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Review score (target: 95+)

**Run on:**
- [ ] Desktop (all pages)
- [ ] Mobile (all pages)

---

## 2. Keyboard Navigation Testing

### Test Environment
- **Unplug your mouse** - Use keyboard only
- Test in multiple browsers

### Basic Navigation Test

**Steps:**
1. Load home page
2. Press Tab immediately - verify skip links appear
3. Continue pressing Tab through all interactive elements
4. Verify:
   - [ ] All interactive elements are reachable
   - [ ] Focus indicator is visible on each element
   - [ ] Focus order is logical (top to bottom, left to right)
   - [ ] No focus traps (except in modals)

### Component-Specific Tests

#### Forms
```
Test: Auth Phone Form
1. Tab to phone input
2. Enter phone number
3. Tab to submit button
4. Press Enter
5. Verify: Form submits or shows validation

✅ Pass if: Can complete entire form with keyboard
```

#### Modals
```
Test: Search Filters Modal
1. Tab to "Filters" button
2. Press Enter to open
3. Verify: Focus moves into modal
4. Press Tab multiple times
5. Verify: Focus stays within modal
6. Press Escape
7. Verify: Modal closes, focus returns to trigger button

✅ Pass if: Focus is trapped and restored correctly
```

#### Dropdowns
```
Test: Language Dropdown
1. Tab to language button
2. Press Enter to open
3. Press Arrow Down to navigate
4. Press Enter to select
5. Verify: Selection made, dropdown closes

✅ Pass if: Can navigate and select with keyboard
```

#### Carousels/Galleries
```
Test: Property Image Gallery
1. Tab to gallery
2. Use Arrow keys to navigate images
3. Press Enter to view full image
4. Press Escape to close

✅ Pass if: Can navigate images with keyboard
```

### Keyboard Testing Checklist

#### All Pages
- [ ] Can access all interactive elements
- [ ] Focus indicator is visible
- [ ] Focus order is logical
- [ ] No focus traps (except modals)
- [ ] Skip links work
- [ ] Escape closes modals/dropdowns

#### Specific Components
- [ ] Forms: Can fill and submit
- [ ] Buttons: Enter/Space activates
- [ ] Links: Enter activates
- [ ] Modals: Focus trapped, Escape closes
- [ ] Dropdowns: Arrow navigation works
- [ ] Tabs/Segments: Arrow navigation works
- [ ] Checkboxes: Space toggles
- [ ] Radio buttons: Arrow navigation works

---

## 3. Screen Reader Testing

### NVDA (Windows - Free)

**Installation:**
- Download from [nvaccess.org](https://www.nvaccess.org/download/)

**Basic Controls:**
- Start/Stop: `Ctrl + Alt + N`
- Stop reading: `Ctrl`
- Read next item: `↓`
- Read previous item: `↑`
- Navigate headings: `H`
- Navigate links: `K`
- Navigate landmarks: `D`

**Testing Steps:**
1. Start NVDA
2. Navigate to page
3. Press `Insert + Space` (enable browse mode)
4. Test navigation:
   - [ ] Press `H` to jump between headings
   - [ ] Press `K` to jump between links
   - [ ] Press `D` to jump between landmarks
   - [ ] Press `F` to jump between form fields
5. Test interactions:
   - [ ] Fill out a form
   - [ ] Open a modal
   - [ ] Navigate a dropdown
   - [ ] Use search functionality

**What to Listen For:**
- Are headings announced correctly?
- Are button labels clear?
- Are form labels announced?
- Are error messages read aloud?
- Are page changes announced?
- Is alt text descriptive?

### VoiceOver (macOS - Built-in)

**Basic Controls:**
- Start/Stop: `Cmd + F5`
- Navigate: `Ctrl + Option + →/←`
- Interact: `Ctrl + Option + Space`
- Web rotor: `Ctrl + Option + U`

**Testing Steps:**
1. Start VoiceOver (`Cmd + F5`)
2. Navigate to page
3. Use web rotor (`Ctrl + Option + U`):
   - [ ] Navigate by headings
   - [ ] Navigate by links
   - [ ] Navigate by form controls
   - [ ] Navigate by landmarks
4. Test interactions (same as NVDA)

### Screen Reader Testing Checklist

- [ ] All headings are announced
- [ ] All buttons have clear labels
- [ ] All form inputs have labels
- [ ] All images have alt text or are marked decorative
- [ ] Page title is descriptive
- [ ] Landmarks are properly labeled
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Toast notifications are announced
- [ ] Modal open/close is announced

---

## 4. Color Contrast Testing

### Automated Check

**Using Browser DevTools:**
1. Open DevTools (F12)
2. Inspect element with text
3. Look for "Contrast" in Accessibility pane
4. Verify ratio meets requirements:
   - Normal text: ≥ 4.5:1
   - Large text (18pt+): ≥ 3:1

### Manual Check

**Using WebAIM Contrast Checker:**
1. Go to [webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
2. Enter foreground color (text)
3. Enter background color
4. Verify:
   - [ ] Normal text passes AA (4.5:1)
   - [ ] Large text passes AA (3:1)

**Test These Combinations:**
- [ ] Primary text on surface
- [ ] Secondary text on surface
- [ ] Muted text on surface (large text only)
- [ ] White text on brand color (buttons)
- [ ] Error text on surface
- [ ] Link text on surface
- [ ] Dark mode: All combinations

### Color Contrast Checklist

- [ ] All body text passes 4.5:1
- [ ] All button text passes (bold = large text = 3:1)
- [ ] All link text passes 4.5:1
- [ ] All form labels pass 4.5:1
- [ ] Error messages pass 4.5:1
- [ ] Icons pass 3:1 (UI components)
- [ ] Dark mode passes all tests

---

## 5. Responsive & Zoom Testing

### Zoom Testing

**Steps:**
1. Set browser zoom to 200%
2. Navigate through page
3. Verify:
   - [ ] All content is visible
   - [ ] No horizontal scrolling
   - [ ] Text doesn't overlap
   - [ ] Buttons are clickable
   - [ ] Forms are usable

**Test at:**
- [ ] 100% (baseline)
- [ ] 150%
- [ ] 200% (required by WCAG)
- [ ] 400% (bonus)

### Mobile Testing

**Test on actual devices:**
- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)

**Verify:**
- [ ] Touch targets are ≥ 44x44 pixels
- [ ] Pinch-to-zoom works
- [ ] No content is cut off
- [ ] Forms are usable
- [ ] Modals work properly

---

## 6. Browser Compatibility Testing

### Test Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Test on Each Browser

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Modals function correctly
- [ ] Forms submit properly
- [ ] No console errors
- [ ] Skip links work

---

## 7. Specific Feature Testing

### Toast Notifications

**Test:**
1. Trigger success toast
2. Verify screen reader announces it
3. Verify it auto-dismisses
4. Verify close button works

**Expected:**
- [ ] Success/info: role="status", aria-live="polite"
- [ ] Error: role="alert", aria-live="assertive"
- [ ] Close button has aria-label
- [ ] Screen reader announces message

### Loading States

**Test:**
1. Navigate to page with loading
2. Verify screen reader announces loading
3. Verify spinner is visible

**Expected:**
- [ ] aria-busy="true" on container
- [ ] role="status" on spinner
- [ ] Screen reader says "Loading..."

### Search Results

**Test:**
1. Perform search
2. Apply filters
3. Verify results count updates

**Expected:**
- [ ] Results count has aria-live="polite"
- [ ] Screen reader announces new count
- [ ] Focus remains in search area

### Form Validation

**Test:**
1. Submit form with errors
2. Verify errors are announced
3. Verify focus moves to first error

**Expected:**
- [ ] Error messages have role="alert"
- [ ] Error messages have aria-live="assertive"
- [ ] Screen reader announces errors immediately
- [ ] Errors are visually visible

---

## 8. Testing Checklist by Page

### Home Page
- [ ] Automated test (axe, Lighthouse)
- [ ] Keyboard navigation
- [ ] Screen reader test
- [ ] Color contrast check
- [ ] Zoom to 200%
- [ ] Mobile test

### Property Listing
- [ ] All tests from Home Page
- [ ] Search functionality
- [ ] Filter modal
- [ ] Property cards clickable
- [ ] Results count announced

### Property Details
- [ ] All tests from Home Page
- [ ] Image gallery navigation
- [ ] Review form submission
- [ ] Rating input
- [ ] Save/share buttons

### Auth Flow
- [ ] All form inputs labeled
- [ ] Validation errors announced
- [ ] Keyboard navigation
- [ ] Screen reader flow
- [ ] OTP input accessible

### Account Pages
- [ ] Navigation menu accessible
- [ ] All forms accessible
- [ ] Tables accessible (if any)
- [ ] Action buttons labeled

---

## 9. Common Issues to Check

### Critical Issues ❌
- [ ] Images without alt text
- [ ] Forms without labels
- [ ] Buttons without text/aria-label
- [ ] Keyboard traps
- [ ] Color contrast failures
- [ ] Missing h1 on page

### Serious Issues ⚠️
- [ ] Incorrect heading hierarchy
- [ ] Focus order illogical
- [ ] Modal without focus trap
- [ ] Insufficient color contrast
- [ ] Missing ARIA on custom controls

### Moderate Issues ℹ️
- [ ] Missing skip links
- [ ] Ambiguous link text
- [ ] Missing aria-labels on icons
- [ ] Poor focus indicators
- [ ] Missing page titles

---

## 10. Reporting Issues

### Issue Template

```markdown
**Page**: /property/123
**Severity**: Critical / Serious / Moderate / Minor
**Component**: Property card
**Issue**: Button has no accessible name
**WCAG Criterion**: 4.1.2 Name, Role, Value
**Steps to Reproduce**:
1. Navigate to property listing
2. Tab to property card button
3. Screen reader does not announce button purpose

**Expected**: Button should announce "View property details for 5BR Villa"
**Actual**: Button announces "button"

**Screenshot**: [attached]
**Browser**: Chrome 120
**Screen Reader**: NVDA 2023
```

### Priority Levels

- **Critical**: Blocks access to core functionality
- **Serious**: Significantly impairs access
- **Moderate**: Difficult but not impossible to access
- **Minor**: Cosmetic or nice-to-have improvement

---

## 11. Testing Schedule

### Daily (During Development)
- Run axe DevTools on changed pages
- Quick keyboard navigation test

### Before Each Release
- Full automated test suite
- Keyboard navigation on all pages
- Screen reader spot checks
- Color contrast verification

### Quarterly
- Comprehensive screen reader testing
- User testing with people with disabilities
- Full browser compatibility check
- Mobile device testing

### Annually
- Third-party accessibility audit
- Update accessibility statement
- Review against latest WCAG standards

---

## 12. Tools & Resources

### Browser Extensions
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Accessibility Insights](https://accessibilityinsights.io/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Windows, Free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows, Paid)
- VoiceOver (macOS/iOS, Built-in)
- TalkBack (Android, Built-in)

### Testing Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- Chrome Lighthouse (Built-in)
- [Color Oracle](https://colororacle.org/) (Color blindness simulator)

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)

---

## Test Results Documentation

### Test Report Template

```markdown
# Accessibility Test Report

**Date**: YYYY-MM-DD
**Tester**: Name
**Version**: 1.0.0

## Summary
- Pages Tested: 15
- Issues Found: 3
- Critical: 0
- Serious: 0
- Moderate: 2
- Minor: 1

## Test Coverage
- ✅ Automated testing (axe DevTools)
- ✅ Keyboard navigation
- ✅ Screen reader (NVDA)
- ✅ Color contrast
- ✅ Zoom (200%)
- ✅ Mobile devices

## Issues Found
[List issues with details]

## Recommendations
[List recommendations]

## Conclusion
Overall accessibility: 98% compliant with WCAG 2.1 AA
```

---

**Last Updated**: Current session  
**Maintained By**: QA Team  
**Review Schedule**: Every sprint
