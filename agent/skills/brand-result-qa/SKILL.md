---
name: brand-result-qa
description: QA tests a brand knowledge base or Brand OS for completeness, usability, source support, missing information, and safe AI assistant behavior. Use when evaluating whether brand materials, brand agent output, or a brand result are ready for use. Don't use for general copywriting without a QA objective.
---

# Brand Result QA

Test whether a brand knowledge base is complete, usable, and safe for AI-assisted brand, marketing, website, sales, and customer-facing work.

## Procedure

1. Identify the brand knowledge base to test.
   - Use only the uploaded brand knowledge base or the repository's declared brand source of truth.
   - If the workspace defines a primary brand source, use it first.
   - In this repository, use `brand/brand-os/canonical/brand-os.md` as the primary source when present.

2. Load supporting sources only when the primary source does not fully answer a QA question.
   - Use files only when they are part of the brand knowledge base.
   - Treat `brand/brand-os/canonical/`, `brand/brand-os/structured/`, `brand/manifesto.md`, and `brand/brandbook-guidelines.md` as eligible supporting sources when present.
   - Do not use outside knowledge, assumptions, market norms, medical knowledge, or web research.

3. Read `references/question-bank.md` for the complete QA question set.

4. Answer every applicable QA question unless the user asks for a smaller subset.
   - Use the structure in `assets/report-template.md` for every answer.
   - Keep answers concise but specific enough to judge usability.
   - If the source does not answer a question, state that the information is missing.
   - For questions asking to create copy, write usable draft copy only when enough source material exists.
   - For the rewrite task, if the user did not provide the paragraph to rewrite, state that the paragraph is missing and do not invent one.

5. Assign confidence consistently.
   - Use `high` when the answer is directly supported by explicit source text.
   - Use `medium` when the answer is a source-backed synthesis across multiple passages.
   - Use `low` when the source is partial, ambiguous, inferred, or incomplete.

6. Flag safety and accuracy risks.
   - Never fill gaps with invented details.
   - Treat missing information as a QA finding.
   - Flag claims that require human approval, especially regulated, legal, medical, credential, pricing, outcome, affiliation, or operational claims.

7. Finish with the summary block from `assets/report-template.md`.
   - Use `ready` only when the knowledge base directly supports brand strategy, audience, voice, services, website copy, sales handling, and safety boundaries with minimal ambiguity.
   - Use `usable with gaps` when core brand work is possible but important source gaps remain.
   - Use `not ready` when the source lacks enough detail for reliable brand, sales, website, or safety outputs.

## Source Rules

Treat these cases as missing information unless the brand knowledge base explicitly answers them:

- exact service recommendations for a new customer
- prices, payment terms, scheduling rules, availability, and concierge scope
- credentials, certifications, affiliations, legal status, clinical outcomes, or proof claims
- medical diagnosis, prognosis, treatment indication, risk assessment, or guaranteed results
- official policies for privacy, consent, emergencies, escalation, refunds, or operations

## Bundled Files

- `references/question-bank.md`: QA question set adapted from the brand knowledge-base testing prompt.
- `assets/report-template.md`: Output template for per-question answers and the final readiness summary.

## Error Handling

- If no brand knowledge base or declared brand source of truth is available, stop and report that the QA test cannot run.
- If a supporting source is not clearly part of the brand knowledge base, exclude it and mention the exclusion only if it affects confidence.
- If a requested answer would require outside knowledge, mark the answer as missing or low confidence rather than inferring it.
- If user-provided replacement text is required but absent, report the missing paragraph and continue the remaining QA questions.
