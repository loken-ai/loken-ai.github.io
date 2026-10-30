# The theme of the component sites

The templates and the style every site of loken-ai shares. A site is built by `mdkt site` from its
own documents, and names this directory as its `theme`.

| Path                           | What it holds                                                            |
| ------------------------------ | ------------------------------------------------------------------------ |
| `templates/base.html`          | the page: header with the menu, footer, the blocks `title`, `main`, `script` |
| `templates/page.html`          | a document, with the side menu of its section when the section has one   |
| `templates/section.html`       | the index of a section: a card for each page                             |
| `templates/partials/carousel.html` | a carousel of screens, to include from a page                        |
| `static/theme.css`             | the layer of style for documents, over `/site.css` of the root site      |
| `static/carousel.js`           | what the carousel does: scroll, pause, enlarge                           |

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

## Versions

A site takes the theme from `main` at each build, so a change to the theme reaches every site on its
next publication. To freeze a site on one state of the theme, set `ref` to a tag or a commit.

## What a template can read

The variables are those of `mdkt site`, described in its documentation: `site`, `nav`, `page`,
`section` and `data`. The theme also reads:

| Name                | Where                  | Meaning                                                       |
| ------------------- | ---------------------- | ------------------------------------------------------------- |
| `slides`            | the carousel           | a list of `name` and `caption`, set before the include        |
| `images`            | the carousel           | where the images are served, ending with a slash, the `img/` directory of the site by default |
| `carousel_label`    | the carousel           | the label a screen reader reads for the carousel              |
