# Poornachandra Portfolio

A static portfolio website made with plain HTML, CSS and JavaScript. No install, no database, no paid service, no API keys.

```
poornachandra-portfolio/
  index.html      page content (skills and projects are edited here)
  style.css       colours, layout, animations
  script.js       contact details, certificate list, interactive features
  resume.html     Resume page (preview + download)
  resume.js       small script used only by resume.html
  404.html        "page not found" page (works on GitHub Pages and Vercel)
  README.md
  assets/
    certificates/ put your real certificate files here
    images/       put any images here
    icons/        favicon.svg
    resume/       your resume PDF
```

## 1. Run it on Windows with VS Code

1. Install VS Code from https://code.visualstudio.com if you don't have it.
2. Unzip `Poornachandra-Portfolio.zip`. Right-click the ZIP, choose **Extract All**.
3. Open VS Code. Choose **File > Open Folder** and select the `poornachandra-portfolio` folder.
4. Press `Ctrl+Shift+X`, search for **Live Server** (by Ritwick Dey), and click **Install**.
5. Open `index.html`, right-click inside it, and choose **Open with Live Server**.
6. Your browser opens the site. It reloads when you save a file.

**No extensions?** Double-click `index.html` to open it in your browser. Everything works this way too, though PDF previews can be blocked by some browsers when opened from a plain file. Live Server avoids that.

**Python method:** open a terminal in the folder and run `python -m http.server 8000`, then visit http://localhost:8000.

## 2. Contact details

Your details are already set in the `CONTACT` block at the top of `script.js`. To change one later, edit it there and save. WhatsApp uses digits only with the country code (for example `918639346260`). LinkedIn and Instagram take only the username part of the link.

The contact form opens the visitor's email app addressed to you. It does not send messages by itself, because there is no server.

## 2b. Add your profile photo

1. Save your photo as `profile.jpg` in `assets/images/`. A square photo of your face works best.
2. Refresh the page. It replaces the "PC" initials in the profile card.

Until `profile.jpg` exists, the PC initials show instead. If your photo is a PNG, either rename it to `profile.jpg` or change the file name in `index.html` (search for `profilePhoto`).

## 3. Add your real certificates

1. Copy your genuine certificate files (`.png`, `.jpg`, `.webp` or `.pdf`) into `assets/certificates/`. Use simple names, for example `python-course.pdf`.
2. Open `script.js` and find the `CERTIFICATES` list.
3. Add one line per file. The file name must match exactly:

```js
const CERTIFICATES = [
  { file: "assets/certificates/python-course.pdf", title: "Python Course", issuer: "Issuer name", date: "March 2026" },
  { file: "assets/certificates/web-basics.png", title: "Web Basics" },
];
```

4. Save. Each card shows a preview with **View Original** (opens the file) and **Download Original** buttons.
5. `issuer` and `date` are optional. They only show if you write them. Don't add anything you can't prove.
6. To **remove** a certificate, delete its line (and the file if you want).

Visitors cannot upload anything. Certificates are managed only in `script.js`. Until you add one, the page shows "Certificates coming soon".

## 3b. Update your resume

Replace `assets/resume/Poornachandra-Resume.pdf` with your new PDF and keep the same file name. The Resume page and its Download button then use the new file. Visitors save it as `Poornachandra-Resume.pdf`.

## 4. Edit skills and projects

Open `index.html`. Search for `EDIT SKILLS` for the skills block. Each project is an `<article class="card project">`. Change the text, chips, and links there. Add `data-cat="web"`, `python`, `ai` or `concept` so the filter buttons work.

## 5. Publish for free

Nothing is published automatically. Do this only when you are ready.

**GitHub Pages**
1. Create a new repository on GitHub (for example `portfolio`). Use a new one, so you don't overwrite your existing projects.
2. Upload all the files (keep the folder structure), or use GitHub Desktop.
3. Go to **Settings > Pages**. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After a minute your site is at `https://poornachandra3217-glitch.github.io/portfolio/`.

**Vercel**
1. Sign in at https://vercel.com with GitHub.
2. Click **Add New > Project**, import the repository, and click **Deploy**. No settings are needed.

## 6. Before you share it

- Add `profile.jpg` and your certificates.
- Check the project descriptions against your repositories. I wrote them from your public READMEs. In particular, check the **SaiU Timetable** card (its technology chips are generic) and the **Mantra** live link, which I took from its README.
- Optional share image: put `og.png` in `assets/images/` and add an `og:image` tag in `index.html` (a comment shows where).
- Favicon: `assets/icons/favicon.svg` already works. To change it, replace that file.

## Features

Dark and light theme toggle (remembered), mobile menu, sticky navigation with active link, scroll-reveal, project filters, certificate gallery, back-to-top, automatic footer year, and reduced-motion support. If JavaScript fails, all text content is still visible.
