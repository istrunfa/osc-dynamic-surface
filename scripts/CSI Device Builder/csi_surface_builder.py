GLOBAL_WIDGETS = [
    "BankLeft", "BankRight", "PageLeft", "PageRight", "ChannelLeft", "ChannelRight",
    "Flip", "Home", "Cycle", "Undo", "Redo",
    "Play", "Stop", "Pause", "Record", "Rewind", "Forward", "Loop", "Metronome",
    "TimeDisplay", "BeatDisplay", "Marker", "MarkerNext", "MarkerPrevious", "MarkerSet",
    "ZoneNavigator", "Touch", "VPot", "Jog", "Shuttle", "StripType"
]
import tkinter as tk
from tkinter import ttk, filedialog, messagebox

WIDGETS = [
    "Select", "Solo", "Mute", "RecordArm", "Monitor", "Fader", "FaderTouched",
    "Pan", "Width", "PanLeft", "PanRight",
    "VUMeter", "GRMeter",
    "SendVolume", "SendPan", "ReceiveVolume", "ReceivePan", "SendMute",
    "FXParam", "FXOpen", "FXBypass", "FXMenu", "FXNavigate",
    "BankLeft", "BankRight", "PageLeft", "PageRight", "ChannelLeft",
    "ChannelRight", "Flip", "Home", "Cycle", "Undo", "Redo",
    "Play", "Stop", "Pause", "Record", "Rewind", "Forward", "Loop", "Metronome",
    "TimeDisplay", "BeatDisplay", "Marker", "MarkerNext", "MarkerPrevious", "MarkerSet",
    "AutoRead", "AutoWrite", "AutoTouch", "AutoLatch", "AutoTrim",
    "FXSlot1", "Insert1", "Instrument",
    "TrackColor", "TrackName", "ZoneNavigator", "Touch", "VPot", "Jog", "Shuttle", "StripType"
]

DISPLAY_WIDGETS = ["DisplayA", "DisplayB", "DisplayC", "DisplayD", "DisplayE", "DisplayF", "DisplayG", "DisplayH"]

category_widgets = {
    "Basic Widgets": [
        "Select", "Solo", "Mute", "RecordArm", "Monitor", "Fader", "FaderTouched",
        "Pan", "Width", "PanLeft", "PanRight"
    ],
    "Track Meters": [
        "VUMeter", "GRMeter",

    ],
    "Send / Receive Controls": [
        "SendVolume", "SendPan", "ReceiveVolume", "ReceivePan", "SendMute"
    ],
    "FX / Plugins": [
        "FXParam", "FXOpen", "FXBypass", "FXMenu", "FXNavigate"
    ],
    "Navigation & Misc": [
        "BankLeft", "BankRight", "PageLeft", "PageRight", "ChannelLeft",
        "ChannelRight", "Flip", "Home", "Cycle", "Undo", "Redo"
    ],
    "Transport Controls": [
        "Play", "Stop", "Pause", "Record", "Rewind", "Forward", "Loop", "Metronome"
    ],
    "Time Display & Markers": [
        "TimeDisplay", "BeatDisplay", "Marker", "MarkerNext", "MarkerPrevious", "MarkerSet"
    ],
    "Automation": [
        "AutoRead", "AutoWrite", "AutoTouch", "AutoLatch", "AutoTrim"
    ],
    "Plugin/Instrument Navigation": [
        "FXSlot1", "Insert1", "Instrument"
    ],
    "Custom/Utility": [
        "TrackColor", "TrackName", "ZoneNavigator", "Touch", "VPot", "Jog", "Shuttle", "StripType"
    ]
}

def generate_surface_txt(num_tracks, selected_widgets, display_count):
    lines = ["Surface", ""]
    # Separate global and track widgets
    global_widgets = [w for w in selected_widgets if w in GLOBAL_WIDGETS]
    track_widgets = [w for w in selected_widgets if w not in GLOBAL_WIDGETS]

    # Generate global widgets (not track-indexed)
    for widget in global_widgets:
        lines.append(f"Widget {widget}")
        lines.append(f"    Control /{widget}")
        lines.append(f"    FB_Processor /{widget}")
        lines.append("WidgetEnd")
        lines.append("")

    # Generate track-indexed widgets
    for i in range(1, num_tracks + 1):
        for widget in track_widgets:
            lines.append(f"Widget {widget}{i}")
            lines.append(f"    Control /{widget}{i}")
            lines.append(f"    FB_Processor /{widget}{i}")
            lines.append("WidgetEnd")
            lines.append("")
        for j in range(min(display_count, len(DISPLAY_WIDGETS))):
            display_name = DISPLAY_WIDGETS[j]
            lines.append(f"Widget {display_name}{i}")
            lines.append(f"    FB_Processor /{display_name}{i}")
            lines.append("WidgetEnd")
            lines.append("")
    lines.append("SurfaceEnd")
    return "\n".join(lines)

