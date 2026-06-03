# Design System Structure

Every generated design system must preserve this section order.

1. Page header
2. Brand summary
3. Brand assets
4. Core foundations
5. Visual behavior
6. Voice and content rules
7. Component system
8. Implementation notes

## Section Contract

### 1. Page header
- Show brand name, tagline, output timestamp, and generation note.
- State that the page is intended for human review and AI implementation guidance.

### 2. Brand summary
- Show purpose, mission, vision, positioning, differentiators, audience, and services summary.
- Prefer short synthesis blocks over raw source dumps.

### 3. Brand assets
- Show available preview assets copied into `design-system/assets/`.
- Reserve slots for logo, pattern, and supporting visual if present.

### 4. Core foundations
- Show logo rules and logo misuse rules.
- Show color palette with token name, hex value, role, and source label.
- Show typography guidance and the preferred font family.
- Show layout rules, spacing scale, and imagery direction.

### 5. Visual behavior
- Show motion tokens.
- Show shadow tokens.
- Show border, stroke, and radius tokens.
- Keep these sections even when the brand source does not define them. Mark shared defaults as `system default`.

### 6. Voice and content rules
- Show tone traits, communication principles, preferred words, forbidden words, and AI usage guardrails.
- Separate allowed language from restricted claims.

### 7. Component system
- Split into `Base components` and `Custom components`.
- Every component card must include:
  - component name
  - purpose
  - required elements
  - variants
  - Tailwind implementation notes
  - content guidance
  - optional brand-specific notes

### 8. Implementation notes
- Show Tailwind guidance, asset usage notes, and warnings about missing or system-default data.
- End with a short instruction that page builders should derive website sections from this file instead of bypassing it.
