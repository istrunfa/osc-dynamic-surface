 (function(){

    /*

        Articulation filter:

        Hide/Show available articulations depending
        on currently selected track's name.

        This assumes each articulation button's css property is set to:
        :host {
            #{
                OSC{/widget_id/show, 1} == 0 ? "display:none;" : ""
            }
        }

        Note: /widget_id/show must be different for each button
        and is used below at "var articulations = ..."

    */

    var tracks = {
        // left-side: track names as sent by the daw
        // right-side: array of articulation names that are available for this track
        'Low Strings Staccato': ['2', '7', '10'],
		'SSS_VLN1_CORE': ['20', '34', '31', '33', '1', '7', '10', '8', '18', '17', '112', '9', '42', '50',  '52', '48', '62', '61',   ],
        'BB_Horn 1_Staccato': ['1', '5', '10'],
		   'BPERC_Cymbal_Hits': ['long', 'rips']
        // etc
    }

    var articulations = {
        // left-side: articulation names, as defined in above statement
        // right-side: address of the osc-receiver used in the button's css
'1': '/widget_id_1/show',
'2': '/widget_id_2/show',
'3': '/widget_id_3/show',
'4': '/widget_id_4/show',
'5': '/widget_id_5/show',
'6': '/widget_id_6/show',
'7': '/widget_id_7/show',
'8': '/widget_id_8/show',
'9': '/widget_id_9/show',
'10': '/widget_id_10/show',
'11': '/widget_id_11/show',
'12': '/widget_id_12/show',
'13': '/widget_id_13/show',
'14': '/widget_id_14/show',
'15': '/widget_id_15/show',
'16': '/widget_id_16/show',
'17': '/widget_id_17/show',
'18': '/widget_id_18/show',
'19': '/widget_id_19/show',
'20': '/widget_id_20/show',
'21': '/widget_id_21/show',
'22': '/widget_id_22/show',
'23': '/widget_id_23/show',
'24': '/widget_id_24/show',
'25': '/widget_id_25/show',
'26': '/widget_id_26/show',
'27': '/widget_id_27/show',
'28': '/widget_id_28/show',
'29': '/widget_id_29/show',
'30': '/widget_id_30/show',
'31': '/widget_id_31/show',
'32': '/widget_id_32/show',
'33': '/widget_id_33/show',
'34': '/widget_id_34/show',
'35': '/widget_id_35/show',
'36': '/widget_id_36/show',
'37': '/widget_id_37/show',
'38': '/widget_id_38/show',
'39': '/widget_id_39/show',
'40': '/widget_id_40/show',
'41': '/widget_id_41/show',
'42': '/widget_id_42/show',
'43': '/widget_id_43/show',
'44': '/widget_id_44/show',
'45': '/widget_id_45/show',
'46': '/widget_id_46/show',
'47': '/widget_id_47/show',
'48': '/widget_id_48/show',
'49': '/widget_id_49/show',
'50': '/widget_id_50/show',
'51': '/widget_id_51/show',
'52': '/widget_id_52/show',
'53': '/widget_id_53/show',
'54': '/widget_id_54/show',
'55': '/widget_id_55/show',
'56': '/widget_id_56/show',
'57': '/widget_id_57/show',
'58': '/widget_id_58/show',
'59': '/widget_id_59/show',
'60': '/widget_id_60/show',
'61': '/widget_id_61/show',
'62': '/widget_id_62/show',
'63': '/widget_id_63/show',
'64': '/widget_id_64/show',
'65': '/widget_id_65/show',
'66': '/widget_id_66/show',
'67': '/widget_id_67/show',
'68': '/widget_id_68/show',
'69': '/widget_id_69/show',
'70': '/widget_id_70/show',
'71': '/widget_id_71/show',
'72': '/widget_id_72/show',
'73': '/widget_id_73/show',
'74': '/widget_id_74/show',
'75': '/widget_id_75/show',
'76': '/widget_id_76/show',
'77': '/widget_id_77/show',
'78': '/widget_id_78/show',
'79': '/widget_id_79/show',
'80': '/widget_id_80/show',
'81': '/widget_id_81/show',
'82': '/widget_id_82/show',
'83': '/widget_id_83/show',
'84': '/widget_id_84/show',
'85': '/widget_id_85/show',
'86': '/widget_id_86/show',
'87': '/widget_id_87/show',
'88': '/widget_id_88/show',
'89': '/widget_id_89/show',
'90': '/widget_id_90/show',
'91': '/widget_id_91/show',
'92': '/widget_id_92/show',
'93': '/widget_id_93/show',
'94': '/widget_id_94/show',
'95': '/widget_id_95/show',
'96': '/widget_id_96/show',
'97': '/widget_id_97/show',
'98': '/widget_id_98/show',
'99': '/widget_id_99/show',
'100': '/widget_id_100/show',
'101': '/widget_id_101/show',
'102': '/widget_id_102/show',
'103': '/widget_id_103/show',
'104': '/widget_id_104/show',
'105': '/widget_id_105/show',
'106': '/widget_id_106/show',
'107': '/widget_id_107/show',
'108': '/widget_id_108/show',
'109': '/widget_id_109/show',
'110': '/widget_id_110/show',
'111': '/widget_id_111/show',
'112': '/widget_id_112/show',
'113': '/widget_id_113/show',
'114': '/widget_id_114/show',
'115': '/widget_id_115/show',
'116': '/widget_id_116/show',
'117': '/widget_id_117/show',
'118': '/widget_id_118/show',
'119': '/widget_id_119/show',
'120': '/widget_id_120/show',
'121': '/widget_id_121/show',

        // etc
    }

var colors = {
// add the colors
'Low Strings Staccato': '#8ABF76',

'SSS_VLN1_CORE': '#D3B5A6',
'BB_Horn 1_Staccato': '#D962FB',
'BPERC_Cymbal_Hits': '#157DB8'
/*
'strings solo': '#007C06'
'strings fx': '#007C06'
'strings ensembles': '#007C06'
'woodwinds': '#8ABF76'
'woodwinds solo': '#007C06'
'woodwinds fx': '#007C06'
'woodwinds ethnic': '#007C06'
'woodwinds ensembles': '#007C06'
'brass': '#8ABF76'
'brass solo': '#007C06'
'brass fx': '#007C06'
'brass jazz': '#007C06'
'brass ensembles': '#007C06'
'orchdrums': '#8ABF76'
'epicdrums': '#007C06'
'hybriddrums': '#007C06'
'electdrums': '#007C06'
'brass fx': '#007C06'
'brass jazz': '#007C06'
'brass ensembles': '#007C06'
'sounddesign': '#007C06'
*/



    }




    function articulationFilter(address, args){

        // only filter messages that match our needs
        if (address !== '/track/name') return

        // retreive the track's name, here assuming it's in the first argument
        var trackname = args[0].value

        // loop through all articulations and show/hide the button
        for (var articulation in articulations) {
            var show = tracks[trackname] !== undefined && tracks[trackname].includes(articulation) ? 1 : 0
            receiveOsc({
                address: articulations[articulation],
                args: [
                    // you might need to add some args here
                    // if the articulation buttons have preArgs
                    {type: 'i', value: show}
                ]
            })
        }


    }


    function colorFilter(address, args){

        // check that address matches /track/@/name using a "regular expression" or "regexp"
        if (!address.match(/\/track\/[0-9]+\/name/) ) return

        // split the address at each '/' character
        // /track/1/number -> ['', 'track', '1', 'number']
        // array index:        0      1      2      3
        var tracknumber = address.split('/')[2]

        // get track name
        var trackname = args[0].value

        // get color code based on trackname
        var colorcode = colors[trackname]
        // we can event set a default color here if trackname is not found in the colors object:
        // var colorcode = colors[trackname] || '#ff0000'


        // send color to osc receiver : OSC{/color/@{parent.variables.n}}
        receive("/color/" + tracknumber, colorcode)

    }








    return {

        oscInFilter:function(data){

            var {address, args, host, port} = data

            // insert our custom filter in the loop
            articulationFilter(address, args)
            colorFilter(address, args)
            // my additions



            //
            return {address, args, host, port}

        }

    }





})()
