// set midi target in interface
//app.on('sessionOpened', ()=>{
//    receive('/SET', 'midi_target', 'midi:' + MIDI_DEVICE_NAME)
//})
 
var effectsHex = ['00','off','01','Wah Wah [WAH]','02','Wah Wah Low Pass [WAH]','03','Wah High Pass [WAH]','04','Wah Vowel Filter [WAH]','06','Wah Phaser [WAH]','07','Wah Flanger [WAH]',
                  '08','Wah Rate Reducer [WAH]','09','Wah Ring Modulator [WAH]','0a','Wah Freq Shifter [WAH]','0c','Wah Formant Shift [WAH]','21','Green Scream [DISTORTION]','22',
				  'Plus DS [DISTORTION]','23','One DS [DISTORTION]','24','Muffin [DISTORTION]','25','Mouse [DISTORTION]','2a','Full DC [DISTORTION]','26','Fuzz DS [DISTORTION]',
				  '27','Metal DS [DISTORTION]','20','Kemper Drive [DISTORTION]'];
//var stompEffect = effectsHex.forEach(mapFxName);

function findEffect(entry,ind, arr) {
   return entry == arr[ind]; 	
}	

var testval = [1,127]
var collType = ["E-HEAVY","E-CRCL","ACC-BASS"]

var stompTemp; 

var i,knobVal,updateId,textSplitSysex,sysexText;
var multiReqAdr11 = ['/kempBassVol','/kempBassVolText','/kempMidVol','/kempMidVolText','/kempTrebVol','/kempTrebVolText','/kempPresVol','/kempPresVolText','/kempRigVol','/kempRigVolText'];	
var outAdrToKemp = ['/kempRigVol','04 01 ','/kempGainVol','0a 04 ','/kempBassVol','0b 04 ','/kempMidVol','0b 05 ','/kempTrebVol','0b 06 ','/kempPresVol','0b 07 ',  
                     '/kempStompA','32 03 ','/kempStompB','33 03 ','/kempStomps','04 40 ','/stompASel','32 00 ','/stompBSel','33 00 '];
var inSysexText = ['f0 00 20 33 00 00 03 00 00 01','/kempTextRigname','f0 00 20 33 00 00 03 00 00 02','/kempTextAuthname','f0 00 20 33 00 00 03 00 00 10','/kempTextAmpname',
                    'f0 00 20 33 00 00 01 00 32 00','/kempTextStompAFX','f0 00 20 33 00 00 01 00 33 00','/kempTextStompBFX'];					 

//f0 00 20 33 00 00 01 00 xx xx    singleparameter value in
//f0 00 20 33 02 7f 3c 00 xx xx    singleparamter string in 

// convert 33 from a 0-10 range to a 0-16383
// var n = scaleValue(33, [0,16383],[0,10])
function scaleValue(valueToConv, from, to){
	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0],valueToConv)) - from[0];
	return Number(capped * scale + to[0]).toFixed(2);
}


