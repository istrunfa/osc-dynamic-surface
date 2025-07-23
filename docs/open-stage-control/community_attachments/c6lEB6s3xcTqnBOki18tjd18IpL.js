/* Greenman - 14-07-2022 */
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
    // console.log("inside oscInFilter")
    // console.log(data)
    if (host === 'midi') {
 
       // console.log(" midi détecté via la valeur de host !")
        // console.log('adresse du message : ' + address)
        // on teste si c'est un message midi /note via la variable address
        // comparaison avec l'opérateur ===
        if(address === '/control'){

            // on dispatche les valeurs de args dans tes variables différentes
             // assign args to variables
             // https://openstagecontrol.ammd.net/docs/custom-module/examples/#midi-routing

            var [channel, ctrl, value] = args.map(arg=>arg.value)

                // simple condition
                // on my apc i press the button sending /note 1, 32, 127
                // when released sending /note 1, 32, 0

                if (ctrl === 23) 
                {
                // if you don't want to use the fader_1 as a interactive widget, comment this line
                // you need to insert that as we bypass the 'normal' return
                receive('/SET', 'fader_1', value )                               

                // set the fader_2 widget to 10 times the fader_1 value. it's an example :-)
                receive('/SET', 'fader_2',  10*value )                               
                }
                else console.log('Autre valeur de ctrl')                
        }

            return // bypass the normal return


    }
    
    // return data if you want the message to be processed
    return {address, args, host, port}
    }
}