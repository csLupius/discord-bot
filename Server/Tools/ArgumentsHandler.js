var ArgumentHandler = (function () {

    var EnteredArguments = (function () {
        var a = {};
        for (var i = 2; i < process.argv.length; i++) {
            if (process.argv[i].indexOf('=') >= 0) {
                try {
                    a[process.argv[i].substring(0,process.argv[i].indexOf('='))] = process.argv[i].substring(process.argv[i].indexOf('=') + 1);
                } catch (ex) {
                    process.exit(1);
                }
            }else{
                a[process.argv[i]] = true;
            }
        }
        return a;
    })();

    function _valueOfArgument(argName){
        //console.log("Found Arguments");
        //console.log(EnteredArguments);
        if(EnteredArguments.hasOwnProperty(argName)){
            return EnteredArguments[argName];
        }else{
            return false;
        }
    }
    return {
        valueOfArgument : _valueOfArgument
    }
})();
module.exports = ArgumentHandler;