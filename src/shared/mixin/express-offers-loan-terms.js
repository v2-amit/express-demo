export default {
    methods: {
        terms (loanRequest, referral, offer, additionalData) {
            var mo = offer.offerAttributes.amortizationPeriodInMonths;
            if (mo > 120) {
                return "> 10 Year Term";
            }else if (mo % 12 == 0) {
                return Math.round(mo / 12) + " Year Term";
            }else if (mo > 2 && mo < 12) {
                return "< 1 Year Term";
            }else if(mo > 12 && mo < 24){
                return "1 - 2 Year Term";
            }else if(mo > 24 && mo < 36){
                return "2 - 3 Year Term";
            }else if(mo > 36 && mo < 48){
                return "3 - 4 Year Term";
            }else if(mo > 48 && mo < 60){
                return "4 - 5 Year Term";
            }else if(mo > 60 && mo < 72){
                return "5 - 6 Year Term";
            }else if(mo > 72 && mo < 84){
                return "6 - 7 Year Term";
            }else if(mo > 84 && mo < 96){
                return "7 - 8 Year Term";
            }else if(mo > 96 && mo < 108){
                return "8 - 9 Year Term";
            }else if(mo > 108 && mo < 120){
                return "9 - 10 Year Term";
            }
        }
    }
}