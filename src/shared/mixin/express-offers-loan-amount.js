
export default {
    methods: {
        RequestAmt (loanRequest, referral, offer, additionalData) {
            if (!offer.offerAttributes.loanAmount) 
                return;
            else if (offer.offerAttributes.loanAmount == loanRequest["amountRequested"])
                return "equalsRequestAmt";
            else if (offer.offerAttributes.loanAmount > loanRequest["amountRequested"])
                return "greaterthanRequestAmt";
            else if (offer.offerAttributes.loanAmount < loanRequest["amountRequested"])
                return "lessthanRequestAmt";
        },
        RequestLoanAmt (loanRequest, referral, offer, additionalData) {
            if (!offer.offerAttributes.amortizationPeriodTimeUnitLookup) 
                return;
            return offer.offerAttributes.amortizationPeriodTimeUnitLookup;
        },
        getAmountRequested(loanRequest, referral, offer, additionalData) {
            if (offer.offerAttributes.loanAmount) {
                return {text: offer.offerAttributes.loanAmount, value: offer.offerAttributes.loanAmount}
            }
        },
        getAprRequested(loanRequest, referral, offer, additionalData) {
            if (offer.offerAttributes.apr) {
                return {text: offer.offerAttributes.apr, value: offer.offerAttributes.apr}
            }
        },
        getFees(loanRequest, referral, offer, additionalData) {
            if (offer.offerAttributes.personalTotalFee) {
                return {text: offer.offerAttributes.personalTotalFee, value: offer.offerAttributes.personalTotalFee}
            }
        },
        getTermSelector(loanRequest, referral, offer, additionalData) {
            console.log(offer.offerAttributes.amortizationPeriodTimeUnitLookup);
            if (offer.offerAttributes.amortizationPeriodTimeUnitLookup) {
                return offer.offerAttributes.amortizationPeriodTimeUnitLookup;
            }
        }
    }
}