
//Open Stage control MIDI paths config File for Measured Effort Cubase Control Panel
//config.js



// Core MIDI Ports
const coreCubase_from_OSC = 'OSCMIDICONTROL';//BASE MIDI PORT FOR DIRECT FUNCTIONS FROM OSC
const coreCubase_to_OSC = 'OSCMIDICONTROL';//BASE MIDI PORT FOR DIRECT FUNCTIONS FROM CUBASE'

// MIDI Ports for Functions from OSC
const MCU_DEVICE_To_OSC = 'MCU_To_OSC';
const OSC_DEVICE_To_MCU = 'MCU_From_OSC';

// MIDI Port for Chord Change Module
const chordChangeModuleMIDI = 'oscOUT_ChordChange';
const chordChangeTarget = `midi:${chordChangeModuleMIDI}`;

// Core Cubase Target
const core_Cubase_Target = `midi:${coreCubase_from_OSC}`;
const MCU_midi_target = `[ "midi:${MCU_DEVICE_To_OSC}", "midi:${OSC_DEVICE_To_MCU}"]`;


// Export all configurations
module.exports = {
    coreMIDI: {
        fromOSC: 'OSCMIDICONTROL',
        toOSC: 'OSCMIDICONTROL',
        coreCubaseTarget: `midi:OSCMIDICONTROL`
    },
    MCU_MIDI: {
        MCUDeviceToOSC: 'MCU_To_OSC',
        OSCDeviceToMCU: 'MCU_From_OSC',
        MCUMIDITarget: [`midi:MCU_To_OSC`, `midi:MCU_From_OSC`]
    },
    chordModuleMidi: {
        midiPort: 'oscOUT_ChordChange',
        target: `midi:oscOUT_ChordChange`
    },
    trackVisibilityMidi: {
        midiPortShowAll: 'OSCMIDICONTROL',//Library Filter MIDI port for showing all tracks
        midiPortLibraryShow: 'oscOUT_LibraryShow', //Library Filter MIDI Port For Show Function
        midiPortLibraryHide: 'oscOUT_LibraryHide', //Library Filter MIDI Port For Hide Function
        midiPortLibraryAdd: 'oscOUT_LibraryAdd', //Library Filter MIDI Port For Add Function
        midiPortLibraryMute: 'oscOUT_LibraryMute', //Library Filter MIDI Port For mute Function
        midiPortLibrarySolo: 'oscOUT_LibrarySolo', //Library Filter MIDI Port For Solo Function
        midiPortLibrarySelect: 'oscOUT_LibrarySelect', //Library Filter MIDI Port For select Function
        midiPortLibraryName: 'oscOUT_LibraryName', //Library Filter MIDI Port For name Function
        midiPortEnsFilter: 'oscOUT_EnsFilter', // Ensemble Instrument Filter MIDI port
        midiPortInstrFilter: 'oscOUT_InstrFilter',//Specifc Instrument Filters for Groups of instruments
        midiPortSoloInstrFilter: 'oscOUT_SoloInstrFilter',//Specifc Instrument Filters for Solos of instruments
        midiPortFolderGet: 'OSCMIDICONTROL'//Midi Port for find folders function

    },
    selectorModuleMidi: {
        //Selector Channels must all be the same midi send but goes to 2 generic remotes in cubase
        selectorMidiPort : 'oscSelectorChan_A', //DEFAULT MIDI PORT FOR SELECTOR - THIS SHOULD CHANGE IF FUNCTION FIRES CORRECTLY
        selectorMidiPortAll : 'oscSelectorChan_A', //ALL IN EVENT SelectNoteCC_AiE...
        selectorMidiPortInCycle : 'oscSelectorChan_A', //INSIDE CYCLE SelectNoteCC_IC...
        selectorMidiPortSelected : 'oscSelectorChan_A', //ALL SELECTED
        selectorMidiPortb4Cur : 'oscSelectorChan_A', //BEFORE CURSOR SelectNoteCC_BfC...
        selectorMidiPortAfterCur : 'oscSelectorChan_A' //AFTER CURSOR SelectNoteCC_AfC_...
        //selectorMidiPortCase6 : 'oscIn' //NOT USED
    },
    transposeModuleMidi: {
        transposeMidiPort : 'oscOUT_TransposePort' //Transpose MIDI PORT
    },
    nudgeModuleMidi: {
        nudgeMidiPort: 'oscOUT_NudgePort' //Nudge MIDI PORT
    }

};

