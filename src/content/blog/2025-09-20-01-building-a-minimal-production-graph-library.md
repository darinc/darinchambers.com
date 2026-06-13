---
title: 'Building the Exact Graph Library I Needed'
date: '2025-09-20'
tags: ['open-source', 'visualization', 'typescript', 'ai-engineering', 'claude-code']
summary: 'Every graph library is either a massive toolkit or a heavyweight framework. I needed something specific: zero-dependency, SVG-based, force-directed, mobile-ready, under 30KB. So Claude Code and I built it in a week.'
---

Every graph visualization library makes the same trade-off. D3 (~90KB) gives you raw primitives and expects you to build everything yourself. Cytoscape (~170KB) gives you everything and expects you to carry the weight. I needed neither. I needed a focused, opinionated library that renders force-directed SVG graphs with touch support, dark mode, and nothing else. 28KB gzipped. Zero dependencies.

So I built <a href="https://github.com/darinc/svgnet" target="_blank" rel="noopener noreferrer">svgnet</a>. Check out the <a href="https://darinc.github.io/svgnet" target="_blank" rel="noopener noreferrer">project page</a>.

<div class="side-by-side-layout">
<div class="content-column">

## The Starting Point

A lunchtime prompt to Gemini Pro 2.5 produced a working prototype. SVG rendering, basic force-directed layout, functional but monolithic. It proved the concept: you don't need D3's entire ecosystem to draw nodes and edges.

That prototype became the specification. Over the next week, Claude Code and I rebuilt it into a production library through a series of deliberate engineering sprints. Not exploratory — directed. I made the architectural decisions, Claude handled the volume.

</div>
<div class="graph-column">

<div id="blog-graph-demo" class="graph-container" data-graph-src="/data/blog-graph-demo.json" style="width: 100%; height: 350px; border: 1px solid #333;"></div>

</div>
</div>

## Architecture Over Iteration

The prototype was a 1,500-line God Object. That's fine for a proof of concept. It's not fine for a library other people might use.

We broke it into a modular system: a physics engine, a renderer, an event bus, and a UI manager. Each component owns one concern. Dependency injection wires them together. The main class dropped by 70%.

Then we migrated the entire codebase to strict TypeScript, writing tests at every step. By the end of the first 24 hours of real work, we had 92 unit tests and a CI/CD pipeline.

## Hunting God Objects

AI-generated code has a specific failure mode: it loves God Objects. Claude Code built clean modules, but under pressure to ship features, several components bloated past 1,000 lines.

An audit prompt caught them all. We spent a full day on targeted decomposition:

- **3,300-line core class** → EventBus + dependency injection. 91% complexity reduction.
- **900-line renderer** → focused rendering managers. 78% reduction.
- **1,000-line event manager** → split by concern. 80% reduction.
- **800-line UI manager** → five focused components. 76% reduction.

The result: 466 passing tests across 38 modules. Every component testable in isolation.

## What You Get

svgnet does exactly what it's designed to do:

- **Force-directed layout** with configurable physics (damping, repulsion, attraction)
- **Multiple node shapes** — circle, rectangle, triangle, plus a factory pattern for custom shapes
- **Mobile-native** — pinch-zoom, drag, double-tap filtering. Not bolted on, built in.
- **Dark/light theming** via CSS custom properties
- **Layout persistence** — `exportState()` / `importState()` to save user arrangements
- **Directed and undirected edges** in the same graph, with optional arrowheads
- **28KB gzipped. Zero dependencies.**

If you need a general-purpose visualization toolkit, use D3. If you need a full graph analysis framework, use Cytoscape. If you need an opinionated, lightweight graph renderer that works on mobile — this is it.

## What AI-Assisted Engineering Actually Looks Like

There's no magic here. The week broke down into a pattern: I set the architectural direction, Claude Code executed at volume, I audited the output, we iterated.

The useful parts: TypeScript migration with tests at every step. Bulk API implementation. Consistent code style across 38 modules. The dangerous parts: God Objects, over-abstraction, feature creep. Every one of those required a human to catch and correct.

AI didn't replace the engineering. It compressed the timeline. A week of spare-time work, ~100 commits, and a library that does exactly one thing well.
