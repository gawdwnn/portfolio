# Portfolio Brand Colors Documentation

This document outlines the color palette used throughout the portfolio application.

## Brand Colors

The primary brand colors can be used via CSS variables or Tailwind classes.

### Primary Brand Colors

| Color Name | Light Theme | Dark Theme | CSS Variable                   | Tailwind Class                      |
| ---------- | ----------- | ---------- | ------------------------------ | ----------------------------------- |
| Primary    | `#7c3aed`   | `#8b5cf6`  | `var(--color-brand-primary)`   | `text-indigo-600` / `bg-indigo-600` |
| Secondary  | `#06b6d4`   | `#22d3ee`  | `var(--color-brand-secondary)` | `text-cyan-600` / `bg-cyan-600`     |
| Accent     | `#e11d48`   | `#fb7185`  | `var(--color-brand-accent)`    | `text-rose-600` / `bg-rose-600`     |
| Accent 2   | `#a78bfa`   | `#c4b5fd`  | `var(--color-brand-accent-2)`  | `text-violet-400` / `bg-violet-400` |
| Muted      | `#9ca3af`   | `#d1d5db`  | `var(--color-brand-muted)`     | `text-gray-400` / `bg-gray-400`     |

### Using Brand Colors

In CSS:

```css
.my-element {
  color: var(--color-brand-primary);
  background-color: var(--color-brand-secondary);
  border-color: var(--color-brand-accent);
}
```

In Tailwind:

```jsx
<div className="text-indigo-600 bg-cyan-600 border-rose-600">
  My branded element
</div>
```

## Terminal Theme Colors

The terminal interface uses a specific set of colors for its components:

| Color Name | Hex Value | CSS Variable             | Usage                     |
| ---------- | --------- | ------------------------ | ------------------------- |
| Background | `#000000` | `var(--terminal-bg)`     | Terminal background       |
| Text       | `#f8fafc` | `var(--terminal-text)`   | Main terminal text        |
| Green      | `#10b981` | `var(--terminal-green)`  | Command prompts           |
| Indigo     | `#6366f1` | `var(--terminal-indigo)` | Primary actions           |
| Cyan       | `#06b6d4` | `var(--terminal-cyan)`   | Special highlights, links |
| Border     | `#1e293b` | `var(--terminal-border)` | Borders, dividers         |

### Using Terminal Colors

```css
.terminal-prompt {
  color: var(--terminal-green);
}
```

## Theme Integration

The color system integrates with the light/dark mode theme toggle. Colors automatically adjust based on the active theme.

## Gradients

Common gradients used throughout the site:

### Primary Gradient

```css
background: linear-gradient(
  to right,
  var(--color-brand-primary),
  var(--color-brand-secondary)
);
```

### Accent Gradient

```css
background: linear-gradient(
  to right,
  var(--color-brand-primary),
  var(--color-brand-accent)
);
```

### Text Gradient

```css
background: linear-gradient(
  to right,
  var(--color-brand-primary),
  var(--color-brand-accent-2),
  var(--color-brand-secondary)
);
background-clip: text;
color: transparent;
```
