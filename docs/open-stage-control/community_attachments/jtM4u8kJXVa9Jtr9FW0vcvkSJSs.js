////////////////////////////////////////
//INSERT HERE: TITLE AND ARTICULATIONS//
////////////////////////////////////////

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
	
	
}
///
//////
/////////
////////////
///////////////
//////////////////
/////////////////////
////////////////////////
///////////////////////////
//////////////////////////////
/////////////////////////////////
////////////////////////////////////
///////////////////////////////////////

/////////////////////////////////////////////
//MAIN FUNCTION: DEALING WITH INCOMING DATA//
/////////////////////////////////////////////

module.exports = {
    oscInFilter:function(data){
        var {address, args, host, port} = data
        if (address !=='/control') return
		if (args[1].value < 102 && args[1].value > 121) return
		
		// CC 120
		if (args[1].value == 120) {
			addAllCc = (args[2].value) * 128;
		}
		
		// CC 121
		if (args[1].value == 121) {
			patch = args[2].value + addAllCc
			labelTexts = instruments[patch].trackarticulations
			var len = labelTexts.length
			for (i = 0; i < len; i++){
				receiveOsc({
					address: Object.values(labels)[i],
					args: [{type:'s',value: labelTexts[i]}]
				})
			}
			receive('/EDIT', 'title_instrument',{html:instruments[patch].trackname})
			return
		}
		
		// CC 118 -> CC 119 back to Cubase
		if (args[1].value == 118) {
			sendOsc({
					address: '/control',
					args: [{type: 'i', value: 1}, {type: 'i', value: 119}, {type: 'i', value: 1}],	
					host: 'midi',
					port: 'OSCtoDAW'
			})
		}
		
		// CC 102 - 117
		if (args[1].value >= 102 && args[1].value <= 117) {
			addAllCc = (args[1].value - 102) * 128
			setTimeout(
				function() {
					patch = args[2].value + addAllCc
					labelTexts = instruments[patch].trackarticulations
					var len = labelTexts.length
					for (i = 0; i < len; i++){
						receiveOsc({
							address: Object.values(labels)[i],
							args: [{type:'s',value: labelTexts[i]}]
						})
					}
					receive('/EDIT', 'title_instrument',{html:instruments[patch].trackname})
					return
				}, 60
			)
		}
	}
}



////////////////////
//ADRESSING LABELS//
////////////////////

var patch, buttonGrid, labelTexts, addAllCc;

var labels = {
	'b01':'/b01/label','b02':'/b02/label','b03':'/b03/label','b04':'/b04/label','b05':'/b05/label','b06':'/b06/label',
	'b07':'/b07/label','b08':'/b08/label','b09':'/b09/label','b10':'/b10/label','b11':'/b11/label','b12':'/b12/label',
	'b13':'/b13/label','b14':'/b14/label','b15':'/b15/label','b16':'/b16/label','b17':'/b17/label','b18':'/b18/label',
	'b19':'/b19/label','b20':'/b20/label','b21':'/b21/label','b22':'/b22/label','b23':'/b23/label','b24':'/b24/label',
	'b25':'/b25/label','b26':'/b26/label','b27':'/b27/label','b28':'/b28/label','b29':'/b29/label','b30':'/b30/label',
	'b31':'/b31/label','b32':'/b32/label','b33':'/b33/label','b34':'/b34/label','b35':'/b35/label','b36':'/b36/label'
}