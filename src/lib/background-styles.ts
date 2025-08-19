/**
 * Unified background styles for consistent section styling
 */
export const BACKGROUND_STYLES = {
  // Base gradient that works well with the root bg-neutral-950
  section: "bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950",
  
  // Variants for different section needs
  sectionLight: "bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950",
  sectionDeep: "bg-gradient-to-b from-neutral-950 via-black to-black",
  
  // Root/default
  root: "bg-neutral-950",
  
  // Grid pattern overlay (can be combined with sections)
  gridPattern: "absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.4]",
  
  // Color accent overlays for visual interest
  blueAccent: "absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl",
  purpleAccent: "absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl",
  
  // Hero-specific patterns (for future use if needed)
  heroBase: "absolute z-0",
  heroCenteredTop: "absolute top-0 left-1/2 -translate-x-1/2 w-full z-0",
  
  // Section borders for consistent visual separation
  sectionBorder: "border-neutral-800",
  sectionBorderTop: "border-t border-neutral-800", 
  sectionBorderBottom: "border-b border-neutral-800",
  sectionBorderBoth: "border-t border-b border-neutral-800",
} as const;

/**
 * Helper function to combine background styles
 */
export function combineBackgroundStyles(...styles: string[]): string {
  return styles.join(" ");
}