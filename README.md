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
- ✅ Extensive performance optimization for iPad and mobile devices
- ✅ LED widgets are conditionally created only when enabled
- ✅ Display updates use /SET for low-latency feedback
- ✅ Selective OSC filtering (e.g. `/ignoreMeters`, threshold, and framerate)

## Components

### ✅ `custom-module.js`
- Receives and sends OSC from REAPER via CSI
- Dynamically generates per-track panels (`panel_track_N`) with buttons (`btn_track_N`) and optional LED meters (`led_track_N`)
- Applies track color using the `colorWidget` property (hex string from `/SelectN/Color`)
- Track name is shown via `/DisplayAN` as the button label
- Bidirectional toggling of track selection via `/SelectN`
- LED meters receive values from `/VUMeterN` (optional, toggleable)
- Visual updates (labels, toggle, color) use `/SET` for fast, lightweight messaging
- Structure updates (add/remove tracks) use `/EDIT` only when necessary
- Global `ignoreVUMeter` flag to suppress VU creation or processing
- VUMeter optimization: frame throttling (default 33ms) and threshold filtering

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
2. Load the Open Stage Control session using `dynamic_track_list.json` (ensure it's empty and structured for dynamic population)  
3. Load `custom-module.js` in Open Stage Control (Server > Custom Module)  
4. Use `Surface.txt` and `Track.zon` in your CSI folder  
5. Launch REAPER and watch Open Stage Control respond in real time  

## Compatibility

- Tested with Open Stage Control v1.29.6
- REAPER + CSI extension
- Works over LAN/WiFi, supports both push and pull feedback

## Performance Optimizations

This setup implements multiple layers of optimization designed to improve responsiveness and lower CPU usage, especially on tablets:

- /SET is used for real-time updates (name, color, toggle state) instead of full /EDIT calls
- Widgets are only recreated when tracks are added/removed
- LED widgets are optional and disabled by default via the `ignoreVUMeter` flag
- VUMeter throttling (`vumeterUpdateInterval`) limits how often LED state is applied (default 33ms)
- VUMeter thresholding (`vumeterThreshold`) avoids updates for low-level signals
- All track buttons and displays are rendered inside grid-based panels with optimized CSS layout

## License

MIT (recommended, see below)