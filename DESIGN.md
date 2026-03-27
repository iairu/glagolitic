# Interface Design Specification

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ                    [🔄] [✕]                      │
│  Glagolitic Converter                                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │ Latin ▼        📋 │  │ Glagolitic ▼   [Copy]│                │
│  │                    │  │                    │                │
│  │  Type your text    │  │  ⰒⱃⰵⰲⰑⰄ ⱅⰵⰍⱄⱅ     │                │
│  │  here...           │  │  ⱁⰲⰄⰵ...          │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  │                    │  │                    │                │
│  └────────────────────┘  └────────────────────┘                │
│       127 chars                                                  │
├─────────────────────────────────────────────────────────────────┤
│   ⌘K Convert   ⌘⇧X Swap   ⌘⌫ Clear   ⌘C Copy                   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Header Bar (Glass Effect)
- **Height**: 80px
- **Background**: `rgba(255, 255, 255, 0.15)` with `backdrop-filter: blur(20px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.2)`
- **Border Radius**: 16px
- **Shadow**: Multi-layer with inset highlights

**Elements**:
- **Title (Large)**: "ⰃⰎⰀⰃⰑⰎⰋⰕⰋⰜⰀ" - Glagolitic script
  - Font: Serif, 24px, White gradient
  - Letter spacing: 2px
  
- **Subtitle (Small)**: "Glagolitic Converter"
  - Font: System sans-serif, 14px
  - Color: `rgba(255, 255, 255, 0.8)`
  
- **Action Buttons**:
  - Swap (🔄): Swap languages
  - Clear (✕): Clear all text
  - Size: 36x36px, rounded corners
  - Hover: Scale 1.05, brighter background

### 2. Input Panel (Left)
- **Background**: `rgba(255, 255, 255, 0.1)`
- **Border**: `1px solid rgba(255, 255, 255, 0.15)`
- **Border Radius**: 16px
- **Flex**: 1 (50% width)

**Header**:
- Language selector dropdown
- Character count display
- Background: `rgba(255, 255, 255, 0.05)`

**Textarea**:
- Font: System sans-serif, 18px
- Line height: 1.6
- Color: White
- Placeholder: `rgba(255, 255, 255, 0.4)`
- No border, transparent background
- Custom scrollbar styling

### 3. Output Panel (Right)
- **Same styling as Input Panel**
- **Textarea**:
  - Read-only
  - Slightly darker background: `rgba(0, 0, 0, 0.05)`
  - Color: `rgba(255, 255, 255, 0.9)`
  
**Copy Button**:
- Background: `rgba(255, 255, 255, 0.15)`
- Icon + Text layout
- Hover: Brighter background

### 4. Footer Bar
- **Height**: 50px
- **Same glass effect as header**
- **Shortcuts Display**:
  - Centered layout
  - Kbd elements with semi-transparent background
  - Font: System, 12px
  - Color: `rgba(255, 255, 255, 0.7)`

## Color Palette

### Background Gradient
```css
background: linear-gradient(135deg, 
  #667eea 0%,    /* Purple-blue */
  #764ba2 50%,   /* Deep purple */
  #f093fb 100%   /* Pink */
);
```

### Glass Layers
```css
/* Primary glass */
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.2);

/* Secondary glass (panels) */
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.15);

/* Tertiary glass (headers) */
background: rgba(255, 255, 255, 0.05);
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
```

### Text Colors
```css
/* Primary text */
color: white;

/* Secondary text */
color: rgba(255, 255, 255, 0.8);

/* Tertiary text */
color: rgba(255, 255, 255, 0.6);

/* Placeholder */
color: rgba(255, 255, 255, 0.4);

/* Disabled */
color: rgba(255, 255, 255, 0.3);
```

## Typography

### Font Stack
```css
font-family: 
  -apple-system,           /* macOS */
  BlinkMacSystemFont,      /* macOS */
  'SF Pro Display',        /* macOS */
  'Segoe UI',              /* Windows */
  Roboto,                  /* Linux/Android */
  sans-serif;              /* Fallback */
```

### Font Sizes
- **Header Title**: 24px (Glagolitic), 14px (Latin subtitle)
- **Panel Headers**: 14px
- **Textarea**: 18px
- **Footer**: 12px
- **Kbd**: 11px

### Font Weights
- **Title**: 700 (Bold)
- **Subtitle**: 500 (Medium)
- **Body**: 400 (Regular)
- **Kbd**: 500 (Medium)

## Spacing

### Layout
- **Container Padding**: 20px
- **Gap between elements**: 16px
- **Panel Padding**: 20px
- **Header Padding**: 16px 24px

### Element Spacing
- **Button Gap**: 8px
- **Shortcut Gap**: 20px
- **Icon Gap**: 6px

## Shadows & Effects

### Panel Shadows
```css
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.1),           /* Drop shadow */
  inset 0 1px 0 rgba(255, 255, 255, 0.3),  /* Top highlight */
  inset 0 -1px 0 rgba(255, 255, 255, 0.1); /* Bottom highlight */
```

### Button Hover
```css
transition: all 0.2s ease;

:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

:active {
  transform: scale(0.95);
}
```

## Responsive Behavior

### Desktop (> 768px)
- Two-panel layout (side by side)
- Full header with both title lines
- All shortcuts visible

### Tablet/Mobile (≤ 768px)
- Single panel layout (stacked)
- Smaller Glagolitic title (18px)
- Wrapped shortcuts
- Adjusted padding

## Animations

### Transitions
- **Panel hover**: 0.2s ease
- **Button press**: 0.1s ease
- **Language swap**: 0.3s ease
- **Text conversion**: Instant (50ms delay for UX)

### Loading States
- Converting flag shows subtle opacity change
- No spinner needed (instant conversion)

## Accessibility

### Keyboard Navigation
- Tab order: Input → Output → Actions
- Focus indicators on all interactive elements
- Keyboard shortcuts for power users

### Screen Readers
- Proper ARIA labels
- Semantic HTML
- Descriptive button text

### Contrast
- All text meets WCAG AA standards
- White on gradient background: 4.5:1+ ratio

## Implementation Notes

### CSS Variables (Optional Enhancement)
```css
:root {
  --glass-primary: rgba(255, 255, 255, 0.15);
  --glass-secondary: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --blur-amount: 20px;
  --gradient-start: #667eea;
  --gradient-mid: #764ba2;
  --gradient-end: #f093fb;
}
```

### Dark Mode Support (Future)
- Already optimized for dark appearance
- Could add light mode variant
- System preference detection

### Performance
- `will-change` for animations
- Hardware-accelerated transforms
- Minimal repaints

---

This design creates a modern, native-feeling application that stands out while maintaining usability and performance.
