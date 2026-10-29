# loken-ai.github.io

The root of <https://loken-ai.github.io/>: the page that leads to every component, and
`site.css`, the stylesheet every loken-ai site links as `/site.css`.

Each component serves its own site under its name, built from its own repository:

| Path | Repository | Built by |
|---|---|---|
| `/loken/` | [loken](https://github.com/loken-ai/loken) | `scripts/site.py`, on every push to `main` |
| `/benchmarks/` | [benchmarks](https://github.com/loken-ai/benchmarks) | `scripts/site.py`, on every push to `main` |

The brand assets come from the [.github](https://github.com/loken-ai/.github) repository,
under `brand/`.
