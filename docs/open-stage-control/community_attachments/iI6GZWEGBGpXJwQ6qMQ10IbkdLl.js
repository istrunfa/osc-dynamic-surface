const statePath = './states_data.json'
const states = loadJSON(statePath) || {}

function loadState(name) {
    if (name in states) {
        receive('/STATE/SET', states[name])
    } else {
        console.log(`state ${name} not found`)
    }
}

function saveState(name, state) {
    states[name] = state
    saveJSON(statePath, states)
}

module.exports = {
    oscOutFilter: function(data) {
        var {host, port, address, args} = data

        if (address === '/state/save' && args.length === 2) {
            try {
                saveState(args[0].value, JSON.parse(args[1].value))
            } catch (e) {
                console.log(`error while saving state ${args[0].value}`)
                console.error(e)
            }
            return
        }

        else if (address === '/state/load') {
            loadState(args[0].value)
            return
        }


        return data
    }
}
