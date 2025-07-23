module.exports = {
    oscInFilter:function(data){
        // Filter incoming osc messages

        var {address, args, host, port} = data
        if (host === 'midi') {

            // MIDI routing !
            if (address === '/control') {

                // assign args to variables
                var [channel, ctrl, value] = args.map(arg=>arg.value)

                if (channel === 1)
                  if (ctrl === 0)
                    receive('/debug', value)
            }
            return // bypass original message
        }
        // return data if you want the message to be processed
        return {address, args, host, port}
    }
}
