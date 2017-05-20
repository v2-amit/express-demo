<template>

    <div>
        
        <div v-for="(offers, key) in getGroupBy">
            <hr/>
            <div v-if="offers.length">
                <div>{{offers.length}} {{key}}</div>
                <hr/>
                <list-offers :offers="offers" :loan-request="LoanRequest" :referrals="Referrals"></list-offers>
            </div>
        </div>
        <hr/><hr/>
        {{getLoanRequestData}}
        {{getReferrals}}
        {{getOffers}}
    </div>
</template>
<script>
    import ExpressOffers from '../mixin/express-offers'
    import ExpressOffersGroupby from '../mixin/express-offers-groupby'
    import ExpressOffersLoanAmount from '../mixin/express-offers-loan-amount'
    import ListOffers from '../components/list-offers.vue'
    
    export default {
        computed: {
            getGroupBy: function () {
                return this.groupBy(this.LoanRequest, this.Referrals, this.Offers, this.GroupByList);
            }
        },
        data () {
            return {
                GroupByList: [
                    "equalsRequestAmt",
                    "lessthanRequestAmt",
                    "greaterthanRequestAmt"
                ]
            }
        },
        components: {
            ListOffers
        },
        mixins: [ExpressOffers, ExpressOffersGroupby, ExpressOffersLoanAmount]
    }
</script>