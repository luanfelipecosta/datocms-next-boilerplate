#!/usr/bin/env python3
import argparse
import datetime as dt
import html
import json
import shutil
import sys
from pathlib import Path


REQUIRED_FILES = [
    "brand-profile.json",
    "audience.json",
    "voice-tone.json",
    "services.json",
    "visual-identity.json",
    "business-model.json",
    "ai-usage-rules.json",
]


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def unwrap(value):
    if isinstance(value, dict):
        if "value" in value:
            return unwrap(value["value"])
        return {key: unwrap(item) for key, item in value.items()}
    if isinstance(value, list):
        return [unwrap(item) for item in value]
    return value


def as_text(item):
    value = unwrap(item)
    if isinstance(value, dict):
        name = value.get("name")
        description = value.get("description")
        if name and description:
            return f"{name}: {description}"
        if name:
            return str(name)
        if description:
            return str(description)
        for key in ("title", "label", "role"):
            if value.get(key):
                return str(value[key])
        return json.dumps(value, ensure_ascii=False)
    return str(value)


def read_brand_data(brand_os_dir: Path):
    structured_dir = brand_os_dir / "structured"
    missing = [name for name in REQUIRED_FILES if not (structured_dir / name).exists()]
    if missing:
        raise FileNotFoundError(f"Missing required structured files: {', '.join(missing)}")
    return {name: load_json(structured_dir / name) for name in REQUIRED_FILES}


def read_spec(script_dir: Path):
    asset_dir = script_dir.parent / "assets"
    spec = load_json(asset_dir / "design-system-spec.json")
    components = load_json(asset_dir / "base-components.json")["base_components"]
    return spec, components


def validate_custom_components(path: Path | None):
    if path is None:
        return []
    payload = load_json(path)
    components = payload.get("custom_components")
    if not isinstance(components, list):
        raise ValueError("Custom component manifest must contain a custom_components array.")
    required = {
        "name",
        "purpose",
        "required_elements",
        "variants",
        "tailwind_notes",
        "content_guidance",
    }
    for index, component in enumerate(components):
        if not isinstance(component, dict):
            raise ValueError(f"Custom component at index {index} must be an object.")
        missing = sorted(required - component.keys())
        if missing:
            raise ValueError(
                f"Custom component '{component.get('name', index)}' is missing fields: {', '.join(missing)}"
            )
    return components


def select_asset(brand_assets_dir: Path, folder_hint: str, suffixes: tuple[str, ...], preferred_names: tuple[str, ...]):
    if not brand_assets_dir.exists():
        return None
    candidates = []
    for path in brand_assets_dir.rglob("*"):
        if not path.is_file():
            continue
        lower = str(path).lower()
        if folder_hint not in lower:
            continue
        if path.suffix.lower() not in suffixes:
            continue
        score = 100
        if path.suffix.lower() == ".svg":
            score -= 30
        if any(name in lower for name in preferred_names):
            score -= 20
        if "/1x/" in lower or "\\1x\\" in lower:
            score -= 10
        candidates.append((score, lower, path))
    if not candidates:
        return None
    candidates.sort(key=lambda item: (item[0], item[1]))
    return candidates[0][2]


def copy_asset(source: Path | None, destination_dir: Path, destination_name: str):
    if source is None:
        return None
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination = destination_dir / destination_name
    shutil.copy2(source, destination)
    return destination


def render_list(items, empty_message):
    if not items:
        return f'<li class="text-slate-500">{html.escape(empty_message)}</li>'
    return "".join(
        f'<li class="rounded-2xl border border-slate-200 bg-white px-4 py-3">{html.escape(as_text(item))}</li>'
        for item in items
    )


def render_tokens(items, fields):
    rows = []
    for item in items:
        cells = []
        for field in fields:
            value = item.get(field, "n/a")
            if field == "hex":
                cell = (
                    f'<div class="flex items-center gap-3">'
                    f'<span class="size-6 rounded-full border border-slate-300" style="background:{html.escape(value)}"></span>'
                    f'<code>{html.escape(str(value))}</code></div>'
                )
            else:
                cell = html.escape(str(value))
            cells.append(f"<td class=\"px-4 py-3 align-top text-sm text-slate-700\">{cell}</td>")
        rows.append(f"<tr class=\"border-t border-slate-200\">{''.join(cells)}</tr>")
    return "".join(rows)


