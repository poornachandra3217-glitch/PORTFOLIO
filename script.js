/* =====================================================================
   Your contact details (edit here any time)
   - email:     your email address
   - whatsapp:  digits only, with country code, e.g. "919876543210"
   - linkedin:  the part after linkedin.com/in/
   - instagram: your username without the @
   ===================================================================== */
const CONTACT = {
  email: "poornachandra3217@gmail.com",
  whatsapp: "918639346260",
  linkedin: "poorna-chandra-manupati-708194387",
  instagram: "poorna3217",
  github: "poornachandra3217-glitch",
};

/* =====================================================================
   Your real certificates (visitors cannot upload anything; you manage this list)
   1. Copy the real file into assets/certificates/
   2. Add one line below. The file name must match exactly (spaces and capitals count).
   Only "file" and "title" are needed. Add issuer/date only if you want them shown.
   To remove a certificate, delete its line.

   Example (delete the // to use):
   { file: "assets/certificates/python-course.pdf", title: "Python Course", issuer: "Issuer name", date: "March 2026" },
   ===================================================================== */
const CERTIFICATES = [
  { file: "assets/certificates/tb-mukt-bharat-quiz.png", title: "Quiz on TB Mukt Bharat Abhiyan", issuer: "Ministry of Youth Affairs & Sports (MYBharat)", date: "9 September 2026" },
  { file: "assets/certificates/vbyld-2027-quiz.png", title: "Viksit Bharat Young Leaders Dialogue (VBYLD) 2027 Quiz", issuer: "Ministry of Youth Affairs & Sports (MYBharat)", date: "9 September 2026" },
  { file: "assets/certificates/elite-quiz-5.pdf", title: "Elite Quiz 5.0", issuer: "Elite Coders (on Unstop)", date: "15 August 2026" },
  { file: "assets/certificates/freshers-party-planning-night.pdf", title: "Freshers' Party Planning Night Challenge", issuer: "Google Student Ambassador Program", date: "18 July 2026" },
  { file: "assets/certificates/git-github-challenge-quiz.pdf", title: "Level Up with Git & GitHub Challenge Quiz", issuer: "Campus Unite", date: "12 July 2026" },
  { file: "assets/certificates/hackerrank-problem-solving-basic.pdf", title: "Problem Solving (Basic)", issuer: "HackerRank", date: "7 May 2026" },
  { file: "assets/certificates/workshop-power-bi.pdf", title: "Workshop: Data Visualization and Business Intelligence using Power BI", issuer: "School of Computing and Data Science, Sai University", date: "22 April 2026" },
  { file: "assets/certificates/workshop-modern-web-development.pdf", title: "Workshop: Modern Web Development", issuer: "School of Computing and Data Science, Sai University", date: "8 April 2026" },
  { file: "assets/certificates/workshop-n8n-agentic-ai.pdf", title: "Workshop: Agentic AI and Workflow Automation using n8n", issuer: "School of Computing and Data Science, Sai University", date: "1 April 2026" },
  { file: "assets/certificates/ai-agents-quiz-challenge.pdf", title: "AI Agents Quiz Challenge 2026 (Main Round)", issuer: "Engineers Assemble (on Unstop)" },
  { file: "assets/certificates/master-git-today.pdf", title: "Master Git Today", issuer: "Unstop" },
  { file: "assets/certificates/intro-generative-ai-studio.pdf", title: "Introduction to Generative AI Studio", issuer: "Simplilearn SkillUP (Google Cloud)", date: "7 October 2025" },
];

/* ===================== Helpers ===================== */
const $ = (sel, root = document) => root.querySelector(sel);
const isPlaceholder = (v) => !v || v.includes("YOUR_");

/** Create an element safely. Text always goes through textContent, never innerHTML. */
function el(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  kids.forEach((kid) => kid && node.append(kid));
  return node;
}

/* ===================== Scroll reveal ===================== */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
  : null;

function watchReveal(node) {
  node.classList.add("reveal");
  // No observer support or reduced motion: just show it.
  if (!revealer || reduceMotion) node.classList.add("is-in");
  else revealer.observe(node);
}
document.querySelectorAll(".reveal").forEach((n) => {
  if (!revealer || reduceMotion) n.classList.add("is-in"); else revealer.observe(n);
});

/* ===================== Theme toggle ===================== */
const root = document.documentElement;
const themeBtn = $("#themeBtn");
function paintTheme() {
  const dark = root.getAttribute("data-theme") !== "light";
  $("#themeIcon").textContent = dark ? "☀" : "☾";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#0d0b1a" : "#f7f5ff");
}
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* storage may be blocked; ignore */ }
  paintTheme();
});
paintTheme();

/* ===================== Mobile menu ===================== */
const burger = $("#burger");
const menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); } });
document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) setMenu(false); });
window.matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));

