
# 🎛️ Personal Git + GitHub Cheat Sheet (for OSC + REAPER Projects)

This guide covers **everything you need** to manage your local files with Git and safely push them to a **private GitHub repo**.

---

## 📦 Initial Setup (Only Once Per Project)

```bash
cd /path/to/osc-dynamic-surface
git init                           # Start tracking the folder with Git
git add .                          # Stage all files
git commit -m "Initial commit"     # Save your first snapshot
```

### 🔐 Link to a Private GitHub Repo

1. Create a **private repo** on https://github.com
2. Back in Terminal:

```bash
git remote add origin https://github.com/yourusername/osc-dynamic-surface.git
git branch -M main
git push -u origin main
```

---

## 💻 Daily Workflow

### After making changes (code, layout, docs...):

```bash
git add .                                     # Stage changes
git commit -m "Describe what you did"         # Save local version
git push                                      # Upload to GitHub (manually)
```

✅ That's it. Files stay local until you push.

---

## 🧪 Using Branches (for experiments or alternate versions)

```bash
git checkout -b feature/dynamic-led-color
# edit files...
git add .
git commit -m "Added per-track LED color test"
git push -u origin feature/dynamic-led-color
```

---

## 📂 Checking Status & History

```bash
git status           # See what changed
git log              # View history of commits
```

---

## 🧹 Undo Mistakes (Safely)

### Unstage a file you accidentally added:
```bash
git reset <filename>
```

### Discard local changes (dangerous!):
```bash
git checkout -- <filename>
```

---

## ✅ Optional: VSCode Integration

- VSCode has built-in Git: look for the **Source Control** icon.
- You can stage, commit, and push with no Terminal needed.

---

## 📁 Your Project Structure Recap

- `open-stage/` → OSC layouts (.json, .css, .js)
- `reaper-surfaces/` → CSI mappings (.zon, .txt)
- `scripts/` → Helpers to generate/edit files
- `docs/` → Knowledge base
- `assets/` → Screenshots, mockups

---

## ☁️ Your Files Live Here:

- **Locally** on disk → always editable
- **Optionally** on GitHub → only when you run `git push`
