    
osc_host = "localhost:8080"

sl_host = "localhost"
sl_port = "9951"
sl_range = "[0-6]"

var loop_max = []

//app.on("sessionOpened", function(data, client) {
//    receive("/EDIT", "tracks", {quantity: 2, widgetType: "fragment"}, {clientId: client.id})
//})

module.exports = {
    init: function(){
        send(sl_host, sl_port, '/sl/'+sl_range+'/register_auto_update', 'state', 1, osc_host, '/loop_state')        
        send(sl_host, sl_port, '/sl/'+sl_range+'/register_auto_update', 'loop_len', 100, osc_host, '/loop_len')        
        send(sl_host, sl_port, '/sl/'+sl_range+'/register_auto_update', 'loop_pos', 100, osc_host, '/loop_pos')
    },

    oscInFilter:function(data){
        var loop_state = ""
        
        var {address, args, host, port} = data
//        console.log("address: " + address)
        if (address == "/loop_state") {
//            console.log("STATE: loop: " + args[0].value + ", ctrl: " + args[1].value + ", value: " + args[2].value + ", host: " + host + ", port: " + port)
            switch (args[2].value) {
                case 2:		// recording
                    receive("/loop"+ args[0].value +"_record", "record")
                    receive("/loop"+ args[0].value +"_mute", "0")
                    receive("/loop"+ args[0].value +"_pause", "0")
                    receive("/loop"+ args[0].value +"_oneshot", "0")
                    loop_state = "Recording"
                    break;
                case 4:		// playing
                    receive("/loop"+ args[0].value +"_mute", "0")
                    receive("/loop"+ args[0].value +"_pause", "0")
                    receive("/loop"+ args[0].value +"_oneshot", "0")
                    receive("/loop"+ args[0].value +"_record", "0")
                    loop_state = "Playing"
                    break;
                case 10:	// muted
                    receive("/loop"+ args[0].value +"_mute", "mute")
                    receive("/loop"+ args[0].value +"_pause", "0")
                    receive("/loop"+ args[0].value +"_oneshot", "0")
                    receive("/loop"+ args[0].value +"_record", "0")
                    loop_state = "Muted"
                    break;
                case 12:	// oneshot
                    receive("/loop"+ args[0].value +"_oneshot", "oneshot")
                    receive("/loop"+ args[0].value +"_pause", "0")
                    receive("/loop"+ args[0].value +"_record", "0")
                    receive("/loop"+ args[0].value +"_mute", "0")
                    loop_state = "Playing: oneshot"
                    break; 
                case 14:	// paused
                    receive("/loop"+ args[0].value +"_pause", "pause")
                    receive("/loop"+ args[0].value +"_mute", "0")
                    receive("/loop"+ args[0].value +"_record", "0")
                    receive("/loop"+ args[0].value +"_oneshot", "0")
                    loop_state = "Paused"
                    break;                                           
            }
            
            receive("/loop"+ args[0].value +"_state", loop_state)
        }
        else if (address == "/loop_len") {
            console.log("LENGTH: loop: " + args[0].value + ", ctrl: " + args[1].value + ", value: " + args[2].value + ", host: " + host + ", port: " + port)
            loop_max[args[0].value] = args[2].value
//            console.log("loop"+ args[0].value +"_max len: " + loop_max)
            receive("/EDIT", "loop"+ args[0].value +"_pos", {"range": {min: 0, max: args[2].value}})
        }
        else if (address == "/loop_pos") {
//            console.log("POSITION: loop: " + args[0].value + ", ctrl: " + args[1].value + ", value: " + args[2].value + ", host: " + host + ", port: " + port)
                      
            if (loop_max[args[0].value] != 0) {
                var secs = args[2].value
                var val = args[2].value / loop_max[args[0].value]
                address = "/loop"+ args[0].value
                receive(address + "_time", Math.floor(secs/60).toString().padStart(2, '0') + ":" + secs.toFixed(2))
//                receive(address + "_pos", val)
                receive(address + "_pos", args[2].value)
            }
        }        
    },

    oscOutFilter:function(data){
        var {address, args, host, port, clientId} = data

        if (address == "/loop"+ args[0].value +"_pos") {
            var pos = args[2].value
            console.log("pos: " + pos)
            address = "/sl/"+ args[0].value +"/set"
            args = []
            args[0] = {type: "s", value: "scratch_pos"}
            args[1] = {type: "f", value: pos}
        }
        else {
            console.log("value: " + args[0].value)
            console.log("loop #: " + address[5])
            args[0] = {type: "s", value: address.split("_")[1]}
            address = "/sl/"+ address[5] +"/hit"
        }
        
        return {address, args, host, port}
    },

    unload: function(){
        // this will be executed when the custom module is reloaded
    },

}
