
export default {
    methods: {
        findLenderDetails(referrals, key, value) {
            if (typeof referrals == "object" && typeof referrals.find) {
                return referrals.find(function(lender){
                    return lender[key] == value
                })
            }
        },
        getLenderList(offer, loanRequest, referrals, additionalData) {
            console.log(offer.offerAttributes);
            if (offer.offerAttributes.lenderID) {
                var lender = this.findLenderDetails(referrals, "trusteeID", offer.offerAttributes.lenderID)
                return {text: lender.name, value: offer.offerAttributes.lenderID}
            }
        }
    }
}