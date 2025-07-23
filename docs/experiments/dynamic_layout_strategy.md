# Layout Strategy for Dynamic Track View in Open Stage Control

This document outlines the dual layout strategy for managing and displaying dynamically generated track widgets (buttons + LED meters) using a custom module in Open Stage Control.

---

## 🎯 Objective

Enable the user to **switch between two layout modes** dynamically at runtime:

### 1. **Flat Grid Mode (Default)**
- All track widgets are displayed in a single scrollable panel.
- Fixed-width grid layout (e.g. 8 tracks per row).
- Widgets are arranged in index order.

### 2. **Grouped by Color Mode**
- Track widgets are grouped by their assigned color (as received from REAPER).
- Each color group appears in a new horizontal row.
- Useful for visually separating track sections (e.g. drums, vocals, FX).

---

## 🧠 Implementation Overview

### 1. `layoutMode` Toggle
A global variable inside the custom module, e.g.:
```js
let layoutMode = "flat" // or "grouped"
```

### 2. Toggle Control (Open Stage Control)
A button in the interface sends:
```js
send('/layout_mode', 'flat') // or 'grouped'
```

### 3. Custom Module Behavior
Upon receiving `/layout_mode`, the module:
- Updates the `layoutMode` variable
- Triggers a call to `updateButtons()`

### 4. `updateButtons()` Rendering Logic
- In **flat** mode: all per-track button+LED containers go inside a single scrollable grid panel (`track_buttons`).
- In **grouped** mode:
  - Tracks are grouped by color (e.g. a map of color → list of track numbers)
  - A separate panel is created for each group
  - Each group-panel is added as a row in the scrollable container

---

## 📦 Flexibility Benefits
- Preserves modular button+LED creation.
- Allows future expansion (e.g. grouping by folder, selection, FX presence).
- Minimal changes needed to enable new layouts—centralized in `updateButtons()`.

---

## 🔧 Next Steps
- Implement the `/layout_mode` OSC handler in `oscInFilter`
- Refactor `updateButtons()` to support grouped panel output
- Design Open Stage Control button to toggle layout

