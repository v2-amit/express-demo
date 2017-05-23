<template>

    <div>
        <drop-down 
            v-model="Term" 
            :options="Filters.terms">
        </drop-down>
        <drop-down 
            v-model="Amount" 
            :options="Filters.getAmountRequested">
        </drop-down>
        <drop-down 
            v-model="Lender" 
            :options="Filters.getLenderList">
        </drop-down>
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
    import ExpressOffersLoanTerms from '../mixin/express-offers-loan-terms'
    import ListOffers from '../components/list-offers.vue'
    import DropDown from '../components/drop-down.vue'
    
    export default {
        computed: {
            getGroupBy: function () {
                return this.groupByAndCreateFilters(this.LoanRequest, this.Referrals, this.Offers, this.GroupByList, this.FilterByList);
            }
        },
        data () {
            return {
                Term: "",
                Amount: "",
                Lender: "",
                GroupByList: [
                    "equalsRequestAmt",
                    "lessthanRequestAmt",
                    "greaterthanRequestAmt"
                ],
                FilterByList: [
                    "terms",
                    "getAmountRequested",
                    "getLenderList"
                ],
                Filters: {
                    terms: [],
                    getAmountRequested: [],
                    getLenderList: []
                }
            }
        },
        components: {
            ListOffers,
            DropDown
        },
        mixins: [ExpressOffers, ExpressOffersGroupby, ExpressOffersLoanAmount, ExpressOffersLoanTerms]
    }
</script>