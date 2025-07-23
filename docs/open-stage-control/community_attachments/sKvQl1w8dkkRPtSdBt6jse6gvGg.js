
var sessions = {
    '127.0.0.1': '/clientTesting/OSC_UI.json',
    '192.168.178.50': '/clientTesting/OSC_UI_client.json',
    '192.168.178.42': '/clientTesting/OSC_UI_client.json'
}

app.on('open', (data, client) => {

    var ip = client.address,
    id = client.id

    console.log(`client connected with ip ${ip}`)

    // check if we have a session for this ip address
    if (sessions[ip]) {
        
        console.log(`-> loading ${sessions[ip]}`)

        // send a remote control command to that client
        // to make it load the appropriate session
        receive('/SESSION/OPEN', sessions[ip], {clientId: id})
        
    } else {
        
        console.log('-> no session associated with this ip')
        
    }

})