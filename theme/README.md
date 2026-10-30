# The theme of the component sites

The templates and the style every site of loken-ai shares. A site is built by `mdkt site` from its
own documents, and names this directory as its `theme`.

| Path                           | What it holds                                                            |
| ------------------------------ | ------------------------------------------------------------------------ |
| `templates/base.html`          | the page: header with the menu, footer, the blocks `title`, `main`, `script` |
| `templates/page.html`          | a document, with the side menu of its section when the section has one   |
| `templates/section.html`       | the index of a section: a card for each page                             |
| `templates/partials/showcase.html` | the scenes in a list and the picture of the chosen one beside it         |
| `templates/partials/hero.html`     | the top of a home page: title, lede, buttons, install line and the box |
| `static/theme.css`             | the layer of style for documents, over `/site.css` of the root site      |
| `static/showcase.js`           | what the showcase does: advance, hold, choose, pause, enlarge            |
| `static/theme.js`              | the switch between the light and the dark theme                          |
| `static/search.js`             | the palette that searches the titles of the site                         |

A site replaces any template by writing one of the same name in its own `templates`, and any file
by writing one of the same name in its own `static`.

## Using it

The documents and the properties of a site stay in its repository. Its `mdkt.toml` names the theme.

```
[site]
title = "lokode"
theme = ".theme/theme"
```

The build gets the current theme, then builds the site.

```
- uses: actions/checkout@v5
  with:
    repository: loken-ai/loken-ai.github.io
    ref: main
    path: .theme
- run: mdkt site mdkt.toml -o public
```

To work on a site with the theme next to it, point `theme` at the checkout of this repository.

## Search

The header has a button that opens a palette, and the slash key and Ctrl+K open it too. It reads
`search.json`, the index of the titles that `mdkt site` writes, so a site gets it with nothing to
configure. `search = false` in the properties file turns it off.

## Light and dark

Each page has a button in its header that flips between the light and the dark theme. Without a choice, the
system decides. The choice is kept by the browser, and applied before the page is drawn. The
images that come in a light and a dark variant, written as a `picture` with a dark `source`, follow
the choice as well.

## Versions

A site takes the theme from `main` at each build, so a change to the theme reaches every site on its
next publication. To freeze a site on one state of the theme, set `ref` to a tag or a commit.

## What a template can read

The variables are those of `mdkt site`, described in its documentation: `site`, `nav`, `page`,
`section` and `data`. The theme also reads:

| Name                | Where                  | Meaning                                                       |
| ------------------- | ---------------------- | ------------------------------------------------------------- |
| `slides`            | the showcase           | a list of `name`, `title` and `caption`, set before the include        |
| `data.hero`         | the hero               | `tag`, `lede`, `install`, and `primary` and `secondary`, each with a `label` and a `url` inside the site |
| `data.facts`        | the hero               | a list of short facts shown as pills                          |
| `images`            | the showcase           | where the images are served, ending with a slash, the `img/` directory of the site by default |
| `carousel_label`    | the showcase           | the label a screen reader reads for the showcase              |
