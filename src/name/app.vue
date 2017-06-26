<template>
<div>
    <div :class="randomColor"></div>
    {{randomColor}}
</div>
</template>

<script>
    import LtName from '../shared/components/lt-name.vue'
    export default {
        props: {
        },
        data () {
            return {
                fullName: this.firstName + " " + this.lastName
            }
        },
        methods: {
            even: function(nos) {
                return nos.filter(function(n) {
                  return n % 2 == 0  
                })
            }
        },
        computed: {
            randomColor: function() {
                var color = ["blue", "red", "black"];
                var colortest = ["purple", "pink", "gray"];
                
                return color[Math.floor(Math.random() * 3)]
            }
        }
        
    }
</script>
<style>
div {
    background-color: lightgrey;
    width: 300px;
    height: 300px;
}

.blue {
    background-color: blue;
}

.purple {
    background-color: purple;
}

.red {
    background-color: red;
}

.pink {
    background-color: pink;
}

.black {
    background-color: black;
}

.gray {
    background-color: gray;
}
</style>