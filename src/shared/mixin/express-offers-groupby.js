
export default {
    methods: {
        groupByAndCreateFilters (loanRequest, referrals, offers, arrayGroupByFunctionsOnOffers, arrayGroupByFunctionsOnReferrals, arrayFilterListFunctions, additionalData) {
            var self = this;
            var groupByObj = {}, filterByObj = {};
            var referralsObj = {}
            for(var i=0;i<referrals.length;++i) {
                referralsObj[referrals[i].trusteeID] = referrals[i];
            }
            
            for(var i=0;i<offers.length;++i) {
                // call function to build groupby
                if (typeof arrayGroupByFunctionsOnOffers == "object" && arrayGroupByFunctionsOnOffers.length > 0)
                    groupByObj = self.groupBy(loanRequest, referralsObj[offers[i].offerAttributes.lenderID], offers[i], arrayGroupByFunctionsOnOffers, additionalData, groupByObj);
                else {
                    if (typeof groupByObj[""] == "undefined")
                        groupByObj[""] = [];
                    groupByObj[""].push(offers[i]);
                }
                    
                // call function to build filters
                if (typeof arrayFilterListFunctions != "undefined" && arrayFilterListFunctions.length > 0) {
                    console.log('calling getFilters')
                    filterByObj = self.getFilters(loanRequest, referralsObj[offers[i].offerAttributes.lenderID], offers[i], arrayFilterListFunctions, additionalData, filterByObj);
                }
            }
            this.setFilters(filterByObj);
            
            return groupByObj;
        },
        groupBy (loanRequest, referral, offer, functions, additionalData, obj) {
            var self = this;
            for(var j=0;j<functions.length;++j) {
                var functionName = functions[j];

                if (typeof self[functionName] == "undefined") {
                    console.log(functionName + " is not defined as part of ", self);
                    return;
                }

                var result = self[functionName](loanRequest, referral, offer, additionalData);

                var key = functionName;
                if (typeof result == "string")
                    key = result;
                
                //ideal type is object {text: "", value: ""}
                if (typeof result == "object" && result.text)
                    key = result.text;

                if (typeof obj[key] == "undefined" && typeof result != "undefined")
                    obj[key] = [];

                if (result) {
                    obj[key].push(offer);
                    break;
                }
            }
            return obj;
        },
        getFilters (loanRequest, referral, offer, functions, additionalData, obj) {
            var self = this;
            for(var j=0;j<functions.length;++j) {
                var functionName = functions[j];

                if (typeof self[functionName] == "undefined") {
                    console.log(functionName + " is not defined as part of ", self);
                    return;
                }

                var result = self[functionName](loanRequest, referral, offer, additionalData);
                var key = functionName;
                if (typeof obj[key] == "undefined" && typeof result != "undefined") {
                    obj[key] = {};
                }
                if (typeof obj[key] == "undefined")
                    obj[key] = {};
                
                if (result && (typeof result == "string" || typeof result == "number")) {
                    obj[key][result] = result;
                }
                else if (result && typeof result == "object" && result.text && result.value) {
                    obj[key][result.text] = result.value;
                }
            }
            return obj;
        },
        setFilters (filterByObj) {
            var self = this;
            for (var filterKey in filterByObj) {
                var filterOptions = []
                for (var option in filterByObj[filterKey]) {
                    filterOptions.push({text: option, value: filterByObj[filterKey][option]})
                }
                self.$set(self.Filters, filterKey, filterOptions)
            }
        }
    }
}