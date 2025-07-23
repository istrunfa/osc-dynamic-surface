

---

## FILE: Home.md

The Control Surface Integrator (CSI) is a Reaper plugin that aims to let you integrate your hardware control surfaces into Reaper with a much higher level of control than is possible out of the box. If you're prepared to put in the effort to customize your configuration, you will be able to integrate one or more MIDI, MCU, or OSC, control surfaces into a single virtual surface.

This wiki serves as the official documentation for the [CSI project for Reaper](https://forum.cockos.com/showthread.php?t=183143).

This started out as a wiki project by Malcolm Groves, but [Funkybot](https://forum.cockos.com/member.php?u=5889) is now the major contributor, with a little help from [Geoff, the developer of CSI](https://forum.cockos.com/member.php?u=12770). 
 
If you find something out of date, either comment to let us know. Comments, corrections, additions are very welcome. 

CSI supports MIDI, MCU and OSC.

PC (64 bit) and Mac systems(Catalina or later, including Apple Silicon) are supported.


* [[CSI Overview]]
* [[Installation and Setup|Installation-and-Setup]]
  * [[Updating CSI|Installation-and-Setup#Installing CSI Updates]]
  * [[CSI.INI]]
* [[CSI Changelog]]
* [[Defining Control Surface Capabilities]]
  * [[Message Generators]]
  * [[Feedback Processors]]
  * [[Virtual Widgets]]
* [[Defining Control Surface Behavior]]
  * [[Pages]]
  * [[Zones]]
  * [[Send Zones]]
  * [[Receive Zones|Receive-Zones]]
  * [[FX Zone Activation Methods|FX-Zone-Activation-(FocusedFX,-TrackFXMenu,-SelectedTrackFXMenu,-SelectedTrackFX)]]
  * [[FX and Instrument Zones|FX-and-Instrument-Mapping]]
  * [[Stepped Parameters and Toggles|Stepped Parameters and Toggles]]
  * [[Action Reference]]
  * [[Modifiers]]
  * [[Invoking Multiple Actions (Macro Actions)]]
  * [[Broadcast and Receive|Broadcast-and-Receive]]
* [[Troubleshooting]]
* [[Tips and Tricks|Tips-and-Tricks]]
* Step By Step Guides
  * [[Setting Up Your Phone or Tablet as an OSC Device in CSI ]]
  * [[How To: Creating a Touch OSC Template, .ost File, and Zone for Use in CSI]]
* Examples
  * [Examples that come with the beta download](https://stash.reaper.fm/v/44740/CSI%20Support%20Files.zip)
  * [poetnprophet's Getting Started Video](https://youtu.be/T5IC-fuI0E8)
  * [poetnprophet's Workflow Video](https://www.youtube.com/watch?v=CRU6hBRXnUQ)  
  * [EpicSound's BCF 2000 Video](https://youtu.be/aFIC9A_MwY0)
  * [Navelpluisje's BCF 2000 config files](https://navelpluisje.github.io/reapinger-bcf2000/)
  * [UNdark's "CSI From Install to Understand" video](https://www.youtube.com/watch?v=mP75PTZuMPM)
  * [UNdark's FX video](https://www.youtube.com/watch?v=dOyxuHGOuS4)
  * [Another great UNdark FX video](https://www.youtube.com/watch?v=7Rt-iAnuP9o)
  * [UNdark's latest install and configure video](https://www.youtube.com/watch?v=mP75PTZuMPM)
  * [My configuration](https://github.com/malcolmgroves/reaper_csi)
  * [Some config files courtesy siniarch](https://siniarch.wixsite.com/csiconfigfiles)
  * [Recent Doc Changes](https://github.com/GeoffAWaddington/CSIWiki/wiki/_history)


---

## FILE: CSI-Overview.md

The Control Surface Integrator (CSI) is a Reaper plugin that aims to let you integrate your hardware control surfaces into Reaper with a much higher level of control than is possible out of the box. If you're prepared to put in the effort to customize your configuration, you will be able to integrate one or more MIDI, MCU, or OSC, control surfaces into a single virtual surface.

Note: CSI requires access to the MIDI Devices and needs them disabled in Reaper's Preferences>Audio>MIDI Devices. For this reason, CSI may not be ideal for use with MIDI Controller Keyboards that will require notes to be passed along to Reaper in addition to the control functions. However, users have successfully implemented work arounds by using BOME MIDI Translator to split out note versus control data and creating a virtual MIDI port for use with CSI and the control data.

## Benefits of CSI

* Works with any MIDI, MCU or OSC device
* Allows multiple surfaces to work as an integrated system
* Control Reaper and plugins
* Support files include starting points for many common surfaces and example FX mappings
* Highly customizable (text-based surface files have a relatively small learning curve)
* Includes color support on X-Touch, FaderPort8/16, MIDI Fighter Twister, and OSC surfaces
* Can create custom encoder response curves
* Mac and PC support (no Linux)
* Open-source project (contributions accepted)

## High-level Concepts

### Pages
Within CSI you can define one or more [[Pages|Pages]], with each Page containing the configuration information for whatever Surfaces and Actions you want CSI to recognise. Only one Page can be active in Reaper at any time, but you can switch between [[Pages|Pages#paging-actions]] easily. So for example, you might have a Recording Page and a Mixing Page, with the physical elements on your Surfaces (eg. buttons, faders, etc) mapped to different actions in each. You can have surfaces included, left out, or even defined completely differently on each different Page.

### Surfaces
Each Surface within your Page is represented by 2 major pieces:

* The Surface Template file: [[mst/ost file|Defining Control Surface Capabilities]]
  * The MIDI Surface Template (.mst) and OSC Surface Template (.ost) files define the control surface capabilities
  * Each control (a.k.a. [[Message Generators]]) and/or Display on the surface is represented as a "Widget"
  * Each Widget defines what messages CSI expects to receive from the surface and
  * [[Feedback Processors]] in the Widget tell CSI which messages to send to the surface
* [[Zone files|Defining Control Surface Behavior]]
  * Dictate how the Control Surface is expected to map to Reaper elements and/or FX/Instrument plugins
  * [[Controlling Reaper|Zones]] - how the Surface elements defined in the mst/ost file are mapped to Actions
  * [[Controlling Plugins|FX-and-Instrument-Mapping]] - how the Surface elements defined in the mst/ost file will map to parameters in your VST plugins



---

## FILE: Installation-and-Setup.md

## Minimum System Requirements
CSI version 2.0 requires Reaper version 6.28 or later. **Troubleshooting note:** thie minimum Reaper version for CSI is subject to change and could be impacted by changes in Reaper builds, as well as operating system updates, and/or CSI changes. If you're following the installation instructions below to the letter but still not seeing CSI in the Control/OSC/Web "Add surface" dropdown, then a good first troubleshooting step would be to upgrade to the latest version of Reaper if you haven't already and try again.

**Windows:** 64-bit version of Windows. Additionally, the Microsoft Visual C++ 2019 runtime is required. You may already have this installed on your system, but if you successfully install CSI and do not see the CSI option in Reaper's control surface preferences you will need to [download and install the 64bit version of the C++ runtime.](https://aka.ms/vs/16/release/VC_redist.x64.exe)

**Mac:** The minimum version of MacOS supported is 10.15 (Catalina). Apple Silicon is natively supported.

Linux is not supported, though CSI is open source and someone with the know-how would be welcome to attempt a Linux port. 

## Download CSI
You can find the most recent version of CSI here: https://stash.reaper.fm/v/44868/CSI%20v2_0.zip

Surface files can be found here (the number of surfaces will be updated over time): https://stash.reaper.fm/v/44740/CSI%20Support%20Files.zip

## CSI Installation
1. Find the Reaper resource path by running the Reaper Action: Show REAPER resource path in finder (or Windows equivalent). This is important as the folder may be different between different installs, Portable installs, etc.
2. Close Reaper.
3. Open the CSI zip file you downloaded.
4. **Windows:** Put the reaper_csurf_integrator64.dll in the folder named UserPlugins in the Reaper resource path. **Mac:** put the .dylib file in the same UserPlugins folder.
5. If a first time setup, [[install the CSI support files|Installation-and-Setup#Installing-CSI-Support-Files]] then start Reaper. 
6. **Mac only:** you will likely receive a warning that the CSI .dylib cannot be scanned. Once Reaper launches, open Settings -> Security & Privacy and allow the CSI .dylib to run. Then restart Reaper. You may get a second message, this time, select "Open". After that, you should receive no additional warnings about CSI until you update and need to repeat this process.

## Installing CSI Support Files
The first time you install CSI, you will need to additionally add a CSI folder to your Reaper Resource path, along with Surface and Zone subfolders. Surface and Zone folders will be provided for some common control surfaces to help get you up and running quickly.

1. In File Explorer (Windows) or Finder (Mac) open your Reaper Resource Path
2. Open the CSI Support zip file you [[downloaded| https://stash.reaper.fm/v/44740/CSI%20Support%20Files.zip]]
3. Copy over the CSI folder from the .zip file directly into your Reaper Resource path. The file structure should look like the one shown in the image below. 
![CSI Folder Structure](https://i.imgur.com/4lyVisr.png)

## Setting up your CSI devices for the first time
Now that you have successfully installed CSI and the Support Files, the next step is to setup your devices for the first time.

1. In Reaper, go to Options>Preferences (or just Ctrl+P) (a new window will appear).
2. Go to **Preferences>Audio>MIDI Devices** and make sure any MIDI-based control surfaces you plan on using in CSI show their "Mode" as "disabled" in both the Inputs and Outputs section. CSI needs access to these MIDI ports to function properly. Stay on the Preferences screen. **Skipping this step is probably the #1 cause of CSI first-time setup errors.**
3. Next, go to **Preferences>Control/OSC/web**. **Note:** while on this screen, it is recommended to uncheck the box next to "Close control surface devices when stopped and not active application" as this will disconnect CSI when Reaper is not the focused application (unless that's what you want).
4. Now, while still on the Control/OSC/Web preferences window, click on "Add" (a new window will open).
5. Click on the empty dropdown beside "control surface mode" and select "Control Surface Integrator" - this will now show the settings for CSI. **Note:** you should never have more than one instance of CSI configured simultaneously.
6. There is a default Page ("HomePage") already defined to get you started. If you do not see one, click "Add" under the Pages section and create a page called "HomePage".
7. Under the "Surfaces" section on the left, click "Add MIDI" or "Add OSC" depending on what type of Surface you are trying to add.
8. **If adding a MIDI surface**, enter a name for your surface, and select the MIDI In and Out ports that correspond to your device. 
9. **If adding an OSC surface**, enter a name for your surface. In the "Remote Device IP Address" field, add the IP address of the device (phone, tablet, PC) running the OSC host software. Next, enter the "CSI receives on port" number (this corresponds to the send port number in your OSC host application). Finally, enter the "CSI sends to port" number (this corresponds to the receive port number in your OSC host application).
10. Click ok to save the device and repeat as needed for additional devices.
11. In the "Pages" section of the CSI Setup screen, click on "HomePage". For additional information, see [[Pages]].
12. Now, on the "Assignments" section on the right, click "Add" to begin adding the Control Surfaces you just setup to the "HomePage"
13. First, you will select the device name from the dropdown
14. Enter the number of channels on your surface (Example: X-Touch/MCU devices have 8 channels)
15. Enter the Channel Start Position (this is 0 by default, but if you're using multiple surfaces, you would use this to offset the start position on the second surface)
16. Select the Surface (.mst) file that corresponds to your surface*
17. Select the Zone folder that corresponds to your surface*

*In CSI, each [[Page|Pages]] can utilize different .mst files and zone folders. This why you first create the Surfaces, then select the Page, then assign the Surface to each Page and define their behavior on each page.

![CSI Preferences Screen Print](https://i.imgur.com/3gqL16s.png)

**Tip:** The information you entered while setting up CSI for the first time gets stored in [[CSI.ini|CSI.INI]] in your CSI folder. Once you're comfortable, it's sometimes easier to edit this information directly in this file. 

## Installing CSI Updates
When a new version of CSI is released, updating CSI involves no more than downloading the latest version and copying over the .dll or dylib to the appropriate UserPlugins folder with Reaper closed, then launching Reaper. Major version updates may introduce new syntax or change existing syntax. When this occurs, this Wiki will be updated to reflect the latest additions or changes.

If you plan on updating any surface or support files, do **NOT** overwrite your current CSI.ini with the one in the .zip folder. By the same token, do not overwrite any .zon files or zone folders you may have customized unless you are intentionally going back to a stock setup - you will lose any customizations you made.

---

## FILE: CSI.ini.md

## CSI.ini Breakdown
As mentioned on the [[Installation|Installation and Setup]] page, the configuration of your CSI installation is ultimately stored in a file called csi.ini. This normally gets created when you setup CSI for the first time and shouldn't require direct user editing, however, if you want to understand how the csi.ini works, or need to troubleshoot, read on!

Here is what a typical CSI.ini might look like:
```
Version 2.0

MidiSurface "X-Touch" 12 11 
OSCSurface "iPad Pro" 8000 9000 10.0.0.146 

Page "HomePage" 
"X-Touch" 8 0 "X-Touch.mst" "X-Touch"
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterMenu"
```

The CSI version number is included in the first row. If missing, CSI will throw up an error when Reaper starts.

Next, you see...
```
MidiSurface "X-Touch" 12 11 
```

This tells CSI that the user has configured a MIDI surface, named this device "X-Touch", and that device uses MIDI port 12 for incoming messages and MIDI port 11 for outbound messages.

There's also an OSC device in this setup.
```
OSCSurface "iPad Pro" 8000 9000 10.0.0.146 
```

This is telling CSI that there is an OSC surface that the user has named "iPad Pro", and that receives on port 8000, transmits to port 9000, and that iPad Pro has an IP Address of 10.0.0.146.

Next, each [[Page|Pages]] in CSI is defined, with the surfaces, .mst file, and zone folder that will be used for each page.
```
Page "HomePage" 
"X-Touch" 8 0 "X-Touch.mst" "X-Touch"
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterMenu"
```

```
Page "HomePage"
```
...is the name of the page.

```
"X-Touch" 8 0 "X-Touch.mst" "X-Touch"
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterMenu"
```

This says the X-Touch surface gets included in the HomePage, has 8 channels, a channel offset of 0, and uses the X-Touch.mst and "X-Touch" zone folder. The iPad Pro definition follows the same format.

If you had multiple pages defined, they would follow this same format as shown here...
```
Version 2.0

MidiSurface "XTouchOne" 7 9
MidiSurface "MFTwister" 6 8 
OSCSurface "iPad Pro" 8003 9003 10.0.0.146 

Page "HomePage" 
"XTouchOne" 1 0 "X-Touch_One.mst" "X-Touch_One_SelectedTrack"
"MFTwister" 8 0 "MIDIFighterTwisterEncoder.mst" "FXTwisterMenu"
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterMenu"

Page "FocusedFXPage" 
"XTouchOne" 1 0 "X-Touch_One.mst" "X-Touch_One_SelectedTrack"
"MFTwister" 8 0 "MIDIFighterTwisterEncoder.mst" "FXTwisterFocusedFX"
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterFocusedFX"
```

## Page and Surface Configuration Options
There are some additional options one can add in the csi.ini to modify functionality of CSI on a per-[[Page|Pages]] level. These are entirely optional, and in no means required but exist solely to override the default behavior. These are:

* **FollowTCP** - By default CSI follows the track visibility of Reaper's MCP view. Use Follow TCP to override the default functionality.
* **UseScrollLink** - This turns on scroll linking between the surface and Reaper (Reaper follows CSI). The default is off.
* **NoSynchPages** - With this disabled, each page will have independent banking. The default is on.
* **LocalModifiers** - When using LocalModifiers, modifiers engaged on a given are local to that surface only. The default is that modifier behavior will be global and impact all surfaces. 

From a syntax perspective, Page options belong immediately following the Page name for any Pages where you are looking to override the default behavior. The syntax for LocalModifiers places this text before the surface name in the csi.ini under each Page.

```
Version 2.0

MidiSurface "XTouchOne" 7 9
MidiSurface "MFTwister" 6 8 
OSCSurface "iPad Pro" 8003 9003 10.0.0.146 

Page "HomePage" FollowTCP UseScrollLink NoSynchPages
LocalModifiers "XTouchOne" 1 0 "X-Touch_One.mst" "X-Touch_One_SelectedTrack"
"MFTwister" 8 0 "MIDIFighterTwisterEncoder.mst" "FXTwisterMenu"
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterMenu"
```

---

## FILE: Setting-Up-Your-Phone-or-Tablet-as-an-OSC-Device-in-CSI.md

# Setting Up Your Phone or Tablet as an OSC Device in CSI
CSI is compatible with MIDI, EuCon, and Open Sound Control (OSC) devices. OSC allows you to use a phone or tablet to interact with your CSI setup; essentially acting like another control surface. 

There are OSC compatible applications that you can download on your phone or tablet, and you can create OSC templates that can be programed to interact with CSI like any other program. This guide will focus on setting up the included Mackie C4 emulator OSC template using TouchOSC on an iPad.
The exact instructions may vary from device to device, or depending on the OSC application you're using, but the high-level concepts should be similar regardless of device or application.

## Pre-Condition: 
1.	You’ve already setup CSI according to the Installation Instructions (including the OSC related folders and files)
2.	Your phone or tablet must be on the same network as your PC or Mac

## Step 1: Download TouchOSC On Your Phone or Tablet
First things first, go to the Android or iOS app store and download TouchOSC to the device you’d like to use.

## Step 2: Download and Install the TouchOSC Editor To Your PC or Mac
The TouchOSC Editor can be found here: https://hexler.net/products/touchosc#downloads

## Step 3: Transfer the C4Emu TouchOSC Template to Your Phone or Tablet
CSI comes with some TouchOSC templates, so we’re going to open the C4Emu template in TouchOSC editor, then add it to TouchOSC on our phone or tablet.
1.	Open TouchOSC Editor
2.	Click File -> Open
3.	Navigate to the Reaper resource path folder where you installed CSI
4.	Open the CSI\Touch OSC Layouts\ folder
5.	Locate and open the C4Emu.touchosc file – the file will open
6.	Click the “Sync” button in TouchOSC Editor
7.	Open TouchOSC on your phone or tablet
8.	Under where it says Layout click the current layout name. This will open the Layout selection screen. Note: If you’re already in a layout, click in the dot in the top-right-hand corner to go back. 
9.	In the Layout selection screen, the top row says “Add” click this
10.	Under “Found Hosts” your PC name should appear – click the PC name

You should now have successfully loaded the C4Emu.touchosc template to your device.

## Step 3 : Let’s Find Out Our Computer Host/Local IP Address
The first thing we should do is find out what our Host Computer’s IP address (if you don’t already know). Lucky for us, Reaper can just tell us. So…

1.	Open Reaper’s Preferences -> Control/OSC/WEB
2.	Click Add
3.	Select OSC (Open Sound Control)
4.	In the Mode dropdown select “Configure device IP+local port)
5.	See where it says “Local IP:” followed by a number? Example: 192.1.0.124 That’s your Local IP address. Make note of this.
6.	Click CANCEL – we don’t actually want to create the OSC device in here, we just wanted to know what our IP address was.

## Step 4: Open the TouchOSC App on Your Phone or Tablet and Enter Your IP Address
Here we are going to take the Local IP address from the prior screen, and enter it as the Host IP address in TouchOSC. We’re also going to make note of some device IP details for use later in Reaper/CSI.

1.	Open TouchOSC
2.	Where it says “Connections” select the first row “OSC”
3.	Make sure OSC is enabled
4.	Where it says “Host” enter your Local IP Address from the prior step
5.	Now make note of your “Port Outgoing” (usually 8000)
6.	Make note of your “Port Incoming” (usually 9000)
7.	Make note of the “Local IP Address” (example: 192.1.0.193) – this is the IP address of your phone or tablet
8.	We’ll need these to setup CSI

## Step 5: Create the OSC Device in CSI

1.	Open Reaper’s Preferences -> Control/OSC/WEB
2.	Click on Control Surface Integrator from the list (if it’s not already there, install CSI according to the Installation instructions).
3.	Click Edit – the Control Surface Settings screen should open
4.	On the Pages section on the left, click Home (or whatever page you want to add the OSC device on)
5.	Click the “Add OSC” button
6.	Name your device, example: iPad C4
7.	Enter 8 channels, 8 sends, and 8 FX menus – this will give some flexibility later
8.	Where it says “Remote device IP” this is the IP address of your Phone or Tablet from Step 4.7 above
9.	"CSI Receives On Port" will be the Outgoing Port from Step 4.5 above (8000)
10.	"CSI Sends on Port" will be the Incoming Port from Step 4.6 above (9000)
11.	Where it says surface select MackieC4Emu.ost
12.	Where it says zone select C4Emu
13.	Hit ok to save and apply all changes
14.	Close and restart Reaper. For whatever reason, at least here, OSC changes require a full restart of Reaper.

If everything went according to plan, you’ve just mapped your phone or tablet to act as a control surface in Reaper+CSI.

## Ok, Now what?
All we’ve done so far is connected your phone or tablet to Reaper+CSI. You still have to create .zon files for any FX or Reaper actions you’d like to control. See the rest of the Wiki for guidance on how to go about that.


---

## FILE: Troubleshooting.md

Here are some steps in Troubleshooting common CSI problems.

## CSI Doesn't Appear in the Dropdown in Reaper's Preferences -> Control/OSC/Web
If you're not seeing CSI in the dropdown when you go to add a surface in Reaper...

1. Make sure the .dll or .dylib is installed in your Reaper resource path's "UserPlugins" folder
2. Are you running an older Reaper build? Try updating to the latest version.
3. Mac Users: the minimum version of MacOS supported is 10.15 (Catalina). Apple Silicon is natively supported.
4. Windows Users: the Microsoft Visual C++ 2019 runtime is required. You may already have this installed on your system, but if you successfully install CSI and do not see the CSI option in Reaper's control surface preferences you will need to [download and install the 64bit version of the C++ runtime.](https://aka.ms/vs/16/release/VC_redist.x64.exe)

If none of these apply to your situation and you're still having trouble, please post in the [the main CSI thread](https://forum.cockos.com/showthread.php?t=183143) in the Reaper Control Surface's sub-forum.

## I can't find surface files for my MIDI device
First, check the CSI Support Files to check if your device is one of the included files. The CSI support files can be found [here.](https://stash.reaper.fm/v/44740/CSI%20Support%20Files.zip)

If your device is not included, does it support MCU? If yes, the MCU or X-Touch support files may work and could be considered good starting points.

If your device is not included in that list, you have two options: 1) post in the [CSI Device Setup thread](https://forum.cockos.com/showthread.php?t=245280) in the Reaper forums and ask if anyone else with the surface has files they can share or 2) read the [[Message Generators]] and [[Feedback Processors]] pages and create your own .mst file for your surface. It's a one-time job. Once you've mapped all the controls on your surface, read the [[Zones]] page for information on how to map those controls. Post in the [CSI Device Setup thread](https://forum.cockos.com/showthread.php?t=245280) if you need additional help.

## My device is setup in CSI but is still not being recognized
This is a big topic with a lot of possible solutions, but the first thing to check is to make sure that CSI and your control surface are talking to each other. To do that...

1. Open Reaper
2. Run the action "CSI Toggle Show Input from Surfaces" AND...
3. Run the action "CSI Toggle Show Raw Input from Surfaces"
4. Move some knobs on your control surface and/or press some buttons.

Expected Result: 

a. You should see a Reaconsole window open up as soon as you move something on the control surface. If Reaconsole doesn't open, that points to a problem with CSI's ability to receive input from the hardware. First, **make sure your device is DISABLED in Reaper's Preferences -> Audio -> MIDI Devices**. That may sound counter-intuitive but CSI needs to be able to access your MIDI ports and if Reaper is using them, CSI cannot access them. Also, make sure some other program isn't already using the ports and they're available. 

b. If you _do_ see the Reaconsole window, you're hoping to see something like this...
```
IN <- MFTwister RotaryA1 -0.001000
IN <- MFTwister b0  00  3f 
```

...the first line is showing that the .mst works because you can see the widget name. The second line is showing the raw input from surface. If you're only seeing the second line and not the first, then that points to a problem in the .mst file or the surface itself. Things to check: does the surface have different modes? Maybe you're in the wrong one for the .mst.

Worst case, you may have to create/edit the .mst file. If all I saw was this...
```
IN <- MFTwister b0  00  3f 
```

...I'd have have to go into the .mst file and create a widget from that like this (see [[Message Generators]] for more details)...
```
Widget RotaryA1 RotaryWidgetClass
    Encoder b0 00 7f
    FB_Fader7Bit b0 00 00
WidgetEnd
```

If that all seems in order: 1) make sure your .zon files are up to date, and 2) make sure your csi.ini is up to date (you can always delete your CSI.ini and create a new one from scratch). If you're still having trouble, post in the [CSI Device Setup thread](https://forum.cockos.com/showthread.php?t=245280) for additional help. 

## Some of the new CSI features are not working
If you see something in the CSI Changelog page here but it's not working on your system, the first thing to be sure of is: does that feature exist in a "production build" of CSI or does it exist in the Exp (Experimental) builds? The Exp builds contain all of the latest features but should be considered betas. 

The Exp builds can be found [here](https://stash.reaper.fm/v/42044/CSI%20Exp.zip).

If you are running an Exp build, and a brand-new feature still isn't working as expected, please post in the main CSI thread in the Reaper Control Surface's sub-forum. You may have found a bug.

## I'm Seeing Strange Behavior With Button Lights on My Surface
If you're seeing strange behavior with button lights, like blinking lights, or lights remaining on when you don't expect them to, but you've confirmed everything else looks good, then see the [[Widget Modes]] page for information on how to turn Feedback off for a particular action or actions.  

## Other Troubleshooting Tips
Some additional troubleshooting tips...

* **Simplify:** if you have a problem where a feature in a .zon is not working as expected, try eliminating everything else, and see if the feature or .zon file works by itself. If yes, then start slowly adding things back until it stops working. That should help narrow down where the problem is. 

* **Start from scratch with a portable install.** Reaper has a "Portable Installation" option that allows you to install Reaper into another folder. You can try setting up CSI from scratch with a portable install to see if that solves your problem. If yes, the issue could be in your User Plugins folder, or with some Reaper setting.

* **Check for old .zon files or .dll's - clear them out!** Maybe you've got an old version of CSI in your User Plugins folder called "reaper_csurf_integrator64.dll.bak" causing a conflict that Reaper is still picking up. Or a "buttons.zon.old" file. Clear that stuff out! When it comes to .zon files, CSI scans all .zon files within your Zone folder on launch. 

* **Maybe it's just me?** If a particular feature or something isn't working for you, but you know it's working on other people's setups, then trust that as long as you meet the minimum system requirements, it's not you. There's something amiss somewhere in your CSI setup. Check for multiple versions of zon files, confirm you've got the correct installation paths, make sure you are using the correct version of the .mst, proper .zon syntax, ensure you don't have old versions of CSI or unused .zon files littered about. If you still need help, post in the [CSI Device Setup thread](https://forum.cockos.com/showthread.php?t=245280). It may all look right on the surface, but chances are there's some small quirk out there that's causing issues. It may just take some help and persistence to find the cause. Could be a bug too :) ! 

## Something I saw on this wiki isn't accurate or isn't working
If you've ruled everything else out and something still isn't working, post in [the main CSI thread](https://forum.cockos.com/showthread.php?t=183143) to report the issue. It could be as simple as the wiki not being up to date or it could be a bug. 


---

## FILE: Defining-Control-Surface-Capabilities.md

If we want to use one or more Control Surfaces with CSI, we need to define what capabilities they have. ie. what controls they have (eg. buttons, faders, encoders, etc), what  feedback mechanisms they have (displays, lights, etc), etc. 

.mst files are for midi devices and are used in the following examples -- similarly, .ost files are for OSC devices -- see the CSI/Surfaces/OSC folder for OSC examples.

Note, this is nothing yet to do with what should happen when those buttons, etc are clicked, we're just defining the capabilities. 


We define these capabilities in a file with a .mst extension. Beyond the .mst extension, the rest of the filename is up to you, but it makes sense for it to reflect the model of controller. So for a BCF2000 control surface, I'd have a BCF2000.mst file, for a Launchpad Mini, I'd probably have a LaunchpadMini.mst. 

Here's a snippet from one of my .mst files:

```     
Widget Rotary8
	Fader7Bit b0 20 7f
	FB_Fader7Bit b0 20 00
        Toggle 90 1f 7f
WidgetEnd

Widget RotaryPush8 
    Press 90 1f 7f
WidgetEnd

Widget UpperButton1 
    Press 90 20 7f
    FB_TwoState 90 20 7f  90 20 00
WidgetEnd 

Widget Fader1 
    Fader14Bit e0 7f 7f
    FB_Fader14Bit e0 7f 7f
    Touch 90 68 7f 90 68 00
WidgetEnd   
```    

A few things to note:
* We're defining named Widgets. A Widget very often maps to a single physical control on a Surface, however it's important to realise it doesn't have to. For example a Widget may be a combination of a button and separate LED.
* Within each Widget, we define the capabilities of that widget. These could be one or more of either:
  * [[Message Generators]] - things that will result in a message being sent to CSI. eg. Press, Fader14Bit, etc
  * [[Feedback Processors]] - things that will receive a message back from CSI to display feedback on the surface. eg. FB_TwoState, FB_Fader14Bit, etc where the FB represents FeedBack. 
* Each of the Message Generators and Feedback Processors may have a varying number of parameters that follow them that define the MIDI Message details sent/received and other behavior. Look at the specific [[Message Generators]]/[[Feedback Processors]] you are using to see what parameters it supports. 

So for example, my UpperButton1 Widget is defined as:
```
Widget UpperButton1 
    Press 90 20 7f
    FB_TwoState 90 20 7f  90 20 00
WidgetEnd 
```
Which says this Widget is a combination of a:
* Press MIDI Generator, which means when pressed it will send the MIDI Message 90 20 7f 
* and a FB_TwoState Feedback Processor, which will:
  * receive a MIDI Message of either 90 20 7f or 90 20 00 and display that to the user. In my case, this is displayed as an LED, where 90 20 7f represents the On state and 90 20 00 represents the Off state. 

Whereas my RotaryPush8 widget is much simpler, using a Press Message Generator that sends only the MIDI Message 90 20 7f when it is pressed. Nothing on release, and no feedback.  
```
Widget RotaryPush8 
    Press 90 1f 7f
WidgetEnd
```


## Note:
* Because the .mst file doesn't specify anything about behavior, just surface capabilities, in theory anyone with the same model surface should be able to reuse the same .mst file, even if they want to assign different behaviors to those controls. eg. If I have a BCF2000, and so do you, in theory we can use the same .mst file. However, be careful here as if you have changed the configuration of your surface, it may be sending different midi messages, in which case someone else's .mst file may not work for you. 
* It's easy to forget that you're not controlling what the surface does in your MST. It is more accurate to say you are reflecting what it does. For example, if my surface isn't currently sending a message on button release, then defining it as a [[Press]] control  with a Release message in your .mst won't magically make it start. Either edit the surface (if possible) to make it do that, or define it in the .mst as a [[Press]] with a single message.

---

## FILE: Defining-Control-Surface-Behavior.md

We define what behavior should occur when particular widgets are pressed/turned/moved/etc in .zon files. 

If you remember in our [[CSI.INI]] file, for each surface we listed a number of things:

`MidiSurface AlphaTrack 8 8 AlphaTrack.mst AlphaTrack 1 0 0 0 `

In this example, the AlphaTrack.mst was where we defined what widgets were on the surface. 

The next item to the right, in this case 'AlphaTrack' is the name of a Zones folder. Inside this folder, we should create whatever .zon files we want that relate to the widgets on this surface. We can also use subfolders, and subfolders of subfolders and so on, in order to organize our .zon files.

CSI will read in all the .zon files it finds in this folder, including all subfolders, so don't store backups/unused here, they WILL get pulled in. 

Note: CSI expects ONE ZONE ONLY PER FILE. 

Inside each .zon file we create a Zone to map the widgets on this surface to the actions we want to trigger. As you'll see on [[that page|Zones]], we can also switch between currently active zones, compose zones out of other zones, etc. 

## Types of Zones

At this stage there are primarily two types of Zones that we can define:
* [[Zones that control general Reaper functionality|Zones]]. eg. the Tracks in our project, the Transport controls, our Track Sends, etc
* [[Zones that control VST instruments/FX inside Reaper|FX-and-Instrument-Mapping]]. eg. How to map the parameters of your EQ, Reverb, etc on the selected track across your surfaces.

They are both defined as Zones in .zon files, but there are some additional details for [[FX Zones that are worth discussing|FX-and-Instrument-Mapping]]. 

---

## FILE: Modifiers.md

Modifiers are a way to indicate that you want one control to perform different actions under different circumstances. For example, this could be when another button is pressed in combination with the control (like your keyboard behaving differently when you hold the Shift key down), or it could be when a button is held down for a longer period of time. 

The full list of available modifiers is:
* [[Shift|Modifiers#global-modifiers]]
* [[Option|Modifiers#global-modifiers]]
* [[Control|Modifiers#global-modifiers]]
* [[Alt|Modifiers#global-modifiers]]
* [[Touch|Modifiers#Touch]]
* [[InvertFB|Modifiers#InvertFB]]
* [[Hold|Modifiers#Hold]]
* [[Flip|Modifiers#Flip]]
* [[Marker|Modifiers#Marker]]
* [[Nudge|Modifiers#Nudge]]
* [[Scrub|Modifiers#Scrub]]
* [[Zoom|Modifiers#Zoom]]
* [[Toggle|Other Actions#togglechannel]]
* [[Increase|Modifiers#Increase-Decrease]]
* [[Decrease|Modifiers#Increase-Decrease]]

## Global Modifiers

To avoid creating dependencies between zone files (where a control specified in one is referenced in another), there are a set of global modifiers available:
 
* Shift
* Option
* Control
* Alt

In your .mst file you can name one or more controls on your surface with whichever of these you wish to use:

````     
Widget Shift
	Press 90 46 7f 90 46 00
WidgetEnd

Widget Option
	Press 90 47 7f 90 47 00
WidgetEnd

Widget Control
	Press 90 48 7f 90 48 00
WidgetEnd

Widget Alt
	Press 90 49 7f 90 49 00
WidgetEnd  
````     

Now you can use them like this in any of your zone files, but for consistency, we should all put our modifiers in the "Buttons|" Zone, which is typically included in the "Home" Zone:

````   
Zone "Buttons|"
 	Shift Shift
        Option Option
        Control Control
        Alt Alt

 	Save Reaper 40026
	Shift+Save Reaper 40022

	Undo Reaper 40029
	Shift+Undo Reaper 40030
ZoneEnd
````    

Additionally, any widget can be defined to act as a modifier...

````   
Zone "Buttons|"
 	Zoom            Shift
	Rewind 		Rewind
	Shift+Rewind	Reaper 40042	//go to start of project
ZoneEnd
````   

...In the above example, the Zoom widget was defined within the zone to act as the Shift modifier. That Shift modifier can then be combined with other widgets like the Rewind button to trigger additional actions. In this case, pressing Zoom+Rewind will return to the start of the project.

Modifiers are global to a page, and as long as they are defined in a zone somewhere in that page, they can be used anywhere.

## Local Modifiers
You can configure any Global Modifiers to impact only the local surface by setting up "Local Modifiers" in your CSI.ini. See [[Page and Surface Configuration Options|CSI.ini#page-and-surface-configuration-options]] for instructions.

## Latching Modifiers
If your surface sends release messages on button press, then you can do a quick press and release to "latch" a modifier. Example: let's say you want to use a few actions that require a Shift modifier. Quickly pressing and releasing the Shift button will engage the latch mode, which is the same as continuing to hold down the Shift button. A quick press and release turns the latching off.

## Chaining Multiple Modifiers
You're not limited to one modifier like Shift or Control or Alt. You can combine them to add additional capabilities to your surface. Here are some examples of what that might look like...

```
Shift+Control+Button
Control+Alt+Button
Shift+Control+Alt+Button
Shift+Control+Alt+Option+Button
```

## Modifiers Work on Displays Too!
Did you know that you can use modifiers on your displays? Here is an example where the lower displays show the track volume, until you hold down Shift, when the TrackPans are displayed. 

```
     DisplayLower|                      TrackVolumeDisplay
     Shift+DisplayLower|                MCUTrackPanDisplay
```

# Built-in Modifiers

## Touch
Touch messages can be used to tell CSI "when I'm touching this parameter, do this other thing." But Touch is a special kind of modifier in that a few things need to exist for it to work. 

First, you need a control surface that's capable of sending Touch and Touch Release messages for a given control. Examples: fader touch messages on an MCU device, rotary touch messages on a Eucon surface, or an OSC parameter set to work with touch messages. If you have a surface that supports touch message for certain controls, you need to define the touch messages in your .mst/.ost files. Here is an example using an MCU's fader1.

```
Widget Fader1
	Fader14Bit e0 7f 7f
	FB_Fader14Bit e0 7f 7f
	Touch 90 68 7f 90 68 00
WidgetEnd
```

Next, you will need to actually create the touch modifier in your .zon file. 

```
Touch+DisplayLower1
```

Which in the context of a SelectedTrackNavigator could allow us to do something like this where the track pan display always appears on the lower display, unless you're actually touching the fader, at which point, the track volume display will appear in the lower display.

```
Zone "SelectedChannel"
     SelectedTrackNavigator
     DisplayUpper1                      TrackNameDisplay
     DisplayLower1                      TrackPanDisplay
     Touch+DisplayLower1                TrackVolumeDisplay
     Fader1                             TrackVolume
ZoneEnd
```

Touch modifiers also work in a TrackNavigator context if you want all channels in the .zon to respond similarly. Here's the same zone as above with a TrackNavigator. 

```
Zone "Channel"
     TrackNavigator
     DisplayUpper|                      TrackNameDisplay
     DisplayLower|                      TrackPanDisplay
     Touch+DisplayLower|                TrackVolumeDisplay
     Fader|                             TrackVolume
ZoneEnd
```

Similarly, Touch can be used in other .zon files/types, including fx.zon's!

## InvertFB 
Up is down, down is up, on is off, and off is on. Example: Reaper EQ FX bypass On means control surface EQ Active light should be Off.

```` 
InvertFB+SomeButton FXParam 16 "Bypass"
```` 

## Hold
A one-second hold of a button will result in a different action. For instance, pressing the "Click" button toggles the metronome, but holding the Click button opens the metronome settings. **Important:** for the Hold modifier to work, your button/widget must transmit release messages (otherwise, CSI will not be able to decipher between a hold and a button press). 

```` 
Click				Reaper 40364 		//Toggle metronome
Hold+Click			Reaper 40363		//Show metronome settings
````    

## Flip
The Flip modifier was designed for MCU-style surfaces with a "Flip" button that is meant to put TrackPan on faders for easier pan adjustment. See the example below for most common use-case.
```
Zone "Track"
    Rotary|                     MCUTrackPan
    Fader|                   	TrackVolume 
    Flip+Fader|                	TrackPan 
```

## Marker
The Marker modifier was designed for MCU-style surfaces with a "Marker" button, allowing you to combine that button to create a range of marker-related actions similar to the examples below. 
```
    Marker+Up                   Reaper 40613       // Delete marker near cursor                         
    Marker+Down                 Reaper 40157       // Insert marker at current or edit position                  
    Marker+Right                Reaper 40173       // Go to next marker or project end                      
    Marker+Left                 Reaper 40172       // Go to previous marker or project start
```

## Nudge
The Nudge modifier was designed for MCU-style surfaces with a "Nudge" button, allowing you to combine that button to create a range of nudge-related actions similar to the examples below. 
```
    Nudge+Up                    Reaper 41925     // Item: Nudge items volume +1dB
    Nudge+Down                  Reaper 41924     // Item: Nudge items volume -1dB
    Nudge+Left                  Reaper 41279     // Item edit: Nudge left by saved nudge dialog settings 1
    Nudge+Right                 Reaper 41275     // Item edit: Nudge right by saved nudge dialog settings 1
```

## Scrub
The Scrub modifier was designed for MCU-style surfaces with a "Scrub" button, allowing you to combine that button to create a range of scrub-related actions similar to the examples below. 
```
    Decrease+Scrub+Jogwheel     Reaper 40084     // Transport: Rewind a little bit
    Increase+Scrub+Jogwheel     Reaper 40085     // Transport: Fast forward a little bit
```

## Zoom
The Zoom modifier was designed for MCU-style surfaces with a "Zoom" button, allowing you to combine that button to create a range of zoom-related actions similar to the examples below. 
```
    Zoom+Up                     Reaper 40111     // Zoom in vertical                                            
    Zoom+Down                   Reaper 40112     // Zoom out vertical                                                       
    Zoom+Right                  Reaper 1012      // Zoom in horizontal                                      
    Zoom+Left                   Reaper 1011      // Zoom out horizontal         
```

## Toggle
See [[ToggleChannel|Other Actions#togglechannel]] for details on how to use the toggle modifier.

## Increase, Decrease
Now you can assign two different Reaper actions to a single encoder based on which way the encoder is being turned, Counter-Clockwise (CCW) or Clockwise (CW). We do this via the Decrease and Increase modifiers. Note: these modifiers only work with Encoders. The examples below all show the JogWheel but this functionality will work with any encoder.

```
Zone "Zoom"
    Decrease+JogWheel      Reaper 41326   // Decrease track height
    Increase+JogWheel      Reaper 41325   // Increase track height
ZoneEnd
```

**Important Note:** for this to work on your JogWheel, you will need to update your .mst file. If you're coming from a prior version of CSI, you probably have two or more separate JogWheel widgets and those widgets probably are defined using Press instead of Encoder. So replace your JogWheel widgets to look like this (assuming MCU-style surface):
```
Widget JogWheel JogwheelWidgetClass
	Encoder b0 3c 7f
WidgetEnd
```

The following native CSI actions support this same syntax:
```
TrackBank
VCABank
FolderBank
SelectedTrackSendBank
SelectedTrackReceiveBank
SelectedTrackFXMenuBank
TrackSendBank
TrackReceiveBank
TrackFXMenuBank
```

Example:
```
Zone "Buttons"
    Decrease+JogWheel      TrackBank -1
    Increase+JogWheel      TrackBank  1
ZoneEnd
```

---

## FILE: Virtual-Widgets.md

If you read the [[Defining Control Surface Capabilities]] page, you'd know that we define Widgets in our .mst/.ost files to represent the capabilities of our surfaces. I sometimes think of these Widgets (or at least the Message Generator part) as triggers I can use to [[cause certain actions or behaviours|Defining-Control-Surface-Behavior]] to occur.

If we run with that analogy, then the Widgets on our surfaces are not the only things we may want to use to trigger behaviours. Sometimes we may want to trigger them when certain things occur in Reaper itself, e.g. when the selected track changes. 

These are called Virtual Widgets. We don't have to define them in our MST files, as they are not coming from a control surface. We just need to use them in our zone files like any other Widget.

The Virtual Widgets currently defined are:
* [[OnInitialization|Virtual Widgets#OnInitialization]] -- fires when CSI initializes 
* [[OnTrackSelection|Virtual Widgets#OnTrackSelection]] - fires when a track is selected in Reaper
* [[OnPageEnter|Virtual Widgets#OnPageEnter]] - fires after a new Page has been entered
* [[OnPageLeave|Virtual Widgets#OnPageLeave]] - fires before the old Page has been exited
* [[OnPlayStart|Virtual Widgets#OnPlayStart]] - fires when playback starts
* [[OnPlayStop|Virtual Widgets#OnPlayStop]] - fires when playback stops 
* [[OnRecordStart|Virtual Widgets#OnPlayStart]] - fires when recording starts
* [[OnRecordStop|Virtual Widgets#OnPlayStop]] - fires when recording stops 
* [[OnZoneActivation|Virtual Widgets#OnZoneActivation]] - fires when the zone it appears in has been activated
* [[OnZoneDeactivation|Virtual Widgets#OnZoneDeactivation]] - fires when the zone it appears in has been exited

## OnInitialization
The OnInitialization virtual widget belongs in your home.zon file and fires when CSI is initialized. For instance, OnInitialization could be to turn Focused FX mapping (ToggleEnableFocusedFXMapping) to an off state as it is on by default. If you're using an FX Menu, this is probably something you'd want off by default. This would be as simple as adding OnInitialization ToggleEnableFocusedFXMapping to your home zone.
```
Zone "Home"
OnInitialization ToggleEnableFocusedFXMapping 
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd
```

## OnTrackSelection 
OnTrackSelection is another virtual widget and will fire every time you select a new track in Reaper. Example: maybe you want selecting a new track to return to your home.zon and close the GUI of any open plugin windows. You can automate all of that by doing something like this.
```
Zone "Home"
OnTrackSelection          GoHome
OnTrackSelection          Reaper _S&M_WNCLS4                      // Closes All(!) FX chain windows
OnTrackSelection          Reaper _S&M_WNCLS3                      // Closes All(!) Floating FX windows
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd
```

## OnPageEnter
OnPageEnter will fire an action when a new [[Page|Pages]] is activated in CSI. Note: if you wanted this same action to occur when Reaper/CSI is initialized, then you'd need to combine that with an OnInitialization virtual widget and action.

For instance, in the Home.zon on one of my surfaces in my "HomePage", I may have this to set a particular screenset on startup and page enter.
```
Zone "Home"
OnInitialization Reaper 40454     // Screenset: Load window set #01        
OnPageEnter      Reaper 40454     // Screenset: Load window set #01          
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd  
```

And in the Home.zon on that same surface I may have this on a hypothetical "Mix" page to load Screenset #2 whenever I enter that page, but then it will also automatically run the SWS action to then toggle the narrow mixer mode..
```
Zone "Home"    
OnPageEnter      Reaper 40455                  // Screenset: Load window set #02
OnPageEnter      Reaper _S&M_CYCLACTION_17     // Narrow Mixer Toggle
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd  
```

## OnPageLeave
OnPageEnter will fire an action just prior to exiting the current [[Page|Pages]] in CSI. Expanding on the above example, entering the "Mix" Page toggles the narrow mixer mode, and exiting the "Mix" Page automatically toggles it back. 

```
Zone "Home"    
OnPageEnter      Reaper 40455                  // Screenset: Load window set #02
OnPageEnter      Reaper _S&M_CYCLACTION_17     // Narrow Mixer Toggle
OnPageLeave      Reaper _S&M_CYCLACTION_17     // Narrow Mixer Toggle
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd  
```

## OnPlayStart
You can use OnPlayStart to fire particular CSI or Reaper actions when playback begins. In the below example, it's used in a Home.zon to fire the SendMIDIMessage action to cause a button to start strobing.
```
Zone "Home"
OnPlayStart   SendMIDIMessage "B5 0E 04"     // Makes button B7 strobe on play start
...
ZoneEnd
```

## OnPlayStop
This is the inverse action fo OnPlayStart and fires when playback stops. Building upon the example above, I'm sending another MIDI message when playback stops to restore the non-blinking button state.
```
Zone "Home"
OnPlayStart   SendMIDIMessage "B5 0E 04"     // Makes button B7 strobe on play start
OnPlayStop    SendMIDIMessage "B5 0E 00"     // Makes button B7 stop strobing on play start
...
ZoneEnd
```

## OnRecordStart
This action will fire when recording starts in Reaper. In the below example, I'm using it to make button B8 strobe when Reaper is recording.
```
Zone "Home"
OnRecordStart SendMIDIMessage "B5 0F 04"     // Makes button B8 strobe on record start
````

## OnRecordStop
This action will fire when recording stops in Reaper. In the below example, I'm using it to make button B8 stop strobing when Reaper comes out of recording mode.
```
Zone "Home"
OnRecordStart SendMIDIMessage "B5 0F 04"     // Makes button B8 strobe on record start
OnRecordStop  SendMIDIMessage "B5 0F 00"     // Makes button B8 stop strobing on record stop
````

## OnZoneActivation
OnZoneActivation fires whenever the zone this command appears in becomes activated. One use-case for this action is setting the widget state for one or more controls on your surface as shown in the examples below. The first two examples set all of the displays on an X-Touch Universal to a cyan color when the SelectedTrackSend is activated, and yellow when the SelectedTrackFXMenu is activated for additional visual cues.
```
Zone "SelectedTrackSend"
	OnZoneActivation	    SetXTouchDisplayColors Cyan
 ...
ZoneEnd
```

```
Zone "SelectedTrackFXMenu"
	OnZoneActivation	SetXTouchDisplayColors Yellow
...
ZoneEnd
```

The next example is useful for Reaper users using the [OSARA](https://osara.reaperaccessibility.com/) extension as a screen reader. The intent here is to read the name of the plugin aloud whenever an FX.zon becomes activated.
``` 
Zone "VST: UAD Fairchild 660 (Universal Audio, Inc.)" "Fair660"
	OnZoneActivation	Speak "UAD Fairchild 660 Compressor"

	DisplayUpper1		FixedTextDisplay "HdRoom"
 	DisplayLower1		FXParamValueDisplay 9
	Rotary1			FXParam 9 [ 0.0 0.17 0.33 0.50 0.67 0.83 1.0 ]
   ...
ZoneEnd
```

## OnZoneDeActivation
OnZoneDeactivation fires whenever the zone this command appears in becomes deactivated (i.e. exited). Expanding on our first two examples, we can then restore the display colors on the X-Touch Universal when the SelectedTrackSend or SelectedTrackFXMenu are exited.
```
Zone "SelectedTrackSend"
	OnZoneActivation	    SetXTouchDisplayColors Cyan
	OnZoneDeactivation	    RestoreXTouchDisplayColors
 ...
ZoneEnd
```

```
Zone "SelectedTrackFXMenu"
	OnZoneActivation	SetXTouchDisplayColors Yellow
	OnZoneDeactivation	RestoreXTouchDisplayColors
...
ZoneEnd
```

---

## FILE: Widget-Modes.md

## Widget Modes
Widget Modes are designed to send additional, specific, instructions to a given widget and added after the action in a zone file. For instance, on a typical MCU-style device, you can set the Rotary encoder feedback to vary between Dot, BoostCut, Fill, and Spread modes. Or turning off feedback for a given action.

### Feedback
CSI will default to only providing feedback for the first action in a CSI macro action (i.e. one button assigned to trigger more than action). If you want to report the feedback state of anything other than the first action in a macro list, you simply add the word "Feedback" to the end of the action you want to provide the feedback. There can only be one of these for each CSI macro action or the last in the list will be used.

Example 1. I only want feedback on the first action (default behaviour - no additional syntax required)....
```
    SomeButton SomeAction
    SomeButton AnotherAction
    SomeButton YetAnotherAction
```

Example 2. I want feedback on the middle action only; so I use the new Feedback widget mode to specify which action gets it....
```
    SomeButton SomeAction
    SomeButton AnotherAction Feedback 
    SomeButton YetAnotherAction
```

Example 3. I want feedback on the last action only....
```
    SomeButton SomeAction
    SomeButton AnotherAction
    SomeButton YetAnotherAction Feedback
```

Example 4. Erroneous definition. In this case only the 3rd Action gets feedback.
```
    SomeButton SomeAction
    SomeButton AnotherAction Feedback
    SomeButton YetAnotherAction Feedback
```

### RingStyle (For Use With Encoders)
```
    Rotary|                     TrackPan RingStyle=Dot
    DisplayLower|      		TrackPanDisplay

    Toggle+Rotary|              TrackPanWidth RingStyle=BoostCut
    Toggle+DisplayLower| 	TrackPanWidthDisplay
```

The new functionality is similarly dependent on the type of feedback processor used in your .mst for a given widget.

If using **FB_Encoder**, then the available options are:
```
RingStyle=Dot
RingStyle=BoostCut
RingStyle=Fill
RingStyle=Spread
```

### BarStyle (For Use With FaderPort8/16 Value Bars)
If using **FB_FaderportValueBar**, then the available options are:
```
BarStyle=Normal
BarStyle=BiPolar
BarStyle=Fill
BarStyle=Spread
```

### FaderPort Display Mode (For Use With FaderPort8/16 Stribble Strips)
If using **FB_FP8ScribbleStripMode**, then the available options are:
```
Mode=0
Mode=1
Mode=2
....
Mode=8
```

### TextAlign (For Use With FaderPort8/16 Stribble Strips)
If using **FB_FP8ScribbleLine1**, etc., then the available options are:
```
TextAlign=Center
TextAlign=Left
TextAlign=Right

TextInvert=Yes
TextInvert=No
```

---

## FILE: Pages.md

In CSI, a Page is the highest level of the hierarchy - with each Page containing one or more surfaces, and each surface having an .mst (if MIDI/MCU) or .ost (if OSC) file which describes the surface properties as well as a zone folder defining what exactly that surface will do in Reaper. CSI requires that at least one page exist (called "HomePage" by default) before surfaces can be added. 

But CSI allows you to create multiple Pages, with each Page containing the configuration information for whatever Surfaces and Actions you want CSI to recognize. Only one Page can be active in Reaper at any time, but you can switch between Pages easily and instantaneously similar to activating a zone. 

Pages allow you to have....

* Different surfaces enabled/disabled depending on what you're doing - i.e. different surfaces enabled on each Page
* Different actions assigned to your surface depending on what your doing - i.e. different zone folders for one or more surfaces on each Page
* Surface capabilities defined differently on each page - i.e. different .mst and/or files for one or more on each Page

**Note:** The current Page is saved within your Reaper project. Example: if you save a project while CSI is on your "MixPage", upon reopening said project, CSI will start out on your "MixPage" instead of the default "HomePage".

## **To create a Page**

1. Open Reaper's Preferences -> Control/OSC/Web
2. Select CSI
3. Click Edit to open the CSI Settings
4. On the middle-section of the CSI Settings, you can add a Page by clicking the Add button
5. Highlight the name of the Page you want to edit from the left, and add or modify surfaces on the right-hand portion of the screen

![CSI Settings Add Page Image](https://i.imgur.com/02MHtzu.png)

CSI's included support files should already have a page called "HomePage" created for you to make first-time setup easy. If not there, as a best practice, your first page should be called "HomePage" (if anything just for consistency). Any pages you create beyond that can be named whatever you'd like.

Now you can begin adding surfaces (Add MIDI or Add OSC buttons) and selecting which .mst/.osc and Zone folder each Page will utilize. Remember: you can use completely different .mst files and/or Zone folders for each Page, completely changing how each surface will work on each Page. 

See [[Installation|Installation-and-Setup]] for instructions on how to setup a surface.

## Paging Actions
If using multiple Pages, the buttons on surface can be assigned to switch between Pages. Use the CSI **GoPage** action to jump between Pages in CSI. Use **NextPage** to cycle between Pages. In the below example, I have a Page called Home and another called Mix...

On my Home page, I may want to utilize the "Channel" button on my surface to enter the Mix Page.
````
Zone "Buttons"
        Channel         GoPage "Mix"  // Activates the Mix page
ZoneEnd
````

But in order to get back to the Home page, I probably want to make sure I have the opposite happening when the Mix page is active.
````
Zone "Buttons"
        Channel         GoPage "Home"  // Activates the Home page
ZoneEnd
````

You could also use the NextPage action to just cycle through the Pages in your CSI setup. In a two-page setup this would essentially be a toggle but if you had 3 or more pages it will cycle through them.
```
Zone "Buttons"
        Channel         NextPage  // Cycles through the list of pages
ZoneEnd
```

Finally, the PageNameDisplay action can be assigned to a Display widget in order to show the name of the currently active Page.

```
MainDisplay     PageNameDisplay
```

---

## FILE: Zones.md


Zones are where we do two things:

* where we map the widgets defined in our mst files to the actions we want to perform when they are invoked (pressed, rotated, etc)
* where we group multiple action/widget mappings together into related groups. 

## A Simple Example

The widget/action mapping part is easy. Let's say we have a widget called PlayButton, and we want it to perform the Play action when pressed, we would simply use the following syntax in our zon file. 

````
PlayButton Play
````

There's obviously more options than just play. Have a look at the [[Action Reference]] page for more examples. 

However, we can't just have this sitting by itself. We need to put it inside a zone definition, usually along with other widgets performing related functions (say, the Stop, Record, FF, Rewind buttons, etc). At a minimum, we’d need something like this:

````
Zone Home
        PlayButton Play
ZoneEnd
````

Provided our [[CSI.INI]] and Widget definitions are setup correctly, this should allow us to control the Play button from our Surface.


## One Zone Per File 
CSI requires that a single zone exist in each .zon file. For example: a typical MCU-style zone folder would be made up of multiple .zon files such as...
```
Home.zon
Track.zon
TrackSend.zon
TrackReceive.zon
TrackFXMenu.zon
SelectedTrackSend.zon
SelectedTrackReceive.zon
SelectedTrackFXMenu.zon
Buttons.zon
MasterTrack.zon
Marker.zon
FocusedFXParam.zon
``` 

This makes it easier to borrow other people's zones and add them to your setup. Example: if you see a SelectedTrackSendSlot.zon file that works for the X-Touch, you can just copy and paste that into your surface folder, and use that with a Mackie Universal as long as the widget names are the same.

**Tip:** within each **\CSI\Zones\[Surface]** folder, it's probably a best practice to create an "FX Zones" sub-folder if you plan on mapping FX. This way, your surface zone files can all live together in the root of the folder, and all of your fx zones can exist in the **\CSI\Zones\[Surface]\FX Zones** folder, away from the surface files. Not a requirement, but will help keep things tidy.

## Naming Zones / Fixed Zone Types
Starting in CSI v2.0, Zones and AssociatedZones must have a fixed name. These zone types are:

* **Home**- This zone is required and is the 'starting state' for CSI
* **Buttons**- This zone is generally used for assigning buttons to CSI and Reaper actions
* **Track**- Used when you want to control multiple channels across multiple widgets (e.g. 8 faders assigned to 8 channels)
* **SelectedTrack**- Used for controlling the selected track in Reaper (commonly used for 1 fader surfaces)
* **MasterTrack**- This is for assigning the master track fader to your surface
* **SelectedTrackFXMenu**- Used for activating FX.zon files - shows the FX slots of the selected channel
* **SelectedTrackSend**- Used for controlling the various sends on the selected channel
* **SelectedTrackReceive**- Used for controlling the various Receives (if any) on the selected channel
* **TrackFXMenu**- Used for activating FX.zon files - shows the same FX Slot across multiple channels
* **TrackSend**- Used for controlling the same Send slot across multiple channels
* **TrackReceive**- Used for controlling the same Receive slot across multiple channels  


## Activating Zones
Depending on the type of zone you want to activate, there are few methods to accomplish this task. If you're looking to activate one of the zone types with a fixed name, there are dedicated CSI actions for each type...

```
Zone you want to activiate...   ActionName...
Home                            GoHome
SelectedTrackFXMenu             GoSelectedTrackFXMenu
SelectedTrackSend               GoSelectedTrackSend
SelectedTrackReceive            GoSelectedTrackReceive
TrackFXMenu                     GoTrackFXmenu
TrackReceive                    GoTrackReceive
TrackSend                       GoTrackSend
```

Here's what that looks like in a Buttons.zon
````
    MidiTracks                  GoSelectedTrackSend
    Inputs                      GoSelectedTrackReceive
    AudioTracks                 GoSelectedTrackFXMenu
    AudioInstrument             GoTrackSend
    Aux                         GoTrackReceive
    Busses                      GoTrackFXMenu
````

## Home Zone, IncludedZones, AssociatedZones
Every surface in CSI requires a Home zone. This sets the default state for your surface via IncludedZones and AssociatedZones, which we will explain shortly. If you require one surface to sync up with, or dictate the behavior of another, you'd define the required [[Broadcast and Receive|Broadcast-and-Receive]] behavior in the Home.zon. It's also not uncommon to include actions assigned to [[Virtual Widgets]] in the Home zone to set the state of the surface when initializing the surface or "going" Home.

The types of zones defined in "IncludedZones" will dictate the starting (or "home") state of the surface. Example: it's common to have a Track zone combined with a Master Track and Buttons zone in an MCU-style surface because we want the faders, rotaries and buttons all functional and defined in a predictable way when going Home. Additionally, CSI version 2 introduced the concept of AssociatedZones. These are zones like Sends, Receives, and FX Menus that are not activated as part of the home.zon, but will be called from this zone. Example: when I activate the Send zone, I want the Sends mapped to faders and rotaries until I go Home again where they control tracks - that makes the Send zone a typical use-case for AssociatedZones. AssociatedZones behave like radio buttons, with only one being activated at a given time. 

Below is an example of a typical MCU-style home.zon. The "Track" zone will use the displays and widgets when the Home zone is active, but if you want to call up an FX menu, Sends, or Receives to then takeover over some of the widgets, they need to be listed as AssociatedZones as shown below. When configured like this, the AssociatedZones function as "radio-button" style zones, where only one can be active at a given time (example: SelectedTrackSends or SelectedTrackReceives - not both simultaneously).
```
Zone Home
    IncludedZones
        "Buttons"
        "Track"
        "MasterTrack"
    IncludedZonesEnd
    AssociatedZones
       "SelectedTrackFXMenu"
       "SelectedTrackSend"
       "SelectedTrackReceive"
       "TrackFXMenu"
       "TrackSend"
       "TrackReceive"
    AssociatedZonesEnd
ZoneEnd
```

On the other hand, here's an example of a home.zon where the Track zone, SelectedTrackFXMenu, and SelectedTrackSend zones are all activate in the home.zon itself. For this particular device/use-case, RowA of the surface covers the Track zone, RowB covers the SelectedTrackFXMenu, and RowC covers SelectedTrackSend and I wanted all 3 active simultaneously which is why we have all 3 listed as IncludedZones in the Home.zon versus AssociatedZones in the prior example.
```
Zone "Home"
    IncludedZones
        "Buttons"
        "Track"
        "SelectedTrackFXMenu"
        "SelectedTrackSend"
    IncludedZonesEnd
ZoneEnd
```

The Home.zon would also include any [[Broadcast and Receive|Broadcast-and-Receive]] messages and is also a great place to define actions assigned to [[Virtual Widgets]].

## FX Zones
FX zone file names can be whatever you'd like them to, but the FX zone name in the .zon file itself must match the plugin name in Reaper exactly. See [FX Zones](https://github.com/GeoffAWaddington/reaper_csurf_integrator/wiki/FX-Zones) for more information on how to create an FX.zon.

## SubZones
SubZones are custom zones that can be called up from their parent zone. They have no fixed naming convention like the AssociatedZones. If your SubZone name includes a space, wrapping the name in quotes is required (e.g. if your zone name is "Mix Zone"), however, it's a common CSI practice to include quotes in all zone names, though technically not required. 

First, the SubZones need to be defined and within the parent zone (lines 2-4 below). You also need a way to activate the SubZone using the [[GoSubZone|Navigation-Actions#gosubzone-leavesubzone]] action (in this case, the Zoom button). Here is one example where a "Zoom" subzone is being called from the buttons.zon:
```
Zone "Buttons"
    SubZones
       "Zoom"
    SubZonesEnd

    Zoom        GoSubZone "Zoom"
ZoneEnd
```

The SubZone itself would look like any other standalone .zon file. Below is our Zoom.zon example. Also note that once we are in one of those custom SubZones, we need a way to exit the SubZone. You may want to use the same button you used to activate the SubZone and assign that to the [[LeaveSubZone|Navigation-Actions#gosubzone-leavesubzone]] action in order for it to behave like a toggle. 
```
Zone "Zoom"
     Up                      Reaper 40111     // Zoom in vertical
     Down                    Reaper 40112     // Zoom out vertical
     Left                    Reaper 1011      // Zoom out horizontal
     Right                   Reaper 1012      // Zoom in horizontal
     
     Shift+Up                Reaper 40113     // View: Toggle track zoom to maximum height
     Shift+Down              Reaper 40110     // View: Toggle track zoom to minimum height
     Shift+Left              Reaper 40295     // View: Zoom out project
     Shift+Right             Reaper 41190     // View: Set horizontal zoom to default project setting

     Zoom LeaveSubZone
ZoneEnd
```

SubZones are also commonly used in FX, for example, where a mastering suite plugin may have lots of different sections and more automation than you have on your surface. In those instances, you could create a "compressor" SubZone, and a "limiter" SubZone, etc.

## A Slightly More Useful Example

As great as it is to get that first action happening when you press a Surface button, let’s look at a slightly more interesting example. A common surface setup might include a Buttons.zon that has various CSI and Reaper actions that can be called up from the surface. Some of these buttons may even call other zones. Here's an excerpt of a Buttons.zon:

````
Zone "Buttons"
    Track                       Reaper 1156	// Toggle item grouping override
    Pan                         Reaper 1155	// Cycle ripple editing mode
    EQ                          Reaper 40070	// Move envelope points with media items
    Send                        Reaper 40145 	// Toggle Grid Lines
    Hold+Send                   Reaper 40071	// Show snap/grid settings
    Plugin                      Reaper 1157	// Toggle snapping
    Hold+Plugin			Reaper 40071	// Show snap/grid settings
    Instrument                  Reaper 1135	// Toggle locking
    Hold+Instrument		Reaper 40277	// Show lock settings
    BankLeft                    TrackBank -8
    BankRight                   TrackBank 8
    ChannelLeft                 TrackBank -1
    ChannelRight                TrackBank 1
    Flip                        Flip
    GlobalView                  GoHome
    GlobalView                  Reaper _S&M_WNCLS3        	// Close all floating FX windows
    GlobalView                  Reaper _S&M_WNCLS4        	// Close all FX chain windows
    GlobalView                  Reaper _S&M_TOGLFXCHAIN   	// Toggle FX Chain for selected tracks     
    nameValue                   NoAction   
    smpteBeats                  CycleTimeDisplayModes
    MidiTracks                  GoSelectedTrackSend
    Inputs                      GoSelectedTrackReceive
    AudioTracks                 GoSelectedTrackFXMenu
    AudioInstrument             GoTrackSend
    Aux                         GoTrackReceive
    Busses                      GoTrackFXMenu
    Outputs                     ToggleEnableFocusedFXMapping 
    User                        ToggleEnableFocusedFXParamMapping
ZoneEnd
````

As another example, I might define a zone called Track which collects all my track faders and related widgets into a single group, again because for me they are all related to controlling my tracks. 
````
Zone "Track"
    DisplayUpper|               TrackNameDisplay
    Fader|Touch+DisplayLower|   TrackVolumeDisplay
    DisplayLower|               MCUTrackPanDisplay
    VUMeter|                    TrackOutputMeterMaxPeakLR
    Fader|                      TrackVolume 
    Flip+Fader|                 TrackPan 
    Rotary|                     MCUTrackPan
    RotaryPush|                 ToggleMCUTrackPanWidth
    RecordArm|                  TrackRecordArm
    Solo|                       TrackSolo
    Mute|                       TrackMute
    Select|                     TrackUniqueSelect
    Shift+Select|               TrackRangeSelect
    Control+Select|             TrackSelect
ZoneEnd
````

Note the | character after the name of the widgets. These will get replaced with the actual number derived from the number of channels you entered during setup. It is simply a shorthand way of reducing typing. So for example if you specified 8 channels this line:

Fader|  TrackVolume

will cause this to be generated automatically by CSI...

Fader1  TrackVolume

Fader2  TrackVolume

Fader3  TrackVolume

Fader4  TrackVolume

Fader5  TrackVolume

Fader6  TrackVolume

Fader7  TrackVolume

Fader8  TrackVolume


## Adding Comments to Zones
When triggering custom actions or using actions whose meanings may otherwise not be obvious, it's a good idea to add comments to your in your .zon files. CSI allows for two types of comments:

1. / Lines that begin with a forward slash are completely ignored by CSI and are good for commenting sections of code. **Hint:** these also work in .mst files.
2. // Trailing comments are preceeded by two forward slashes and can be used after an action in a .zon file

Here is an example from a .zon file that uses both types of comments.

````
Zone "Buttons"

/ Using the GlobalView button to activate the Home zone and then run the actions to close the floating FX windows.
    GlobalView                  GoHome
    GlobalView                  Reaper _S&M_WNCLS3        	// Close all floating FX windows
    GlobalView                  Reaper _S&M_WNCLS4        	// Close all FX chain windows
    GlobalView                  Reaper _S&M_TOGLFXCHAIN   	// Toggle FX Chain for selected tracks     
````


---

## FILE: Zone-Actions.md



## GoZone 

GoZone allows us to "overlay" a new zone over the top of the current zones. Parameter is the name of the new zone you wish to load:

`someButton GoZone "Home"`

See the page on [[Changing Zones|Zones#changing-zones]] for more details.



---

## FILE: Receive-Zones.md

## What are Receives?
Track Receives are like inverse sends. Lets say you're sending multiple mix elements to a "Room Reverb" bus. If you wanted to adjust the amount of reverb on multiple channels using Sends, you'd have to go track by track and adjust the send levels one at a time. A more efficient way would be to map the receives going into the Room Reverb bus, and adjusting the various levels from that one track.

It's ultimately a much more efficient way of controlling multiple send levels feeding the same [receive] bus. Track Receives are useful for reverb adjustments across multiple tracks, cue/headphone mixes, and even adjusting monitor mixes in a live setup.

## Two types of Receive zones
There are two types of Receive Zones in CSI:

* SelectedTrackReceive 
* TrackReceive

**SelectedTrackReceive** is best used when you have a surface with multiple channels and you want to map out the Receives on the selected track, across those various channels. Example: you have an 8 channel MCU type device. If you have more than 8 Receives on the selected track, you would use the SelectedTrackReceiveBank action to bank to the additional Receives. 

**TrackReceive** is best used when you have a multiple channel surface, but you only want to see Receives for the channel that corresponds that specific track. Example: you have an 8-channel MCU type device. Using the TrackReceive will show you Receive Slot #1 for channels 1-8. If you want to see the Receive loaded in Receive Slot #2, you will use TrackReceiveBank action to navigate to the next slot, at which point, you'll be looking at Receive Slot #2 for channels 1-8. You setup the number of tracks in the CSI device preferences.


## Receive Mapping and Unmapping Actions
Depending on the type of Receive zone you are creating, you will need to create a CSI action to map the Receives. 

**SelectedTrackReceive** uses the CSI action **GoSelectedTrackReceive** for mapping. 

**TrackReceive** uses the CSI action **GoTrackReceive** for mapping.

Unmapping is a simple as triggering the action a second time or using the GoHome action (which is more of a brute force approach). 

## Activating a Receive Map
You can activate the Receive map one of three ways. First, you can assign the mapping action above to a button like this...
```
Zone "Buttons"
      Receive     GoSelectedTrackReceive
ZoneEnd
```

Or, if you can dedicate a portion of your surface to Receives and always want them to appear as part of your Home zone, you can simply add the Receive zone to the IncludedZones like this...
```
Zone Home
     IncludedZones
          "Buttons"
          "Channel"
          "SelectedTrackReceive"
     IncludedZoneReceive
ZoneEnd
```

## SelectedTrackReceive Zone Example
**Note:** SelectedTrackReceive zones are a special type of zone so your Receive zone must be named "SelectedTrackReceive" (exactly).

Here's an example of a typical MCU Receive zone.
```
Zone "SelectedTrackReceive"
        DisplayUpper|               TrackReceiveNameDisplay
        DisplayLower|               TrackReceivePanDisplay
        Control+DisplayLower|       TrackReceivePrePostDisplay
        Control+RotaryPush|         TrackReceivePrePost
        Fader|Touch+DisplayLower|   TrackReceiveVolumeDisplay
        Mute|                       TrackReceiveMute
        Rotary|                     TrackReceivePan        
        Fader|                      TrackReceiveVolume
        Left                        SelectedTrackReceiveBank -8
        Right                       SelectedTrackReceiveBank 8
ZoneEnd
```

## TrackReceive Zone Example
**Note:** TrackReceive zones are a special type of zone so your Receive zone must be named "TrackReceive" (exactly).

Here's an example of a typical TrackReceive zone.
```
Zone "TrackReceive"
        DisplayUpper|               TrackNameDisplay
        DisplayLower|               TrackReceiveNameDisplay
        FaderTouch+DisplayLower|    TrackReceiveVolumeDisplay
        Shift+DisplayLower|         TrackReceivePrePostDisplay
        Shift+RotaryPush|           TrackReceivePrePost
        Mute|                       TrackReceiveMute
        Rotary|                     TrackReceivePan
        Fader|                      TrackReceiveVolume
        Up                          TrackReceiveBank -1
        Down                        TrackReceiveBank 1
ZoneEnd
```

# Receive Actions
The available Receive zone actions are shown below.

* [[TrackReceiveNameDisplay|Receive-Zones#TrackReceiveNameDisplay]]
* [[TrackReceiveVolume|Receive-Zones#trackReceivevolume-trackReceivevolumedisplay]]
* [[TrackReceiveVolumeDisplay|Receive-Zones##trackReceivevolume-trackReceivevolumedisplay]]
* [[TrackReceivePan|Receive-Zones#trackReceivepan-trackReceivepandisplay]]
* [[TrackReceivePanDisplay|Receive-Zones#trackReceivepan-trackReceivepandisplay]]
* [[TrackReceivePrePost|Receive-Zones#trackReceiveprepost-trackReceiveprepostdisplay]]
* [[TrackReceivePrePostDisplay|Receive-Zones#trackReceiveprepost-trackReceiveprepostdisplay]]
* [[TrackReceiveMute|Receive-Zones#trackReceivemute]]
* [[TrackReceiveStereoMonoToggle|Receive-Zones#trackReceivestereomonotoggle]]
* [[TrackReceiveInvertPolarity|Receive-Zones#trackReceiveinvertpolarity]]

## TrackReceiveNameDisplay
Use the TrackReceiveNameDisplay action in a "TrackReceive" or "SelectedTrackReceive" zone to display the name of the Receive channel.
```
Zone "TrackReceive"
	DisplayLower| 		    TrackReceiveNameDisplay
ZoneEnd
```

## TrackReceiveVolume, TrackReceiveVolumeDisplay
Use the TrackReceiveVolume action in a "TrackReceive" or "SelectedTrackReceive" zone to control the Receive level. TrackReceiveVolumeDisplay can be used in a display widget to show the volume level.
```
Zone "TrackReceive"
    	Fader|Touch+DisplayLower|   TrackReceiveVolumeDisplay
    	Fader|                      TrackReceiveVolume
ZoneEnd
```

## TrackReceivePan, TrackReceivePanDisplay
Use the TrackReceivePan action in a "TrackReceive" or "SelectedTrackReceive" zone to control the Receive panning. TrackReceivePanDisplay can be used in a display widget to show the pan position.
```
Zone "TrackReceive"
    	DisplayLower|               TrackReceivePanDisplay
    	Rotary|                     TrackReceivePan
ZoneEnd
```

## TrackReceivePrePost, TrackReceivePrePostDisplay
Use the TrackReceivePrePost action in a "TrackReceive" or "SelectedTrackReceive" zone to cycle through whether the Receive is 1) Post-Fader (Post-Pan), 2) Pre-Fader (Post-FX), or 3) Pre-FX. TrackReceivePrePostDisplay can be used in a display widget to show the current value.
```
Zone "TrackReceive"
    	Shift+DisplayLower|         TrackReceivePrePostDisplay
    	Shift+RotaryPush|           TrackReceivePrePost
ZoneEnd
```

## TrackReceiveMute
Use the TrackReceiveMute action in a "TrackReceive" or "SelectedTrackReceive" zone to toggle muting the Receive.
```
Zone "TrackReceive"
    	Mute|                       TrackReceiveMute
ZoneEnd
```

## TrackReceiveStereoMonoToggle
Use the TrackReceiveStereoMonoToggle action in a "TrackReceive" or "SelectedTrackReceive" zone to toggle between a stereo (default) and mono Receive.
```
Zone "TrackReceive"
    	Shift+Mute|                 TrackReceiveStereoMonoToggle
ZoneEnd
```

## TrackReceiveInvertPolarity
Use the TrackReceiveInvertPolarity action in a "TrackReceive" or "SelectedTrackReceive" zone to invert the polarity of the Receive.
```
Zone "TrackReceive"
    	Alt+Mute|                   TrackReceiveInvertPolarity
ZoneEnd
```

---

## FILE: Send-Zones.md

# Send Zones

## Two types of Send zones
There are two types of Send Zones in CSI:

* SelectedTrackSend 
* TrackSend

**SelectedTrackSend** is best used when you have a surface with multiple channels and you want to map out the sends on the selected track, across those various channels. Example: you have an 8 channel MCU type device. If you have more than 8 sends on the selected track, you would use the SelectedTrackSendBank action to bank to the additional sends. 

**TrackSend** is best used when you have a multiple channel surface, but you only want to see sends for the channel that corresponds to that specific channel. Example: you have an 8 channel MCU type device. Using the TrackSend will show you Send Slot #1 for channels 1-8. If you want to see the send loaded in Send Slot #2, you will use TrackSendBank action to navigate to the next slot, at which point, you'll be looking at Send Slot #2 for channels 1-8. You setup the number of tracks in the CSI device preferences.


## Send Mapping and Unmapping Actions
Depending on the type of send zone you are creating, you will need to create a CSI action to map the sends. 

**SelectedTrackSend** uses the CSI action **GoSelectedTrackSend** for mapping. 

**TrackSend** uses the CSI action **GoTrackSend** for mapping.

Unmapping is a simple as triggering the action a second time or using the GoHome action (which is more of a brute force approach). 

## Activating a Send Zone
You can activate the send map one of three ways. First, you can assign the mapping action above to a button like this...
```
Zone "Buttons"
      Send     GoSelectedTrackSend
ZoneEnd
```

Or, if you can dedicate a portion of your surface to sends and always want them to appear as part of your Home zone, you can simply add the send zone to the IncludedZones like this...
```
Zone Home
     IncludedZones
          "Buttons"
          "Channel"
          "SelectedTrackSend"
     IncludedZonesEnd
ZoneEnd
```

## SelectedTrackSend Zone Example
**Note:** SelectedTrackSend zones are a special type of zone so your send zone must be named "SelectedTrackSend" (exactly).

Here's an example of a typical MCU send zone.
```
Zone "SelectedTrackSend"
        DisplayUpper|               TrackSendNameDisplay
        DisplayLower|               TrackSendPanDisplay
        Control+DisplayLower|       TrackSendPrePostDisplay
        Control+RotaryPush|         TrackSendPrePost
        Fader|Touch+DisplayLower|   TrackSendVolumeDisplay
        Mute|                       TrackSendMute
        Rotary|                     TrackSendPan        
        Fader|                      TrackSendVolume
        Left                        SelectedTrackSendBank -8
        Right                       SelectedTrackSendBank 8
ZoneEnd
```

## TrackSend Zone Example
**Note:** TrackSend zones are a special type of zone so your send zone must be named "TrackSend" (exactly).

Here's an example of a typical TrackSend zone.
```
Zone "TrackSend"
        DisplayUpper|               TrackNameDisplay
        DisplayLower|               TrackSendNameDisplay
        FaderTouch+DisplayLower|    TrackSendVolumeDisplay
        Shift+DisplayLower|         TrackSendPrePostDisplay
        Shift+RotaryPush|           TrackSendPrePost
        Mute|                       TrackSendMute
        Rotary|                     TrackSendPan
        Fader|                      TrackSendVolume
        Up                          TrackSendBank -1
        Down                        TrackSendBank 1
ZoneEnd
```

# Send Actions
The available send zone actions are shown below.

* [[TrackSendNameDisplay|Send-Zones#TrackSendNameDisplay]]
* [[TrackSendVolume|Send-Zones#tracksendvolume-tracksendvolumedisplay]]
* [[TrackSendVolumeDisplay|Send-Zones##tracksendvolume-tracksendvolumedisplay]]
* [[TrackSendPan|Send-Zones#tracksendpan-tracksendpandisplay]]
* [[TrackSendPanDisplay|Send-Zones#tracksendpan-tracksendpandisplay]]
* [[TrackSendPrePost|Send-Zones#tracksendprepost-tracksendprepostdisplay]]
* [[TrackSendPrePostDisplay|Send-Zones#tracksendprepost-tracksendprepostdisplay]]
* [[TrackSendMute|Send-Zones#tracksendmute]]
* [[TrackSendStereoMonoToggle|Send-Zones#tracksendstereomonotoggle]]
* [[TrackSendInvertPolarity|Send-Zones#tracksendinvertpolarity]]

## TrackSendNameDisplay
Use the TrackSendNameDisplay action in a "TrackSend" or "SelectedTrackSend" zone to display the name of the send.
```
Zone "TrackSend"
	DisplayLower| 		    TrackSendNameDisplay
ZoneEnd
```

## TrackSendVolume, TrackSendVolumeDisplay
Use the TrackSendVolume action in a "TrackSend" or "SelectedTrackSend" zone to control the Send level. TrackSendVolumeDisplay can be used in a display widget to show the volume level.
```
Zone "TrackSend"
    	Fader|Touch+DisplayLower|   TrackSendVolumeDisplay
    	Fader|                      TrackSendVolume
ZoneEnd
```

## TrackSendPan, TrackSendPanDisplay
Use the TrackSendPan action in a "TrackSend" or "SelectedTrackSend" zone to control the Send panning. TrackSendPanDisplay can be used in a display widget to show the pan position.
```
Zone "TrackSend"
    	DisplayLower|               TrackSendPanDisplay
    	Rotary|                     TrackSendPan
ZoneEnd
```

## TrackSendPrePost, TrackSendPrePostDisplay
Use the TrackSendPrePost action in a "TrackSend" or "SelectedTrackSend" zone to cycle through whether the send is 1) Post-Fader (Post-Pan), 2) Pre-Fader (Post-FX), or 3) Pre-FX. TrackSendPrePostDisplay can be used in a display widget to show the current value.
```
Zone "TrackSend"
    	Shift+DisplayLower|         TrackSendPrePostDisplay
    	Shift+RotaryPush|           TrackSendPrePost
ZoneEnd
```

## TrackSendMute
Use the TrackSendMute action in a "TrackSend" or "SelectedTrackSend" zone to toggle muting the send.
```
Zone "TrackSend"
    	Mute|                       TrackSendMute
ZoneEnd
```

## TrackSendStereoMonoToggle
Use the TrackSendStereoMonoToggle action in a "TrackSend" or "SelectedTrackSend" zone to toggle between a stereo (default) and mono send.
```
Zone "TrackSend"
    	Shift+Mute|                 TrackSendStereoMonoToggle
ZoneEnd
```

## TrackSendInvertPolarity
Use the TrackSendInvertPolarity action in a "TrackSend" or "SelectedTrackSend" zone to invert the polarity of the send.
```
Zone "TrackSend"
    	Alt+Mute|                   TrackSendInvertPolarity
ZoneEnd
```

---

## FILE: Track-Colors.md

Some widgets & surfaces (such as the "Select" buttons on the Faderport8 and Faderport16 or an OSC surface designed to receive track track colors) work with CSI in such a way that the surface can follow the track colors in Reaper. If you have a supported device, the syntax is the word "Track" within some curly brackets (leave a space before and after). 

Here's an example of how to get the Select buttons to light up on the Presonus Faderport8/16 using CSI: 
```
Zone "Channel"
TrackNavigator
Select| TrackUniqueSelect  { "Track" }
ZoneEnd
```

---

## FILE: Folders.md

If you prefer to work with folders within Reaper, it's easy to create a [VCA](VCA's-and-VCA-Spill)-like workflow by combining CSI with some existing Reaper actions!

You'll be able to expand and collapse folders directly from your surface and toggle between seeing all tracks and a folder only view.

## Expanding and Collapsing Folders
Let's say your mix makes extensive use of folder tracks and you'd like the option to quickly expand and collapse your folders right from your surface. You can do that with a combination of CSI plus some carefully sequenced Reaper actions.

In the below example, I'm using Option+Select to expand or collapse the children of the selected folder track, essentially being able to expand or collapse a folder. You'll notice that we have two different actions being triggered from a single widget. CSI will run these two actions in sequence from a single button press (in this case, a modified button press).
```` 
Zone "Track"
    Option+Select|   TrackUniqueSelect
    Option+Select|   Reaper 41665       //Mixer: Show/hide children of selected tracks
ZoneEnd
```` 

## Toggle "Folder Mode"
Similarly, if you would like to create a Mixer view that will toggle back and forth between displaying all tracks on your surface, or only showing folder tracks, CSI also allows you to do that. 

In the below example, we're able to create a simple macro that selects all top-level folder tracks and toggles between showing and hiding the children in the mixer. CSI will run these three actions in order upon the firing of this action.
```` 
Zone "Buttons"
        Shift+F4     Reaper 41803     //Track: Select all top level tracks
        Shift+F4     Reaper 41665     //Mixer: Show/hide children of selected tracks
        Shift+F4     Reaper 40297     //Track: Unselect all tracks
ZoneEnd
```` 

Note: these actions will also impact track visibility in the MCP.



---

## FILE: VCA's-and-VCA-Spill.md

CSI offers the ability to spill VCA's onto your multi-fader surfaces. We won't get into how to create VCA's in Reaper other than to say there are plenty of videos and other resources on that topic like this one:

https://www.youtube.com/watch?v=JZzR7-KSQMU&t

## What is VCA spill? 
One common mixing workflow involves creating multiple VCA faders to control the levels of entire groups of tracks. For instance, you may have VCA faders for each of your orchestral sections, or maybe one for drums, another for bass tracks, another for guitars, lead vocals, background vocals, etc. VCA's can be a great way to manage projects with large track counts and simplify mixing by minimizing the visible number of channels on your control surface.

But let's say you're mixing using VCA's and you've got your Drum VCA but you still want to tweak the relative levels of the kick and snare drums, how do you quickly make those tweaks? You can use the VCA Spill feature of CSI to "spill out" the tracks feeding that VCA to the other channels on the surface, similar to opening and closing a folder.

## How to Use VCA's and VCA Spill
The process is basically: 1) press a button you've assigned on your surface to enable VCA mode, where your surface will only show VCA tracks, then 2) press another button to "spill" (expand) the tracks feeding a particular VCA fader out to the rest of the surface.

## CycleTrackVCAFolderModes, TrackVCAFolderModeDisplay
CycleTrackVCAFolderModes will cycle the surface through displaying tracks of various types: 1) Normal (i.e. regular track display); 2) VCA (VCA leaders); or 3) Folder (top level folders).

TrackVCAFolderModeDisplay will display the overall 'mode' CSI is currently set to on the LED display labelled 'Assignment'. On an MCU, this located immediately to then left of the SMPTE/Beats indicators. On an X-Touch, it's immediately to the left of the master solo indicator.
```
Zone "Buttons"
    nameValue                 CycleTrackVCAFolderModes
    AssignmentDisplay         TrackVCAFolderModeDisplay
ZoneEnd
```

**Note:** The standard CSI [[TrackBank|Navigation Actions#TrackBank]] action will automatically bank VCA's and folder tracks.

## TrackToggleVCASpill
Once VCA Mode is enabled, you can assign a CSI action to spill the faders for any selected VCA fader. You probably want to use a modifier in addition to your channel select button to do this. 

In the below example, we're using Alt+Select to toggle spilling the tracks feeding the VCA fader.
```` 
Zone "Track"
     Alt+Select|      TrackToggleVCASpill
ZoneEnd
```` 

So if I have "Drums VCA" fader with all my drum tracks, entering VCA Mode (by pressing the F1 widget like in the above example) will show me only the VCA tracks, then Alt+Selecting the Drum VCA will show me all the drum tracks controlled by that particular VCA fader. To hide those tracks, I'd simply Alt+Select the Drum VCA again. To exit VCA mode, I'd simple toggle VCA mode again.

You can also spill multiple levels of VCAs! Example: if your VCA drum group, had another subset of VCAs for Kick, Snare, and ambient mics - you could spill the drums, then subsequently spill out one of the sub-VCAs.

---

## FILE: FX-and-Instrument-Mapping.md

CSI allows users to create custom FX and instrument mappings which can be used across one or more surfaces. FX Zones are similar to surface [[Zones]] in that we are mapping [[Widgets defined in our mst files|Defining Control Surface Capabilities]] to behavior we want to occur. The major difference is about what that behavior is. In a surface [[Zone|Zones]] we're binding the widgets to some sort of action in Reaper itself, whereas for FX Zones, we are binding widgets to a parameter value in an FX plugin (eg.  VST, VSTi, VST3, VST3i, AU, AUi, etc.). 

This section of the Wiki will first focus on how to create FX zone files (I may refer to them as fx.zon files as shorthand) and how to activate those fx.zon files. Note: There is no distinction in CSI or Reaper between instruments or FX so the same principals apply to both.

At a high level, first you create the fx.zon file for each plugin, then you determine how you’d like to activate that fx.zon using CSI. We’ll cover all elements of that process here.

## Understanding FX.zon Files
Each plugin you map will require its own unique .zon file which needs to be placed inside your **CSI/Zones/[SurfaceName]/** folder. The .zon file is a plain text file that you will create and simply rename the file extension to .zon. The name of the .zon file itself can be whatever you’d like, but as a best practice you may want to include the plugin format, plugin name, and manufacturer name. Chances are, you'll need to create this fx.zon file on your own, unless someone with the same plugin and surface already created a mapping that you can use.

When CSI is initialized, it reads all .zon files in your CSI surface folders. This is important to understand because when you create an FX.zon file with Reaper open you will need to first, remove all instances of the FX from your project, then re-initialize CSI by either running the Reaper action “Refresh all surfaces”, or opening the CSI preferences in Reaper and clicking OK, or by restarting Reaper.  

It is highly recommended, but not required, that you create an FXZones subfolder to keep things tidy. So **CSI/Zones/[SurfaceName]/FXZones/**. If you create a large number of fx zones, you can even further break them down by manufacturer such as **CSI/Zones/[SurfaceName]/FXZones/Universal Audio/**. 

**Tip:** Many CSI users have created custom Excel documents or even just simple text files that they can use to help speed up the process of creating fx.zon files. You would basically list out all the widgets on your surface you'd use for FX, set up a document that included all of those as a template, then just copy paste the FXParam #'s or other actions to the create the mapping, and export as a .txt file.

## Finding FXParam Numbers
The first step to actually creating your first fx.zon is locating the FXParam # that CSI will utilize to map FX parameters to control surface widgets. There are 3 methods you can use to accomplish this task.

### Method 1: CSI Toggle Show Params when FX inserted
First, you can run the Reaper action **"CSI Toggle Show Params when FX inserted"**, then insert the FX. This will open a ReaConsole window that looks like this...
```
Zone "VST: UAD Teletronix LA-2A Silver (Universal Audio, Inc.)"
	FXParam 0 "Peak Reduct"
	FXParam 1 "Gain"
	FXParam 2 "Comp/Limit"
	FXParam 3 "Emphasis"
	FXParam 4 "Meter"
	FXParam 5 "Mix"
	FXParam 6 "Power"
	FXParam 7 "Bypass"
	FXParam 8 "Wet"
	FXParam 9 "Delta"
ZoneEnd
```

Note: the last 3 parameters in any such list will be assigned to the Reaper parameters for plugin Bypass, Wet, and Delta Solo. This will be in addition to any bypass and/or wet-dry mix parameters that may already exist in the plugin.

### Method 2: CSI Toggle Write Params to /CSI/Zones/ZoneRawFXFiles when FX inserted
You can also run the Reaper action **"CSI Toggle Write Params to /CSI/Zones/ZoneRawFXFiles when FX inserted"** then insert the FX. That will create a .txt file that looks identical the ReaConsole window shown above. The .txt file can be located in the **CSI/Zones/ZoneRawFXFiles** folder.

In your Reaper Resource Path, you must have a CSI/Zones/ZoneRawFXFiles folder already. If one doesn't exist, create one. If it's still not generating the .txt files when you insert FX after toggling that action to On, check permissions and/or run Reaper in "Admin mode" then try again.

### Method 3: Turn off the plugin UI and count!
The third method is that you can toggle the plugin UI in Reaper by clicking the "UI" button in the plugin menu. This hides the plugin graphics and replaces them with a series of horizontal sliders. The first slider is FXParam 0, and then you would count up from there. 

You will need to append the FXParam # for the following actions to work:
```
FXParam
FXParamNameDisplay
FXParamValueDisplay
```

FXParam is used to control the parameter and map it to a widget. FXParamNameDisplay can be used on a surface with displays to show the name of the parameter. Note: if the parameter name is too long, you may want to use FixedTextDisplay followed by an alias in quotes. You'll see that used throughout this example. FXParamValueDisplay shows the value of the parameter.



## FX Zones
FX Zones follow a similar syntax to surface zone files in that there is one assignment per row following a "WidgetName, Action, Additional Instructions" type of syntax from left to right. They can be read from left to right, top down.

### An Example of an FX Zone
Let’s begin by reviewing a simple fx.zon file and breaking it down to its component parts, then working backwards as to how we got there. I’m using the UAD Teletronix LA-2A Silver plugin here, mapped to the widgets on a MCU/X-Touch Universal-style device. This example may look a little scary at first, but you'll see that it's actually pretty easy to understand when you break it down line by line.

```
Zone "VST: UAD Teletronix LA-2A Silver (Universal Audio, Inc.)" "LA2ASlv"
     Rotary1             FXParam 0 
     RotaryPush1         NoAction
     DisplayUpper1       FixedTextDisplay "Thresh"
     DisplayLower1       FXParamValueDisplay 0

     Rotary2             FXParam 3
     RotaryPush2         NoAction  
     DisplayUpper2       FixedTextDisplay "HF Emph"
     DisplayLower2       FXParamValueDisplay 3

     Rotary3             FXParam 1
     RotaryPush3         NoAction 
     DisplayUpper3       FixedTextDisplay "Output" 
     DisplayLower3       FXParamValueDisplay 1 

     Rotary4             NoAction
     RotaryPush4         FXParam 2 [ 0.0 1.0 ]
     DisplayUpper4       FixedTextDisplay "CompLim" 
     DisplayLower4       FXParamValueDisplay 2

     Rotary5             FXParam 4 [ 0.0 0.50 1.0 ]
     RotaryPush5         NoAction     
     DisplayUpper5       FixedTextDisplay "Meter" 
     DisplayLower5       FXParamValueDisplay 4

     Rotary6             NoAction
     RotaryPush6         NoAction     
     DisplayUpper6       NoAction
     DisplayLower6       NoAction

     Rotary7             NoAction 
     RotaryPush7         NoAction
     DisplayUpper7       NoAction 
     DisplayLower7       NoAction 

     Rotary8             FXParam 8
     RotaryPush8         ToggleFXBypass
     DisplayUpper8       FixedTextDisplay "Wet"
     DisplayLower8       FXBypassedDisplay
ZoneEnd

```

### Open up a plain Text Editor
As mentioned earlier, fx.zon files are just plain text files so to create the fx.zon, the first thing we'll need to do is open a text editor application. **Tip:** if your fx.zon isn't being read by CSI, make sure you're not using "Rich Text" or any similar encoding features in your text editor. 

Also, as a best practice, fx.zon files are much more legible and easier to troubleshoot when you use spaces in the .txt file to align the FX parameter and other CSI actions as shown in the example above. Notice how all the CSI actions on the right are horizontally aligned in the .zon file? A little upfront work in the zone authoring process will save you headaches later on. I personally prefer spacebar avoid the Tab key because this will translate inconsistently by different applications.

### The first and last lines of an fx.zon (Plugin Type, Plugin Name, Plugin Alias)
The first line of an FX zone file must show the plugin name exactly as it appears in Reaper. You can optionally add a plugin "alias" (or short name) that will appear in FX lists. 

In this FX zone, the first line is:
```
Zone "VST: UAD Teletronix LA-2A Silver (Universal Audio, Inc.)" "LA2ASlv"
```

The word Zone is required, followed by the EXACT plugin name as it appears in Reaper - this will include the plugin format (VST, VST3, etc.). A typo anywhere in the plugin name will prevent your map from working. Therefore, it is recommended you use method #1 or #2 from [[Finding FXParam Numbers|FX-and-Instrument-Mapping#finding-fxparam-numbers]] and copy and paste the first line directly into your new fx.zon. If you have both VST2 and VST3 versions of the same plugin installed, you will need a .zon file for each. **Tip:** be careful, sometimes the mappings are not identical between formats so it's not always as easy as renaming the files and changing the file name in the first line of the .zon file.

Following the full plugin name, you’ll see “LA2ASlv”: this is the plugin alias and can be whatever you want. This will be read as the FXMenuNameDisplay action in CSI, and can be seen on the FXMenu zone files, which we will get into later on. As a best practice, it’s recommended you create a short alias, but it’s not required. However, if you do not have an alias in your FX zone, you may only see something like “VST: UAD” on your surface, which wouldn’t tell you which UAD plugin was loaded in that slot.

I’ll also jump ahead to the very last line of the .zon file which is simply the word ZoneEnd. This is required at the end of every CSI zone file, whether an FX or otherwise.
```
ZoneEnd
```

### Mapping our first action
The first FX parameter that has been mapped to a widget in CSI, is FX Param 0 (which happens to be the Threshold control in this plugin) and that's mapped to the Rotary1 widget. So we add the widget name (Rotary1), followed by the CSI action FXParam and the number 0, which represents the plugin parameter to assign to the widget. Reminder: we identified the FXParam # by using the methods outlined in [[Finding FXParam Numbers|FX-and-Instrument-Mapping#finding-fxparam-numbers]]. 
```
     Rotary1             FXParam 0 
```

See [[FX-and-Instrument-Mapping]] for the full list of available FX mapping actions.

### Adding some displays for parameter name and value
We then see...
```
     RotaryPush1         NoAction     
     DisplayUpper1       FixedTextDisplay "Thresh"
     DisplayLower1       FXParamValueDisplay 0
```

RotaryPush1 "NoAction" says that when this FX.zon is active, RotaryPush1 should not do anything.

DisplayUpper1 will show the word “Thresh” when this zone is active. This is useful if you have limited character displays and FX Params may have long names. Alternately, you could have used the FXParamNameDIsplay action as shown below:

```
     DisplayUpper1       FXParamNameDisplay 0
```

…this action will display the full parameter name, versus the alias that was created using the FixedTextDisplay action. The 0 that follows the FXParamNameDisplay action is FXParam #. We'll get into that in a second. 

The next line shows
```
     DisplayLower1       FXParamValueDisplay 0
```

This will display the value of the FX Parameter being controlled.

### Our first "toggle" action and using NoAction to reserve parameters
Jumping further ahead you see...
```
     Rotary4             NoAction
     RotaryPush4         FXParam 2 [ 0.0 1.0 ]
     DisplayUpper4       FixedTextDisplay "CompLim" 
     DisplayLower4       FXParamValueDisplay 2
```

Here, turning the Rotary encoder does nothing due to the NoAction line, but the RotaryPush4 will toggle the Comp/Limiter parameter when pressed. That's what the [ 0.0 1.0 ] means when it follows an FX Param. In CSI, all FX parameters are normalized to a range of 0.0 to 1.0 so that syntax is essentially saying, "each press should toggle between the minimum and maximum values". You'll also notice similar syntax used to step between 3 parameters on the rotary encoder with the "Meter" parameter in this .zon example. See the [Stepped Params and Toggles](https://github.com/GeoffAWaddington/CSIWiki/wiki/Stepped-Parameters-and-Toggles) page for more details. 

The final thing I want to call out in this FX.zon is that I've used NoAction for any controls on my surface that don't have an action in the FX.zon. Why? This is a best-practice recommendation to make sure that you're not inadvertently changing parameters on your track or elsewhere that you don't intend to when the fx.zon is active. This will also ensure the displays clear out.
```
     Rotary6             NoAction
     RotaryPush6         NoAction     
     DisplayUpper6       NoAction
     DisplayLower6       NoAction
```

### Save the .zon file
The last step of course is to save the .zon file. Remember, these are just plain .txt files where you will rename the file extension .zon. In this example, I'd recommend a name like **VST2_UAD_LA2A_Silver.zon**. Do not use spaces in the file name. See the [[Understandig FX and Instrument Mapping|FX-and-Instrument-Mapping#understanding-fxzon-files]] section of this page for details and tips about how to name and where to save these files.

Those are the basics to creating an fx.zon file. See the [[FX Parameter Mapping Actions|FX-Parameter-Mapping-Actions]] page for details on all the pertinent mapping actions.

### FX SubZones
FX Sub Zones are useful when you are trying to map an FX that has more parameters than your surface has controls for, or maybe the plugin has multiple FX types or modes and you'd like to put them into different zones you can switch between. This could even be useful for mapping instruments if you wanted to have filter controls on one zone, oscillator controls in another, envelopes and LFO's in another, etc. The sky is the limit with FX sub zones.

For FX Sub Zones to work you basically need a few key elements:

1. Your initial fx.zon file. This should include the parameter mapping you want to see when the plugin is mapped just like any other fx.zon. It should also have a name that matches the plugin, just like any typical fx.zon file. Example: [plugin].zon

2. One or more separate files for each sub zone. Remember: each zone must be in a separate .zon file. It is recommended you number these Sub Zone FX files using the same plugin name but appending a number to the end of the file in ascending order for each Sub Zone. Example: [plugin]-1.zon and [plugin]-2.zon

3. Instructions in the initial fx.zon file about which SubZones are to be included. See the "SubZones" and "SubZonesEnd" section in the example below.

4. GoSubZone actions in all of the .zon files so CSI knows how to move from zone to zone.

#### FX SubZone Example
In this example, I've mapped Limiter 6 GE from Tokyo Dawn Labs across 3 different zones. The primary [plugin].zon has the Compressor controls, the first Sub Zone has the Peak Limiter controls, and the second Sub Zone has the High Frequency Limiter, Clip and Output controls.

I have dedicated banking buttons on my surface (BankA, BankB, and BankC) that I will use to switch between each zone. You can see that each zone includes the GoSubZone  action to jump to the other Banks. You could of course assign different buttons to switch between zones.

First file: **VST__TDR_Limiter_6_GE__Tokyo_Dawn_Labs_.zon**
```
Zone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)" "Limiter6 GE"
     SubZones
          "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-1"
	  "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-2"
     SubZonesEnd
/
BankA         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)" "Compressor"
BankB         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-1" "Peak Lim"
BankC         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-2" "HF Lim+Clip"
/ 
RotaryA1      FXParam 6 "Comp Thresh"
RotaryA2      FXParam 8 "Comp Ratio" 
RotaryA3      FXParam 9 "Comp Attack"
RotaryA4      FXParam 10 "Comp Release"
/
ZoneEnd
```

First Sub Zone file: **VST__TDR_Limiter_6_GE__Tokyo_Dawn_Labs_-1.zon**
```
Zone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-1" "Peak Lim"
/
BankA         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)" "Compressor"
BankB         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-1" "Peak Lim"
BankC         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-2" "HF Lim+Clip"
/  
RotaryA1      FXParam 18 "Peak Lim Gain"
RotaryA2      FXParam 20 "Peak Lim Thresh"
RotaryA3      FXParam 25 "Peak Lim Focus"
RotaryA4      FXParam 26 "Peak Lim Release"
/
ZoneEnd
```

Second Sub Zone file: **VST__TDR_Limiter_6_GE__Tokyo_Dawn_Labs_-2.zon**
```
Zone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-2" "HF Lim+Clip"
/
BankA         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)"   "Compressor"
BankB         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-1" "Peak Limiter"
BankC         GoSubZone "VST: TDR Limiter 6 GE (Tokyo Dawn Labs)-2" "HF Lim+Clip"
/  
RotaryA1      FXParam 34  "HF Lim Threshold"
RotaryA2      FXParam 38 "HF Lim Frequency"
RotaryA3      FXParam 36 "HF Lim Range"
RotaryA4      FXParam 41 "HF Lim Dry Amt"
/
ZoneEnd
```

## EWidget (or "Eligible Widgets")
Another feature instituted now as part of the roadmap to auto-mapping FX is the addition of the "Ewidget" option in .mst files. This will eventually be used to tell CSI which widgets you'd like automatically included for automatic FX.zon mapping and which widgets you'd like excluded from that. Anything defined as an EWidget will be eligible for mapping. Here are some examples from an X-Touch.mst where we are using Displays, Rotarypush, Rotary, and Faders for FX mapping.

```
EWidget DisplayUpper1
	FB_XTouchDisplayUpper 0
EWidgetEnd
```

```
EWidget Fader1
	Fader14Bit e0 7f 7f
	FB_Fader14Bit e0 7f 7f
	Touch 90 68 7f 90 68 00
EWidgetEnd
```

```
EWidget RotaryPush1
	Press 90 20 7f 90 20 00
EWidgetEnd
```

```
EWidget Rotary1 RotaryWidgetClass
	Encoder b0 10 7f
	FB_Encoder b0 10 7f
EWidgetEnd
```

## ZoneStepSizes and .stp Files
The CSI Support Files now include a "ZoneStepSizes" sub-folder within the Zones folder. These files will be used by CSI in FX Zones to determine which FX Parameters are stepped, how many steps each parameter has, and what the exact step values are. Again, this is another feature meant to simplify FX Zone creation. Once a ZoneStepFile exists for a plugin, it shouldn't need to change (unless the developer adds new automation parameters) and can be shared. The CSI Support Files currently include ZoneFXFiles for almost 500 FX to get users started.

If you'd like to create some .stp files for your own use, you can add the below "AutoScan" line to your CSI.ini. The AutoScan process only attempts to create the .stp files for fx you already have a .zon for. It will not create .stp files for all FX. Note: this is an experimental feature and works better on Mac right now. If you run into issues, I'd encourage you to turn the AutoScan off by commenting out that line. When the AutoScan is complete and ZoneStepSize files created, you should also comment out (with a forward slash) or delete that line in your CSI.
```
Version 2.0

AutoScan

MidiSurface "XTouchOne" 7 9 
MidiSurface "MFTwister" 6 8 
OSCSurface "iPad Pro" 8003 9003 10.0.0.146
OSCSurface "TouchOSCLocal" 8002 9002 10.0.0.100
MidiSurface "CMC-QC" 23 24 

Page "HomePage"
"XTouchOne" 1 0 "X-Touch_One.mst" "X-Touch_One_FB" 
"MFTwister" 8 0 "MIDIFighterTwisterEncoder.mst" "FXTwisterMenu" 
"iPad Pro" 8 0 "FXTwister.ost" "FXTwisterMenu" 
"TouchOSCLocal" 8 0 "FXTwister.ost" "FXTwisterMenu" 
"CMC-QC" 0 0 "Stienberg_CMC-QC-2.mst" "Steinberg_CMC-QC-2" 
```

When a .stp file exists for a plugin, things like the below example are no longer required in FX Zones. CSI will already know the step values and will automatically create a curve for your surface to move through each step if that parameter is assigned to an encoder. 
```
     FXParamStepValues   1    0.0 0.05 0.11 0.16 0.21 0.26 0.32 0.37 0.42 0.47 0.53 0.58 0.63 0.68 0.74 0.79 0.84 0.89 0.95 1.0
```

---

## FILE: FX-Zone-Activation-(FocusedFX,-TrackFXMenu,-SelectedTrackFXMenu,-SelectedTrackFX).md

## Overview: Four Different Activation Methods:
Once you’ve created some fx.zon files, the next step is determining how you want that fx.zon to be activated. CSI offers 4 methods for activating fx zones:

* **FocusedFX:** Opening the GUI in Reaper will cause the plugin to map on your surface. This mode is enabled by default. **Mapping action: ToggleEnableFocusedFXMapping**

* **TrackFXMenu:** You select the plugin you want to activate from a menu on your control surface. TrackFXMenu splays the FX slots out vertically, so imagine an 8-fader surface with displays showing FX Slot 1 on Track 1, FX Slot 1 on Track 2, FX Slot 1 on Track 3, etc. You change FX slots by banking vertically. **Mapping action: GoTrackFXMenu** to activate the zone, **GoFXSlot** to activate the FX mapping.

* **SelectedTrackFXMenu:** Like TrackFXMenu, you select the plugin you want to activate from a menu on your control surface. SelectedTrackFXMenu splays the FX slots of the selected track horizontally. Here, imagine an 8-fader surface with displays. You've got track 3 selected in Reaper. SelectedTrackFXMenu will show FX Slot 1 on Track 3, FX Slot 2 on Track 3, FX Slot 3 on Track 3, etc. spread out across the 8 channels on your surface. If you have more FX on the selected track than you have control surface channels for, you can change FX slots by banking horizontally. **Mapping action: GoSelectedTrackFXMenu** to activate the zone, **GoFXSlot** to activate the FX mapping.

* **SelectedTrackFX:** When this mode is enabled, any fx.zon's on the selected track will become active. This means multiple FX can be mapped at the same time. This is particularly handy for control surfaces with pre-defined layouts like the Softube Console One - or someone seeking to replicate a similar workflow. With this mode, because multiple FX can be activated at once (example: an EQ and a compressor), users would have to be careful when mapping their fx.zon files as to avoid conflicts. **Mapping action: GoSelectedTrackFX**

**Tip:** You can use different FX activation methods on the same surface and use the various mapping actions to dictate which method is activate at any given time. Example: you can have a TrackFXMenu and a SelectedTrackFXMenu that you use a button to switch between, while also having another button toggling FocusedFXMapping as needed.

## FocusedFXMapping
CSI version 2 has FocusedFX mapping enabled by default. This means if you have a fx.zon file for a particular FX/instrument plugin, and open the GUI in Reaper, that mapping will become activated on your surface by default. You can toggle this behavior off and on by assigning a button to the ToggleEnableFocusedFXMapping action as shown below:
```
   SomeButton     ToggleEnableFocusedFXMapping
```

But what if you don't want FocusedFXMapping on by default?  Since the default toggle state is "on", you can add "OnInitialization ToggleFocusedFXMapping" to your Home.zon to toggle the state to off when CSI starts up as shown in the example below:
```
Zone Home
OnInitialization ToggleEnableFocusedFXMapping
    IncludedZones
        "Buttons"
        "Track"
        "MasterTrack"
    IncludedZonesEnd
    AssociatedZones
       "SelectedTrackFXMenu"
       "SelectedTrackSend"
       "SelectedTrackReceive"
       "TrackFXMenu"
       "TrackSend"
       "TrackReceive"
    AssociatedZonesEnd
ZoneEnd
```

## TrackFXMenu
TrackFXMenu is is best used when you have a multi-channel control surface and want to see the one FX Slot at a time for each different channel of the surface. Example: you have an 8 channel MCU type device. Using the TrackFXMenu will show you FXMenu Slot #1 for channels 1-8. If you want to see the FX loaded in FXMenu Slot #2, you will use TrackFXMenuBank action to navigate to the next slot, at which point, you'll be looking at FXMenu Slot #2 for channels 1-8. 

For TrackFXMenu to work, you first need a dedicated TrackFXMenu.zon in your Surface folder. The zone name must be TrackFXMenu and cannot be customized. Here is a typical TrackFXMenu you might use on a MCU-style device.
```
Zone "TrackFXMenu"
    DisplayLower|         FXMenuNameDisplay
    Rotary|               NoAction
    RotaryPush|           GoFXSlot
    Mute|                 ToggleFXBypass
    Up                    TrackFXMenuBank -1
    Down                  TrackFXMenuBank 1

    RecordArm|            NoAction
    Solo|                 NoAction
    Select|               NoAction
ZoneEnd
```
The key things to call out here is that we are using the **FXMenuNameDisplay** action to show the name of the plugin (or the alias if one exists) on the control surface and the **GoFXSlot** action is assigned to the corresponding RotaryPush to actually activate the FX. The **TrackFXMenuBank** actions are used to bank between the different FX slots.

## How to activate the TrackFXMenu.zon
Next you need to decide if you want the TrackFXMenu to be called up as needed, and therefore as part of an Associated Zone, or if you want to include it directly in your Home.zon. If you're using a MCU-style device, the most common usage will be to call it up as-needed as part of an AssociatedZone. If you're using more of a Mackie C4-style device, you may want to include the FXMenu in your Home zone. I will show how to setup both options below.

### TrackFXMenu as an AssociatedZone
If you want to use a button to call up the TrackFXMenu as-needed, you need to first define that TrackFXMenu zone as an AssociatedZone in your Home.zon file. Here's an example of what that might look like.
```
Zone Home
    IncludedZones
        "Buttons"
        "Track"
        "MasterTrack"
    IncludedZonesEnd
    AssociatedZones
       "TrackFXMenu"
    AssociatedZonesEnd
ZoneEnd
```

Next, you would need to include the GoTrackFXMenu action in your Buttons.zon as shown below. GoTrackFXMenu acts as a toggle, so pressing it once will activate the TrackFXMenu zone and a second press will exit that zone. Additionally, if you're using a surface+widget that supports feedback, a light will appear when this zone is active.
```
Zone "Buttons"
    Busses                      GoTrackFXMenu
ZoneEnd
```

### TrackFXMenu as part of your Home.zon
If you prefer to have TrackFXmenu on whenever you're in your Home Zone, no additional button will be required to activate the TrackFXMenu zone. You just need to be sure TrackFXMenu exists as an IncludedZone in your Home.zon as shown below.
```
Zone Home
    IncludedZones
        "Buttons"
        "Track"
        "TrackFXMenu"
        "MasterTrack"
    IncludedZonesEnd
ZoneEnd
```

## SelectedTrackFXMenu
SelectedTrackFXMenu is is best used when you have a multi-channel control surface and want to see the FX of the selected channel splayed out horizontally on your surface. Example: you have an 8-channel MCU type device. Using a SelectedTrackFXMenu zone will allow you to control up to 8 FXMenus from the selected channel on each of the surface's channels. 

For SelectedTrackFXMenu to work, you first need a dedicated SelectedTrackFXMenu.zon in your Surface folder. The zone name must be SelectedTrackFXMenu and cannot be customized. Here is a typical SelectedTrackFXMenu you might use on a MCU-style device.
```
Zone "SelectedTrackFXMenu"
     DisplayUpper|    FXMenuNameDisplay
     DisplayLower|    FXBypassedDisplay
     Rotary|          NoAction
     RotaryPush|      GoFXSlot
     RotaryPush|      Reaper "_S&M_FLOATFX|"          // Floats the FX window, use "_S&M_SHOWFXCHAIN|" insteead if you prefer the FX chain window
     Mute|            ToggleFXBypass
     Left             SelectedTrackFXMenuBank -1
     Right            SelectedTrackFXMenuBank 1

     RecordArm|       NoAction
     Solo|            NoAction
     Select|          NoAction
ZoneEnd
```
The key things to call out here is that we are using the **FXMenuNameDisplay** action to show the name of the plugin (or the alias if one exists) on the control surface and the **GoFXSlot** action is assigned to the corresponding RotaryPush to actually activate the FX. The **SelectedTrackFXMenuBank** actions are used to bank between the different FX slots. Additionally, I've added an SWS extension action to actually open the plugin GUI when the FX is activated. If you don't want this behvaior, you can remove that line. Note: that action only works on a SelectedTrackFXMenu zone and not on TrackFXMenu.

## How to activate the SelectedTrackFXMenu.zon
Next you need to decide if you want the SelectedTrackFXMenu to be called up as needed, and therefore as part of an Associated Zone, or if you want to include it directly in your Home.zon. If you're using a MCU-style device, the most common usage will be to call it up as-needed as part of an AssociatedZone. If you're using more of a Mackie C4-style device, you may want to include the FXMenu in your Home zone. I will show how to setup both options below.

### SelectedTrackFXMenu as an AssociatedZone
If you want to use a button to call up the SelectedTrackFXMenu as-needed, you need to first define that SelectedTrackFXMenu zone as an AssociatedZone in your Home.zon file. Here's an example of what that might look like.
```
Zone Home
    IncludedZones
        "Buttons"
        "Track"
        "MasterTrack"
    IncludedZonesEnd
    AssociatedZones
       "SelectedTrackFXMenu"
    AssociatedZonesEnd
ZoneEnd
```

Next, you would need to include the GoSelectedTrackFXMenu action in your Buttons.zon as shown below. GoSelectedTrackFXMenu acts as a toggle, so pressing it once will activate the SelectedTrackFXMenu zone and a second press will exit that zone. Additionally, if you're using a surface+widget that supports feedback, a light will appear when this zone is active.
```
Zone "Buttons"
    AudioTracks                 GoSelectedTrackFXMenu
ZoneEnd
```

### SelectedTrackFXMenu as part of your Home.zon
If you prefer to have SelectedTrackFXmenu on whenever you're in your Home Zone, no additional button will be required to activate the SelectedTrackFXMenu zone. You just need to be sure SelectedTrackFXMenu exists as an IncludedZone in your Home.zon as shown below.
```
Zone Home
    IncludedZones
        "Buttons"
        "Track"
        "SelectedTrackFXMenu"
        "MasterTrack"
    IncludedZonesEnd
ZoneEnd
```

## SelectedTrackFX
SelectedTrackFX is designed to automatically call up any FX.zon's simply by selecting a track in Reaper. This is especially useful for surface's like Softube's Console One or any other surface where you always want one or more track FX mapped to specifics widgets on your hardware. The key to making this approach work is pre-planning because you want to avoid the types of conflicts that could occur if you have two or more FX on the selected channel mapped to the same widget on your control surface. But if you're using a Channel Strip plugin on every channel and want specific EQ or compressor settings to automatically map to your control surface, this may be the approach for you.

You have one of two options for activating SelectedTrackFX: 1) assigning GoSelectedTrackFX to a button, or 2) assigning GoSelectedTrackFX to automatically map on Track Selection. I'll show both methods below.

Mapping SelectedTrackFX to a button is as simple as:
```
Zone "Buttons"
     F1     GoSelectedTrackFX
ZoneEnd
```

If you'd prefer to have that automatically occur whenever you select a track in Reaper, add this action to your Home.zon like this:
```
Zone "Home"
OnInitialization        ToggleEnableFocusedFXMapping 
OnTrackSelection 	GoSelectedTrack
OnTrackSelection 	GoSelectedTrackFX
        AssociatedZones
           "SelectedTrack"
        AssociatedZonesEnd
ZoneEnd
```
Note: in the above example how I'm using OnInitilization ToggleEnableFocusedFXMapping to turn off FcusedFXMapping by default. 

Just to illustrate an example using Softube's Console One for instance, one could have a SelectedTrack zone assigning some of the widgets to your surface to the selected track's controls in Reaper...
```
Zone "SelectedTrack"
	InputMeterLeft 		TrackOutputMeter "0"
	InputMeterRight		TrackOutputMeter "1"
	OutputMeterLeft 	TrackOutputMeter "0"
	OutputMeterRight	TrackOutputMeter "1"
	Volume 			TrackVolume
	Control+Volume 		TrackPanWidth	"1"
	Shift+Volume 		TrackPan 	"0"
	Option+Volume 		FocusedFXParam
	Mute 			TrackMute
	Solo 			TrackSolo
ZoneEnd
```

...while also having a "compressor" map active on different widgets...
```
Zone "VST: UAD Teletronix LA-2A Silver (Universal Audio, Inc.)" "LA2ASlv"
	Threshold 		FXParam "0"
	Output	 		FXParam "1"
	Meter 			FXParam "4"
	Attack 			FXParam "3"
	Ratio 			FXParam "2"
	InvertFB+Compressor 	FXParam "6" "Bypass" [ 0.0 1.0 ]
	WetDry			FXParam "7"
ZoneEnd
```

...at the same time as an EQ map on even different widgets...
```
Zone "VST: UAD Pultec EQP-1A (Universal Audio, Inc.)" "EQP1A"
	HiGain 			FXParam "7" "HF Atten"
	HiFrequency 		FXParam "6" "HF Atten Freq"
	HiMidGain 		FXParam "4" "HF Boost"
	HiMidFrequency 		FXParam "3" "High Freq"
	HiMidQ 			FXParam "5" "HF Q"
	LoMidGain 		FXParam "2" "LF Atten"
	LoMidFrequency 		FXParam "0" "Low Freq"
	LoGain 			FXParam "1" "LF Boost"
	LoFrequency 		FXParam "0" "Low Freq"
	InvertFB+Equalizer	FXParam "10" "Bypass" [ 0.0 1.0 ]
	Parallel 		FXParam "11" "Wet"
ZoneEnd
```

...and everything works in tandem as long as there are no conflicting widget assignments and there's one track selected in Reaper.

## Unmapping FX zones
Now that you've got your fx.zon activated, what is the right way unmap/deactivate that fx.zon?

* **FocusedFX:** Simply unfocus the FX in question in Reaper. Note: if you unfocus an FX then refocus the same FX, CSI may not pick it up the second time. You may need to focus another FX first.

* **TrackFXMenu:** Unmapping actions are either **GoTrackFXMenu** or **GoHome** depending on whether you are trying to return to the FX menu or trying to return to the Home zone.

* **SelectedTrackFXMenu:** Unmapping actions are either **GoSelectedTrackFXMenu** or **GoHome** depending on whether you are trying to return to the FX menu or trying to return to the Home zone.

* **SelectedTrackFX:** Select another track or deselect the track. 

---

## FILE: FX-Parameter-Mapping-Actions.md

CSI allows you to map plugin parameters to your control surface. See [[FX-and-Instrument-Mapping]] for details on how to create a .zon file for your effect or instrument (they're called FX zones, but work equally well for instruments). You'll also want to see [[Finding FXParam Numbers|FX-and-Instrument-Mapping#finding-fxparam-numbers]] for a quick and easy to way to get the FX Param # that you'll need for the mapping. 

## FX Action List
* [[FXParam|FX Parameter Mapping Actions#FXParam]] 
* [[FXNameDisplay|FX Parameter Mapping Actions#FXParamValueDisplay]] 
* [[FXParamNameDisplay|FX Parameter Mapping Actions#FXParamNameDisplay]] 
* [[FXParamValueDisplay|FX Parameter Mapping Actions#FXParamValueDisplay]] 
* [[FXMenuNameDisplay|FX-Parameter-Mapping-Actions#fxmenunamedisplay]]
* [[FocusedFXParam|FX Parameter Mapping Actions#focusedfxparam]]
* [[FocusedFXParamNameDisplay|FX Parameter Mapping Actions#focusedfxparamnamedisplay-and-focusedfxparamvaluedisplay]]
* [[FocusedFXParamValueDisplay|FX Parameter Mapping Actions#focusedfxparamnamedisplay-and-focusedfxparamvaluedisplay]]
* [[ToggleEnableFocusedFXMapping|FX Parameter Mapping Actions#ToggleEnableFocusedFXMapping]]
* [[ToggleEnableFocusedFXParamMapping|FX Parameter Mapping Actions#ToggleEnableFocusedFXParamMapping]]
* [[ToggleFXBypass|FX Parameter Mapping Actions#ToggleFXBypass]]
* [[FXBypassDisplay|FX Parameter Mapping Actions#FXBypassDisplay]]
* [[ToggleFXOffline|FX Parameter Mapping Actions#togglefxoffline-fxofflinedisplay]]
* [[FXOfflineDisplay|FX Parameter Mapping Actions#togglefxoffline-fxofflinedisplay]]
* [[FXGainReductionMeter|FX Parameter Mapping Actions#FXGainReductionMeter]]
* [[GoFXSlot|FX-Parameter-Mapping-Actions#gofxslot]]

## FXParam
FXParam is the CSI action to control a plugin parameter. Let's say we've followed the steps in  [[Finding FXParam Numbers|FX-and-Instrument-Mapping#finding-fxparam-numbers]] and we can see that ReaComp's parameter list looks something like this...

```
Zone "VST: ReaComp"
	FXParam 0 "Thresh"
	FXParam 1 "Ratio"
	FXParam 2 "Attack"
	FXParam 4 "Release"
...
ZoneEnd
```

If you want to map these first four parameters to the first four rotary knobs on your surface, you'd use the following syntax (in this case my widget names are RotaryA1 through A4, yours may vary):
```
Zone "VST: ReaComp"
RotaryA1      FXParam 0
RotaryA2      FXParam 1
RotaryA3      FXParam 2
RotaryA3      FXParam 4
ZoneEnd
```

Alternatively, if you wanted to include the names (not as displays, that's coming in the next section, but just for easy reference) this is also acceptable...
```
RotaryA1 FXParam 0 "Thresh"
RotaryA2 FXParam 1 "Ratio"
RotaryA3 FXParam 2 "Attack"
RotaryA3 FXParam 4 "Release"
```

...as is this method (using trailing comments)...
```
RotaryA1 FXParam 0 //Thresh
RotaryA2 FXParam 1 // Ratio
RotaryA3 FXParam 2 // Attack
RotaryA3 FXParam 4 // Release
```

## FXParamNameDisplay
If you wanted to add in the name of the the Parameter to the corresponding display, that would look like this...
```
DisplayUpperA1 FXParamNameDisplay 0 "Thresh"
RotaryA1 FXParam 0
DisplayUpperA2 FXParamNameDisplay 1 "Ratio"
RotaryA2 FXParam 1
DisplayUpperA3 FXParamNameDisplay 2 "Attack"
RotaryA3 FXParam 2
DisplayUpperA3 FXParamNameDisplay 3 "Release"
RotaryA3 FXParam 4
```

## FXParamValueDisplay
And if you wanted to use one of your displays to show the actual parameter value (e.g. "32ms" or "220hz") on your displays, there is a CSI action for that as well. Combining all three examples together you'd end up with the following:

``` 
DisplayUpperA1 FXParamNameDisplay 0 "Thresh"
DisplayLowerA1 FXParamValueDisplay 0 
RotaryA1 FXParam 0
/
DisplayUpperA2 FXParamNameDisplay 1 "Ratio"
DisplayLowerA2 FXParamValueDisplay 1 
RotaryA2 FXParam 1
/
DisplayUpperA3 FXParamNameDisplay 2 "Attack"
DisplayLowerA3 FXParamValueDisplay 2 
RotaryA3 FXParam 2
/
DisplayUpperA4 FXParamNameDisplay 3 "Release"
DisplayLowerA4 FXParamValueDisplay 3 
RotaryA4 FXParam 4
```

You may notice in the above example I broke up each set of widgets with an empty row with a single / character. This essentially "comments out" the empty line, but will make your .zon file easier to read and troubleshoot later on, so I recommend this as a best practice when grouping together multiple widgets for a single FX parameter. 

## FXNameDisplay
If you want your display to show the FX Name, you could simply add a line to one of your display widgets such as:
```
DisplayUpperA1 FXNameDisplay
```

Which would display on your surface (continuing the example from above with ReaComp):
```
VST: ReaComp (Cockos)
```

## FXMenuNameDisplay
FXMenuNameDisplay is typically used in TrackFXMenu and SelectedTrackFXMenu zones to show the name of the FX loaded into the corresponding FX slot. If there is a plugin alias in the fx.zon file, it will display the alias. Otherwise, it will display the full plugin name from the first line of the zone file, including the plugin format and any vendor information. It's recommended that users create a plugin alias when creating fx.zon files for this reason. See [[FX and Instrument Mapping]] for more details.

If there is no fx.zon for the corresponding FX in the slot. CSI will show "NoMap" on the display.
```
Zone "TrackFXMenu"
        DisplayUpper|       	FXMenuNameDisplay
        DisplayLower|           FXBypassDisplay
        Rotary|             	NoAction
        RotaryPush|         	GoFXSlot
	Mute| 			ToggleFXBypass
        Left	            	TrackFXMenuBank -1
        Right	           	TrackFXMenuBank 1
ZoneEnd
```

## GoFXSlot
GoFXSlot is used in TrackFXMenu and SelectedTrackFXMenu zones to activate the FX mapping for the corresponding FX slot. See the example below from a TrackFXMenu where pressing RotaryPush will activate the FX map for the corresponding FX.
```
Zone "TrackFXMenu"
        DisplayUpper|       	FXMenuNameDisplay
        DisplayLower|           FXBypassDisplay
        Rotary|             	NoAction
        RotaryPush|         	GoFXSlot
	Mute| 			ToggleFXBypass
        Left	            	TrackFXMenuBank -1
        Right	           	TrackFXMenuBank 1
ZoneEnd
```

## ToggleFXBypass
Use this action in a SelectedTrackFXMenu or TrackFXMenu zone to assign toggling the FX Slot to a button.
```
Zone "TrackFXMenu"
        DisplayUpper|       	FXMenuNameDisplay
        Rotary|             	NoAction
        RotaryPush|         	GoFXSlot
	Mute| 			ToggleFXBypass
        Left	            	TrackFXMenuBank -1
        Right	           	TrackFXMenuBank 1
ZoneEnd
```

## FXBypassDisplay
If you want to add the FX state ("Enabled" or "Bypass") to the SelectedTrackFXMenu or TrackFXMenu you would utilize the FXBypassDisplay action as shown below:
```
Zone "TrackFXMenu"
        DisplayUpper|       	FXMenuNameDisplay
        DisplayLower|           FXBypassDisplay
        Rotary|             	NoAction
        RotaryPush|         	GoFXSlot
	Mute| 			ToggleFXBypass
        Left	            	TrackFXMenuBank -1
        Right	           	TrackFXMenuBank 1
ZoneEnd
```

## ToggleFXOffline, FXOfflineDisplay
Use ToggleFXOffline to change the FX status to "offline" in Reaper. Offline FX is similar to Bypass, but it removes the plugin from memory and additional processing. In the below example, it's assigned to Shift+Mute. The corresponding display action is FXOfflineDisplay.
```
Zone "SelectedTrackFXMenu"
        DisplayUpper|         FXMenuNameDisplay
        DisplayLower|         FXBypassDisplay
        Shift+DisplayLower|   FXOfflineDisplay
        Rotary|               NoAction
        RotaryPush|           GoFXSlot
        Mute|                 ToggleFXBypass
        Shift+Mute|           ToggleFXOffline
        Left                  SelectedTrackFXMenuBank -1
        Right                 SelectedTrackFXMenuBank 1

        RecordArm|            NoAction
        Solo|                 NoAction
        Select|               NoAction
     Fader|                   NoAction    
ZoneEnd
```

## FocusedFXParam
FocusedFXParam is a CSI action that allows you to assign a control on your surface to the last touched plugin parameter. This can be a very fast way to assign plugin parameters to your surface without having to create an fx.zon in advance. This is very useful for quickly writing automation or tweaking a plugin parameter.

For instance, let's say you already have Fader1 on your surface mapped to track volume of the Selected track, and you want to map Shift+Fader1 the last-touched FX parameter. Your .zon file might look like this...

```` 
Zone "Channel"
        Fader1                  TrackVolume
	Shift+Fader1 		FocusedFXParam
ZoneEnd
````

Now, when you enable the Shift modifier, Fader1 will control the last touched plugin parameter. If you want to change the parameter you're controlling, just use your mouse and move the next plugin parameter. Your surface will update to control the new parameter as long as you're still in Shift mode (or when you next hold down the shift modifier). **Tip:** a quick tap of Shift latches the shift modifier - very handy in this example.

You can also have a FocusedFXParam zone. Example: I have this in my buttons.zon...
```
Zone "Buttons"
     F2                                 ToggleEnableFocusedFXParamMapping   
ZoneEnd
```

Which then calls up this FocusedFXParam.zon.
```
Zone "FocusedFXParam"
     Fader1                             FocusedFXParam
     DisplayUpper1                      FocusedFXParamNameDisplay
     DisplayLower1                      FocusedFXParamValueDisplay
ZoneEnd
````

## FocusedFXParamNameDisplay and FocusedFXParamValueDisplay
As shown in the FocusedFXParam.zon above, let's say our surface has displays and we want the upper display to show the Parameter Name and lower display to show the parameter value whenever the FocusedFXParam zone is active. The FocusedFXParamNameDisplay and FocusedFXParamValueDisplay actions are designed to do just that. 

```` 
Zone "FocusedFXParam"
     Fader1                             FocusedFXParam
     DisplayUpper1                      FocusedFXParamNameDisplay
     DisplayLower1                      FocusedFXParamValueDisplay
ZoneEnd
```` 

## FXParamRelative
FXParamRelative uses the value from the controller as a delta and adds it to the current parameter value. If the value is negative, that amounts to subtracting it from the current parameter value.

```
SomeWidget    FXParamRelative 4
```

## FXGainReductionMeter
A small handful of plugins (I believe VST3) will report Gain Reduction values to the host, allowing you to see how much compression (for example) is taking place. If the plugin supports this, you can assign this to a widget in CSI.

```
VUMeter        FXGainReductionMeter   
```

## ToggleEnableFocusedFXMapping
CSI version 2 will have FocusedFX mapping enabled by default. This means if you have a fx.zon file for a particular FX/instrument plugin, and open the GUI in Reaper, that mapping will become activated on your surface by default. You can toggle this behavior off and on by assigning a button to the ToggleEnableFocusedFXMapping action as shown below:
```
   SomeButton     ToggleEnableFocusedFXMapping
```

But what if you don't want FocusedFXMapping on by default?  Since the default toggle state is "on", you can add "OnInitialization ToggleFocusedFXMapping" to flip it to off when CSI starts up as shown below:
```
Zone Home
OnInitialization ToggleEnableFocusedFXMapping
OnInitialization Broadcast Home SelectedTrackSend SelectedTrackReceive SelectedTrackFXMenu TrackSend TrackReceive TrackFXMenu
OnInitialization Receive Home SelectedTrackSend SelectedTrackReceive SelectedTrackFXMenu TrackSend TrackReceive TrackFXMenu
    IncludedZones
        "Buttons"
        "Track"
        "MasterTrack"
    IncludedZonesEnd
    AssociatedZones
       "SelectedTrackFXMenu"
       "SelectedTrackSend"
       "SelectedTrackReceive"
       "TrackFXMenu"
       "TrackSend"
       "TrackReceive"
    AssociatedZonesEnd
ZoneEnd
```

## ToggleEnableFocusedFXParamMapping
Another feature of CSI is the ability to have the last touched (or "focused") FX parameter automatically mapped to a widget. This behavior can be toggled off and on using the ToggleEnableFocusedFXParamMapping action.

Example: you may have this assigned to a button such as:
```
Zone "Buttons"
    User                        ToggleEnableFocusedFXParamMapping
ZoneEnd
```

Then have a fader or widget or even a whole SubZone assigned to the Focused FX Param.
```
Zone "FocusedFXParam"
     Fader1                             FocusedFXParam
     DisplayUpper1                      FocusedFXParamNameDisplay
     DisplayLower1                      FocusedFXParamValueDisplay
     F2                                 LeaveSubZone
ZoneEnd
```


---

## FILE: Broadcast-and-Receive.md

CSI has Broadcast and Receive actions designed to allow for keeping multiple surfaces in sync with one another. Without these Broadcast and Receive messages, each surface would operate independently (except for [[Modifiers|Modifiers]], which are global). But with Broadcast/Receive actions, you can dictate exactly how these different surfaces talk to each other.

For example: you may want a "GoHome" on one surface to send one or more additional surfaces to their respective Home zones also. Or maybe you want to use an FX Menu on one surface to map the FX on another surface. You could even set both surfaces to broadcast and receive simultaneously if you wanted to keep say an OSC surface used for displays in sync with zone changes on a MIDI surface you used for hardware controls. 

**Note:** The Broadcast/Receive status of SelectedTrackFXMenu and TrackFXMenu will dictate whether or not the GoFXSlot action is broadcast and received. Similarly, the Broadcast/Receive status of TrackSend, TrackReceive, and TrackFXMenu, will also dictate what happens to the respective banking actions for those zone types. 

Lets look at some examples on how to set this up...

## Example 1: Using Broadcast and Receive Actions for GoHome messages
Let's say I want to broadcast any GoHome changes in surface #1 to surface #2, so that when I go "Home" on suface #1, surface #2 follows along.

First, we have to tell one surface that "when CSI initializes, this surface will broadcast GoHome changes." We do that in our home.zon of surface #1 using a combination of the OnInitialization [virtual widget](https://github.com/GeoffAWaddington/reaper_csurf_integrator/wiki/Virtual-Widgets), with the Broadcast Home action. So the home.zon for surface 1 would look something like this:

```
Zone "Home"
OnInitialization Broadcast Home 
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd
```

Then, in surface #2, we'd need to express the message that "when CSI initializes, you should receive any broadcasted GoHome messages." We do that very similarly; using the OnInitialization virtual widget but this time we're going to use the Receive Home CSI action. So surface #2 would have a home.zon that might look like this:

```
Zone "Home"
OnInitialization Receive Home
    IncludedZones
          "Channel"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
    IncludedZonesEnd
ZoneEnd  
```

## Example 2: Using Broadcast and Receive Actions to Keep Two Surfaces in Sync
What if you want two-way communication between two surfaces to make sure they stay in sync? Can you use both Broadcast and Receive actions in the same surface? Yes you can!

I use a TouchOSC setup running on my iPad to mirror my MIDI Fighter Twister hardware and use the same set of zone files on both devices. So in this use case, I want to make sure that regardless of what surface I'm using for controls at the time, that any zone changes or mapping of the FXMenu stay in sync across both devices. So if I map an FX using the GoFXSlot action using the TouchOSC device or the MIDI Fighter Twister, that mapping action gets broadcast and received regardless of which device initiated the action.

Another key point here is that you only need one "OnInitialization Broadcast" row and one "OnInitialization Receive" row per surface with all of the broadcast/receive types listed out after. This is what the home.zon file for this setup would look like:

```
Zone "Home"
OnInitialization Broadcast Home SelectedTrackFXMenu SelectedTrackSend SelectedTrackReceive
OnInitialization Receive   Home SelectedTrackFXMenu SelectedTrackSend SelectedTrackReceive
     IncludedZones
          "SelectedTrack"
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd
```


## Broadcast and Receive Action List
The list of broadcast and receive actions is as follows:

```
* Broadcast
* Receive
* Home
* SelectedTrack
* SelectedTrackFXMenu
* TrackFXMenu
* SelectedTrackSend
* TrackSend
* SelectedTrackReceive
* TrackReceive
```

---

## FILE: Message-Generators.md

Message Generators allow you to define what MIDI messages the surface sends to CSI. The following types of Message Generators exist in CSI, and which you use will depend on the type of control and your surface:

* [[Press|Message-Generators#press]] - a simple generator that sends a single MIDI message on press, and optionally sends another message when released. Often, but not limited to, a button.
* [[AnyPress|Message-Generators#anypress]] - a variation of Press needed for some devices. 
* [[Fader7Bit|Message-Generators#fader7bit]] - sends a MIDI message in a range specifying the current absolute value of the control. Used for faders and knobs with defined start and points.
* [[Fader14Bit|Message-Generators#fader14bit]] - like Fader7Bit, but has a larger (or more fine grained) set of values.
* [[Control|Message-Generators#control]] - used for OSC controls
* [[Encoders|Message-Generators#encoders]] - unlike the Faders, an Encoder sends a relative value (increase/decrease) 
* [[MFTEncoder|Message-Generators#mftencoder]] - a special encoder only found on the MIDI Fighter Twister controller
* [[Encoder7Bit|Message-Generators#encoder7bit]] - another special encoder for the X-Touch Compact and X-Touch Mini.
* [[MotorizedFaderWithoutTouch|Message-Generators#motorizedfaderwithouttouch]] - added for the Behringer X32/xAir/MIDAS series consoles which have motirized faders with no touch sensitivity


## Widgets
If you need to define a new .mst file, because one does not exist for your surface, the general idea here is to use the Reaper action **CSI Toggle Show Raw Input from Surfaces** to observe what values are sent when each control is manipulated. So for example, when I press one of the buttons on my controller, I see this:

```
IN <- XTouchOne 90  5b  7f 
IN <- XTouchOne 90  5b  00 
```

The first line showed up when I pressed, the second one when I let go, so a reasonable assumption is the MIDI Generator in my widget should be:

```
Press 90 5b 7f 90 5b 00
```

You would then define the syntax in the .mst file by using the following syntax
```
Widget [Name Of Control]
     [Message GeneratorType] [Message Generator Address]
WidgetEnd
```

..and you'd repeat that for each control

Simple example:
```
Widget Play
	Press 90 5e 7f
WidgetEnd
```

If you plan on using a control for FX mapping in the future (example: faders, encoders, buttons), you should also be aware of [[Ewidgets|FX-and-Instrument-Mapping#ewidget-or-eligible-widgets]]. 

# Press
Press is typically used for message generators that send a message when pressed, and optionally send another message when released. 

Defined using the following syntax:     
````Press 90 5e 7f 90 5e 00````      

where:
* 90 5e 7f is the message sent when the widget is pressed
* 90 5e 00 is the message sent when the widget is released (optional)

However, we still need to name our widget. So lets presume this is a Play button. In our .mst file, that widget would look like this:
```
Widget Play
	Press 90 5e 7f
WidgetEnd
```

The Play Widget has been declared without a Release message -- by far the most common definition type.

Here is an example of a button with a release message.
````
Widget Shift
	Press 90 46 7f 90 46 00
WidgetEnd
````

The Shift Widget has been declared with a Release message -- good for Buttons you plan to use for Shift/Option/Control/Alt, etc. or if you wish to use the "Hold" modifier.

**Tip:** if your surface creates release messages, include them in your .mst file. It's better to have release messages and not need them, then need them and not have them.

For information on how to assign buttons using Press widgets to toggles and stepped parameters in a Zone file, see [Stepped Params and Toggles.](https://github.com/GeoffAWaddington/CSIWiki/wiki/Stepped-Parameters-and-Toggles)

## Using Press for jogwheels (Legacy)
Jogwheels can now be defined using a single Encoder widget, but there may be instances where you still want to use the legacy approach of defining each jogwheel message as a press and have different widgets for clockwise (CW) and counter-clockwise (CCW) turns which can then be assigned to different actions in your CSI zone files. See the example below from a typical MCU device:
```
Widget JogWheelRotaryCW
	Press b0 3c 01
WidgetEnd

Widget JogWheelRotaryCCW
	Press b0 3c 41
WidgetEnd
```

# AnyPress
AnyPress is Message Generator for use with surfaces whose buttons alternate between a press message (7f) on press, and on second press, a release message (00). Use AnyPress widgets for these types of surfaces. 
```
Widget Solo1
    AnyPress   90 2e 7f
WidgetEnd
```

This can also be used for OSC devices that may require an AnyPress widget (this was added to support the Behringer X32/Midas series). 
```
Widget Solo1
    AnyPress  /solosw/01
WidgetEnd
```

In case you're still not sure about when to use Press versus AnyPress, try this:

1. Run the Reaper Action "CSI Toggle Show Input from Surfaces"
2. Press the button on your surface once

**Result:**

If you see two messages like 90 2e 7f and 90 2e 00, then use a Press widget.

If you only see one message like 90 2e 7f, then press the button a second time...

* If the next message is also 90 2e 7f, then use a Press widget with a single message defined.

* If the next message is 90 2e 00, then you should use an AnyPress widget.

# Fader7Bit
A Message Generator that represents a control that measures its current position using a 7bit value (ie. 128 possible values). While the name includes the word "Fader" this type of message would be used for both faders AND knobs with absolute values (i.e. a knob with a defined start and end location).

An example of a Fader7Bit widget with feedback would look like this:

```
Widget RotaryA1
     Fader7Bit b0 21 7f
     FB_Fader7Bit b0 21 7f
WidgetEnd
```

A message will be sent between b0 09 00 and b0 09 7f representing the current position of the fader.

When trying to decide if a Surface control should be represented using Fader7Bit or Encoder, look at what values are actually being sent by the Surface. Fader7Bit expects an absolute value, whereas Encoder expects an increment/decrement value.

* Use the Reaper Action "CSI Toggle Show Input from Surfaces" to see what's actually being sent.   
* If you see a single value being sent when you turn the control clockwise and another when the control is turned anti-clockwise, go with Encoder.  
* If you see a full range of values (from 00 to 7f or vice versa) sent when you turn the control (increasing in one direction, decreasing in the other) go with Fader7Bit.

# Fader14Bit
A Message Generator that represents a control that measures its current position using a 14-bit value (ie. 16384 possible values). 

It's defined using the following syntax:     
```
Widget Fader1
	Fader14Bit e0 7f 7f
	FB_Fader14Bit e0 7f 7f
WidgetEnd
```
A message will be sent between e0 00 00 and e0 7f 7f representing the current position of the fader.

**Note:** To adjust the fader range in Reaper to match the motorized fader range on your hardware, go to Reaper's **Preferences -> Appearance -> Track Control Panels** and set the "Volume fader range" to match the maximum value on your hardware fader.

## Adding Touch Messages
If your control surface supports "Touch" messages for faders and encoders, these should also be defined in the widget as shown in the example below:

```
Widget Fader1
	Fader14Bit e0 7f 7f
	FB_Fader14Bit e0 7f 7f
	Touch 90 68 7f 90 68 00
WidgetEnd
```

In this example, touching Fader1 generates a message of 90 68 7f, and releasing Fader1 generates a second message of 90 68 00. 

# Control
The Message Generator titled simple 'Control' exists for OSC devices where a control is being defined in an .ost file. Example: here is what a touch-sensitive fader with feedback may look like in an OSC surface. You see Control followed by the OSC address of the fader, and corresponding rows for feedback and touch.
```
Widget Fader1
	Control /Mixer/Fader1
	FB_Processor /Mixer/Fader1
	Touch /Mixer/Fader1/z
WidgetEnd
```

# Encoders
Encoders are typically referred to as "Endless Rotary" knobs or "Relative Encoders" (i.e. knobs with no absolute begin and end positions). While CSI typically requires the use of [[Fader7Bit|Message-Generators#fader7bit]] widgets for traditional rotary knobs that communicate absolute start and end values, Encoders are different in that they communicate a relative change in value (i.e. it sends one value or one set of values when it is increasing and one when it is decreasing).

One large benefit of encoders versus traditional Rotary knobs that would use a [[Fader7Bit|Message-Generators#fader7bit]] widget, is that encoders typically allow for much higher resolution than 7bit MIDI.

In order to support the widest possible range of hardware encoders, CSI now allows users to customize which values their encoders transmit as well as define acceleration ranges for encoders that support it. EncoderPlain and EncoderPlainReverse are available if your surface has no acceleration.

## Encoder Types

### MCU Encoder
Here's an example of a typical MCU **Encoder** widget in CSI.
```
Widget Rotary1
	Encoder b0 10 7f
	FB_Encoder b0 10 7f
WidgetEnd
```

Note: see the section regarding [[Default Encoder Customization]] section for instructions on how to cut down on the required syntax in your .mst files for the encoder acceleration steps.  

### Non-MCU Encoders, no acceleration
Use this syntax only if your hardware encoder transmits a single-value for clockwise and counter-clockwise turns. Because each surface may be different, replace the "41" and "01" messages with the correct values for your hardware.

In this example, the hardware encoder only transmits a value of 41 when rotated counter-clockwise (decrement, as noted by the < symbol), and only transmits a value of 01 when being rotated clockwise (increment, as noted by the > symbol). 
```
Widget Rotary1
	Encoder b0 10 7f [ < 41 > 01 ]
	FB_Encoder b0 10 7f
WidgetEnd
```

Note: see the section regarding [[Default Encoder Customization]] section for instructions on how to cut down on the required syntax in your .mst files for the encoder acceleration steps.  

### Encoders with discrete acceleration steps
Use this syntax when surface transmits different acceleration values for increment (CW) and decrement (CCW) turns. However, your surface may skip values (notice 48 and 49 are missing as are 08 09).
```
Widget Rotary1
	Encoder b0 10 7f [ < 41 42 43 44 45 46 47 4a > 01 02 03 04 05 06 07 0a ]
	FB_Encoder b0 10 7f
WidgetEnd
```

Note: see the section regarding [[Default Encoder Customization]] section for instructions on how to cut down on the required syntax in your .mst files for the encoder acceleration steps.  

### Encoders with a continuous acceleration range
Use this syntax when your encoder transmits a continuous range of acceleration values between a defined start and end range with no breaks or jumps in the data. 

```
Widget Rotary1
	Encoder b0 10 7f [ < 41-4a > 01-0a ]
	FB_Encoder b0 10 7f
WidgetEnd
```

Note: see the section regarding [[Default Encoder Customization]] section for instructions on how to cut down on the required syntax in your .mst files for the encoder acceleration steps.  

### MFTEncoder
The MIDI Fighter Twister by DJ Tech Tools can be configured to work as an Encoder with **Velocity Acceleration**. However, because it uses a non-standard set of values when turning the knob clockwise and counter-clockwise, a special widget was developed for the MIDI Fighter Twister. The correct syntax for a MFTwister encoder is shown below, including the full set of acceleration steps when using the Velocity Sensitive encoder setting. As you can see, there are 11 acceleration levels in each direction.

```
Widget RotaryA1
	MFTEncoder b0 00 7f [ < 3f 3e 3d 3c 3b 3a 39 38 36 33 2f > 41 42 43 44 45 46 47 48 4a 4d 51 ]
	FB_Fader7Bit b0 00 00
WidgetEnd
```

Note: see the section regarding [[Default Encoder Customization]] section for instructions on how to cut down on the required syntax in your .mst files for the encoder acceleration steps.  

### Encoder7Bit
Encoder7Bit exists because some encoders, like those in the X-Touch Compact and X-Touch Mini devices, can be configured as [absolute] rotary knobs that continue to send messages when turned beyond their maximum ranges. The encoders will continue to send 00 messages when at minimum and turned counter-clockwise, and 7f messages when at maximum and turned clockwise. In between, it sends standard absolute MIDI messages for the full 0-127 range. This effectively allows them to function as both traditional knobs and encoders. Use this widget type to enable that behavior.
```
Widget RotaryA1
	Encoder7Bit 	b0 0a 7f
        FB_Encoder      b0 0a 7f
WidgetEnd
```

Thanks to [mschnell](https://forum.cockos.com/member.php?u=60721) for contributing a script that directly led to the development of this message generator.

### MotorizedFaderWithoutTouch
The MotorizedFaderWithoutTouch Message Generator was added to support surfaces like the X32, xAIR, MIDAS series consoles where the faders are motorized but lack touch sensitivity. Below is an example from the BehringerX32.ost file showing how these would be used (note: these are OSC surfaces, not MIDI):
```
Widget MasterFader	
    MotorizedFaderWithoutTouch    /main/st/mix/fader
    FB_Processor                  /main/st/mix/fader
WidgetEnd


Widget Fader1
    MotorizedFaderWithoutTouch    /ch/01/mix/fader
    FB_Processor                  /ch/01/mix/fader
WidgetEnd
```

## Default Encoder Customization
CSI allows you to store default encoder customization curves, as well as default "tick" sizes (the step size for each encoder "tick") in your .mst file rather than being required to define this in each zone file. This approach is recommended to cut down on the complexity required for smooth acceleration curves in FX.zon files, which cuts down on the complexity and the amount of syntax required.

### RotaryWidgetClass and JogWheelWidgetClass
RotaryWidgetClass is designed to help streamline how encoders are defined in .mst files and tell CSI which widgets are encoders. There are multiple elements to how this is used in an .mst file. 

First, by putting the word RotaryWidgetClass after the widget name in the .mst file, you are telling CSI, "this widget belongs in the rotary widget class" (as shown below). In a moment, we'll show you what that allows for.
```
Widget RotaryA1 RotaryWidgetClass
    Encoder b0 00 7f
    FB_Fader7Bit b0 00 00
WidgetEnd
```

The same can be done with your JogWheel using the new JogWheelWidgetClass.
```
Widget JogWheel JogWheelWidgetClass
	Encoder b0 3c 7f
WidgetEnd
```

### Defining "StepSize" for All Encoders in the RotaryWidgetClass
Now that the RotaryWidgetClass and/or JogWheelWidgetClass is defined for our encdoers, we can set the encoder StepSize globally by adding this to the top of the .mst file. This represents how fine the resolution will be for each encoder "tick". A value of 0.001 will be very fine and move parameters one-tenth of one-percent, which is very fine. If you find that resolution a little too fine, resulting in slow encoders, you may have better luck with a value of 0.003 or some other higher value. It will really depend on your hardware surfaces and preferences.

Here is an example from the X-Touch.mst showing both class types, each using a StepSize of 0.003.
```
StepSize
    RotaryWidgetClass   0.003
    JogWheelWidgetClass 0.003
StepSizeEnd
```

The encoders on MIDI Fighter Twister are very sensitive, so I might use a StepSize of 0.001 for that surface.
```
StepSize
    RotaryWidgetClass 0.001
StepSizeEnd
```

### AccelerationValues
Next, we can then remove the Encoder Acceleration step values from each individual widget and just create a global set of acceleration values at the top of the .mst file. The benefit of this approach is that rather than being required to define the Encoder Acceleration in each EZFXZone, CSI can now use a default for all encoders in the RotaryWidgetClass. 

Here we are defining the Decrease values ("Dec") from slowest encoder turns to fastest, and the same for the Increase ("Inc") values. Below that, you will find one encoder acceleration value ("Val") for each encoder acceleration step. The actual values used will depend on what your encoder transmits. The values below are from a MIDI Fighter Twister and my own personal acceleration curve.
```
AccelerationValues
    RotaryWidgetClass Dec 3f     3e    3d    3c    3b    3a    39     38    36    33    2f     
    RotaryWidgetClass Inc 41     42    43    44    45    46    47     48    4a    4d    51
    RotaryWidgetClass Val 0.001  0.002 0.003 0.004 0.005 0.006 0.0075 0.01  0.02  0.03  0.04
AccelerationValuesEnd
```
So in the past, each of my MFTEncoder widgets looked like the this...
```
Widget RotaryA1
	MFTEncoder b0 00 7f [ < 3f 3e 3d 3c 3b 3a 39 38 36 33 2f > 41 42 43 44 45 46 47 48 4a 4d 51 ]
	FB_Fader7Bit b0 00 00
WidgetEnd
```

Now we've got this text at the top of the .mst
```
StepSize
    RotaryWidgetClass 0.001
StepSizeEnd

AccelerationValues
    RotaryWidgetClass Dec 3f     3e    3d    3c    3b    3a    39     38    36    33    2f      
    RotaryWidgetClass Inc 41     42    43    44    45    46    47     48    4a    4d    51
    RotaryWidgetClass Val 0.001  0.002 0.003 0.004 0.005 0.006 0.0075 0.01  0.02  0.03  0.04
AccelerationValuesEnd
```

And the encoder widgets look like this (Note: MFTEncoder has been replaced with the standard Encoder widget since all the instructions are now up top).
```
Widget RotaryA1 RotaryWidgetClass
    Encoder b0 00 7f
    FB_Fader7Bit b0 00 00
WidgetEnd
```

Here is an example from the X-Touch.mst where the step size is 0.003 and the AccelerationValues line up with MCU-style devices.
```
StepSize
    RotaryWidgetClass   0.003
    JogWheelWidgetClass 0.003
StepSizeEnd

AccelerationValues
    RotaryWidgetClass   Dec 41     42    43    44    45    46    47  
    RotaryWidgetClass   Inc 01     02    03    04    05    06    07  
    RotaryWidgetClass   Val 0.0006 0.001 0.002 0.003 0.008 0.04  0.08 

    JogWheelWidgetClass Dec 41     42    43    44    45    46    47  
    JogWheelWidgetClass Inc 01     02    03    04    05    06    07  
    JogWheelWidgetClass Val 0.0006 0.001 0.002 0.003 0.008 0.04  0.08 
AccelerationValuesEnd
```

## Custom Encoder Customization
The below types of customizations can be used where no default customization has been defined, or where you want to override default values.

### Default Range, Default Step Size, Default Acceleration
If you would rather rely on CSI's default values for encoders, just map your FX Parameter or CSI action to your encoder widget exactly like you normally would any CSI action. The full 0.0 to 1.0 parameter range will be used, as will the default CSI delta, with absolutely no acceleration. 

```
Encoder1 FXParam 1 "Attack" 
```

### Custom Parameter Ranges
Now, let's say you do not want to map your encoder to the full range of a particular plugin. Instead, you want to limit the range to only the first 66% of the parameter's full range. Example: you have a compressor with a very wide range of time for attack and release and you've determined only the first two-thirds of the range is usable. You can now limit the parameter ranges in CSI with the below syntax.

```
Encoder1 FXParam 1 "Attack" [ 0.0>0.66 ]
```


### Custom Encoder Tick Size (Custom Delta)
Let's say you don't necessarily want acceleration for a particular parameter, but you do want to tweak how much each encoder tick changes the parameter value (i.e. the delta). You can define how fine or coarse you want each tick of the encoder to be. In this case, we've changed the step size to 0.003 (or .3%).

```
Encoder1 FXParam 1 "Attack" [ (0.003) ]
```

### Custom Acceleration Curves
In this example, we've added a custom acceleration curve. To begin to understand this, consider that all parameters in CSI have a range from 0.0 to 1.0 (except for DB based Actions, but forget those for now). So what we're seeing here is the range of change values (or "deltas") for the encoder acceleration you defined earlier in your widget. The slowest turn will result in a change of 0.001 (.1%) which is very fine, and the fastest turn you defined will result in a step change of 0.1 (or 10%). 

What makes this so powerful is that you can completely adjust these values to fit your preference at a per-parameter basis. 

```
Encoder1 FXParam 1 "Attack" [ (0.001,0.005,0.025,0.05,0.1) ]   
```

### Custom Parameter Range With Custom Step Size
You can even combine the examples above. In this example, we're only using the first two-thirds of the parameter, but we're using our custom-defined step size of 0.003 (or .3%) per encoder tick.

```
Encoder1 FXParam 1 "Attack" [ 0.0>0.66 (0.003) ]
```

### Custom Parameter Range With Acceleration
Here's an example of how to limit the parameter range AND use a custom acceleration curve.

```
Encoder1 FXParam 1 "Attack" [ 0.0>0.66 (0.001,0.0025,0.033,0.05) ]
```

### Mapping Stepped Parameters To Encoders
In this FX zone, there are 3 Character modes, whose parameter values correspond to 0.0, 0.5, and 1.0, there are 10 Ensemble options (which are .1 step apart), and bypass is a simple on/off toggle (either 0.0 or 1.0). So to make this work with our Encoder widgets in an fx.zon file, they need to be mapped in our .zon file as such:

```
Zone "VST: Sonsig Rev-A (Relab Development)"
FocusedFXNavigator
Encoder1 FXParam "3" "Character" [ 0.0 0.5 1.0 ]
Encoder2 FXParam "4" "Ensemble" [ 0.0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0 ]
Encoder3 FXParam "0" "Bypass" [ 0.0 1.0 ]
ZoneEnd
```

### Overriding the Tick Count on Stepped Parameters
When using stepped parameters, you may find that you want to specify more, or fewer, encoder "ticks" to move the parameter to the next defined step. This is great for decreasing (or increasing) the sensitivity of the encoder when combined with stepped parameters. For instance, let's say a very small turn of your encoder is moving your parameter from the minimum to maximum values far too quickly. You may want to slow that down.

In this example, the "(12)" defines the number of encoder ticks (messages) that CSI must receive before it will move to the next parameter step. For example, if you're turning your encoder clockwise, CSI will need to count 12 consecutive increase values before the parameter moves from 0.0 to 0.1. Another 12 increase values will move it from 0.1 to 0.2, and 12 counter-clockwise messages will move it back down from 0.2 to 0.1.

```
Encoder2 FXParam 4 "Ensemble" [ (12) 0.0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0 ]
```

### Using Acceleration With Stepped Parameters
You can even create custom encoder acceleration values to work with stepped parameters. Looking at the below example, we see a list in parenthesis, followed by our traditional stepped parameters outside of the parenthesis. The values in the parenthesis relate to the encoder speed defined in your widget. So the slowest acceleration value will require 20 encoder ticks to move up or down to the next step, and fastest encoder acceleration will require 3 encoder ticks to move to the next parameter. 

```
Encoder1 FXParam  "4" "Ensemble" [ (20,15,12,6,3) 0.0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0 ]
```

Note: if your surface transmits 5 values for acceleration, the list in parenthesis must have the same number of values values as your hardware. So if your encoder transmits 11 acceleration values, the list in parenthesis should be 11 values long, etc. This way the acceleration speed always corresponds to a value produced by the hardware. Copy and paste is your friend.

## Additional Notes

- Some encoders like the MIDI Fighter Twister or Behringer BCR-2000 may require a FB_Fader7Bit processor instead of FB_Encoder to work properly. If you're not getting feedback, or your encoder is otherwise not working, you may want to try FB_Fader7Bit.

- When trying to determine the values, don't pay attention to what is displayed on the plugin's GUI. Example: a decay time of 2.4 seconds will **not** equal a parameter value of 2.4. One trick is to enter Write mode and begin creating automation data for the parameter you're trying to map, then clicking on the nodes and making note of where the parameter steps jump and what their real automation values are (remember: they will be between 0.0 and 1.0).

- When trying to decide if a Surface control should be represented using [[Fader7Bit]] or [[Encoder]], look at what values are actually being sent by the Surface. [[Fader7Bit]] expects an absolute value, whereas [[Encoder]] expects an increment/decrement value.

    *Use the Reaper Action "CSI Toggle Show Input from Surfaces" to see what's actually being sent.*     
    *If you see a single value being sent when you turn the control clockwise and another when the control is turned anti-clockwise, go with Encoder.*    
    *If you see a range of values sent when you turn the control (increasing in one direction, decreasing in the other) go with Fader7Bit.*    

---

## FILE: Feedback-Processors.md

Feedback Processors allow you to define how your Widget will display feedback from CSI to the user. A simple example may be lighting up an LED to indicate the Mute/Solo state of a track. Another may be positioning a motorised fader to the correct position for Track Volume. 

It is important to understand how this works in practice.

Let's say we have a button defined in our [[MST file|Defining Control Surface Capabilities]] that has an LED light to indicate its status.    
```
Widget Mute1 
  Press 90 20 7f
  FB_TwoState 90 20 7f 90 20 00
WidgetEnd
```

Then in our [[Zone file|Defining Control Surface Behavior]], we bind it to our [[TrackMute|Track Actions#TrackMute]] action.     
```
Zone "SelectedTrack"
     Mute1      TrackMute
ZoneEnd
```

Here's the best-case flow of what happens when we press the button on the surface:
* Press the Mute button
* The surface sends the 90 20 7f message to CSI
* CSI attempts to mute the track in Reaper
* CSI then queries Reaper to see if the track is currently muted (eg. if the attempt to mute it worked)
* Assuming it is muted, it then sends the 90 20 7f message back to the surface, instructing it to turn the light on

At some point in the future, the track becomes unmuted (either by pressing the button again as above, or through the Reaper GUI)

* CSI sends the 90 20 00 message back to the surface, instructing it to turn the light off

**Note:** It's important to understand it's not the surface deciding when to turn the light on or off. It's doing it in response to a message from CSI. We don't want the surface managing the state of the buttons, that responsibility belongs to Reaper/CSI.

# Feedback Processors 

* [[FB_TwoState|Feedback-Processors#FB_TwoState]]
* [[FB_Fader14Bit|Feedback-Processors#FB_Fader14Bit]]
* [[FB_Fader7Bit|Feedback-Processors#FB_Fader7Bit]]
* [[FB_Encoder|Feedback-Processors#FB_Encoder]]
* [[FB_Processor|Feedback-Processors#FB_Processor]]*
* [[FB_IntProcessor|Feedback-Processors#FB_IntProcessor]]*
* [[FB_ConsoleOneGainReductionMeter|Feedback-Processors#FB_ConsoleOneGainReductionMeter]]
* [[FB_ConsoleOneVUMeter|Feedback-Processors#FB_ConsoleOneVUMeter]]
* [[FB_MCUDisplayUpper|Feedback-Processors#FB_MCUDisplayUpper]] 
* [[FB_MCUDisplayLower|Feedback-Processors#FB_MCUDisplayLower]] 
* [[FB_MCUXTDisplayUpper|Feedback-Processors#FB_MCUXTDisplayUpper]] 
* [[FB_MCUXTDisplayLower|Feedback-Processors#FB_MCUXTDisplayLower]] 
* [[FB_MCUC4DisplayUpper|Feedback-Processors#FB_MCUC4DisplayUpper]] 
* [[FB_MCUC4DisplayLower|Feedback-Processors#FB_MCUC4DisplayLower]]
* [[FB_MCUAssigmentDisplay|Feedback-Processors#FB_MCUAssigmentDisplay]]
* [[FB_MCUTimeDisplay|Feedback-Processors#FB_MCUTimeDisplay]] 
* [[FB_MCUVUMeter|Feedback-Processors#FB_MCUVUMeter]] 
* [[FB_FaderportRGB|Feedback-Processors#fb_faderportrgb]]
* [[FB_FaderportTwoStateRGB|Feedback-Processors#fb_faderporttwostatergb]]
* [[FB_FP8DisplayUpper|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP16DisplayUpper|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP8DisplayUpperMiddle|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP16DisplayUpperMiddle|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP8DisplayLowerMiddle|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP16DisplayLowerMiddle|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP8DisplayLower|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP16DisplayLower|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP8Display|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FP16Display|Feedback-Processors#faderport8-and-faderport16-displays]]
* [[FB_FPVUMeter|Feedback-Processors#fb_fpvumeter]]
* [[FB_MFT_RGB|Feedback-Processors#fb_mft_rgb]]
* [[FB_NovationLaunchpadMiniRGB7Bit|Feedback-Processors#fb_novationlaunchpadminirgb7bit]]
* [[FB_QConLiteDisplayUpper|Feedback-Processors#qcon-lite-displays]]
* [[FB_QConLiteDisplayUpperMid|Feedback-Processors#qcon-lite-displays]]
* [[FB_QConLiteDisplayLowerMid|Feedback-Processors#qcon-lite-displays]]
* [[FB_QConLiteDisplayLower|Feedback-Processors#qcon-lite-displays]]
* [[FB_QConProXMasterVUMeter|Feedback-Processors#FB_QConProXMasterVUMeter]] 
* [[FB_XTouchDisplayUpper|Feedback-Processors#fb_xtouchdisplayupper]]

*Used for OSC devices.

## FB_TwoState
FB_TwoState is designed to provide feedback to buttons that have only an on or off state. Here's an example of the Mute button on channel 1 of an MCU style device. Notice it consists of a "Press" portion (the message generator for this widget), and also the FB_TwoState portion. The messages that follow are the bytes that are transmitted to control the state.
```
Widget Mute1
	Press 90 10 7f 90 10 00
	FB_TwoState 90 10 7f 90 10 00
WidgetEnd
```

Note: if a button is assigned to a Reaper action, you will only see feedback if the action reports its on/off state to Reaper. You will see this in the Reaper action list where applicable. Otherwise, a light may appear in a constant on or off state. This is not a bug in CSI.

## FB_Fader14Bit
Use this feedback processor for 14-bit motorized faders, such an MCU-style device, or any other MIDI control surface with 14-bit knobs or faders. Below is an example of a touch-sensitive 14-bit fader that you'd see in an MCU-style device.
```
Widget Fader1
	Fader14Bit e0 7f 7f
	FB_Fader14Bit e0 7f 7f
	Touch 90 68 7f 90 68 00
WidgetEnd
```

**Note:** To adjust the fader range in Reaper to match the motorized fader range on your hardware, go to Reaper's **Preferences -> Appearance -> Track Control Panels** and set the "Volume fader range" to match the maximum value on your hardware fader.

## FB_Fader7Bit
Use Fader7Bit for any traditional "absolute" [as in having a fixed start and end point] MIDI faders and knobs (yes, Fader7Bit applies to knobs too!). Here's the syntax for a typical 7-bit MIDI knob with feedback. 
```
Widget Knob1
	Fader7Bit B0 16 7F
	FB_Fader7Bit B0 16 00
WidgetEnd
```

Note: some surfaces, like the MIDI Fighter Twister, use encoders but may have 7Bit LED rings to represent the value of the current parameter, so you may end up with an Encoder widget with a Fader7Bit feedback processor. 
```
Widget RotaryA1
	MFTEncoder b0 00 7f
	FB_Fader7Bit b0 00 00
WidgetEnd
```

## FB_Encoder
Use FB_Encoder for surfaces with a continuous encoder (no absolute start and end point) and feedback that expects the same.
```
Widget Rotary1
	Encoder b0 10 7f [ < 41 > 01 ]
	FB_Encoder b0 10 00
WidgetEnd
```
If you would like to change the "Ring Style" of an FB_Encoder, say between a Dot and Fill Mode, please see [[Widget Modes]] for instructions.

## FB_Processor
FB_Processor is the standard OSC feedback processor type. This feedback processor type will transmit strings, integers, floats, volume, pan, etc. and generally "just work" for most OSC-related use cases. The syntax is the word FB_Processor followed by the OSC address for the message. Below is an example that corresponds to a TrackNameDisplay1 widget on the Mixer page of this hypothetical OSC surface.
```
Widget TrackNameDisplay1
	FB_Processor /Mixer/TrackNameDisplay1
WidgetEnd
```

**Note:** there may be rare scenarios where numeric (e.g. 0/1) feedback is more useful than "bypassed/active" or "offline/online". For those use cases, use [[FB_IntProcessor|Feedback-Processors#fb_intprocessor]].

## FB_IntProcessor
Use FB_IntProcessor in OSC surfaces in the rare instances where an integer [number] value is the only value that you want returned to a widget. Example: if you'd prefer that an OSC display widget receive 0/1 versus "bypassed/active". The syntax is the word FB_IntProcessor followed by the OSC address for the message as shown below. 
```
Widget TrackFXSlotStatus1
	FB_IntProcessor /Mixer/TrackFXSlotStatus1
WidgetEnd
```

## FB_ConsoleOneGainReductionMeter
Use FB_ConsoleOneGainReductionMeter for the gain reduction meter on the Softube Console One.
```
Widget CompressorMeter
	FB_ConsoleOneGainReductionMeter b0 73 00
WidgetEnd
```

## FB_ConsoleOneVUMeter 
FB_ConsoleOneVUMeter is designed for the meters in the Softube Console One. An example of these definitions is shown below.
```
Widget InputMeterLeft
	FB_ConsoleOneVUMeter b0 6e 00
WidgetEnd

Widget InputMeterRight
	FB_ConsoleOneVUMeter b0 6f 00
WidgetEnd

Widget OutputMeterLeft
	FB_VUMeter b0 70 00
WidgetEnd

Widget OutputMeterRight
	FB_VUMeter b0 71 00
WidgetEnd
```

## FB_MCUDisplayUpper
This is the feedback processor used for the upper displays on an MCU-style surface (see [[FB_XTouchDisplayUpper]] if using an X-Touch or X-Touch Extender). The syntax is FB_MCUDisplayUpper followed by the channel # beginning with 0 for channel 1. Here's an example from an 8-channel MCU surface.

```
Widget DisplayUpper1
	FB_MCUDisplayUpper 0
WidgetEnd

Widget DisplayUpper2
	FB_MCUDisplayUpper 1
WidgetEnd

Widget DisplayUpper3
	FB_MCUDisplayUpper 2
WidgetEnd

Widget DisplayUpper4
	FB_MCUDisplayUpper 3
WidgetEnd

Widget DisplayUpper5
	FB_MCUDisplayUpper 4
WidgetEnd

Widget DisplayUpper6
	FB_MCUDisplayUpper 5
WidgetEnd

Widget DisplayUpper7
	FB_MCUDisplayUpper 6
WidgetEnd

Widget DisplayUpper8
	FB_MCUDisplayUpper 7
WidgetEnd
```

## FB_MCUDisplayLower
Similar to [[FB_MCUDisplayUpper|Feedback-Processors#FB_MCUDisplayUpper]], except covers the lower displays of MCU-style surfaces.
```
Widget DisplayLower1
	FB_MCUDisplayLower 0
WidgetEnd

Widget DisplayLower2
	FB_MCUDisplayLower 1
WidgetEnd

Widget DisplayLower3
	FB_MCUDisplayLower 2
WidgetEnd

Widget DisplayLower4
	FB_MCUDisplayLower 3
WidgetEnd

Widget DisplayLower5
	FB_MCUDisplayLower 4
WidgetEnd

Widget DisplayLower6
	FB_MCUDisplayLower 5
WidgetEnd

Widget DisplayLower7
	FB_MCUDisplayLower 6
WidgetEnd

Widget DisplayLower8
	FB_MCUDisplayLower 7
WidgetEnd
```

## FB_MCUXTDisplayUpper
Similar to [[FB_MCUDisplayUpper|Feedback-Processors#FB_MCUDisplayUpper]], except covers the upper displays of MCU Extender-style (XT) surfaces.
```
Widget DisplayUpper1
	FB_MCUXTDisplayUpper 0
WidgetEnd

Widget DisplayUpper2
	FB_MCUXTDisplayUpper 1
WidgetEnd

Widget DisplayUpper3
	FB_MCUXTDisplayUpper 2
WidgetEnd

Widget DisplayUpper4
	FB_MCUXTDisplayUpper 3
WidgetEnd

Widget DisplayUpper5
	FB_MCUXTDisplayUpper 4
WidgetEnd

Widget DisplayUpper6
	FB_MCUXTDisplayUpper 5
WidgetEnd

Widget DisplayUpper7
	FB_MCUXTDisplayUpper 6
WidgetEnd

Widget DisplayUpper8
	FB_MCUXTDisplayUpper 7
WidgetEnd
```

## FB_MCUXTDisplayLower
Similar to [[FB_MCUDisplayUpper|Feedback-Processors#FB_MCUDisplayUpper]], except covers the lower displays of MCU Extender-style (XT) surfaces.
```
Widget DisplayLower1
	FB_MCUXTDisplayLower 0
WidgetEnd

Widget DisplayLower2
	FB_MCUXTDisplayLower 1
WidgetEnd

Widget DisplayLower3
	FB_MCUXTDisplayLower 2
WidgetEnd

Widget DisplayLower4
	FB_MCUXTDisplayLower 3
WidgetEnd

Widget DisplayLower5
	FB_MCUXTDisplayLower 4
WidgetEnd

Widget DisplayLower6
	FB_MCUXTDisplayLower 5
WidgetEnd

Widget DisplayLower7
	FB_MCUXTDisplayLower 6
WidgetEnd

Widget DisplayLower8
	FB_MCUXTDisplayLower 7
WidgetEnd
```

## FB_MCUC4DisplayUpper
Similar to [[FB_MCUDisplayUpper|Feedback-Processors#FB_MCUDisplayUpper]], except covers the upper displays of the MCU C4 surface.
```
Widget DisplayUpper1
	FB_MCUC4DisplayUpper 0
WidgetEnd

Widget DisplayUpper2
	FB_MCUC4DisplayUpper 1
WidgetEnd

Widget DisplayUpper3
	FB_MCUC4DisplayUpper 2
WidgetEnd

Widget DisplayUpper4
	FB_MCUC4DisplayUpper 3
WidgetEnd

Widget DisplayUpper5
	FB_MCUC4DisplayUpper 4
WidgetEnd

Widget DisplayUpper6
	FB_MCUC4DisplayUpper 5
WidgetEnd

Widget DisplayUpper7
	FB_MCUC4DisplayUpper 6
WidgetEnd

Widget DisplayUpper8
	FB_MCUC4DisplayUpper 7
WidgetEnd
```

## FB_MCUC4DisplayLower
Similar to [[FB_MCUDisplayUpper|Feedback-Processors#FB_MCUDisplayUpper]], except covers the lower displays of the MCU C4 surface.
```
Widget DisplayLower1
	FB_MCUC4DisplayLower 0
WidgetEnd

Widget DisplayLower2
	FB_MCUC4DisplayLower 1
WidgetEnd

Widget DisplayLower3
	FB_MCUC4DisplayLower 2
WidgetEnd

Widget DisplayLower4
	FB_MCUC4DisplayLower 3
WidgetEnd

Widget DisplayLower5
	FB_MCUC4DisplayLower 4
WidgetEnd

Widget DisplayLower6
	FB_MCUC4DisplayLower 5
WidgetEnd

Widget DisplayLower7
	FB_MCUC4DisplayLower 6
WidgetEnd

Widget DisplayLower8
	FB_MCUC4DisplayLower 7
WidgetEnd
```

## FB_MCUAssigmentDisplay
On an MCU or X-Touch it will display the overall 'mode' CSI is currently in, on the LED display labelled 'Assignment' immediately to then left of the SMPTE/Beats indicators (on an X-Touch, it's immediately to the left of the master solo indicator)

The Modes are either Normal, ie regular track display; VCA, VCA leaders; or Folder, top level folders.

The widget would look like this:
```
Widget AssigmentDisplay
	FB_MCUAssigmentDisplay
WidgetEnd
```

The zone would look like this:
```
Zone "Buttons"
    AssignmentDisplay         TrackVCAFolderModeDisplay
ZoneEnd
```

## FB_MCUTimeDisplay
FB_MCUTimeDisplay will display the time in Reaper, according to whichever mode Reaper is currently set to display time in. The below example shows what the MCU time display widget would look like in the mcu.mst file.
```
Widget TimeDisplay
	FB_MCUTimeDisplay
WidgetEnd
````

## FB_MCUVUMeter 
Use FB_MCUVUMeter for the VU meters on an MCU-style device. The syntax for this type of processor is FB_MCUVUMeter followed by the channel number (starting at 0 for channel 1). So an 8-channel surface would look like the below example.
```
Widget VUMeter1
	FB_MCUVUMeter 0
WidgetEnd

Widget VUMeter2
	FB_MCUVUMeter 1
WidgetEnd

Widget VUMeter3
	FB_MCUVUMeter 2
WidgetEnd

Widget VUMeter4
	FB_MCUVUMeter 3
WidgetEnd

Widget VUMeter5
	FB_MCUVUMeter 4
WidgetEnd

Widget VUMeter6
	FB_MCUVUMeter 5
WidgetEnd

Widget VUMeter7
	FB_MCUVUMeter 6
WidgetEnd

Widget VUMeter8
	FB_MCUVUMeter 7
WidgetEnd
```

## FB_MFT_RGB
This feedback processor allows you to send specific color values to the **MIDI Fighter Twister** (MFTwister for short). Note: Within CSI, only the buttons on the MFTwister can be colored, not the encoder rings themselves. This means the below section will only be applicable to the button/press widgets. 

Let's say you've got a button widget called ButtonA1 on your MFTwister, and it's at the address b1 00 7f. If you would like to take control of the button color within CSI, you would add the FB_MFT_RGB feedback processor using the same address as the button itself as shown in the below example.
```` 
Widget ButtonA1
    Press b1 00 7f
    FB_MFT_RGB b1 00 7f
WidgetEnd
```` 

Do this for any buttons you would like to control the colors for. This just tells CSI that the colors for this button can be controlled within CSI. We will define the color values that get linked to a particular action in the .zon files so continue reading below.

### Adding Colors to Your .Zon Files/Actions
**Background:** the MFTwister color settings are a little tricky. From Geoff, "the RGB table is such that any one color (r, g, b) MUST be 0 AND any OTHER color (r, g, b) MUST be 255 -- the third color can vary in the range 1 - 255 or so -- the color table is a bit quirky." So for any state (i.e. off/on), two of the 3 colors must be 0 and 255. 

Following your action, colors must appear in curly brackets following the action and require a space after the first bracket and before the last one. The first 3 numbers in the brackets are the RGB values for the off state. The second 3 numbers are the RGB values for the on state.

In this example, the color will change from deep blue (off), to light blue (on) based on the Playback state in Reaper.
```` 
Zone "Buttons|"
        ButtonB8 Play { 0 25 255 0 189 255 }
ZoneEnd
```` 

In this example, from an FX.zon, the MFTwister button will turn green when the effect is on, and red when bypassed. If you wanted green in the off state and red in the on state, you'd flip the order of the first-three numbers and second-three.
````
Zone "VST: AR-1 (Kush Audio)"
FocusedFXNavigator 
Toggle+ButtonB8 FXParam 0 "Bypass" { 90 255 0 255 50 0 } 
ZoneEnd
```` 

### Tip: Using Dummy Colors in FX.zon Files
Let's say our fx.zon includes some unmapped encoders and you want to give yourself some visual feedback that says, "hey, ButtonsB1 through ButtonsB3 have nothing mapped to them." You could setup your fx.zon files to include a color for this. This way, when you see the color, you know there's nothing mapped to that parameter. 

For example, here I'm a dummy FX parameter (parameter 999 doesn't exist for this plugin) combined with Navy Blue to indicate there's nothing mapped to an encoder or button:

```` 
ButtonB1	FXParam 999 "Dummy" { 0 25 255 0 25 255 }
ButtonB2	FXParam 999 "Dummy" { 0 25 255 0 25 255 }	
ButtonB3	FXParam 999 "Dummy" { 0 25 255 0 25 255 }	
```` 

Now, let's say I want the light to turn green under any mapped rotary encoders. You can use the same method as above, when combined with your normal widget action. Example: here, RotaryA2 is mapped to a stepped ratio control of a plugin. At the lowest ratio, the encoder rings don't light up. So how would I know that encoder is mapped to something? Well, I can light the button below it green by doing the following:
```` 
RotaryA2	FXParam 5 "Ratio"	[ 0.0 0.34 0.67 1.0 ] //these are the parameter steps not the colors
ButtonA2	FXParam 999 "Dummy" { 90 255 0 90 255 0 }
```` 

### FB_MFT_RGB Color Reference Table
Lastly, to save you the time and effort, here are approximations of the MIDI Fighter Twister Utility's color codes, adapted for use in CSI.

```` 
	               R	G	B
Navy Blue	       0	75	255
Dodger Blue	       0	145	255
Deep Sky Blue	       0	215	255
Aqua	               0	250	255
Spring Green	       0	255	135
Lime Green	       25	255	0
Bright Green	       90	255	0
Spring Bud	       165	255	0
Yellow	               242	255	0
Selective Yellow       255	188	0
Safety Orange	       255	115	0
Scarlet Red	       255	50	0
Tarch Red	       255	0	80
Hot Magenta	       255	0	225
Magenta	               255	0	255
Psychedelic Purple     240	0	255
Electric Purple	       165	0	255
```` 

## FB_FaderportRGB 
Use FB_FaderportRGB for controlling the RGB buttons on a Faderport8 or Faderport16 device. See the examples below.
```
Widget AudioBtn
	Press 90 3e 7f
	FB_FaderportRGB 90 3e 7f
WidgetEnd

Widget Instrument
	Press 90 3f 7f
	FB_FaderportRGB 90 3f 7f
WidgetEnd

Widget BusBtn
	Press 90 40 7f
	FB_FaderportRGB 90 40 7f
WidgetEnd

Widget VCABtn
	Press 90 41 7f
	FB_FaderportRGB 90 41 7f
WidgetEnd

Widget AllBtn
	Press 90 42 7f
	FB_FaderportRGB 90 42 7f
WidgetEnd
```
**Important:** previously named FB_FaderportRGB7Bit (please update any .mst files with the new name). 

## FB_FaderportTwoStateRGB 
FB_FaderportTwoStateRGB is meant to allow the Select button colors of a Faderport8/16 to follow the track selection, but also show a dimmed state when the track is not currently selected. Thanks to [Navelpluisje](https://forum.cockos.com/member.php?u=139512) for contributing this processor!

Here's what that would look like in a Faderport8 or Faderport16.mst file.
```
Widget Select1
	Press 90 4c 7f 90 4c 00
	FB_FaderportTwoStateRGB 90 4c 7f
WidgetEnd
```

And here is the syntax for making that work in a track.zon.
```
Zone "Track"
    Select|   TrackUniqueSelect  { "Track" }
ZoneEnd
```

## FaderPort8 and FaderPort16 Displays
CSI supports the Presonus FaderPort8 and FaderPort16 Displays. Each of the 4 display rows requires its own widget in the .mst file.

For your .mst, here are the names for the FB generators that correspond to each line on the surface. 

```
FB_FP8DisplayUpper

FB_FP8DisplayUpperMiddle

FB_FP8DisplayLowerMiddle

FB_FP8DisplayLower // DisplayLower not implemented as of Dec 18 2020 - do not use.



FB_FP16DisplayUpper

FB_FP16DisplayUpperMiddle

FB_FP16DisplayLowerMiddle

FB_FP16DisplayLower // DisplayLower not implemented as of Dec 18 2020 - do not use.
```

And here is an example of how the .mst would be mapped out for Display 1 on the Faderport16.
```
Widget FPScribbleUpper1
	FB_FP16DisplayUpper "0"
WidgetEnd

Widget FPScribbleUpperMiddle1
	FB_FP16DisplayUpperMiddle "0"
WidgetEnd

Widget FPScribbleLowerMiddle1
	FB_FP16DisplayLowerMiddle "0"
WidgetEnd

Widget FPScribbleLower1
	FB_FP16DisplayLower "0"
WidgetEnd
```

Note: to change FaderPort Display, Scribbe, and ValueBar Modes see [[Widget Modes]].

**Note:** FB_FP8Display and FB_FP16Display are legacy feedback processors that now correspond to FB_FP8DisplayUpper and FB_FP16DisplayUpper respectively. The legacy versions will continue working for any .mst files where they already exist, but if you're creating a new set of files, you are encouraged to use the newer feedback processors.


## FB_FPVUMeter
FB_FPVUMeter is a feedback processor designed for the VU meters on a Faderport8/Faderport16 surface. Thanks to [Navelpluisje](https://forum.cockos.com/member.php?u=139512) for contributing this processor! Here's an example of what those meters would look like in an .mst.
```
Widget VUMeter1
	FB_FPVUMeter 0
WidgetEnd

Widget VUMeter2
	FB_FPVUMeter 1
WidgetEnd
```

And here is how those widgets can be utilized in a .zon file for the Faderport8/16 (last line).
```
Zone "Track"
  DisplayType|              DisplayType 5

  ScribbleLine1_|           TrackNameDisplay
  Property+ScribbleLine1_|  TextAlign Left            
  Property+ScribbleLine1_|  Invert 1           

  ScribbleLine2_|           TrackVolumeDisplay
  ScribbleLine3_|           TrackPanDisplay
  ScribbleLine4_|           TrackPanDisplay

  ValueBar|                 TrackPan
  Property+ValueBar|        Mode BiPolar

  VUMeter|                  TrackOutputMeter
ZoneEnd
```

Note: the VU Meter is only available in FaderPort Display Types 4,5,7 and 8. Click this link to see the various FaderPort display type options: [FaderPort Display Types](https://pasteboard.co/qQTheianj9tM.jpg).

## FB_NovationLaunchpadMiniRGB7Bit
Use FB_NovationLaunchpadMiniRGB7Bit for controlling the RGB colors on the Novation Launchpad Mini buttons. See the example below.
```
Widget ButtonA1
        Press b0 5b 7f
        FB_NovationLaunchpadMiniRGB7Bit b0 5b 7f
WidgetEnd
```

## QCon Lite Displays
Use FB_QConLiteDisplayUpper, FB_QConLiteDisplayUpperMid, FB_QConLiteDisplayLowerMid, FB_QConLiteDisplayLower for the four display lines on the QCon Lite surface. The correct syntax for each includes the Feedback Processor name, followed by the Channel # starting with 0.
```
Widget DisplayUpper1
	FB_QConLiteDisplayUpper 0
WidgetEnd

Widget DisplayUpperMid1
        FB_QConLiteDisplayUpperMid 0
WidgetEnd

Widget DisplayLowerMid1
        FB_QConLiteDisplayLowerMid 0
WidgetEnd

Widget DisplayLower1
	FB_QConLiteDisplayLower 0
WidgetEnd
```

## FB_QConProXMasterVUMeter
Use this widget for Qcon Pro X|iCON master meters. 

If you have one of these surfaces, your widgets should look like this in the .mst:

```` 
Widget MasterChannelMeterLeft
	FB_QConProXMasterVUMeter
WidgetEnd

Widget MasterChannelMeterRight
	FB_QConProXMasterVUMeter
WidgetEnd
```` 

Also, make sure you specify Left (0) and Right (1) in the.zon file.

```` 
Zone "MasterTrack"
MasterTRackNavigator
    MasterChannelMeterLeft TrackOutputMeter  0
    MasterChannelMeterRight TrackOutputMeter  1
ZoneEnd
```` 

## FB_XTouchDisplayUpper
FB_XTouchDisplayUpper is used for controlling colors on the displays for the X-Touch Universal and X-Touch Extender controllers. **This feedback processor should exist in the UpperDisplay1 widget only and will control the colors for all 8 displays on the unit.** The remaining displays should be FB_MCUDisplayUpper as shown in the example below. Note: the same is applicable to X-Touch Extenders. You'll also note: there is no FB_XTouchDisplayLower; use FB_MCUDisplayLower for those displays.
```
Widget DisplayUpper1
	FB_XTouchDisplayUpper 0
WidgetEnd

Widget DisplayUpper2
	FB_MCUDisplayUpper 1
WidgetEnd

Widget DisplayUpper3
	FB_MCUDisplayUpper 2
WidgetEnd

Widget DisplayUpper4
	FB_MCUDisplayUpper 3
WidgetEnd

Widget DisplayUpper5
	FB_MCUDisplayUpper 4
WidgetEnd

Widget DisplayUpper6
	FB_MCUDisplayUpper 5
WidgetEnd

Widget DisplayUpper7
	FB_MCUDisplayUpper 6
WidgetEnd

Widget DisplayUpper8
	FB_MCUDisplayUpper 7
WidgetEnd
```

**Important Note:** The X-Touch firmware only supports 8 track colors. These are not full RGB screens. CSI will translate the colors in Reaper to the nearest approximation of the colors supported on the X-Touch, which are...
```
Black
White
Red
Green
Blue
Cyan
Magenta
Yellow
```

---

## FILE: Navigation-Actions.md

* [[TrackBank|Navigation Actions#trackbank]]
* [[SelectedTrackBank|Navigation Actions#selectedtrackbank]]
* [[TrackSendBank|Navigation Actions#tracksendbank]]
* [[TrackReceiveBank|Navigation Actions#trackreceivebank]]
* [[TrackFXMenuBank|Navigation Actions#trackfxmenubank]]
* [[SelectedTrackSendBank|Navigation Actions#selectedtracksendbank]]
* [[SelectedTrackReceiveBank|Navigation Actions#selectedtrackreceivebank]]
* [[SelectedTrackFXMenuBank|Navigation Actions#selectedtrackfxmenubank]]
* [[ToggleSynchPageBanking|Navigation Actions#togglesynchpagebanking]]
* [[ToggleScrollLink|Navigation Actions#togglescrolllink]]
* [[GoHome|Navigation Actions#gohome]]
* [[GoSubZone|Navigation Actions#gosubzone-leavesubzone]]
* [[LeaveSubZone|Navigation Actions#gosubzone-leavesubzone]]
* [[GoTrackSend|Navigation Actions#gotracksend]]
* [[GoTrackReceive|Navigation Actions#gotrackreceive]]
* [[GoTrackFXMenu|Navigation Actions#gotrackfxmenu]]
* [[GoSelectedTrackSend|Navigation Actions#goselectedtracksend]]
* [[GoSelectedTrackReceive|Navigation Actions#goselectedtrackreceive]]
* [[GoSelectedTrackFXMenu|Navigation Actions#goselectedtrackfxmenu]]
* [[GoSelectedTrackFX|Navigation Actions#goselectedtrackfx]]
* [[GoMasterTrack|Navigation Actions#gomastertrack]]
* [[GoPage|Navigation Actions#gopage-nextpage-pagenamedisplay]]
* [[NextPage|Navigation Actions#gopage-nextpage-pagenamedisplay]]
* [[PageNameDisplay|Navigation Actions#gopage-nextpage-pagenamedisplay]]

## TrackBank
Add this action to your Buttons zone for banking the surface in a Track context. No change is made to the track selection in Reaper. Positive or negative numbers after the action name will dictate how many tracks will banked at a time.
```
Zone "Buttons"
    BankLeft                    TrackBank -8
    BankRight                   TrackBank 8
    ChannelLeft                 TrackBank -1
    ChannelRight                TrackBank 1
ZoneEnd
```

**Note:** The TrackBank action will automatically bank VCA and Folder tracks when CSI's [[CycleTrackVCAFolderModes|VCA's-and-VCA-Spill#cycletrackvcafoldermodes-trackvcafoldermodedisplay]] action is set to one of those respective modes. Additionally, banking information is saved within your Reaper project. Example: if you are banked to track 30 when you last saved your Reaper project, upon reopening that project, CSI will be banked to track 30, allowing you to pick up where you last left off.

## SelectedTrackBank
This action works similarly to TrackBank but selects the track in Reaper. Use this in a selected track style workflow.
```
Zone "Buttons"
    BankLeft                    SelectedTrackBank -8
    BankRight                   SelectedTrackBank 8
    ChannelLeft                 SelectedTrackBank -1
    ChannelRight                SelectedTrackBank 1
ZoneEnd
```

**Tip:** If you would prefer a workflow where you can bank your multi-fader surface but also have the track selection in Reaper updated each time you do, then you can combine both actions, one right after the other as shown below.
```
Zone "Buttons"
    BankLeft                    TrackBank -8
    BankLeft                    SelectedTrackBank -8
    BankRight                   TrackBank 8
    BankRight                   SelectedTrackBank 8
    ChannelLeft                 TrackBank -1
    ChannelLeft                 SelectedTrackBank -1
    ChannelRight                TrackBank 1
    ChannelRight                SelectedTrackBank 1
ZoneEnd
```

## TrackSendBank
Use this action for banking the sends in a TrackSend zone.
```
Zone "TrackSend"
	DisplayLower| 		    TrackSendNameDisplay
    	Fader|Touch+DisplayLower|   TrackSendVolumeDisplay
    	Mute|                       TrackSendMute
    	Rotary|                     TrackSendPan
    	Fader|                      TrackSendVolume
    	Up                          TrackSendBank -1
    	Down                        TrackSendBank 1
ZoneEnd
```

## TrackReceiveBank
Use this action for banking the Receives in a TrackReceive zone.
```
Zone "TrackReceive"
	DisplayLower| 		    TrackReceiveNameDisplay
    	Fader|Touch+DisplayLower|   TrackReceiveVolumeDisplay
    	Mute|                       TrackReceiveMute
    	Rotary|                     TrackReceivePan
    	Fader|                      TrackReceiveVolume
    	Up                          TrackReceiveBank -1
    	Down                        TrackReceiveBank 1
ZoneEnd
```

## TrackFXMenuBank
Use this action to bank FX Menu slots in a TrackFXMenu zone.
```
Zone "TrackFXMenu"
        DisplayLower|       	FXMenuNameDisplay
        Rotary|             	NoAction
        RotaryPush|         	GoFXSlot
	Mute| 			ToggleFXBypass
        Up	            	TrackFXMenuBank -1
        Down	           	TrackFXMenuBank 1
ZoneEnd
```

## SelectedTrackSendBank
Use this action for banking the sends in a SelectedTrackSend zone.
```
Zone "SelectedTrackSend"
    	DisplayUpper|               TrackSendNameDisplay
	DisplayLower| 		    TrackSendPrePostDisplay
    	Fader|Touch+DisplayLower|   TrackSendVolumeDisplay
	RotaryPush|		    TrackSendPrePost
    	Mute|                       TrackSendMute
    	Rotary|                     TrackSendPan
    	Fader|                      TrackSendVolume
    	Left                        SelectedTrackSendBank -1
    	Right                       SelectedTrackSendBank 1
ZoneEnd
```

## SelectedTrackReceiveBank
Use this action for banking the Receives in a SelectedTrackReceive zone.
```
Zone "SelectedTrackReceive"
    DisplayUpper|               TrackReceiveNameDisplay
    DisplayLower| 		TrackReceivePrePostDisplay
    Fader|Touch+DisplayLower|   TrackReceiveVolumeDisplay
    RotaryPush|			TrackReceivePrePost
    Mute|			TrackReceiveMute
    Rotary|                     TrackReceivePan
    Fader|                      TrackReceiveVolume
    Left			SelectedTrackReceiveBank -1
    Right   			SelectedTrackReceiveBank 1
ZoneEnd
```

## SelectedTrackFXMenuBank
Use this action to bank FX Menu slots in a SelectedTrackFXMenu zone.
```
Zone "SelectedTrackFXMenu"
        DisplayUpper|       	FXMenuNameDisplay
	DisplayLower|       	FXBypassedDisplay
        Rotary|             	NoAction
        RotaryPush|         	GoFXSlot
	Mute| 			ToggleFXBypass
        Left            	SelectedTrackFXMenuBank -1
        Right           	SelectedTrackFXMenuBank 1
ZoneEnd
```

## ToggleSynchPageBanking
This action will toggle whether or not surface banking stays in sync when you change [[Pages|Pages]] in CSI. Example: if your surface is banked to show channels 25 to 32 on your HomePage, then you switch to a second page, do you want to maintain the banking position? This is enabled by default. This action will toggle the behavior.
```
Zone "Buttons"
     F8     ToggleSynchPageBanking
ZoneEnd
```

## ToggleScrollLink
This action toggles the behavior where Reaper's MCP will follow CSI's banking and scroll in sync with the surface. **Note:** as of the August 5, 2022 CSI release, this defaults to Off (previously defaulted to On). 
```
Zone "Buttons"
     F7     ToggleScrollLink
ZoneEnd
```

if you want to have ToggleScrollLink default to "On", you could include it in your Home.zon along with an OnInitialization virtual widget as shown below. **Important note:** ToggleScrollLink is actually a "Page-level" action. So if you had included "OnInitialization ToggleScrollLink" in two surface zone files, or shared one zone folder between two devices, the action would actually fire twice thus not actually changing the state (changing it from it's default off state, to on, to off again). The current workaround would be to only include this action in one surface home.zon and not to share zone folders between two surfaces if you want ScrollLink enabled by default.
```
Zone "Home"
	OnInitialization ToggleScrollLink
     	IncludedZones
     	   	"Buttons"
     	   	"Track"
     	   	"SelectedTrack"
		"MasterTrack"
     	IncludedZonesEnd
     	AssociatedZones
     	   	"SelectedTrackFXMenu"
     		"SelectedTrackSend"
     		"SelectedTrackReceive"
     		"TrackSend"
     		"TrackReceive"	
     	AssociatedZonesEnd
		
ZoneEnd
```

## GoHome
Assign this action to a button to return to the Home Zone. If your surface supports feedback, you will see a light engaged when the Home zone is active.
```
Zone "Buttons"
    GlobalView                  GoHome
ZoneEnd
```

## GoSubZone, LeaveSubZone
Use the GoSubZone action when you want to create custom SubZones to be called up on-demand. The SubZones need to be listed as SubZones within the surface definition. In the below example, we've got two SubZones, one for a "Marker" zone and another for a "Zoom" SubZone. The syntax to flag the included SubZones and the buttons to activate them would look like this...
```
Zone "Buttons"
    SubZones
        "Marker"
        "Zoom"
    SubZonesEnd
     Marker                             GoSubZone "Marker"
     Zoom                               GoSubZone "Zoom"
```

The SubZone itself would look like any other standalone .zon file. Also note that once we are in one of those custom SubZones, we need a way to exit the SubZone. You may want to use the same button you used to activate the SubZone in order for it to behave like a toggle. See the example below from the Marker SubZone.
```
Zone "Marker"
    Up                   Reaper 40613   // Delete marker near cursor
    Down                 Reaper 40157   // Insert marker at current or edit position
    Right                Reaper 40173   // Go to next marker or project end
    Left                 Reaper 40172   // Go to previous marker or project start

    JogWheelRotaryCW     Reaper 40173   // Go to next marker or project end    
    JogWheelRotaryCCW    Reaper 40172   // Go to previous marker or project start
    
    Marker               LeaveSubZone
ZoneEnd
```

Click here to learn about [[FX SubZones|FX and Instrument Mapping#fx-subzones]].

## GoTrackSend
Use the GoTrackSend action to activate the [[TrackSend|Send Zones]] zone type. This type of zone has a fixed name. This action provides feedback to surfaces that support it and will act as a toggle for activating and exiting the zone.
```
Zone "Buttons"
    AudioInstrument             GoTrackSend
ZoneEnd
```

## GoTrackReceive
Use the GoTrackReceive action to activate a [[TrackReceive|Receive Zones]] zone type. This type of zone has a fixed name. This action provides feedback to surfaces that support it and will act as a toggle for activating and exiting the zone.
```
Zone "Buttons"
    Aux                         GoTrackReceive
ZoneEnd
```

## GoTrackFXMenu
Use the GoTrackFXMenu action to activate a [[TrackFXMenu|FX-Zone-Activation-(FocusedFX,-TrackFXMenu,-SelectedTrackFXMenu,-SelectedTrack)#trackfxmenu]] zone. This type of zone has a fixed name. This action provides feedback to surfaces that support it and will act as a toggle for activating and exiting the zone.
```
Zone "Buttons"
    Busses                      GoTrackFXMenu
ZoneEnd
```

## GoSelectedTrackSend
Use the GoSelectedTrackSend action to activate a [[SelectedTrackSend|Send Zones]] zone. This type of zone has a fixed name. This action provides feedback to surfaces that support it and will act as a toggle for activating and exiting the zone.
```
Zone "Buttons"
    MidiTracks                  GoSelectedTrackSend
ZoneEnd
```

## GoSelectedTrackReceive
Use the GoSelectedTrackReceive action to activate a [[SelectedTrackReceive|Receive Zones]] zone. This type of zone has a fixed name. This action provides feedback to surfaces that support it and will act as a toggle for activating and exiting the zone.
```
Zone "Buttons"
    Inputs                      GoSelectedTrackReceive
ZoneEnd
```

## GoSelectedTrackFXMenu
Use the GoSelectedTrackFXMenu action to activate a [[SelectedTrackFXMenu|FX-Zone-Activation-(FocusedFX,-TrackFXMenu,-SelectedTrackFXMenu,-SelectedTrack)#selectedtrackfxmenu]] zone. This type of zone has a fixed name. This action provides feedback to surfaces that support it and will act as a toggle for activating and exiting the zone.
```
Zone "Buttons"
    AudioTracks                 GoSelectedTrackFXMenu
ZoneEnd
```

## GoSelectedTrackFX
Use GoSelectedTrackFX to map FX on the selected track. One use case for this action would be to automatically map one or more FX when a track is selected as shown in the below example:
```
Zone "Home"
OnInitialization ToggleEnableFocusedFXMapping    // Turns focused FX mapping off on initialization
OnTrackSelection GoSelectedTrackFX
     IncludedZones
          "SelectedTrack"
          "Buttons"
     IncludedZonesEnd
ZoneEnd
```

## GoMasterTrack
Use GoMasterTrack to active the master track zone for surfaces that don't have a dedicated master track fader.
```
Zone "Buttons"
    SomeButton    GoMasterTrack
ZoneEnd
```

## GoPage, NextPage, PageNameDisplay
If using multiple [[Pages]], the buttons on surface can be assigned to switch between Pages. Use the CSI **GoPage** action to jump between Pages in CSI. Use **NextPage** to cycle between Pages. In the below example, I have a Page called Home and another called Mix. Those Pages will point to different zone folders that are configured to function differently based on the page. See [[Pages]] for more details about when and how to use Pages in CSI, for now we'll just focus on the actions to change pages.

On my Home page, I may want to utilize the "Channel" button on my surface to enter the Mix Page. Note: this "Buttons.zon" exists on the "HomePage" Page, and is different than the "Buttons.zon" on the "Mix" Page.

````
Zone "Buttons"
        Channel         GoPage "Mix"  // Activates the Mix page
ZoneEnd
````

But in order to get back to the HomePage, I probably want to make sure I have the opposite happening when the Mix page is active. Note: this "Buttons.zon" exists on the "Mix" Page, and is different than the "Buttons.zon" on the "HomePage".
````
Zone "Buttons"
        Channel         GoPage "HomePage"  // Activates the Home page
ZoneEnd
````

You could also use the NextPage action to just cycle through the Pages in your CSI setup. In a two-page setup this would essentially be a toggle but if you had 3 or more pages it will cycle through them.
```
Zone "Buttons"
        Channel         NextPage  // Cycles through the list of pages
ZoneEnd
```

Finally, while not a Navigation Action, the PageNameDisplay action can be assigned to a Display widget in order to show the name of the currently active Page.

```
MainDisplay     PageNameDisplay
```

---

## FILE: Track-Actions.md

# Track Actions
The following CSI actions are available for controlling Reaper's track controls. They will receive their context from the Zone Type, whether a "Track" zone (used for controlling multiple channels) or "SelectedTrack" zone.

### Tracks
* [[TrackVolume|Track-Actions#trackvolume-trackvolumedisplay]]
* [[SoftTakeover7BitTrackVolume|Track-Actions#softtakeover7bittrackvolume]]
* [[SoftTakeover14BitTrackVolume|Track-Actions#softtakeover14bittrackvolume]]
* [[TrackPanAutoLeft|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPanAutoRight|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPan|Track-Actions#trackpan-trackpandisplay]]
* [[TrackPanWidth|Track-Actions#trackpanwidth-trackpanwidthdisplay]]
* [[TrackPanL|Track-Actions#trackpanl-trackpanldisplay]]
* [[TrackPanR|Track-Actions#trackpanr-trackpanrdisplay]]
* [[TrackSelect|Track-Actions#trackselect]]
* [[TrackUniqueSelect|Track-Actions#trackuniqueselect]]
* [[TrackRangeSelect|Track-Actions#trackrangeselect]]
* [[TrackSolo|Track-Actions#tracksolo]]
* [[TrackMute|Track-Actions#trackmute]]
* [[TrackRecordArm|Track-Actions#trackrecordarm]]
* [[TrackInvertPolarity|Track-Actions#trackinvertpolarity]]
* [[CycleTrackInputMonitor|Track-Actions#cycletrackinputmonitor]]
* [[TrackInputMonitorDisplay|Track-Actions#trackinputmonitordisplay]]
* [[TrackNameDisplay|Track-Actions#tracknamedisplay]]
* [[TrackNumberDisplay|Track-Actions#tracknumberdisplay]]
* [[TrackVolumeDisplay|Track-Actions#trackvolume-trackvolumedisplay]]
* [[TrackPanAutoLeftDisplay|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPanAutoRightDisplay|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPanDisplay|Track-Actions#TrackPan-trackpandisplay]]
* [[TrackPanWidthDisplay|Track-Actions#trackpanwidth-trackpanwidthdisplay]]
* [[TrackPanLeftDisplay|Track-Actions#trackpanl-trackpanleftdisplay]]
* [[TrackPanRightDisplay|Track-Actions#trackpanr-trackpanrightdisplay]]
* [[TrackOutputMeter|Track-Actions#trackoutputmeter]]
* [[TrackOutputMeterAverageLR|Track-Actions#trackoutputmeteraveragelr]]
* [[TrackOutputMeterMaxPeakLR|Track-Actions#trackoutputmetermaxpeaklr]]

## TrackVolume, TrackVolumeDisplay
TrackVolume is the most commonly used CSI action for controlling TrackVolume. Use this for surfaces with motorized faders or encoders. TrackVolumeDisplay will display the fader volume on your surface. The example shown below shows the syntax for TrackVolumeDisplay could be used with touch sensitive faders to only show the track volume when touching the faders (you could show the Pan level in that display the rest of the time).  
```
Zone "Track"
    Fader|Touch+DisplayLower|     TrackVolumeDisplay
    Fader|                        TrackVolume
ZoneEnd
```

If you only wanted to see the TrackVolume on the lower display at all times, you could just remove the Fader|Touch portion and have this.
```
Zone "Track"
    DisplayLower|     TrackVolumeDisplay
    Fader|            TrackVolume
ZoneEnd
```
## SoftTakeover7BitTrackVolume
If you are assigning TrackVolume to a 7-Bit MIDI fader or an absolute rotary [a knob with defined start and end positions] you can consider using CSI's SoftTakeover7BitTrackVolume in lieu of TrackVolume in order to avoid volume jumps when you move a fader. The "soft takeover" variant will only change the volume once the fader/knob's value passes through the current value in Reaper.
```
Zone "Track"
     Fader|      SoftTakeover7BitTrackVolume
ZoneEnd
```

## SoftTakeover14BitTrackVolume
Same as SoftTakeover7BitTrackVolume, only designed for 14-bit MIDI faders/knobs.
```
Zone "Track
     Fader|      SoftTakeover14BitTrackVolume
ZoneEnd
```

## TrackPanAutoLeft, TrackPanAutoRight, TrackPanAutoLeftDisplay, TrackPanAutoRightDisplay
TrackPanAutoLeft will control TrackPan or TrackPanL (if using Dual Pans). TrackPanAutoRight will control TrackPanWidth or TrackPanR (if using Dual Pans). This adds considerable convenience in that you can use Stereo Balance Pans or Dual Pans even in the same Reaper project and control them in CSI without having to change zones. The one difference is that the WidgetMode for TrackPanAutoRight must be fixed (i.e. you can't use the Spread mode for PanWidth and Dot mode for PanR - you have to pick one). **Note:** in the below example, the [[ToggleChannel|Other Actions#togglechannel]] action is being used to flip between TrackPanAutoLeft and TrackPanAutoRight on the same widgets without changing zones.
```
Zone "Track"
    RotaryPush|                 ToggleChannel

    Rotary|                     TrackPanAutoLeft
    Rotary|			WidgetMode Dot
    Toggle+Rotary|              TrackPanAutoRight
    Toggle+Rotary|		WidgetMode Dot

    DisplayLower|      		TrackPanAutoLeftDisplay
    Toggle+DisplayLower|   	TrackPanAutoRightDisplay
ZoneEnd
```

**Note:** When using Dual Pans, TrackL and TrackR automation does not get written from a control surface. This appears to require a change to the Reaper API's. 

## TrackPan, TrackPanDisplay
Use TrackPan for controlling the TrackPan in Reaper. TrackPanDisplay will display the value of the TrackPan action on your surface.
```
Zone "Track"
     DisplayLower|      TrackPanDisplay
     Rotary|            TrackPan 0
ZoneEnd
```

Now, notice the number after TrackPan...The numbers are for the LED ring displays on the MCU style encoders:

* 0 means a single led -- perfect for Pan
* 1 means fill from right edge - centre single -- fill to left edge perfect for Width or EQ boost/cut
* 2 - left right fill -- good for level
* 3 - spread -- good for Q

## TrackPanWidth, TrackPanWidthDisplay
TrackPanWidth is used for controlling the PanWidth control in Reaper. 
```
Zone "Track"
     Shift+DisplayLower|      TrackPanWidthDisplay
     Shift+Rotary|            TrackPanWidth 1
ZoneEnd
```

## TrackPanL, TrackPanLeftDisplay
TrackPanL controls the Left channel's pan position when using the Dual Pan option in Reaper. Note: there is a known limitation where automation is not written when using this CSI action.
```
Zone "Track"
     Alt+DisplayLower|     TrackPanLeftDisplay
     Alt+Rotary|           TrackPanL
ZoneEnd
```

## TrackPanR, TrackPanRightDisplay
TrackPanR controls the Right channel's pan position when using the Dual Pan option in Reaper. Note: there is a known limitation where automation is not written when using this CSI action.
```
Zone "Track"
     Control+DisplayLower|     TrackPanRightDisplay
     Control+Rotary|           TrackPanR
ZoneEnd
```

## TrackSelect
Use this action in a Track zone context to select one of the channels in Reaper.
```
Zone "Track"
     Select|     TrackSelect
ZoneEnd
```

## TrackUniqueSelect
This action works similar to TrackSelect, but will deselect any other previously selected tracks.
```
Zone "Track"
     Shift+Select|     TrackUniqueSelect
ZoneEnd
```


## TrackRangeSelect
Use this action to select the start and end of a range of tracks and have them all selected.
```
Zone "Track"
     Control+Select|     TrackRangeSelect
ZoneEnd
```

## TrackSolo
TrackSolo will toggle the Solo state of the track. This action provides feedback of the solo state to the surface.
```
Zone "Track"
     Solo|     TrackSolo
ZoneEnd
```

## TrackMute
TrackSolo will toggle the Solo state of the track. This action provides feedback of the mute state to the surface.
```
Zone "Track"
     Mute|     TrackMute
ZoneEnd
```

## TrackRecordArm
Use TrackRecordArm to toggle the "Armed" state of the track. This action provides feedback to the surface.
```
Zone "Track"
     RecordArm|     TrackRecordArm
ZoneEnd
```

## TrackInvertPolarity
TrackInvertPolarity will invert the polarity of the track. This action provides feedback to the surface. In this example, because most surfaces do not have a dedicated button for this, I'm using the Shift modifier combined with the RecordArm button to fire the action.
```
Zone "Track"
     Shift+RecordArm|     TrackInvertPolarity
ZoneEnd
```

## TrackNameDisplay
Use TrackNameDisplay on a display widget to show the name of the track in question. Note: if a track is not named in Reaper, it will display "Track 1", "Track 2", etc. On a surface with only 8 characters, "Track 10" may be truncated to just "Track 1". Workaround: properly name your tracks!

Here's TrackNameDisplay used in a typical "Track" zone.
```
Zone "Track"
     DisplayUpper|     TrackNameDisplay
ZoneEnd
```

In the below example, we've got a display widget called "MainDisplay" and want to assign the selected track's name to always appear on that widget. To do this, we can create a SelectedTrack.zon and simply add the following... 
```
Zone "SelectedTrack"
     MainDisplay     TrackNameDisplay
ZoneEnd
```

## TrackNumberDisplay
Use TrackNumberDisplay on a display widget to display the Reaper track # on your surface. In the below example, we've got a surface that has 4 display rows (FaderPort8/16, SCE-24 or an OSC device). The track number is being displayed on the second row of the display (DisplayUpperMiddle). 
```
Zone "Track"
    DisplayUpper|          TrackNameDisplay
    DisplayUpperMiddle|    TrackNumberDisplay
    DisplayLowerMiddle|    TrackPanDisplay
    DisplayLower|          TrackVolumeDisplay
ZoneEnd
```

That's to [Navelpluisje](https://forum.cockos.com/member.php?u=139512) for contributing this action!

## TrackOutputMeter
Use this action if your surface has two columns of meter LEDs (one for left and one for right channel). By default, CSI will display the left channel (0) on a mono meter.
```
Zone "Track"
     VUMeter|      TrackOutputMeter
ZoneEnd
```

If you have a surface where the meter has right and left channels, you would break those up into two widgets in your .mst and in your Track zone, append the channel number (0=Left, 1=Right) to the end of the TrackOutputMeter action as shown below.
```
Zone "Track"
     VUMeterLeft|      TrackOutputMeter 0
     VUMeterRight|     TrackOutputMeter 1
ZoneEnd
```
If you have more than just left and right channels (e.g. surround) you can use TrackOutputMeter 2, TrackOutputMeter 3, etc.

## TrackOutputMeterAverageLR
Use this action if your surface has a single column LED for metering and you want that meter to show the average of both the left and right channels.
```
Zone "Track"
     VUMeter|      TrackOutputMeterAverageLR
ZoneEnd
```

## TrackOutputMeterMaxPeakLR
Use this action if your surface has a single column LED for metering and you want that meter to show the highest peak value of both the left and right channels.
```
Zone "Track"
     VUMeter|      TrackOutputMeterMaxPeakLR
ZoneEnd
```

---

## FILE: Transport-Actions.md

The Transport Actions are fairly simple, and as a result, I often use them as "proof of life" actions when I'm first setting up a new surface mapping. If I can get a button on a surface mapped to the Play action, then I know I've got most of the basic setup for the surface working properly and I can move on to doing more advanced things. 

The Transport Actions are:
* [[Rewind|Transport-Actions#Rewind]]
* [[FastForward|Transport-Actions#FastForward]]
* [[Play|Transport-Actions#Play]]
* [[Stop|Transport-Actions#Stop]]
* [[Record|Transport-Actions#Record]]
* [[CycleTimeline|Transport-Actions#CycleTimeline]]
* [[MCUTimeDisplay|Transport-Actions#MCUTimeDisplay]]
* [[OSCTimeDisplay|Transport-Actions#OSCTimeDisplay]]
* [[CycleTimeDisplayModes|Transport-Actions#CycleTimeDisplayModes]]

## Rewind
Rewind moves the Reaper Edit/Play cursor. The Rewind action in CSI has a latching behavior where a single button press starts rewinding until you press stop. A second press of Rewind causes it to Rewind at a faster speed. 

```
Zone "Buttons"
   Rewind     Rewind
ZoneEnd
```

## FastForward
FastForward moves the Reaper Edit/Play cursor. The FastForward action in CSI has a latching behavior where a single button press starts fast-forwarding until you press stop. A second press of FastForward causes it to FastForward at a faster speed. 

```
Zone "Buttons"
   FastForward     FastForward
ZoneEnd
```

## Play
Begins playback in Reaper.

```
Zone "Buttons"
    Play     Play
ZoneEnd
```

## Stop
Stops playback in Reaper.

```
Zone "Buttons"
    Stop     Stop
ZoneEnd
```

## CycleTimeline
Engages Reaper's "Toggle Repeat" (aka "Loop") mode.

```
Zone "Buttons"
    Cycle     CycleTimeline
ZoneEnd
```

## MCUTimeDisplay
When paired with the appropriate FB_MCUTimeDisplay widget, the TimeDisplay action will display the time from Reaper, based on the time display mode.

Then that would be paired with the below action in the .zon file.
```
    TimeDisplay                 MCUTimeDisplay
```

## OSCTimeDisplay
Use OSCTimeDisplay for displaying Reaper's time, including the various modes, on an OSC surface. This is basically the OSC equivalent of MCUTimeDisplay.
```
Zone "Buttons"
    TimeDisplay                 OSCTimeDisplay
ZoneEnd
```

## CycleTimeDisplayModes
When combined with MCUTimeDisplay or OSCTimeDisplay, CycleTimeDisplayModes will change the time display mode in Reaper and surface. This action cycles through the following 6 modes: 1) Minutes/Seconds, 2) Measures.Beats/Minutes:Seconds:Frames, 3) Measure.Beats, 4) Seconds, 5) Samples, 6) Hours:Minutes:Seconds:Frames

```
    smpteBeats                  CycleTimeDisplayModes
```

---

## FILE: Project-Actions.md

* [[SaveProject|Project Actions#SaveProject]]
* [[Undo|Project Actions#Undo]]
* [[Redo|Project Actions#Redo]]

## SaveProject
The SaveProject action will save your current your current project in Reaper. The below example would suit an MCU type surface with a dedicated Save button but the CSI action can be assigned to any button on any surface.
```
Zone "Buttons"
    Save     SaveProject
ZoneEnd
```

## Undo
The Undo action will undo the last action in Reaper (as long as that action is captured in Reaper's Undo History). The below example would suit an MCU type surface with a dedicated Undo button but the CSI action can be assigned to any button on any surface.
```
Zone "Buttons"
    Undo     Undo
ZoneEnd
```

## Redo
The Redo action will redo the last action in Reaper (as long as an action captured by Reaper's Undo History was recently undone). Here it's being used with a Shift modifier combined with the Undo button on an MCU-style surface but the CSI action can be assigned to any button [or combination] on any surface.
```
Zone "Buttons"
    Shift+Undo     Redo
ZoneEnd
```

---

## FILE: Automation-Actions.md

# Automation Actions

* [[TrackAutoMode|Automation-Actions#trackautomode-trackautomodedisplay]]
* [[TrackAutoModeDisplay|Automation-Actions#trackautomode-trackautomodedisplay]]
* [[GlobalAutoMode|Automation-Actions#globalautomode-globalautomodedisplay]]
* [[GlobalAutoModeDisplay|Automation-Actions#globalautomode-globalautomodedisplay]]
* [[CycleTrackAutoMode|Automation-Actions#cycletrackautomode]]

## TrackAutoMode, TrackAutoModeDisplay 
Use the CSI Action TrackAutoMode to assign a button to each of Reaper's Track Automation Modes. This action is designed to work on the selected track(s) without the need for a navigator, allowing it to work in a typical "Buttons" zone.

Here is an example of buttons mapped to each of the 5 automation modes in Reaper.

```` 
Zone "Buttons"
     Trim            TrackAutoMode 0      // Trim
     Read            TrackAutoMode 1      // Read
     Touch           TrackAutoMode 2      // Touch
     Write           TrackAutoMode 3      // Write
     Latch           TrackAutoMode 4      // Latch
     Alt+Latch       TrackAutoMode 5 	  // LatchPreview
ZoneEnd
```` 

TrackAutoModeDisplay can be combined with a TrackNavigator or SelectedTrackNavigator to show you the current automation mode. In this example, pressing Shift+RecordArm on a given channel will cycle through the automation mode on the selected track and the corresponding display will tell us which mode it's in.

```
Zone "Track"
    Shift+RecordArm|        CycleTrackAutoMode
    Shift+DisplayLower|     TrackAutoModeDisplay
ZoneEnd
```

## GlobalAutoMode, GlobalAutoModeDisplay
GlobalAutoMode is used to set Reaper's Global Automation override mode. You may want to use a modifier and put it in the same Zone as your other automation buttons as shown in the example below.

```
Zone "Buttons"
     Trim            TrackAutoMode 0      // Trim
     Read            TrackAutoMode 1      // Read
     Touch           TrackAutoMode 2      // Touch
     Write           TrackAutoMode 3      // Write
     Latch           TrackAutoMode 4      // Latch
     Alt+Latch       TrackAutoMode 5 	  // Latch Preview

     Shift+Trim      GlobalAutoMode 0     // Global automation override off
     Shift+Read      GlobalAutoMode 1     // Global Read
     Shift+Touch     GlobalAutoMode 2     // Global Touch
     Shift+Write     GlobalAutoMode 3     // Global Write
     Shift+Latch     GlobalAutoMode 4     // Global Latch
     Shift+Alt+Latch GlobalAutoMode 5     // Global Latch Preview
ZoneEnd
```

If you wanted to dedicate a display to showing the global auomation mode within Reaper (example: on an OSC device), there is now a CSI action that will display that.
```
Zone "Buttons"
     AutoModeDisplay     GlobalAutoModeDisplay
ZoneEnd
```
## CycleTrackAutoMode
Use the CSI action CycleTrackAutoMode when you're looking to cycle through the various automation modes in Reaper. **Note:** "Write" mode is left out by design in order to prevent accidental writing or over-writing of automation while cycling through modes.

Here Shift+RecordArm will cycle through the various automation modes.
```` 
	Shift+RecordArm|	CycleTrackAutoMode
```` 

---

## FILE: Other-Actions.md

* [[NoAction|Other Actions#NoAction]]
* [[FixedTextDisplay|Other Actions#FixedTextDisplay]]
* [[FixedRGBColorDisplay|Other Actions#FixedRGBColorDisplay]]
* [[ClearAllSolo|Other Actions|ClearAllSolo]]
* [[Broadcast|Broadcast and Receive]]
* [[Receive|Broadcast and Receive]]
* [[ToggleChannel|Other Actions#togglechannel]]
* [[SendMIDIMessage|Other Actions#sendmidimessage]]
* [[SendOSCMessage|Other Actions#sendoscmessage]]
* [[SetXTouchDisplayColors|Other Actions#setxtouchdisplaycolors-restorextouchdisplaycolors]]
* [[RestoreXTouchDisplayColors|Other Actions#setxtouchdisplaycolors-restorextouchdisplaycolors]]
* [[Speak|Other Actions#speak]]
* [[SpeakFXMenuName|Other Actions#speakfxmenuname-speaktracksenddestination-speaktrackreceivesource]]
* [[SpeakTrackSendDestination|Other Actions#speakfxmenuname-speaktracksenddestination-speaktrackreceivesource]]
* [[SpeakTrackReceiveSource|Other Actions#speakfxmenuname-speaktracksenddestination-speaktrackreceivesource]]

## NoAction
The cunningly named NoAction action, does nothing. I'll just pause for a second while that sinks in. Now, contrary to what you might be thinking, this can be really useful. 

Let's say you [[GoZone|Zone-Actions]] from "Home" to "FX". As discussed on the [[Zones]] page, this effectively overlays "FX" over the top of "Home". Widgets mapped in "FX" take over "Home" behaviour. Widgets mapped in "Home" but NOT in "FX" still work as they did before.

However, what if you want to stop this behavior? Maybe in "FX", we want to cancel the "Home" behaviour to avoid operator errors. For example, perhaps in "Home" I have the transport controls mapped to widgets, but in"FX" I want to "disable" these mappings?

In that case, map them to NoAction in "FX" and they will defiantly ignore your presses until you [[GoZone|Zone-Actions]] back to "Home".
```
Zone "VST: UAD Teletronix LA-2A Silver (Universal Audio, Inc.)" "LA2ASlv"
     Rotary1             FXParam 0 
     RotaryPush1         NoAction
     DisplayUpper1       FixedTextDisplay "Thresh"
     DisplayLower1       FXParamValueDisplay 0

     Rotary2             FXParam 3
     RotaryPush2         NoAction  
     DisplayUpper2       FixedTextDisplay "HF Emph"
     DisplayLower2       FXParamValueDisplay 3

     Rotary3             FXParam 1
     RotaryPush3         NoAction 
     DisplayUpper3       FixedTextDisplay "Output" 
     DisplayLower3       FXParamValueDisplay 1 

     Rotary4             NoAction
     RotaryPush4         FXParam 2 [ 0.0 1.0 ]
     DisplayUpper4       FixedTextDisplay "CompLim" 
     DisplayLower4       FXParamValueDisplay 2

     Rotary5             FXParam 4 [ 0.0 0.50 1.0 ]
     RotaryPush5         NoAction     
     DisplayUpper5       FixedTextDisplay "Meter" 
     DisplayLower5       FXParamValueDisplay 4

     Rotary6             NoAction
     RotaryPush6         NoAction     
     DisplayUpper6       NoAction
     DisplayLower6       NoAction

     Rotary7             NoAction 
     RotaryPush7         NoAction
     DisplayUpper7       NoAction 
     DisplayLower7       NoAction 

     Rotary8             FXParam 8
     RotaryPush8         ToggleFXBypass
     DisplayUpper8       FixedTextDisplay "Wet"
     DisplayLower8       FXBypassedDisplay
ZoneEnd
```

## FixedTextDisplay
Use the FixedTextDisplay action when you want to show static text within one of your displays. For instance, in this example, holding Shift and pressing RotaryPushA1 will reset (center) FXParam 1 on a particular fx.zon. But I want to leave myself a reminder of this functionality, so I added a message that will say "Press to Reset" on the lower display for that widget as soon as I engage the Shift modifier.
```
     Shift+RotaryPushA1        FXParam 1 [ 0.5 ]
     Shift+DisplayLowerA1      FixedTextDisplay "Press to Reset"
```


## FixedRGBColorDisplay
Use this if you want to have a supported display widget [Select buttons on FaderPort8/16] change color in a particular zone. The values in the squiggly brackets represent the RGB (red, green, blue) color values. 

In the below example, FixedRGBColorDisplay is being used to set the colors of certain buttons when entering this custom "NavigatorPan" SubZone. In this case, when the zone is active, the Pan button will turn blue { 0 55 255 }, and the other navigation buttons on this surface (Channel, Scroll) will go dark { 0 5 20 }.
```
Zone "NavigatorPan"
  Pan                   FixedRGBColorDisplay { 0 55 255 }

  Channel               FixedRGBColorDisplay { 0 5 20 }
  Channel               GoHome
  Channel               GoSubZone "NavigatorChannel"

  Scroll                FixedRGBColorDisplay { 0 5 20 }
  Scroll                GoHome
  Scroll                GoSubZone "NavigatorScroll"

  Shift+Scroll          FixedRGBColorDisplay { 0 5 20 }
  Shift+Scroll          GoHome
  Shift+Scroll          GoSubZone "NavigatorZoom"

  RotaryBigPush         Reaper _XENAKIOS_PANTRACKSCENTER // Xenakios/SWS: Pan selected tracks to center
  RotaryBig             TrackPan
ZoneEnd
```

## ClearAllSolo
ClearAllSolo is a CSI action designed to clear all solo'd tracks and also work with the global MCU 'Solo' widget to provide a visual indication that one or more tracks in your project may be in a solo'd state. 

Example: you have an MCU surface, and Reaper tracks 1-8 are currently mapped to the surface's 8 faders, but you've got track 32 solo'd. When assigned to a widget capable of displaying two-state feedback, your surface will display a light indicating there is a solo'd track anywhere in your project. Pressing the button assigned to this action, will then clear any and all solo'd tracks.

````
Zone "Buttons|"
        Solo            ClearAllSolo
ZoneEnd
````

## Broadcast, Receive
See [[Broadcast and Receive]] for details on how to use these actions.

## ToggleChannel
ToggleChannel allows you to define a widget, such as RotaryPush, to toggle functionality assigned to that action. Example: this allows you to toggle between TrackPanAutoLeft + TrackPanAutoLeftDisplay and TrackPanAutoRight + TrackPanAutoRightDisplay on the same channel on the same zone. To do this, first you would define "RotaryPush|" to the ToggleChannel action. Next, you would use Toggle+ as a modifier. 
```
Zone "Track"
    RotaryPush|                 ToggleChannel

    Rotary|                     TrackPanAutoLeft RingStyle=Dot
    Toggle+Rotary|              TrackPanAutoRight RingStyle=Dot

    DisplayLower|      		TrackPanAutoLeftDisplay
    Toggle+DisplayLower|   	TrackPanAutoRightDisplay
ZoneEnd
```
This functionality can also be used in FX.zon's to group like-parameters (example: you can flip between the Frequency and Q control on an EQ plugin).
```
Zone "VST: ReaEQ (Cockos)" "ReaEQ"

DisplayUpper1   		FXParamNameDisplay 0 "Frq_1"
DisplayLower1   		FXParamValueDisplay 0
Toggle+DisplayUpper1   	        FXParamNameDisplay 2 "Q_1"
Toggle+DisplayLower1   	        FXParamValueDisplay 2
Rotary1         		FXParam 0	[ (0.0003,0.0006,0.001,0.002,0.003,0.008,0.04) ]
Toggle+Rotary1         	        FXParam 2
RotaryPush1     		ToggleChannel
Record1         		NoAction
Solo1           		NoAction
Mute1           		FXParam 13 [ 0.0 1.0 ]
Select1         		NoAction
Fader1          		NoAction
....
ZoneEnd
```

## SendMIDIMessage
SendMIDIMessage allows you to send arbitrary MIDI message to any CSI device based on whatever conditions you'd like to setup. This is great for devices like the MIDIFighterTwister, the Launch Pads, and other MIDI surfaces that will change colors or functionality based on MIDI messages they receive. For example, I'm doing this in my Home.zon to turn on strobing and change colors of buttons on my MIDI Fighter Twister based on the playback and record states in Reaper.
```
Zone "Home"
OnRecordStart SendMIDIMessage "B1 0F 50"     // Makes button B8 red on record start
OnRecordStart SendMIDIMessage "B5 0F 04"     // Makes button B8 strobe on record start
OnRecordStop  SendMIDIMessage "B1 0F 5F"     // Makes button B8 pink on record stop
OnRecordStop  SendMIDIMessage "B5 0F 00"     // Makes button B8 stop strobing on record stop
OnPlayStart   SendMIDIMessage "B1 0E 2D"     // Makes button B8 green on play start
OnPlayStart   SendMIDIMessage "B5 0E 04"     // Makes button B8 strobe on play start
OnPlayStop    SendMIDIMessage "B1 0E 5F"     // Makes button B8 pink on play stop
OnPlayStop    SendMIDIMessage "B5 0E 00"     // Makes button B8 stop strobing on play start
     IncludedZones
          "SelectedTrack"r
          "Buttons"
          "SelectedTrackFXMenu"
          "SelectedTrackSend"
          "SelectedTrackReceive"
     IncludedZonesEnd
ZoneEnd
```

You can, of course, assign this to a button.
```
Zone "Buttons"
    SommeButton     SendMIDIMessage "B5 0E 04"     // Makes button B8 strobe on play start
ZoneEnd
```

## SendOSCMessage
SendOSCMessage is designed to send arbitrary OSC messages to the address specified in the action. The syntax is [Widget/Virtual Widget] SendOSCMessage "[OSC address] [Value]" as shown in the examples below...

    OnInitialization SendOSCMessage "/Displays/UpperDisplay1 aString".   // String 
    OnInitialization SendOSCMessage "/Displays/LowerDisplay1 -123"       // 32-bit integer
    OnInitialization SendOSCMessage "/Displays/ValueDisplay1 24.98".     // Float

## SetXTouchDisplayColors, RestoreXTouchDisplayColors
SetXTouchDisplayColors and RestoreXTouchDisplayColors are highly specialized actions for the X-Touch Universal and X-Touch Extenders to set the colors of all displays at once. When combined with the new OnZoneActivation, OnZoneDeactivation virtual widgets, these allow you to set all of the surface displays to the same color when you enter a SelectedTrackFXMenu zone and restore the prior colors when you exit that Zone...
```
Zone "SelectedTrackFXMenu"
	OnZoneActivation	SetXTouchDisplayColors Yellow
	OnZoneDeactivation	RestoreXTouchDisplayColors
...
ZoneEnd
```

On the X-Touch, you can also set all 8 colors to any arbitrary value you'd like, but it MUST be all 8 colors. You include the color name for each of the 8 channels in a string with quotes. The syntax for that is shown below:
```
      OnZoneActivation     SetXTouchDisplayColors "Red Red Magenta Blue Yellow Green Cyan Red"
```

**Important Note:** The X-Touch firmware only supports 8 track colors. These are not full RGB screens. CSI will translate the colors in Reaper to the nearest approximation of the colors supported on the X-Touch, which are...
```
Black
White
Red
Green
Blue
Cyan
Magenta
Yellow
```

## Speak
[OSARA](https://osara.reaperaccessibility.com/) is described as "a Reaper extension that aims to make Reaper accessible to screen reader users." CSI has added preliminary support for OSARA with the goal of improving CSI with these screen readers. A new "Speak" action was added that can be triggered in various scenarios. See the example below which would speak the phrase "UAD Fairchild 660 Compressor" when the FX.zon was activated.
```
Zone "VST: UAD Fairchild 660 (Universal Audio, Inc.)" "Fair660"
	OnZoneActivation	Speak "UAD Fairchild 660 Compressor"

	DisplayUpper1		FixedTextDisplay "HdRoom"
 	DisplayLower1		FXParamValueDisplay 9
	Rotary1			FXParam 9 [ 0.0 0.17 0.33 0.50 0.67 0.83 1.0 ]
   ...
ZoneEnd
``` 

**Tip:** Another use-case is creating a "Help" SubZone that can be called to identify what each button and control does on a surface. To do this, first you would add a SubZone called "Help" in your BUttons.zon with an action to call it up as needed (in this case, the smpteBeats button). Thanks to Equitone for the use-case and the examples below!
```
Zone "Buttons"
    SubZones
           "Help"
    SubZonesEnd

    smpteBeats                  GoSubZone "Help"
```

Then you'd have the below Help.zon file (assuming you're using an MCU or X-Touch Universal surface) where each control has its function spoken to the user. As with all things CSI, you may need to customize or otherwise modify this zone to fit your particular mapping.
```
Zone "Help"
    OnZoneActivation                Speak "XTouch help : ON"
    smpteBeats                      Speak "XTouch Help : OFF"
    smpteBeats                      LeaveSubZone

    // Modifiers declaration
    Flip           Speak "Flip, volume on rotaries, pan on faders"
    Flip           Flip

    // Left panel
    RotaryPush1        Speak "RotaryPush1, Set track 1 center pan"
    RotaryPush2        Speak "RotaryPush2, Set track 2 center pan"
    RotaryPush3        Speak "RotaryPush3, Set track 3 center pan"
    RotaryPush4        Speak "RotaryPush4, Set track 4 center pan"
    RotaryPush5        Speak "RotaryPush5, Set track 5 center pan"
    RotaryPush6        Speak "RotaryPush6, Set track 6 center pan"
    RotaryPush7        Speak "RotaryPush7, Set track 7 center pan"
    RotaryPush8        Speak "RotaryPush8, Set track 8 center pan"
    Rotary1            Speak "Rotary1, Track 1 pan value"
    Rotary2            Speak "Rotary2, Track 2 pan value"
    Rotary3            Speak "Rotary3, Track 3 pan value"
    Rotary4            Speak "Rotary4, Track 4 pan value"
    Rotary5            Speak "Rotary5, Track 5 pan value"
    Rotary6            Speak "Rotary6, Track 6 pan value"
    Rotary7            Speak "Rotary7, Track 7 pan value"
    Rotary8            Speak "Rotary8, Track 8 pan value"
    Flip+Rotary1       Speak "Flip+Rotary1, Track 1 volume" 
    Flip+Rotary2       Speak "Flip+Rotary2, Track 2 volume" 
    Flip+Rotary3       Speak "Flip+Rotary3, Track 3 volume" 
    Flip+Rotary4       Speak "Flip+Rotary4, Track 4 volume" 
    Flip+Rotary5       Speak "Flip+Rotary5, Track 5 volume" 
    Flip+Rotary6       Speak "Flip+Rotary6, Track 6 volume" 
    Flip+Rotary7       Speak "Flip+Rotary7, Track 7 volume" 
    Flip+Rotary8       Speak "Flip+Rotary8, Track 8 volume" 
    RecordArm1         Speak "RecordArm1, Track 1 record arm"
    RecordArm2         Speak "RecordArm2, Track 2 record arm"
    RecordArm3         Speak "RecordArm3, Track 3 record arm"
    RecordArm4         Speak "RecordArm4, Track 4 record arm"
    RecordArm5         Speak "RecordArm5, Track 5 record arm"
    RecordArm6         Speak "RecordArm6, Track 6 record arm"
    RecordArm7         Speak "RecordArm7, Track 7 record arm"
    RecordArm8         Speak "RecordArm8, Track 8 record arm"
    Solo1              Speak "Solo1, Track 1 solo"
    Solo2              Speak "Solo2, Track 2 solo"
    Solo3              Speak "Solo3, Track 3 solo"
    Solo4              Speak "Solo4, Track 4 solo"
    Solo5              Speak "Solo5, Track 5 solo"
    Solo6              Speak "Solo6, Track 6 solo"
    Solo7              Speak "Solo7, Track 7 solo"
    Solo8              Speak "Solo8, Track 8 solo"
    Mute1              Speak "Mute1, Track 1 mute"
    Mute2              Speak "Mute2, Track 2 mute"
    Mute3              Speak "Mute3, Track 3 mute"
    Mute4              Speak "Mute4, Track 4 mute"
    Mute5              Speak "Mute5, Track 5 mute"
    Mute6              Speak "Mute6, Track 6 mute"
    Mute7              Speak "Mute7, Track 7 mute"
    Mute8              Speak "Mute8, Track 8 mute"
    Select1            Speak "Select1, Track 1 select"
    Select2            Speak "Select2, Track 2 select"
    Select3            Speak "Select3, Track 3 select"
    Select4            Speak "Select4, Track 4 select"
    Select5            Speak "Select5, Track 5 select"
    Select6            Speak "Select6, Track 6 select"
    Select7            Speak "Select7, Track 7 select"
    Select8            Speak "Select8, Track 8 select"
    Hold+Select1       Speak "Hold+Select1, Track 1 volume to 0 DB"  
    Hold+Select2       Speak "Hold+Select2, Track 2 volume to 0 DB"
    Hold+Select3       Speak "Hold+Select3, Track 3 volume to 0 DB"
    Hold+Select4       Speak "Hold+Select4, Track 4 volume to 0 DB"
    Hold+Select5       Speak "Hold+Select5, Track 5 volume to 0 DB"
    Hold+Select6       Speak "Hold+Select6, Track 6 volume to 0 DB"
    Hold+Select7       Speak "Hold+Select7, Track 7 volume to 0 DB"
    Hold+Select8       Speak "Hold+Select8, Track 8 volume to 0 DB"
    nameValue          Speak "nameValue (No action)"
    GlobalView         Speak "GlobalView (No action)"
    Fader1             Speak "Fader1, Track 1 volume"
    Fader2             Speak "Fader2, Track 2 volume"
    Fader3             Speak "Fader3, Track 3 volume"
    Fader4             Speak "Fader4, Track 4 volume"
    Fader5             Speak "Fader5, Track 5 volume"
    Fader6             Speak "Fader6, Track 6 volume"
    Fader7             Speak "Fader7, Track 7 volume"
    Fader8             Speak "Fader8, Track 8 volume"
    Flip+Fader1        Speak "Flip+Fader1, Track 1 pan value"
    Flip+Fader2        Speak "Flip+Fader2, Track 2 pan value"
    Flip+Fader3        Speak "Flip+Fader3, Track 3 pan value"
    Flip+Fader4        Speak "Flip+Fader4, Track 4 pan value"
    Flip+Fader5        Speak "Flip+Fader5, Track 5 pan value"
    Flip+Fader6        Speak "Flip+Fader6, Track 6 pan value"
    Flip+Fader7        Speak "Flip+Fader7, Track 7 pan value"
    Flip+Fader8        Speak "Flip+Fader8, Track 8 pan value"
    MasterFader        Speak "MasterFader, Master track volume"

    // Right panel
    Track                       Speak "Track, OSARA: Toggle Report changes made via control surfaces"
    Pan                         Speak "Pan, OSARA: Toggle Report track numbers"
    EQ                          Speak "EQ, OSARA: Toggle Report transport state (play, record, etc.)"
    Send                        Speak "Send, OSARA: Toggle Report markers during playback"
    Plugin                      Speak "Plugin, OSARA: Toggle Report time movement during playback/recording"
    Instrument                  Speak "Instrument, OSARA: Toggle Report position when scrubbing"
    MidiTracks                  Speak "MidiTracks, No action"
    Inputs                      Speak "Inputs, No action"
    AudioTracks                 Speak "AudioTracks, No action"
    AudioInstrument             Speak "AudioInstrument, No action"
    Aux                         Speak "Aux, No action"
    Busses                      Speak "Busses, No action"
    Outputs                     Speak "Outputs, No action"
    User                        Speak "User, No action"
    F1                          Speak "F1, Toggle selected track send and tracks (Osara don't works in track send zone)"
    F2                          Speak "F2, Toggle selected track receive and tracks (Osara don't works in track receive zone)"
    F3                          Speak "F3, All track visible"
    F4                          Speak "F4, Track folders only"
    F5                          Speak "F5, No action"
    F6                          Speak "F6, No action"
    F7                          Speak "F7, No action"
    F8                          Speak "F8, No action"
    Shift                       Speak "Shift, Shift modifier"
    Shift                       Shift
    Option                      Speak "Option, Option modifier"
    Option                      Option
    Control                     Speak "Control, Control modifier"
    Control                     Control
    Alt                         Speak "Alt, Alt modifier"    
    Alt                         Alt
    Read                        Speak "Read, Read mode automation"
    Write                       Speak "Write, Write mode automation"
    Trim                        Speak "Trim, Trim mode automation"
    Touch                       Speak "Touch, Touch mode automation"
    Latch                       Speak "Latch, Latch mode automation"
    Group                       Speak "Group, Group mode automation"
    Shift+Read                  Speak "Shift+Read, Global Read mode automation"      
    Shift+Write                 Speak "Shift+Write, Global Write mode automation"      
    Shift+Trim                  Speak "Shift+Trim, Global Trim mode automation"      
    Shift+Touch                 Speak "Shift+Touch, Global Touch mode automation"      
    Shift+Latch                 Speak "Shift+Latch, Global Latch mode automation"      
    Shift+Group                 Speak "Shift+Group, Global Group mode automation"      
    Save                        Speak "Save, NoAction "
    Undo                        Speak "Undo, NoAction"
    Cancel                      Speak "Cancel, NoAction""
    Enter                       Speak "Enter, NoAction""
    Marker                      Speak "Marker, Select master track"
    Hold+Marker                 Speak "Hold+Marker, Master track to 0 db"
    Nudge                       Speak "Nudge, NoAction""
    Cycle                       Speak "Cycle, NoAction""
    Drop                        Speak "Drop, NoAction""
    Replace                     Speak "Replace, NoAction""
    Click                       Speak "Click, Toggle click"
    Solo                        Speak "Solo, NoAction""
    Rewind                      Speak "Rewind, Go to previous bar"
    Hold+Rewind                 Speak "Hold+Rewind, Go to start of project"
    FastForward                 Speak "FastForward, Go to next bar"
    Hold+FastForward            Speak "Hold+Rewind, Go to end of project"
    Stop                        Speak "Stop, Stop playing or recording"
    Play                        Speak "Play, Play/Pause"
    Record                      Speak "Record, Start recording"
    BankLeft                    Speak "BankLeft, Shift faders 8 tracks to left"
    BankRight                   Speak "BankRight, Shift faders 8 tracks to right"
    ChannelLeft                 Speak "ChannelLeft, Shift faders 1 tracks to left"
    ChannelRight                Speak "ChannelRight, Shift faders 1 tracks to right"    
    Up                          Speak "Up, Go to previous track"    
    Down                        Speak "Down, Go to next track"    
    Left                        Speak "Left, Select and go to previous item"    
    Right                       Speak "Right, Select and go to next item"    
    Zoom                        Speak "Zoom, Toggle Track mode and FX mode"    
    JogWheelRotaryCW            Speak "JogWheelRotaryCW, Move cursor 1 pixel to left"    
    JogWheelRotaryCCW           Speak "JogWheelRotaryCCW, Move cursor 1 pixel to right"     
    Scrub                       Speak "Scrub, Toggle loop segment scrub at edit cursor"     
    Footswitch1                 Speak "Play/Pause"     
    Footswitch2                 Speak "Start recording"     
ZoneEnd
```

## SpeakFXMenuName, SpeakTrackSendDestination, SpeakTrackReceiveSource
The following new actions were added for OSARA users in order to allow CSI to speak the FX Menu Name of a plugin (SpeakFXMenuName) in the menu, or the track send destination (SpeakTrackSendDestination), or the receive source (SpeakTrackReceiveSource). These can be assigned to widgets to trigger when these actions take place. Note: SpeakTrackSendDestination and SpeakTrackReceiveSource will include the track number when speaking.

```
Zone "SelectedTrackFXMenu"
    RecArm     SpeakFXMenuName
...
```

```
Zone "SelectedTrackSend"
    RecArm     SpeakTrackSendDestination
...
```

```
Zone "SelectedTrackReceive"
    RecArm     SpeakTrackReceiveSource
...
```

---

## FILE: Invoking-Multiple-Actions-(Macro-Actions).md

CSI allows you to invoking multiple Actions from a single control by simply defining more than one action your zone file. This allows you to effectively create CSI macros actions. The actions will be executed in the order they appear in the zone definition.

For example, the below string of actions will toggle showing folders only, or their children.
```
Zone "Buttons"
        Shift+F4     Reaper 41803     //Track: Select all top level tracks
        Shift+F4     Reaper 41665     //Mixer: Show/hide children of selected tracks
        Shift+F4     Reaper 40297     //Track: Unselect all tracks
ZoneEnd 
```

The next example combines some SWS actions with a GoHome command to close plugin windows whenever you GoHome.
```
Zone "Buttons"
    GlobalView                  GoHome
    GlobalView                  Reaper _S&M_WNCLS3        	// Close all floating FX windows
    GlobalView                  Reaper _S&M_WNCLS4        	// Close all FX chain windows
ZoneEnd 
```

The next example shows how you can run multiple actions in a SelectedTrackFXMenu to open the plugin GUI as you map the plugin.
```
Zone "SelectedTrackFXMenu"
    RotaryPushA|                 GoFXSlot
    RotaryPushA|                 Reaper "_S&M_FLOATFX|"
    RotaryPushA|                 Reaper "_S&M_SELFX|"
ZoneEnd
```


---

## FILE: Action-Reference.md

## CSI Actions

### Transport and Timeline
* [[Rewind|Transport Actions#Rewind]]
* [[FastForward|Transport Actions#FastForward]]
* [[Play|Transport Actions#Play]]
* [[Stop|Transport Actions#Stop]]
* [[Record|Transport Actions#Record]]
* [[CycleTimeline|Transport Actions#CycleTimeline]]
* [[MCUTimeDisplay|Transport Actions#MCUTimeDisplay]]
* [[OSCTimeDisplay|Transport Actions#OSCTimeDisplay]]
* [[CycleTimeDisplayModes|Transport Actions#CycleTimeDisplayModes]]

### Tracks
* [[TrackVolume|Track-Actions#trackvolume-trackvolumedisplay]]
* [[SoftTakeover7BitTrackVolume|Track-Actions#softtakeover7bittrackvolume]]
* [[SoftTakeover14BitTrackVolume|Track-Actions#softtakeover14bittrackvolume]]
* [[TrackPanAutoLeft|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPanAutoRight|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPan|Track-Actions#trackpan-trackpandisplay]]
* [[TrackPanWidth|Track-Actions#trackpanwidth-trackpanwidthdisplay]]
* [[TrackPanL|Track-Actions#trackpanl-trackpanldisplay]]
* [[TrackPanR|Track-Actions#trackpanr-trackpanrdisplay]]
* [[TrackSelect|Track-Actions#trackselect]]
* [[TrackUniqueSelect|Track-Actions#trackuniqueselect]]
* [[TrackRangeSelect|Track-Actions#trackrangeselect]]
* [[TrackSolo|Track-Actions#tracksolo]]
* [[TrackMute|Track-Actions#trackmute]]
* [[TrackRecordArm|Track-Actions#trackrecordarm]]
* [[TrackInvertPolarity|Track-Actions#trackinvertpolarity]]
* [[CycleTrackInputMonitor|Track-Actions#cycletrackinputmonitor]]
* [[TrackInputMonitorDisplay|Track-Actions#trackinputmonitordisplay]]
* [[TrackNameDisplay|Track-Actions#tracknamedisplay]]
* [[TrackNumberDisplay|Track-Actions#tracknumberdisplay]]
* [[TrackVolumeDisplay|Track-Actions#trackvolume-trackvolumedisplay]]
* [[TrackPanAutoLeftDisplay|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPanAutoRightDisplay|Track-Actions#trackpanautoleft-trackpanautoright-trackpanautoleftdisplay-trackpanautorightdisplay]]
* [[TrackPanDisplay|Track-Actions#TrackPan-trackpandisplay]]
* [[TrackPanWidthDisplay|Track-Actions#trackpanwidth-trackpanwidthdisplay]]
* [[TrackPanLeftDisplay|Track-Actions#trackpanl-trackpanleftdisplay]]
* [[TrackPanRightDisplay|Track-Actions#trackpanr-trackpanrightdisplay]]
* [[TrackOutputMeter|Track-Actions#trackoutputmeter]]
* [[TrackOutputMeterAverageLR|Track-Actions#trackoutputmeteraveragelr]]
* [[TrackOutputMeterMaxPeakLR|Track-Actions#trackoutputmetermaxpeaklr]]

### Track Sends
* [[TrackSendVolume|Send-Zones#send-actions]]
* [[TrackSendPan|Send-Zones#send-actions]]
* [[TrackSendMute|Send-Zones#send-actions]]
* [[TrackSendPrePost|Send-Zones#send-actions]]
* [[TrackSendStereoMonoToggle|Send-Zones#send-actions]]
* [[TrackSendInvertPolarity|Send-Zones#send-actions]]
* [[TrackSendNameDisplay|Send-Zones#send-actions]]
* [[TrackSendVolumeDisplay|Send-Zones#send-actions]]
* [[TrackSendPanDisplay|Send-Zones#send-actions]]
* [[TrackSendPrePostDisplay|Send-Zones#send-actions]]

### Track Receives
* [[TrackReceiveVolume|Receive-Zones#receive-actions]]
* [[TrackReceivePan|Receive-Zones#receive-actions]]
* [[TrackReceiveMute|Receive-Zones#receive-actions]]
* [[TrackReceivePrePost|Receive-Zones#receive-actions]] 
* [[TrackReceiveInvertPolarity|Receive-Zones#receive-actions]] 
* [[TrackReceiveNameDisplay|Receive-Zones#receive-actions]] 
* [[TrackReceiveVolumeDisplay|Receive-Zones#receive-actions]]
* [[TrackReceivePanDisplay|Receive-Zones#receive-actions]]
* [[TrackReceivePrePostDisplay|Receive-Zones#receive-actions]]

### FX
* [[FXParam|FX Parameter Mapping Actions#FXParam]] 
* [[FXNameDisplay|FX Parameter Mapping Actions#FXParamValueDisplay]] 
* [[FXParamNameDisplay|FX Parameter Mapping Actions#FXParamNameDisplay]] 
* [[FXParamValueDisplay|FX Parameter Mapping Actions#FXParamValueDisplay]] 
* [[FXMenuNameDisplay|FX-Parameter-Mapping-Actions#fxmenunamedisplay]]
* [[FocusedFXParam|FX Parameter Mapping Actions#focusedfxparam]]
* [[FocusedFXParamNameDisplay|FX Parameter Mapping Actions#focusedfxparamnamedisplay-and-focusedfxparamvaluedisplay]]
* [[FocusedFXParamValueDisplay|FX Parameter Mapping Actions#focusedfxparamnamedisplay-and-focusedfxparamvaluedisplay]]
* [[ToggleEnableFocusedFXMapping|FX Parameter Mapping Actions#ToggleEnableFocusedFXMapping]]
* [[ToggleEnableFocusedFXParamMapping|FX Parameter Mapping Actions#ToggleEnableFocusedFXParamMapping]]
* [[ToggleFXBypass|FX Parameter Mapping Actions#ToggleFXBypass]]
* [[FXBypassDisplay|FX Parameter Mapping Actions#FXBypassDisplay]]
* [[ToggleFXOffline|FX Parameter Mapping Actions#togglefxoffline]]
* [[FXOfflineDisplay|FX Parameter Mapping Actions#togglefxoffline-fxofflinedisplay]]
* [[FXGainReductionMeter|FX Parameter Mapping Actions#FXGainReductionMeter]]
* [[GoFXSlot|FX-Parameter-Mapping-Actions#gofxslot]]

### Navigation
* [[TrackBank|Navigation Actions#trackbank]]
* [[SelectedTrackBank|Navigation Actions#selectedtrackbank]]
* [[TrackSendBank|Navigation Actions#tracksendbank]]
* [[TrackReceiveBank|Navigation Actions#trackreceivebank]]
* [[TrackFXMenuBank|Navigation Actions#trackfxmenubank]]
* [[SelectedTrackSendBank|Navigation Actions#selectedtracksendbank]]
* [[SelectedTrackReceiveBank|Navigation Actions#selectedtrackreceivebank]]
* [[SelectedTrackFXMenuBank|Navigation Actions#selectedtrackfxmenubank]]
* [[ToggleSynchPageBanking|Navigation Actions#togglesynchpagebanking]]
* [[ToggleScrollLink|Navigation Actions#togglescrolllink]]
* [[GoHome|Navigation Actions#gohome]]
* [[GoSubZone|Navigation Actions#gosubzone-leavesubzone]]
* [[LeaveSubZone|Navigation Actions#gosubzone-leavesubzone]]
* [[GoTrackSend|Navigation Actions#gotracksend]]
* [[GoTrackReceive|Navigation Actions#gotrackreceive]]
* [[GoTrackFXMenu|Navigation Actions#gotrackfxmenu]]
* [[GoSelectedTrackSend|Navigation Actions#goselectedtracksend]]
* [[GoSelectedTrackReceive|Navigation Actions#goselectedtrackreceive]]
* [[GoSelectedTrackFXMenu|Navigation Actions#goselectedtrackfxmenu]]
* [[GoSelectedTrackFX|Navigation Actions#goselectedtrackfx]]
* [[GoMasterTrack|Navigation Actions#gomastertrack]]
* [[GoPage|Navigation Actions#gopage-nextpage-pagenamedisplay]]
* [[NextPage|Navigation Actions#gopage-nextpage-pagenamedisplay]]
* [[PageNameDisplay|Navigation Actions#gopage-nextpage-pagenamedisplay]]

### Project Actions
* [[SaveProject|Project Actions#SaveProject]]
* [[Undo|Project Actions#Undo]]
* [[Redo|Project Actions#Redo]]

### VCA
* [[TrackToggleVCASpill|VCA's-and-VCA-Spill#togglevcamode]]
* [[CycleTrackVCAFolderModes|VCA's-and-VCA-Spill#cycletrackvcafoldermodes-trackvcafoldermodedisplay]]
* [[TrackVCAFolderModeDisplay|VCA's-and-VCA-Spill#cycletrackvcafoldermodes-trackvcafoldermodedisplay]]

### Automation
* [[TrackAutoMode|Automation-Actions#trackautomode-trackautomodedisplay]]
* [[TrackAutoModeDisplay|Automation-Actions#trackautomode-trackautomodedisplay]]
* [[GlobalAutoMode|Automation-Actions#globalautomode-globalautomodedisplay]]
* [[GlobalAutoModeDisplay|Automation-Actions#globalautomode-globalautomodedisplay]]
* [[CycleTrackAutoMode|Automation-Actions#cycletrackautomode]]

### Other
* [[NoAction|Other Actions#NoAction]]
* [[FixedTextDisplay|Other Actions#FixedTextDisplay]]
* [[FixedRGBColorDisplay|Other Actions#FixedRGBColorDisplay]]
* [[ClearAllSolo|Other Actions|ClearAllSolo]]
* [[Broadcast|Broadcast and Receive]]
* [[Receive|Broadcast and Receive]]
* [[ToggleChannel|Other Actions#togglechannel]]
* [[SendMIDIMessage|Other Actions#sendmidimessage]]
* [[SendOSCMessage|Other Actions#sendoscmessage]]
* [[SetXTouchDisplayColors|Other Actions#SetXTouchDisplayColors]]
* [[RestoreXTouchDisplayColors|Other Actions#restorextouchdisplaycolors]]
* [[Speak|Other Actions#speak]]
* [[SpeakFXMenuName|Other Actions#speakfxmenuname-speaktracksenddestination-speaktrackreceivesource]]
* [[SpeakTrackSendDestination|Other Actions#speakfxmenuname-speaktracksenddestination-speaktrackreceivesource]]
* [[SpeakTrackReceiveSource|Other Actions#speakfxmenuname-speaktracksenddestination-speaktrackreceivesource]]

### Modifiers
* [[Shift|Modifiers#global-modifiers]]
* [[Option|Modifiers#global-modifiers]]
* [[Control|Modifiers#global-modifiers]]
* [[Alt|Modifiers#global-modifiers]]
* [[Touch|Modifiers#Touch]]
* [[InvertFB|Modifiers#InvertFB]]
* [[Hold|Modifiers#Hold]]
* [[Flip|Modifiers#Flip]]
* [[Marker|Modifiers#Marker]]
* [[Nudge|Modifiers#Nudge]]
* [[Scrub|Modifiers#Scrub]]
* [[Zoom|Modifiers#Zoom]]
* [[Toggle|Other Actions#togglechannel]]
* [[Increase|Modifiers#Increase-Decrease]]
* [[Decrease|Modifiers#Increase-Decrease]]

## Reaper Actions
If you want to trigger Reaper actions from CSI, use the syntax shown below:
```    
Button1 Reaper 40454 
Button2 Reaper _0e5b196e7f67994bab6de09c49f05926    
Button3 Reaper _SWSTL_SHOWALL    
```
Invokes the Reaper Action (custom or built in) specified by the Reaper Command ID in the argument. The syntax is the Widbet name, followed by the word Reaper, followed by the Command ID. How do you get the Command ID? Open the Reaper Action List, right-click on the action name, and select "Copy selected action command ID" which copies it to your clipboard. Paste the Command ID into the .zon file at the appropriate location. 

As a best practice, you can label the command ID in your .zon using two forward slashes to leave trailing comments like this:
```    
Button1 _S&M_FXBYPLAST     // Bypasses last touched FX on the selected track
```




---

## FILE: Stepped-Parameters-and-Toggles.md

This page will cover manually mapping toggles and stepped parameters to buttons. Visit the [Encoders](https://github.com/GeoffAWaddington/CSIWiki/wiki/Message-Generators#Encoders) page for details on how to map stepped parameters to an endless rotary encoder.

Before you go further however, it's important you also be aware of [[ZoneStepSize files|FX-and-Instrument-Mapping#zonestepsizes-and-stp-files]] because they may negate the need for the manual effort required to manually define step sizes.

# Toggles [ Two Steps ]

Any on/off type of parameter needs to be mapped in CSI using a syntax where the off position is normalized to a value of 0.0 and the on position is normalized to a value of 1.0. These get placed in brackets following the parameter or CSI action. 

The below example illustrates the syntax for a simple on/off toggle mapped to a button:
```
SomeButton     FXParam 10 [ 0.0 1.0 ]
```
As your about to discover, this type of syntax is the same regardless of how many steps you have.

# Parameter Resets [ One Step ]
You can even use the same syntax above to reset parameters to a particular default value that you define in the zone file. This can be a very efficient way to reset your pans, volume, input/output gains or re-center bipolar FX knobs in a plugin.zon file, etc.

In this example, Shift+Select will reset the fader to unity gain, RotaryPush will reset the pan to center, Shift+RotaryPush will reset the Pan Width to the maximum width, and so on for Pan Left and Pan Right.
```
Select|              TrackUniqueSelect
Fader|               TrackVolume        
Shift+Select         TrackVolume [ 0.716 ]  // Sets fader to unity gain
Rotary|              TrackPan "1"
RotaryPush|          TrackPan [ 0.5 ]       // Centers Pan
Shift+Rotary|        TrackPanWidth
Shift+RotaryPush|    TrackPanWidth [ 1.0 ]  // Maxes out the track width
Option+Rotary|       TrackPanL 
Option+RotaryPush|   TrackPanL [ 0.0 ]      // Full left
Rotary|              TrackPanR
Control+RotaryPush|  TrackPanR [ 1.0 ]      // Full right
```

# Stepped Parameters [ Multiple Steps ]
Mapping multiple steps is essentially the same as mapping a toggle, there are just more steps that need to be added to the list. When you're mapping multiple steps an ascending list will loop back to the beginning when it reaches the end of the list. A descending list will not loop. This is by design to avoid someone accidentally blasting themselves with volume if they assign a limiter's gain to stepped parameter list and suddenly go from silence [ 0.0 ] position to full blast [ 1.0 ] when they cycle through the list.

```
Zone "VST: TR5 Tape Machine 80 (IK Multimedia)" "Tape Machine 80"
Button1  FXParam 3 [ 0.0 0.34 0.67 1.0 ]      // Step up a list: this WILL loop
Button2  FXParam 3 [ 1.0 0.67 0.34 0.0 ]      // Step down: this will NOT loop
ZoneEnd
```

You can also use an Encoder to scroll through stepped parameters. Here, I'm using Rotary 1 (an encoder widget) to cycle through the stepped parameters.
```
Zone "VST: TR5 Tape Machine 80 (IK Multimedia)" "Tape Machine 80"
Rotary1  FXParam 3 [ 0.0 0.34 0.67 1.0 ]
ZoneEnd
```

For more information on assigning Stepped Parameters to encoders in CSI see the section on [Encoder Customization.](https://github.com/GeoffAWaddington/CSIWiki/wiki/Message-Generators#encoder-customization)

## Stepped Parameter Reference Table
Most developers will evenly distribute and normalize the number of parameter steps in their plugins. This won't always be true, but I'd say it's the case for around 98% of stepped parameters. As a result, you can try to reference the below list of parameter step sizes. Remember: only copy the stuff in the brackets, not the number that precedes them.

```
# of Steps: [ values ]
2:    [ 0.00 1.00 ]                                                                                                                                            
3:    [ 0.00 0.50 1.00 ]                                                                                                                                       
4:    [ 0.00 0.33 0.67 1.00 ]                                                                                                                                  
5:    [ 0.00 0.25 0.50 0.75 1.00 ]                                                                                                                             
6:    [ 0.00 0.20 0.40 0.60 0.80 1.00 ]                                                                                                                        
7:    [ 0.00 0.17 0.33 0.50 0.67 0.83 1.00 ]                                                                                                                   
8:    [ 0.00 0.14 0.29 0.43 0.57 0.71 0.86 1.00 ]                                                                                                              
9:    [ 0.00 0.13 0.25 0.38 0.50 0.63 0.75 0.88 1.00 ]                                                                                                         
10:   [ 0.00 0.11 0.22 0.33 0.44 0.56 0.67 0.78 0.89 1.00 ]                                                                                                    
11:   [ 0.00 0.10 0.20 0.30 0.40 0.50 0.60 0.70 0.80 0.90 1.00 ]                                                                                               
12:   [ 0.00 0.09 0.18 0.27 0.36 0.45 0.55 0.64 0.73 0.82 0.91 1.00 ]                                                                                          
13:   [ 0.00 0.08 0.17 0.25 0.33 0.42 0.50 0.58 0.67 0.75 0.83 0.92 1.00 ]                                                                                     
14:   [ 0.00 0.08 0.15 0.23 0.31 0.38 0.46 0.54 0.62 0.69 0.77 0.85 0.92 1.00 ]                                                                                
15:   [ 0.00 0.07 0.14 0.21 0.29 0.36 0.43 0.50 0.57 0.64 0.71 0.79 0.86 0.93 1.00 ]                                                                           
16:   [ 0.00 0.07 0.13 0.20 0.27 0.33 0.40 0.47 0.53 0.60 0.67 0.73 0.80 0.87 0.93 1.00 ]                                                                      
17:   [ 0.00 0.06 0.13 0.19 0.25 0.31 0.38 0.44 0.50 0.56 0.63 0.69 0.75 0.81 0.88 0.94 1.00 ]                                                                 
18:   [ 0.00 0.06 0.12 0.18 0.24 0.29 0.35 0.41 0.47 0.53 0.59 0.65 0.71 0.76 0.82 0.88 0.94 1.00 ]                                                            
19:   [ 0.00 0.06 0.11 0.17 0.22 0.28 0.33 0.39 0.44 0.50 0.56 0.61 0.67 0.72 0.78 0.83 0.89 0.94 1.00 ]                                                       
20:   [ 0.00 0.05 0.11 0.16 0.21 0.26 0.32 0.37 0.42 0.47 0.53 0.58 0.63 0.68 0.74 0.79 0.84 0.89 0.95 1.00 ]                                                  
21:   [ 0.00 0.05 0.10 0.15 0.20 0.25 0.30 0.35 0.40 0.45 0.50 0.55 0.60 0.65 0.70 0.75 0.80 0.85 0.90 0.95 1.00 ]                                             
22:   [ 0.00 0.05 0.10 0.14 0.19 0.24 0.29 0.33 0.38 0.43 0.48 0.52 0.57 0.62 0.67 0.71 0.76 0.81 0.86 0.90 0.95 1.00 ]                                        
23:   [ 0.00 0.05 0.09 0.14 0.18 0.23 0.27 0.32 0.36 0.41 0.45 0.50 0.55 0.59 0.64 0.68 0.73 0.77 0.82 0.86 0.91 0.95 1.00 ]                                   
24:   [ 0.00 0.04 0.09 0.13 0.17 0.22 0.26 0.30 0.35 0.39 0.43 0.48 0.52 0.57 0.61 0.65 0.70 0.74 0.78 0.83 0.87 0.91 0.96 1.00 ]                              
25:   [ 0.00 0.04 0.08 0.13 0.17 0.21 0.25 0.29 0.33 0.38 0.42 0.46 0.50 0.54 0.58 0.63 0.67 0.71 0.75 0.79 0.83 0.88 0.92 0.96 1.00 ]                         
26:   [ 0.00 0.04 0.08 0.12 0.16 0.20 0.24 0.28 0.32 0.36 0.40 0.44 0.48 0.52 0.56 0.60 0.64 0.68 0.72 0.76 0.80 0.84 0.88 0.92 0.96 1.00 ]                    
27:   [ 0.00 0.04 0.08 0.12 0.15 0.19 0.23 0.27 0.31 0.35 0.38 0.42 0.46 0.50 0.54 0.58 0.62 0.65 0.69 0.73 0.77 0.81 0.85 0.88 0.92 0.96 1.00 ]               
28:   [ 0.00 0.04 0.07 0.11 0.15 0.19 0.22 0.26 0.30 0.33 0.37 0.41 0.44 0.48 0.52 0.56 0.59 0.63 0.67 0.70 0.74 0.78 0.81 0.85 0.89 0.93 0.96 1.00 ]          
29:   [ 0.00 0.04 0.07 0.11 0.14 0.18 0.21 0.25 0.29 0.32 0.36 0.39 0.43 0.46 0.50 0.54 0.57 0.61 0.64 0.68 0.71 0.75 0.79 0.82 0.86 0.89 0.93 0.96 1.00 ]     
30:   [ 0.00 0.03 0.07 0.10 0.14 0.17 0.21 0.24 0.28 0.31 0.34 0.38 0.41 0.45 0.48 0.52 0.55 0.59 0.62 0.66 0.69 0.72 0.76 0.79 0.83 0.86 0.90 0.93 0.97 1.00 ]
```

**Important tip from Mixmonkey:**
> If this doesn't work out and the control 'gets stuck' at a particular step [this is usually a rounding difference], try increasing the next step's value by a small amount, say 0.01 or 0.02.

> Occasionally you come across plugins where the values are completely skewed and in those cases you'll have to do your best to work out what the steps actually are. I use BlueCat Patchwork, as it lets you assign a parameter to a control and then change the value in 1% increments, so you can see where the parameter changes.

---

## FILE: Tips-and-Tricks.md

## You Can Chain Actions For CSI "Macros"
Want to run a few actions in a set sequence? Just create multiple lines in your .zon files with the actions in the order you want. CSI will trigger each action in the order from the .zon file similar to running a custom action (or macro). In this example, holding select will 1) select the track, 2) toggle the mixer setting to show/hide children in folders (which would only apply if a parent folder track), and 3) toggle VCA spill (which would only apply if a VCA master track).

```
     Hold+Select|                       TrackUniqueSelect
     Hold+Select|                       Reaper 41665             //Mixer: Toggle show tracks in folders in mixer
     Hold+Select|                       TrackToggleVCASpill
```

## "Refresh All Surfaces" Reaper Action to Test Changes to Your .zon Files
If you're creating or modifying .zon files with Reaper open, and want to check out the changes, CSI will need to rescan the files. The most efficient way to do this (i.e. without needing to close and restart Reaper) is to run the Reaper action:

```
Control surface: Refresh all surfaces
```

...this will allow CSI's parser to rescan your .zon files. Just remember to actually save the changes to your .zon files before you run it (speaking from experience)!

## Cycling Through Hardware Inputs From Your Control Surface
Nos402 from the Reaper forums posted this trick which allows you to set the hardware input on your channel using SWS Cycle Actions. To do this, first setup a new SWS Cycle Action that looks like the one shown below. You basically add a row, right click it, click Insert statement -> REACONSOLE, then type in i1 if you want input 1, and i4 if you want input 4, etc. If you want a stereo pair, use i1s for stereo pair 1/2, and i3s for stereo pair 3/4. Be sure to "Add Step" in between each REACONSOLE command. 

![](https://i.imgur.com/4YF68mH.png)

Save that cycle action, and locate it in Reaper's Action List. Select it and Copy the Command ID. Now, we just have to add it to your [surface].zon file inside a zone with a selected track navigator similar to what's shown below. In my case, I'm using a one channel surface and have this linked to the Control modifier when used with the RecordArm button. Your Cycle Action number will likely differ than mine so be sure to copy yours from the Reaper Action List:

```
Zone "SelectedChannel"
     SelectedTrackNavigator
     Control+RecordArm1                 Reaper _S&M_CYCLACTION_12
ZoneEnd
```

That's it!

## Centering Pan and FX Input/Output Gain Parameters
You can use stepped parameters, or rather, a single-step parameter to center your pans or reset things like input/output gain on plugins. In the below example, I've got Input and Output Gain (plugin parameters 27 and 28 respectively) mapped to widgets RotaryB5 and B6 respectively. Now, in case I ever move them by accident or want to quickly reset them back to 0db, I'm utilizing the RotaryPush press with a single-step value of "[ 0.5 ]" to center the Input and Output gain parameters of this plugin.

```
DisplayUpperB5 FXParamNameDisplay 27 "Input"
DisplayLowerB5 FXParamValueDisplay 27 
RotaryB5 FXParam 27
RotaryPushB5 FXParam 27 [ 0.5 ]
Property+RotaryPushB5 NoFeedback   
/  
DisplayUpperB6 FXParamNameDisplay 28 "Output"
DisplayLowerB6 FXParamValueDisplay 28 
RotaryB6 FXParam 28
RotaryPushB6 FXParam 28 [ 0.5 ]
```

The same would work for pan as shown below...
```
Rotary|               TrackPan
Shift+RotaryPush|     TrackPan [ 0.5 ]
```

...this tip could of course be expanded to any plugin parameter.

## Resetting Track Volume
Similar to the pan reset trick above, you can reset the Track Volume of a channel to unity gain by doing something like this:

```
Control+Select      TrackVolume 	 [ 0.716 ]
```

...in this case, I'm using a combination of the Control modifier plus the channel Select button to reset the track volume to unity gain (which is what the 0.716 represents). **Note:** The unity-gain track volume level can vary a bit from Reaper install to Reaper install as it's dependent on the "Volume Fader Range" setting found in Reaper's Preferences -> Appearance -> Track Control Panels. So start with 0.716 and adjust that number up or down as needed to get the fader to reset to 0.0db.

## Exclusive Solo
This suggestion comes from Reaper forum user M4TU. If you want Exclusive Solo functionality (i.e. only one track solo'd at a time), you could do something like this in your TrackZone...

```
Zone "Track"
    Shift+Solo|     ClearAllSolo
    Shift+Solo|     TrackSolo
ZoneEnd
```

## Dedicated TrackNameDisplay for Last Touched Track
If you've got a surface that transmits touch messages and you want a display that will show the name of the track you're touching, you can attach a Fader Touch modifier to the display. But because fader touch messages were designed to override existing functionality, you'd have to add a FixedTextDisplay action wtih an empty string (just 2 empty quotes with a space between), followed by the fader touch syntax with a TrackNameDisplay as shown below.

```
Zone "Track"
    MainDisplay|                   FixedTextDisplay " "
    Fader|Touch+MainDisplay|       TrackNameDisplay
ZoneEnd
```

## Want to See the Active Zone or Mapping In Reaper?
Big thanks to Reaper forum user Manwë for this incredible tip! Would you like to see the active zone name, or even have the active mapping appear on screen within Reaper itself? You can do this by leveraging the “SWS/S&M: Resources - Show image, slot” actions and combining those with custom images.

![CSI-IMAGE-DEMO](https://user-images.githubusercontent.com/52307138/208313310-881d091e-dfc1-44f3-a4d9-25dc9afe7dc8.gif)

**Pre-Condition:** You must have SWS extensions installed. 

### Step 1: Increase the Number of Show Image Slots
By default, only 4 “Show Image Slots” exist. So if you want to extend the number of these, you need to open the S&M.ini, locate the line "S&M_SHOW_IMG=___", then change the number, resave the S&M.ini, and restart Reaper. 

### Step 2: Make .png template files for your zone names and/or mappings
Make a PNG template for your zones [you can use pixlr.com] and add them to your Images resources in your SWS Extensions menu. 

To make it easier, Manwë has already provided image files for the most common zone names which can be found here:
[CSI ZONE PNGs.zip](https://github.com/GeoffAWaddington/CSIWiki/files/10254403/CSI.ZONE.PNGs.zip)

### Step 3: Add your images in SWS Extensions
Now that we have images we want to use, we must assign those to the S&M Image Slots in Reaper.

1.	Open Reaper’s Action List
2.	Run the action “SWS/S&M: Open/close Resources window (images)”
3.	Right click on the empty space under the word slot and select “Add Slot”
4.	Locate the image file you’d like to assign to the S&M Show Image Slot 1 action
5.	Repeat this for other slots/images as required

### Step 4: Add the S&M Show Image Slot Actions to Your Zone Activation Buttons
Now you just need to add the images in the corresponding slots to the zone activation buttons (or OnZoneActivation virtual widget) within CSI.

Example: if I have Image Slot 1 assigned to show the Home.zon, and use the F1 button on my surface to go Home, I can do this to make “Home” appear in Reaper whenever I GoHome.
```
Zone "Buttons"

     F1                        GoHome
     F1                        Reaper _S&M_SHOW_IMG1
```

Repeat this as needed for other zones and image slots.

### Step 5: Setup the Window in Reaper as desired
You may want to dock the image window, you may prefer a floating window, you may want it on another screen. May be a good idea to include it in screen sets. 

### What if I Forget My Mapping? Can I Use it for That Too?
Yes, you can also use this to display images for your mapping, including creating a toggle using Cycle Actions to flip between the zone name image and the mapping image as shown below.

![CSI-TOGGLE-DEMO](https://user-images.githubusercontent.com/52307138/208313520-813d0015-51d5-4fba-94d6-6795d827cff9.gif)

To set this type of behavior up, first, make 2 new custom actions for the 2 images you want to use for the selected zone like the following:

```
///First custom action for the Surface mapping image. I named mine "CSI HOME MAPPING--> UNDOCK"

SWS/S&M: Resources - Show image, slot __
Dock/undock currently focused window
```

Second custom action...
```
///Second custom action to return to the docked CSI zone image. I named mine "CSI HOME ZONE-->DOCK"

SWS/S&M: Resources - Show image, slot __
Dock/undock currently focused window
```

Now, create an SWS Cycle Action with toggle enabled like the following:
```
(custom action command ID)          Custom: CSI HOME MAPPING-->UNDOCK
!                                   -----Step-----
(custom action command ID)          Custom: CSI HOME ZONE-->DOCK
```

Dock your Zone image where you'd like it, map your Cycle Action to a surface button in your zone and press, resize/locate your Mapping image where you'd like it and done!

The only downside is you would need to have the Zone image docked before activating another zone. Otherwise the Zone image and projection image are swapped. Quick fix though!

## I Want a Button Assigned to a Reaper Action to Remain Lit
Thanks to MT4U for this one! Imagine you've got a Reaper Action assigned to a button and that Reaper Action does not provide feedback so the button light is permanently off. But you'd prefer the opposite. You want the button light to remain on at all times. You can try using the Feedback=Yes widget mode combined with InvertFB modifier as shown below... 

```
     InvertFB+Drop          Reaper 41665 Feedback=Yes   //Show/hide children of selected tracks
```


---

## FILE: How-To:-Creating-a-Touch-OSC-Template,-.ost-file,-and-Zone-for-Use-in-CSI.md

## Creating a Simple OSC Template and .OST
Here, I’m going to show you how to create a simple single channel setup for a phone using TouchOSC Editor, that we’ll then create an .ost and .zon files for use in CSI. The goal of this guide is not to create the best TouchOSC layout ever, but rather, just expose you to the concepts so you can create your own TouchOSC devices in the future by expanding on what you learn here.

## Pre-Conditions:
* You’ve got TouchOSC Editor installed on your computer
* You’ve got TouchOSC installed on your phone or tablet
* They’re all talking to each other and Reaper (see my [[other guide|Setting Up Your Phone or Tablet as an OSC Device in CSI]] on setting up a similar configuration)

## Step 1: Create the Template in TouchOSC Editor
Let’s create a very simple template in Touch OSC Editor. I want a remote control where I can record myself remotely, and use my phone for Play, Record, Stop, with Volume and Pan on the selected channel. I also want a display to show me the Selected Track Name. So 6 controls total.

![Sample CSI Phone Remote](https://i.imgur.com/R7oAZss.png)

1.	Open TouchOSC Editor
2.	Where it says Layout on the left, I’m going to keep the size at “iPhone/iPadTouch” with a vertical orientation (default settings) – You should pick the size and layout that best matches your device!!!
3.	Below that where it says Page, then Name, pick a name for your page. It’s a best practice to name your pages.
4.	If you want to make that name visible on the template, click on “Label” and you can enter the page name in the Text field, and pick a color.
5.	Now, right click on the black background that represents the phone screen. This opens a dropdown menu of available controls/displays/etc. 
6.	Select “Push Button”
7.	Drag that button towards the bottom right and resize it to your liking being careful not to make it so small the control will be difficult to operate. 
8.	With the button selected and highlighted, let’s change the color to Green. Check the box for Local Feedback Off. 
9.	Now, with the button still selected, enter the name “Play” at the top then go down to the OSC tab, uncheck the “Auto” button, and provide a name for this control of: /Play. **Note:** If you were going to use multiple pages on your TouchOSC template, you can include a page number or page name in the control name by using an extra set of slashes. Example: let's say you want to call it page 1, play widget. That would look like this /1/Play. Then on page 2 you wanted a rotary, that might look like /2/Rotary1. And so forth. But let's not do multiple pages and keep it simple with just /Play for now.
 
![CSI Phone Remote Play Button](https://i.imgur.com/JvW7dRN.png)

10.	Now right click a blank area and select “Label H.” 
11.	Drag this label over the middle of our button. 
12.	With the label selected, name this “PlayLabel” at the top-left hand side…
13.	Change the color to Green
14.	Resize it so it fills up most of the button
15.	In the OSC tab uncheck auto
16.	Label this control /PlayLabel
17.	Uncheck the Background box
18.	Where it says “Text” enter Play (this is what will appear in the label unless we tell CSI to show something else)
19.	Change the size to something nice and big (say 20 or above)
 
![CSI Phone Remote Play Button Label](https://i.imgur.com/c6E5iTV.png)

20.	You’ve now created a button and a label
21.	Let’s repeat these steps and create a Stop button (yellow) and a Record button (red) that we’ll put right above the Play button. We’re going to update all of our labels and locations to say Stop and Record respectively. You should end up with something like this.

![CSI Phone Remote Play, Stop and Record Buttons](https://i.imgur.com/RLvfKCF.png)
 
Now let’s add a Fader for volume, a Rotary for pan, and a Label for our Track Name!

22.	Now Right-Click the black area again and select “Fader V” from the dropdown
23.	Drag this to the left of our buttons and make the size something comfortable
24.	Name this Fader1, maybe make it blue, with an OSC control name of /Fader1 – all other settings at default
25.	If the thick part of the fader is at the top, then check the box to invert the faders. For some reason, inverted faders (drawbar style) appear to be the normal.

![CSI Phone Remote Fader Sample](https://i.imgur.com/pzXOhCE.png)

26.	Right click an empty space and select “Rotary V” 
27.	Move it above record and resize it
28.	Let’s also make this blue, name it Rotary1, in the OSC tab give the control a name of /Rotary1 and leave all other settings at default

![CSI Phone Remote Rotary Sample](https://i.imgur.com/GHyxU7R.png)
 
One more control to go, let’s add a label.

29.	Right-click an empty area and select “Label H” again
30.	Let’s center this at the top
31.	Resize it to make wider
32.	Make the font size 18 or so
33.	Label this “DisplayUpper1” with an OSC control name of /DisplayUpper1 and in the Text field lets add the text “Selected Track Name” [optional].
 

![Completed Sample](https://i.imgur.com/YTJzeU8.png)
Do you have something that looks like this?

34.	Now save your template! 

## Step 2. Sync Your New Template to Your Phone or Tablet

1.	In TouchOSC Editor click Sync
2.	Open TouchOSC on your phone or Tablet
3.	Find the layout selection and click the name of your currently selected layout
4.	From the next window that appears, click Add
5.	Wait until your PC appears under “Found Hosts” and click that PC name
6.	This should automatically download your template to your phone or tablet
7.	Go back to the Layout and select it
8.	Click Done in the top right
9.	You should now see your layout on your phone or tablet

## Step 3. Create a CSI .ost File for Your Template
So now we need to define for CSI what controls exist in our template. So just as we need an .mst file for MIDI hardware, we need an .ost file for OSC templates. Being that we just created an OSC template from scratch, let’s create an .ost file from scratch too!

•	Open a text editor to begin creating your .ost file

•	Just like an .mst file, the first line is the word Widget followed by a description of that widget.

•	If it’s a control you’re going to go down a row and enter Control followed by the /[OSC_Control_Name] from our template. So our Play button would be /Play

•	If it’s a Feedback Processor (i.e. you need two-way communication) you need to define that. Controls usually have FB_Processors, but labels can be FB_Processors with no Control. You’re going to enter FB_Processor followed by the /[OSC_Control_Name] from our template. So our Play button would be /Play

•	The last row for each widget simply says WidgetEnd

•	Save your new .ost file in your CSI\Surfaces\OSC folder

Here’s what I’ve setup. Notice that I didn’t create widgets for the labels for Play, Record, and Stop. That’s because I want that text to be fixed and static. 
```
Widget DisplayUpper1
FB_Processor /DisplayUpper1
WidgetEnd

Widget Fader1
Control /Fader1
FB_Processor /Fader1
WidgetEnd

Widget Rotary1
Control /Rotary1
FB_Processor /Rotary1
WidgetEnd

Widget Play
Control /Play
FB_Processor /Play
WidgetEnd

Widget Stop
Control /Stop
FB_Processor /Stop
WidgetEnd

Widget Record
Control /Record
FB_Processor /Record
WidgetEnd

```

## Step 4. Create a Zone Folder and .zon Files
Now we need to tell CSI what to do with this new device by creating a Zone folder and .zon files.

•	Create a new sub-folder under CSI\Zones for your device (Example: CSI\Zones\TouchOSC Remote)

•	Open up a Text Editor

•	Use standard CSI syntax for creating zone files 

Your .zon files should look like this -- they are shown together below but each Zone is in its own file …
```
Zone Home
     IncludedZones
          "Buttons"
          "SelectedChannel"
     IncludedZonesEnd
ZoneEnd


Zone "Buttons"
     Play		Play
     Record	Record
     Stop		Stop
ZoneEnd

Zone "SelectedChannel"
     SelectedTrackNavigator
     Fader1                    TrackVolume
     Rotary1                   TrackPan
     DisplayUpper1       TrackNameDisplay
ZoneEnd
```

## Step 5: Add Your Device to Your CSI Config and Restart Reaper

1.	Open up Reaper’s Preferences
2.	Go to Control/OSC/Web
3.	Click on “Control Surface Integrator” (if not already there follow the installation instructions elsewhere in this wiki)
4.	Click Edit to open the CSI preferences
5.	Click the Page you’d like to add this surface to
6.	Click Add OSC
7.	Follow the instructions for adding an OSC device located elsewhere in this wiki
8.	Click ok to save and apply your changes
9.	Restart Reaper (OSC additions require a full restart)

 


---

## FILE: Comments.md

You can add comments to your .mst or .zon files to either leave notes for yourself or other users of your files, or even comment out lines of code you don't want to use.

## Comments
If you want to comment out an entire line of code the first character of that row of text must be a slash /

```` 
/ Here's how I'd comment out a line of a text to add comments in an an .mst or .zon file.
```` 

Maybe you'd use this for instructions, or to help break out sections of an .mst file, or to tell CSI to ignore a particular row in a .zon file to comment that section of code out entirely.

## Trailing Comments
Very frequently, you may want to add trailing comments to your .zon file in order to indicate what a particular CSI or Reaper action does. Trailing comments can be after the .zon instructions, and must begin with two slash characters //

In this example, I've labeled the Track Automation modes so I can make sure the modes are assigned to the correct buttons.
```` 
Zone "Buttons|"
	Trim 				TrackAutoMode 0 	//Trim Read
	Read 				TrackAutoMode 1 	//Read
	Touch 				TrackAutoMode 2 	//Touch
	Write 				TrackAutoMode 3 	//Write
	Latch				TrackAutoMode 4 	//Latch
        Drop                            TrackAutoMode 5 	//Latch Preview
ZoneEnd
```` 

Anything after the two slashes is ignored, so this becomes a very handy way to keep track of what's happening in your .zon files.
