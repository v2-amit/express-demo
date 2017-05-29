<!-- template for the modal component -->
<template>
    <div>
        <input v-model="Name" >
        <br/>
        hello {{Name}}
    
    </div>
    
</template>
<script>
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
                Name: this.firstName + " " + this.lastName
            }
        }
    }
</script>
<style scoped lang="sass">
</style>