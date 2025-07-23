function sendOscControl(ccSendVal, midiChan, midiPort) {

    console.log('sendOsc has been called...')
    sendOsc({
        address: '/control',
        args: [
            { type: 'i', value: midiChan },
            { type: 'i', value: ccSendVal },
            { type: 'i', value: 127 }
        ],
        host: 'midi',
        port: midiPort
    });
}

function sendShowAllCommand(showAllccVal, showAllMidiChan, showAllMidiPort) {
    sendOscControl(showAllccVal, showAllMidiChan, showAllMidiPort);
}

function sendOscCommandWithShowAll(ccSendVal, midiChan, midiPort, showAllccVal, showAllMidiChan, showAllMidiPort) {
    sendShowAllCommand(showAllccVal, showAllMidiChan, showAllMidiPort);
    setTimeout(() => {
        sendOscControl(ccSendVal, midiChan, midiPort);
    }, 100);
}

function sendOSCLoopWithDelay(iterations, delay, initialBtnccSendVal, midiChan, midiPort) {
    let count = 0;
    let currentInstrFilterccSendVal = initialBtnccSendVal;
    function loop() {
        if (count < iterations) {
            sendOscControl(currentInstrFilterccSendVal, midiChan, midiPort);
            currentInstrFilterccSendVal++;
            count++;
            setTimeout(loop, delay);
        }
    }
    loop();
}

module.exports = {
    sendOscControl,
    sendShowAllCommand,
    sendOscCommandWithShowAll,
    sendOSCLoopWithDelay
};
