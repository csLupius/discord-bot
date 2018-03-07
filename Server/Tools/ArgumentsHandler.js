var ArgumentHandler = (function () {

    var EnteredArguments = (function () {
        var a = [];
        for (var i = 2; i < process.argv.length; i++) {
            if (~~process.argv[i].indexOf('=')) {
                try {
                    a[''+process.argv[i].substring(0,process.argv[i].indexOf('='))] = process.argv[i].substring(process.argv[i].indexOf('=') + 1);
                } catch (ex) {
                    process.exit(1);
                }
            }else{
                a[''+process.argv[i]] = true;
            }
        }
        return a;
    })();

    function _valueOfArgument(argName){
        console.log("Found Arguments");
        console.log(EnteredArguments);
        for(var i = 0; i < EnteredArguments.length; i ++)
        {
             return EnteredArguments[''+argName] || false;
        }
    }
    return {
        valueOfArgument : _valueOfArgument
    }
})();
module.exports = ArgumentHandler;