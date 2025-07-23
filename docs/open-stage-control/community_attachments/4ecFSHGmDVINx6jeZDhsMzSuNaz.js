function controlSequence(host, port, address, preArgs, sequence) {

    var i = 0
    var timer = setInterval(()=>{
        send(host, port, '/note', ...preArgs, sequence[i])
        i += 1
        if (i == sequence.length) clearInterval(timer)
    }, 1000) // "1000" is the time interval between messages

}

module.exports = {
    
    oscOutFilter: function(data) {

        var {address, args, host, port} = data

        if (address == '/switch_2') {
            if (args[0].value == 1) controlSequence(host, port, '/note', [2, 2], [127, 0, 0, 1])
            if (args[0].value == 2) controlSequence(host, port, '/note', [2, 3], [127, 0, 0, 1])
            return
        }
        return {address, args, host, port}

    }
}