class SurfaceApp:
    def __init__(self, root):
        self.root = root
        self.root.title("CSI surface.txt Generator")
        self.root.geometry("1200x700")
        self.root.minsize(1000, 600)  # Set minimum window size

        self.track_count_var = tk.IntVar(value=8)
        self.widget_vars = {w: tk.BooleanVar(value=True) for w in WIDGETS}
        self.display_count_var = tk.IntVar(value=4)
        
        # Create master toggle variables for each category
        self.category_toggles = {category: tk.BooleanVar(value=True) for category in category_widgets.keys()}

        self.build_gui()

    def toggle_category(self, category, widgets_list):
        """Toggle all widgets in a category on/off"""
        toggle_state = self.category_toggles[category].get()
        for widget in widgets_list:
            self.widget_vars[widget].set(toggle_state)

    def build_gui(self):
        # Configure root grid weights
        self.root.grid_rowconfigure(1, weight=1)
        self.root.grid_columnconfigure(0, weight=1)

        # Top row inputs frame
        input_frame = ttk.Frame(self.root)
        input_frame.grid(row=0, column=0, sticky="ew", padx=5, pady=5)
        
        ttk.Label(input_frame, text="Number of Tracks:").grid(row=0, column=0, sticky="w", padx=5, pady=5)
        ttk.Entry(input_frame, textvariable=self.track_count_var, width=5).grid(row=0, column=1, sticky="w", padx=5, pady=5)
        ttk.Label(input_frame, text="Displays per Track:").grid(row=0, column=2, sticky="w", padx=5, pady=5)
        ttk.Entry(input_frame, textvariable=self.display_count_var, width=5).grid(row=0, column=3, sticky="w", padx=5, pady=5)

        # Create canvas and scrollbar for widget checkboxes
        container = ttk.Frame(self.root)
        container.grid(row=1, column=0, sticky="nsew", padx=5, pady=5)

        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        canvas = tk.Canvas(container, borderwidth=0)
        scrollbar = ttk.Scrollbar(container, orient="vertical", command=canvas.yview)
        self.widgets_frame = ttk.Frame(canvas)

        canvas_window = canvas.create_window((0, 0), window=self.widgets_frame, anchor="nw")

        canvas.configure(yscrollcommand=scrollbar.set)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Configure widgets_frame to expand (now supporting 5 columns for 10 categories)
        for i in range(5):  # 5 columns to accommodate 10 categories better
            self.widgets_frame.grid_columnconfigure(i, weight=1, uniform="category")

        def resize_frame(event):
            canvas_width = event.width
            canvas.itemconfig(canvas_window, width=canvas_width)
            
            # Dynamic column adjustment based on available width
            available_width = canvas_width - 20  # Account for scrollbar and padding
            category_width = available_width // 5  # 5 main columns
            
            # Adjust internal columns based on category width
            for child in self.widgets_frame.winfo_children():
                if isinstance(child, ttk.LabelFrame):
                    # Calculate optimal columns for this category based on width
                    min_widget_width = 110  # Minimum width needed per widget
                    max_cols_for_width = max(1, (category_width - 20) // min_widget_width)
                    
                    # Get the number of widgets in this category
                    widget_count = getattr(child, 'widget_count', 6)
                    widgets_list = getattr(child, 'widgets_list', [])
                    
                    # Calculate optimal columns (between 1 and 4, based on space and content)
                    optimal_cols = min(max_cols_for_width, min(4, max(1, widget_count // 2 + 1)))
                    
                    # Only rebuild if the column count would change significantly
                    current_cols = len([w for w in child.winfo_children() if isinstance(w, ttk.Checkbutton)])
                    if widgets_list and len(widgets_list) > 0:
                        current_layout_cols = max(1, (current_cols - 1) // len(widgets_list)) if current_cols > 1 else optimal_cols
                        
                        if abs(current_layout_cols - optimal_cols) > 0 and optimal_cols != current_layout_cols:
                            # Clear and rebuild this category's layout
                            for widget in child.winfo_children():
                                widget.destroy()
                            
                            # Reconfigure columns
                            for i in range(optimal_cols):
                                child.grid_columnconfigure(i, weight=1, minsize=100)
                            
                            # Re-add master toggle first
                            category_name = [cat for cat, w_list in category_widgets.items() if w_list == widgets_list][0]
                            master_toggle = ttk.Checkbutton(
                                child, 
                                text="Toggle All", 
                                variable=self.category_toggles[category_name],
                                command=lambda cat=category_name, w_list=widgets_list: self.toggle_category(cat, w_list)
                            )
                            master_toggle.grid(row=0, column=0, columnspan=optimal_cols, sticky="w", padx=2, pady=(2, 5))
                            
                            # Re-add widgets with new layout (starting from row 1)
                            for i, w in enumerate(widgets_list):
                                crow, ccol = divmod(i, optimal_cols)
                                crow += 1  # Offset by 1 for master toggle
                                
                                # Apply text breaking logic
                                display_text = w
                                if len(w) > 15:
                                    if 'Meter' in w and len(w) > 20:
                                        display_text = w.replace('Meter', 'Meter\n')
                                    elif 'Output' in w:
                                        display_text = w.replace('Output', 'Output\n')
                                    elif 'Input' in w:
                                        display_text = w.replace('Input', 'Input\n')
                                    elif len(w) > 18:
                                        mid = len(w) // 2
                                        for j in range(mid-3, mid+4):
                                            if j < len(w) and w[j].isupper() and j > 0:
                                                display_text = w[:j] + '\n' + w[j:]
                                                break
                                
                                cb = ttk.Checkbutton(child, text=display_text, variable=self.widget_vars[w])
                                cb.grid(row=crow, column=ccol, sticky="nw", padx=2, pady=1, ipadx=2)

        canvas.bind("<Configure>", resize_frame)

        def update_scrollregion(event):
            canvas.configure(scrollregion=canvas.bbox("all"))

        self.widgets_frame.bind("<Configure>", update_scrollregion)

        # Add labeled frames for each category arranged in multiple columns
        max_cols = 5  # Changed to 5 columns for better distribution of 10 categories
        for idx, (category, widgets) in enumerate(category_widgets.items()):
            row, col = divmod(idx, max_cols)
            lf = ttk.LabelFrame(self.widgets_frame, text=category)
            lf.grid(row=row, column=col, sticky="nsew", padx=3, pady=3)
            
            # Add master toggle checkbox at the top of each category
            master_toggle = ttk.Checkbutton(
                lf, 
                text="Toggle All", 
                variable=self.category_toggles[category],
                command=lambda cat=category, w_list=widgets: self.toggle_category(cat, w_list)
            )
            master_toggle.grid(row=0, column=0, columnspan=4, sticky="w", padx=2, pady=(2, 5))
            
            # Configure labelframe internal grid with dynamic column adaptation
            # Start with fewer columns that can expand as needed
            max_cols_per_category = 2  # Start with 2 columns, can expand
            
            # Calculate how many columns we actually need based on widget count
            widget_count = len(widgets)
            if widget_count <= 4:
                cols_needed = 2
            elif widget_count <= 8:
                cols_needed = 3
            else:
                cols_needed = 4
            
            for i in range(cols_needed):
                lf.grid_columnconfigure(i, weight=1, minsize=100)
            
            # Add checkboxes inside labeled frame with responsive column count
            # Start from row 1 to leave space for master toggle
            for i, w in enumerate(widgets):
                crow, ccol = divmod(i, cols_needed)
                crow += 1  # Offset by 1 to account for master toggle row
                
                # Break long widget names into multiple lines for better display
                display_text = w
                if len(w) > 15:  # If text is long, add line breaks
                    # Find good break points (CamelCase or after certain patterns)
                    if 'Meter' in w and len(w) > 20:
                        display_text = w.replace('Meter', 'Meter\n')
                    elif 'Output' in w:
                        display_text = w.replace('Output', 'Output\n')
                    elif 'Input' in w:
                        display_text = w.replace('Input', 'Input\n')
                    elif len(w) > 18:
                        # For very long names, break at around middle
                        mid = len(w) // 2
                        # Find a good break point near the middle
                        for j in range(mid-3, mid+4):
                            if j < len(w) and w[j].isupper() and j > 0:
                                display_text = w[:j] + '\n' + w[j:]
                                break
                
                cb = ttk.Checkbutton(lf, text=display_text, variable=self.widget_vars[w])
                cb.grid(row=crow, column=ccol, sticky="nw", padx=2, pady=1, ipadx=2)
                
            # Store reference for potential dynamic resizing
            lf.widget_count = widget_count
            lf.widgets_list = widgets

        # Generate button
        button_frame = ttk.Frame(self.root)
        button_frame.grid(row=2, column=0, pady=10)
        ttk.Button(button_frame, text="Generate surface.txt", command=self.export_file).pack()

    def export_file(self):
        try:
            num_tracks = int(self.track_count_var.get())
            display_count = int(self.display_count_var.get())
            if num_tracks <= 0:
                raise ValueError("Track count must be positive.")
            if display_count < 0:
                raise ValueError("Display count must be non-negative.")
        except ValueError:
            messagebox.showerror("Error", "Invalid number of tracks or displays.")
            return

        widgets = [w for w, var in self.widget_vars.items() if var.get()]
        output = generate_surface_txt(num_tracks, widgets, display_count)

        file_path = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Text Files", "*.txt")],
            title="Save surface.txt",
            initialfile="Surface.txt"
        )
        if file_path:
            with open(file_path, "w") as f:
                f.write(output)
            messagebox.showinfo("Done", f"surface.txt saved to:\n{file_path}")

if __name__ == "__main__":
    root = tk.Tk()
    app = SurfaceApp(root)
    root.mainloop()