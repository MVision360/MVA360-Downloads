# Editing the MVA360 website

You can change the website yourself in your web browser. You don't need any software.

## How to make a change

1. Go to **github.com/MVision360/MVA360-Downloads** and click the file you want to change (the table below says which).
2. Click the **pencil icon** (top right of the file), or press `e`.
3. Find the text with **Ctrl+F** (Cmd+F on a Mac) using the search words in this guide, and change it.
4. Click **Commit changes…**, write a short note (e.g. "Update Coach price"), and click **Commit changes**.
5. Wait 1–2 minutes, then refresh **mva360.com.au**. If you still see the old version, press Ctrl+F5 (Cmd+Shift+R on a Mac).

### Three rules that keep the page from breaking

- **Only change the words between the tags.** In `<p>Your first game is free.</p>`, change `Your first game is free.`. Leave `<p>` and `</p>` alone.
- **Keep the quote marks.** In `data-monthly="$25"`, change only `$25`.
- **Don't type `<`, `>` or `&` in normal text.** Write "and" instead of "&". If you need the symbol, write `&amp;` for &.

### If something goes wrong

Open the file, click **History**, click the change before yours, then the **⋯** menu → **View file**. Copy the old text back into the file and commit it. Or tell Claude what happened and it will put it right.

## Where things are

| To change… | File | Search for |
|---|---|---|
| Headline and intro on the home page | `index.html` | `<h1>` |
| Feature descriptions and screenshot captions | `index.html` | the words you can see on the site |
| Plan names, who they're for and what's included | `index.html` | `plan-parent`, `plan-coach`, `plan-club` |
| Prices | see **Changing a price** below | |
| "Prices are in Australian dollars…" note | `index.html` | `price-footnote` |
| Questions and answers | `index.html` | `<summary>` (each question is a `<details>` block) |
| Download page wording | `download.html` | the words you can see on the site |
| Terms, privacy, refunds | `legal/terms.html`, `legal/privacy.html`, `legal/refunds.html` | the words you can see on the site |
| Support email address | every `.html` file | `support@mva360.com.au` |
| Colours | `assets/site.css` | `--orange`, `--navy`, `--chalk` near the top |

The **top menu and footer are copied in every page**. If you change a menu link, change it in `index.html`, `download.html` and the three `legal/` pages.

## Adding a question

In `index.html`, copy one whole block from `<details>` to `</details>`, paste it straight after itself, and change the question and answer:

```html
<details>
  <summary>Can I use MVA360 for futsal?</summary>
  <p>Yes. Any match video works.</p>
</details>
```

## Replacing a screenshot

Screenshots are in `assets/img/`. Only use invented teams and players, never a real squad's names or faces.

1. Save the new picture with **exactly the same file name** as the one it replaces (e.g. `season.webp`). PNG or JPG works too, but then update the file name in `index.html` (search for the old name).
2. In GitHub, open the `assets/img` folder → **Add file** → **Upload files**. Drag the picture in and commit. A file with the same name is replaced.
3. If the new picture is a different shape, update `width="…" height="…"` in its `<img>` line in `index.html` to the picture's real size in pixels. That stops the page jumping while it loads.

Keep pictures under about 300 KB. squoosh.app shrinks them for free and can save as WebP.

## Publishing an installer (from launch)

1. In this repository click **Releases** → **Draft a new release**. Tag it with the version (e.g. `v1.0.0`) and drag in the Windows and Mac installers.
2. In `download.html`, replace the "launches in March 2027" text with download buttons pointing to the release files. Claude can do this step for launch day.

## Changing a price

Prices live in **three places that must match**. Do all three on the same day.

**1. Website** (`index.html`, search `data-monthly`). Each plan has two lines:

```html
<p class="price" data-monthly="$25" data-annual="$250"><span class="amount">$25</span>…
<p class="price-sub" data-monthly="Billed monthly. Cancel any time." data-annual="Billed yearly, about $20.83 a month.">…
```

Change `data-monthly`, `data-annual`, the number inside `<span class="amount">` (same as monthly), and the "about $… a month" figure (annual price ÷ 12).

**2. Licence server** (MVA360-Program repository, file `licence_server/config.py`, near the top). Prices are in **cents**: $25 is `2500`, $250 is `25000`.

```python
"coach": {"name": "Coach", "devices": 2, "prices": {"monthly": 2500, "annual": 25000}},
```

**3. Pin Payments.** After the server has been updated and redeployed, run these on the server, once for each price that changed:

```
python -m licence_server.admin reset-plan coach monthly
python -m licence_server.admin create-plans
```

New customers get the new price. **Existing subscribers stay on their old price.** The terms promise 30 days' notice before you change what an existing customer pays, so moving them is a separate job. Ask Claude when you need it.

Steps 2 and 3 need a server redeploy, so it's simplest to ask Claude to do them for you.

## Things Claude should do for you

- Anything on the licence server: the subscribe, manage and email pages, or plans and prices.
- Adding a whole new page, or changing the page layout.
- Anything in the app itself (the MVA360-App repository).