/* ===================== Active link + back to top ===================== */
const links = [...document.querySelectorAll('.menu a[href^="#"]')]; // in-page links only (Resume is a separate page)
const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
const toTop = $("#toTop");
function onScroll() {
  const y = window.scrollY + 120;
  let current = sections[0];
  sections.forEach((s) => { if (s.offsetTop <= y) current = s; });
  links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + current.id));
  toTop.classList.toggle("is-shown", window.scrollY > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===================== Project filters ===================== */
const filterBtns = document.querySelectorAll(".filter");
const cards = document.querySelectorAll("#projectGrid .project");
filterBtns.forEach((btn) => btn.addEventListener("click", () => {
  const f = btn.dataset.filter;
  filterBtns.forEach((b) => { const on = b === btn; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", String(on)); });
  let shown = 0;
  cards.forEach((c) => {
    const match = f === "all" || c.dataset.cat.split(" ").includes(f);
    c.hidden = !match;
    if (match) { shown++; c.classList.add("is-in"); }
  });
  $("#projectEmpty").hidden = shown > 0;
}));

/* ===================== Certificates ===================== */
const certGrid = $("#certGrid");
const certEmpty = $("#certEmpty");
const IMG_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
const PDF_RE = /\.pdf$/i;

function certCard({ file, title, issuer, date, kind }) {
  const view = el("div", { class: "cert__view" });
  if (kind === "image") {
    const img = el("img", { src: file, alt: "Certificate: " + title, loading: "lazy" });
    img.addEventListener("error", () => {
      view.replaceChildren(el("p", { class: "cert__fail muted", text: "File not found: " + file + ". Check the file name in script.js." }));
    });
    view.append(img);
  } else {
    view.append(el("iframe", { src: file + "#toolbar=0&navpanes=0&view=Fit", title: "Preview of " + title, loading: "lazy" }));
  }
  const meta = [issuer, date].filter(Boolean).join(" · ");
  const actions = el("div", { class: "actions" },
    el("a", { class: "btn btn--sm btn--primary", href: file, target: "_blank", rel: "noopener noreferrer", text: "View Original" }),
    el("a", { class: "btn btn--sm btn--ghost", href: file, download: "", text: "Download Original" }));
  const body = el("div", { class: "cert__body" },
    el("h3", { text: title }),
    meta ? el("p", { class: "muted", text: meta }) : null,
    actions);
  const card = el("article", { class: "card cert" }, view, body);
  return card;
}
function syncEmpty() { certEmpty.hidden = certGrid.children.length > 0; }

CERTIFICATES.forEach((c) => {
  if (!c || !c.file || !c.title) { console.warn("Skipped a certificate: it needs both file and title.", c); return; }
  const kind = IMG_RE.test(c.file) ? "image" : PDF_RE.test(c.file) ? "pdf" : null;
  if (!kind) { console.warn("Unsupported certificate type (use image or PDF):", c.file); return; }
  const card = certCard({ ...c, file: encodeURI(c.file), kind });
  certGrid.append(card); watchReveal(card);
});
syncEmpty();

/* ===================== Contact ===================== */
const wa = CONTACT.whatsapp.replace(/\D/g, "");
const contactItems = [
  { name: "Email", text: CONTACT.email, href: "mailto:" + CONTACT.email, val: CONTACT.email },
  { name: "WhatsApp", text: "+" + wa, href: "https://wa.me/918639346260" + (wa && !isPlaceholder(CONTACT.whatsapp) ? wa : CONTACT.whatsapp), val: wa && !isPlaceholder(CONTACT.whatsapp) ? wa : "" },
  { name: "LinkedIn", text: "linkedin.com/in/" + CONTACT.linkedin, href: "https://www.linkedin.com/in/" + encodeURIComponent(CONTACT.linkedin), val: CONTACT.linkedin },
  { name: "Instagram", text: "@" + CONTACT.instagram, href: "https://www.instagram.com/poorna3217?obrf=bXZlMTdqaWxsMzR3" + encodeURIComponent(CONTACT.instagram), val: CONTACT.instagram },
  { name: "GitHub", text: "github.com/" + CONTACT.github, href: "https://github.com/" + CONTACT.github, val: CONTACT.github },
];
const contactGrid = $("#contactGrid");
contactItems.forEach((c) => {
  const todo = isPlaceholder(c.val);
  const a = el("a", { class: "card contact reveal", href: c.href, target: c.name === "Email" ? "_self" : "_blank", rel: "noopener noreferrer" },
    el("h3", { text: c.name }),
    el("p", { text: todo && c.name === "WhatsApp" ? "YOUR_WHATSAPP_NUMBER_WITH_COUNTRY_CODE" : c.text }),
    todo ? el("p", { class: "todo", text: "Placeholder: edit CONTACT in script.js" }) : null);
  contactGrid.append(a); watchReveal(a);
});

// Mailto form: opens the visitor's email app. It does not send anything itself.
$("#mailForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const note = $("#formNote");
  if (isPlaceholder(CONTACT.email)) {
    note.textContent = "The site owner has not set an email address yet (see CONTACT in script.js).";
    return;
  }
  const d = new FormData(e.target);
  const body = d.get("msg") + "\n\nFrom: " + d.get("name") + " (" + d.get("email") + ")";
  window.location.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Portfolio message from " + d.get("name")) + "&body=" + encodeURIComponent(body);
  note.textContent = "Your email app should open now. If it doesn't, email me directly at " + CONTACT.email + ".";
});

/* ===================== Profile photo ===================== */
// If assets/images/profile.jpg is missing, remove the broken image so the PC initials show instead.
const photo = $("#profilePhoto");
if (photo) {
  photo.addEventListener("error", () => photo.remove());
  // The error may already have happened before this script ran.
  if (photo.complete && photo.naturalWidth === 0) photo.remove();
}

/* ===================== Footer year ===================== */
$("#year").textContent = new Date().getFullYear();
