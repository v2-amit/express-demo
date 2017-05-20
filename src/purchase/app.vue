<template>
<div>
  <purchase-offers :qfuid="qfuid"></purchase-offers>


</div>
</template>

<script>
  import PurchaseOffers from '../shared/components/purchase-offers.vue'
    export default {
        props: {
          qfuid: {
            default: null
          }
        },
        components: {PurchaseOffers}
    }
</script>