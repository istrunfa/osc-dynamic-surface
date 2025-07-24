# OSC Dynamic Track List for Open Stage Control

This project implements a fully dynamic, bidirectional Open Stage Control (OSC) interface for REAPER, using CSI (Control Surface Integrator). It dynamically reflects the current state of the REAPER project, including:

- ✅ Automatic button creation and deletion per track
- ✅ Track naming via `/DisplayAN`
- ✅ Track selection state (toggle on/off)
- ✅ Track color assignment via `/SelectN/Color`
- ✅ LED meter over each track's button showing signal activity via `/VUMeterN`
- ✅ Grid-based layout with wrapping and scroll support
- ✅ Bidirectional OSC message sync with REAPER using CSI
- ✅ High-performance update logic: separates structure (creation/removal) from visuals (labels, toggle state, color)

## Components

### ✅ `custom-module.js`
- Receives OSC from REAPER via CSI
- Dynamically generates buttons (`btn_track_N`) and LED meters (`led_track_N`) inside the Open Stage Control surface
- Applies track color to each button using the `colorWidget` property
- Handles manual toggling and reflects selection back to REAPER using `/SelectN`
- Optimized performance using `/SET` for label and toggle updates, and conditional `/EDIT` only for color changes

### ✅ `Surface.txt`
Defines CSI widgets for 128 tracks, using this structure for each:

```
Widget Select1
  Control /Select1
  FB_Processor /Select1
WidgetEnd
...
Widget VUMeterL1
  Control /VUMeterL1
  FB_Processor /VUMeterL1
WidgetEnd
```

Includes:
- Select
- Solo
- Mute
- RecordArm
- Fader
- Pan
- GRMeter
- VUMeterL and VUMeterR
- Four Display widgets
- Color (via `/SelectN/Color`)

### ✅ `Track.zon`
The CSI zone file (user-provided) uses `{ Track }` notation to follow REAPER's internal track colors.

### ✅ `dynamic_track_list.json`
The base Open Stage Control template containing the top-level container (`track_buttons`) that will be dynamically updated via OSC.

## Setup

1. Ensure CSI is installed and correctly configured in REAPER
2. Load the Open Stage Control session using `dynamic_track_list.json`
3. Load `custom-module.js` in Open Stage Control
4. Use `Surface.txt` and `Track.zon` in your CSI folder
5. Launch REAPER and watch Open Stage Control respond in real time

## Compatibility

- Tested with Open Stage Control v1.29.6
- REAPER + CSI extension
- Works over LAN/WiFi, supports both push and pull feedback

## License

MIT (recommended, see below)