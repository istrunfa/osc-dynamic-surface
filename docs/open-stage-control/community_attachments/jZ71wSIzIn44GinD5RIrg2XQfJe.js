const {resolve} = nativeRequire("path");
var fs = nativeRequire("fs");

stringifyToDepth = function(data, maxDepth){
	var prettyString = ""
  var rCount = 0
  var writeArray
  var indent;

	if(maxDepth === 0) {
		JSON.stringify(data)
	} else {
		indent = function(size) {return Array.from({length: size}, () => "  ").join("")}
		writeArray = function(array) {
			prettyString = prettyString + indent(rCount) + "[\n"
			rCount = rCount + 1
			if(rCount < maxDepth) {
        array.forEach(item => writeArray(item))
			} else {
        var formmattedArray;
				formattedArray = array.map(item => indent(rCount) + JSON.stringify(item)).join(",\n")
        formattedArray = formattedArray.replaceAll("[", "[ ").replaceAll("]", " ]").replaceAll(",", ", ")
        prettyString = prettyString + formattedArray
			}
			rCount = rCount - 1;
			prettyString = prettyString + "\n" + indent(rCount) + "],\n";
		}

		writeArray(data)
    prettyString = prettyString.replaceAll(",\n\n", "\n").slice(0, -2);
    return prettyString
	}
}

