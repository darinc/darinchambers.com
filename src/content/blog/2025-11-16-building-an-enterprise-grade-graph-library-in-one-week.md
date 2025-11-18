---
title: 'Building an Enterprise Graph Library in One Week'
date: '2025-11-16'
tags: ['open-source', 'visualization', 'typescript', 'vibe-coding', 'claude-code']
summary: 'What vibe coding looks like taken to an extreme.  Claude Code and I programmed a zero-dependency SVG graph library with force-directed physics and touch-optimized gestures in a week in my spare time.  Why?  I wanted to see how far one could push vibe coding, and I learned a lot along the way.'
---

I love force directed graphs.  They bring me joy.  I bumped into a really neat proprietary SVG force directed graph library.  Unable to find it as open-source I tasked Gemini Pro 2.5 to build one.  Within the confines of lunchtime we had a plain but working SVG graph library.  What happened over the next week was an exercise in seeing how far we could go with vibe coding.  Check out the <a href="https://darinc.github.io/SVG-Graph-Network/" target="_blank" rel="noopener noreferrer">finished project page</a>. and the code: <a href="https://github.com/darinc/SVG-Graph-Network" target="_blank" rel="noopener noreferrer">SVG-Graph-Network</a>.

<div class="side-by-side-layout">
<div class="content-column">

## The Lunchtime Project Gets Ambitious

That "lunchtime project" didn't stay a simple toy. By that first evening, the "vibe" was strong. We had a new dataset, light/dark modes, collapsible legends, and multiple node shapes.

Then, on Thursday, the project hit its inflection point.

We'd just added comprehensive mobile and touch support. The physics kept running while dragging nodes. And then... we wrote the roadmap.

This was the moment "vibe coding" collided with "best practices." The project, which had zero users, was suddenly slated for a full architectural overhaul.

</div>
<div class="graph-column">

<div id="blog-graph-demo" class="graph-container" data-graph-src="/data/blog-graph-demo.json" style="width: 100%; height: 350px; border: 1px solid #333;"></div>

</div>
</div>

## The Great Refactoring

The initial code was a 1,500-line monolithic "God Object." It worked, but it wasn't _right_.

So, we did the "unnecessary" thing and tore it down to the studs.

- **Thursday:** We began an "aggressive architectural refactoring," breaking that huge file into a modular system: a physics engine, a UI manager, a renderer, and an event manager. The main class size was cut by 70%.
- **Thursday Night:** The vibe turned professional. We added 92 unit tests, a full CI/CD pipeline, and then...
- **Thursday, 10 PM:** We started the full TypeScript migration.

## From "Vibe" to "Production-Ready"

Friday was a blur. We completed the TypeScript migration and implemented professional-grade APIs for core data and bulk operations. The roadmap was updated: **"Production Readiness Upgrade: 4/10 → 7/10"**

In 24 hours, the project had gone from a toy to a serious library. We immediately added 38 new methods for selection, highlighting, and camera control.

Then we added the _real_ professional infrastructure:

- TypeDoc for API docs
- Husky pre-commit hooks
- Lint-staged for quality gates
- Size-limit for bundle monitoring (it's 19.53KB brotlied, by the way)

## The Day of Deconstruction

The project was looking good, but the "God Objects" we'd created _during_ the refactor were bothering me. Sunday was the day we paid the technical debt we had just incurred.

We didn't just refactor _one_ God Object; we hunted down _all_ of them.

- **The 3,300-line God Object:** Refactored with an EventBus and dependency injection. **Result: 91% complexity reduction.**
- **The 900-line Renderer:** Decomposed into focused managers. **Result: 78% complexity reduction.**
- **The 1,000-line Event Manager:** Broken apart. **Result: 80% complexity reduction.**
- **The 800-line UI Manager:** Split into five components. **Result: 76% complexity reduction.**

By the end of the day, we had **466 passing tests**, and the architecture was clean, testable, and maintainable.

## The "Honest README"

The sprint finished on Tuesday with a final, crucial commit: we wrote the documentation, which included a section honestly recommending _against_ using this for most production systems. It points everyone to D3.js, Cytoscape, and the other giants.

Because that was never the point.

This was about the joy of the craft. It was an exercise in seeing how far a developer-AI pair could push a "vibe" and still land on a foundation of rock-solid, professional-grade best practices.

We "shipped" it on Wednesday by building the GitHub Pages site and, in a final act of dogfooding, using the library itself to visualize its own internal module dependencies.

At the end of the day? It's a graph library. But for me, it's a one-week, 100-commit testament to seeing if humans and AI can build things _right_ when pushing the envolope of what is possible.
