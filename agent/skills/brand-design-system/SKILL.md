---
name: brand-design-system
description: Builds a deterministic HTML design system page from Brand OS data for human review and AI consumption. Use when generating or regenerating a Tailwind-based design system page, documenting brand tokens, layout rules, motion, shadows, borders, and standard or custom website components from structured brand inputs. Don't use for implementing production website pages, editing arbitrary frontend code, or inventing brand decisions that are not present in the source material.
---

# Brand Design System

Create a single-page HTML design system from Brand OS inputs with a fixed documentation structure and predictable output paths.

## Procedures

**Step 1: Confirm inputs**
1. Identify the Brand OS root directory. Use `brand/brand-os` when the repository follows the current project structure.
2. Confirm the structured JSON files exist under `structured/`.
3. Treat `canonical/` files as supporting context for interpretation only. Prefer structured JSON for deterministic extraction.
4. Read `agent/skills/brand-design-system/references/design-system-structure.md` to preserve the fixed section order and content contract.
5. Read `agent/skills/brand-design-system/references/component-contract.json` if custom components must be added.

**Step 2: Validate the generation request**
1. Execute the mutating helper in validation mode first:
   ```bash
   python3 agent/skills/brand-design-system/scripts/generate_design_system.py \
     --brand-os-dir brand/brand-os \
     --brand-assets-dir brand/assets \
     --output-dir design-system \
     --validate-only
   ```
2. If the user supplied a custom component manifest, include `--components-file path/to/components.json`.
3. If validation reports missing data, missing files, or malformed JSON, fix the inputs before generating output.

**Step 3: Generate the design system**
1. Execute the mutating helper:
   ```bash
   python3 agent/skills/brand-design-system/scripts/generate_design_system.py \
     --brand-os-dir brand/brand-os \
     --brand-assets-dir brand/assets \
     --output-dir design-system
   ```
2. Add `--components-file path/to/components.json` when the design system needs brand-specific custom components beyond the bundled base components.
3. Preserve the output contract:
   - `design-system/index.html`
   - `design-system/assets/*`
4. Keep the generated page single-file and Tailwind-based. Allow only the minimum inline CSS needed for local fonts, CSS variables, and presentation polish.

**Step 4: Review the result**
1. Confirm `design-system/index.html` includes every section defined in `agent/skills/brand-design-system/references/design-system-structure.md`.
2. Confirm the components section includes bundled base components and any supplied custom components.
3. Confirm source-backed content and system-default tokens are clearly labeled in the page.
4. Confirm copied assets resolve from `design-system/assets/`.

**Step 5: Regenerate safely**
1. Re-run the helper instead of hand-editing generated HTML unless the task is explicitly to change the generator itself.
2. Update `agent/skills/brand-design-system/assets/base-components.json` when a new component should become part of the shared baseline for every website.
3. Update `agent/skills/brand-design-system/assets/design-system-spec.json` when the fixed page structure or default motion, shadow, border, or radius tokens must change for all future design systems.

## Bundled Files

- `agent/skills/brand-design-system/scripts/generate_design_system.py`: mutating helper that validates inputs, copies preview assets, and writes `design-system/index.html`.
- `agent/skills/brand-design-system/assets/design-system-spec.json`: fixed documentation structure and shared default token set for motion, shadows, borders, radii, and spacing.
- `agent/skills/brand-design-system/assets/base-components.json`: bundled baseline website components that appear in every generated design system.
- `agent/skills/brand-design-system/assets/custom-components.example.json`: example manifest for brand-specific component additions.
- `agent/skills/brand-design-system/references/design-system-structure.md`: fixed section order and rendering contract.
- `agent/skills/brand-design-system/references/component-contract.json`: JSON contract for optional custom component manifests.

## Error Handling

- If `structured/` is missing required Brand OS files, stop and report the missing file list.
- If the structured JSON omits motion, border, shadow, or radius rules, keep the sections and render the shared system defaults from `assets/design-system-spec.json`.
- If no suitable brand asset is found for a preview slot, continue generation and mark that asset as unavailable in the output.
- If a custom component manifest fails validation, remove it from the command, generate the base design system, and report the invalid fields.
- If the generated page must reflect a new permanent structure, update the bundled spec files first and regenerate instead of patching only the output HTML.
