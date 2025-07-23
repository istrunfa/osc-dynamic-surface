var oscPort = '8080';
var bank, patch, buttonGrid, labelTexts;
var buttons = {
		'b1':'/b1/show','b2':'/b2/show','b3':'/b3/show','b4':'/b4/show','b5':'/b5/show',
		'b6':'/b6/show','b7':'/b7/show','b8':'/b8/show','b9':'/b9/show','b10':'/b10/show',
		'b11':'/b11/show','b12':'/b12/show','b13':'/b13/show','b14':'/b14/show','b15':'/b15/show',
		'b16':'/b16/show','b17':'/b17/show','b18':'/b18/show','b19':'/b19/show','b20':'/b20/show',
		'b21':'/b21/show','b22':'/b22/show','b23':'/b23/show','b24':'/b24/show','b25':'/b25/show',
		'b26':'/b26/show','b27':'/b27/show','b28':'/b28/show','b29':'/b29/show','b30':'/b30/show',
		'b31':'/b31/show','b32':'/b32/show','b33':'/b33/show','b34':'/b34/show','b35':'/b35/show',
		'b36':'/b36/show','b37':'/b37/show','b38':'/b38/show','b39':'/b39/show','b40':'/b40/show',
		'b41':'/b41/show','b42':'/b42/show','b43':'/b43/show','b44':'/b44/show','b45':'/b45/show',
		'b46':'/b46/show','b47':'/b47/show','b48':'/b48/show','b49':'/b49/show','b50':'/b50/show',
		'b51':'/b51/show','b52':'/b52/show','b53':'/b53/show','b54':'/b54/show','b55':'/b55/show'
	}
var labels = {
		'b1':'/b1/label','b2':'/b2/label','b3':'/b3/label','b4':'/b4/label','b5':'/b5/label',
		'b6':'/b6/label','b7':'/b7/label','b8':'/b8/label','b9':'/b9/label','b10':'/b10/label',
		'b11':'/b11/label','b12':'/b12/label','b13':'/b13/label','b14':'/b14/label','b15':'/b15/label',
		'b16':'/b16/label','b17':'/b17/label','b18':'/b18/label','b19':'/b19/label','b20':'/b20/label',
		'b21':'/b21/label','b22':'/b22/label','b23':'/b23/label','b24':'/b24/label','b25':'/b25/label',
		'b26':'/b26/label','b27':'/b27/label','b28':'/b28/label','b29':'/b29/label','b30':'/b30/label',
		'b31':'/b31/label','b32':'/b32/label','b33':'/b33/label','b34':'/b34/label','b35':'/b35/label',
		'b36':'/b36/label','b37':'/b37/label','b38':'/b38/label','b39':'/b39/label','b40':'/b40/label',
		'b41':'/b41/label','b42':'/b42/label','b43':'/b43/label','b44':'/b44/label','b45':'/b45/label',
		'b46':'/b46/label','b47':'/b47/label','b48':'/b48/label','b49':'/b49/label','b50':'/b50/label',
		'b51':'/b51/label','b52':'/b52/label','b53':'/b53/label','b54':'/b54/label','b55':'/b55/label'
	}
///****** INSTRUMENTS ARTICULATIONS
		var instruments = {
		0:{ 'trackname':'Violon 1', 'trackarticulations':['Sustain', 'Tremolo','Harmonic', 'Staccato','Spiccato']},
		1:{ 'trackname':'Orchestral Ukulele', 'trackarticulations':['Trills','gliss','Sfz','Pizz','Col Legno', 'Bartok pizz']},
        // etc
	}
///******  ARTICULATIONS COLORS
  var color_typologie ={
  'red': ['Sustain','Tremolo','Sfz'],
  'blue': ['Harmonic','Col Legno'],
  'yellow': ['Staccato','Trills'],
  'green': ['Spiccato','gliss'],
  'pink': ['Pizz','Bartok pizz'],
  // etc
}
module.exports = {
    oscInFilter:function(data)
	{
        var {address, args, host, port} = data
///*****
    if (address !=='/control') return {address, args, host, port}
		if (args[1].value < 117) return {address, args, host, port}
		if (args[1].value == 127) 
			{
			send('midi','OSCtoDAW','/control', 1,126,1)
		return {address, args, host, port}
			}
		else
			{
			bank = (args[1].value - 117)     
			patch = (bank * 128) + args[2].value

			labelTexts=instruments[patch].trackarticulations
			var len =labelTexts.length
			for (i = 0; i < len; i++)
				{
				receiveOsc({address: Object.values(buttons)[i], args: [{type:'i', value: 1}]})
				receiveOsc({address: Object.values(labels)[i], args: [{type:'s', value: labelTexts[i]}]})
				}
			var len2=Object.values(buttons).length
			for (i = len; i < len2; i++)
				{
				receiveOsc({address: Object.values(buttons)[i], args: [{type:'i', value: 0}]})					
				}
	// SHOW SELECTED INSTRUMENT			
			receive('/EDIT', 'button_container_id', {html:'Selected instrument : '+ instruments[patch].trackname })
    	    return
			}
		return {address, args, host, port}
	},
}