
export default {
    methods: {
        groupBy (loanRequest, referrals, offers, arrayFunctions, additionalData) {
            var self = this;
            var obj = {};
            for(var i=0;i<offers.length;++i) {
                var offer = offers[i];
                for(var j=0;j<arrayFunctions.length;++j) {
                    var functionName = arrayFunctions[j];
                    
                    if (typeof self[functionName] == "undefined") {
                        console.log(functionName + " is not defined as part of ", self);
                        return;
                    }
                    
                    var result = self[functionName](offer, loanRequest, referrals, additionalData);
                    
                    var key = functionName;
                    if (typeof result == "string")
                        key = result;
                    
                    if (typeof obj[key] == "undefined")
                        obj[key] = [];
                    
                    if (result) {
                        obj[key].push(offer);
                        break;
                    }
                }
            }
            return obj;
        }
    }
}