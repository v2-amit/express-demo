<template>
<div>
    {{firstName}} {{lastName}}
    <br/>
    fullName: {{fullName}}
    <br/>
    Enter full Name: <input v-model="fullName" />
</div>
</template>

<script>
    import LtName from '../shared/components/lt-name.vue'
    export default {
        props: {
          firstName: {
            default: "Mit"
          },
          lastName: {
            default: ""
          }
        },
        data () {
            return {
                fullName: this.firstName + " " + this.lastName
            }
        },
        
    }
</script>