module.exports = {

    init: function(){
        // this will be executed once when the osc server starts
    },

    oscInFilter:function(data) {

      var {host, port, address, args} = data

      //console.log(data)

      if (address === '/playing') {

        var modelPath = resolve(args[0].value)
        var model = loadJSON(modelPath)
        //receive('/STATE/OPEN', guiStatePath)

        receive('/SET', "ref_uid", model.ref_uid)

        receive('/SET', "order_seed", model.order_seed)
        receive('/SET', "dur_seed", model.dur_seed)
        receive('/SET', "weights_seed", model.motifs_seed)

        //model.entrances_probs_vals = state.entrances_probs_vals
        //model.passages_probs_vals = state.passages_probs_vals
        //model.exits_probs_vals = state.exits_probs_vals

        // no idea why I need to call the range sliders twice
        receive("/range_matrix/0_val_rslider", ...model.ranges[0])
        receive("/range_matrix/0_val_rslider", ...model.ranges[0])
        receive('/SET', "range_matrix/1_val_rslider", ...model.ranges[1])
        receive('/SET', "range_matrix/1_val_rslider", ...model.ranges[1])
        receive('/SET', "range_matrix/2_val_rslider", ...model.ranges[2])
        receive('/SET', "range_matrix/2_val_rslider", ...model.ranges[2])
        receive('/SET', "range_matrix/3_val_rslider", ...model.ranges[3])
        receive('/SET', "range_matrix/3_val_rslider", ...model.ranges[3])

        receive('/SET', "passages_weights/0_val_slider", model.passages_weights[0])
        receive('/SET', "passages_weights/1_val_slider", model.passages_weights[1])
        receive('/SET', "passages_weights/2_val_slider", model.passages_weights[2])
        receive('/SET', "passages_weights/3_val_slider", model.passages_weights[3])
        receive('/SET', "passages_weights/4_val_slider", model.passages_weights[4])

        receive('/SET', "order", stringifyToDepth(model.order, 1))

        receive('/SET', "sus_weights/0_val_slider", model.sus_weights[0])
        receive('/SET', "sus_weights/1_val_slider", model.sus_weights[1])
        receive('/SET', "sus_weights/2_val_slider", model.sus_weights[2])

        receive('/SET', "order_size_rslider", ...model.order_size)
        receive('/SET', "order_size_rslider", ...model.order_size)
        receive('/SET', "passages_size_rslider", ...model.passages_size)
        receive('/SET', "passages_size_rslider", ...model.passages_size)

        receive('/SET', "mus_seq", stringifyToDepth(model.music_data, 3))
        receive('/SET', "cur_play_index", args[1].value)
      }

      if (address === '/generated') {

        var guiStatePath = resolve(__dirname + "/../../resources/tmp/tmp_gui_state.json")
        //var musPath = resolve(__dirname + "/../../resources/tmp/tmp_music.json")
        var ledgerPath = resolve(__dirname + "/../../resources/piece_ledger.json")
        var guiState = loadJSON(guiStatePath)
        //var musState = loadJSON(musPath)
        //guiState.mus_seq = musState.music_data
        saveJSON(guiStatePath, guiState)
        var ledger = loadJSON(ledgerPath).ledger
        ledger.push("tmp")
        var model = JSON.parse(args[1].value);
        receive('/SET', "ledger", JSON.stringify(ledger, null, '  ').replace(/['"]+/g, ''))
        receive('/SET', "mus_seq", stringifyToDepth(model.music_data, 3))
        receive('/SET', "order", stringifyToDepth(model.order, 1))
      }

      if (address === '/committed') {
          try {
            var guiStatePath = resolve(__dirname + "/../../resources/tmp/tmp_gui_state.json")
            var curUID = args[0].value
            var state = loadJSON(guiStatePath)
            state.cur_uid = curUID
            var dir = resolve(__dirname + "/../../resources/" + curUID)
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            guiStatePath = resolve(__dirname + "/../../resources/" + curUID + "/" + curUID + "_gui_state.json")
            saveJSON(guiStatePath, state)
          } catch (e) {
              console.log(`error while committing`)
              console.error(e)
          }

          var ledgerPath = args[1].value
          receive('/SET', "ledger", JSON.stringify(loadJSON(ledgerPath).ledger, null, '  ').replace(/['"]+/g, ''))
          return
      }

      if (address === '/load_state') {
          var ref_uid = args[0].value
          loadState(loadJSON("../../resources/" + ref_uid + "/" + ref_uid + "_gui_state.json"))
          receive('/commit')
          return
      }

      return data

    },

    oscOutFilter:function(data) {

        var {host, port, address, args} = data

        //console.log(data)

        if (address === '/generate') {
            try {
                var state = JSON.parse(args[0].value)

                //console.log(__dirname)
                var modelPath = resolve(__dirname + "/../../resources/tmp/tmp_mus_model.json")
                var model = {}
                model.schema_version = "1.0"
                model.cur_uid = "tmp"
                model.ref_uid = state.ref_uid
                if(model.ref_uid == "[" || model.ref_uid == "[]") {delete model["ref_uid"]}
                model.order_seed = state.order_seed
                model.dur_seed = state.dur_seed
                model.motifs_seed = state.weights_seed
                model.entrances_probs_vals = state.entrances_probs_vals
                model.passages_probs_vals = state.passages_probs_vals
                model.exits_probs_vals = state.exits_probs_vals
                model.ranges = [
                  state["range_matrix/0_val_rslider"],
                  state["range_matrix/1_val_rslider"],
                  state["range_matrix/2_val_rslider"],
                  state["range_matrix/3_val_rslider"]
                ]
                model.passages_weights = [
                  state["passages_weights/0_val_slider"],
                  state["passages_weights/1_val_slider"],
                  state["passages_weights/2_val_slider"],
                  state["passages_weights/3_val_slider"],
                  state["passages_weights/4_val_slider"]
                ]
                if(state.order_lock == 1){
                  model.order = JSON.parse(state.order)
                }
                model.sus_weights = [
                  state["sus_weights/0_val_slider"],
                  state["sus_weights/1_val_slider"],
                  state["sus_weights/2_val_slider"]
                ]
                model.order_size = state.order_size_rslider
                model.passages_size = state.passages_size_rslider
                //console.log(model)
                saveJSON(modelPath, model)

                var ledgerPanelState = JSON.parse(args[1].value)
                delete ledgerPanelState.ref_uid
                var omitKeys = Object.keys(ledgerPanelState).concat(["generate", "commit"])
                //console.log(omitKeys[0])
                for(k in omitKeys) {
                  //console.log(omitKeys[k])
                  delete state[omitKeys[k]]
                }
                var guiStatePath = resolve(__dirname + "/../../resources/tmp/tmp_gui_state.json.json")
                saveJSON(guiStatePath, state)

                args = args.slice(0, 1)
                args[0].value = modelPath
                return {host, port, address, args}
            } catch (e) {
                //console.log(`error while building model ${args[0].value}`)
                console.log(`error while building model`)
                console.error(e)
            }
            return
        }

        if (address === '/load_ledger') {
          //console.log(loadJSON(args[0].value))
          receive('/SET', "ledger", JSON.stringify(loadJSON(args[0].value).ledger, null, '  ').replace(/['"]+/g, ''))
          return data
        }

        if (address === '/commit') {
          var model = {}
          model.music = JSON.parse(args[0].value)
          args[0].value = JSON.stringify(model)
          return {host, port, address, args}
        }

        if ([/*'/commit', */'/save_ledger', '/transport'].includes(address)) {
          return data
        }

        return

    },

    unload: function(){
        // this will be executed when the custom module is reloaded
    },

}
