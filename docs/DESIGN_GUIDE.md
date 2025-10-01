# BuildMean8n Design Guide

This guide documents the visual design system implemented in BuildMean8n, based on the official n8n design system.

## Color Palette

### Primary Colors
```css
/* n8n Brand Color */
--n8n-primary: #FF6D5A;
--n8n-primary-hover: #FF5540;
--n8n-primary-light: #FFEBE8;
```

### Node Type Colors
```css
/* Trigger Nodes - Green */
--n8n-node-trigger: #16A34A; /* green-600 */

/* Action Nodes - Blue */
--n8n-node-action: #2563EB; /* blue-600 */

/* Logic/Flow Nodes - Amber */
--n8n-node-logic: #D97706; /* amber-600 */

/* Transform Nodes - Purple */
--n8n-node-transform: #9333EA; /* purple-600 */
```

### Neutral Colors
```css
/* Backgrounds */
--n8n-bg-primary: #FFFFFF;
--n8n-bg-secondary: #F9FAFB; /* gray-50 - canvas */
--n8n-bg-tertiary: #F3F4F6; /* gray-100 */
--n8n-bg-hover: #F5F5F7;

/* Text */
--n8n-text-primary: #333333;
--n8n-text-secondary: #666666;
--n8n-text-tertiary: #999999;

/* Borders */
--n8n-border: #DDDDDD;
--n8n-border-light: #E6E6E6;
--n8n-border-hover: #CCCCCC;
```

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Sizes
```css
--n8n-font-xs: 0.75rem;   /* 12px - descriptions */
--n8n-font-sm: 0.875rem;  /* 14px - body text */
--n8n-font-base: 1rem;    /* 16px - default */
--n8n-font-lg: 1.125rem;  /* 18px - headings */
--n8n-font-xl: 1.25rem;   /* 20px - large headings */
```

### Font Weights
```css
--n8n-font-normal: 400;
--n8n-font-medium: 500;
--n8n-font-semibold: 600;
--n8n-font-bold: 700;
```

### Usage Examples
```css
/* Node Title */
font-size: 0.9375rem; /* 15px */
font-weight: 600;
line-height: 1.3;

/* Node Description */
font-size: 0.75rem; /* 12px */
font-weight: 400;
line-height: 1.4;
```

## Spacing Scale

```css
--n8n-space-1: 0.25rem;  /* 4px */
--n8n-space-2: 0.5rem;   /* 8px */
--n8n-space-3: 0.75rem;  /* 12px */
--n8n-space-4: 1rem;     /* 16px */
--n8n-space-6: 1.5rem;   /* 24px */
--n8n-space-8: 2rem;     /* 32px */
--n8n-space-12: 3rem;    /* 48px */
```

## Border Radius

```css
--n8n-radius-xs: 2px;
--n8n-radius-sm: 4px;
--n8n-radius: 6px;      /* Default for buttons, controls */
--n8n-radius-lg: 8px;   /* Nodes, cards */
--n8n-radius-xl: 10px;
--n8n-radius-full: 9999px; /* Circles, pills */
```

## Shadows

```css
/* Elevation System */
--n8n-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--n8n-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
--n8n-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
--n8n-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
--n8n-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

/* Node-specific shadows */
--n8n-shadow-node: 0 2px 8px rgba(0, 0, 0, 0.1);
--n8n-shadow-node-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
```

## Component Specifications

### Workflow Node

**Dimensions:**
- Min width: `240px`
- Padding: `16px`
- Border: `2px solid` (color based on type)
- Border radius: `8px`

**States:**
```css
/* Default */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Hover */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
transform: translateY(-1px);

/* Selected */
box-shadow: 0 0 0 3px rgba(255, 109, 90, 0.12), 
            0 4px 16px rgba(0, 0, 0, 0.15);
```

**Node Icon:**
- Size: `32x32px`
- Border radius: `6px`
- Background: `#F3F4F6`

**Node Title:**
- Font size: `0.9375rem` (15px)
- Font weight: `600`
- Color: `#333333`

**Node Description:**
- Font size: `0.75rem` (12px)
- Color: `#666666`

### Connection Points

**Specifications:**
- Size: `14px` diameter
- Border: `2px solid #999999`
- Background: `#FFFFFF`
- Position: Centered on node edges (`-7px` offset)

**Hover State:**
```css
border-color: #FF6D5A;
border-width: 3px;
transform: scale(1.3);
box-shadow: 0 0 0 4px rgba(255, 109, 90, 0.15);
```

### Canvas

**Background:**
```css
background-color: #F9FAFB;
background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
background-size: 20px 20px;
```

**Grid Spacing:** `20px`

### Buttons

**Primary Button:**
```css
background-color: #FF6D5A;
color: white;
border-radius: 6px;
padding: 8px 16px;
font-weight: 500;
```

**Secondary Button:**
```css
background-color: transparent;
color: #666666;
border: 1px solid #DDDDDD;
border-radius: 6px;
padding: 8px 16px;
```

**Hover States:**
```css
/* Primary */
background-color: #FF5540;

/* Secondary */
background-color: #F5F5F7;
border-color: #CCCCCC;
```

## Usage Guidelines

### When to Use Each Node Color

**Green (Trigger)** - `#16A34A`
- Webhook triggers
- Schedule/Cron triggers
- Email receive triggers
- Any event that starts a workflow

**Blue (Action)** - `#2563EB`
- HTTP requests
- Email send
- Database operations
- API calls
- Slack/Discord messages

**Amber (Logic)** - `#D97706`
- IF conditions
- Switch statements
- Loops
- Merge/Split operations
- Router nodes

**Purple (Transform)** - `#9333EA`
- Set/Update data
- Code execution
- Function nodes
- Data mapping
- String operations

### Accessibility

**Color Contrast:**
- All text meets WCAG AA standards
- Primary color `#FF6D5A` has sufficient contrast on white
- Node type colors are distinguishable for color-blind users

**Focus States:**
- All interactive elements have visible focus states
- Focus ring: `0 0 0 3px rgba(255, 109, 90, 0.15)`

## Animation & Transitions

**Standard Transition:**
```css
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

**Quick Transition:**
```css
transition: all 0.15s ease;
```

**Hover Effects:**
- Slight elevation increase
- Subtle scale transform
- Color transitions

## Best Practices

1. **Consistency:** Always use design tokens instead of hardcoded values
2. **Spacing:** Use the spacing scale for consistent margins and padding
3. **Colors:** Use semantic color names (e.g., `--n8n-node-trigger`) not raw hex values
4. **Typography:** Maintain the font scale for visual hierarchy
5. **Shadows:** Use elevation system for depth perception
6. **Borders:** Consistent border-radius creates visual harmony

## Resources

- **n8n Design System:** https://github.com/n8n-io/n8n/tree/master/packages/design-system
- **n8n Editor UI:** https://github.com/n8n-io/n8n/tree/master/packages/editor-ui
- **Reference Documentation:** [N8N_DESIGN_REFERENCES.md](./N8N_DESIGN_REFERENCES.md)
