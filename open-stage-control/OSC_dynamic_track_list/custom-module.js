let activeTracks = new Set()
let trackNames = {}
let trackSelectStates = {}
let trackColors = {}
let previousTrackColors = {} // Track previous button colors
let ignoreVUMeter = false // Toggle to true to ignore VU meter updates

module.exports = {
  oscInFilter: function(data) {
    const { address, args } = data
    // Drop VUMeter messages if ignoring is enabled
    if (ignoreVUMeter && address.match(/^\/VUMeter\d+$/)) {
      return null
    }
    console.log("Received OSC:", address, args)

    const displayMatch = address.match(/^\/DisplayA(\d+)$/)
    if (displayMatch && args && args.length > 0) {
      const index = parseInt(displayMatch[1])
      const arg = args[0]
      const value = typeof arg === "object" && "value" in arg ? arg.value : arg

      if (typeof value === "string") {
        if (value.length > 0) {
          trackNames[index] = value
          activeTracks.add(index)
          updateButtons([...activeTracks])
        } else if (activeTracks.has(index)) {
          delete trackNames[index]
          activeTracks.delete(index)
          updateButtons([...activeTracks])
        }
      }
    }

    // Listen for /SelectN
    const selectMatch = address.match(/^\/Select(\d+)$/)
    if (selectMatch && args && args.length > 0) {
      const index = parseInt(selectMatch[1])
      const arg = args[0]
      const value = typeof arg === "object" && "value" in arg ? arg.value : arg

      if (typeof value === "number") {
        trackSelectStates[index] = value
        updateVisuals([...activeTracks])
      }
    }

    // Listen for /trackN/color
    const colorMatch = address.match(/^\/track\/(\d+)\/color$/)
    if (colorMatch && args && args.length === 3) {
      const index = parseInt(colorMatch[1])
      const [r, g, b] = args.map(arg => typeof arg === "object" && "value" in arg ? arg.value : arg)
      if ([r, g, b].every(v => typeof v === "number")) {
        const hex = `#${[r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('')}`
        trackColors[index] = hex
        updateVisuals([...activeTracks])
      }
    }

    // Listen for /SelectN/Color (REAPER sends color as a hex string)
    const selectColorMatch = address.match(/^\/Select(\d+)\/Color$/)
    if (selectColorMatch && args && args.length > 0) {
      const index = parseInt(selectColorMatch[1])
      const arg = args[0]
      const value = typeof arg === "object" && "value" in arg ? arg.value : arg
      if (typeof value === "string" && value.startsWith("#")) {
        // Remove alpha if present
        const hex = value.length === 9 ? value.slice(0, 7) : value
        trackColors[index] = hex
        updateVisuals([...activeTracks])
      }
    }

    // Listen for manual toggles from button widgets
    const valueMatch = address.match(/^\/btn_track_(\d+)$/)
    if (valueMatch && args && args.length > 0) {
      const index = parseInt(valueMatch[1])
      const value = typeof args[0] === "object" && "value" in args[0] ? args[0].value : args[0]

      if (typeof value === "number") {
        console.log(`Manual toggle from UI: Track ${index}, Value: ${value}`)
        send({
          address: `/Select${index}`,
          args: [value ? 1 : 0]
        })
      }
    }

    // Optional: Toggle ignoring VU meters via OSC command
    if (address === "/ignoreMeters" && args.length > 0) {
      const arg = args[0]
      const value = typeof arg === "object" && "value" in arg ? arg.value : arg
      ignoreVUMeter = !!value
      console.log("VU Meter processing:", ignoreVUMeter ? "IGNORED" : "ACTIVE")
    }

    return data
  },

  oscOutFilter: function(data) {
    const { address, args } = data

    const editMatch = address === "/EDIT" &&
      args &&
      args.length === 2 &&
      args[0] === "track_buttons"

    if (editMatch) {
      try {
        const parsed = JSON.parse(args[1])
        const widgets = parsed.widgets || []

        for (let w of widgets) {
          if (w.type === "button" && w.id && w.id.startsWith("btn_track_") && "value" in w) {
            const trackId = parseInt(w.id.split("_")[2])
            // Ensure args is always a plain array of numbers, not typed objects
            return {
              address: `/Select${trackId}`,
              args: [w.value ? 1 : 0]
            }
          }
        }
      } catch (e) {
        console.error("Failed to parse widget JSON in oscOutFilter:", e)
      }
    }

    return data
  }
}

function updateButtons(trackNumbers) {
  const widgets = [{
    type: "panel",
    id: "track_buttons",
    layout: "grid",
    target: "root",
    css: "class:track-button-grid",
    gridTemplate: "auto / repeat(8, 1fr)",
    widgets: []
  }]

  for (let i of trackNumbers.sort((a, b) => a - b)) {
    const trackPanel = {
      type: "panel",
      id: `panel_track_${i}`,
      target: "track_buttons",
      css: "class:track-panel",
      widgets: [
        {
          type: "button",
          id: `btn_track_${i}`,
          label: trackNames[i] || `Track ${i}`,
          address: `/Select${i}`,
          target: 'auto',
          mode: "toggle",
          value: trackSelectStates[i] || 0,
          colorWidget: trackColors[i] || undefined,
          css: "class:track-button"
        }
      ]
    }

    if (!ignoreVUMeter) {
      trackPanel.widgets.push({
        type: "led",
        id: `led_track_${i}`,
        address: `/VUMeter${i}`,
        target: "auto",
        css: "class:track-led"
      })
    }

    widgets[0].widgets.push(trackPanel)
  }

  receive("/EDIT", "root", JSON.stringify({ widgets }))
}

function updateVisuals(trackNumbers) {
  for (let i of trackNumbers) {
    const label = trackNames[i] || `Track ${i}`
    const value = trackSelectStates[i] || 0
    const color = trackColors[i] || undefined
    const prevColor = previousTrackColors[i]

    // Always update label and value via /SET
    receive("/SET", `btn_track_${i}`, {
      label,
      value
    })

    // Only update color if it changed
    if (color !== prevColor) {
      previousTrackColors[i] = color
      receive("/EDIT", `btn_track_${i}`, JSON.stringify({
        id: `btn_track_${i}`,
        colorWidget: color
      }))
    }
  }
}