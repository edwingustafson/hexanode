# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Node.js/TypeScript port of [hexagonz](https://github.com/edwingustafson/hexagonz) — a hexagonal photo filter that tiles an input image with colored hexagons sampled from the original pixels. Input: `input.jpg` in the project root. Output: `output.png` and `output.avif` in the project root.

## Running

```bash
yarn main        # runs: tsx hexanode.ts
```

Place `input.jpg` in the project root before running. The hexagon tile size defaults to 96px and can be overridden via `.env` or environment variable:

```bash
DX=48 yarn main
```

## Dependencies

Install with:

```bash
yarn install
```

The `canvas` package requires native system libraries. In the devcontainer these are installed automatically via `.devcontainer/postCreateCommand.sh` (`libcairo2-dev`, `libpango1.0-dev`, `libjpeg-dev`, `libgif-dev`, `librsvg2-dev`). Outside the devcontainer, install these via your system package manager before running `yarn install`.

## Architecture

- **`hexanode.ts`** — entry point and orchestration. Reads `input.jpg` with `sharp`, samples pixel colors, renders a point-topped hexagonal grid onto a `canvas`, then writes `output.png` (max compression) and `output.avif` (quality 50) via `sharp`.
- **`lib/hexagon.ts`** — draws a single filled hexagon onto a canvas 2D context given center `(x, y)`, radius `r`, and a `Color`.
- **`lib/color.ts`** — simple RGB color value class with a `toString()` for canvas `fillStyle`.

The grid is a **point-topped** offset hexagonal layout: columns advance by `dx`, rows by `dy = 3r`, with alternating columns offset by `(0.5w, 1.5h)` to produce the honeycomb pattern. Each hexagon is filled with the color sampled from the corresponding source pixel position.

TypeScript is executed directly via `tsx` (no separate compile step). The project uses ES modules (`"type": "module"`).
