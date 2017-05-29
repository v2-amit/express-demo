<template>
<div>
    <lt-name :first-name="firstName" :last-name="LastName"></lt-name>
</div>
</template>

<script>
    import LtName from '../shared/components/lt-name.vue'
    export default {
        props: {
          firstName: {
            default: "Test"
          }
        },
        data () {
            return {
                LastName: "Gandhi"
            }
        },
        components: {LtName}
    }
</script>