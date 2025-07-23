module.exports = {
    

	init: function()
	{
        console.log("Youpi init")		        // this will be executed once when the osc server starts
    },

    oscInFilter:function(data){
    // Filter incoming osc messages
    var {address, args, host, port} = data
    // do what you want
    // address = string
    // args = array of {value, type} objects
    // host = string
    // port = integer
    console.log("inside oscOutFilter")
    console.log(data)
    if (host === 'midi') {
 
        console.log(" midi détecté via la valeur de host !")
        console.log('adresse du message : ' + address)
        // on teste si c'est un message midi /note via la variable address
        // comparaison avec l'opérateur ===
        if(address === '/note'){

            // on dispatche les valeurs de args dans tes variables différentes
             // assign args to variables
             // https://openstagecontrol.ammd.net/docs/custom-module/examples/#midi-routing

            var [channel, ctrl, value] = args.map(arg=>arg.value)

                // simple condition
                // on my apc i press the button sending /note 1, 32, 127
                // when released sending /note 1, 32, 0

                if (ctrl === 32) 
        {               
                // receive('/button_1', value / 127)
                receive('/SET', 'button_1', value / 127)
                }
                else console.log('autre touche')
                
        }

            return // bypass original message


    }
    
    // return data if you want the message to be processed
    return {address, args, host, port}
    }
}




        /*

        if (address == '/switch_1')
        {
            if (args[0].value == 1) 
            {
            controlSequence(host, port, '/note', [2, 3], [127, 0]) // select marker 1
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }
        
            
            if (args[0].value == 2) 
            {
            controlSequence(host, port, '/note', [2, 4], [127, 0]) // select marker 2
            controlSequence(host, port, '/note', [2, 2], [0, 127]) // set locators
            return
            }
           

         
        else if (address == '/push_90') // "AUTO-GS Layout" push button
        {
            if (args[0].value == 1) 
            {
            controlSequence(host, port, '/note', [1, 24], [127]) // move bars and staves function
            controlSequence(host, port, '/note', [1, 127], [0, 127]) // spread all pages
            return
            }
        }
        */
