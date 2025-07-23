# Open Stage Control Documentation

## Table of Contents
- [Getting Started](#getting-started)
- [User Interface](#user-interface)
- [Tutorials](#tutorials)
- [MIDI](#midi)
- [Customization](#customization)
- [Custom Module](#custom-module)
- [Widgets](#widgets)
- [Client & Remote Control](#client-remote-control)

---

## Getting Started

# Introduction

Welcome to Open Stage Control documentation. Along these pages you'll learn how to setup OSC on your system and everything you need to start building your own control interface.

## Overview

Open Stage Control consists of 3 modules: the server, the launcher and the client.

The **server** is the core of the software, it is responsible for sending and receiving all osc/midi messages, and act as a web server that serves the clients web application. It is written in Javascript and runs with Electron, a cross-platform framework based on Chromium. By default, the server always opens a client window when it starts but it can be run in *headless* mode, without any window.

The **launcher** provides a simple way to configure and start the server. It appears whenever the server is not launched from a terminal or without being configured.

The **client** is the web application made available by the server when it starts. Any compatible browser that connects to the server by browsing to its address will create a new client instance and be able to open and modify sessions.


## Requirements

The **server** can run on all [platforms supported by Electron](https://www.electronjs.org/docs/tutorial/support#supported-platforms). Systems that can run [Node.js](https://nodejs.org/en/) may also be able to run it in headless mode (see [Running with Node](./running-with-node.md)).

The **client** is compatible with the following browsers:

- Firefox: version `75` and higher
- Chromium / Chrome: version `60` and higher

iOS devices must be of version `10.3` or higher.


## Installation

??? example "Linux 64bit"

    **Ubuntu / Debian**

    - [Download](/download) `open-stage-control-VERSION-amd64.deb`
    - Install it by running this as root in a terminal:
    ```bash
    dpkg -i path/to/open-stage-control-VERSION-ARCH.deb
    ```

    **Other linux distributions**

    - [Download](/download) `open-stage-control-VERSION-linux-x64.zip`
    - Extract it in the location of your choice
    - The file inside it named `open-stage-control` is the app's main executable

??? example "Mac 64bit"

    - [Download](/download) `open-stage-control-VERSION-osx.zip`
    - Extract it in the location of your choice
    - Drag `open-stage-control.app` in your `Application` folder

??? example "Windows 64bit"

    - [Download](/download) `open-stage-control-VERSION-win32-x64.zip`
    - Extract it in the location of your choice
    - The file inside it named `open-stage-control.exe` is the app's main executable

??? example "Other systems"

    - Install [Node.js](https://nodejs.org/en/download/package-manager/)
    - Download `open-stage-control-VERSION-node.zip`
    - Extract it in the location of your choice
    - In a terminal, run `node /path/to/open-stage-control-VERSION-node --help`

---

# Running From Sources

Running the app from the sources slightly differs from using prebuilt binaries: we'll build and launch the app with npm (node package manager).

## Requirements

- [Node.js](https://nodejs.org/en/#download) (v16)
- [git](https://git-scm.com/downloads)


## Run from sources


**Download**

```bash
git clone https://github.com/jean-emmanuel/open-stage-control
cd open-stage-control/
# uncomment next line if you want the latest release
# instead of the current development version
# git checkout $(git describe --tags `git rev-list --tags --max-count=1`)
npm install
npm run build
```

!!! tip "Raspberry systems"
    Run one of these instead of `npm install` (you can get the system's `arch` by running `uname -m` in a terminal)
    ```
    npm install --arch=arm64
    npm install --arch=armv7l
    ```


!!! info "Updating from sources"
    ```bash
    git pull
    npm install
    npm run build
    ```

**Run**

```bash
npm start [ -- options]
```

!!! info ""
    A double hyphen (`--`) is used here to tell npm that the options are to be passed to the app.


!!! warning "MIDI support"
    When running from sources, MIDI support won't be enabled unless the [MIDI configuration procedure](../../midi/midi-configuration/) for "other systems" is followed.

## Build documentation

In order to make the local documentation available through the server's `--docs` option and the launcher's `Documentation` menu action, an extra step is needed.


```bash
# install docs website theme
python3 -m pip install mkdocs-material
# build docs website
npm run build-docs
```

## Package from sources

Follow the "Run from sources" instructions, then:

```bash

# TARGET_PLATFORM can be linux, win32 (windows) or darwin (os x)
export PLATFORM=TARGET_PLATFORM
# TARGET_ARCH can be ia32, x64, armv7l or arm64
export ARCH=TARGET_ARCH


npm run package


# The node-only package can be built with
npm run package-node

```

This will build the app in `dist/open-stage-control-PLATFORM-ARCH`.

!!! info ""
    Building the app for windows from a linux system requires wine to be installed.


## Debian/Ubuntu installer

```
npm run deb64
```

---

# Running With Node

## Lite headless mode

It's possible to run the server in headless mode with the nodejs engine embedded in Electron, this reduces memory / cpu usage significantly.

```
ELECTRON_RUN_AS_NODE=1 open-stage-control path/to/open-stage-control/resources/app/ [options]
```


## Running with node

If Electron does not run on your platform, it is possible to run the server in headless mode using [Node.js](https://nodejs.org/en/download/package-manager/).


1. Install [Node.js](https://nodejs.org/en/download/package-manager/)
2. Download `open-stage-control-[version]-node.zip` package and extract it
3. Run `node /path/to/open-stage-control [options]`


!!! info
    When running from sources or with regular binaries (packaged with electron), the command slightly differs:

    - electron package: `node /path/to/open-stage-control/resources/app [options]`
    - from sources: `node /path/to/open-stage-control/app [options]`

---

# Server Configuration

The **server** can be configured with many options, either from a terminal or with the help of the **launcher**.

## Options

!!! quote ""
    #### `send`

    Defines the default osc/midi targets. These will be added to the widget's individual targets. Targets must be separated by a space and formatted as follows:

    - `ip_address:port`
    - `host_name:port`
    - `midi:device_name`

!!! quote ""
    #### `load`

    Path to a session file (.json). All clients connecting the server will load it.

!!! quote ""
    #### `state`

    Path to a state file (.state). All clients connecting the server will load it.


!!! quote ""
    #### `custom-module`

    Path to a custom module file (.js).

    **WARNING:** custom module can access the file system, use at your own risk.


!!! quote ""
    #### `port`

    HTTP port for the server (default: `8080`).


!!! quote ""
    #### `osc-port`

    OSC (UDP) input port (default: `port`).


!!! quote ""
    #### `tcp-port`

    OSC (TCP) input port.


!!! quote ""
    #### `tcp-targets`

    TCP servers to connect to. When sending osc messages, if the target matches one of these, TCP protocol will be used instead of UDP.  Targets must be separated by a space and formatted as follows:

    - `ip_address:port`
    - `host_name:port`


!!! quote ""
    #### `midi`

    MIDI options separated by spaces, MIDI support must be enabled, see [MIDI configuration](../midi/midi-configuration.md).


!!! quote ""
    #### `debug`

    Print sent and received messages in the console. This may impact performance and should not be enabled in production.



!!! quote ""
    #### `no-gui`

    Disable built-in client window.


!!! quote ""
    #### `fullscreen`

    Start the built-in client window in fullscreen.


!!! quote ""
    #### `theme`

    Theme names or paths. See [Themes](../customization/themes.md).


!!! quote ""
    #### `client-options`

    Default [client options](../client-options.md), separated by spaces.


!!! quote ""
    #### `disable-vsync`

    Disable built-in client window's vertical synchronization.


!!! quote ""
    #### `force-gpu`

    Disable built-in client window's gpu blacklist (may improve rendering performance in some cases).


!!! quote ""
    #### `read-only`

    Disable session editing, and file saving.


!!! quote ""
    #### `remote-saving`

    Disable file saving for hosts that don't match the regular expression.

    Sessions are saved and opened on the server's filesystem. It is possible to limit this feature to specific client with a regular expression. For example, `"127.0.0.1|192.168.0.10"` disables remote saving except for clients with ip addresses `127.0.0.1` (the server's local address) and `192.168.0.10`.


!!! quote ""
    #### `remote-root`

    Set file browsing root folder. Prevent writing files outside of this folder.

!!! quote ""
    #### `authentication`

    Restrict access to `user:password` (remote clients will be prompted for these credentials).

!!! quote ""
    #### `instance-name`

    Server's name on zeroconf/bonjour network. Incremented automatically if not available.

!!! quote ""
    #### `use-ssl`

    Use HTTPS protocol instead of HTTP (a self-signed certificate will be created)



## Command-line options

The following options can only be set from a terminal.

!!! quote ""
    #### `disable-gpu`

    Disable hardware acceleration for the launcher window and the built-in client window.


!!! quote ""
    #### `inspect`

    Enable node inspector.


!!! quote ""
    #### `cache-dir`

    Override default cache directory (contains browser cache and localStorage data).


!!! quote ""
    #### `config-file`

    Override default config file location (contains session history and launcher config). Defaults to `cache-dir/config.json`.



!!! quote ""
    #### `client-position`

    Define the built-in client window position, must be a pair of integers separated by a comma (`x,y`).



!!! quote ""
    #### `client-size`

    Define the built-in client window size, must be a pair of integers separated by a comma (`width,height`).

!!! quote ""
    #### `no-qrcode`

    Disable qrcode when the server starts.


!!! quote ""
    #### `help`

    Show help.

!!! quote ""
    #### `docs`

    Serve documentation website locally and open it with the system's default browser


!!! quote ""
    #### `version`

    Show version number.


## Running in a terminal

Options name must be prepended with a double dash (`--`) in a terminal.

!!! example "Example"
    ```
    open-stage-control --no-gui --load path/to/your/session.json --theme path/to/your/theme.css
    ```

    Launches the server in headless mode, and makes all clients load provided session and theme automatically.


## Running in a terminal on Windows

Windows users launching the app from a terminal need to add a double dash (`--`) and a space before their options:

```bash
open-stage-control.exe -- --port 5555 [...]

# when running from sources
npm start -- -- [options]
```

---

---

## User Interface

# Launcher

![](../../img/screenshots/launcher.png)

## 1. Menu

- Start: start the server (hidden when started)
- Stop: stop the server (hidden when stopped)
- New window: open a new client window (hidden when stopped)
- Load: load server configuration from file
- Save / Save as: save server configuration to file
- List MIDI devices: list available MIDI devices in the console
- Console:
    - Clear: clear console
    - Autoscroll: enable/disable console autoscroll
    - Check for update at startup: enable/disable this feature
- Autostart: start the server automatically when launcher is started
- Always on top: pin the launcher window above other the windows

The "play/stop" icon can be used to start and stop the server without opening the menu.

## 2. Configuration form

Each server option is displayed here. When clicking on an option's label, a short help will be printed in the console. When an option is not correctly set, its label will turn to orange and an error message will be printed in the console.

## 3. Console

The console displays various information, runtime errors and server debug messages.

## Keyboard shortcuts

=== "Linux"

    | Shortcut | Description |
    |---|---|
    | ++f5++ | start server |
    | ++f6++ | stop server |
    | ++ctrl+n++ | open new client window |
    | ++ctrl+o++ | load settings |
    | ++ctrl+s++ | save settings |
    | ++ctrl+shift+s++ | save settings as... |
    | ++ctrl+m++ | list midi devices |
    | ++ctrl+l++ | clear console |
    | ++ctrl+w++ | close window |


=== "Windows"

    | Shortcut | Description |
    |---|---|
    | ++f5++ | start server |
    | ++f6++ | stop server |
    | ++ctrl+n++ | open new client window |
    | ++ctrl+o++ | load settings |
    | ++ctrl+s++ | save settings |
    | ++ctrl+shift+s++ | save settings as... |
    | ++ctrl+m++ | list midi devices |
    | ++ctrl+l++ | clear console |
    | ++alt+f4++ | close window |

=== "Mac"

    | Shortcut | Description |
    |---|---|
    | ++f5++ | start server |
    | ++f6++ | stop server |
    | ++cmd+n++ | open new client window |
    | ++cmd+o++ | load settings |
    | ++cmd+s++ | save settings |
    | ++cmd+shift+s++ | save settings as... |
    | ++cmd+m++ | list midi devices |
    | ++cmd+l++ | clear console |
    | ++cmd+w++ | close window |
    | ++cmd+q++ | quit app |

---

# Client

![](../../img/screenshots/client.png)

## 1. Menu

- Session
    - New session: create a new empty session and enable the editor
    - Open: browse session files on the server
    - Open recent: open a recent session on the server
    - Save / Save as: save session file on the server
    - Fragment mode: when enabled, the session will be saved as a fragment file (only the root's first child will be saved)
    - Save backup: save a copy of current session with a incremented suffix appended to the file name
    - Import: import a session file from the client's filesystem
    - Export: export a session file to the client's filesystem
- State
    - Store: save all widgets' state to a persistent slot (stored in the client's cache)
    - Recall: apply state storer in the persistent slot (updated widgets may send messages)
    - Send All: make all widgets send their current value
    - Open: browse state files on the server
    - Save / Save as: save state file on the server
    - Import: import a state file from the client's filesystem
    - Export: export a state file to the client's filesystem
- Editor
    - Enable: toggle editor's state
    - Grid: toggle grid
    - Project tree: toggle project tree's visibility
    - Inspector: toggle inspector's visibility
    - Relative units (%): when enabled, newly created widgets will have their position and size set in percents.
- Console
    - Enable: toggle console's state
    - Clear console: remove logged messages from the console
- Virtual keyboard: (desktop only) toggle virtual keyboard (displayed only when a text input is in focus, except for code editors in the inspector)
- Fullscreen: toggle fullscreen
- Notifications: toggle visibility of notifications
- Prevent sleep (mobile only): attempt to prevent device from going to sleep when idle

## 2. Sidepanels

The sidepanels are only visible when the editor is active, they can be resized and/or hidden. Both are described in the [editor](./editor.md) section.

## 3. Session

It is the main component, it contains all the widgets and takes all the available space when the sidepanels are closed.

## 4. Notifications

Notifications appear in the lower right corner, they are usually used to convey server status information and can be dismissed with a single click.

## 5. Modals

![](../../img/screenshots/modal.png)

Modals are virtual popup windows that may contain various content: file browser, color picker, error, widgets...  

## Keyboard shortcuts

=== "Linux"

    | Shortcut | Description |
    |---|---|
    | ++ctrl+"Mousewheel"++ | change global zoom (pixel scaling) |
    | ++ctrl+0++ | reset global zoom |
    | ++ctrl+e++ | enable/disable editor |
    | ++ctrl+k++ | show/hide console |
    | ++ctrl+l++ | clear console |
    | ++ctrl+s++ | save session |
    | ++ctrl+shift+s++ | save session as... |
    | ++ctrl+o++ | open a session file |
    | ++ctrl+w++ | close client |

=== "Windows"

    | Shortcut | Description |
    |---|---|
    | ++ctrl+"Mousewheel"++ | change global zoom (pixel scaling) |
    | ++ctrl+0++ | reset global zoom |
    | ++ctrl+e++ | enable/disable editor |
    | ++ctrl+k++ | show/hide console |
    | ++ctrl+l++ | clear console |
    | ++ctrl+s++ | save session |
    | ++ctrl+shift+s++ | save session as... |
    | ++ctrl+o++ | open a session file |
    | ++alt+f4++ | close client |

=== "Mac"

    | Shortcut | Description |
    |---|---|
    | ++cmd+"Mousewheel"++ | change global zoom (pixel scaling) |
    | ++cmd+0++ | reset zoom |
    | ++cmd+e++ | enable/disable editor |
    | ++cmd+k++ | show/hide console |
    | ++cmd+l++ | clear console |
    | ++cmd+s++ | save session |
    | ++cmd+shift+s++ | save session as... |
    | ++cmd+o++ | open a session file |
    | ++cmd+w++ | close client |

---

# Editor

## Widget selection

Clicking on a widget, on a tab label or on an item in the project tree selects the widgets for editing:

- All its editable properties are shown in the inspector panel
- The corresponding item in the project tree is highlighted
- A selection outline is drawn around the widget
- Dragging / Resizing handles are added to the widget

![](../../img/screenshots/editor.png)

To interact with a widget directly without selecting it, either use the middle mouse button or hold ++shift+win++ (++shift+cmd++ on Mac).

## Menu

Right clicking on a widget displays a menu with the following actions

- `Show in tree`: show widget in project tree (hidden when clicking in the project tree)
- `Position`:
    - `Send to back`: Send selected widget to back (first of siblings)
    - `Send farther`: Send selected widget farther
    - `Bring closer`: Bring selected widget closer
    - `Bring to front`: Bring selected widget to front (last of siblings)
- `Copy`: copy widget's data
- `Cut`: copy widget's data and delete selected widget
- `Paste`: paste copied widget in selected container
    - `Paste`: paste the widget as is
    - `ID + 1` : increments the id of the copied widget (and all its children) before pasting
    - `Clone` : create a clone widget targetting the copied widget
- `Add widget`: create a new widget in selected container
- `Add tab`: create a new tab in selected container
- `Export`: export as fragment file
- `Delete`: delete selected tab or widget


## Inspector

Selected widget's properties are displayed and can be modified in the inspector. The [properties reference](../widgets/properties-reference.md) lists the available properties for each widget type.

- Property fields are all multiline (press `shift + enter` for new line).
- Properties are written in JSON, with some flexibility brought by the [JSON5](https://github.com/json5/json5) format. For example, double quotes around object keys are not mandatory.
- Clicking on a property name spawns a help modal window
- Properties are divided into multiple categories that can be toggled with a click. ++alt+"Click"++ on a category closes the other categories before toggling selected category.

Some properties (for example `onValue`) have a special code editor with syntax highlighting and many keyboard shortcuts (available by clicking on the "Help" button). In these properties, pressing `enter` will not submit pending changes but instead insert a new line at the cursor position (as you would expect in a regular editor). To submit pending changes, press ++ctrl+enter++ (or ++cmd+enter== on Mac) or click outside the editor.

Widgets can be locked for edition by enabling their `lock` property. When locked, a widget can't be modified by the editor but it remains possible to delete it or to move it from a container to another in the project tree.

## Project tree

The project tree displays the whole widget structure of the session. Widgets can be reordered or moved to another container with drag-and-drop.

The "Filter" input allows filtering displayed widgets by their `id`. It's also possible to only display a single type of widget by typing `type:fader` for example.

Invisible widgets are displayed with a lower opacity and their name in italic. Locked widgets are displayed with a lock icon after their name.  

## Widget resizing / dragging

Selected widget can be resized using its south, south-east and east handles. It can be dragged with its north-west handle (holding ++alt++ extends this handle to the widget's size to ease dragging). If the widget's position/size was written in percents, the editor will try to keep using percents.

When the grid is enabled, widget resizing / dragging snaps to a 10 pixel wide grid.

## Multi-widgets editing

Multiple widgets can be edited at once.

- The inspector will only display properties that are shared by all selected widgets
- Selection can only contain sibling widgets (same direct parent)
- Context-menu actions and properties changes apply to all selected widgets
- Resizing / Dragging will affect all selected widgets, relatively the selection's size and position


## Keyboard shortcuts

=== "Linux / Windows"

    | Shortcut | Description |
    |---|---|
    | ++ctrl+g++ | Toggle grid. |
    | ++ctrl+t++ | Toggle session tree. |
    | ++ctrl+i++ | Toggle inspector. |
    | ++"Click"++ | Widget selection. |
    | ++ctrl+"Click"++ | Multi-widget selection. Widgets can be toggled from selection by clicking on them individually.|
    | ++shift+"Click"+"Drag"++ | Draw a selection rectangle and attempt to select widgets in it. If ++ctrl++ is pressed too, current selection is kept and will be merged with the new one if possible. |
    | ++ctrl+z++ | Undo |
    | ++ctrl+y++ <br/>++ctrl+shift+z++ | Redo |
    | ++delete++ | Delete selected widgets |
    | ++ctrl+c++ | Copy selected widgets |
    | ++ctrl+x++ | Cut selected widgets |
    | ++ctrl+v++ | Paste clipboard in selected widget |
    | ++ctrl+shift+v++ | Paste and increment id |
    | ++ctrl+d++ | Duplicate selected widget |
    | ++ctrl+shift+d++ | Duplicate selected widget and increment id |
    | ++alt+c+"Drag"++ | Paste selection to position |
    | ++alt+c+shift+"Drag"++ | Paste selection to dragged position and increment id |
    | ++ctrl+up++ <br/>++ctrl+down++ <br/>++ctrl+left++ <br/>++ctrl+right++ | Move selected widgets (1 grid unit, hold ++shift++ for 5 grid units) |
    | ++alt+up++ <br/>++alt+down++ <br/>++alt+left++ <br/>++alt+right++ | Resize selected widgets (1 grid unit, hold ++shift++ for 5 grid units) |
    | ++ctrl+a++ | Select current widget's siblings and itself |
    | ++ctrl+shift+a++ | Cancel current widget selection |
    | ++up++ | Select current widget's previous sibling |
    | ++down++ | Select current widget's next sibling |
    | ++left++ | Select current widget's parent |
    | ++right++ | Select current widget's first child |
    | ++t++ | Show selected widget(s) in the project tree |
    | ++y++ | Show selected widget(s) in the session |
    | ++ctrl+f++ | Focus search input in project tree |
    | ++"Home"++ | Send selected widget to back |
    | ++"Page Up"++ | Send selected widget farther |
    | ++"Page Down"++ | Bring selected widget closer |
    | ++"End"++ | Bring selected widget to front |
    | ++"F2"++ | Bring "label" property input into view if selected widget has one |
    | ++h++ | Hide selection area and widget resize / drag handles while pressed |
    | ++alt+"Mousewheel"++ | change editor zoom |
    | ++ctrl+0++ | reset zoom |


=== "Mac"

    | Shortcut | Description |
    |---|---|
    | ++cmd+g++ | Toggle grid. |
    | ++cmd+t++ | Toggle session tree. |
    | ++cmd+i++ | Toggle inspector. |
    | ++"Click"++ | Widget selection. |
    | ++cmd+"Click"++ | Multi-widget selection. Widgets can be toggled from selection by clicking on them individually.|
    | ++shift+"Click"+"Drag"++ | Draw a selection rectangle and attempt to select widgets in it. If ++cmd++ is pressed too, current selection is kept and will be merged with the new one if possible. |
    | ++cmd+z++ | Undo |
    | ++cmd+y++ <br/>++cmd+shift+z++ | Redo |
    | ++backspace++ | Delete selected widgets |
    | ++cmd+c++ | Copy selected widgets |
    | ++cmd+x++ | Cut selected widgets |
    | ++cmd+v++ | Paste clipboard in selected widget |
    | ++cmd+shift+v++ | Paste and increment id |
    | ++cmd+d++ | Duplicate selected widget |
    | ++cmd+shift+d++ | Duplicate selected widget and increment id |
    | ++alt+c+"Drag"++ | Paste selection to position |
    | ++alt+c+shift+"Drag"++ | Paste selection to dragged position and increment id |
    | ++cmd+up++ <br/>++cmd+down++ <br/>++cmd+left++ <br/>++cmd+right++ | Move selected widgets (1 grid unit, hold ++shift++ for 5 grid units) |
    | ++alt+up++ <br/>++alt+down++ <br/>++alt+left++ <br/>++alt+right++ | Resize selected widgets (1 grid unit, hold ++shift++ for 5 grid units) |
    | ++cmd+a++ | Select current widget's siblings and itself |
    | ++cmd+shift+a++ | Cancel current widget selection |
    | ++up++ | Select current widget's previous sibling |
    | ++down++ | Select current widget's next sibling |
    | ++left++ | Select current widget's parent |
    | ++right++ | Select current widget's first child |
    | ++t++ | Show selected widget in the project tree |
    | ++y++ | Show selected widget(s) in the session |
    | ++cmd+f++ | Focus search input in project tree |
    | ++"Home"++ | Send selected widget to back |
    | ++"Page Up"++ | Send selected widget farther |
    | ++"Page Down"++ | Bring selected widget closer |
    | ++"End"++ | Bring selected widget to front |
    | ++"F2"++ | Bring "label" property input into view if selected widget has one |
    | ++h++ | Hide selection area and widget resize / drag handles while pressed |
    | ++alt+"Mousewheel"++ | change editor zoom |
    | ++cmd+0++ | reset zoom |

---

## Tutorials

# First Steps

# First Steps with Open Stage Control

*Contributed by H. James Harkins, Feb. 2023*

Let's walk through the basic steps to build a simple interface in Open Stage Control, send information to another app, and deploy the interface to remote (even mobile) devices.

Before beginning, you should already have installed Open Stage Control -- see the [Introduction](../getting-started/introduction.md).

Also: This document provides sample patches for SuperCollider, Pure Data and Max/MSP, to receive control data from the Open Stage Control interface. If you do not have any of these tools, I suggest to install [Pure Data](https://puredata.info/downloads/pure-data) because it has the smallest footprint.

## The Launcher

Use your system's application launcher, open the Open Stage Control app. Here, you can configure options for the interface server.

For now, go to the first box ("send") and type in `127.0.0.1:57120`. This will tell the server to send Open Sound Control messages to the same machine where the server is running, on port 57120.

NOTE: For your own applications, you can use any port that is not in use. For this example, I chose 57120 because it is SuperCollider's default UDP port (and I set the Pure Data and Max patches to use the same port, to simplify.)

You don't need to set any other options at this time.

### Addresses and ports

Many users approaching Open Sound Control for the first time get confused about ports. You need to be aware of the FROM and TO addresses. The "send" field in the Launcher should reference the address TO which messages should be sent. In this demo, we are assuming that Open Stage Control and the target app are running on the same machine. So the TO address is localhost: `127.0.0.1`. The "send" box should use the port *on which the target app is receiving messages*. This is typically under control of the target app: 1/ SuperCollider opens 57120 by default; 2/ Pd's [netreceive] object, and Max's [udpreceive], both require the TO port as an argument. So the TO port is your choice, as long as they match.

Open Stage Control sends messages FROM the IP address of the machine where Open Stage Control is running, and from port 8080 (or localhost = `127.0.0.1` if on the same machine). Thus, if the receiving app will filter incoming messages based on address, the filtering address should be the FROM address, port 8080. The target app can also update Open Stage Control's display by sending messages back to exactly this address. So you will see later, in the demo patches, that messages are sent to `127.0.0.1:8080` so that the user's interaction with the target app appears in Open Stage Control as well.

## Starting the server

Click the "play" button near the top left of the window. You should see status messages in the launcher window such as:

```
(INFO) Server started, app available at
    http://127.0.0.1:8080
    http://your.ip.ad.dress:8080
```

And a new, mostly empty, window will open. This new, larger window is the *client*.

## The client

The client allows you to edit and perform your interface.

The interface design is called a *session*. To create a new session, go to the "three-dots" menu at the top left, and choose Session > New session.

Two new panels are displayed: a project browser, and an object inspector (to set properties). The empty space in the middle is the editor, where you will build the interface.

Let's start with a toggle button. Right-click in the empty editor panel in the middle, and navigate to Add widget > Basics > button. For this demo, we don't need to change anything else: the button defaults to toggle behavior, and the display text is not important for now (although you can change it in the inspector, if you want).

And let's add one more control, to the right of this: Right-click, Add widget > Sliders > fader.

![](./first-steps/two-widgets.png)

When a widget is selected, you can move it by dragging the top-left handle, and resize it by dragging the bottom-right handle. Let's use these handles to position the fader to the right of the button, and stretch it to be horizontal instead of vertical.

![](./first-steps/resized-fader.png)

Notice, however, that the fader's value handle is still vertical. To fix this, look in the Inspector at the right, expand "Fader style," and check the "horizontal" checkbox.

![](./first-steps/fader-style.png)

![](./first-steps/horizontal-fader.png)

By the way: I suggest to keep the widgets closer to the top left, so that they are still visible on a phone screen (later).

When designing an interface for production, you would change other object properties as well. In particular, the Open Sound Control addresses `/button_1` and `/fader_1` are not very descriptive. You would probably want to assign different command paths, in the "osc" tab. As this is just an introduction, we won't do that now.

## Receiving the data

At this time, the interface can already be used: three-dots menu > Editor > "Enabled" (click to disable the editor). (The controls will respond also when the editor is enabled, but you have to click an extra time to select the widget before changing its value.)

To see the effect, launch one of the following apps and open the given patch. The Open Stage Control button should open and close the envelope, and the fader should control frequency. The patches also send control data from their own GUIs back to Open Stage Control, so all of the controls should be synced in both directions.

NOTE: In Pure Data and Max, the default slider/fader range is 0-127, integers. Open Stage Control uses the range 0.0 - 1.0 by default. If you just create a slider and connect it, you won't see much action. In the example patches, the slider's properties have been modified to take a 0.0 - 1.0 floating-point range, matching the data from Open Stage Control.

NOTE: Because all of the patches bind to the same UDP port, you can open only one at a time. You could, if you like, change the port number in one patch, and add that port by specifying multiple "send" targets in the Launcher, e.g. `127.0.0.1:57120 127.0.0.1:7374`.

NOTE: These patches are provided as a courtesy to get you started more quickly. Maintaining, extending or developing them is outside the scope of the Open Stage Control community.

!!! Example "Choose your app"

    === "Pure Data"

        Copy the code below, and save it into a text file `osc-first-steps.pd`. Then open it in Pure Data.

        ```
        #N canvas 436 127 562 502 12;
        #X obj 86 51 loadbang;
        #X msg 86 76 \; pd dsp 1;
        #X obj 253 51 netreceive -u -b 57120;
        #X obj 253 76 oscparse;
        #X obj 253 101 list trim;
        #X obj 253 126 route fader_1 button_1;
        #X msg 253 190 4 \$1;
        #X obj 253 215 pow;
        #X obj 253 240 * 200;
        #X obj 253 265 lop~ 3;
        #X msg 328 265 \$1 100;
        #X obj 328 304 line~;
        #X obj 279 356 *~;
        #X obj 279 381 *~ 0.1;
        #X obj 266 424 dac~;
        #X text 38 139 Open Stage Control \; "First Steps" tutorial \; hjh
        2023;
        #X obj 253 304 osc~ 200;
        #X obj 328 159 tgl 15 0 empty empty empty 17 7 0 10 #fcfcfc #000000
        #000000 0 1;
        #X obj 256 159 hsl 60 15 0 1 0 0 empty empty empty -2 -8 0 10 #fcfcfc
        #000000 #000000 0 1;
        #X obj 70 251 unpack f s;
        #X obj 70 325 oscformat;
        #X msg 137 283 set \$1;
        #X obj 70 424 netsend -u -b;
        #X obj 93 356 loadbang;
        #X msg 93 381 connect 127.0.0.1 8080;
        #X obj 70 226 r sendback;
        #X msg 379 200 \; sendback \$1 button_1;
        #X msg 379 233 \; sendback \$1 fader_1;
        #X connect 0 0 1 0;
        #X connect 2 0 3 0;
        #X connect 3 0 4 0;
        #X connect 4 0 5 0;
        #X connect 5 0 18 0;
        #X connect 5 1 17 0;
        #X connect 6 0 7 0;
        #X connect 7 0 8 0;
        #X connect 8 0 9 0;
        #X connect 9 0 16 0;
        #X connect 10 0 11 0;
        #X connect 11 0 12 1;
        #X connect 12 0 13 0;
        #X connect 13 0 14 0;
        #X connect 13 0 14 1;
        #X connect 16 0 12 0;
        #X connect 17 0 10 0;
        #X connect 17 0 26 0;
        #X connect 18 0 6 0;
        #X connect 18 0 27 0;
        #X connect 19 0 20 0;
        #X connect 19 1 21 0;
        #X connect 20 0 22 0;
        #X connect 21 0 20 0;
        #X connect 23 0 24 0;
        #X connect 24 0 22 0;
        #X connect 25 0 19 0;
        ```

    === "Max/MSP"

        Copy the text below. In Max, choose File > New from clipboard.

        ```
        ----------begin_max5_patcher----------
        949.3oc0XkraaCCD8rCP9GHDxo.GWRJpEWzaEnW6gdrInfVlwgoxjBRTYEMe
        6khTx0HgVlwP1MFAwBZnjl2algyBe9zSFELS9.qJ.7YvOAiF8rVxHirFIi5D
        LJXI8grbZk4ACVxppnKXAiaWTwdPYV3SWSmyJ+EBbFZ0h74lkjyt8BDdkzBp
        J6FtXwuJYYJq1wwjIvw.LJt4RRh4F7DH3ptWRTujKxYJCJvqIUVq5Di5Dako
        drfY+7AAfqLK8mSOo4p9x3AfwypUJoXiTNtWFSBaHIJB1bIM5iDiEr603+sD
        tddQESLGfvZGj9ODHElBc5s8f5gnTqEHdKbG4l6vcleYxkKYB0aI32KXBvOT
        ZuM3qRgpTlCtL3a7xJkVJqn5x.fpVIK4zbvEfat8F.FhCW8cx4BVlrVX9XgN
        LK3DerKv0BLHoGNyRUNWuC1k6DG0GtsHEAM9wXCGvvsC6qykTkF3E0pdnC5e
        JtjtjozoXXB5rbSbNruv+t0p3OYjhlr6lFkbwhblSSCoOSCBkLIZksAS5988
        4R2Qa.uIP7pgeWxWt3BPVNO62.kDXABfVOmKcZe5MuOJzj3iDEYLSsUAfGtX
        d1SyoYu3D3vdi4mNIQiXhcKKIp622W5a3fmh97W.57xNSIOsO9jfab.gSmZH
        xfW+shuPPy2G0jN2oyCk5AYiwFZNs4liCx1TfwMeS7HKTaAWBb27t3sQ3wff
        YTwh8RuVmgzIQc2pQrGTGaqQEAOFZyJ6wr7M3lIauNbqWd3o5+ivZz14KNM7
        XNpNxcPMzCh21gX3wPL845p5vItnZpGL0NVHYvGRxzB5dwyR1vLgIdzHc693
        ihQBKj26hl9LufceaX3GNm5l3ZoVULvpy4X03+tL.djn11rKJhrECPnaCP3l
        8yia+e+bD.Zdv32w.QIHryjWgdTjxFBfR1sQ+eOw31uroFyqOpKC7ZV3UVhJ
        YcYV2Wr6vq.qgw4rJEWPUboX8mx9Pa1l6s9Zl21C88JTIKaFeu+wJ7GBDefP
        7dDAwGVadpWpCNX5KwG8EMXpyqHpzAScdE8fiFT8g1p9HCl9B8gejCbBgjMr
        aDcvxGfh2iPn4DL7HnB9w.Bn8TZQjeIplNXwdHuxTYfEZXTneY9SFNFR7lgC
        jBQdovgK+AB5kBcWMssCJZQwcrxp1WwpKcSi2JMg1ois2yE16ssnETxti28J
        1SpNfVp6IToaHrtz.wfGha6VNXoTuQQTy61t1v1FUa5KUP0SaUPs7xz+5omn
        ef+B9C+QQC
        -----------end_max5_patcher-----------
        ```

    === "SuperCollider"

        Copy/paste the code below into a new code document. Run the entire block to start. It will clean up when you close the GUI window.

        ```
        // OSC response part
        (
        var addr = NetAddr("127.0.0.1", 8080);  // FROM address
        var freqRange = ControlSpec(200.0, 800.0, \exp);
        var button, slider;

        OSCdef(\button, { |msg|
        	defer { button.value = msg[1] };
        	if(x.notNil) { x.set(\gate, msg[1]) };
        }, '/button_1', addr);

        OSCdef(\slider, { |msg|
        	defer { slider.value = msg[1] };
        	if(x.notNil) { x.set(\freq, freqRange.map(msg[1])) };
        }, '/fader_1', addr);

        w = Window("Open Stage Control", Rect(800, 200, 400, 100)).front;
        w.layout = HLayout(
        	button = Button(),
        	slider = Slider().orientation_(\horizontal)
        );
        w.alwaysOnTop = true;  // may not take effect in all window managers

        button.states = [["off"], ["playing", Color.black, Color(0.7, 1, 0.7)]];
        button.action = { |view|
        	if(x.notNil) { x.set(\gate, view.value) };
        	addr.sendMsg('/button_1', view.value);
        };

        slider.action = { |view|
        	if(x.notNil) { x.set(\freq, freqRange.map(view.value)) };
        	addr.sendMsg('/fader_1', view.value);
        };

        w.onClose = {
        	if(x.notNil) { x.free };
        	OSCdef(\button).free;
        	OSCdef(\slider).free;
        };

        // audio part
        // if this fails (if you have an issue with audio devices),
        // you won't hear anything but the onscreen GUIs
        // will reflect changes from Open Stage Control
        s.waitForBoot {
        	x = { |freq = 200, amp = 0.1, gate = 0|
        		var eg = EnvGen.kr(Env.asr(0.1, 1, 0.1), gate);
        		(SinOsc.ar(Lag.kr(freq, 0.1)) * amp * eg).dup
        	}.play;
        };
        )
        ```

## Deploying the interface

The whole point of Open Stage Control is to make the interface available on other devices, especially mobile devices.

The interface will not be visible to other clients, however, until you save it to disk: three-dots menu > Session > Save, and give the file a name such as `open-stage-demo` (you don't need to type the `.json` extension).

Now -- remember those status messages in the launcher window? On another device (computer, phone or tablet), go to the `http://192.168.xxx.yyy:8080` address. The device should be on the same (W)LAN. (If there is another remote address, it may or may not work, depending on your network.) Supported browsers are Firefox v. 75 and higher, or Chromium/Chrome v. 60 and higher.

This should open an empty client window, similar to the one you saw before.

From here, you can open the session that you just saved: three-dots menu *in the webpage* > Session > Open Recent (yes, this is synced from the server!). This should display the controls created in that session, and the controls should function the same as in the other client window.

And that is... it! Basic usage is as simple as that.

For convenience, if there is a session you know that you will use often, and you don't want to load it in the webpage by hand every time, you can choose the file under "load" in the initial Launcher window. This is also useful for public deployments with audience participation, where you don't want audience members to have to load manually.

When not using Open Stage Control, you can also stop the server from the launcher window (stop button, top-left).

---

# Change Property with OSC

# Change a widget property with an osc message

By default, widgets only expose their value to incoming messages, but there are multiple ways to allow changing any widget property using osc messages as well. In this tutorial we'll explore the different possibilities for exposing the `visible` property of a widget to incoming messages, but it applies to any other property.

## 1. Using a variable widget

Create a variable widget and set up its `address` (and `preArgs` if needed) so that it receives the messages you want to use, and then in your other widget's `visible` property, use the [inheritance syntax](../widgets/advanced-syntaxes.md#inheritance-idproperty) to retrieve the variable's value:


=== "Inheritance syntax"
    ```
    @{variable_id}
    ```
=== "Inheritance syntax + Javascript"
    ```js
    JS{
        // bonus, in case you don't want to use the variable's value as-is
        if (@{variable_id} > 0.5) {
            return true
        } else {
            return false
        }
    }
    ```

Now the variable's value will determine the visibility of the widget.  The `visible` property expects a boolean value (`true` for visible, `false` for invisible) but any [truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy) / [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) will do (e.g. `1` for visible, `0` for invisible is a sensible choice).

## 2. Using the OSC listener syntax

The [OSC listener syntax](../widgets/advanced-syntaxes.md#osc-listeners-oscaddress-default-usepreargs) might be a more straightforward solution for simple use cases. Writing this in a widget's `visible` property:


=== "Relative address"
    ```
    OSC{show}
    ```

will listen for messages on address `/widget_address/show` and return the last received value.


If we write this instead:

=== "Absolute address"
    ```
    OSC{/show}
    ```

the address will be `/show` and won't be prefixed with the widget's address as before.


It is often needed to specify the initial state of the listener (before it receives any message), this is done via the second argument of the listener syntax:


=== "Default value (true)"
    ```
    OSC{show, true}
    ```
=== "Default value (truthy)"
    ```
    OSC{show, 1}
    ```
=== "Default value (false)"
    ```
    OSC{show, false}
    ```
=== "Default value (falsy)"
    ```
    OSC{show, 0}
    ```

If the widget has any preArgs set, the osc listener will inherit them by default, this means that for a message to change the listener's value it will not only have to match its address but also the widget's `preArgs`, this can be prevented using the third argument of the listener syntax:

=== "Ignore preArgs"
    ```
    OSC{show, 1, false}
    ```


## 3. Using custom variables

The [custom variable syntax](../widgets/advanced-syntaxes.md#custom-variables-varvariablename-default) connects regular properties and scripting properties (`onCreate`, `onValue`, etc), writing this in the `visible` property:

```
VAR{show}
```

will create a custom variable named `show` scoped to the widget (custom variables do not use a global namespace and multiple widgets may use the same names for their custom variables without conflict). This custom variable can be read and set from any widget scripting property using the [`getVar()` / `setVar()`](../widgets/scripting.md#getvarid-name) functions.

For instance, we could use a variable widget as osc receiver like in the first example of this tutorial and use it's `onValue` script to change the custom variable's value (instead of using the inheritance syntax):

```js
// variable widget onValue
// simply pass received value to the custom variable
setVar('widget_id', 'show', value)
```


The custom variable's initial state can be specified:

```
VAR{show, 1}
```

## 4. Using /EDIT commands

The [`/EDIT`](../remote-control.md) remote control command can be used to modify any widget property in the session, for instance:

```
/EDIT widget_id '{visible: false}'
```

Will hide the widget with id `widget_id`. Note that this is different from the 3 techniques described above in that it actually modifies the session and changes the property value in a destructive way (the property is rewritten, not just its state). When quitting the session after using it a warning indicating the session has unsaved changes will be shown, this can be prevented by appending a extra argument to the message:

```
/EDIT widget_id '{visible: false}' '{noWarning: true}'
```

Note that the arguments after `widget_id` are sent as strings ([JSON5](https://github.com/json5/json5)-encoded objects), this is because sending plain javascript object over osc is not possible.  

## Bonus: custom module

Any of these techniques can be used in conjunction with a [custom module](../custom-module/custom-module.md). Using the `receive()` function allows simulating incoming osc messages and can be used to trigger property changes:

=== "Variable widget"
    ```js
    var visible = true
    receive('/variable_id', visible)
    // or if variable widgets has preArgs
    receive('/variable_id', preArg1, preArg2, visible)
    ```
=== "OSC listener"
    ```js
    var visible = true
    receive('/widget_address/show', visible)
    // or if listener has preArgs
    receive('/widget_address/show', preArg1, preArg2, visible)
    ```
=== "Custom variable"
    ```js
    var visible = true
    receive('/SCRIPT', `setVar('widget_id', 'show', ${visible})`)
    ```
=== "/EDIT command"
    ```js
    var visible = true
    // what's really cool here is that you don't need to stringify objects arguments
    // receive() will take care of that for you
    receive('/EDIT', 'widget_id', {visible: visible}}, {noWarning: true})
    ```

---

## MIDI

# MIDI Configuration

## Installation


=== "Linux / Windows / OSX"

    Open Stage Control comes bundled with built-in MIDI support if you're using the official package for Linux, OSX or Windows.


=== "Other systems / Node"

    Enabling MIDI support on other systems or when building Open Stage Control from sources requires additional softwares to be installed on the server's system:

    - [python 3](https://www.python.org/downloads/)
    - python package [python-rtmidi](https://spotlightkid.github.io/python-rtmidi/installation.html#from-pypi)


    ??? example "Linux"

        Install `python3-rtmidi` from your distribution's package repository, or if it's not available:

        - Install `python3` and `python3-pip` from your distribution's package repository
        - Run this command in a terminal
        ```bash
        python3 -m pip install python-rtmidi --upgrade
        ```

    ??? example "Mac"

        - Download and install [Python 3 for Mac OS](https://www.python.org/downloads/mac-osx/)
        - Open a terminal
        - Install `pip` (package installer for python) by executing these commands
        ```
        curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
        python get-pip.py
        ```
        - Install `python-rtmidi` by executing this command
        ```bash
        python -m pip install python-rtmidi --upgrade
        ```

    ??? example "Windows"

        - Download and install [Python 3 for Windows](https://www.python.org/downloads/windows/)
        - **make sure to check the option** "Add Python 3.x to PATH"
        - Open a terminal (++win+r++)
        - Install `pip` (package installer for python) by executing these commands
        ```
        curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
        python get-pip.py
        ```
        - Install `python-rtmidi` by executing this command
        ```bash
        python -m pip install python-rtmidi --upgrade
        ```

## Configuration

The server's `midi` option accepts the following parameters, separated by spaces.

!!! warning ""
    If an option contains space characters, it must be quoted.

**`list`**

Print the available MIDI ports to the console when the server starts. This action is also available in the launcher's menu.

**`device_name:input,output`**

Create a virtual MIDI device that will translate OSC messages to MIDI messages

- `device_name` is an arbitrary identifier that can be used as a target by widgets (see [Widget setup](#widget-setup)). It doesn't have to match any device's real name.
- `input` / `output` can be port numbers or strings (as reported by the `list` action). If a string is specified, the first port whose name contains the string will be used (comparison is case-insensitive).

**`sysex`**

Enable parsing of system exclusive messages (disabled by default).

**`mtc`**

Enable parsing of midi time code messages (disabled by default).

**`rpn`**

Enable sending and receiving [RPN/NRPN](https://en.wikipedia.org/wiki/NRPN) controls on as single `/rpn` / `/nrpn` messages instead of 3 or 4 control changes that constitute them.


**`active_sensing`**

Enable parsing of midi active sensing messages (disabled by default). Active sensing messages will be received as sysex.

**`pc_offset`**

Send program changes with a `-1` offset to match some software/hardware implementations

**`note_off_velocity`**

Enable receiving noteOff messages with a velocity and on a different address than noteOn messages.


**`device_name:virtual`** (*Linux / Mac only*): creates a virtual midi device with one input port and one output port


**`jack`** (*Linux only*): use JACK MIDI instead of ALSA. `python-rtmidi` must be compiled with [jack support](https://spotlightkid.github.io/python-rtmidi/installation.html#linux) for this to work.


**`path=/path/to/python`**

*Only use this if you know what you are doing. This option should not be set when using the official Linux / Windows / OSX packages.*

Indicates where to find python binary in case open stage control doesn't (`Error: spawn python3 ENOENT`).


## Widget setup

In order to send MIDI messages, a widget must have at least one `target` formatted as follows:

`midi:device_name` (where `device_name` is one of the declared midi devices)

Its `address` and `preArgs` properties must be set according to Open Stage Control's [midi messages](../midi-messages) specification.

!!! warning
    Messages received from a MIDI port only affect widgets that send to this port.

## Debug

Enabling the server's `debug` options will print some extra information (sent/received midi messages, midi setup information, etc)

## Example configuration

Setting the server's `midi` option as follows:

```
sysex synth:1,2 daw:3,3
```

- enables sysex support (sysex messages will not be ignored)
- creates a midi device "synth" connected with input 1 and output 2
- creates a midi device "daw" connected with input 3 and output 3

If a widget has its `target` set to `midi:synth`, it will receive MIDI from port 1 and send MIDI to port 2.

---

# MIDI Messages

!!! info ""
    Define static argument values using the [`preArgs`](/docs/widgets/properties-reference/#preArgs) option in order to complete the respective MIDI message.

----

#### `/note channel note velocity`

NoteOn event or noteOff if velocity equals `0`. Incoming noteOff events will be received as `/note` with velocity 0 if `note_off_velocity` is not set during [setup](../midi-configuration).

- `channel`: integer between 1 and 16
- `note`: integer between 0 and 127
- `velocity`: integer between 0 and 127

!!! example "Example"

    A push button might be configured as follows in order to send a MIDI note whose velocity is defined by the button's on/off value:

    - `address`: `/note`
    - `preArgs`: `[1, 60]` (for MIDI channel 1, and note 60 / C4)
    - `on`: `100` (for noteOn velocity of 100 on button push)
    - `off`: `0` (to send a noteOff on button release)
    - `target`: `midi:device_name` (where device_name is one of the declared midi devices defined during [setup](../midi-configuration))

----

#### `/note_off channel note velocity`

NoteOff event with any velocity. Incoming noteOff events will be received as `/note_off` if `note_off_velocity` is set during [setup](../midi-configuration).

----

#### `/control channel cc value`

Control change event.

- `channel`: integer between 1 and 16
- `cc`: integer between 0 and 127
- `value`: integer between 0 and 127

!!! example "Example"

    A fader might be configured as follows in order to send a MIDI control message (a volume control in this example):

    - `address`: `/control`
    - `pre-args`: `[1, 7]` (MIDI channel 1, control number 7 generally used as volume control)
    - `range`: `{"min": 0, "max": 127}` (MIDI values are encoded in this range)
    - `target`: `midi:device_name`

----

#### `/program channel program`

Program change event.

- `channel`: integer between 1 and 16
- `program`: integer between 0 and 127*

!!! info
    \* Some devices / softwares display the `program` value between 1 and 128, thus interpreting `program change 0` as `program change 1` and so on. Add the `pc_offset` parameter to the server's `midi` option to make Open Stage Control behave this way.

----

#### `/pitch channel pitch`

PitchWheel event.

- `channel`: integer between 1 and 16
- `pitch`: integer between 0 and 16383

----

#### `/sysex msg`

System exclusive message.

- `msg`: hexadecimal sysex data string of the form `f0 ... f7`.

Instead of a single hexadecimal string, arguments can be separated and defined either as hexadecimal bytes or as integers. When received, system messages are always formatted as a single hexadecimal string.

----

#### `/mtc timecode`

MIDI time code message.

- `timecode`: `hh:mm:ss:ff` string.


----

#### `/channel_pressure channel pressure`

Channel pressure event.

- `channel`: integer between 1 and 16
- `pressure`: integer between 0 and 127

----


#### `/key_pressure channel note pressure`

Polyphonic key pressure event.

- `channel`: integer between 1 and 16
- `note`: integer between 0 and 127
- `pressure`: integer between 0 and 127

----


#### `/rpn channel rpn value`

Registered Parameter Number event.

- `channel`: integer between 1 and 16
- `rpn`: integer between 0 and 16383
- `value`: integer between 0 and 16383

----

#### `/nrpn channel nrpn value`

Non-Registered Parameter Number event.

- `channel`: integer between 1 and 16
- `nrpn`: integer between 0 and 16383
- `value`: integer between 0 and 16383

----

---

## Customization

# CSS Tips

# CSS Tips

## Browser inspector


Hit ++f12++ to open the developers tools panel. The html/css inspector helps retrieving the class names needed to style specific parts of the widgets: hit ++ctrl+shift+c++ or click on the inspect icon (![x](/img/inspect.png)) and click on a element in the interface to reveal its html code.


## Inline syntax

For simple use cases, the `css` property can be written as a HTML inline styles (without any CSS selector). CSS rules will apply to the widget element.

```css
opacity: 0.5; /* make the widget transparent */
font-size: 120%; /* increase font-size */
```


## Selector syntax

CSS selectors can be used to apply styles to specific elements:

```css
:host {
    /* style for the widget element
       & { } also works (deprecated)
    */
}

label {
    /* style for the label elements */
}

> label {
    /* style for the direct child label element */
}

```

!!! info ""
    Mixing Inline and Selector syntaxes doesn't work, once you use selectors, you have to use the `:host` selector to target the widget element.

## Extra css classes: `class`

This non-standard css property can be used to add custom css classes to the widget element: `class: my-custom-class;`
Multiple classes can be added (one per `class` statement). Custom classes are always added to the widget's root element, css selectors are ignored.

!!! info ""
    Using class names that are already used in the app can be hazardous. In order to avoid that, custom class names should be prefixed with something uncommon and preferably cool, such as `xxx-myclass` or `crispy-seitan-myclass`.

## Layering: `z-index`

Z-Axis ordering can be set using the `z-index` rule. Widgets positioned at absolute coordinates (when `top` or `left` is different from `auto`) have `z-index:10;` by default.

## Responsive sizing

In most cases, using `vertical`, `horizontal` or `grid` layouts as well as using percentages in `height` and `width` will do. CSS `calc()` function can help in some cases (set the corresponding property to `auto` to avoid conflicts):

```css
:host {

    width: calc(100% - 100rem);

}
```

Media queries can also be used:

```css
@media screen and (min-width: 768px) {

    :host {

        /* style the widget if the screen is bigger than 768px */

    }

}
```


## Size units

- use `rem` instead of `px` (`px` values will not scale when zooming), except for media queries
- use `%` for font-size


## CSS variables

[CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) declared in the  [default theme](https://github.com/jean-emmanuel/open-stage-control/blob/master/src/scss/themes/default.scss) can be overridden.

Widgets also rely on CSS variables for the style properties (colors, padding, etc). These are documented in the widgets' `css` property description.

# Loading images

Image urls are resolved in this order:
- in the session's directory
- in theme's directory
- in the server's `remote-root` directory if the option is set
- as absolute paths

---

# Themes

## Built-in themes

Themes can be loaded with the `--theme` option. Multiple themes can be combined. Built-in themes can be loaded using their name, custom theme files can be loaded using their path.

Available themes (full color scheme):

- `nord`: arctic color palette (https://www.nordtheme.com/)
- `orange`: grey and orange theme

## Creating a custom theme

Creating a custom theme is as simple as writing a tiny css file that will override the default css variables defined in [default.scss](https://github.com/jean-emmanuel/open-stage-control/blob/master/src/scss/themes/default.scss) :

```css
:root {
	--color-accent: red;
}
```

This will change the default accent color to red. Variables can also be overridden for a specific subset of elements, for example :

```css
.panel-container {
	--color-accent: blue;
}
```

This will change the default accent color to blue for all elements in panel widgets.

## Autoreload

Theme files are reloaded automatically when they are modified.

## SCSS

If you want to use the [SCSS](https://sass-lang.com/documentation/syntax) syntax to write your theme, follow the [Running from sources](../../getting-started/running-from-sources) instructions, create a `.scss` file in `src/scss/themes/` and run `npm run watch-css`. The theme will be watched and compiled automatically to a css file located in `app/assets/themes/` (css files in this directory can be selected from the theme option by their name, without .css suffix).

---

## Custom Module

# Custom Module

# Custom module

Using the server's `custom-module` option, users can load a custom javascript module that filters incoming and outgoing OSC / MIDI messages.

## Writing a custom module


```js

// Do whatever you want
// initialize variables
// declare functions
// listen to app events
// load modules
// etc

module.exports = {

    init: function(){
        // this will be executed once when the osc server starts after
        // connections are set up
        // it is called for the main module only
    },

    stop: function(){
        // this will be executed once when the osc server stops
        // it is called for the main module only
    },

    reload: function(){
        // this will be executed after the custom module is reloaded
        // it is called for the main module only
    },

    oscInFilter:function(data){
        // Filter incoming osc messages

        var {address, args, host, port} = data

        // do what you want

        // address = string
        // args = array of {value, type} objects
        // host = string
        // port = integer

        // return data if you want the message to be processed
        return {address, args, host, port}

    },

    oscOutFilter:function(data){
        // Filter outgoing osc messages

        var {address, args, host, port, clientId} = data

        // same as oscInFilter

        // return data if you want the message to be and sent
        return {address, args, host, port}
    },

    unload: function(){
        // this will be executed before the custom module is reloaded
        // it is called for all modules, including other loaded modules
    },

}

```

## Available globals

The module is executed in a restricted context, only a few globals are available :

----

#### `app`
[`Event Emitter`](https://nodejs.org/api/events.html#events_class_eventemitter), useful for monitoring the events sent by the different clients. Event names can be found in [callbacks.js](https://github.com/jean-emmanuel/open-stage-control/blob/master/src/server/callbacks.js), callbacks are called with 2 arguments: `data` (object) and `client` (object: `{address, id}`)

----

#### `receive(host, port, address, ...args, options)`

Send osc/midi message to connected clients. `host` and `port` can be specified to simulate a specific origin for the message.

- `host` (optional): `string` ip address, valid hostname or `"midi"`
- `port` (optional): `integer` port number or `string` midi device name
- `address`: osc address
- `args`: value or `{type: "OSC_TYPE_LETTER", value: VALUE}` `object` (objects that don't match this format will simply be turned to a JSON string).
- `options` (optional): set to `{clientId: id}` to define which client receives the message (where `id` is the client's id as retrieved from `app` events or `oscOutFilter`)

For convenience, `host` and `port` can be provided both as single string argument joined with a colon.

----

#### `send(host, port, address, ...args)`

Send osc/midi to a target (see `receive()`).

----

#### `settings.read(name)`

Returns specified server option. `name` must be the option's long name without the leading dashes (ie: `"send"`, not `"s"`)

----

#### `settings.appAddresses()`

Returns the server's http addresses.

----

#### `loadJSON(path, errorCallback)`

Loads a json file (path is relative to the custom module location)

- `path`: `string`, path to file (any extension allowed, but the content must be valid JSON)
- `errorCallback` (optional): `function`, called with the error as argument if the file can't be loaded


----

#### `saveJSON(path, data, errorCallback)`

Saves an object/array to a json file (path is relative to the custom module location)

- `path`: `string`, path to file (any extension allowed)
- `data`: `object`, `array` or any value that can be encoded to JSON
- `errorCallback` (optional): `function`, called with the error as argument if the file can't be loaded

----

#### `require(path)`

Load another javascript module. Returns the value of `module.exports` defined in this module. If `path` is a relative path, it will be resolved against its parent module's path. See [Managing Big Modules](../managing-big-modules).

This function is different from node's native `require` function, it's merely a way to split a custom module into separate files.

----

#### `nativeRequire(moduleName)`

This function can be used to load native node modules or locally installed modules (e.g. with npm) if a `node_modules` folder is found in the custom module's location.

??? "Installing node modules: resources"
    - https://nodejs.dev/
    - https://nodejs.dev/learn/an-introduction-to-the-npm-package-manager
    - https://nodejs.dev/learn/the-package-json-guide

----

#### `tcpServer`

Raw access to the server's [TCP backend](https://github.com/jean-emmanuel/open-stage-control/blob/master/src/server/osc/tcp.js). Can be used to monitor the state of TCP connections:

```js
for (var ip in tcpServer.clients) {
    tcpServer.clients[ip].port.on('ready', ()=>{
        console.log(`TCP connection established with ${ip}:${tcpServer.clients[ip].remotePort}`)
    })
    tcpServer.clients[ip].port.on('close', ()=>{
        console.log(`TCP connection lost with ${ip}:${tcpServer.clients[ip].remotePort}`)
    })
}
```


#### Other javascript globals

- `console`
- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `__dirname`
- `__filename`
- `process`
- `global`

----


## Autoreload

Custom modules (including submodules loaded with `require()`) are reloaded automatically when they are modified. Upon reload, timers (`setTimeout` and `setInterval`) and event listeners (added to the  `app` object) are reset. After each reload the `module.exports.reload()` function (if any) is called.

The `global` object persists accross reloads.

??? "Reloading native modules"

    When using modules loaded with `nativeRequire()`, you may need to tell the custom module how to unload some components to allow reloading using the `module.exports.unload` definition. For example, if a port is bound using the `http` module, you'll need to unbind it otherwise the custom module will fail to bind it again when reloading:

    ```js

    var http = nativeRequire('http'),
        server = http.createServer((req, res)=>{
        res.writeHead(200)
        res.end('Hello world')
    })

    server.listen(5555, 'localhost')


    module.exports = {

        unload: function() {

            server.close()
            // otherwise you'd get "Error: listen EADDRINUSE: address already in use 127.0.0.1:5555"

        }

    }
    ```

---

# Managing Big Modules

Starting with `v1.6.0`, custom modules can load submodules with the `require()` function.

**1**. define some variable in `number.js`

```javascript
module.exports = 42
```

**2**. retrieve it in your main module file (`main.js`):

```javascript
var num = require('./number.js')

module.exports = {
    init: function(){
        console.log(num) // 42
    },
    oscInFilter: function(data){
        // etc
    }
}
```

---

# Examples

## Basic address routing

```js
module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        if (address === '/some_address') {
            address = '/fader_1'
        }

        return {address, args, host, port}

    },

    oscOutFilter:function(data){

        var {address, args, host, port, clientId} = data

        if (address === '/fader_1') {
            address = '/some_address'
        }

        return {address, args, host, port}
    }

}
```

## Value conversion

```js
module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        if (address === '/some_address') {

            args[0].value = args[0].value * 10

        }

        return {address, args, host, port}

    },

    oscOutFilter:function(data){

        var {address, args, host, port, clientId} = data

        if (address === '/some_address') {

            args[0].value = args[0].value / 10

        }

        return {address, args, host, port}
    }

}
```

## Arguments split / merge

```js

var xyValue = [0, 0]

module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        // split
        if (address === '/some_xy_address') {
            var arg1 = args[0].value,
                arg2 = args[1].value

            receive('/fader_1', arg1)
            receive('/fader_2', arg2)

            return // bypass original message
        }

        return {address, args, host, port}

    },

    oscOutFilter:function(data){

        var {address, args, host, port, clientId} = data

        // merge
        if (address === '/fader_1') {

            xyValue[0] = args[0].value
            send(host, port, '/some_xy_address', ...xyValue)
            return // bypass original message

        } else if (address === '/fader_2') {

            xyValue[1] = args[1].value
            send(host, port, '/some_xy_address', ...xyValue)
            return // bypass original message

        }

        return {address, args, host, port}
    }

}
```

## Reply

```js

module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        if (address === '/knock_knock') {

            send(host, port, '/who_is_there')

            return // bypass original message
        }

        return {address, args, host, port}

    },

}
```

## Simulate user input on a single client

```js

// keep track of connected clients

var clients = []

app.on('open', (data, client)=>{
    if (!clients.includes(client.id)) clients.push(client.id)
})

app.on('close', (data, client)=>{
    if (clients.includes(client.id)) clients.splice(clients.indexOf(client.id))
})

module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        if (address === '/some_osc_address') {

            // simulate user input on the first client in the array

            receive('/SET', 'widget_id', 1, {clientId: clients[0]})

            return // bypass original message
        }

        return {address, args, host, port}

    }

}


```

## Auto-save client state

```js
// store state in a variable
var state = {}

// keep track of connected clients
var clients = []

app.on('sessionOpened', (data, client)=>{

    // client connected (and in a session)
    if (!clients.includes(client.id)) clients.push(client.id)

    // when a client opens a session, send the state
    // but only if it's the only connected client (otherwise, let the regular sync happen)
    if (clients.length === 1) {
        receive('/STATE/SET', state, {clientId: clients[0]})
    }

})

app.on('close', (data, client)=>{

    // client disconnected
    if (clients.includes(client.id)) clients.splice(clients.indexOf(client.id))

})

// request 1st client's state every 10 seconds
setInterval(()=>{

    if (clients.length > 0) {
        receive('/STATE/GET', '127.0.0.1:8888', {clientId: clients[0]})
    }

}, 10000)


module.exports = {

    oscOutFilter: function(data) {

        if (data.address === '/STATE/GET') {
            // update state variable when the client responds
            state = data.args[0].value

            // bypass the osc message
            return
        }

        return data

    }

}

```

## MIDI routing

```js
var routing = {
    // midi cc vs widget id
    60: 'fader_1',
    61: 'fader_2',
    // etc
}

module.exports = {

    oscInFilter:function(data){
        // Filter incoming osc messages

        var {address, args, host, port} = data

        if (host === 'midi') {

            // MIDI routing !
            if (address === '/control') {

                // assign args to variables
                var [channel, ctrl, value] = args.map(arg=>arg.value)

                // simple conditions
                if (ctrl === 80) receive('/SET', 'widget_id', value / 127)

                // simple routing table (midi cc vs widget id)
                if (routing[ctrl]) receive('/SET', routing[ctrl], value / 127)

                // note: /SET simulates a user interaction and makes the widget send its osc message
                // but it adds some delay (we wait for the UI to respond)
                // AND it may trigger multiple replies if more than one client are connected.
                // Alternatively, we could do this:
                // send('/osc_address', value / 127)
                // receive('/osc_address', value / 127)
                // Or, to send /SET to a single client:
                // receive('/SET', '/osc_address', value / 127, {clientId: ID})


            }

            return // bypass original message

        }


        // return data if you want the message to be processed
        return {address, args, host, port}

    }


}
```


## Read file

```js

var fs = nativeRequire('fs')

module.exports = {

    oscOutFilter:function(data){
        // Filter outgoing osc messages

        var {address, args, host, port} = data

        if (address === '/file') {

            fs.readFile(args[0].value, 'utf8' , (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                receive('/html', data)
            })

            return // bypass original message

        }


        // return data if you want the message to be processed
        return {address, args, host, port}

    }


}
```

## Display RTSP Stream

```js
// requires ffmpeg installed on the system
// and rtsp-ffmpeg installed in the custom module's folder (by running npm install rtsp-ffmpeg)
// see https://github.com/agsh/rtsp-ffmpeg#ffmpeg for available options

var rtsp = nativeRequire('rtsp-ffmpeg')

var stream = new rtsp.FFMpeg({
    input: 'rtsp://freja.hiof.no:1935/rtplive/_definst_/hessdalen03.stream',
})

stream.on('data', (data)=>{

    // send frame to image widget with address set to "/stream"
    receive('/stream', 'data:image/jpeg;base64,' + data.toString('base64'))

})

module.exports = {

    unload: ()=>{
        stream.stop()
    }

}
```

## Custom module merger
```js
var submodules = [
    require('./custom_modA.js'),
    require('./custom_modB.js'),
    // etc
]


module.exports = {
    init: function(){
        for (var m of submodules) {
            if (m.init) m.init()
        }
    },
    reload: function(){
        for (var m of submodules) {
            if (m.reload) m.reload()
        }
    },
    oscInFilter: function(data){

        for (var m of submodules) {
            if (m.oscInFilter) data = m.oscInFilter(data)
            if (!data) return
        }

        return data

    },
    oscOutFilter: function(data){

        for (var m of submodules) {
            if (m.oscOutFilter) data = m.oscOutFilter(data)
            if (!data) return
        }

        return data
    }
}
```

## Dynamic widget creation
```js
function create_widgets() {
    receive('', '', '/EDIT', 'root', {
        widgets: [{
            type: 'panel',
            id: 'my_panel',
            layout: 'vertical',
            width: '100%',
            height: '200%',
            widgets: [
                {
                    type: 'text',
                    id: 'notice',
                    value: 'Hello, world!',
                    width: '100%',
                },
                {
                    type: 'button',
                    id: 'button',
                    address: '/foo',
                    preArgs: [1],
                },
            ]
        }]
    })
}

module.exports = {
    reload: function(){
        // Create widgets whenever the custom modules is edited
        create_widgets()
    },
}

// Create widgets whenever an existing session is loaded
app.on('sessionOpened', ()=>{
    create_widgets()
})

// And when a new session is created
app.on('sessionSetPath', (e)=>{
    if (e.path === '') {
        create_widgets()
    }
})
```


## Simple bridge

```js
module.exports = {

    oscInFilter: function(data) {

        // pass through incoming messages directly to another application
        send('127.0.0.1', 12345, data.address, ...args)

        return data // let original message reach clients / widgets
    }

}
```

---

## Widgets

# Advanced Syntaxes

# Advanced syntaxes

Advanced syntaxes are special blocks of code that can be written in the widgets properties to customize the widgets and how they behave. These blocks end up replaced with the value they hold before the widgets evaluate the properties they're in.


## Inheritance: `@{id.property}`

The inheritance syntax returns either a widget's value or one of its properties. When using this syntax, value or property changes will be applied automatically.

- `id`: target widget's `id`. A widget can fetch its own properties or its direct parent's by using the keywords `this` or `parent` instead of `id`. When `this` or `parent` can be used, using the target widget's `id` instead won't work.
- `property`: target widget's property name. If omitted (along with the dot), the widget's value will be returned (`@{widgetId}` is the same as `@{widgetId.value}`). `value` always resolves to the target widget's current value, not its `value` property.


!!! note "Unique identifier"
    Each widget has a unique random identifier that can be retrieved with the property name `uuid` (e.g. `@{this.uuid}`, `@{parent.uuid}`).

#### Dynamic properties

Some properties, when changed, trigger a complete widget recreation that ends any ongoing user interaction. Also, updating these properties continuously (e.g. when linked to a slider's dynamic value) can be very cpu expensive.

Some properties have much cheaper update routines and can be considered as `dynamic`, as in performance safe. These properties are marked in the documentation with a <i class="fas fa-bolt" title="dynamic"></i>.


#### Circular references cases

- container widgets can inherit their children's properties only to define `dynamic` properties
- widgets can inherit their own `value`<i class="dynamic-prop-icon" title="dynamic"></i> property only to define `dynamic` properties

#### Object properties

If the retrieved property is an object (`{}`), a subset can be retrieved directly by appending a dot and a key (array index or object key) : `@{parent.variables.key}`


#### Nesting

The inheritance syntax supports 1-level nesting for defining the target widget's id dynamically : `@{fader_@{toggle_1}}`


## OSC listeners: `OSC{address, default, usePreArgs}`

The OSC listener syntax returns the value received on specified address (or the `default` value if none has been received yet).

- `address`: osc address to listen to; if the leading slash (`/`) is omitted, the address will be prefixed with the widget's `address` property
- `default` (optional): default value returned before any message is received. Must be a primitive value, not an object or an array.
- `usePreArgs` (optional): by default, osc listeners inherit the widget's `preArgs` (these must be matched for the osc messages to be processed). Set to `false` bypass them.

Options can contain `@{}` blocks.

!!! note "Receiving MIDI"
    Midi messages will be processed only if the receiver's widget includes the emitting MIDI device in its targets.  

??? example "Array/Object default value"
    ```js
    JS{
        return OSC{address} || {
            "key a": 1,
            "key b": 2
        }
    }
    ```

## Custom variables: `VAR{variableName, default}`

This syntax creates a custom variable in the widget that can be read and modified from any widget's script property (see [scripting](./scripting.md#getvarid-name)). Changes made to this variable using `setVar()` in scripts will be applied automatically where `VAR{}` is used.`

## File imports: `IMPORT{file_name}`

This allows loading the content of an external file in a property. If used in a `JS{}` of `#{}` block, it will be seen as a string variable containing the raw content of the file. Changes made to the file be applied automatically.

File paths are resolved in this order:

- in the session's directory
- in theme's directory
- in the server's `remote-root` directory if the option is set
- as absolute paths

!!! warning
    [Fragments](../fragments/) and session files already loaded with fragment widgets should not be imported using this syntax.

## Javascript: `JS{ <code> }`

This syntax allows defining a property using [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). The code will be compiled as a function and executed in a restricted context.

- if no `return` statement is found, the formula will return an empty string
- javascript [strict mode](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode) is always enabled
- `setTimeout` and `setInterval` functions are not available

A property *cannot* contain multiple `JS{}` blocks

#### Available variables

- `console`: javascript console
- `locals`: object for storing/reading arbitrary values. Changing its properties *does not* trigger any synchronisation even if the value is used somewhere else.
- `globals`: same as `locals` but shared between all widgets, contains a few useful variables:
    - `screen`: client screen informations (`{width, height, orientation}`)
    - `env`: client options (ie: url query options),
    - `ip`: client's ip address,
    - `url`: server url,
    - `platform`: operating system as seen by the client
    - `session`: session file path
    - `clipboard`: instance of navigator [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)

Parsing errors can be read in the console (++ctrl+k++).

!!! warning
    Modifying values in `locals` or `globals` **does not** trigger anything if they are used somewhere else.

#### Using in advanced syntaxes

In this context, `@{}`, `VAR{}` and `OSC{}` syntaxes are seen as variables. When they change, the whole block will be evaluated again.

!!! danger "Do not mutate"
    When these syntaxes return objects or arrays, mutating said objects will affect the underlying variables in memory and may lead to unexpected behavior.

    The `@{}` syntax, when used for anything else than the widget's value, will always return a copy of the property and is not affected by this.

## Javascript: `#{ <code> }`

This is a shorthand for the `JS{}` syntax, the only difference being that `<code>` is automatically prepended with a `return` statement.

A property *can* contain multiple `#{}` blocks.

!!! note "Compilation order"
    `#{}` blocks are compiled after `JS{}` blocks

---

# Canvas

# Canvas widget

The canvas widget allows creating custom widgets with user-defined drawings and touch reactions.

It has two special properties, `touch` and `draw`, that work like the `script` property : they are used to defined scripts that will be executed when specific events occurs.

This widget requires a good understanding of the javascript [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and of the javascript programming language in general.

## Canvas properties

### `valueLength`

This property must be set to the number of values held by the widget : 1 for a simple slider, 2 for an XY pad, etc. Attempts to set the widget's value with a different number of values will be ignored.

```js
set("this", 1) // works if valueLength == 1
set("this", [1, 2]) // works if valueLength == 2
```

### `autoClear`

This is a convenience option that clears the canvas context and calls [`beginPath`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath) before each drawing. When this property is set to `false`, the canvas must be cleared manually.

### `continuous`

If this property is enabled, the widget will be redrawn at a fixed rate even if not interacted with (see [`onDraw`](#onDraw)).


### `onTouch`

This script is executed when the widget is touched, when it is released, and during the movement of the pointer while the widget is touched.

This script has access to the same variables and functions as the `script` property (except the event-specific ones), plus the following:

- `value`: widget value
- `width`: canvas width in pixels
- `height`: canvas height in pixels
- `event`: object containing the following:
    - `type`: `"start"`, `"move"` or `"stop"`
    - `target`: id of the widget under the pointer, `"this"` if it's the canvas widget itself, `null` if no widget is under the pointer
    - `targetName`: name attribute of the html element under the pointer
    - `targetTagName`: tag name of the html element under the pointer
    - `offsetX`, `offsetY`: touch coordinates in pixels, relative to the html element under the pointer
    - `movementX`, `movementY`: movement of the pointer in pixels since the last event
    - `pageX`, `pageY`: touch coordinates in pixels, relative to the page
    - `pointerId`: unique identifier used to differentiate fingers in multitouch situation
    - `altKey`, `ctrlKey`, `shiftKey`: keyboard modifier states
    - `force`: amount of pressure applied to the touch surface between `0` and `1` (see [Touch.force](https://developer.mozilla.org/en-US/docs/Web/API/Touch/force)). Equals `0` if the API is not supported or if no pressure information is found.
    - `radiusX`, `radiusY`, `rotationAngle`: see [Touch.rotationAngle](https://developer.mozilla.org/en-US/docs/Web/API/Touch/rotationAngle)
    - (iOS only) `altitudeAngle`, `azimuthAngle`: see [Touch.altitudeAngle](https://w3c.github.io/touch-events/#dom-touch-altitudeangle)
    - (iOS only) `touchType`: "direct" or "stylus"


!!! note "Extra html elements"
    Elements added using the `html` property can be touched as well, `event.targetName` can be used to determine which element is touched.


### `onDraw`

This script is executed when the widget should be redrawn, which is when it's touched and when it receives a value.

This script has access to the same variables and functions as the `script` property (except the event-specific ones), plus the following:

- `value`: widget value
- `width`: canvas width in pixels
- `height`: canvas height in pixels
- `ctx`: [canvas rendering context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) of the widget
- `cssVars`: object containing the computed value of some of the widget's style properties such as `colorWidget`, `alphaFill`, `padding`, etc

### `onResize`

This script is executed when the widget has resized, before it is redrawn.

This script has access to the same variables and functions as the `script` property (except the event-specific ones), plus the following:

- `value`: widget value
- `width`: canvas width in pixels
- `height`: canvas height in pixels
- `cssVars`: object containing the computed value of some of the widget's style properties such as `colorWidget`, `alphaFill`, `padding`, etc

## Example: XY pad

Let's create a simple xy pad, with a value made of two numbers between 0 and 1. We set `valueLength` to `2` to make sure the widget only accepts incoming messages with two values (x and y).

First, we use the `onTouch` property to store the touch coordinates in the `locals` object. We also call `set()` to store these in the widget's value (this way, the widget can send messages and sync with other widgets).

```js
// onTouch

// store normalized coordinates
if (event.type == "start") {
    locals.x = event.offsetX / width
    locals.y = event.offsetY / height
} else {
    // when the pointer is moving, increment coordinates
    // because offsetX and offsetY may not be relevant
    // if the pointer hovers a different widgets
    locals.x += event.movementX / width
    locals.y += event.movementY / height
}

// update widget value and send
set("this", [locals.x, locals.y])
```

Then, we use the `onDraw` property to draw a circle at the touch coordinates.

```js
// onDraw

// draw circle at touch coordinates
ctx.arc(value[0] * width, value[1] * height, 6, 0, Math.PI * 2)
// use colorFill property as stroke color
ctx.strokeStyle = cssVars.colorFill
// draw stroke
ctx.stroke()
```

Finally, we use the `onValue` property to apply limits to the values.

```js
// onValue

// apply limits
var x = Math.max(0, Math.min(1, value[0])),
    y = Math.max(0, Math.min(1, value[1]))

// re-update widget value without retriggering script or sending message
set("this", [x, y], {sync: false, send: false})

// the widget will automatically send its value if
// this script was triggered by a user interaction
// no need to call send() here but we could, for example
// if we want to split the value in to multiple messages
```

## Example: multi slider

Let's build a row of 20-sliders with a single widget. We first set `valueLength` to... 20 !

```js
// onTouch

// store normalized coordinates
if (event.type == "start") {
    locals.x = event.offsetX / width
    locals.y = event.offsetY / height
} else {
    // when the pointer is moving, increment coordinates
    // because offsetX and offsetY may not be relevant
    // if the pointer hovers a different widgets
    locals.x += event.movementX / width
    locals.y += event.movementY / height
}


// which slider are we touching ?
var n = parseInt(locals.x * value.length)
n = Math.max(0, Math.min(n, value.length-1))

// update value at slider's index
// 1 - locals.y because y axis is from top to bottom in js canvas
value[n] = 1 - locals.y

// update widget value and send
set("this", value)
```

```js
// onDraw

ctx.fillStyle = cssVars.colorFill
ctx.globalAlpha = cssVars.alphaFillOn

var sliderWidth = width / value.length - 1
for (var i in value){
    ctx.beginPath()
    ctx.rect(i * width / value.length, height, sliderWidth, - value[i] * height)
    ctx.fill()
}
```

```js
// onValue

// apply limits
for (var i in value) {
    value[i] = Math.max(0, Math.min(1, value[i]))
}

// re-update widget value without retriggering script or sending message
set("this", value, {sync: false, send: false})
```

---

# Fragments

# Fragments

Fragments allow breaking sessions into multiple files and reusable components made of multiple widgets.

## Fragment files


When right-clicking on a widget in the editor mode, it is possible to export it as a fragment file.

Fragment files have the same extension as session files (`.json`) and can be opened like regular sessions. When doing so, keep in mind that only the first child of the root widget will be saved. It is possible to save a fragment file as a session file (and vice versa) by toggling the `Fragment mode` in the main menu.


## Fragment widgets

Fragment widgets work like clone widget except their source widget are loaded from fragment files or session files. When the sources files are modified, the fragment widgets are updated automatically.

---

# General Mechanics

## Interaction

These are interaction events widgets are likely to respond to:

| Mouse | Touch | Description |
|---|---|---|
| Mousedown | Tap | Handled at pressing time, not releasing. |
| Click | Click | Handled at release time. |
| Double Click | Double Tap | Some widgets handle double click / double tap events. |
| Drag | Drag | The widgets respond to mouse and touch drag gestures with a 1:1 precision ratio. |


Widgets sensibility can be tuned with the `sensibility` property. Single-touch widgets (i.e. all widgets except `mutlixy` and `range`) also accept an alternate interaction event for fine control.

| Mouse | Touch | Description |
|---|---|---|
| `Ctrl` + Drag | / | Holding the `Ctrl` key while dragging with the mouse increases the gesture's precision by 10.|
| / | Two-fingers drag | Using two fingers on a single-touch target increases the gesture's precision by 10. |


## Sending messages

When interacted with, widgets with at least one target (including the server's defaults) send osc messages of the following form:

```
/address ...preArgs ...value
```

If they have MIDI targets, the server will try to convert the osc messages into a MIDI messages (see [MIDI messages](../midi/midi-messages.md)).


## Receiving messages

When an osc message is received, it updates every widgets that meets the following conditions

- same `address`
- same `preArgs` (no distinction between integers and round floats )

The remaining arguments after `preArgs` are passed to the widget.


When a MIDI message is received, it's converted into an osc message (see [MIDI messages](../midi/midi-messages.md)) and follows the same rules, except that only the widgets that include the emitting MIDI device in their targets will be able to receive it.   


## Widget synchronization

Within a single client's scope, there are multiple ways to synchronize widgets:

- If they share the same `id`: in this case, the synchronized widget doesn't send any osc/midi message. This case is mostly used for widget cloning.
- If they share a `linkId`: in this case, the synchronized widget sends its osc/midi message normally.
- If their `value` properties depend on each other using the [advanced syntaxes](./advanced-syntaxes.md)
- Using [scripting](./scripting.md)

## Client synchronization

From a client to another, widgets are automatically synchronized if they share the following properties:

- `address`
- `preArgs`
- `targets`

Client synchronization can be disabled globally with the `clientSync` [client option](../client-options.md). Widgets with `bypass` set to `true` will not send synchronization messages to other clients.

---

# Properties Reference

<!-- This file is generated automatically from the widget class declarations. See scripts/build-widget-reference.js -->

## Common

??? api "<div id="generic_properties">Generic properties<a class="headerlink" href="#generic_properties" title="Permanent link">#</a></div>"
    Properties shared by all widgets

    


=== "widget"

    | property | type |default | description |
    | --- | --- | --- | --- |
        | <h6 id="lock">lock<a class="headerlink" href="#lock" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to prevent modifying this widget with the editor. This will not prevent deleting the widget or moving it from a container to another. |
        | <h6 id="type">type<a class="headerlink" href="#type" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Widget type |
        | <h6 id="id">id<a class="headerlink" href="#id" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Widgets sharing the same `id` will act as clones and update each other's value(s) without sending extra osc messages (avoid doing so unless the widgets expect the exact same values). |
        | <h6 id="visible">visible<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visible" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the widget. |
        | <h6 id="interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#interaction" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable pointer interactions. |
        | <h6 id="comments">comments<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#comments" title="Permanent link">#</a></h6> | `string` | <code>""</code> | User comments. |


=== "geometry"

    | property | type |default | description |
    | --- | --- | --- | --- |
        | <h6 id="left">left<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#left" title="Permanent link">#</a></h6> | `number`&vert;<br/>`string` | <code>"auto"</code> | When both top and left are set to auto, the widget is positioned according to the normal flow of the page (from left to right, by order of creation).<br/><br/>Otherwise, the widget will be positioned at absolute coordinates |
        | <h6 id="top">top<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#top" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | When both top and left are set to auto, the widget is positioned according to the normal flow of the page (from left to right, by order of creation).<br/><br/>Otherwise, the widget will be positioned at absolute coordinates |
        | <h6 id="width">width<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#width" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Widget width |
        | <h6 id="height">height<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#height" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Widget height |
        | <h6 id="expand">expand<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#expand" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | If parent's layout is `vertical` or `horizontal`, set this to `true` to stretch the widget to use available space automatically. |


=== "style"

    | property | type |default | description |
    | --- | --- | --- | --- |
        | <h6 id="colorText">colorText<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorText" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Text color. Set to "auto" to inherit from parent widget. |
        | <h6 id="colorWidget">colorWidget<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorWidget" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Widget's default accent color. Set to "auto" to inherit from parent widget. |
        | <h6 id="colorStroke">colorStroke<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorStroke" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Stroke color. Set to "auto" to use `colorWidget`. |
        | <h6 id="colorFill">colorFill<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorFill" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Fill color. Set to "auto" to use `colorWidget`. |
        | <h6 id="alphaStroke">alphaStroke<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#alphaStroke" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Stroke color opacity. |
        | <h6 id="alphaFillOff">alphaFillOff<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#alphaFillOff" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fill color opacity (off). |
        | <h6 id="alphaFillOn">alphaFillOn<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#alphaFillOn" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fill color opacity (on). |
        | <h6 id="lineWidth">lineWidth<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#lineWidth" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Stroke width. |
        | <h6 id="borderRadius">borderRadius<a class="headerlink" href="#borderRadius" title="Permanent link">#</a></h6> | `number`&vert;<br/>`string` | <code>"auto"</code> | Border radius expressed as a number or a css string. This property may not work for all widgets. |
        | <h6 id="padding">padding<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#padding" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Inner spacing. |
        | <h6 id="html">html<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#html" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Custom html content to be inserted in the widget (before the widget's content). Elements are all unstyled by default, `css` should be used to customize their appearance.<br/><br/>The code is automatically wrapped in &lt;div class="html">&lt;/div><br/><br/>Allowed HTML tags:<br/><br/>&nbsp;&nbsp;h1-6, blockquote, p, a, ul, ol, nl, li,<br/><br/>&nbsp;&nbsp;b, i, strong, em, strike, code, hr, br, div,<br/><br/>&nbsp;&nbsp;table, thead, img, caption, tbody, tr, th, td, pre<br/><br/>Allowed attributes:<br/><br/>&nbsp;&nbsp;&lt;*>: class, style, title, name<br/><br/>&nbsp;&nbsp;&lt;img>: src, width, height |
        | <h6 id="css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke` |


=== "value"

    | property | type |default | description |
    | --- | --- | --- | --- |
        | <h6 id="value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#value" title="Permanent link">#</a></h6> | `*` | <code>""</code> | Define the widget's value depending on other widget's values / properties using the advanced property syntax |
        | <h6 id="default">default<a class="headerlink" href="#default" title="Permanent link">#</a></h6> | `*` | <code>""</code> | If set, the widget will be initialized with this value when the session is loaded. |
        | <h6 id="linkId">linkId<a class="headerlink" href="#linkId" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array` | <code>""</code> | Widgets sharing the same `linkId` update each other's value(s) AND send their respective osc messages.<br/><br/>When prefixed with >>, the `linkId` will make the widget act as a master (sending but not receiving)<br/><br/>When prefixed with <<, the `linkId` will make the widget act as a slave (receiving but not sending) |


=== "osc"

    | property | type |default | description |
    | --- | --- | --- | --- |
        | <h6 id="address">address<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#address" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | OSC address for sending / receiving messages, it must start with a slash (`/`)<br/><br/>By default ("auto"), the widget's id is used: `/widget_id` |
        | <h6 id="preArgs">preArgs<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#preArgs" title="Permanent link">#</a></h6> | `*`&vert;<br/>`array` | <code>""</code> | A value or array of values that will be prepended to the widget's value in the OSC messages it sends.<br/><br/>Incoming messages must match these to affect by the widget. |
        | <h6 id="typeTags">typeTags<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#typeTags" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Defines the osc argument types, one letter per argument (including preArgs)<br/>- If empty, the types are inferred automatically from the values (with numbers casted to floats by default)<br/>- If there are more arguments than type letters, the last type is used for the extra arguments<br/><br/>See <a href="http://opensoundcontrol.org/">OSC 1.0 specification</a> for existing typetags |
        | <h6 id="decimals">decimals<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#decimals" title="Permanent link">#</a></h6> | `integer` | <code>2</code> | Defines the number of decimals to send. |
        | <h6 id="target">target<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#target" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array`&vert;<br/>`null` | <code>""</code> | This defines the targets of the widget's OSC messages<br/>- A `string` or `array` of strings formatted as follow: `ip:port` or `["ip:portA", "ip:portB"]`<br/>- If midi is enabled, targets can be `midi:device_name`<br/>- If no target is set, messages can still be sent if the server has default targets |
        | <h6 id="ignoreDefaults">ignoreDefaults<a class="headerlink" href="#ignoreDefaults" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to ignore the server's default targets |
        | <h6 id="bypass">bypass<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#bypass" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to prevent the widget from sending any osc message |


=== "scripting"

    | property | type |default | description |
    | --- | --- | --- | --- |
        | <h6 id="onCreate">onCreate<a class="headerlink" href="#onCreate" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget (and its children) is created. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
        | <h6 id="onValue">onValue<a class="headerlink" href="#onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
## Basics

??? api "<div id="button">button<a class="headerlink" href="#button" title="Permanent link">#</a></div>"
    On / off button.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="button_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--color-text-on`: `colorTextOn` |
            | <h6 id="button_colorTextOn">colorTextOn<a class="headerlink" href="#button_colorTextOn" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Defines the widget's text color when active. |
            | <h6 id="button_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Set to `false` to hide completely<br/>- Insert icons using the prefix ^ followed by the icon's name : `^play`, `^pause`, etc (see https://fontawesome.com/search?m=free&s=solid<br/>- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal` |
            | <h6 id="button_vertical">vertical<a class="headerlink" href="#button_vertical" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the text vertically |
            | <h6 id="button_wrap">wrap<a class="headerlink" href="#button_wrap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to wrap long lines automatically. Set to `soft` to avoid breaking words.<br/><br/>Choices: `false`, `true`, `soft` |

    === "button"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="button_on">on<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_on" title="Permanent link">#</a></h6> | `*` | <code>1</code> | Set to `null` to send send no argument in the osc message. Ignored if `mode` is `momentary`. |
            | <h6 id="button_off">off<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_off" title="Permanent link">#</a></h6> | `*` | <code>0</code> | Set to `null` to send send no argument in the osc message. Must be different from `on`. Ignored if `mode` is `momentary` or `tap`. |
            | <h6 id="button_mode">mode<a class="headerlink" href="#button_mode" title="Permanent link">#</a></h6> | `string` | <code>"toggle"</code> | Interaction mode:<br/>- `toggle` (classic on/off switch)<br/>- `push` (press & release)<br/>- `momentary` (no release, no value sent with the address)<br/>- `tap` (no release, sends `on` as value)<br/><br/>Choices: `toggle`, `push`, `momentary`, `tap` |
            | <h6 id="button_doubleTap">doubleTap<a class="headerlink" href="#button_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the button require a double tap to be pushed instead of a single tap |
            | <h6 id="button_decoupled">decoupled<a class="headerlink" href="#button_decoupled" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` make the local feedback update only when it receives a value from an osc/midi message that matches the `on` or `off` property.<br/><br/>When `decoupled`, the button's value is ambiguous: when interacted with, it will send the value that's requested (`on` or `off` for `toggle` and `push` modes, `on` for `tap` mode, `null` for `momentary`), otherwise it will return the value received from the feedback message (`on` or `off` property).<br/><br/>From a script property, feedback messages can be simulated with:<br/><br/>`set("widget_id", value, {external: true})` |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="button_onValue">onValue<a class="headerlink" href="#button_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Additional variables:<br/>- `locals.touchCoords`: `[x, y]` array representing the touch coordinates, normalized between 0 and 1.<br/>- `locals.external`: `true` if value was received from an osc/midi message, `false otherwise`. |

??? api "<div id="switch">switch<a class="headerlink" href="#switch" title="Permanent link">#</a></div>"
    Value selector button.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="switch_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#switch_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--color-text-on`: `colorTextOn` |
            | <h6 id="switch_colorTextOn">colorTextOn<a class="headerlink" href="#switch_colorTextOn" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Defines the widget's text color when active. |
            | <h6 id="switch_layout">layout<a class="headerlink" href="#switch_layout" title="Permanent link">#</a></h6> | `string` | <code>"vertical"</code> | Defines how items should be laid out<br/><br/>Choices: `vertical`, `horizontal`, `grid` |
            | <h6 id="switch_gridTemplate">gridTemplate<a class="headerlink" href="#switch_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |
            | <h6 id="switch_wrap">wrap<a class="headerlink" href="#switch_wrap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to wrap long lines automatically. Set to `soft` to avoid breaking words.<br/><br/>Choices: `false`, `true`, `soft` |

    === "switch"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="switch_values">values<a class="headerlink" href="#switch_values" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>\{<br/>&nbsp;"Value 1": 1,<br/>&nbsp;"Value 2": 2<br/>}</code> | `Array` of possible values to switch between : `[1,2,3]`<br/><br/>`Object` of `"label":value` pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept<br/><br/>`{"labels": [], "values": []}` `object` where `labels` and `values` arrays must be of the same length. This syntax allows using the same label for different values. |
            | <h6 id="switch_mode">mode<a class="headerlink" href="#switch_mode" title="Permanent link">#</a></h6> | `string` | <code>"tap"</code> | Interaction mode:<br/>- `tap`: activates when the pointer is down but prevents further scrolling<br/>- `slide`: same as `tap` but allows sliding between values<br/>- `click`: activates upon click only and allows further scrolling<br/>- `flip`: selects the next value upon click regardless of where the widget is touched<br/><br/>Choices: `tap`, `slide`, `click`, `flip` |

??? api "<div id="dropdown">dropdown<a class="headerlink" href="#dropdown" title="Permanent link">#</a></div>"
    Native dropdown menu.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="dropdown_label">label<a class="headerlink" href="#dropdown_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Displayed text (defaults to current value). Keywords `%key` and `%value` will be replaced by the widget's selected key/value. |
            | <h6 id="dropdown_icon">icon<a class="headerlink" href="#dropdown_icon" title="Permanent link">#</a></h6> | `boolean` | <code>"true"</code> | Set to `false` to hide the dropdown icon |
            | <h6 id="dropdown_align">align<a class="headerlink" href="#dropdown_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |

    === "dropdown"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="dropdown_values">values<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#dropdown_values" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>\{<br/>&nbsp;"Value 1": 1,<br/>&nbsp;"Value 2": 2<br/>}</code> | `Array` of possible values to switch between : `[1,2,3]`<br/><br/>`Object` of label:value pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept<br/><br/>`{"labels": [], "values": []}` `object` where `labels` and `values` arrays must be of the same length. This syntax allows using the same label for different values. |

??? api "<div id="menu">menu<a class="headerlink" href="#menu" title="Permanent link">#</a></div>"
    Drag and drop menu with a circular or grid layout.

    === "geometry"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="menu_size">size<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_size" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array` | <code>200</code> | - If `layout` is `circular`: diameter (in px)<br/>- Else: square size or `[width, height]` array |
            | <h6 id="menu_ignoreTabs">ignoreTabs<a class="headerlink" href="#menu_ignoreTabs" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to allow the menu overflowing its tab ancestors. |

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="menu_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Displayed text (defaults to current value). Keywords `%key` and `%value` will be replaced by the widget's selected key/value. |
            | <h6 id="menu_icon">icon<a class="headerlink" href="#menu_icon" title="Permanent link">#</a></h6> | `boolean` | <code>"true"</code> | Set to `false` to hide the dropdown icon |
            | <h6 id="menu_textAlign">textAlign<a class="headerlink" href="#menu_textAlign" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
            | <h6 id="menu_menuAlignV">menuAlignV<a class="headerlink" href="#menu_menuAlignV" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `top` or `bottom` to change menu alignment (otherwise center)<br/><br/>Choices: `center`, `top`, `bottom` |
            | <h6 id="menu_menuAlignH">menuAlignH<a class="headerlink" href="#menu_menuAlignH" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change menu alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
            | <h6 id="menu_layout">layout<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_layout" title="Permanent link">#</a></h6> | `string` | <code>"circular"</code> | Defines whether the menu's layout should be rendered in a circle or in a box<br/><br/>Choices: `circular`, `horizontal`, `vertical`, `grid` |
            | <h6 id="menu_gridTemplate">gridTemplate<a class="headerlink" href="#menu_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |

    === "menu"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="menu_mode">mode<a class="headerlink" href="#menu_mode" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Interaction modes:<br/>- `default`: opens on touch, closes and changes value on release<br/>- `toggle`: opens on click, closes and changes value on next click<br/>- `swipe`: opens on touch, changes value when the pointer moves above items, closes on release<br/>- `doubleTap`: same as `default` but opens on double tap<br/>- `doubleTap-toggle`: same as `toggle` but opens on double tap<br/><br/>Choices: `default`, `toggle`, `swipe`, `doubleTap`, `doubleTap-toggle` |
            | <h6 id="menu_values">values<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_values" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[<br/>&nbsp;1,<br/>&nbsp;2,<br/>&nbsp;3<br/>]</code> | `Array` of possible values to switch between : `[1,2,3]`<br/><br/>`Object` of label:value pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept<br/><br/>`{"labels": [], "values": []}` `object` where `labels` and `values` arrays must be of the same length. This syntax allows using the same label for different values. |
            | <h6 id="menu_weights">weights<a class="headerlink" href="#menu_weights" title="Permanent link">#</a></h6> | `array` | <code>""</code> | `Array` of `number` defining the weights of each value in `values`<br/><br/>Ignored when `mode` is `grid` |

??? api "<div id="input">input<a class="headerlink" href="#input" title="Permanent link">#</a></div>"
    Text input.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="input_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#input_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="input_align">align<a class="headerlink" href="#input_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
            | <h6 id="input_unit">unit<a class="headerlink" href="#input_unit" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Unit will be appended to the displayed widget's value (it doesn't affect osc messages) |

    === "input"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="input_asYouType">asYouType<a class="headerlink" href="#input_asYouType" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the input send its value at each keystroke |
            | <h6 id="input_numeric">numeric<a class="headerlink" href="#input_numeric" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to allow numeric values only and display a numeric keyboard on mobile devices<br/><br/>Can be a number to specify the stepping value for mousewheel interaction (only when the input is focused). |
            | <h6 id="input_validation">validation<a class="headerlink" href="#input_validation" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Regular expression: if the submitted value doesn't match the regular expression, it will be reset to the last valid value.<br/><br/>If leading and trailing slashes are omitted, they will be added automatically and the flag will be set to "gm"<br/><br/>Examples:<br/>- `^[0-9]*$` accepts digits only, any number of them<br/>- `/^[a-zs]{0,10}$/i` accept between 0 and 10 alphabetic characters and spaces (case insensitive) |
            | <h6 id="input_maxLength">maxLength<a class="headerlink" href="#input_maxLength" title="Permanent link">#</a></h6> | `number` | <code>""</code> | Maximum number of characters allowed |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="input_onValue">onValue<a class="headerlink" href="#input_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |

??? api "<div id="textarea">textarea<a class="headerlink" href="#textarea" title="Permanent link">#</a></div>"
    Text area (multi line input). Tip: hit shift + enter for new lines.

??? api "<div id="file">file<a class="headerlink" href="#file" title="Permanent link">#</a></div>"
    File/Folder selector (server-side).

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="file_align">align<a class="headerlink" href="#file_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
            | <h6 id="file_hidePath">hidePath<a class="headerlink" href="#file_hidePath" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to only display the filename (the whole path will still be used as value) |
            | <h6 id="file_mode">mode<a class="headerlink" href="#file_mode" title="Permanent link">#</a></h6> | `string` | <code>"open"</code> | File browser mode<br/><br/>Choices: `open`, `save` |

    === "file"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="file_directory">directory<a class="headerlink" href="#file_directory" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Default browsing directory |
            | <h6 id="file_extension">extension<a class="headerlink" href="#file_extension" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array` | <code>"*"</code> | Only display files with this extension. Multiple extensions can be specified with an array of strings (`["jpg", "jpeg"]`) |
            | <h6 id="file_allowDir">allowDir<a class="headerlink" href="#file_allowDir" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Allow selecting a folder (by pressing "open" when no file is selected) |
## Containers

??? api "<div id="panel">panel<a class="headerlink" href="#panel" title="Permanent link">#</a></div>"
    Widgets or Tabs container.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="panel_colorBg">colorBg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_colorBg" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Panel background color. Set to "auto" to inherit from parent widget. |
            | <h6 id="panel_layout">layout<a class="headerlink" href="#panel_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
            | <h6 id="panel_justify">justify<a class="headerlink" href="#panel_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
            | <h6 id="panel_gridTemplate">gridTemplate<a class="headerlink" href="#panel_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |
            | <h6 id="panel_contain">contain<a class="headerlink" href="#panel_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
            | <h6 id="panel_scroll">scroll<a class="headerlink" href="#panel_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
            | <h6 id="panel_innerPadding">innerPadding<a class="headerlink" href="#panel_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |
            | <h6 id="panel_tabsPosition">tabsPosition<a class="headerlink" href="#panel_tabsPosition" title="Permanent link">#</a></h6> | `string` | <code>"top"</code> | Defines the position of the navigation bar if the panel contains tabs<br/><br/>Choices: `top`, `bottom`, `left`, `right`, `hidden` |

    === "panel"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="panel_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
            | <h6 id="panel_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` to limit affected widgets by the type of the first touched widget<br/><br/>Choices: `false`, `true`, `smart` |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="panel_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_value" title="Permanent link">#</a></h6> | `integer`&vert;<br/>`array` | <code>""</code> | If the panel contains tabs, its value defines which tab is selected selected (by index, starting with 0).<br/><br/>If the panel contains widgets and `scroll` is `true`, its value is an array that contains the scrolling state between 0 and 1 for the x and y axis.  |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="panel_onTouch">onTouch<a class="headerlink" href="#panel_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the session is touched and released, and when the pointer moves when the widget is touched. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="panel_widgets">widgets<a class="headerlink" href="#panel_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
            | <h6 id="panel_tabs">tabs<a class="headerlink" href="#panel_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="modal">modal<a class="headerlink" href="#modal" title="Permanent link">#</a></div>"
    A toggle button that opens a popup panel. Cannot contain tabs directly.

    === "geometry"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="modal_popupWidth">popupWidth<a class="headerlink" href="#modal_popupWidth" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"80%"</code> | Modal popup's size |
            | <h6 id="modal_popupHeight">popupHeight<a class="headerlink" href="#modal_popupHeight" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"80%"</code> | Modal popup's size |
            | <h6 id="modal_popupLeft">popupLeft<a class="headerlink" href="#modal_popupLeft" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Modal popup's position |
            | <h6 id="modal_popupTop">popupTop<a class="headerlink" href="#modal_popupTop" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Modal popup's position |
            | <h6 id="modal_relative">relative<a class="headerlink" href="#modal_relative" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the modal's position relative to the button's position. |
            | <h6 id="modal_ignoreTabs">ignoreTabs<a class="headerlink" href="#modal_ignoreTabs" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to allow the modal overflowing its tab ancestors. |

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="modal_colorBg">colorBg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_colorBg" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Panel background color. Set to "auto" to inherit from parent widget. |
            | <h6 id="modal_layout">layout<a class="headerlink" href="#modal_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
            | <h6 id="modal_justify">justify<a class="headerlink" href="#modal_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
            | <h6 id="modal_gridTemplate">gridTemplate<a class="headerlink" href="#modal_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |
            | <h6 id="modal_contain">contain<a class="headerlink" href="#modal_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
            | <h6 id="modal_scroll">scroll<a class="headerlink" href="#modal_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
            | <h6 id="modal_innerPadding">innerPadding<a class="headerlink" href="#modal_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |
            | <h6 id="modal_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Set to `false` to hide completely<br/>- Insert icons using the prefix ^ followed by the icon's name : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)<br/>- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal` |
            | <h6 id="modal_popupLabel">popupLabel<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_popupLabel" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Alternative label for the modal popup |
            | <h6 id="modal_popupPadding">popupPadding<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_popupPadding" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Modal's inner spacing. |

    === "modal"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="modal_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
            | <h6 id="modal_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` to limit affected widgets by the type of the first touched widget<br/><br/>Choices: `false`, `true`, `smart` |
            | <h6 id="modal_doubleTap">doubleTap<a class="headerlink" href="#modal_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the modal require a double tap to open instead of a single tap |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="modal_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_value" title="Permanent link">#</a></h6> | `integer` | <code>""</code> | Defines the modal's state:`0` for closed, `1` for opened |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="modal_onTouch">onTouch<a class="headerlink" href="#modal_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the session is touched and released, and when the pointer moves when the widget is touched. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="modal_widgets">widgets<a class="headerlink" href="#modal_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
            | <h6 id="modal_tabs">tabs<a class="headerlink" href="#modal_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="clone">clone<a class="headerlink" href="#clone" title="Permanent link">#</a></div>"
    Widget replication with overridable properties.

    === "clone"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="clone_widgetId">widgetId<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#clone_widgetId" title="Permanent link">#</a></h6> | `string` | <code>""</code> | `id` of the widget to clone |
            | <h6 id="clone_props">props<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#clone_props" title="Permanent link">#</a></h6> | `object` | <code>\{}</code> | Cloned widget's properties to override |

??? api "<div id="fragment">fragment<a class="headerlink" href="#fragment" title="Permanent link">#</a></div>"
    Embedded session or fragment file with overridable properties.

    === "fragment"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="fragment_file">file<a class="headerlink" href="#fragment_file" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Fragment file path (relative to the session or theme file location by default, falling back to absolute path) |
            | <h6 id="fragment_fallback">fallback<a class="headerlink" href="#fragment_fallback" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Fallack fragment file path, loaded if `file` can't be opened |
            | <h6 id="fragment_props">props<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fragment_props" title="Permanent link">#</a></h6> | `object` | <code>\{}</code> | Fragment widget's properties to override |

??? api "<div id="matrix">matrix<a class="headerlink" href="#matrix" title="Permanent link">#</a></div>"
    Generic matrix for creating rows/columns of widgets.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="matrix_colorBg">colorBg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_colorBg" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Panel background color. Set to "auto" to inherit from parent widget. |
            | <h6 id="matrix_layout">layout<a class="headerlink" href="#matrix_layout" title="Permanent link">#</a></h6> | `string` | <code>"horizontal"</code> | Defines how children are laid out.<br/><br/>Choices: `horizontal`, `vertical`, `grid` |
            | <h6 id="matrix_justify">justify<a class="headerlink" href="#matrix_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
            | <h6 id="matrix_gridTemplate">gridTemplate<a class="headerlink" href="#matrix_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |
            | <h6 id="matrix_contain">contain<a class="headerlink" href="#matrix_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
            | <h6 id="matrix_scroll">scroll<a class="headerlink" href="#matrix_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
            | <h6 id="matrix_innerPadding">innerPadding<a class="headerlink" href="#matrix_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |

    === "matrix"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="matrix_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
            | <h6 id="matrix_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` to limit affected widgets by the type of the first touched widget<br/><br/>Choices: `false`, `true`, `smart` |
            | <h6 id="matrix_widgetType">widgetType<a class="headerlink" href="#matrix_widgetType" title="Permanent link">#</a></h6> | `string` | <code>"button"</code> | Defines the type of the widgets in the matrix |
            | <h6 id="matrix_quantity">quantity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_quantity" title="Permanent link">#</a></h6> | `number` | <code>4</code> | Defines the number of widgets in the matrix |
            | <h6 id="matrix_props">props<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_props" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"label": "#{$}"<br/>}</code> | Defines a set of property to override the widgets' defaults.<br/><br/>JS{} and #{} blocks in this field are resolved with an extra variable representing each widget's index: `$` (e.g. `#{$}`)<br/><br/>Advanced syntax blocks (@{}, OSC{}, JS{}, VAR{} and #{}) are resolved at the matrix' scope (ie @{this.variables} returns the matrix' variables property)<br/><br/>Advanced syntax blocks can be passed to children without being resolved at the matrix' scope by adding an underscore before the opening bracket.<br/><br/>Note: unless overridden, children inherit from the matrix' `id` and osc properties (`id` and `address` are appended with `/$`) |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="matrix_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_value" title="Permanent link">#</a></h6> | `integer`&vert;<br/>`array` | <code>""</code> | If the panel contains tabs, its value defines which tab is selected selected (by index, starting with 0).<br/><br/>If the panel contains widgets and `scroll` is `true`, its value is an array that contains the scrolling state between 0 and 1 for the x and y axis.  |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="matrix_onTouch">onTouch<a class="headerlink" href="#matrix_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the session is touched and released, and when the pointer moves when the widget is touched. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="matrix_widgets">widgets<a class="headerlink" href="#matrix_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
            | <h6 id="matrix_tabs">tabs<a class="headerlink" href="#matrix_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="keyboard">keyboard<a class="headerlink" href="#keyboard" title="Permanent link">#</a></div>"
    Piano keyboard.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="keyboard_colorWhite">colorWhite<a class="headerlink" href="#keyboard_colorWhite" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | White keys color. |
            | <h6 id="keyboard_colorBlack">colorBlack<a class="headerlink" href="#keyboard_colorBlack" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Black keys color. |

    === "keyboard"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="keyboard_keys">keys<a class="headerlink" href="#keyboard_keys" title="Permanent link">#</a></h6> | `number` | <code>25</code> | Defines the number keys |
            | <h6 id="keyboard_start">start<a class="headerlink" href="#keyboard_start" title="Permanent link">#</a></h6> | `number` | <code>48</code> | MIDI note number to start with (default is C4)<br/><br/>Standard keyboards settings are: `[25, 48]`, `[49, 36]`, `[61, 36]`, `[88, 21]` |
            | <h6 id="keyboard_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#keyboard_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable traversing gestures |
            | <h6 id="keyboard_on">on<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#keyboard_on" title="Permanent link">#</a></h6> | `*` | <code>1</code> | Set to `null` to send send no argument in the osc message |
            | <h6 id="keyboard_off">off<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#keyboard_off" title="Permanent link">#</a></h6> | `*` | <code>0</code> | Set to `null` to send send no argument in the osc message |
            | <h6 id="keyboard_velocity">velocity<a class="headerlink" href="#keyboard_velocity" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to map the touch coordinates between `off` (top) and `on` (bottom). Requires `on` and `off` to be numbers |
            | <h6 id="keyboard_mode">mode<a class="headerlink" href="#keyboard_mode" title="Permanent link">#</a></h6> | `string` | <code>"push"</code> | Interaction mode:<br/>- `push` (press & release)<br/>- `toggle` (on/off switches)<br/>- `tap` (no release)<br/><br/>Choices: `push`, `toggle`, `tap` |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="keyboard_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#keyboard_value" title="Permanent link">#</a></h6> | `array` | <code>""</code> | The keyboard widget accepts the following values:<br/>- a `[note, value]` array to set the value of a single key where `note` is the note number and `value` depends on the `on` and `off` properties (any value different from `off` will be interpreted as `on`).<br/>- an array of values with one item per key in the keyboard |

??? api "<div id="patchbay">patchbay<a class="headerlink" href="#patchbay" title="Permanent link">#</a></div>"
    Connect inputs to outputs.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="patchbay_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#patchbay_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |

    === "patchbay"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="patchbay_inputs">inputs<a class="headerlink" href="#patchbay_inputs" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[<br/>&nbsp;"input_1",<br/>&nbsp;"input_2"<br/>]</code> | - `Array` of input names : `['input_1', 'input_2']`<br/>- `Object` of `"label_1": "input_1"` pairs (example: `{"label a": "name 1", "label b": "name 2"}`). Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept<br/><br/><br/><br/>Patchbay inputs can be connected to one or more outputs and will send messages of the following form when they are connected/disconnected: <br/><br/>`/patchbay_address input_x output_x output_y etc`<br/><br/>If no output is connected to the input, the message will be `/patchbay_address input_x`<br/><br/>The inputs values can be consumed with the property inheritance syntax: `@{patchbay_id/input_1}` returns an array of output names connected to `input_1`.<br/><br/>To change connections via scripting, one must target the input nodes as follows: `set('patchbay_id/input_name', ['output_x', 'output_y'])` |
            | <h6 id="patchbay_outputs">outputs<a class="headerlink" href="#patchbay_outputs" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[<br/>&nbsp;"output_1",<br/>&nbsp;"output_2"<br/>]</code> | List of output values the inputs can connect to (see `inputs`). |
            | <h6 id="patchbay_exclusive">exclusive<a class="headerlink" href="#patchbay_exclusive" title="Permanent link">#</a></h6> | `string` | <code>false</code> | - `in`: allows only one connection per input<br/>- `out`: allows only one connection per output<br/>- `both`: allows only one connection per input and output<br/><br/>Choices: `false`, `in`, `out`, `both` |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="patchbay_onValue">onValue<a class="headerlink" href="#patchbay_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |

??? api "<div id="folder">folder<a class="headerlink" href="#folder" title="Permanent link">#</a></div>"
    Flat container that doesn't affect layout. Mostly useful for grouping widgets in the tree.

    === "folder"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="folder_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#folder_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="folder_widgets">widgets<a class="headerlink" href="#folder_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
            | <h6 id="folder_tabs">tabs<a class="headerlink" href="#folder_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="root">root<a class="headerlink" href="#root" title="Permanent link">#</a></div>"
    Main (unique) container

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="root_colorBg">colorBg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_colorBg" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Panel background color. Set to "auto" to inherit from parent widget. |
            | <h6 id="root_layout">layout<a class="headerlink" href="#root_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
            | <h6 id="root_justify">justify<a class="headerlink" href="#root_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
            | <h6 id="root_gridTemplate">gridTemplate<a class="headerlink" href="#root_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |
            | <h6 id="root_contain">contain<a class="headerlink" href="#root_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
            | <h6 id="root_scroll">scroll<a class="headerlink" href="#root_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
            | <h6 id="root_innerPadding">innerPadding<a class="headerlink" href="#root_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |
            | <h6 id="root_tabsPosition">tabsPosition<a class="headerlink" href="#root_tabsPosition" title="Permanent link">#</a></h6> | `string` | <code>"top"</code> | Defines the position of the navigation bar if the panel contains tabs<br/><br/>Choices: `top`, `bottom`, `left`, `right`, `hidden` |
            | <h6 id="root_hideMenu">hideMenu<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_hideMenu" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to hide the main menu button. |

    === "root"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="root_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
            | <h6 id="root_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` to limit affected widgets by the type of the first touched widget<br/><br/>Choices: `false`, `true`, `smart` |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="root_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_value" title="Permanent link">#</a></h6> | `integer`&vert;<br/>`array` | <code>""</code> | If the panel contains tabs, its value defines which tab is selected selected (by index, starting with 0).<br/><br/>If the panel contains widgets and `scroll` is `true`, its value is an array that contains the scrolling state between 0 and 1 for the x and y axis.  |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="root_onTouch">onTouch<a class="headerlink" href="#root_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the session is touched and released, and when the pointer moves when the widget is touched. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |
            | <h6 id="root_onPreload">onPreload<a class="headerlink" href="#root_onPreload" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed before any other widget is created. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="root_widgets">widgets<a class="headerlink" href="#root_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
            | <h6 id="root_tabs">tabs<a class="headerlink" href="#root_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="tab">tab<a class="headerlink" href="#tab" title="Permanent link">#</a></div>"
    Tabbed panel widget

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="tab_colorBg">colorBg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_colorBg" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Panel background color. Set to "auto" to inherit from parent widget. |
            | <h6 id="tab_layout">layout<a class="headerlink" href="#tab_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
            | <h6 id="tab_justify">justify<a class="headerlink" href="#tab_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
            | <h6 id="tab_gridTemplate">gridTemplate<a class="headerlink" href="#tab_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns or a valid value for the css property "grid-template". |
            | <h6 id="tab_contain">contain<a class="headerlink" href="#tab_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
            | <h6 id="tab_scroll">scroll<a class="headerlink" href="#tab_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
            | <h6 id="tab_innerPadding">innerPadding<a class="headerlink" href="#tab_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |
            | <h6 id="tab_tabsPosition">tabsPosition<a class="headerlink" href="#tab_tabsPosition" title="Permanent link">#</a></h6> | `string` | <code>"top"</code> | Defines the position of the navigation bar if the panel contains tabs<br/><br/>Choices: `top`, `bottom`, `left`, `right`, `hidden` |
            | <h6 id="tab_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Set to `false` to hide completely<br/>- Insert icons using the prefix ^ followed by the icon's name : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)<br/>- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal` |

    === "tab"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="tab_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
            | <h6 id="tab_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` to limit affected widgets by the type of the first touched widget<br/><br/>Choices: `false`, `true`, `smart` |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="tab_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_value" title="Permanent link">#</a></h6> | `integer`&vert;<br/>`array` | <code>""</code> | If the panel contains tabs, its value defines which tab is selected selected (by index, starting with 0).<br/><br/>If the panel contains widgets and `scroll` is `true`, its value is an array that contains the scrolling state between 0 and 1 for the x and y axis.  |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="tab_onTouch">onTouch<a class="headerlink" href="#tab_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the session is touched and released, and when the pointer moves when the widget is touched. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="tab_widgets">widgets<a class="headerlink" href="#tab_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
            | <h6 id="tab_tabs">tabs<a class="headerlink" href="#tab_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |
## Frames

??? api "<div id="frame">frame<a class="headerlink" href="#frame" title="Permanent link">#</a></div>"
    Embed a web page in a frame. Note: some websites do not allow this.

    === "frame"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="frame_allow">allow<a class="headerlink" href="#frame_allow" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Content for the iframe element's <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/allow">allow</a> attribute |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="frame_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#frame_value" title="Permanent link">#</a></h6> | `string` | <code>""</code> | External web page URL. |

??? api "<div id="svg">svg<a class="headerlink" href="#svg" title="Permanent link">#</a></div>"
    Svg parser.

    === "svg"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="svg_svg">svg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#svg_svg" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Svg xml definition (will be wrapped in a `< svg />` element) |

??? api "<div id="html">html<a class="headerlink" href="#html" title="Permanent link">#</a></div>"
    Simple HTML parser.

??? api "<div id="image">image<a class="headerlink" href="#image" title="Permanent link">#</a></div>"
    Load a image (url or base64-encoded).

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="image_size">size<a class="headerlink" href="#image_size" title="Permanent link">#</a></h6> | `string` | <code>"cover"</code> | CSS background-size<br/><br/>Choices: `cover`, `contain`, `auto` |
            | <h6 id="image_position">position<a class="headerlink" href="#image_position" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | CSS background-position<br/><br/>Choices: `center`, `left`, `right`, `top`, `bottom`, `left top`, `left bottom`, `right top`, `right bottom` |
            | <h6 id="image_repeat">repeat<a class="headerlink" href="#image_repeat" title="Permanent link">#</a></h6> | `string` | <code>"no-repeat"</code> | CSS background-repeat<br/><br/>Choices: `no-repeat`, `repeat`, `repeat-x`, `repeat-y`, `space`, `round` |

    === "image"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="image_cache">cache<a class="headerlink" href="#image_cache" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to false to disable image caching (forces file reload when updating or editing the widget).<br/><br/>When true, sending `reload` to the widget reloads its image without changing its value |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="image_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#image_value" title="Permanent link">#</a></h6> | `string` | <code>""</code> | - File `url` or `path` (relative to the session or theme file location by default, falling back to absolute path)<br/>- Base64 encoded image : `data:image/...`<br/>- Enter "qrcode" to display the server's address QR code |
## Graphs

??? api "<div id="plot">plot<a class="headerlink" href="#plot" title="Permanent link">#</a></div>"
    XY coordinates plot.

    === "widget"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="plot_interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#plot_interaction" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `false` to disable pointer interactions. |

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="plot_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#plot_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="plot_dots">dots<a class="headerlink" href="#plot_dots" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Draw dots on the line |
            | <h6 id="plot_bars">bars<a class="headerlink" href="#plot_bars" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to use draw bars instead (disables `logScaleX` and forces `x axis` even spacing) |
            | <h6 id="plot_pips">pips<a class="headerlink" href="#plot_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |

    === "plot"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="plot_rangeX">rangeX<a class="headerlink" href="#plot_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis |
            | <h6 id="plot_rangeY">rangeY<a class="headerlink" href="#plot_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis |
            | <h6 id="plot_logScaleX">logScaleX<a class="headerlink" href="#plot_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale. |
            | <h6 id="plot_logScaleY">logScaleY<a class="headerlink" href="#plot_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis. Set to `-1` for exponential scale. |
            | <h6 id="plot_origin">origin<a class="headerlink" href="#plot_origin" title="Permanent link">#</a></h6> | `number`&vert;<br/>`boolean` | <code>"auto"</code> | Defines the y axis origin. Set to `false` to disable it |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="plot_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#plot_value" title="Permanent link">#</a></h6> | `array`&vert;<br/>`string` | <code>""</code> | - `Array` of `y` values: `[y1, y2, ...]`<br/>- `Array` of `[x, y]` `array` values: `[[x1 , y1], [x2, y2], ...]`<br/>- `String` `array`: `"[y1, y2, ...]"` or `"[[x1 , y1], [x2, y2], ...]"`<br/>- `String` `object` to update specific coordinates only: `"{0: y1, 1: y2}"` or `"{0: [x1, y1], 1: [x2, y2]}"` |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="plot_onValue">onValue<a class="headerlink" href="#plot_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |

??? api "<div id="eq">eq<a class="headerlink" href="#eq" title="Permanent link">#</a></div>"
    Draws logarithmic frequency response from an array of filter objects.

    === "widget"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="eq_interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#eq_interaction" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `false` to disable pointer interactions. |

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="eq_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#eq_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="eq_dots">dots<a class="headerlink" href="#eq_dots" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Draw dots on the line |
            | <h6 id="eq_bars">bars<a class="headerlink" href="#eq_bars" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to use draw bars instead (disables `logScaleX` and forces `x axis` even spacing) |
            | <h6 id="eq_pips">pips<a class="headerlink" href="#eq_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |

    === "eq"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="eq_rangeX">rangeX<a class="headerlink" href="#eq_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 20,<br/>&nbsp;"max": 22000<br/>}</code> | Defines the min and max values for the x axis (in Hz, logarithmic scale)<br/><br/>The sampling frequency used to compute the response curve will be 2 * rangeX.max |
            | <h6 id="eq_rangeY">rangeY<a class="headerlink" href="#eq_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": -6,<br/>&nbsp;"max": 6<br/>}</code> | Defines the min and max values for the y axis (in dB) |
            | <h6 id="eq_origin">origin<a class="headerlink" href="#eq_origin" title="Permanent link">#</a></h6> | `number`&vert;<br/>`boolean` | <code>"auto"</code> | Defines the y axis origin. Set to `false` to disable it |
            | <h6 id="eq_filters">filters<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#eq_filters" title="Permanent link">#</a></h6> | `array` | <code>""</code> | Each item must be an object with the following properties<br/>- `type`: string ("highpass", "highshelf", "lowpass", "lowshelf", "peak", "bandpass" or "notch", default: "peak")<br/>- `freq`: number (filter's resonant frequency, default: 1000)<br/>- `q`: number (Q factor, default: 1)<br/>- `gain`: number (default: 0)<br/>- `on`: boolean (default: true)<br/>- `poles`: if `type` is "highpass" or "lowpass", indicates the number of poles for the filter (if omitted or 0, a biquad filter with Q factor is used). Set to 1 for 6dB/otaves roll-off, 2 for 12dB/octaves, etc.<br/><br/>See https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode |
            | <h6 id="eq_pips">pips<a class="headerlink" href="#eq_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to false to hide the scale |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="eq_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#eq_value" title="Permanent link">#</a></h6> | `array`&vert;<br/>`string` | <code>""</code> | - `Array` of `y` values: `[y1, y2, ...]`<br/>- `Array` of `[x, y]` `array` values: `[[x1 , y1], [x2, y2], ...]`<br/>- `String` `array`: `"[y1, y2, ...]"` or `"[[x1 , y1], [x2, y2], ...]"`<br/>- `String` `object` to update specific coordinates only: `"{0: y1, 1: y2}"` or `"{0: [x1, y1], 1: [x2, y2]}"` |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="eq_onValue">onValue<a class="headerlink" href="#eq_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |

??? api "<div id="visualizer">visualizer<a class="headerlink" href="#visualizer" title="Permanent link">#</a></div>"
    Display its value over time.

    === "widget"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="visualizer_interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visualizer_interaction" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `false` to disable pointer interactions. |

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="visualizer_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visualizer_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="visualizer_pips">pips<a class="headerlink" href="#visualizer_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |

    === "visualizer"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="visualizer_rangeX">rangeX<a class="headerlink" href="#visualizer_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis |
            | <h6 id="visualizer_rangeY">rangeY<a class="headerlink" href="#visualizer_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis |
            | <h6 id="visualizer_logScaleX">logScaleX<a class="headerlink" href="#visualizer_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale. |
            | <h6 id="visualizer_logScaleY">logScaleY<a class="headerlink" href="#visualizer_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis (base 10). Set to a `number` to define the logarithm's base. |
            | <h6 id="visualizer_origin">origin<a class="headerlink" href="#visualizer_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the y axis origin. Set to `false` to disable it |
            | <h6 id="visualizer_duration">duration<a class="headerlink" href="#visualizer_duration" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines visualization duration in seconds |
            | <h6 id="visualizer_framerate">framerate<a class="headerlink" href="#visualizer_framerate" title="Permanent link">#</a></h6> | `number` | <code>30</code> | Defines visualization framerate |
            | <h6 id="visualizer_freeze">freeze<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visualizer_freeze" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to freeze current view and ignore incoming values |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="visualizer_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visualizer_value" title="Permanent link">#</a></h6> | `array`&vert;<br/>`string` | <code>""</code> | - `Array` of `y` values: `[y1, y2, ...]`<br/>- `Array` of `[x, y]` `array` values: `[[x1 , y1], [x2, y2], ...]`<br/>- `String` `array`: `"[y1, y2, ...]"` or `"[[x1 , y1], [x2, y2], ...]"`<br/>- `String` `object` to update specific coordinates only: `"{0: y1, 1: y2}"` or `"{0: [x1, y1], 1: [x2, y2]}"` |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="visualizer_onValue">onValue<a class="headerlink" href="#visualizer_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |
## Indicators

??? api "<div id="led">led<a class="headerlink" href="#led" title="Permanent link">#</a></div>"
    Intensity display.

    === "widget"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="led_interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#led_interaction" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `false` to disable pointer interactions. |

    === "led"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="led_mode">mode<a class="headerlink" href="#led_mode" title="Permanent link">#</a></h6> | `string` | <code>"intensity"</code> | Defines how value is interpreted (see `value`)<br/><br/>Choices: `intensity`, `color` |
            | <h6 id="led_range">range<a class="headerlink" href="#led_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Value range |
            | <h6 id="led_alphaRange">alphaRange<a class="headerlink" href="#led_alphaRange" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Alpha range (if `mode` is `color`) |
            | <h6 id="led_logScale">logScale<a class="headerlink" href="#led_logScale" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | If `mode` is `intensity`, set to `true` to use logarithmic scale. |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="led_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#led_value" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>""</code> | If `mode` is `intensity`:<br/>- `Number`: `intensity` between `range.min` and `range.max`<br/><br/>If `mode` is `color`:<br/>- `Array`: `[r, g, b]` (`r`, `g` and `b` between `range.min` and `range.max`)<br/>- `Array`: `[r, g, b, alpha]` (`alpha` between `alphaRange.min` and `alphaRange.max`)<br/>- `String`: CSS color |

??? api "<div id="text">text<a class="headerlink" href="#text" title="Permanent link">#</a></div>"
    Display text.

    === "widget"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="text_interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#text_interaction" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `false` to disable pointer interactions. |

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="text_vertical">vertical<a class="headerlink" href="#text_vertical" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the text vertically |
            | <h6 id="text_wrap">wrap<a class="headerlink" href="#text_wrap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to wrap long lines automatically. Set to `soft` to avoid breaking words.<br/><br/>Choices: `false`, `true`, `soft` |
            | <h6 id="text_align">align<a class="headerlink" href="#text_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Text alignment.<br/><br/>Choices: `center`, `left`, `right`, `top`, `bottom`, `left top`, `left bottom`, `right top`, `right bottom` |
## Pads

??? api "<div id="xy">xy<a class="headerlink" href="#xy" title="Permanent link">#</a></div>"
    Two-dimensional slider.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="xy_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#xy_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="xy_pointSize">pointSize<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#xy_pointSize" title="Permanent link">#</a></h6> | `integer` | <code>20</code> | Defines the points' size (may be in %) |
            | <h6 id="xy_ephemeral">ephemeral<a class="headerlink" href="#xy_ephemeral" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the point will be drawn only while touched. |
            | <h6 id="xy_pips">pips<a class="headerlink" href="#xy_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |
            | <h6 id="xy_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#xy_label" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Text displayed in the handle |

    === "xy"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="xy_snap">snap<a class="headerlink" href="#xy_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, the points are dragged from their initial position.<br/><br/>If set to `true`, touching anywhere on the widget's surface will make them snap to the touching coordinates |
            | <h6 id="xy_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#xy_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its default value when released |
            | <h6 id="xy_rangeX">rangeX<a class="headerlink" href="#xy_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis (see fader) |
            | <h6 id="xy_rangeY">rangeY<a class="headerlink" href="#xy_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis (see fader) |
            | <h6 id="xy_logScaleX">logScaleX<a class="headerlink" href="#xy_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale. |
            | <h6 id="xy_logScaleY">logScaleY<a class="headerlink" href="#xy_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis. Set to `-1` for exponential scale. |
            | <h6 id="xy_stepsX">stepsX<a class="headerlink" href="#xy_stepsX" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>false</code> | Defines `steps` for the x axis (see fader) |
            | <h6 id="xy_stepsY">stepsY<a class="headerlink" href="#xy_stepsY" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>false</code> | Defines `steps` for the x axis (see fader) |
            | <h6 id="xy_axisLock">axisLock<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#xy_axisLock" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Restrict movements to one of the axes only unless `Shift` is held.<br/><br/>When left empty, holding `Shift` while dragging will lock the pad according the first movement. `auto` will do the opposite.<br/><br/>Choices: ``, `x`, `y`, `auto` |
            | <h6 id="xy_doubleTap">doubleTap<a class="headerlink" href="#xy_doubleTap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to make the knob reset to its `default` value when receiving a double tap.<br/><br/>Can be an osc address, in which case the widget will just send an osc message with no value (but `preArgs` included).<br/><br/>If set to "script", `onTouch` will be called with `event.type` set to `doubleTap`. <br/><br/>Choices: `false`, `true`, `script` |
            | <h6 id="xy_sensitivity">sensitivity<a class="headerlink" href="#xy_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the pad's sensitivity when `snap` is `false`  |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="xy_onValue">onValue<a class="headerlink" href="#xy_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |
            | <h6 id="xy_onTouch">onTouch<a class="headerlink" href="#xy_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

??? api "<div id="rgb">rgb<a class="headerlink" href="#rgb" title="Permanent link">#</a></div>"
    Color picker with optional alpha slider.

    === "rgb"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="rgb_snap">snap<a class="headerlink" href="#rgb_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, the points are dragged from their initial position.<br/><br/>If set to `true`, touching anywhere on the widget's surface will make them snap to the touching coordinates |
            | <h6 id="rgb_spring">spring<a class="headerlink" href="#rgb_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its default value when released |
            | <h6 id="rgb_range">range<a class="headerlink" href="#rgb_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 255<br/>}</code> | Defines the widget's output scale. |
            | <h6 id="rgb_alpha">alpha<a class="headerlink" href="#rgb_alpha" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable alpha channel |
            | <h6 id="rgb_rangeAlpha">rangeAlpha<a class="headerlink" href="#rgb_rangeAlpha" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the widget's output scale for the alpha channel. |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="rgb_onTouch">onTouch<a class="headerlink" href="#rgb_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

??? api "<div id="multixy">multixy<a class="headerlink" href="#multixy" title="Permanent link">#</a></div>"
    Multi-point XY pad.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="multixy_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#multixy_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="multixy_pointSize">pointSize<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#multixy_pointSize" title="Permanent link">#</a></h6> | `integer` | <code>20</code> | Defines the points' default size (may be in %) |
            | <h6 id="multixy_ephemeral">ephemeral<a class="headerlink" href="#multixy_ephemeral" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the points will be drawn only while touched. |
            | <h6 id="multixy_pips">pips<a class="headerlink" href="#multixy_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |

    === "multixy"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="multixy_points">points<a class="headerlink" href="#multixy_points" title="Permanent link">#</a></h6> | `integer`&vert;<br/>`array` | <code>2</code> | Defines the number of points on the pad<br/><br/>Can be an array of strings that will be used as labels for the points (ex: `['A', 'B']`) |
            | <h6 id="multixy_pointsAttr">pointsAttr<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#multixy_pointsAttr" title="Permanent link">#</a></h6> | `object` | <code>[]</code> | Defines per-point properties that are otherwise inherited from the multixy. Must be an array of objects (one per point) that may contain the following keys:<br/>- visible (visibility and interactability)<br/>- colorFill (background color)<br/>- colorStroke (outline color)<br/>- colorText (label color)<br/>- color (shorthand for colorFill and colorStroke)<br/>- alphaFillOn (background opacity)<br/>- pointSize<br/>- label |
            | <h6 id="multixy_snap">snap<a class="headerlink" href="#multixy_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, the points are dragged from their initial position.<br/><br/>If set to `true`, touching anywhere on the widget's surface will make them snap to the touching coordinates |
            | <h6 id="multixy_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#multixy_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its default value when released |
            | <h6 id="multixy_rangeX">rangeX<a class="headerlink" href="#multixy_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis (see fader) |
            | <h6 id="multixy_rangeY">rangeY<a class="headerlink" href="#multixy_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis (see fader) |
            | <h6 id="multixy_logScaleX">logScaleX<a class="headerlink" href="#multixy_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale. |
            | <h6 id="multixy_logScaleY">logScaleY<a class="headerlink" href="#multixy_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis. Set to `-1` for exponential scale. |
            | <h6 id="multixy_stepsX">stepsX<a class="headerlink" href="#multixy_stepsX" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>false</code> | Defines `steps` for the x axis (see fader) |
            | <h6 id="multixy_stepsY">stepsY<a class="headerlink" href="#multixy_stepsY" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>false</code> | Defines `steps` for the x axis (see fader) |
            | <h6 id="multixy_axisLock">axisLock<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#multixy_axisLock" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Restrict movements to one of the axes only.<br/><br/>When left empty, holding `Shift` while dragging will lock the pad according the first movement. `auto` will do the opposite.<br/><br/>Choices: ``, `x`, `y`, `auto` |
            | <h6 id="multixy_doubleTap">doubleTap<a class="headerlink" href="#multixy_doubleTap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to make the knob reset to its `default` value when receiving a double tap.<br/><br/>Can be an osc address, in which case the widget will just send an osc message with no value (but `preArgs` included).<br/><br/>If set to "script", `onTouch` will be called with `event.type` set to `doubleTap`. <br/><br/>Choices: `false`, `true`, `script` |
            | <h6 id="multixy_sensitivity">sensitivity<a class="headerlink" href="#multixy_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the pad's sensitivity when `snap` is `false`  |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="multixy_onValue">onValue<a class="headerlink" href="#multixy_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |
            | <h6 id="multixy_onTouch">onTouch<a class="headerlink" href="#multixy_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

??? api "<div id="canvas">canvas<a class="headerlink" href="#canvas" title="Permanent link">#</a></div>"
    Multitouch canvas widget with user-defined drawing functions and touch reactions.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="canvas_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#canvas_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |

    === "canvas"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="canvas_valueLength">valueLength<a class="headerlink" href="#canvas_valueLength" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the number of values accepted by the widget (minimum 1). Incoming messages that don't comply will be ignored<br/><br/>When calling `set()` from a script, submitted value should be an array only if `valueLength` is greater than 1. |
            | <h6 id="canvas_autoClear">autoClear<a class="headerlink" href="#canvas_autoClear" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If set to `false`, the canvas context won't be cleared automatically and `ctx.clearRect()` will need to be called in `onDraw`. |
            | <h6 id="canvas_continuous">continuous<a class="headerlink" href="#canvas_continuous" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | If set to `true`, `onDraw` will be called at each frame, otherwise it will be called only when the widget is touched and when it receives a value.<br/><br/>Can be a number between 1 and 60 to specify the framerate (default: 30 fps). |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="canvas_onCreate">onCreate<a class="headerlink" href="#canvas_onCreate" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is created. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
            | <h6 id="canvas_onValue">onValue<a class="headerlink" href="#canvas_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed whenever the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
            | <h6 id="canvas_onTouch">onTouch<a class="headerlink" href="#canvas_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released, and when the pointer moves when the widget is touched. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |
            | <h6 id="canvas_onDraw">onDraw<a class="headerlink" href="#canvas_onDraw" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is redrawn. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |
            | <h6 id="canvas_onResize">onResize<a class="headerlink" href="#canvas_onResize" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is resized. See <a href="https://openstagecontrol.ammd.net/docs/widgets/canvas/">documentation</a>. |
## Sliders

??? api "<div id="fader">fader<a class="headerlink" href="#fader" title="Permanent link">#</a></div>"
    Vertical / horizontal slider.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="fader_borderRadius">borderRadius<a class="headerlink" href="#fader_borderRadius" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Border radius expressed as a number (same for all corners, applies only for compact design). |
            | <h6 id="fader_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="fader_design">design<a class="headerlink" href="#fader_design" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Design style<br/><br/>Choices: `default`, `round`, `compact` |
            | <h6 id="fader_knobSize">knobSize<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_knobSize" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fader knob size |
            | <h6 id="fader_colorKnob">colorKnob<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_colorKnob" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Fader knob color |
            | <h6 id="fader_horizontal">horizontal<a class="headerlink" href="#fader_horizontal" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the fader horizontally |
            | <h6 id="fader_pips">pips<a class="headerlink" href="#fader_pips" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to show range breakpoints (ignored if `design` is `compact`) |
            | <h6 id="fader_dashed">dashed<a class="headerlink" href="#fader_dashed" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`array` | <code>false</code> | Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]` |
            | <h6 id="fader_gradient">gradient<a class="headerlink" href="#fader_gradient" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[]</code> | When set, the meter's gauge will be filled with a linear color gradient<br/>- each item must be a CSS color string.<br/>- as an `object`: each key must be a number between 0 and 1<br/>- each item must be a CSS color string.<br/><br/>Examples: `['blue', 'red']`, {'0': 'blue', '0.9': 'blue', '1': 'red'}  |

    === "fader"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="fader_snap">snap<a class="headerlink" href="#fader_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, dragging the widget will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position |
            | <h6 id="fader_touchZone">touchZone<a class="headerlink" href="#fader_touchZone" title="Permanent link">#</a></h6> | `string` | <code>"all"</code> | Restrict interaction to a part of the widget:<br/>- `all`: touching the widget anywhere will start an interaction<br/>- `knob`: touching the knob will start an interaction<br/>- `gauge`: touching anywhere in the knob's moving range will start an interaction<br/><br/>This setting is ignored in containers with `traversing` set to `true`<br/><br/>Choices: `all`, `knob`, `gauge` |
            | <h6 id="fader_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its `default` value when released |
            | <h6 id="fader_doubleTap">doubleTap<a class="headerlink" href="#fader_doubleTap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to make the knob reset to its `default` value when receiving a double tap.<br/><br/>Can be an osc address, in which case the widget will just send an osc message with no value (but `preArgs` included).<br/><br/>If set to "script", `onTouch` will be called with `event.type` set to `doubleTap`. <br/><br/>Choices: `false`, `true`, `script` |
            | <h6 id="fader_range">range<a class="headerlink" href="#fader_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
            | <h6 id="fader_logScale">logScale<a class="headerlink" href="#fader_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
            | <h6 id="fader_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the fader's sensitivity when `snap` is `false`  |
            | <h6 id="fader_steps">steps<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_steps" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>""</code> | Restricts the widget's value:<br/>- `number`: define a number of evenly spaced steps<br/>- `array` of numbers: use arbitrary values as steps<br/>- `auto`: use values defined in `range` |
            | <h6 id="fader_origin">origin<a class="headerlink" href="#fader_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the starting point's value of the fader's gauge |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="fader_onValue">onValue<a class="headerlink" href="#fader_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |
            | <h6 id="fader_onTouch">onTouch<a class="headerlink" href="#fader_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

??? api "<div id="knob">knob<a class="headerlink" href="#knob" title="Permanent link">#</a></div>"
    Rotative knob slider.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="knob_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="knob_design">design<a class="headerlink" href="#knob_design" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Design style<br/><br/>Note: "solid" design uses "colorStroke" for the central knob color.<br/><br/>Choices: `default`, `solid`, `line` |
            | <h6 id="knob_colorKnob">colorKnob<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_colorKnob" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Knob color |
            | <h6 id="knob_pips">pips<a class="headerlink" href="#knob_pips" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to show the scale's breakpoints |
            | <h6 id="knob_dashed">dashed<a class="headerlink" href="#knob_dashed" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`array` | <code>false</code> | Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]` |
            | <h6 id="knob_angle">angle<a class="headerlink" href="#knob_angle" title="Permanent link">#</a></h6> | `number` | <code>270</code> | Defines the angle's width of the knob, in degrees |

    === "knob"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="knob_mode">mode<a class="headerlink" href="#knob_mode" title="Permanent link">#</a></h6> | `string` | <code>"vertical"</code> | - `vertical`: relative move in vertical motion<br/>- `circular`: relative move in circular motion<br/>- `snap`: snap to touch position<br/>- `snap-alt`: alternative snap mode that allow jumping from `range.min` to `range.max`. `sensitivity` is ignored with this mode.<br/><br/>Choices: `vertical`, `circular`, `snap`, `snap-alt` |
            | <h6 id="knob_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its `default` value when released |
            | <h6 id="knob_doubleTap">doubleTap<a class="headerlink" href="#knob_doubleTap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to make the knob reset to its `default` value when receiving a double tap.<br/><br/>Can be an osc address, in which case the widget will just send an osc message with no value (but `preArgs` included).<br/><br/>If set to "script", `onTouch` will be called with `event.type` set to `doubleTap`. <br/><br/>Choices: `false`, `true`, `script` |
            | <h6 id="knob_range">range<a class="headerlink" href="#knob_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
            | <h6 id="knob_logScale">logScale<a class="headerlink" href="#knob_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
            | <h6 id="knob_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the knob's sensitivity when `mode` is not `snap`  |
            | <h6 id="knob_steps">steps<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_steps" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number`&vert;<br/>`array` | <code>""</code> | Restricts the widget's value:<br/>- `number`: define a number of evenly spaced steps<br/>- `array` of numbers: use arbitrary values as steps<br/>- `auto`: use values defined in `range` |
            | <h6 id="knob_origin">origin<a class="headerlink" href="#knob_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the starting point's value of the knob's gauge |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="knob_onValue">onValue<a class="headerlink" href="#knob_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |
            | <h6 id="knob_onTouch">onTouch<a class="headerlink" href="#knob_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

??? api "<div id="encoder">encoder<a class="headerlink" href="#encoder" title="Permanent link">#</a></div>"
    A knob that sends a relative direction information instead of an absolute value.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="encoder_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#encoder_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |

    === "encoder"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="encoder_mode">mode<a class="headerlink" href="#encoder_mode" title="Permanent link">#</a></h6> | `string` | <code>"circular"</code> | - `circular`: relative move in circular motion<br/>- `snap`: snap to touch position and move in vertical motion<br/>- `vertical`: relative move in vertical motion<br/><br/>Choices: `circular`, `snap`, `vertical` |
            | <h6 id="encoder_doubleTap">doubleTap<a class="headerlink" href="#encoder_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the fader reset to its `default` value when receiving a double tap.<br/><br/>Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`)<br/><br/>Choices: `false`, `true`, `script` |
            | <h6 id="encoder_range">range<a class="headerlink" href="#encoder_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
            | <h6 id="encoder_logScale">logScale<a class="headerlink" href="#encoder_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
            | <h6 id="encoder_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#encoder_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | When set between 0 and 1, reduces the encoder's verbosity |
            | <h6 id="encoder_ticks">ticks<a class="headerlink" href="#encoder_ticks" title="Permanent link">#</a></h6> | `number` | <code>""</code> | Defines the granularity / verbosity of the encoder (number of step for a 360° arc) |
            | <h6 id="encoder_back">back<a class="headerlink" href="#encoder_back" title="Permanent link">#</a></h6> | `*` | <code>-1</code> | Defines which value is sent when rotating the encoder anticlockwise |
            | <h6 id="encoder_forth">forth<a class="headerlink" href="#encoder_forth" title="Permanent link">#</a></h6> | `*` | <code>1</code> | Defines which value is sent when rotating the encoder clockwise |
            | <h6 id="encoder_release">release<a class="headerlink" href="#encoder_release" title="Permanent link">#</a></h6> | `number` | <code>""</code> | Defines which value is sent when releasing the encoder:<br/>- Set to `null` to send send no argument in the osc message<br/>- Can be an `object` if the type needs to be specified |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="encoder_onValue">onValue<a class="headerlink" href="#encoder_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height`<br/><br/>Additional variables:<br/>- `locals.speed`: encoder's speed (reduce `sensitivity` to increase averaging)<br/>- `locals.angle`: encoder's angle in degrees |
            | <h6 id="encoder_onTouch">onTouch<a class="headerlink" href="#encoder_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

??? api "<div id="range">range<a class="headerlink" href="#range" title="Permanent link">#</a></div>"
    A fader with two heads for setting a range.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="range_borderRadius">borderRadius<a class="headerlink" href="#range_borderRadius" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Border radius expressed as a number (same for all corners, applies only for compact design). |
            | <h6 id="range_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Some style-related properties can be set or read from css using css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--border-radius`: `borderRadius`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/><br/>Canvas-based widget have their computed width and height available as css variables (read-only):<br/>- `--widget-width`<br/>- `--widget-height` |
            | <h6 id="range_design">design<a class="headerlink" href="#range_design" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Design style<br/><br/>Choices: `default`, `round`, `compact` |
            | <h6 id="range_knobSize">knobSize<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_knobSize" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fader knob size |
            | <h6 id="range_colorKnob">colorKnob<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_colorKnob" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Fader knob color |
            | <h6 id="range_horizontal">horizontal<a class="headerlink" href="#range_horizontal" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the fader horizontally |
            | <h6 id="range_pips">pips<a class="headerlink" href="#range_pips" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to show range breakpoints (ignored if `design` is `compact`) |
            | <h6 id="range_dashed">dashed<a class="headerlink" href="#range_dashed" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`array` | <code>false</code> | Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]` |
            | <h6 id="range_gradient">gradient<a class="headerlink" href="#range_gradient" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[]</code> | When set, the meter's gauge will be filled with a linear color gradient<br/>- each item must be a CSS color string.<br/>- as an `object`: each key must be a number between 0 and 1<br/>- each item must be a CSS color string.<br/><br/>Examples: `['blue', 'red']`, {'0': 'blue', '0.9': 'blue', '1': 'red'}  |

    === "range"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="range_snap">snap<a class="headerlink" href="#range_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, dragging the widget will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position |
            | <h6 id="range_touchZone">touchZone<a class="headerlink" href="#range_touchZone" title="Permanent link">#</a></h6> | `string` | <code>"all"</code> | Restrict interaction to a part of the widget:<br/>- `all`: touching the widget anywhere will start an interaction<br/>- `knob`: touching the knob will start an interaction<br/>- `gauge`: touching anywhere in the knob's moving range will start an interaction<br/><br/>This setting is ignored in containers with `traversing` set to `true`<br/><br/>Choices: `all`, `knob`, `gauge` |
            | <h6 id="range_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its `default` value when released |
            | <h6 id="range_doubleTap">doubleTap<a class="headerlink" href="#range_doubleTap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to make the knob reset to its `default` value when receiving a double tap.<br/><br/>Can be an osc address, in which case the widget will just send an osc message with no value (but `preArgs` included).<br/><br/>If set to "script", `onTouch` will be called with `event.type` set to `doubleTap`. <br/><br/>Choices: `false`, `true`, `script` |
            | <h6 id="range_range">range<a class="headerlink" href="#range_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
            | <h6 id="range_logScale">logScale<a class="headerlink" href="#range_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
            | <h6 id="range_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the fader's sensitivity when `snap` is `false`  |
            | <h6 id="range_steps">steps<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_steps" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>""</code> | Restricts the widget's value:<br/>- `number`: define a number of evenly spaced steps<br/>- `array` of numbers: use arbitrary values as steps<br/>- `auto`: use values defined in `range` |

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="range_onValue">onValue<a class="headerlink" href="#range_onValue" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>.<br/><br/>Canvas-based widget have their computed width and height available as local variables:<br/>- `locals.width`<br/>- `locals.height` |
            | <h6 id="range_onTouch">onTouch<a class="headerlink" href="#range_onTouch" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is touched and released. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
## Scripts

??? api "<div id="script">script<a class="headerlink" href="#script" title="Permanent link">#</a></div>"
    Scripting widget utility with keyboard bindings

    === "scripting"

        | property | type |default | description |
        | --- | --- | --- | --- |
            | <h6 id="script_onCreate">onCreate<a class="headerlink" href="#script_onCreate" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed when the widget is created. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
            | <h6 id="script_onKeyboard">onKeyboard<a class="headerlink" href="#script_onKeyboard" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed whenever the widget receives a keyboard event if `keyBinding` is set). See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |
            | <h6 id="script_keyBinding">keyBinding<a class="headerlink" href="#script_keyBinding" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array` | <code>""</code> | Key combo `string` or `array` of strings (see <a href="https://github.com/RobertWHurst/KeyboardJS">KeyboardJS</a> documentation).<br/><br/>If the editor is enabled, some keys / combos will not work.<br/><br/>To process all keystroke events, write `['']` |
            | <h6 id="script_keyRepeat">keyRepeat<a class="headerlink" href="#script_keyRepeat" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to prevent keydown repeats when holding the key combo pressed |
            | <h6 id="script_keyType">keyType<a class="headerlink" href="#script_keyType" title="Permanent link">#</a></h6> | `string` | <code>"keydown"</code> | Determines which key event trigger the script's execution<br/><br/>Choices: `keydown`, `keyup`, `both` |

??? api "<div id="variable">variable<a class="headerlink" href="#variable" title="Permanent link">#</a></div>"
    Receives / stores a value, to be used in scripts (using the get function) or in properties (using the @{} syntax).

---

# Scripting

# Scripting

Widgets can run [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) scripts upon specific events. These scripts are written in special properties under the scripting category.

!!! warning "Advanced syntaxes"
    Most [advanced syntaxes](../advanced-syntaxes/) should be avoided as much as possible in scripting properties:

    - `@{}`: use `get()` and `getProp()` instead
    - `OSC{}`: use `get()` instead (using another widget as receiver)
    - `VAR{}`: use `getVar()`instead
    - `JS{}` and `#{}` are useless (scripting properties are already interpreted as javascript code) unless you want to generate code procedurally

    The editor will always fail to recognize these syntaxes as they don't comply with the javacript language specification, even if the resulting code is valid.

## Events

### `onCreate`

This script is called when the widget is created. If the widget has children, it will be executed after the children are created.

!!! warning "Modifying parent container"
    Modifying a non-dynamic property on a parent container from this script **will not work**.

The following variables are available in this context:

- `value`: widget's value    

### `onValue`

This script is called when the widget's value updates and when it receives a value.

The following variables are available in this context:

- `id` (`string`): id of the widget that's responsible for the value update
- `value`: widget's value
- `touch`: see [Touch state](#touch-state)

??? infos "Keyboard & Matrix"
    In keyboards and matrices, `id` is the id of the child widget that triggered the event, and `value` is an array containing the children's values.
    The touched widget's value can be retrieved with:
    ```javascript
    value[getIndex(id)]
    ```

??? infos "Touch state (deprecated)"

    *This feature is deprecated, use `onTouch` instead*

    When some widgets are touched or released, a special value event can be caught to trigger custom actions.

    If the variable `touch` is not `undefined`, this means it holds the widget's current touch state:

    - `0/1` for the widget's touch state (`fader`, `knob` and `xy`, `range` and `multixy`)
    - `[i, 0/1]` if the widget is multi touch (`range` and `multixy`). In this case `i` is the touched handle's index, starting with `0`.

    ```js
    if (touch !== undefined) {
        // send multi touch state
        if (touch.length) send('/touch_address', touch[0], touch[1])
        // send global touch state
        else send('/touch_address', touch)
    } else {
        // do something with the value ?
    }
    ```

    To avoid unwanted script executions, touch state events will only be caught if the script contains the word `touch` and if `onTouch` is empty.


### `onTouch`

This script is executed when the widget is touched, and when it is released.

This script has access to the same variables and functions as the `script` property (except the event-specific ones), plus the following:

- `value`: widget value
- `event`: object containing the following:
    - `type`: `"start"` or `"stop"`
    - `handle`: `undefined` if the event concerns the widget, `integer` if it concerns one of it's handles (`multixy` and `range` widgets only)

[Canvas](../canvas/) and containers expose more informations in their `onTouch` script.

??? infos "Containers onTouch"

    Containers (root, panel, etc) can monitor touch events happening inside them, it works like with [Canvas](../canvas/#ontouch), with a few differences:

    - `event.firstTarget` will return the id of the first touched widget
    - setting `event.preventDefault` to `true` will prevent the event from reaching widgets in the container ('start' and 'move' events only)
    - setting `event.allowScroll` to `true` will allow touch scrolling where it would normally be prevented ('start' event only)
    - setting `event.inertia` will affect 'move' events (works like widget `sensitivity` in reverse (1 = normal, 10 = slow move))
    - `width` and `height` are undefined

    Containers with `traversing` enabled change how touch events are emitted:

    - a new 'stop' event is emitted whenever the pointer exits a touchable widget while pressed.
    - a new 'start' event is emitted whenever the pointer enters a touchable widget while pressed.


### `onDraw`

See [canvas](../canvas/).

### `onKeyboard`

*Script widget only*

This script is executed when the key(s) defined in the widget's `keyBinding` property are pressed.


The following variables are available in this context:


- `type` (`string`): `keydown` or `keyup`
- `key` (`string`): key name,
- `code` (`number`): key code
- `ctrl` (`boolean)`: `true` if ctrl key is pressed
- `shift` (`boolean`): `true` if shift key is pressed
- `alt` (`boolean`): `true` if alt key is pressed
- `meta` (`boolean`): `true` if meta key is pressed


### `onPreload`

This script is specific to the root widget, it's called before any other widget is created and can be used to create global variables / functions accessible in other scripts.

## Available variables

The following variables and functions are accessible in this context.


- `console`: javascript console
- `locals`: object for storing/reading arbitrary values. Changing its properties *does not* trigger any synchronisation even if the value is used somewhere else.
- `globals`: same as `locals` but shared between all widgets, contains a few useful variables:
    - `screen`: client screen informations (`{width, height, orientation}`)
    - `env`: client options (ie: url query options),
    - `ip`: client's ip address,
    - `url`: server url,
    - `platform`: operating system as seen by the client
    - `session`: session file path
    - `clipboard`: instance of navigator [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- `Image`: javascript's [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) constructor


!!! note "this"
    Unlike in most javascript contexts, the special keyword `this` doesn't point to an object but instead returns the string `"this"`.


----

#### `get(id)`
- `id`: widget `id` as a string.

Returns the value of the first matching widget. If the returned value is an object, a copy is returned to allow safe mutation.

----

#### `set(id, value, options)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget. `id` may contains wildcards ('\*').
- `value`: new value for the widget.
- `options` (optional): `object`, accepts the following items:
    - `sync: false`: prevents widgets from triggering synchronization and scripts
    - `script: false`: prevents scripts but not synchronization
    - `send: false`: prevents widgets from sending osc messages
    - `external: true`: simulates a value coming from an osc/midi message (implies `sync: false` automatically)

Sets the value of the first matching widget. If `ìd` contains wildcards, affects all matching widgets **except** the emitting widget.

If the event that triggered the script's execution was initiated by a user interaction, this will make the widget send its value as well (unless `options` is set to `{send: false}`).

----

#### `getVar(id, name)`
- `id`: widget `id` as a string.
- `name`: variable name as a string.

Returns the value of a widget's custom variable. If the returned value is an object, a copy is returned to allow safe mutation.

----

#### `setVar(id, name, value)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget. `id` may contains wildcards ('\*').
- `name`: variable name as a string.
- `value`: new value for the variable.

Sets the value of a widget's custom variable (see [advanced syntaxes](./advanced-syntaxes.md##ustom-variables-varvariablename-default)). If `ìd` contains wildcards, affects all matching widgets.


----

#### `send(target, address, ...args)`
- `target` (optional): `"ip:port"` or `"midi:device_name"` string. If omitted, the widget's target (or the server's defaults) will be used.
- `address`: osc address, must start with a `/`
- `args`: values or `{type: "OSC_TYPE_LETTER", value: VALUE}` objects

Sends an osc message.

If the event that triggered the script's execution was not initiated by a user interaction, this function will have no effect.

This function ignores the widget's `bypass` and `ignoreDefaults` properties.

??? infos "Examples"
    ```javascript
    send('127.0.0.1:4444', '/address', 1)
    send('127.0.0.1:4444', '/address', 1, 2)
    send('/address', 1) // uses the widget's target
    send('/address', {type: 'i', value: 1}) // sends 1 as an integer
    ```


----

#### `getProp(id, name)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `name`: property name.

Returns the property called `"name"` of the first matching widget. If the returned value is an object, a copy is returned to allow safe mutation.

----

#### `getIndex(id)`
- `id` (optional): widget `id` as a string. Defaults to `"this"`.

Returns the widget's index in its container.

----

#### `updateProp(id, name)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `name`: property name.

Forces a widget to check if one of its properties has changed and update itself if needed.

----

#### `updateCanvas(id)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget.

Forces a canvas widget redraw.

----

#### `httpGet(url, callback)`

- `url`: url of the resource to fetch (local url only)
- `callback`: function executed when/if the http request succeeds, with the response text as argument

----

#### `stateGet(id)`
- `id`: widget `id` as a string, or array of `id` strings. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.

Returns a state object (`id:value`) for matching widget and all their children.

----

#### `stateSet(state, options)`

Loads a state object. If the event that triggered the script's execution was initiated by a user interaction, this will make the updated widgets send their value as well.

- `options` (optional): `object`, accepts the following items:
    - `send: false`: prevents widgets from sending osc messages

----

#### `storage`

Global [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) instance, allows storing data that persists upon refresh/relaunch.

----

#### `setTimeout(id, callback, delay)` / `setInterval(id, callback, delay)`

These work like almost their native equivalent, with an extra (optional) `id` argument.

- `id` (optional): unique identifier, if omitted, defaults to `undefined`. If a timeout with the same id is already running, it is cleared before the new one is created (even if `undefined`). `id`s are scoped to the widget's context: two timeouts with the same `id` in two different widgets can run concurrently
- `callback`: function to be executed
- `delay`: delay before execution is ms

Reference:

- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval


Usage note:

If no concurrent timeout / interval is needed, calling `setTimeout`, `setInterval`, `clearTimeout` and `clearInterval` with no `ìd` argument will do.

-----

#### `clearTimeout(id)` / `clearInterval(id)`

Clears timeout with matching `id`.

Reference:

- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout
- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval

----

#### `setFocus(id)`

- `id` (optional): widget `id` as a string

Gives focus to a widget (ie input widget).

*Built-in client only*: tells the operating system to give the focus to the client window

----

#### `unfocus()`

*Built-in client only*: tells the operating system to give the focus to the window that was focused before.

----

#### `setFocusable(focusable)`

- `focusable`: `0` or `1`

*Built-in client only*: define whether the client window can be focused or not. Text inputs cannot be interacted with when the window is not focusable.

----

#### `getScroll(id)`
- `id`: widget `id` as a string.

Returns the scroll position of a container as a `[x, y]` array.

**Deprecated**

Scrollable panels expose their scroll position normalized between 0 and 1 with their value.

----

#### `setScroll(id, x, y)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `x`: horizontal scroll, `undefined` to use current value
- `y`: vertical scroll, `undefined` to use current value

Sets the scroll state of a container.

**Deprecated**

Scrollable panels expose their scroll position normalized between 0 and 1 with their value.

----

#### `toolbar(i1, i2, ...)`
- `iX`: menu entry index

Triggers toolbar action at specified index.

!!! example "Examples"

    - `toolbar(0, 0)` -> Open a new session
    - `toolbar(4)` -> Toggle full screen

    Actions will only be triggered if initiated with a user interaction. Fullscreen cannot be toggled with a simulated interaction (i.e. using `/SET`)

----

#### `openUrl(url)`
- `url`: http(s) url

*Built-in client only*: opens url with the system's default browser
*External client only*: opens url in a new tab

If the event that triggered the script's execution was not initiated by a user interaction, this function will have no effect.

----

#### `runAs(id, callback)`
- `id`: widget `id` as a string.
- `callback`: function to be executed

Run `callback` function as if executed by another that widget matches specified id. This will not change the value of any local variable but `"this"` and `"parent"` arguments (accepted by functions such as `set()`) will be interpreted differently. Timeouts and intervals will be created and cleared in the target widget's scope.

----

#### `reload(keepState)`
- `keepState` (optional): `true` by default, set to false to discard the client's state.

Reload the client application. Cannot be called from the `onCreate` property.

If the event that triggered the script's execution was not initiated by a user interaction, this function will have no effect.


----

#### `getNavigator()`

Returns the instance of [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator).

----

#### `browseFile(options, callback)`

Opens the file file browser and pass selected file to a callback function (does not create nor read files by itself).

- `options`: object with the following keys:
    - `extension`: allowed extension (default: "*")
    - `directory`: starting directory for browser (default: user's home)
    - `allowDir`: allow choosing a directory instead of a file (default: false)
    - `mode`: "save" or "open"

---

## Client & Remote Control

# Client Options

Client options can be set either with the server's `--client-options` option, or per client by adding query parameters to the server's url. One must prepend the url with a question mark (`?`) followed by `parameter=value` pairs separated with ampersands (`&`).


| Option | Value | Default | Description |
|----|----|----|----|
| hdpi | 1 / 0 | 0 | enable high resolution canvas |
| forceHdpi | number | 0 | force canvas scaling (ignore `hdpi`) |
| doubleTap | number | 375 | sets the double tap/click time threshold in milliseconds |
| zoom | number | 1 | sets the initial zoom |
| framerate | number | 60 | limit canvas drawing framerate |
| desyncCanvas | number | 0 | set to 1 to enable desynchronized canvas (may improve rendering performances) |
| lang | string | *system_default* | use a different language than the default if available (available languages: en, fr, de, pl) |
| consoleLength | number | 300 | sets the maximum number of log messages in the client's console |
| id | string | *random_id* | client's unique id (use with caution: two clients should never have the same id) |
| usePercents | 1 / 0 | 0 | sets the editor's "relative units" option  |
| noFocus | 1 / 0 | 0 | (built-in client only) prevent the client window from taking focus |
| clientSync | 1 / 0 | 1 | set to 0 to prevent the client from syncing with other clients |
| altTraversing | 1 / 0 | 0 | set to 1 to enable an alternative traversing behavior for toggle buttons (traversing gestures on toggle buttons will change their values in only one way depending on the first touched button's state) |
| virtualKeyboard | 1 / 0 | 0 | (desktop only) set to 1 to enable the virtual keyboard by default |
| notifications | 1 / 0 | 1 | set to 0 to hide notifications by default |

Example:

`http://server-ip:port?hdpi=1`

---

# Remote Control

# Remote control

When osc messages are received, the default behavior is to update the value of all widgets that match the address and preArgs. Additionally, Open Stage Control clients respond to some general osc commands.

!!! note "Multi-client setup"
    These commands are interpreted by each client connected to the server so there might be more than one reply. Using a custom module is the only way to send a message to a single client.


----

#### `/EDIT id properties options`


Apply a set of options to an existing widget by replacing the old ones with the new ones. This ignores the widget's `lock` property. If sent by a custom module using `receive()`, this command will not be prevented by the server's `read-only` option.

- `id`: `string`, widget's `id`
- `properties`: `string`, [JSON5](https://github.com/json5/json5) stringified object defining the new properties to merge
  - example: `{"label":"New Label", "color":"red"}`
- `options` (optional): `string`, [JSON5](https://github.com/json5/json5) stringified object defining extra option flags:
    - `noWarning`: set to `true` to prevent further warning when exiting.

----

#### `/EDIT/MERGE id properties options`

Apply a set of options to an existing widget by merging them to the widget's options.  

----

#### `/EDIT/UNDO`

Undo editing action


----

#### `/EDIT/REDO`

Redo editing action


----

#### `/EDIT/GET target id`

Sends back a widget's data (JSON stringified object), including its children, to specified target.

- `target`: `string`, `ip:port` pair
- `id`: `string`, widget's `id`

Replies `/EDIT/GET id data`

- `id`: `string`
- `data`: `string`


----

#### `/EDIT/GET target address preArg1 preArg2 ...`

Sends back a widget's data (JSON stringified object), including its children, to specified target.

- `target`: `string`, `ip:port` pair
- `address`: `string`, widget's `address`
- `preArg[1...]`: `*`, widget's `preArgs`

Replies `/EDIT/GET address preArg1 preArg2 ... data`

- `address`: `string`, widget's `address`
- `preArg[1...]`: `*`, widget's `preArgs`
- `data`: `string`



----

#### `/GET target id`

Sends back a widget's value to specified target.

- `target`: `string`, `ip:port` pair
- `id`: `string`, widget's `id`

Replies `/GET id value`

- `id`: `string`
- `value`: `*`


----

#### `/GET target address preArg1 preArg2 ...`

Sends back a widget's value to specified target.

- `target`: `string`, `ip:port` pair
- `address`: `string`, widget's `address`
- `preArg[1...]`: `*`, widget's `preArgs`

Replies `/GET address preArg1 preArg2 ... value`

- `address`: `string`, widget's `address`
- `preArg[1...]`: `*`, widget's `preArgs`
- `value`: `*`


----

#### `/GET/#`

Same as `/GET` but uses the widget's address instead of `/GET` to reply.

----

#### `/NOTIFY icon message`

Sends a notification message to the client.

- `icon`: icon for the notification, for example : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)
- `message`: message content


----

#### `/LOG message`

Print message in the client's console.

----

#### `/SET id value`

Set a widget's value as if it was interacted with from the interface. This is likely to make it send its value.

- `id`: `string`, widget's `id`
- `value`: `*`, widget's new value


----

#### `/SET address preArg1 preArg2 ... value`

Set a widget's value as if it was interacted with from the interface. This is likely to make it send its value.

- `address`: `string`, widget's `address`
- `preArg[1...]`: `*`, widget's `preArgs`
- `value`: `*`, widget's new value



----

#### `/STATE/GET target`

Sends back the app's state to specified target

- `target`: `string`, `ip:port` pair


----

#### `/STATE/SET state send`

Set widgets' state

- `state`: `string`, json stringified object (`"widget_id": value` pairs)
- `send` (optional): `boolean`, set to `false` to prevent widgets from sending their values when the state is applied



----

#### `/STATE/STORE`

Save the state of all widgets in the temporary slot.


----

#### `/STATE/RECALL`

Reload saved state from the temporary slot.


----

#### `/STATE/SEND`

Make all widgets send their current value.

----

#### `/STATE/OPEN path.state`

Open state file `path.state`.

----

#### `/STATE/SAVE path.state`

Save state session to `path.state`.

----

#### `/SESSION/CREATE`

Create a new empty session. Unsaved changes will be lost.

----
#### `/SESSION/OPEN path.json`

Open session file `path.json`.

----

#### `/SESSION/SAVE path.json`

Save current session to `path.json`. If `path.json` is omitted, current session's path is used.

----

#### `/TABS tab_id1 tab_id2 ...`

Open the tabs designated by the id parameters.

----

#### `/SCRIPT code`

Run code as if it where executed by a script widget.


----

#### `/RELOAD`

Reload page in the browser.

---

