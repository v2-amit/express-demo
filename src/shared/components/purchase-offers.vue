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
        <drop-down 
            v-model="Apr" 
            :options="Filters.getAprRequested">
        </drop-down>
        <drop-down 
            v-model="Fees" 
            :options="Filters.getFees">
        </drop-down>
        <drop-down 
            v-model="TermSelector" 
            :options="Filters.getTermSelector">
        </drop-down>
        <div v-for="(offers, key) in getGroupBy">
            <hr/>
            <div v-if="offers.length">
                <div>{{offers.length}} {{key}}</div>
                <hr/>
                <li v-for="(offer, key) in getGroupBy[key]">
                    offerID => {{offer.offerAttributes.monthlyPayment || offer.offerAttributes.repaymentAmount}}
                </li>
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
    import ExpressOffersReferrals from '../mixin/express-offers-referrals'
    import ListOffers from '../components/list-offers.vue'
    import DropDown from '../components/drop-down.vue'
    
    export default {
        computed: {
            getGroupBy: function () {
//                this.Offers = this.Offers.filter(function(offer) {
//                    return offer.offerAttributes.referralID == 52656597
//                })
                return this.groupByAndCreateFilters(this.LoanRequest, this.Referrals, this.Offers, this.GroupByList, [], this.FilterByList);
            }
        },
        data () {
            return {
                Term: "",
                Amount: "",
                Lender: "",
                Apr: "",
                Fees: "",
                TermSelector: "",
                GroupByList: [
                    "getRegularAndSecuredAndShortTermAndPending"
                ],
                FilterByList: [
                    "terms",
                    "getAmountRequested",
                    "getAprRequested",
                    "getFees",
                    "getTermSelector"
                ],
                Filters: {
                }
            }
        },
        components: {
            ListOffers,
            DropDown
        },
        mixins: [ExpressOffers, ExpressOffersGroupby, ExpressOffersLoanAmount, ExpressOffersLoanTerms, ExpressOffersReferrals]
    }
</script>