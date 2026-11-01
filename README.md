# loken-ai.github.io

The site of every loken-ai component, served at <https://loken-ai.github.io/>.
The site is built by dkt from `dkt.toml` and the theme in `theme/`, when the workflow `Pages` is run.

| Path | Holds | Submodule |
|---|---|---|
| `/loken/` | the documentation of loken | `.src/loken`, on `main` |
| `/lokode/` | the documentation of lokode | `.src/lokode`, at its release |
| `/lokraft/` | the documentation of lokraft | `.src/lokraft`, at its release |
| `/lokprof/` | the documentation of lokprof | `.src/lokprof`, at its release |
| `/lokpit/` | the documentation of lokpit | `.src/lokpit`, at its release |
| `/benchmarks/` | the documentation of the campaign | `.src/benchmarks`, on `main` |
| `/benchmarks/results/` | the results of the campaign | the same submodule, built by its `scripts/site.py` |

The logos come from the submodule `.brand-src`, the repository [.github](https://github.com/loken-ai/.github).

## Publishing the site after a batch of releases

Nothing runs by itself.
When the releases of a batch are out, in this repository:

1. For each released component, point its submodule at the tag: `git -C .src/NAME fetch --tags && git -C .src/NAME checkout vX.Y.Z`.
2. For `loken` and `benchmarks`, which have no release to follow, take the head of `main`: `git submodule update --remote .src/loken .src/benchmarks`.
3. Set `release` of each component in the table `data.components` of `dkt.toml`.
4. Commit the submodules and `dkt.toml`, then push.
5. Run the workflow: `gh workflow run pages.yml --repo loken-ai/loken-ai.github.io`.
