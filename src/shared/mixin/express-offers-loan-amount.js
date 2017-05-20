
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
        }
    }
}