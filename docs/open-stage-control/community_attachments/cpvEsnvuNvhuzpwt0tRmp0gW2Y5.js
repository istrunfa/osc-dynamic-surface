// LOAD JSON FILES

/********* !!!!!! VERY IMPORTANT !!!!!!  AFTER CONVERSION XML => JSON - SAVE JSON FILE WITH ENCODING UFT-8 *********/

var map0477 = loadJSON('../data/expressionMaps/0477_Woodwinds.json');



// EXTRACT ARTICULATIONS

//var art_m0477_Woodwinds = [
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[0]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[1]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[2]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[3]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[4]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[5]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[6]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[7]?.string[1]._value,
//m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[8]?.string[1]._value];

//var myToTalArts = 8

//console.log (neu[0])


//	n = 1 to myToTalArts
//	var art_m0477_Woodwinds = [m0477_Woodwinds.InstrumentMap.member[0]?.list.obj[n]?.string[1]._value
//next n

var instruments = {
	0:{'trackname':'No Expression Map','trackarticulations':['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',]},
	1:{'trackname':'Berlin Symphonic Strings - Violins I','trackarticulations':['Melodic Legato','Pattern Legato','','','','','Sustains','Sustains Soft','Sustains Accented','','','','Marcato Long','Marcato Short','','','','','Spiccato','Staccato','Pizzicato','','','','Tremolo','Trills Minor','Trills Major','','','','','','','','','',]},
	2:{'trackname':'Berlin Symphonic Strings - Violins II','trackarticulations':['Melodic Legato','Pattern Legato','','','','','Sustains','Sustains Soft','Sustains Accented','','','','Marcato Long','Marcato Short','','','','','Spiccato','Staccato','Pizzicato','','','','Tremolo','Trills Minor','Trills Major','','','','','','','','','',]},
	3:{'trackname':'Berlin Symphonic Strings - Violas','trackarticulations':['Melodic Legato','Pattern Legato','','','','','Sustains','Sustains Soft','Sustains Accented','','','','Marcato Long','Marcato Short','','','','','Spiccato','Staccato','Pizzicato','','','','Tremolo','Trills Minor','Trills Major','','','','','','','','','',]},
	4:{'trackname':'Berlin Symphonic Strings - Celli','trackarticulations':['Melodic Legato','Pattern Legato','','','','','Sustains','Sustains Soft','Sustains Accented','','','','Marcato Long','Marcato Short','','','','','Spiccato','Staccato','Pizzicato','','','','Tremolo','Trills Minor','Trills Major','','','','','','','','','',]},
	5:{'trackname':'Berlin Symphonic Strings - Basses','trackarticulations':['Melodic Legato','','','','','','Sustains','Sustains Soft','Sustains Accented','','','','Marcato Long','Marcato Short','','','','','Spiccato','Staccato','Pizzicato','','','','Tremolo','','','','','','','','','','','',]},
	6:{'trackname':'Junkie XL Brass - Full Brass','trackarticulations':['','','','','','','Sustains','','','','','','Marcato Short','','','','','','Staccatissimo','','','','','','','','','','','','','','','','','',]},
	7:{'trackname':'Junkie XL Brass - Solo Trumpet','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	8:{'trackname':'Junkie XL Brass - Trumpets a3','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	9:{'trackname':'Junkie XL Brass - Trumpets a6','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	10:{'trackname':'Junkie XL Brass - Solo Horn','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	11:{'trackname':'Junkie XL Brass - Horns a4','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	12:{'trackname':'Junkie XL Brass - Horns a6','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	13:{'trackname':'Junkie XL Brass - Horns a12','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	14:{'trackname':'Junkie XL Brass - Solo Trombone','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	15:{'trackname':'Junkie XL Brass - Trombones a3','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	16:{'trackname':'Junkie XL Brass - Trombones a6','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	17:{'trackname':'Junkie XL Brass - Trombones a12','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','','','','','','',]},
	18:{'trackname':'Junkie XL Brass - Bass Trombones a3','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	19:{'trackname':'Junkie XL Brass - Cimbassi a3','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	20:{'trackname':'Junkie XL Brass - Tuba','trackarticulations':['Sustains + Leg','','','','','','Sustains','Sustains Soft','Sforzando Sustains','','','','Marcato Long','Marcato Short','','','','','Staccatissimo','Staccato','','','','','','','','','','','Rips','','','','','',]},
	477:{'trackname':'map0477','trackarticulations':['Long','Legato','Long Hollow','Long Detuned','Long Rebow','Long Pulse','Marcato','Staccatissimo','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',]},
	
	
}



console.log (instruments);





//var articulation = m0477_Woodwinds;

//console.log (art_m0477_Woodwinds);


var buttonGrid, labelTexts;

var buttons = {
		'b1': '/b1/show','b2': '/b2/show','b3': '/b3/show','b4': '/b4/show','b5': '/b5/show','b6': '/b6/show','b7': '/b7/show','b8': '/b8/show','b9': '/b9/show','b10': '/b10/show',
		'b11': '/b11/show','b12': '/b12/show','b13': '/b13/show','b14': '/b14/show','b15': '/b15/show','b16': '/b16/show','b17': '/b17/show','b18': '/b18/show','b19': '/b19/show','b20': '/b20/show',
		'b21': '/b21/show','b22': '/b22/show','b23': '/b23/show','b24': '/b24/show','b25': '/b25/show','b26': '/b26/show','b27': '/b27/show','b28': '/b28/show','b29': '/b29/show','b30': '/b30/show',
		'b31': '/b31/show','b32': '/b32/show','b33': '/b33/show','b34': '/b34/show','b35': '/b35/show','b36': '/b36/show','b37': '/b37/show','b38': '/b38/show','b39': '/b39/show','b40': '/b40/show',
		'b41': '/b41/show','b42': '/b42/show','b43': '/b43/show','b44': '/b44/show','b45': '/b45/show','b46': '/b46/show','b47': '/b47/show','b48': '/b48/show','b49': '/b49/show','b50': '/b50/show',
		'b51': '/b51/show','b52': '/b52/show','b53': '/b53/show','b54': '/b54/show','b55': '/b55/show'
	}
	
var labels = {
		'b1': '/b1/label','b2': '/b2/label','b3': '/b3/label','b4': '/b4/label','b5': '/b5/label','b6': '/b6/label','b7': '/b7/label','b8': '/b8/label','b9': '/b9/label','b10': '/b10/label',
		'b11': '/b11/label','b12': '/b12/label','b13': '/b13/label','b14': '/b14/label','b15': '/b15/label','b16': '/b16/label','b17': '/b17/label','b18': '/b18/label','b19': '/b19/label','b20': '/b20/label',
		'b21': '/b21/label','b22': '/b22/label','b23': '/b23/label','b24': '/b24/label','b25': '/b25/label','b26': '/b26/label','b27': '/b27/label','b28': '/b28/label','b29': '/b29/label','b30': '/b30/label',
		'b31': '/b31/label','b32': '/b32/label','b33': '/b33/label','b34': '/b34/label','b35': '/b35/label','b36': '/b36/label','b37': '/b37/label','b38': '/b38/label','b39': '/b39/label','b40': '/b40/label',
		'b41': '/b41/label','b42': '/b42/label','b43': '/b43/label','b44': '/b44/label','b45': '/b45/label','b46': '/b46/label','b47': '/b47/label','b48': '/b48/label','b49': '/b49/label','b50': '/b50/label',
		'b51': '/b51/label','b52': '/b52/label','b53': '/b53/label','b54': '/b54/label','b55': '/b55/label'
	}


// read JSON file from converted Excel CSV file
var trackInstrumets = loadJSON('../data/excel/trackInstruments.json')


//var codeFromCubase = parseInt ("0130")
//var codeInstr = codeFromCubase-1

//console.log (trackInstrumets [codeInstr]);
//console.log (trackInstrumets [codeInstr]['instrumentName'])

//test anderes modul
//var num = require('./bpm.js')
//console.log (num);



module.exports = {

	init: function(){
		// this will be executed once when the osc server starts
	},
	
    oscInFilter:function(data){
        var {address, args, host, port} = data

		if (host === 'midi' && port === 'HUI' && address === '/sysex') {

			
			// FILTER OUT UNWANTED SYSEX

			if (args[0].value.includes('f0 00 00 66 05 00 10')) return {address, args, host, port}
			if (args[0].value.includes('f0 00 00 66 05 00 11')) return {address, args, host, port}
			if (args[0].value.includes('f0 00 00 66 05 00 12 04 20 45 51 20 31 20 47 61 69 6e 05 20 45 51 20 31 20 46 72 65 71 06 20 20 45 51 20 31 20 51 20 20 07 20 20 45 51 20 31 20 4f 6e 20 f7')) return {address, args, host, port}
			if (args[0].value.includes('f0 00 00 66 05 00 12 04 20 20 20 20 20 20 20 20 20 20 05 20 20 20 20 20 20 20 20 20 20 06 20 20 20 20 20 20 20 20 20 20 07 20 20 20 20 20 20 20 20 20 20 f7')) return {address, args, host, port}
			
			
			// CUBASE TRACKS HEX TO ASCII STRING

			var input  = args[0].value.split(' ').splice(9 ,5);
			//var remove = input.splice(9, 1);
			input.pop();			
			input = input.join('');
			var trackname = '';
			for (var n = 0; n < input.length; n += 2) {
				trackname += String.fromCharCode(parseInt(input.substr(n, 2), 16));
			}

			// ***************** Rename Button with Instrument name *******************************/

			var codeFromCubase = parseInt (trackname)
			if (codeFromCubase >= 0 && codeFromCubase <= 5000){
				var instrName = (trackInstrumets [codeFromCubase-1]['instrumentName'])
				var groupName = (trackInstrumets [codeFromCubase-1]['group'])
				var prodName = (trackInstrumets [codeFromCubase-1]['productName'])
			}
			else {
				var instrName = 'Nicht in der Datenbank'
				var groupName = '(eigener)'
				var prodName = 'Cubase eintrag'
			}
			
			// ****************** Rename text-widget with Instruments from Cubase ********************/

			var venGrpName = prodName +" "+ groupName
			if (trackname) {
				receive('/EDIT', 'text_code', {value: trackname}),
				receive('/EDIT', 'text_instrument', {value: instrName}),
				receive('/EDIT', 'text_vendor', {value: venGrpName})
			}

			/***************** D Y N A M I C  A R T I C U L A T I O N  B U T T O N S *****************/

            if (trackname.includes('AS - Bass Upright')) {
                articulation = art_as_bass_upright
            }


			//buttonGrid = articulation.length
		    //labelTexts = Object.values(articulation);
			//for (i = 0; i < buttonGrid; i++)
			//	{
			//	var label = labelTexts[i]
			//	receiveOsc({address: Object.values(buttons)[i], args: [{type: 'i', value: 1}]})
			//	receiveOsc({address: Object.values(labels)[i], args: [{type: 's', value: label}]})
			//	}
			//					
			//for (i = buttonGrid; i < 50; i++)
			//	{
			//	receiveOsc({address: Object.values(buttons)[i], args: [{type: 'i', value: 0}]})					
			//	}
		}
		return {address, args, host, port}
    },

	oscOutFilter:function(data){
		// Filter outgoing osc messages

        var {address, args, host, port, clientId} = data

        // same as oscInFilter

        // return data if you want the message to be and sent
        return {address, args, host, port}
	},

	unload:function(){
		// this will be executed when the custom module is reloaded
	},
}	
