module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        if (host === 'midi') {
            
			if (address === '/control') {

				var [channel, ctrl, value] = args.map(arg=>arg.value)
				var label = {
					0:{'label':['Label A']},
					1:{'label':['Label B']},
					2:{'label':['Label C']},
					3:{'label':['Label D']},
					4:{'label':['Label E']},
					5:{'label':['Label F']},
				}
				
				if (ctrl === 119, value === 0) receive('/EDIT', 'button_1', label[0]), receive('/EDIT', 'button_2', label[1]), receive('/EDIT', 'button_3', label[2]), receive('/EDIT', 'button_4', label[3])
				if (ctrl === 119, value === 1) receive('/EDIT', 'button_1', label[0]), receive('/EDIT', 'button_2', label[3]), receive('/EDIT', 'button_3', label[4]), receive('/EDIT', 'button_4', label[5])

        }
		
		return
		
		}

        return {address, args, host, port}

    }
	
}