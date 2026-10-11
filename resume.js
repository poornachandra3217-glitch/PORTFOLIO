/* Small script for resume.html: theme toggle, mobile menu and footer year.
   (The main portfolio logic lives in script.js and is only used on index.html.) */
const $ = (sel) => document.querySelector(sel);
const root = document.documentElement;

// Theme toggle (same saved setting as the main page)
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

// Mobile menu
const burger = $("#burger");
const menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) setMenu(false); });
window.matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));

$("#year").textContent = new Date().getFullYear();
