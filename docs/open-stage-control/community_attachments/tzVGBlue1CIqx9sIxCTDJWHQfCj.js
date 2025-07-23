const MIN_BPM = 40

var tapDurations, tapIndex,
    lastTapTime = 0,
    maxTapLength = 1000 * 60 / MIN_BPM

function reset(){

    tapDurations = [0, 0, 0, 0, 0]
    tapIndex = -1

}

function receiveTap(data){

    var tapTime = Date.now()

    // if last tap is too far (based on MIN_BPM), reset stored value and wait until next tap
    if (tapTime - lastTapTime > maxTapLength) {
        lastTapTime = tapTime
        reset()
        return
    }

    // store tap duration
    tapIndex++
    tapDurations[tapIndex % tapDurations.length] = tapTime - lastTapTime
    lastTapTime = tapTime

    // update bpm
    updateBpm(data)

}

function updateBpm(data){

    // filter tap durations (exclude zeros)
    var durations = tapDurations.filter(x=>x>0)

    // we need at least one value
    if (durations.length < 1) return

    // compute average tap duration
    var sum = durations.reduce((previous, current) => current += previous),
        avg = sum / durations.length,
        bpm = Math.round(60 / (avg / 1000))

    // send bpm back to the interface
    receive('/bpm', bpm)

    // send bpm to the button's original target/address ?
    send(data.host, data.port, data.address, bpm)
}

module.exports = {

    oscOutFilter: function(data) {

        var {host, port, address, args} = data

        if (address === '/bpm/tap' && args[0].value === 1) {
            // update bpm when the interface sends /bpm/tap 1
            receiveTap(data)

            // bypass original osc message
            return
        }

        // process other messages normally
        return data

    }

}
