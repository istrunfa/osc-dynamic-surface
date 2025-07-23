module.exports = {

    //this function intercepts all messages the client send and store them in the data argument
    oscOutFilter: function (data) {

        //this is called destructuring, and breaks down the data into those four variables
        const { address, args, host, port } = data

        // checks if the address is the same custom address assigned to the client fader
        if (address == "/fader") {
            // args is an array of objects in the forma {type: string, value: number}
            // and the last element is the fader current value
            // here its value is stored in a new variable at the same time
            // it's popped from the original array
            const value = args.pop().value

            //looping through all the remaining elements of the args array
            //that represent all the CCs to send out
            args.forEach(cc => {
                console.log(cc);
                //finally, each CC is sent out with the current fader value
                // replace "midiPortNameToYourDAW" with the midi port used to send midi to your DAW
                send("midi", "midiPortNameToYourDAW", "/control", 1, cc.value, value)
            });
            // after intercepting, transforming and sending the data, the original one is bypassed 
            // by returning nothing inside this if statement
            return
        }

        // outside the if statement, to make sure all the other data still can be sent out
        // the original data must be returned
        return data
    }
}