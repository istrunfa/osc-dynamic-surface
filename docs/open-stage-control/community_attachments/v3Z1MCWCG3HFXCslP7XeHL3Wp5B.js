/*

MCU <-> OSC translation layer
Based on https://github.com/NicoG60/OscMackieControl

*/
//outfilter: args[0]: 2 argstyp v1 address /sysex

MIDI_DEVICE_NAME = 'loopMIDI1'


// set midi target in interface
//app.on('sessionOpened', ()=>{
//    receive('/SET', 'midi_target', 'midi:' + MIDI_DEVICE_NAME)
//})

//JS{{
//	if (@{collType} == "E-HEAVY") {
//      return @{E-HEAVY.height}
//  }	   

//   if (@{collType} == "E-CRCL") {
//      return @{E-CRCL.height}
//  }	  

//}}


var testval = [1,127]
var collType = ["E-HEAVY","E-CLEAN","ACC","BASS"]

module.exports = {

    oscOutFilter: function(data) {

        var {address, args, host, port} = data
	
		console.log(' before oscoutfilter args0 ############' + args );
        //console.log('outfilter: colltype: ' + Object.getOwnPropertyNames(args) + args[0].value + ' address ' + address);	
		
		if (address === '/rigvolknob'){
			
			var test1r = (args[0].value & 0x7f).toString(16).padStart(2,'0') + ' ' + ((args[0].value >> 7) & 0x7f).toString(16).padStart(2,'0') ;
			var test1 = 'f0 00 20 33 02 7f 01 00 04 01 ' + test1r + ' f7';
			var rigvoldb1 = (args[0].value & 0x7f).toString(16).padStart(2,'0');
			var rigvoldb2 = ((args[0].value >> 7) & 0x7f).toString(16).padStart(2,'0');
			
			var updateosc = 'f0 00 20 33 02 7f 7c 00 04 01 ' + rigvoldb2 + ' ' + rigvoldb1 + ' f7' ;
			
			console.log('rigvolknob#############' + test1r + '#' + rigvoldb1 + '#' + rigvoldb2);
			send('midi', 'UCX1', '/sysex', test1);	//update rig volume kemper
			send('midi', 'UCX1', '/sysex', updateosc); //update rig volume send to kemper and it responds with string 
		    return;
		}	
		if (address === '/gainvolknob'){
			
			var gainvolknob1 = (args[0].value & 0x7f).toString(16).padStart(2,'0') + ' ' + ((args[0].value >> 7) & 0x7f).toString(16).padStart(2,'0') ;
			var gainvolknobsend = 'f0 00 20 33 02 7f 01 00 0a 04 ' + gainvolknob1 + ' f7';
			var gainvolknobs1 = (args[0].value & 0x7f).toString(16).padStart(2,'0');
			var gainvolknobs2 = ((args[0].value >> 7) & 0x7f).toString(16).padStart(2,'0');
			
			var gainvolupdateosc = 'f0 00 20 33 02 7f 7c 00 0a 04 ' + gainvolknobs2 + ' ' + gainvolknobs1 + ' f7' ;

			send('midi', 'UCX1', '/sysex', gainvolknobsend);	//update rig volume kemper
			//send('midi', 'UCX1', '/sysex', gainvolupdateosc); //update rig volume send to kemper and it responds with string 
		    //return;
		}			
		if (address = '/program') {
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 01 f7');
			console.log('programm changeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrr'); 
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0a 04 f7');  //req single parameter gain vol
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 04 f7');  //req single parameter bass vol
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 05 f7');  //req single parameter mid vol
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 06 f7');  //req single parameter treb vol
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 07 f7');  //req single parameter pres vol			
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 04 01 f7');  //req single parameter rig vol
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 42 00 0b 04 f7');  //req multi parameter bass vol
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 7f 00 f7');  //
		}			
		   if (address === '/sysex'){
			  console.log('outfilter: args[0]: ' + args + ' address ' + address);	
			  //console.log('args[1].value ' + args[1].value);	
			  //send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 40 00 f7');
			  //send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 01 00 04 01 40 00 f7');
              //return; 
		   }
	
		//   return; 
		//}	
				
		return {address, args, host, port}; 
    },

    oscInFilter: function(data) {

        var {host, port, address, args} = data

		console.log('infilter: args: ' + args[0].value + '#' + host + '#' + port);
        
		var inArgs = args.map(x=>x.value),
			outArgs = [],
			action = '';
		if (address === '/sysex'){
			var [value] = inArgs;
			//var test1r = (test1 & 0x7f).toString(16).padStart(2,'0') + ((test1 >> 7) & 0x7f).toString(16).padStart(2,'0');
			//var test2r = (test2 & 0x7f).toString(16).padStart(2,'0') + ((test2 >> 7) & 0x7f).toString(16).padStart(2,'0');
			//console.log('test1:' + test1r + 'test2:' + test2r + 'test3:' + test3r + 'test4:' + test4r + 'test6:' + test6);
		    if (value.includes("f0 00 20 33 00 00 03")) { // rigname
				var d = value.split(" ").slice(9).map(x=>parseInt(x,16)),
					pos = d[0],
					text = d.slice(1).map(x=>String.fromCharCode(x));
				//text = String.fromCharCode(d);
					text.pop();
				send('127.0.0.1','9000','/rignametext',text.join(""));
			//receive('/rigname','test');
			//	return;
			}
			if (value.includes("f0 00 20 33 00 00 01 00 04 01")) { // singleparameter rig volume "04 01"
				var dd = value.split(" ").slice(9).map(x=>parseInt(x,16)),
					posd = dd[0],
					textd = value.split(" ");
				//text = String.fromCharCode(d);
				    var rigVolKnobVal = (parseInt(textd[10],16) * 128) + parseInt(textd[11],16);
					var testjusthex = textd[10] + textd[11];
					var updatedb = 'f0 00 20 33 02 7f 7c 00 04 01 ' + textd[10] + ' ' + textd[11] + ' ' + textd[12];
					console.log('singleparameter rig volume' + '#' + rigVolKnobVal) ;
					receive('127.0.0.1','9000','/rigvolknob',rigVolKnobVal);
					//send('127.0.0.1','9000','/rigvolknob',rigVolKnobVal);
					send('midi', 'UCX1', '/sysex', updatedb); //update rig volume send to kemper and it responds with string 
					
				//send('127.0.0.1','9000','/rigname',text.join(""));
			//receive('/rigname','test');
			//	return;
			}
			if (value.includes("f0 00 20 33 00 00 01 00 0a 04")) { // singleparameter gain volume "0a 04"
				var ddg = value.split(" ").slice(9).map(x=>parseInt(x,16)),
					textdg = value.split(" ");
				    var rigGainKnobVal = (parseInt(textdg[10],16) * 128) + parseInt(textdg[11],16);
					var gainVolUpdate = 'f0 00 20 33 02 7f 7c 00 0a 04 ' + textdg[10] + ' ' + textdg[11] + ' ' + textdg[12];
					console.log('singleparameter rig volume' + '#' + rigGainKnobVal) ;
					receive('127.0.0.1','9000','/gainvolknob',rigGainKnobVal);
					//send('midi', 'UCX1', '/sysex', gainVolUpdate); //update rig volume send to kemper and it responds with string 
					
				//send('127.0.0.1','9000','/rigname',text.join(""));
			//receive('/rigname','test');
			//	return;
			}
			if (value.includes("f0 00 20 33 02 7f 3c 00 04 01")) { // singleparameter rigvol as string
			  var dx = value.split(" ").slice(9).map(x=>parseInt(x,16)),
					posx = dx[0],
					textx = dx.slice(1).map(x=>String.fromCharCode(x));
					textx.pop();
					textx.shift();
					textx.shift();
		    	console.log('###stringrequest' + textx + '#' + textx.length + '#' + dx + '#' + dx[1]);
			   //console.log('got request!!');
			   send('127.0.0.1','9000','/rigvoltext',textx.join(""));  //write decibel rigvol
			   
			 //  return;
			}
			if (value.includes("f0 00 20 33 00 00 02")) { // multiparameter
				var ddd = value.split(" ").slice(9).map(x=>parseInt(x,16)),
					posdd = ddd[0],
					textdd = ddd.slice(1).map(x=>String.fromCharCode(x));
				//text = String.fromCharCode(d);
					textdd.pop();
					console.log('multiparameter ###' + textdd + '#' + ddd + '#');
				//send('127.0.0.1','9000','/rigname',text.join(""));
			//receive('/rigname','test');
			//	return;
			}
		}		
          
		return {address, args, host, port};
    }


}
