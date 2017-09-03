<template>
    <div id="quiz">
        <a href="#" class="logo">
            <img src="../shared/images/logo.jpg">
        </a>
        <div class="progress-bar" v-if="display!=3">
            <div class="container">
                <div class="fill" :style="{width: getcompleted + '%'}"></div>
            </div>
            <span class="comp-pct">{{ getcompleted }}% Complete</span>
        </div>
        <div  v-if="display==2" class="quiz-content">
            <div class="quiz-title">
                {{ question }}
            </div>
            <div class="quiz-options" :class="{ 'box-options': boxoptions, 'list-options': !boxoptions }">
                <div v-for="(option, index) in options">
                    <div class="checkbox-list" v-if="DisplayThis(3)">
                        <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk3" @click="PushResultAndRunAdditionalStep(index, option, 'chk3')" />
                        <label :for="GetWithoutSpace(index)" class="checkbox-bg"></label>
                        <label :for="GetWithoutSpace(index)" class="checkbox-content">{{ index }}</label>
                    </div>
                    <div class="checkbox-list" v-else-if="DisplayThis(6)">
                        <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk6" @click="PushResultAndRunAdditionalStep(index, option, 'chk6')" />
                        <label :for="GetWithoutSpace(index)" class="checkbox-bg"></label>
                        <label :for="GetWithoutSpace(index)" class="checkbox-content">{{ index }}</label>
                    </div>
                    <div class="checkbox-list" v-else-if="DisplayThis(8)">
                        <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk81" @click="PushResultAndRunAdditionalStep(index, option, 'chk81')" />
                        <label :for="GetWithoutSpace(index)" class="checkbox-bg"></label>
                        <label :for="GetWithoutSpace(index)" class="checkbox-content">{{ index }}</label>
                    </div>
                    <div class="checkbox-list" v-else-if="DisplayThis(9)">
                        <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk82" @click="PushResultAndRunAdditionalStep(index, option, 'chk82')" />
                        <label :for="GetWithoutSpace(index)" class="checkbox-bg"></label>
                        <label :for="GetWithoutSpace(index)" class="checkbox-content">{{ index }}</label>
                    </div>
                    <div class="checkbox-list" v-else-if="DisplayThis(10)">
                        <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk83" @click="PushResultAndRunAdditionalStep(index, option, 'chk83')" />
                        <label :for="GetWithoutSpace(index)" class="checkbox-bg"></label>
                        <label :for="GetWithoutSpace(index)" class="checkbox-content">{{ index }}</label>
                    </div>
                    <div class="free-text-slide" v-else-if="tpltype==='textbox'" >
                        <label>{{ index }}</label>
                        <input type="text" :class="GetRandomColor()" :id="GetWithoutSpace(index)" >
                    </div>

                    <div v-else class="option-box" :class="GetRandomColor()" :id="index" @click="SetNextQuestion(index, option)">
                        <div class="option-title">{{ index }}</div>
                    </div>
                </div>
            </div>
            <div class="free-text-slide">
                <input type="text" v-if="ShowTextBox(3)" v-model="chk3other" />
                <input type="text" v-if="ShowTextBox(6)" v-model="chk6other" />
                <input type="text" v-if="ShowTextBox(10)" v-model="chk10other" />
                <div class="input">
                    <button type="button" class="btn btn-green btn-arrow next" v-if="tpltype==='checkbox' || tpltype==='textbox'" @click="SetNextQuestion(null, tpl)"> Next </button>
                </div>
            </div>
        </div>
        <div v-else-if="display==3">
            <div v-if="!result.message">
                <div class="result-block">
                    <h5>Please review the following notes about the consideration you selected:</h5>

                    <div v-for="(options, questionNum) in outputDisclaimer">
                        <ul>
                            <li v-for="option in options" v-html="qs[questionNum]['o'][option].r"></li>
                        </ul>
                    </div>

                     <div v-if="!isRevocable && factorsLength">
                        <b>Special Note:</b> You listed {{factorsLength}} factor(s) that indicate a basic living trust may be appropriate for your situation.
                    </div>

                    <div v-for="(val, key) in factors">
                        <b>{{key}}</b>
                        <ul>
                            <li v-if="typeof val != 'object'">
                                {{val}}
                            </li>
                            <li v-if="typeof val == 'object'" v-for="(value, valkey) in val" >
                                {{value}}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="footer-btn-section">
                    <h5 v-if="result.contact">Thank you for taking Legacy Check<sup>SM</sup>. The notes below were generated based on your responses. Per your request, someone will be in touch with you shortly.</h5>

                    <h5 v-if="!result.contact">Thank you for taking Legacy Check<sup>SM</sup>. The notes below were generated based on your responses. Please contact us at <a href="tel:(704) 887-4944">(704) 887-4944</a> or <a href="mailto:info@starrettlawfirm.com">info@starrettlawfirm.com</a> if you wish to discuss.</h5>

                    <button type="button" class="btn btn-green btn-sm">Save results as PDF</button>
                    <button type="button" class="btn btn-green btn-sm">Email results</button>

                    <h5>
                        Tell Others!  If you found Legacy Check<sup>SM</sup> helpful, please tell others to visit <a href="http://mylegacycheck.com">MyLegacyCheck.com</a>
                    </h5>
                </div>

                <div class="disclaimer-content text-center">
                    <b>Disclaimer:</b> Our firm provides Legacy Check<sup>SM</sup> for general guidance and educational purposes only. Information found herein may not reflect the most current legal developments. Contact a licensed attorney in your state for specific and up-to-date legal advice.
                </div>
            </div>

            <h5>{{ result.message }}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
        },
        methods: {
            size(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            },
            GetWithoutSpace(index) {
                return index.replace(/ +/g, "");  
            },
            DisplayThis(curr) {
                return this.tpltype==='checkbox' && this.currentQuestion === curr
            },
            ShowTextBox(curr) {
                return this.showAdditionalTextBox == true && this.currentQuestion === curr
            },
            SetNextQuestion(index, option) {
                if (index)
                    this.PushResultAndRunAdditionalStep(index, option);
                
                this.showAdditionalTextBox = false;
                if (option.n == -1) {
                    this.display = 3;
                    
                    this.result.message = option.m;
                    
                    if (typeof this.result.contact == "undefined")
                        this.result.contact = false;
                    this.result.contact = option.contact || this.result.contact;
                } else {
                    this.currentQuestion = option.n || this.currentQuestion;
                }
            },
            PushResultAndRunAdditionalStep(index, option, model) {
                if (this.tpltype === "checkbox") {
                    if (typeof this.result.answers[this.currentQuestion] == "undefined")
                        this.result.answers[this.currentQuestion] = [];
                    if (option["additionalstep"])
                        this.showAdditionalTextBox = true;
                    
                    this.result.answers[this.currentQuestion] = this[model];
                
                } else {
                    this.result.answers[this.currentQuestion] = index;
                }
                if (option.s)
                    this.factors[this.qs[this.currentQuestion].q] = this.result.answers[this.currentQuestion];
                
                if (option.r)
                    this.outputDisclaimer[this.currentQuestion] = this.result.answers[this.currentQuestion]
            },
            GetRandomColor() {
                var arrAvailableColor = [
                    "color-blue",
                    "color-pink",
                    "color-green",
                    "color-orange",
                    "color-purple",
                    "color-red",
                    "color-teal",
                    "color-yellow",
                ]
                return arrAvailableColor[Math.floor((Math.random() * 7))];
            },
        },
        computed: {
            boxoptions: function() {
                return this.tpltype != 'checkbox';
            },
            question: function () {
                return this.qs[this.currentQuestion] ? this.qs[this.currentQuestion]["q"] : -1;
            },
            options: function () {
                return this.qs[this.currentQuestion]["o"];
            },
            tpl: function () {
                return this.qs[this.currentQuestion]["tpl"] ? this.qs[this.currentQuestion]["tpl"] : {};
            },
            tpltype: function () {
                return this.qs[this.currentQuestion]["tpl"] ? this.qs[this.currentQuestion]["tpl"]["type"] : "button";
            },
            getcompleted: function () {
                return Math.round((this.currentQuestion / 13) * 100);
            },
            isRevocable: function () {
                return !!this.chk3.filter(function(option){
                    return option == "Revocable Trust"
                }).length
            },
            factorsLength: function () {
                return this.size(this.factors);
            }
        },
        data () {
            return {
                outputDisclaimer: {},
                factors: {},
                display: 2,
                currentQuestion: 1,
                showAdditionalTextBox: false,
                result: {
                    message: "Final output pending to be generated",
                    answers: {}
                },
                chk3other: "",
                chk6other: "",
                chk10other: "",
                chk3: [],
                chk6: [],
                chk81: [],
                chk82: [],
                chk83: [],
                qs: {
                    1: {
                        q: "Do you have a written estate plan?",
                        o: {
                            "Yes": {
                                n: 3
                            },
                            "No": {
                                n: 2
                            },
                        },
                        ans: [],
                    },
                    2: {
                        q: "How prepared would you be if you lost capacity or died?",
                        o: {
                            "Very prepared": {
                                n: -1,
                                m: "Thank you for taking Legacy Check<sup>SM</sup>. Let us know if you ever want to discuss the benefits of a written estate plan"
                            },
                            "Somewhat prepared": {
                                n: 7
                            },
                            "Not at all prepared": {
                                n: 7
                            },
                            "Unsure": {
                                n: 7
                            },
                        },
                        ans: [],
                    },
                    3: {
                        q: "Which of the following documents are part of your existing estate plan? (click all that apply)",
                        o: {
                            "Will": {
                            },
                            "Revocable Trust": {
                            },
                            "Irrevocable Trust": {
                            },
                            "General Power of Attorney": {
                            },
                            "Health Care Power of Attorney": {
                            },
                            "Living Will (covering end-of-life wishes)": {
                            },
                            "HIPAA Waiver": {
                            },
                            "Other": {
                                additionalstep: "textbox",
                                userinput: ""
                            },
                        },
                        tpl: {
                           type: "checkbox",
                           n: 4
                        },
                        ans: [],
                    },
                    4: {
                        q: "When did you complete or last update your estate plan?",
                        o: {
                            "Within the past year": {
                                n: 5
                            },
                            "Between 1 and 3 years ago": {
                                n: 5
                            },
                            "More than 3 years ago": {
                                n: 5
                            },
                        },
                        ans: [],
                    },
                    5: {
                        q: "Does your existing estate plan fulfill your current objectives and/or wishes?",
                        o: {
                            "Yes": {
                                n: -1,
                                m: "Thank you for taking Legacy Check<sup>SM</sup>. Let us know if you ever want to discuss your estate plan further."
                            },
                            "No": {
                                n: 6
                            },
                            "Unsure": {
                                n: 6
                            },
                        },
                        ans: [],
                    },
                    6: {
                        q: "Have you experienced any of the following changes recently? (click all that apply)",
                        o: {
                            "Personal or family (e.g. baby, marriage, death, separation, divorce)": {
                            },
                            "Beneficiary-related (e.g. death, poor health, money problems, divorce)": {
                            },
                            "Property (e.g. asset increase, new business, new life insurance)": {
                            },
                            "Employment (e.g. new job, promotion, retirement)": {
                            },
                            "Health (e.g. injury, diagnosis)": {
                            },
                            "Other (e.g. new NC residency, new wishes)": {
                                additionalstep: "textbox",
                                userinput: ""
                            },
                        },
                        tpl: {
                           type: "checkbox",
                           n: 7
                        },
                        ans: [],
                    },
                    7: {
                        q: "Are you married?",
                        o: {
                            "Yes": {
                                n: 8
                            },
                            "No": {
                                n: 8,
                                s: 1,
                            },
                        },
                        ans: [],
                    },
                    8: {
                        q: "Which considerations interest and/or apply to you?  (click all that apply)",
                        o: {
                            "Minor children": {
                                r: "<label>Minor children:</label> Naming a guardian who will raise a minor child if mom and dad die is one of the most important arrangements any parent can make."
                            },
                            "Probate avoidance": {
                                r: "<label>Probate avoidance:</label> Reducing the amount of estate property that must be probated results in a more efficient transfer of property to beneficiaries at death.",
                                s: 1,
                            },
                            "Incapacity planning": {
                                r: "<label>Incapacity planning:</label> Protecting the ability to control financial, health care, and other personal decisions if capacity is lost avoids the need for adult guardianship in many cases.",
                                s: 1,
                            },
                            "New NC residency": {
                                r: "<label>New NC residency:</label> Updating out-of-state papers for NC law after moving to NC reduces the risk of unintended consequences due to differing state laws."
                            },
                            "Routine maintenance": {
                                r: "<label>Routine maintenance:</label> Making periodic updates to an estate plan ensures it reflects current wishes, laws, and best practices."
                            },
                            "Privacy over estate details": {
                                r: "<label>Privacy over estate details:</label> Planning that minimizes the amount of estate property subject to probate also reduces the amount of information entered into public record.",
                                s: 1,
                            },
                            "End-of-life wishes": {
                                r: "<label>End-of-life wishes:</label> Expressing preferences about extraordinary measures in end-of-life scenarios makes tough, emotional choices known to loved ones."
                            },
                        },
                        tpl: {
                           type: "checkbox",
                           n: 9,
                           results: true,
                        },
                        ans: [],
                    },
                    9: {
                        q: "Which considerations interest and/or apply to you?  (click all that apply)",
                        o: {
                            "High-value property": {
                                r: "<label>High-value property:</label> Coordinating tax, probate, legacy and other considerations of high-value property optimizes planning and protection for such property.",
                                s: 1,
                            },
                            "Non-NC real estate": {
                                r: "<label>Non-NC real estate:</label> Planning properly for out-of-state real estate avoids the need for an ancillary probate proceeding in the other state at death.",
                                s: 1,
                            },
                            "Pet care": {
                                r: "<label>Pet care:</label> Naming a caregiver for pets ensures their well-being and a smooth transition to a new home if the owner loses capacity or dies."
                            },
                            "Marital status change": {
                                r: "<label>Marital status change:</label> Updating documents to either include a new spouse or omit an ex- (or soon-to-be ex-) spouse eliminates the risk of current wishes going unfulfilled."
                            },
                            "Blended family": {
                                r: "<label>Blended family:</label> Providing for children from a previous marriage protects them from being disinherited, intentionally or unintentionally, after the parent dies.",
                                s: 1,
                            },
                            "Asset protection": {
                                r: "<label>Asset protection:</label> Anticipating and evaluating risk exposure during planning better insulates assets from potential liabilities."
                            },
                            "Potential will contest": {
                                r: "<label>Potential will contest:</label> Implementing measures that reduce the risk of future controversy over estate details sidesteps court involvement and maintains family harmony.",
                                s: 1,
                            },
                        },
                        tpl: {
                           type: "checkbox",
                           n: 10,
                           results: true,
                        },
                        ans: [],
                    },
                    10: {
                        q: "Which considerations interest and/or apply to you?  (click all that apply)",
                        o: {
                            "Special needs beneficiary": {
                                r: "<label>Special needs beneficiary:</label> Planning properly for a beneficiary with special needs supplements care without jeopardizing or eliminating eligibility for government benefits."
                            },
                            "Closely held business": {
                                r: "<label>Closely held business:</label> Planning for the succession of a closely held business increases the likelihood of a successful transition to future ownership.",
                                s: 1,
                            },
                            "Tax minimization": {
                                r: "<label>Tax minimization:</label> Incorporating provisions that minimize tax obligations preserves greater wealth to pass along to loved ones."
                            },
                            "Long-term care": {
                                r: "<label>Long-term care:</label> Accounting for longer life expectancies and increasing health care costs in estate planning protects one's well-being and legacy in the golden years."
                            },
                            "Charitable giving": {
                                r: "<label>Charitable giving:</label> Including charitable gifts in an estate plan supports the work of countless wonderful organizations that aim to improve lives and communities."
                            },
                            "Unique asset(s)": {
                                r: "<label>Unique asset(s):</label> Incorporating special assets in an estate plan safeguards their unique value and meaningfulness.",
                                s: 1,
                            },
                            "Other": {
                                additionalstep: "textbox",
                                userinput: ""
                            },
                        },
                        tpl: {
                           type: "checkbox",
                           n: 11,
                           results: true,
                        },
                        ans: [],
                    },
                    11: {
                        q: "Would you like us to contact you about your results?",
                        o: {
                            "Yes": {
                                n: 12
                            },
                            "No": {
                                n: 13
                            },
                        },
                        ans: [],
                    },
                    12: {
                        q: "Please fill contact information",
                        o: {
                            "Name *": {
                            },
                            "Cell Phone *": {
                            },
                            "Email *": {
                            },
                            "Zip Code *": {
                            },
                        },
                        tpl: {
                           type: "textbox",
                           n: -1,
                           contact: true
                        },
                        ans: [],
                    },
                    13: {
                        q: "",
                        o: {
                            "Zipcode (optional)": {
                            },
                        },
                        tpl: {
                           type: "textbox",
                           n: -1,
                           contact: false
                        },
                        ans: [],
                    },
                }
            }
        }
    }
</script>
<style src="../shared/css/common.scss" lang="sass"></style>