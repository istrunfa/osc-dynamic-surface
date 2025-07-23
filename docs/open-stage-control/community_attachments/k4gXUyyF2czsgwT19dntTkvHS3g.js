module.exports = {

    oscInFilter: (data)=>{

        // pass message to logger
        receive('/logger', data.address, ...data.args)

        // let original message through
        return data
    }
}