def render_components(title, components):
    if not components:
        return (
            f"<section><h3 class=\"text-xl font-semibold text-slate-950\">{html.escape(title)}</h3>"
            "<p class=\"mt-3 text-sm text-slate-500\">No components defined.</p></section>"
        )
    cards = []
    for component in components:
        cards.append(
            f"""
            <article class="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)]">
              <div class="flex items-start justify-between gap-4">
                <h4 class="text-lg font-semibold text-slate-950">{html.escape(component["name"])}</h4>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">Component</span>
              </div>
              <p class="mt-3 text-sm leading-6 text-slate-600">{html.escape(component["purpose"])}</p>
              <div class="mt-5 grid gap-5 lg:grid-cols-2">
                <div>
                  <h5 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Required elements</h5>
                  <ul class="mt-3 space-y-2 text-sm text-slate-700">{''.join(f"<li>{html.escape(item)}</li>" for item in component["required_elements"])}</ul>
                </div>
                <div>
                  <h5 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Variants</h5>
                  <ul class="mt-3 space-y-2 text-sm text-slate-700">{''.join(f"<li>{html.escape(item)}</li>" for item in component["variants"])}</ul>
                </div>
                <div>
                  <h5 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Tailwind notes</h5>
                  <ul class="mt-3 space-y-2 text-sm text-slate-700">{''.join(f"<li>{html.escape(item)}</li>" for item in component["tailwind_notes"])}</ul>
                </div>
                <div>
                  <h5 class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Content guidance</h5>
                  <ul class="mt-3 space-y-2 text-sm text-slate-700">{''.join(f"<li>{html.escape(item)}</li>" for item in component["content_guidance"])}</ul>
                </div>
              </div>
              {"<div class='mt-5'><h5 class='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Brand notes</h5><ul class='mt-3 space-y-2 text-sm text-slate-700'>" + ''.join(f"<li>{html.escape(item)}</li>" for item in component.get("brand_notes", [])) + "</ul></div>" if component.get("brand_notes") else ""}
            </article>
            """
        )
    return (
        f"<section><h3 class=\"text-xl font-semibold text-slate-950\">{html.escape(title)}</h3>"
        f"<div class=\"mt-6 grid gap-6 xl:grid-cols-2\">{''.join(cards)}</div></section>"
    )


