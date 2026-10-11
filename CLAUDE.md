# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Node.js/TypeScript port of [hexagonz](https://github.com/edwingustafson/hexagonz) — a hexagonal photo filter that tiles an input image with colored hexagons sampled from the original pixels. Input: `input.jpg` in the project root. Output: `output.png` in the project root.

## Running

```bash
yarn main        # runs: node --env-file=.env hexanode.ts
```

Place `input.jpg` in the project root before running. A `.env` file must exist (it may be empty) because `--env-file` fails when the file is missing. The hexagon tile size `DX` defaults to 48px and can be overridden in `.env` or via environment variable:

```bash
DX=36 yarn main
```

## Dependencies

Requires Node.js 24+ (native TypeScript type-stripping). Install with:

```bash
yarn install
```

Rendering uses `@napi-rs/canvas` (Skia), which ships prebuilt binaries — no native system libraries are required.

## Architecture

- **`hexanode.ts`** — entry point and orchestration. Reads `input.jpg` as raw RGB with `sharp`, renders a point-topped hexagonal grid onto an `@napi-rs/canvas` canvas, then writes `output.png` (compression level 9) via `sharp`.
- **`lib/hexagon.ts`** — draws a single filled hexagon onto an `SKRSContext2D` given center `(x, y)`, radius `r`, and a `Color`.
- **`lib/color.ts`** — immutable RGB color value class with a `toString()` for canvas `fillStyle`.
- **`lib/clamp.ts`** — numeric clamp helper (replaces the former `lodash-es` dependency).

The grid is a **point-topped** offset hexagonal layout: columns advance by `dx`, rows by `dy = 3r` (where `r = dx / √3 + 1`), with each cell drawing a second hexagon offset by `(0.5dx, 1.5r)` to produce the honeycomb pattern. Each hexagon is filled with the color of the source pixel at its center, clamped to the image bounds.

## Conventions

- TypeScript runs directly via Node's built-in type-stripping — there is no `tsx`, no compile step, and no `tsconfig.json`. Use only erasable TypeScript syntax (no enums, namespaces, or parameter properties) and import local modules with explicit `.ts` extensions.
- The project uses ES modules (`"type": "module"`).
- Types-only packages (`@types/*`) belong in `devDependencies`.
