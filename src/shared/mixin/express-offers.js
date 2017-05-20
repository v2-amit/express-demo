// service
import UniService from '../services/uni'
export default {
    props: {
        qfuid: {
            default: null
        }
    },
    data () {
        return {
            LoanRequest: {},
            Referrals: {},
            Offers: [],
        }
    },
    computed: {
        getLoanRequestData: function () {
            return UniService.getResponse("getloanrequestdata", this.updateLoanRequestData, this.qfuid);
        },
        getReferrals: function () {
            return UniService.getResponse("getreferrals", this.updateReferralsData, this.qfuid);
        },
        getOffers: function () {
            return UniService.getResponse("getoffers", this.updateOffersData, this.qfuid);
        }
    },
    methods: {
        updateLoanRequestData(data) {
            this.LoanRequest = data;
        },
        updateReferralsData(data) {
            this.Referrals = data;
        },
        updateOffersData(data) {
            if (data && typeof data.map == "function") {
                data.map(function(offer){
                    if (offer.offerAttributes.amortizationPeriodTimeUnitLookup == "Years") {
                        offer.offerAttributes.amortizationPeriodInYears = offer.offerAttributes.amortizationPeriod;
                        offer.offerAttributes.amortizationPeriodInMonths = offer.offerAttributes.amortizationPeriod * 12;
                    } else if (offer.offerAttributes.amortizationPeriodTimeUnitLookup == "Months") {
                        offer.offerAttributes.amortizationPeriodInYears = offer.offerAttributes.amortizationPeriod / 12;
                        offer.offerAttributes.amortizationPeriodInMonths = offer.offerAttributes.amortizationPeriod;
                    }
                })
            }
            this.Offers = data;
        }
    }
}