def build_html(data, spec, base_components, custom_components, copied_assets):
    brand_profile = data["brand-profile.json"]
    audience = data["audience.json"]
    voice = data["voice-tone.json"]
    services = data["services.json"]
    visual = data["visual-identity.json"]
    ai_rules = data["ai-usage-rules.json"]

    brand_name = as_text(brand_profile.get("brand_name", "Brand"))
    tagline = as_text(brand_profile.get("tagline", ""))
    colors = [unwrap(item) for item in visual.get("colors", [])]
    typography = [as_text(item) for item in visual.get("typography", [])]
    layout_rules = visual.get("layout_rules", [])
    imagery_style = visual.get("imagery_style", [])
    logo_rules = visual.get("logo_rules", [])
    logo_donts = visual.get("logo_donts", [])
    services_list = services.get("services", [])
    timestamp = dt.datetime.now().astimezone().strftime("%Y-%m-%d %H:%M %Z")

    asset_cards = []
    for label, path in copied_assets.items():
        if path is None:
            asset_cards.append(
                f'<article class="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-5"><h3 class="text-sm font-semibold text-slate-900">{html.escape(label)}</h3><p class="mt-3 text-sm text-slate-500">Asset unavailable in source files.</p></article>'
            )
            continue
        rel_path = f"assets/{path.name}"
        if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".svg"}:
            preview = f'<img src="{html.escape(rel_path)}" alt="{html.escape(label)}" class="mt-4 max-h-40 w-full rounded-2xl border border-slate-200 object-contain bg-slate-50 p-4" />'
        else:
            preview = f'<p class="mt-4 text-sm text-slate-600">{html.escape(path.name)}</p>'
        asset_cards.append(
            f'<article class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><h3 class="text-sm font-semibold text-slate-900">{html.escape(label)}</h3><p class="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{html.escape(rel_path)}</p>{preview}</article>'
        )

    service_items = [service.get("name", "Unnamed service") for service in services_list[:6]]
    differentiators = brand_profile.get("positioning", {}).get("differentiators", [])
    audience_items = audience.get("primary_audience", [])[:6]

    tone_words = [as_text(item) for item in voice.get("tone_of_voice", [])]
    communication_principles = voice.get("communication_principles", [])
    preferred_words = voice.get("preferred_words", [])
    forbidden_words = voice.get("forbidden_words", [])

    html_out = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(brand_name)} Design System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {{
        theme: {{
          extend: {{
            fontFamily: {{
              sans: ['BrandSans', 'ui-sans-serif', 'system-ui', 'sans-serif']
            }},
            boxShadow: {{
              soft: 'var(--shadow-soft)',
              panel: 'var(--shadow-panel)'
            }}
          }}
        }}
      }};
    </script>
    <style>
      @font-face {{
        font-family: 'BrandSans';
        src: url('./assets/urbanist.ttf') format('truetype');
        font-display: swap;
      }}
      :root {{
        --shadow-soft: {spec["shadow_tokens"][0]["value"]};
        --shadow-panel: {spec["shadow_tokens"][1]["value"]};
      }}
      body {{
        background:
          radial-gradient(circle at top left, rgba(199, 239, 232, 0.24), transparent 28%),
          linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
      }}
    </style>
  </head>
  <body class="font-sans text-slate-900 antialiased">
    <main class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section id="page-header" class="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-panel">
        <div class="grid gap-8 px-6 py-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-10">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">Design system</p>
            <h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{html.escape(brand_name)}</h1>
            <p class="mt-4 max-w-3xl text-lg text-slate-300">{html.escape(tagline)}</p>
            <p class="mt-6 max-w-3xl text-sm leading-6 text-slate-400">This page is the normalized brand design system for human review and AI implementation. It documents source-backed brand rules plus shared system defaults for areas the Brand OS does not define explicitly.</p>
          </div>
          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <dl class="space-y-4 text-sm text-slate-300">
              <div><dt class="uppercase tracking-[0.16em] text-slate-500">Generated</dt><dd class="mt-1 text-slate-100">{html.escape(timestamp)}</dd></div>
              <div><dt class="uppercase tracking-[0.16em] text-slate-500">Output</dt><dd class="mt-1 text-slate-100">design-system/index.html</dd></div>
              <div><dt class="uppercase tracking-[0.16em] text-slate-500">CSS model</dt><dd class="mt-1 text-slate-100">Tailwind utility classes</dd></div>
              <div><dt class="uppercase tracking-[0.16em] text-slate-500">Purpose</dt><dd class="mt-1 text-slate-100">Reusable single-page source for future website execution</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="brand-summary" class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Brand summary</p>
          <h2 class="mt-3 text-2xl font-semibold text-slate-950">Core positioning</h2>
          <div class="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p><strong class="text-slate-950">Purpose:</strong> {html.escape(as_text(brand_profile.get("purpose", "n/a")))}</p>
            <p><strong class="text-slate-950">Mission:</strong> {html.escape(as_text(brand_profile.get("mission", "n/a")))}</p>
            <p><strong class="text-slate-950">Vision:</strong> {html.escape(as_text(brand_profile.get("vision", "n/a")))}</p>
            <p><strong class="text-slate-950">Category:</strong> {html.escape(as_text(brand_profile.get("positioning", {}).get("category", "n/a")))}</p>
            <p><strong class="text-slate-950">Main promise:</strong> {html.escape(as_text(brand_profile.get("positioning", {}).get("main_promise", "n/a")))}</p>
          </div>
        </article>
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Operating snapshot</p>
          <div class="mt-4 grid gap-5">
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Differentiators</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(differentiators[:4], "No differentiators documented.")}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Primary audience</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(audience_items, "No audience documented.")}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Priority services</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(service_items, "No services documented.")}</ul>
            </div>
          </div>
        </article>
      </section>

      <section id="brand-assets" class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div class="flex items-end justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Brand assets</p>
            <h2 class="mt-3 text-2xl font-semibold text-slate-950">Copied preview assets</h2>
          </div>
          <p class="max-w-2xl text-sm text-slate-500">Assets are copied into <code>design-system/assets/</code> so the page remains portable. Missing slots do not block generation.</p>
        </div>
        <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {''.join(asset_cards)}
        </div>
      </section>

      <section id="core-foundations" class="grid gap-6">
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Core foundations</p>
          <h2 class="mt-3 text-2xl font-semibold text-slate-950">Logo and identity rules</h2>
          <div class="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Do</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(logo_rules, "No logo rules documented.")}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Do not</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(logo_donts, "No logo misuse rules documented.")}</ul>
            </div>
          </div>
        </article>

        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">Color system</h2>
          <div class="mt-6 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-0 overflow-hidden rounded-3xl border border-slate-200">
              <thead class="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th class="px-4 py-3">Token</th>
                  <th class="px-4 py-3">Name</th>
                  <th class="px-4 py-3">Hex</th>
                  <th class="px-4 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {render_tokens(colors, ("id", "name_en", "hex", "role"))}
              </tbody>
            </table>
          </div>
        </article>

        <div class="grid gap-6 lg:grid-cols-2">
          <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 class="text-2xl font-semibold text-slate-950">Typography</h2>
            <ul class="mt-5 space-y-2 text-sm text-slate-600">{render_list(typography, "No typography rules documented. Use the copied brand font when available.")}</ul>
          </article>
          <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 class="text-2xl font-semibold text-slate-950">Layout and imagery</h2>
            <div class="mt-5 grid gap-5">
              <div>
                <h3 class="text-sm font-semibold text-slate-950">Layout rules</h3>
                <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(layout_rules, "No layout rules documented.")}</ul>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-slate-950">Imagery direction</h3>
                <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(imagery_style, "No imagery direction documented.")}</ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="visual-behavior" class="grid gap-6 lg:grid-cols-2">
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">Motion</h2>
          <p class="mt-3 text-sm text-slate-500">Shared implementation defaults. Replace only if the brand defines explicit motion behavior.</p>
          <ul class="mt-5 space-y-3 text-sm text-slate-600">{render_list([f"{item['name']} | {item['value']} | {item['ease']} | {item['usage']} | {item['source']}" for item in spec["motion_tokens"]], "No motion tokens.")}</ul>
        </article>
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">Shadows</h2>
          <ul class="mt-5 space-y-3 text-sm text-slate-600">{render_list([f"{item['name']} | {item['value']} | {item['usage']} | {item['source']}" for item in spec["shadow_tokens"]], "No shadow tokens.")}</ul>
        </article>
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">Borders</h2>
          <ul class="mt-5 space-y-3 text-sm text-slate-600">{render_list([f"{item['name']} | {item['value']} | {item['usage']} | {item['source']}" for item in spec["border_tokens"]], "No border tokens.")}</ul>
        </article>
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">Radii and spacing</h2>
          <div class="grid gap-5">
            <ul class="space-y-3 text-sm text-slate-600">{render_list([f"{item['name']} | {item['value']} | {item['usage']} | {item['source']}" for item in spec["radius_tokens"]], "No radius tokens.")}</ul>
            <ul class="space-y-3 text-sm text-slate-600">{render_list([f"{item['token']} | {item['value']} | {item['usage']} | {item['source']}" for item in spec["spacing_scale"]], "No spacing scale.")}</ul>
          </div>
        </article>
      </section>

      <section id="voice-content-rules" class="grid gap-6 lg:grid-cols-2">
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">Voice and content rules</h2>
          <div class="mt-5 grid gap-5">
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Tone</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(tone_words, "No tone rules documented.")}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Communication principles</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(communication_principles, "No communication principles documented.")}</ul>
            </div>
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <h3 class="text-sm font-semibold text-slate-950">Preferred words</h3>
                <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(preferred_words, "No preferred words documented.")}</ul>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-slate-950">Forbidden words</h3>
                <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(forbidden_words, "No forbidden words documented.")}</ul>
              </div>
            </div>
          </div>
        </article>
        <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 class="text-2xl font-semibold text-slate-950">AI usage guardrails</h2>
          <div class="mt-5 grid gap-5">
            <div>
              <h3 class="text-sm font-semibold text-slate-950">AI can say</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(ai_rules.get("ai_can_say", [])[:5], "No allowed guidance documented.")}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-950">AI must not say</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(ai_rules.get("ai_must_not_say", [])[:5], "No restricted language documented.")}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-950">Claims requiring approval</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">{render_list(ai_rules.get("claims_that_require_human_approval", [])[:5], "No approval-gated claims documented.")}</ul>
            </div>
          </div>
        </article>
      </section>

      <section id="component-system" class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div class="flex items-end justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Component system</p>
            <h2 class="mt-3 text-2xl font-semibold text-slate-950">Base plus custom website components</h2>
          </div>
          <p class="max-w-2xl text-sm text-slate-500">The section structure is fixed. The custom component list may vary by client.</p>
        </div>
        <div class="mt-8 grid gap-10">
          {render_components("Base components", base_components)}
          {render_components("Custom components", custom_components)}
        </div>
      </section>

      <section id="implementation-notes" class="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-panel">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Implementation notes</p>
        <div class="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <h2 class="text-2xl font-semibold">Tailwind execution rules</h2>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>Use Tailwind utility classes as the primary styling model for downstream website sections.</li>
              <li>Preserve documented color, typography, shadow, border, and motion tokens instead of ad hoc visual decisions.</li>
              <li>Use this page as the implementation source before creating pages, sections, or components.</li>
            </ul>
          </div>
          <div>
            <h2 class="text-2xl font-semibold">Generation notes</h2>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>Source-backed brand data comes from Brand OS structured JSON.</li>
              <li>Motion, shadow, border, radius, and spacing tokens are shared system defaults unless the brand explicitly overrides them.</li>
              <li>Regenerate the file through the skill when the brand source or the shared structure changes.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
