
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


//f0 00 20 33 00 00 01 00 xx xx    singleparameter value in
//f0 00 20 33 02 7f 3c 00 xx xx    singleparamter string in 
function inFilterHelper(inValue){
	var valSplit9,textSplitSysex,knobVal,updateKnobValKemper,helper;  //infilter vars
	textSplitSysex = inValue.split(" ");
	knobUpdateId = '';
	if ((textSplitSysex[8] == '04') && (textSplitSysex[9] == '01')) {knobUpdateId = '/rigvol'} 
	else if ((textSplitSysex[8] == '0a') && (textSplitSysex[9] == '04')) {knobUpdateId = '/gainvol'} 
	else if ((textSplitSysex[8] == '0b') && (textSplitSysex[9] == '04')) {knobUpdateId = '/bassvol'} 
    else if ((textSplitSysex[8] == '0b') && (textSplitSysex[9] == '05')) {knobUpdateId = '/midvol'} 
	else if ((textSplitSysex[8] == '0b') && (textSplitSysex[9] == '06')) {knobUpdateId = '/trebvol'} 
	else if ((textSplitSysex[8] == '0b') && (textSplitSysex[9] == '07')) {knobUpdateId = '/presvol'} 
	else if ((textSplitSysex[8] == '32') && (textSplitSysex[9] == '03')) {knobUpdateId = '/stompa'} 

	
    if((textSplitSysex[4] == '00') && (textSplitSysex[5] == '00') && (textSplitSysex[6] == '01')) {	
	    console.log('###infilterhelper'  + textSplitSysex + 'invalue ');
		knobVal = (parseInt(textSplitSysex[10],16) * 128) + parseInt(textSplitSysex[11],16);
		updateKnobValKemper = 'f0 00 20 33 02 7f 7c 00 ' + textSplitSysex[8] + ' ' + textSplitSysex[9] + ' ' + textSplitSysex[10] + ' ' + textSplitSysex[11] + ' ' + textSplitSysex[12];
		console.log('singleparameter rig volume' + '#' + knobVal);
		receive('127.0.0.1','9000',knobUpdateId + 'knob',knobVal);  //update interface value
		send('midi', 'UCX1', '/sysex', updateKnobValKemper); //update rig volume send to kemper and it responds with string 
		
    } else if((textSplitSysex[4] == '02') && (textSplitSysex[5] == '7f') && (textSplitSysex[6] == '3c')) {
		valSplit9 = inValue.split(" ").slice(9).map(x=>parseInt(x,16));
		textSplitSysex = valSplit9.slice(1).map(x=>String.fromCharCode(x));
		textSplitSysex.pop();
		textSplitSysex.shift();
		textSplitSysex.shift();
		console.log('###stringrequest' + textSplitSysex + '#' + textSplitSysex.length + '#' + valSplit9 + '#' + valSplit9[1]);
		//console.log('got request!!');
		send('127.0.0.1','9000',knobUpdateId + 'text',textSplitSysex.join(""));  //write decibel rigvol
	}	
}

function outFilterHelper(addressOut,argsValue){
    var volKnobUpdateKemper,volKnobStringUpdate,hexSel;
    if (addressOut === '/rigvolknob') {hexSel = '04 01 ' }
	else if (addressOut === '/gainvolknob') {hexSel = '0a 04 ' }
	else if (addressOut === '/bassvolknob') {hexSel = '0b 04 ' }
	else if (addressOut === '/midvolknob') {hexSel = '0b 05 ' }
	else if (addressOut === '/trebvolknob') {hexSel = '0b 06 ' }
	else if (addressOut === '/presvolknob') {hexSel = '0b 07 ' }
	else if (addressOut === '/stompaknob') {hexSel = '32 03 ' }

	volKnobUpdateKemper =  'f0 00 20 33 02 7f 01 00 ' + hexSel + (argsValue & 0x7f).toString(16).padStart(2,'0') + ' ' + ((argsValue >> 7) & 0x7f).toString(16).padStart(2,'0') + ' f7';		
	volKnobStringUpdate = 'f0 00 20 33 02 7f 7c 00 ' + hexSel + ((argsValue >> 7) & 0x7f).toString(16).padStart(2,'0') + ' ' + (argsValue & 0x7f).toString(16).padStart(2,'0'); + ' f7';
	
	console.log('rigvolknob#############' + volKnobUpdateKemper + '####' + argsValue + '#');
	if (hexSel != "undefined") {send('midi', 'UCX1', '/sysex', volKnobUpdateKemper);}	//update rig volume kemper
		console.log('rigvolknob#############' + volKnobStringUpdate + '####' + argsValue);
	//send('midi', 'UCX1', '/sysex', volKnobStringUpdate); //update rig volume send to kemper and it responds with string 
	
}	

