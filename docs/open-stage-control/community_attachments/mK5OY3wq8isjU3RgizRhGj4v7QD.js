function controlSequence(host, port, address, preArgs, sequence) {

    var i = 0
    var timer = setInterval(()=>{
        send(host, port, '/note', ...preArgs, sequence[i])
        i += 1
        if (i == sequence.length) clearInterval(timer)
    }, 50) // set here the time interval

}

module.exports = {
    
    oscOutFilter: function(data) {

        var {address, args, host, port} = data

        if (address == '/switch_2')
        {
            if (args[0].value == 1) 
            {
            controlSequence(host, port, '/note', [2, 3], [127, 0]) // select marker 1
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }
        
            
            if (args[0].value == 2) 
            {
            controlSequence(host, port, '/note', [2, 4], [127, 0]) // select marker 2
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }
           
            if (args[0].value == 3) 
            {
            controlSequence(host, port, '/note', [2, 5], [127, 0]) // select marker 3
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 4) 
            {
            controlSequence(host, port, '/note', [2, 6], [127, 0]) // select marker 4
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 5) 
            {
            controlSequence(host, port, '/note', [2, 7], [127, 0]) // select marker 5
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 6) 
            {
            controlSequence(host, port, '/note', [2, 8], [127, 0]) // select marker 6
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 7) 
            {
            controlSequence(host, port, '/note', [2, 9], [127, 0]) // select marker 7
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 8) 
            {
            controlSequence(host, port, '/note', [2, 10], [127, 0]) // select marker 8
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 9) 
            {
            controlSequence(host, port, '/note', [2, 11], [127, 0]) // select marker 9
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 10) 
            {
            controlSequence(host, port, '/note', [2, 12], [127, 0]) // select marker 10
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 11) 
            {
            controlSequence(host, port, '/note', [2, 13], [127, 0]) // select marker 11
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 12) 
            {
            controlSequence(host, port, '/note', [2, 14], [127, 0]) // select marker 12
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 13) 
            {
            controlSequence(host, port, '/note', [2, 15], [127, 0]) // select marker 13
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 14) 
            {
            controlSequence(host, port, '/note', [2, 16], [127, 0]) // select marker 14
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 15) 
            {
            controlSequence(host, port, '/note', [2, 17], [127, 0]) // select marker 15
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }

            if (args[0].value == 16) 
            {
            controlSequence(host, port, '/note', [2, 18], [127, 0]) // select marker 16
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }
        }

        else if (address == '/push_90') // "AUTO-GS Layout" push button
        {
            if (args[0].value == 1) 
            {
            controlSequence(host, port, '/note', [1, 24], [127]) // move bars and staves function
            controlSequence(host, port, '/note', [1, 127], [0, 127]) // spread all pages
            return
            }
        }

        else if (address == '/push_100') // "AUTO-GS Layout" push button
        {
            if (args[0].value == 1) 
            {
            controlSequence(host, port, '/note', [3, 84], [127]) // "open layout" command (midiStroke "O")
            controlSequence(host, port, '/note', [3, 85], [0, 127]) // navigate one down (midiStroke "DOWN" key)
            controlSequence(host, port, '/note', [3, 86], [0, 0, 127]) // press enter (midiStroke "ENTER")
            controlSequence(host, port, '/note', [1, 24], [0, 0, 0, 127]) // move bars and staves (Cubase Generic Remote)
            controlSequence(host, port, '/note', [3, 87], [0, 0, 0, 0, 127]) // print (midiStroke "CMD+SHIFT+P")
            return
            }
        }

        return {address, args, host, port}
    }
}