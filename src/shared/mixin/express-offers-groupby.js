
export default {
    methods: {
        groupByAndCreateFilters (loanRequest, referrals, offers, arrayGroupByFunctions, arrayFilterListFunctions, additionalData) {
            var self = this;
            var groupByObj = {}, filterByObj = {};
            
            for(var i=0;i<offers.length;++i) {
                // call function to build groupby
                if (typeof arrayGroupByFunctions == "object" && arrayGroupByFunctions.length > 0)
                    groupByObj = self.groupBy(loanRequest, referrals, offers[i], arrayGroupByFunctions, additionalData, groupByObj);
                
                // call function to build filters
                if (typeof arrayFilterListFunctions != "undefined" && arrayFilterListFunctions.length > 0) {
                    filterByObj = self.filterBy(loanRequest, referrals, offers[i], arrayFilterListFunctions, additionalData, filterByObj);
                }
            }
            this.setFilters(filterByObj);
            
            return groupByObj;
        },
        groupBy (loanRequest, referrals, offer, functions, additionalData, obj) {
            var self = this;
            for(var j=0;j<functions.length;++j) {
                var functionName = functions[j];

                if (typeof self[functionName] == "undefined") {
                    console.log(functionName + " is not defined as part of ", self);
                    return;
                }

                var result = self[functionName](offer, loanRequest, referrals, additionalData);

                var key = functionName;
                if (typeof result == "string")
                    key = result;

                if (typeof obj[key] == "undefined" && typeof result != "undefined")
                    obj[key] = [];

                if (result) {
                    obj[key].push(offer);
                    break;
                }
            }
            return obj;
        },
        filterBy (loanRequest, referrals, offer, functions, additionalData, obj) {
            var self = this;
            for(var j=0;j<functions.length;++j) {
                var functionName = functions[j];

                if (typeof self[functionName] == "undefined") {
                    console.log(functionName + " is not defined as part of ", self);
                    return;
                }

                var result = self[functionName](offer, loanRequest, referrals, additionalData);
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
                self.Filters[filterKey] = filterOptions
            }
        }
    }
}