function inFilterHelper(inValue){
	var valSplit9,updateKnobValKemper,valSplitMulti;  //infilter vars
	textSplitSysex = inValue.split(" ");
	updateId = '';
	
	for (i = 0;i <= outAdrToKemp.length; i = i + 2) {
	   if (textSplitSysex[8] + ' ' +  textSplitSysex[9] + ' ' == outAdrToKemp[i + 1]) {updateId = outAdrToKemp[i]}
	}	
			 
	console.log('infilterhelper   ' + '#' + textSplitSysex + '#' + updateId); 
    if((textSplitSysex[4] == '00') && (textSplitSysex[5] == '00') && (textSplitSysex[6] == '01')) {	 // single parameter return 
	    //console.log('###infilterhelper'  + textSplitSysex + 'invalue ');
		knobVal = (parseInt(textSplitSysex[10],16) * 128) + parseInt(textSplitSysex[11],16);
		updateKnobValKemper = 'f0 00 20 33 02 7f 7c 00 ' + textSplitSysex[8] + ' ' + textSplitSysex[9] + ' ' + textSplitSysex[10] + ' ' + textSplitSysex[11] + ' ' + textSplitSysex[12];
		console.log('singleparameter   ' + '#' + updateId + '#' + knobVal);
		receive('127.0.0.1','9000',updateId,knobVal);  //update interface value
		if (updateId === '/kempBassVol' || updateId === '/kempMidVol' || updateId === '/kempTrebVol' || updateId === '/kempPresVol') {
		    receive('127.0.0.1','9000',updateId + 'Text', scaleValue(knobVal,[0,16383],[-5,5]) + ' db');  //write decibel as -5 to +5db converted from the decimal value of the 14 bit hex
		} 
       	else if (updateId === '/kempGainVol') {
			receive('127.0.0.1','9000',updateId + 'Text', scaleValue(knobVal,[0,16383],[0,10]));  //write gain as 0 to +10 converted from the decimal value of the 14 bit hex
        }
		else if (updateId === '/kempStomps' || updateId === '/kempStompA' || updateId === '/kempStompB' ) {
			receive('127.0.0.1','9000',updateId,textSplitSysex[11] );  //write gain as 0 to +10 converted from the decimal value of the 14 bit hex
        }
		else if (updateId === '/stompASel' ) {
			console.log('kempstompafxsel ' + effectsHex[effectsHex.indexOf(textSplitSysex[11])]);
            receive('127.0.0.1','9000','/stompASel', effectsHex[effectsHex.indexOf(textSplitSysex[11])]);  
        }
        else {
		   //receive('midi', 'UCX1', '/sysex', updateKnobValKemper); //update rig volume, etc. as this is somekind of nonlinear calc just ask per sysex for the string 
		}			
			
    } else if((textSplitSysex[4] == '02') && (textSplitSysex[5] == '7f') && (textSplitSysex[6] == '3c')) {
		valSplit9 = inValue.split(" ").slice(9).map(x=>parseInt(x,16));
		textSplitSysex = valSplit9.slice(1).map(x=>String.fromCharCode(x));
		console.log('string empfang ' + textSplitSysex + ' updateid ' + updateId); 
		textSplitSysex.pop();
		textSplitSysex.shift();
		textSplitSysex.shift();
		receive('127.0.0.1','9000',updateId + 'Text',textSplitSysex.join(""));  //write decibel rigvol
	} else {
		console.log('xxxxxxxxxxxxxxxxx ' + inValue );
	}	
}

function outFilterHelper(addressOut,argsValue){
   var volKnobUpdateKemper,volKnobStringUpdate;
	updateId = '';
	
	for (i = 0;i <= outAdrToKemp.length; i = i + 2) {
	   if (addressOut == outAdrToKemp[i]) {updateId = outAdrToKemp[i + 1]}
	}
 
 	volKnobUpdateKemper =  'f0 00 20 33 02 7f 01 00 ' + updateId + (argsValue & 0x7f).toString(16).padStart(2,'0') + ' ' + ((argsValue >> 7) & 0x7f).toString(16).padStart(2,'0') + ' f7';		
	volKnobStringUpdate = 'f0 00 20 33 02 7f 7c 00 ' + updateId + ((argsValue >> 7) & 0x7f).toString(16).padStart(2,'0') + ' ' + (argsValue & 0x7f).toString(16).padStart(2,'0'); + ' f7';
	if (addressOut === "/kempStompA" || addressOut === "/kempStompA" || addressOut === "/kempStomps") {
	   volKnobUpdateKemper =  'f0 00 20 33 00 00 01 00 ' + updateId + (argsValue & 0x7f).toString(16).padStart(2,'0') + ' ' + ((argsValue >> 7) & 0x7f).toString(16).padStart(2,'0') + ' f7';
	} else if (addressOut === '/kempStompAText'){
	  // return;	        
	}		
	
	if (updateId != '') {
	    console.log('rigvolknob#############' + volKnobUpdateKemper + '####' + argsValue);
    	send('midi','UCX1','/sysex',volKnobUpdateKemper);	
	}	
	
}	

