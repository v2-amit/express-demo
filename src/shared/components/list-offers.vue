<template>
<div>
    <div v-for="key in displayGroupListFunctions">
        <ul v-if="getGroupBy[key]">
        {{key}}
        <br/>
        <li v-for="(offer, key) in getGroupBy[key]">
            offerID => {{offer.offerID}}
        </li>
        </ul>
    </div>
</div>
</template>
<script>
import ExpressOffersGroupby from '../mixin/express-offers-groupby'
import ExpressOffersLoanTerms from '../mixin/express-offers-loan-terms'
    
export default {
    props: {
        groupListFunctions: {
            default: function () {
                return [
                    "terms"
                ];
            }
        },
        displayGroupListFunctions: {
            default: function () {
                    return ["3 Year Term", "3 - 4 Year Term", "4 Year Term", "4 - 5 Year Term", "5 Year Term", "5 - 6 Year Term", "2 Year Term", "2 - 3 Year Term", "1 Year Term", "1 - 2 Year Term", "< 1 Year Term", "6 Year Term", "6 - 7 Year Term", "7 Year Term", "7 - 8 Year Term", "8 Year Term", "8 - 9 Year Term", "9 Year Term", "9 - 10 Year Term", "10 Year Term", "> 10 Year Term"];
                }
        },
        offers: {
            default: null
        },
        loanRequest: {
            default: null
        },
        referrals: {
            default: null
        }
    },
    computed: {
        getGroupBy: function () {
            return this.groupBy(this.loanRequest, this.referrals, this.offers, this.groupListFunctions);
        }
    },
    mixins: [ExpressOffersGroupby, ExpressOffersLoanTerms]
}
</script>