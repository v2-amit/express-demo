<template>
<div>
    {{firstName}} {{lastName}}
</div>
</template>

<script>
    import LtName from '../shared/components/lt-name.vue'
    export default {
        props: {
          firstName: {
            default: ""
          },
          lastName: {
            default: ""
          }
        },
        data () {
            return {
            }
        }
    }
</script>