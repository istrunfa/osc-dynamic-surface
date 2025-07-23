// Do whatever you want
// initialize variables
// declare functions
// load modules
// etc
var main_port = 54341,
    ableton_port = 9001,
    gp_ip = "192.168.1.108"
localhost = '127.0.0.1'
current_song = {
    "parts": [],
    "name": "",
    "isWriting": false,
    "current_part": 0
}
key_rackspace = {
        "port": 54344,
        "switch": "/switch_keys",
        "rackspaces": {}
    },
    drum_rackspace = {
        "port": 54345,
        "switch": "/switch_drums",
        "rackspaces": {}
    },
    vocal_rackspace = {
        "port": 54346,
        "switch": "/switch_vocals",
        "rackspaces": {}
    },
    guitar_rackspace = {
        "port": 54347,
        "switch": "/switch_guitar",
        "rackspaces": {}
    },
    scenes = {
        "port": 54348,
        "address": "/scenes",
        "scene_data": {}
    },
    current_rack = 0, racks = [key_rackspace, drum_rackspace],
    ableton_connected = false


module.exports = {
    init: function() {

        app.on('sessionOpened', (data, client) => {

            // executed each time a session is opened
            // as from v0.44.0, this will only apply
            // for sessions loaded from the server's filesystem 
            module.exports.sync()

        })
        app.on('reload', (data, client) => {
            module.exports.sync()
        })
    },
    sync: function() {
        send(localhost, ableton_port, '/live/connect', main_port)
        module.exports.getRackspaces()
        send(localhost, ableton_port, '/live/get_scenes')
        send(localhost, ableton_port, "/launch_song", 0, 0)
        send(localhost, ableton_port, "/launch_song", 1, 0)
    },
    getRackspaces: function() {
        send(localhost, racks[current_rack].port, '/GigPerformer/ListAllRackspaces')
    },



    oscInFilter: function(data) {
        // Filter incoming osc messages

        var { address, args, host, port } = data

        // do what you want

        // address = string
        // args = array of {value, type} objects
        // host = string
        // port = integer
        console.log("Address is: " + address)
        if (address.includes("/SongPart") && address.includes("Name") && current_song.isWriting) {
            console.log("song part adding," + args[0].value)
            current_song.parts[args[0].value] = current_song.current_part
            current_song.current_part += 1
        }
        switch (address) {

            case "/live/Connect":
                ableton_connected = true
                module.exports.sync()
                break
            case "/live/Disconnect":
                ableton_connected = false
                break
            case "/Rackspace":
                racks[current_rack].rackspaces[args[1].value] = args[0].value
                break
            case "/RackspaceListEnd":
                send(localhost, main_port, racks[current_rack].switch, racks[current_rack].rackspaces)
                current_rack += 1
                if (current_rack < racks.length) {
                    module.exports.getRackspaces()
                }
                break
            case "/scene":
                scenes.scene_data[args[1].value] = args[0].value
                break
            case "/scene_end":
                send(localhost, main_port, scenes.address, scenes.scene_data)
                break
            case "/CurrentSongName":
                if (current_song.name !== args[0].value) {
                    current_song.parts = {}
                    current_song.current_part = 0
                    current_song.isWriting = true
                    current_song.name = args[0].value
                }
                break
            case "/SongPartsEnd":
                if (current_song.isWriting) {
                    send(localhost, main_port, "/deck_a_song_parts", current_song.parts)
                    current_song.isWriting = false
                }
                break


            default:
                return { address, args, host, port }
        }



    },

    oscOutFilter: function(data) {
        // Filter outgoing osc messages

        var { address, args, host, port, clientId } = data
        console.log("OSC Out", data)

        // same as oscInFilter
        switch (address) {
            case "/sync":
                module.exports.getRackspaces()
                send(localhost, 9001, '/live/get_scenes')
                break
            case "/SelectSongPart":
                console.log("selecting song part", args[0].value)
                for (n in racks) {
                    send(localhost, racks[n].port, "/SelectSongPart", args[0].value)
                }
                break
            case "/GigPerformer/SwitchToRack":
                for (n in racks) {
                    send(localhost, racks[n].port, "/Actions/PanelView", args[0].value)
                }
                return { address, args, host, port }
                break;
            case "/launch_song":
                for (const x in racks) {
                    console.log("sending song switch to all ports:" + args[0].value + " " + racks[x].port)
                    send(localhost, racks[x].port, "/Actions/SetlistView")
                    send(localhost, racks[x].port, "/GigPerformer/SwitchToSong", args[0].value)
                }
                send(localhost, racks[0].port, "/Song/GetSongParts")
                send(localhost, main_port, "/TABS", "tab_deck", "tab_" + String(args[0].value + 1))
                return { address, args, host, port }
                break
            default:
                return { address, args, host, port }

        }
        // return data if you want the message to be and sent
    },

    unload: function() {
        // this will be executed when the custom module is reloaded
    },

}