module.exports = {

    oscOutFilter: function(data) {

        var {address, args, host, port} = data
	
		//console.log(' before oscoutfilter args0 ############' + args );
        console.log('outfilter: colltype: ' + '#' + args[0].value + ' address ' + address);	
		
		if (address === '/rigvolknob'){
			outFilterHelper(address,args[0].value);
//			return {address, args, host, port}; 

		}	
		if (address === '/gainvolknob'){
		    outFilterHelper(address,args[0].value);
			console.log('after gainvolknob outfilter#############');
//            return;  
//			return {address, args, host, port}; 

		}
		if (address === '/bassvolknob'){
		    outFilterHelper(address,args[0].value);
//            return {address, args, host, port};  
		}	
		if (address === '/midvolknob'){
		    outFilterHelper(address,args[0].value);
//			return {address, args, host, port}; 

		}
		if (address === '/trebvolknob'){
		    outFilterHelper(address,args[0].value);
//            return {address, args, host, port};  
		}
		if (address === '/presvolknob'){
		    outFilterHelper(address,args[0].value);
//            return {address, args, host, port};  
		}	
		if (address === '/stompaknob'){
		    outFilterHelper(address,args[0].value);
//            return {address, args, host, port}; 
		}			
		
		if (address = '/program') {
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 01 f7');   //req string for current rig name
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 02 f7');   //req string for current author name
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 04 f7');   //req string for how its profile info
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 05 f7');   //req string for your user
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 10 f7');   //req string for amp description			
			console.log('programm changeeeeeeeeeeeeeerrrrrrrrreeeeerrrrrrr'); 
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0a 04 f7');  //req single parameter gain vol
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 04 f7');  //req single parameter bass vol
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 05 f7');  //req single parameter mid vol
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 06 f7');  //req single parameter treb vol
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 0b 07 f7');  //req single parameter pres vol			
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 04 01 f7');  //req single parameter rig vol
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 32 03 f7');  //req single parameter stomp A on/off
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 42 00 0b 04 f7');  //req multi parameter bass vol
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 7f 00 f7');  //
			//return;
		}			
		else if (address === '/sysex'){
			  //console.log('outfilter: args[0]: ' + args + ' address ' + address);	

		   }
				
		//return {address, args, host, port}; 
    },

    oscInFilter: function(data) {

        var {host, port, address, args} = data     			 

        
		var inArgs = args.map(x=>x.value),
			outArgs = [],
			action = '';
		if (address === '/sysex'){
			var [value] = inArgs;
		    if (value.includes("f0 00 20 33 00 00 03 00 00 01")) { // rigname
				valSplit9 = value.split(" ").slice(9).map(x=>parseInt(x,16));
					 textSplitSysex = valSplit9.slice(1).map(x=>String.fromCharCode(x));
				//text = String.fromCharCode(d);
					textSplitSysex.pop();
				send('127.0.0.1','9000','/rignametext',textSplitSysex.join(""));

			}
		    if (value.includes("f0 00 20 33 00 00 03 00 00 02")) {    //author name
			    		console.log('infilter string req: ' + args[0].value + '#' + host + '#' + port);
				valSplit9 = value.split(" ").slice(9).map(x=>parseInt(x,16));
				textSplitSysex = valSplit9.slice(1).map(x=>String.fromCharCode(x));
				//text = String.fromCharCode(d);
				textSplitSysex.pop();
				send('127.0.0.1','9000','/authnametext',textSplitSysex.join(""));

			}
		    if (value.includes("f0 00 20 33 00 00 03 00 00 10")) { 
			    		console.log('infilter string req: ' + args[0].value + '#' + host + '#' + port);
				valSplit9 = value.split(" ").slice(9).map(x=>parseInt(x,16));
				textSplitSysex = valSplit9.slice(1).map(x=>String.fromCharCode(x));
				//text = String.fromCharCode(d);
				textSplitSysex.pop();
				send('127.0.0.1','9000','/tempnametext',textSplitSysex.join(""));

			}			
			if (value.includes("f0 00 20 33 00 00 01 00 "))    {         // singleparameter 
				inFilterHelper(value);
				
			} 
			else if (value.includes("f0 00 20 33 02 7f 3c 00 ")) { // singleparameter rigvol as string
			   	inFilterHelper(value);

			}
					
			if (value.includes("f0 00 20 33 00 00 02")) { // multiparameter

			}
		}		
        //return;  
		return {address, args, host, port};
    }


}
