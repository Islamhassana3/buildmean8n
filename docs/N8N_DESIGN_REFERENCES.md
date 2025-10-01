# n8n Design System References

This document tracks the official n8n design system elements we're integrating into BuildMean8n.

## Official n8n Repository
- Main Repo: https://github.com/n8n-io/n8n
- Design System: https://github.com/n8n-io/n8n/tree/master/packages/design-system
- Editor UI: https://github.com/n8n-io/n8n/tree/master/packages/editor-ui

## Key Design Elements from n8n

### Color Palette
Based on n8n's official color scheme:
- Primary: `#FF6D5A` (n8n brand color)
- Success/Trigger: `#16A34A` (green-600)
- Info/Action: `#2563EB` (blue-600)
- Warning/Logic: `#D97706` (amber-600)
- Purple/Transform: `#9333EA` (purple-600)

### Node Styling
- Border radius: 8px (rounded-lg)
- Padding: 16px
- Min width: 240px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Border: 2px solid (type-specific color)
- Background: white (#FFFFFF)

### Connection Points
- Size: 14px diameter
- Border: 2px solid
- Background: white
- Active state: filled with primary color
- Position: centered on node edges

### Canvas
- Background: #F9FAFB (gray-50)
- Grid: Dot pattern or subtle lines
- Grid spacing: 20px
- Grid color: rgba(0,0,0,0.05)

### Typography
- Font family: 'Inter', sans-serif
- Headings: 600 weight
- Body: 400 weight
- Small text: 0.875rem (14px)
- Node titles: 0.9375rem (15px), 600 weight

### Spacing Scale
Following n8n's spacing system:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Button Styles
- Primary: #FF6D5A background, white text
- Secondary: White background, gray-700 text, gray-300 border
- Border radius: 6px
- Padding: 8px 16px
- Font weight: 500

## Components Referenced

### Node Component
Location: packages/editor-ui/src/components/Node.vue
Key features:
- Rounded corners with subtle shadow
- Type-specific border colors
- Icon + title layout
- Connection endpoints
- Hover state with elevated shadow

### Canvas Component
Location: packages/editor-ui/src/components/NodeView.vue
Key features:
- Zoom controls (bottom-right)
- Pan/zoom functionality
- Grid background
- Connection rendering

### Design System Components
Location: packages/design-system/src/components/
Referenced components:
- N8nButton
- N8nIcon
- N8nInput
- N8nCard
- N8nMenu

## Implementation Notes

### What We're Adopting
1. Exact color values from n8n's palette
2. Node dimensions and styling (8px border radius, proper shadows)
3. Connection point design (14px circles with 2px borders)
4. Canvas grid pattern and colors
5. Typography scale and font weights
6. Button and control styling

### What We're Keeping Compatible
1. Existing HTML structure (minimal changes)
2. Current JavaScript functionality
3. Vue.js integration approach
4. Drag-and-drop mechanics

### Deviations (if any)
To be documented as we encounter them during implementation.

## Implementation Status

### ✅ Completed
1. **Color Palette Integration** - All n8n official colors implemented in CSS variables
2. **Node Styling** - Full n8n-style node appearance with type-specific borders
3. **Canvas Grid** - Dot pattern background matching n8n
4. **Connection Points** - 14px circles with hover animations
5. **Typography** - Inter font with n8n's font sizes and weights
6. **Shadows & Spacing** - Matching n8n's shadow system
7. **WorkflowNode.vue Component** - Aligned with CSS styling

### 🔄 In Progress
1. **SVG Icon Library** - Replace emoji icons with proper SVG icons
2. **Enhanced Animations** - Add more n8n-like transitions
3. **Responsive Design** - Further mobile/tablet optimization

### 📋 Future Enhancements
1. **Mini-map** - Add workflow overview map like n8n
2. **Node Templates** - Pre-configured node templates
3. **Advanced Connection Routing** - Bezier curve connections
4. **Keyboard Shortcuts** - n8n-compatible shortcuts

## Deviations from n8n

### Intentional Differences
1. **Icon System** - Currently using emoji icons instead of SVG icons (temporary)
   - Reason: Simplifies initial implementation
   - Plan: Migrate to SVG icon library in next phase

2. **Vue.js Version** - Using Vue 3 CDN vs n8n's Vue 2
   - Reason: Modern Vue 3 features
   - Impact: No visual differences

3. **Simplified Node Structure** - Fewer node configuration options
   - Reason: Focused on visual consistency first
   - Plan: Add advanced configurations later

### No Compromises
- Color palette is exact match
- Node dimensions and spacing are exact
- Border radius values are exact
- Shadow values are exact
- Grid pattern is n8n-style

## Testing Notes

To verify n8n design consistency:
1. Compare side-by-side with official n8n at https://n8n.io
2. Check color values with browser DevTools
3. Measure dimensions of nodes and spacing
4. Test hover states and animations
5. Verify responsive behavior

## Updates Log
- 2024-01-27: Initial design system integration plan created
- 2024-01-27: Phase 1 completed - Node styling and colors
- 2024-01-27: Phase 2 completed - Canvas improvements and WorkflowNode.vue updates
