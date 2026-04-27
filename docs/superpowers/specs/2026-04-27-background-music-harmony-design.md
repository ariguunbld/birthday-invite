# Design Spec: Background Music & Intro Overlay Harmony

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Harmonizing the intro overlay with the birthday page's soft mesh aesthetic.

## 1. Context & Purpose
The current intro overlay in `BackgroundMusic.tsx` uses a "Slate/Grey" minimalist theme that feels disconnected from the vibrant yet soft "Blue/Pink/Yellow" mesh background used in the main `BirthdayPage.tsx`. This creates a visual "jump" when the user clicks "Урилга залах".

## 2. Requirements
- **Visual Consistency:** The overlay must use the same background elements as the main page (`mesh-bg`, `grain-overlay`).
- **Color Palette:** Shift from cold slates to warm slates and soft pastel accents (Blue-200, Pink-200).
- **Typography:** Maintain "Playfair Display" for headings and "DM Sans" for supporting text, ensuring tracking and leading match the hero section.
- **Seamless Transition:** The background should remain stationary or transition smoothly when the overlay is removed.

## 3. Architecture & Changes

### 3.1 Background Integration
- Wrap the overlay content in the `.mesh-bg` structure.
- Ensure the `grain-overlay` is present in both states to maintain texture consistency.

### 3.2 Visual Refinements
- **Central Focus:** Update the "Focus Rings" to use semi-transparent Blue and Pink borders instead of light slate.
- **Dividers:** Replace the solid slate line with a gradient divider (`bg-linear-to-b from-blue-200 to-transparent`).
- **Typography Colors:** 
    - Heading: `text-slate-800` (unchanged, matches hero).
    - Subtitles: `text-slate-400` with high tracking.
- **CTA Button:** 
    - Refine the vertical line animation to match the "Scroll Hint" style.
    - Update hover states to feel more "airy" (gentle scale/color shift).

### 3.3 Music Control (Floating)
- Adjust the floating button's pink color to be more subtle or match the mesh pink (`#fce7f3` / `bg-pink-50`).
- Update the "bounce" animation to be more rhythmic and less aggressive.

## 4. Implementation Plan
1. **Research:** Confirm exact Tailwind classes for mesh colors in `globals.css`.
2. **Implementation:** Update `BackgroundMusic.tsx` JSX structure and styles.
3. **Refinement:** Tune animations (Focus Ring, Button) for better harmony.
4. **Verification:** Test on mobile and desktop for visual flow and audio auto-play behavior.

## 5. Risk Assessment
- **Audio Autoplay:** Modern browsers require user interaction. The overlay serves as this interaction. Ensure no changes break this "Click to Play" necessity.
- **Z-Index:** Ensure the overlay mesh doesn't block the main page's interaction once hidden.
