const path = nativeRequire('path');
const fs = nativeRequire('fs');

const configDir = path.resolve(__dirname, 'config');
const functionDir = path.resolve(__dirname, 'functions');

const config = {};
const functions = {};
const configAppStartUp = {};


// Dynamically load all configuration files in the config directory
fs.readdirSync(configDir).forEach(file => {
    if (file.endsWith('.js')) {
        const configPath = path.join(configDir, file);
        if (!fs.existsSync(configPath)) {
            console.error(`ERROR: ${file} not found at`, configPath);
            process.exit(1);
        }
        const configData = nativeRequire(configPath);
        Object.assign(config, configData);
    }
});

fs.readdirSync(functionDir).forEach(file => {
    if (file.endsWith('.js')) {
        const functionPath = path.join(functionDir, file);
        if (!fs.existsSync(functionPath)) {
            console.error(`ERROR: ${file} not found at`, functionPath);
            process.exit(1);
        }
        const functionData = nativeRequire(functionPath);
        Object.assign(functions, functionData);
    }
});

const getConfig = (path, defaultValue = undefined) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], config) || defaultValue;
};

const getFunction = (path, defaultValue = undefined) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], functions) || defaultValue;
};

// Get MIDI Address variables using getConfig
const coreCubaseTarget = getConfig('coreMIDI.coreCubaseTarget');
const MCUMIDITarget = getConfig('MCU_MIDI.MCUMIDITarget');
const chordChangeTarget = getConfig('chordChangeModule.target');
const MCU_DEVICE_To_OSC = getConfig('MCU_MIDI.MCUDeviceToOSC');
const OSC_DEVICE_To_MCU = getConfig('MCU_MIDI.OSCDeviceToMCU');

const testString = getConfig('excelTest.thisIsTest.test');

function getStartUpConfig() {
    console.log("Setting Session Core Configuration...")
    console.log("Setting Global MIDI Targets...")

    console.log(testString)

    // Check if MCUMIDITarget is undefined
    if (typeof MCUMIDITarget === 'undefined') {
        console.warn("Warning: MCUMIDITarget is undefined")
    } else {
        // Set MACKIE MIDI PORT
        receive('/SET', 'MCU_midi_target', MCUMIDITarget)
        console.log("MCU MIDI Target device set as " + MCUMIDITarget)
    }

    // Check if coreCubaseTarget is undefined
    if (typeof coreCubaseTarget === 'undefined') {
        console.warn("Warning: coreCubaseTarget is undefined")
    } else {
        // Set CUBASE GENERAL COMMAND MIDI PORT
        receive('/SET', 'core_Cubase_Target', coreCubaseTarget)
        console.log("Core Cubase MIDI Target device set as " + coreCubaseTarget)
    }

    // Check if chordChangeTarget is undefined
    if (typeof chordChangeTarget === 'undefined') {
        console.warn("Warning: chordChangeTarget is undefined")
    } else {
        // ChordChangeTarget MIDI Port
        receive('/SET', 'chordChangeTarget', chordChangeTarget)
        console.log("Chord change module MIDI device set as " + chordChangeTarget)
    }

    return
}

module.exports = {
    getConfig,
    getFunction,
    getStartUpConfig
};
