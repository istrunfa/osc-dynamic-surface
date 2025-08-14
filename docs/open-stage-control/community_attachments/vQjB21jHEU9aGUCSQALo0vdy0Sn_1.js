const { getConfig, getFunction, getStartUpConfig } = require('./configLoader.js');

const {handleChordMatrixMessage } = require('./modules/chordMatrixModule.js')


// Set application opening configuration
/*
send('midi', 'MCU_From_OSC', '/note', 1, 44, 127);  // Send MCU command to switch to track name sending 

const customModuleName = "Measured Effort Cubase Control";
const cmVerNo = "2.3";

// Change Log
// 24-2-2024 - removed lots of console logs
// Ver 2.1 - 26-4-202 added chord matrix function to populate chord change matrix from excel file
// Ver 2.2 - Multiple Cubase Midi Remote Button Adding Function added
// Ver 2.3 - Chord Transposition using Keys and Roman Numerals
const customModuleVer = `${customModuleName} ${cmVerNo}`;

// MIDI PORTS NOW IN midiConfig.js
*/

// Set MIDI target in interface
app.on('sessionOpened', () => {
    console.log("Session opened");

    getStartUpConfig();


});

// Module exports
module.exports = {
    oscInFilter: function (data) {
        let { address, args, host, port } = data;
        return { address, args, host, port };
    },
    oscOutFilter: function (data) {
        let { address, args, host, port } = data;

        console.log("address recieved = " + address)

        const handlers = {
            "/testBtn": () => {
                console.log("Test Button Pressed");
                let testThis = getStartUpConfig.testThis;
            },

            "/TransChord": handleChordMatrixMessage,
            "/SendChordTrans": handleChordMatrixMessage
        };

        // Find and execute the corresponding handler
        let handled = false;
        for (let key in handlers) {
            if (address.startsWith(key)) {
                handlers[key](address, args);
                handled = true;
                break;
            }
        }

        // If no handler was found, log the message
        if (!handled) {
            console.log("Address has not prompted any handler");
        }

        // Nothing below this line
        return data;
    }


}