"""
    return html_out


def main():
    parser = argparse.ArgumentParser(description="Generate a brand design system HTML page.")
    parser.add_argument("--brand-os-dir", required=True)
    parser.add_argument("--brand-assets-dir", default="brand/assets")
    parser.add_argument("--output-dir", default="design-system")
    parser.add_argument("--components-file")
    parser.add_argument("--validate-only", action="store_true")
    args = parser.parse_args()

    brand_os_dir = Path(args.brand_os_dir)
    brand_assets_dir = Path(args.brand_assets_dir)
    output_dir = Path(args.output_dir)
    script_dir = Path(__file__).resolve().parent

    data = read_brand_data(brand_os_dir)
    spec, base_components = read_spec(script_dir)
    custom_components = validate_custom_components(Path(args.components_file)) if args.components_file else []

    logo_asset = select_asset(brand_assets_dir, "logo", (".svg", ".png", ".jpg", ".jpeg", ".webp"), ("ativo 1", "principal", "primary"))
    pattern_asset = select_asset(brand_assets_dir, "padro", (".svg", ".png", ".jpg", ".jpeg", ".webp"), ("prancheta 1",))
    supporting_asset = select_asset(brand_assets_dir, "3d", (".png", ".jpg", ".jpeg", ".webp"), ("export",))
    font_asset = None
    for candidate in (
        brand_assets_dir / "Tipografia Institucional/Urbanist/Urbanist-VariableFont_wght.ttf",
        brand_assets_dir / "Tipografia Institucional/Urbanist/static/Urbanist-Regular.ttf",
    ):
        if candidate.exists():
            font_asset = candidate
            break

    if args.validate_only:
        print("Validation passed.")
        print(f"Brand OS directory: {brand_os_dir}")
        print(f"Output directory: {output_dir}")
        print(f"Base components: {len(base_components)}")
        print(f"Custom components: {len(custom_components)}")
        print(f"Logo asset: {logo_asset if logo_asset else 'missing'}")
        print(f"Pattern asset: {pattern_asset if pattern_asset else 'missing'}")
        print(f"Supporting asset: {supporting_asset if supporting_asset else 'missing'}")
        print(f"Font asset: {font_asset if font_asset else 'missing'}")
        return

    assets_dir = output_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    copied_assets = {
        "Logo": copy_asset(logo_asset, assets_dir, f"logo{logo_asset.suffix.lower()}" if logo_asset else "logo"),
        "Pattern": copy_asset(pattern_asset, assets_dir, f"pattern{pattern_asset.suffix.lower()}" if pattern_asset else "pattern"),
        "Supporting visual": copy_asset(supporting_asset, assets_dir, f"supporting-visual{supporting_asset.suffix.lower()}" if supporting_asset else "supporting-visual"),
        "Brand font": copy_asset(font_asset, assets_dir, "urbanist.ttf"),
    }

    html_output = build_html(data, spec, base_components, custom_components, copied_assets)
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "index.html").write_text(html_output, encoding="utf-8")

    print("Generated design system successfully.")
    print(f"Wrote: {output_dir / 'index.html'}")
    print(f"Copied assets to: {assets_dir}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
