# ARITI — A cute page of reasons

This is a small single-page site to collect and display reasons why you love ARITI.

Files:
- `index.html` — main page
- `styles.css` — visual styles
- `script.js` — client logic (initial reasons, add-reason, localStorage)
- `heart.svg` — small decorative heart

How to use:

1. Open `index.html` in a browser.
2. Add new reasons using the input. Tip: type "Your smile - It brightens my days" to include a title and optional detail separated by `-`.

Hosting suggestions:
- You can host on GitHub Pages by pushing these files to a repo and enabling Pages for the `main` branch.
- Or deploy to Netlify/Vercel by connecting the repo.

Next ideas:
- Add an edit/delete UI for reasons
- Add animations and photo gallery
- Add printable PDF card

Try it locally

- Open the folder and double-click `index.html` to open in your default browser.
- Or run a simple local server (Python):

```powershell
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

Quick GitHub Pages deploy (one way):

1. git init; git add .; git commit -m "Add ARITI site";
2. Create a repository on GitHub and push the code.
3. In the repo settings enable GitHub Pages from the `main` branch (or `gh-pages`).

