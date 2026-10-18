# taresh-bansal.github.io

Personal academic website of Taresh Bansal (M.E. Computer Science, BITS Pilani), served by GitHub Pages at https://taresh-bansal.github.io/.

Plain static HTML, no build step (`.nojekyll` makes GitHub Pages serve the files as they are). Dark theme by default, with a light/dark toggle that is remembered per browser.

| Path | Page |
|---|---|
| `index.html` | About: bio, highlights, news, selected publications |
| `publications/` | Publications with summaries and BibTeX |
| `projects/` | Project index; one case-study page per project in `projects/<slug>/` |
| `teaching/` | Teaching-assistant appointments |
| `cv/` | Embedded CV with download button |
| `404.html` | Not-found page |
| `assets/css/main.css` | All styles (dark default, light theme, print) |
| `assets/js/theme.js` | Theme toggle, mobile menu, summary/BibTeX toggles |
| `assets/Taresh_Bansal_CV.pdf` | Academic CV |
| `assets/img/og-card.png` | 1200x630 social preview image |

Links are root-relative (`/projects/`), so preview locally with a server from the repo root, e.g. `python3 -m http.server 8000`, then open http://localhost:8000/.