module.exports = {
	
    oscOutFilter: function(data) {

        var {address, args, host, port} = data
		
		var outArgs = args.map(x=>x.value),
			outArgs = [],
			outAction = '',
			testout;
		
        console.log('outfilter: colltype: ' + '#' + ' address ' + address);	
		if (address === '/control'){
			
		}	
		
		if (address.substring(0,6) === '/stomp') {   // preselect stomps 
		     console.log('stopmaselllllllllll ' + address + '#' + '#' + args[1].value + '#' + args[0].value.substring(3,5) + '#' + args[0].value.substring(6,8)  + '#' + args[0].value.substring(9,11));
			  
			if (args[0].value.substring(0,2) !== '00' && args[0].value.substring(0,2) !== 'undefined' ) {   // value of the effects of stomp a to d value '00' means off
                send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 01 00 ' + args[0].value.substring(6,11) + ' 00 ' + args[1].value + ' f7');  //first select the effect			
     			send('midi', 'UCX1', '/control', 1,parseInt(args[0].value.substring(3,5)), 1);                                                //after that turn on the stomp
			} else {
			   send('midi', 'UCX1', '/control', 1,parseInt(args[0].value.substring(3,5)), 0);                                                 //turn off the stomp   
			   send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 01 00 ' + args[0].value.substring(6,11) + ' 00 00 f7');                      // remove effect by setting it to 'off'
			}	
			//return;
			
		}	
		if (address.substring(0,5) === '/kemp') { 
		    console.log('vor outfilter ' + address + '#' + '#' + args[0].value); 
			outFilterHelper(address,args[0].value);
			//return {address, args, host, port};
		}	

		
		if (address === '/program') {
			//console.log('programm changeeeeeeeeeeeeeerrrrrrrrreeeeerrrrrrr ' + args[0].value ); 
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 04 f7');   //req string for how its profile info
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 05 f7');   //req string for your user
			
			// request desired values and strings when changing the rig
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 01 f7');   //req string for current rig name
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 02 f7');   //req string for current author name			
            send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 43 00 00 10 f7');   //req string for amp description						
			send('midi','UCX1','/sysex', 'f0 00 20 33 02 7f 41 00 0a 04 f7');  //req single parameter gain vol
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 04 01 f7');  //req single parameter rig vol
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 32 00 f7');  //req single parameter stomps A type
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 32 03 f7');  //req single parameter stomps A on/off
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 33 00 f7');  //req single parameter stomps B type
			send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 33 03 f7');  //req single parameter stomps B on/off
			send('midi','UCX1','/sysex','f0 00 20 33 02 7f 41 00 04 40 f7');  //req single parameter stomps
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 42 00 0b 00 f7');  //req multi parameter adr. 11 
			//send('midi', 'UCX1', '/sysex', 'f0 00 20 33 02 7f 41 00 7f 00 f7');  //
			return {address, args, host, port};
		}			
		else if (address === '/sysex'){
			  //console.log('outfilter: args[0]: ' + args + ' address ' + address);	

		   }
		//return;		
		return {address, args, host, port}; 
    },

    oscInFilter: function(data) {

        var {host, port, address, args} = data     			 
        
		var inArgs = args.map(x=>x.value),
			outArgs = [],
			action = '';
		
		if (address === '/sysex'){
			var [value] = inArgs;
	        console.log('infilter sysexxxxxxxxxxx ' + value + '###' + inSysexText[0] + '###' + inSysexText[1].substring(0,9));   	
			// f0 00 20 33 00 00 03 00 00 xx
     		for(i = 0; i < inSysexText.length;i = i + 2) {  //parse incoming sysex strings for display as text, id must start with '/kemptext' 
			   	sysexText = inSysexText[i + 1];
				if (sysexText.substring(0,9) === '/kempText' && value.includes(inSysexText[i])) {
				   	valSplit9 = value.split(" ").slice(9).map(x=>parseInt(x,16));
					textSplitSysex = valSplit9.slice(1).map(x=>String.fromCharCode(x));
					textSplitSysex.pop();
				    receive('127.0.0.1','9000',sysexText,textSplitSysex.join(""));
					break;
				}			 
			}	
			if (value.includes("f0 00 20 33 00 00 01 00 "))    {         // singleparameter 
				inFilterHelper(value);								
			} 
			else if (value.includes("f0 00 20 33 02 7f 3c 00 ")) { // singleparameter rigvol as string
			   	inFilterHelper(value);
			}
					
			if (value.includes("f0 00 20 33 00 00 02 00 0b")) { // multiparameter in eq. address apge 11
               	valSplitMulti = value.split(" ");
				for (i = 0;i <= multiReqAdr11.length; i = i + 2 ){
				   knobVal = (parseInt(valSplitMulti[i + 18],16) * 128) + parseInt(valSplitMulti[i + 19],16);	
				   receive('127.0.0.1','9000',multiReqAdr11[i],knobVal);
				   receive('127.0.0.1','9000',multiReqAdr11[i + 1], scaleValue(knobVal,[0,16383],[-5,5]) + ' db');
				}		
		
				console.log('multiparameter reccccccccccccccccc pres:' + valSplitMulti[24] + valSplitMulti[25] + ' treb: ' + valSplitMulti[22] + valSplitMulti[23] + 'mid: ' + valSplitMulti[20] + valSplitMulti[21] + 'bass: ' + valSplitMulti[18] + valSplitMulti[19]);
			}
		}		
        //return;  
		return {address, args, host, port};
    }


}
