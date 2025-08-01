//const { excelTest } = require('../config/excelVariablesConfig.js');
//const { chordChange, excelChordpreArgValues, libraryRef } = require('../config/excelVariablesConfig.js');
const { sendOscControl } = require('../oscUtils.js');
const { chordChangeModuleMIDI } = require('../config/midiConfig.js').chordModuleMidi;
const { nudgeMidiPort } = require('../config/midiConfig.js').nudgeModuleMidi;
const { excelTest } = require('../config/excelVariablesConfig.js').thisIsTest;
function handleChordMatrixMessage(address, args) {


    console.log("handleChordMatrix has been called");
    console.log("excelTest value Returned is...." + excelTest)

    if (address === '/TransChordFrom') {
        transposeFromValue = args[0].value;

        console.log("transposeFromValue is equal to " + transposeFromValue);



        //chordType = getChordModificationLabel(transposeFromValue, transposeToValue, chordChange);
        //chordPreArg = getChordpreArg(transposeFromValue, transposeToValue, excelChordpreArgValues);
        //receive('/EDIT', 'SendChordTransposeBtn', { preArgs: chordPreArg, label: chordType });
    }

    if (address === '/TransChordTo') {
      transposeToValue = args[0].value;
        console.log("transposeToValue is equal to " + transposeToValue);
  
        //chordType = getChordModificationLabel(transposeFromValue, transposeToValue, chordChange);
        //chordPreArg = getChordpreArg(transposeFromValue, transposeToValue, excelChordpreArgValues);
        //receive('/EDIT', 'SendChordTransposeBtn', { preArgs: chordPreArg, label: chordType });
    }

    if (address === '/SendChordTransposeBtn') {

        console.log("address is equal to " + address);

        //var chordMidiChan = args[0].value;
        //var chordMidiCC = args[1].value;
        //sendOscControl(chordMidiCC, chordMidiChan, chordChangeModuleMIDI);
        //setTimeout(function () {
        //    var newChordMidiChan = 12;
        //    var newChordMidiCC = 1;
        //    sendOscControl(newChordMidiCC, newChordMidiChan, chordChangeModuleMIDI);
        //}, 250);
    }
}

module.exports = {
    handleChordMatrixMessage

};
