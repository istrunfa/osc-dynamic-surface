execSync = nativeRequire('child_process').execSync;

module.exports = {

    oscInFilter:function(data){

        var {address, args, host, port} = data

        if (address === '/read') {
            str = execSync(__dirname+'\\sigrok-cli.exe -d uni-t-ut61e-ser:conn=\\\\.\\COM1 -O analog --samples 1')
            result = str.toString()
            words = result.split(' ')
            value = parseFloat(words[1])
            send(host, port, '/reading', {type:"f", value: value} )
            return // bypass original message
        }
        return {address, args, host, port}
    },
}

