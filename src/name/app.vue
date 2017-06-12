<template>
<div>
    {{firstName}} {{lastName}}
    <br/>
    fullName: {{fullName}}
    <br/>
    Enter full Name: <input v-model="fullName" />
    <div>
        <h3>Array Loop</h3>
    <div v-for="(val, key) in arr">key => {{key}} val => {{val}}</div>
    </div>
    <div>
        <h3>Computed concatenated string</h3>
        <div>{{concatArr}}</div>
    </div>
    <div>
        <h3>Conditions</h3>
        <div v-for="(val, key) in myObj">
            <span v-if="key=='B'">key => {{key}} val => {{val}}</span>
            <span v-else-if="key=='A'">ELSE IF key => {{key}} val => {{val}}</span>
            <span else>ELSE key => {{key}} val => {{val}}</span>
        </div>
    </div>
    <div>
        <h3>Display even number using method and loop</h3> {{even(arrNum)}}
        <div v-for="(val, key) in even(arrNum)">key => {{key}} val => {{val}}</div>
    </div>
    
    <div>
        <h3>Object Loop</h3>
        <div v-for="(val, key) in myObj"><a href="#" @click.prevent="showAlert(key)" :id="key.toLowerCase()">click me: key => {{key}} val => {{val}}</a></div>
    </div>
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
          },
          num: {
              default() {
                    return [1, 2, 3, 4, 5, 6, 7]
                }
          }
        },
        data () {
            return {
                fullName: this.firstName + " " + this.lastName,
                arr: ['a', 'b', 'c'],
                arrNum: this.num.split(","),
                myObj: {A: 'a', B: 'b', C: 'c', D: 'd'}
            }
        },
        methods: {
            even: function(nos) {
                return nos.filter(function(n) {
                  return n % 2 == 0  
                })
            },
            showAlert: function (val) {
                window.alert(val);
            }
        },
        computed: {
            concatArr: function() {
                return this.arr.join();
            }
        }
        
    }
</script>