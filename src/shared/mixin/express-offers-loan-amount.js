
export default {
    methods: {
        equalsRequestAmt (offer, loanRequest, referrals, additionalData) {
            if (offer.offerAttributes.loanAmount) {
                return offer.offerAttributes.loanAmount == loanRequest["amountRequested"]
            }
        },
        greaterthanRequestAmt (offer, loanRequest, referrals, additionalData) {
            if (offer.offerAttributes.loanAmount) {
                return offer.offerAttributes.loanAmount > loanRequest["amountRequested"]
            }
        },
        lessthanRequestAmt(offer, loanRequest, referrals, additionalData) {
            if (offer.offerAttributes.loanAmount) {
                return offer.offerAttributes.loanAmount < loanRequest["amountRequested"]
            }
        },
        getAmountRequested(offer, loanRequest, referrals, additionalData) {
            if (offer.offerAttributes.loanAmount) {
                return {text: offer.offerAttributes.loanAmount, value: offer.offerAttributes.loanAmount}
            }
        },
        findLenderDetails(referrals, key, value) {
            if (typeof referrals == "object" && typeof referrals.find) {
                return referrals.find(function(lender){
                    return lender[key] == value
                })
            }
        },
        getLenderList(offer, loanRequest, referrals, additionalData) {
            if (offer.offerAttributes.lenderID) {
                var lender = this.findLenderDetails(referrals, "trusteeID", offer.offerAttributes.lenderID)
                return {text: lender.name, value: offer.offerAttributes.lenderID}
            }
        }
    }
}