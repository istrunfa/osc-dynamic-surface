module.exports = {

    oscInFilter: function (data) {

        var { address, args, host, port } = data
        
        if (address == "/note" && port === "MPD232") {
            const note = args[1].value
            const vel = args[2].value

            receive("/SET", "note_hardware_transformer", note, vel )
        }
        return data
    }
}