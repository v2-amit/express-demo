<template>
<div>
    <div class="progress-bar" v-if="display!=3">
        <div class="container">
            <div class="fill" :style="{width: getcompleted + '%'}"></div>
        </div>
        <span class="comp-pct">{{ getcompleted }}% Complete</span>
    </div>
    <div  v-if="display==2" class="quiz-content">
        <div class="slide simple-select-slide custom-slide">
        <div class="header-lines">
            <div class="header-container">
                <h1>{{ question }}</h1>
            </div>
        </div>
        <div class="options
            options-8
            stack-horizontal
            titles-long">
            <span v-for="(option, index) in options">
                <div class="details text-left" v-if="DisplayThis(3)">
                    <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk3" @click="PushResultAndRunAdditionalStep(index, option, 'chk3')" />{{ index }}
                </div>
                <div class="details text-left" v-else-if="DisplayThis(6)">
                    <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk6" @click="PushResultAndRunAdditionalStep(index, option, 'chk6')" />{{ index }}
                </div>
                <div class="details text-left" v-else-if="DisplayThis(8)">
                    <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk81" @click="PushResultAndRunAdditionalStep(index, option, 'chk81')" />{{ index }}
                </div>
                <div class="details text-left" v-else-if="DisplayThis(9)">
                    <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk82" @click="PushResultAndRunAdditionalStep(index, option, 'chk82')" />{{ index }}
                </div>
                <div class="details text-left" v-else-if="DisplayThis(10)">
                    <input type="checkbox" :id="GetWithoutSpace(index)" :value="index" :name="GetWithoutSpace(index)" v-model="chk83" @click="PushResultAndRunAdditionalStep(index, option, 'chk83')" />{{ index }}
                </div>
                <div class="free-text-slide" v-else-if="tpltype==='textbox'" >
                {{ index }} <input :class="GetRandomColor()" :id="GetWithoutSpace(index)" >
                </div>
            <div v-else class="auto-next option-box" :class="GetRandomColor()" :id="index" @click="SetNextQuestion(index, option)"><div class="option-title">{{ index }}</div></div>
            </span>
            <br/>
            <div class="free-text-slide"><input type="textbox" v-if="ShowTextBox(3)" v-model="chk3other" />
            <input type="textbox" v-if="ShowTextBox(6)" v-model="chk6other" />
            <input type="textbox" v-if="ShowTextBox(10)" v-model="chk10other" />
            <div class="input">
            <button class="next" v-if="tpltype==='checkbox' || tpltype==='textbox'" @click="SetNextQuestion(null, tpl)"> Next </button>
            </div>
            </div>
            </div>

        
    </div>
        </div>
    <div v-else-if="display==3">
        {{ result.message }}
        <div class="contact" v-if="result.contact">Thank you for taking Legacy Check<span class="superscript">SM</span>. The notes below were generated based on your responses. Per your request, someone will be in touch with you shortly.</div>
      <div class="contact" v-if="!result.contact">Thank you for taking Legacy Check<span class="superscript">SM</span>. The notes below were generated based on your responses. Please contact us at (704) 887-4944 or info@starrettlawfirm.com if you wish to discuss.</div>
      <div v-if="!result.message">
          <div v-for="(options, questionNum) in outputDisclaimer">
              <div v-for="option in options">
                {{qs[questionNum]["o"][option].r}}
              </div>
              <div v-if="!isRevocable && factorsLength">
                  Special Note: You listed {{factorsLength}} factor(s) that indicate a basic living trust may be appropriate for your situation.
                  <div v-for="(val, key) in factors">
                      {{key}} => {{val}}
                  </div>
              </div>
              
          </div>
          Disclaimer: Our firm provides Legacy Check<span class="superscript">SM</span> for general guidance and educational purposes only. Information found herein may not reflect the most current legal developments. Contact a licensed attorney in your state for specific and up-to-date legal advice.
              
              <button>Save results as PDF</button>
              <button>Email results</button>
              Tell Others!  If you found Legacy Check<span class="superscript">SM</span> helpful, please tell others to visit <a href="http://mylegacycheck.com">MyLegacyCheck.com</a>
      </div>
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
                    "color-brown",
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
                                m: "Thank you for taking Legacy Check<<<SM superscript>>>. Let us know if you ever want to discuss the benefits of a written estate plan"
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
                                m: "Thank you for taking Legacy Check<<<SM superscript>>>. Let us know if you ever want to discuss your estate plan further."
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
                                r: "Minor children: Naming a guardian who will raise a minor child if mom and dad die is one of the most important arrangements any parent can make."
                            },
                            "Probate avoidance": {
                                r: "Probate avoidance: Reducing the amount of estate property that must be probated results in a more efficient transfer of property to beneficiaries at death.",
                                s: 1,
                            },
                            "Incapacity planning": {
                                r: "Incapacity planning: Protecting the ability to control financial, health care, and other personal decisions if capacity is lost avoids the need for adult guardianship in many cases.",
                                s: 1,
                            },
                            "New NC residency": {
                                r: "New NC residency: Updating out-of-state papers for NC law after moving to NC reduces the risk of unintended consequences due to differing state laws."
                            },
                            "Routine maintenance": {
                                r: "Routine maintenance: Making periodic updates to an estate plan ensures it reflects current wishes, laws, and best practices."
                            },
                            "Privacy over estate details": {
                                r: "Privacy over estate details: Planning that minimizes the amount of estate property subject to probate also reduces the amount of information entered into public record.",
                                s: 1,
                            },
                            "End-of-life wishes": {
                                r: "End-of-life wishes: Expressing preferences about extraordinary measures in end-of-life scenarios makes tough, emotional choices known to loved ones."
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
                                r: "High-value property: Coordinating tax, probate, legacy and other considerations of high-value property optimizes planning and protection for such property.",
                                s: 1,
                            },
                            "Non-NC real estate": {
                                r: "Non-NC real estate: Planning properly for out-of-state real estate avoids the need for an ancillary probate proceeding in the other state at death.",
                                s: 1,
                            },
                            "Pet care": {
                                r: "Pet care: Naming a caregiver for pets ensures their well-being and a smooth transition to a new home if the owner loses capacity or dies."
                            },
                            "Marital status change": {
                                r: "Marital status change: Updating documents to either include a new spouse or omit an ex- (or soon-to-be ex-) spouse eliminates the risk of current wishes going unfulfilled."
                            },
                            "Blended family": {
                                r: "Blended family: Providing for children from a previous marriage protects them from being disinherited, intentionally or unintentionally, after the parent dies.",
                                s: 1,
                            },
                            "Asset protection": {
                                r: "Asset protection: Anticipating and evaluating risk exposure during planning better insulates assets from potential liabilities."
                            },
                            "Potential will contest": {
                                r: "Potential will contest: Implementing measures that reduce the risk of future controversy over estate details sidesteps court involvement and maintains family harmony.",
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
                                r: "Special needs beneficiary: Planning properly for a beneficiary with special needs supplements care without jeopardizing or eliminating eligibility for government benefits."
                            },
                            "Closely held business": {
                                r: "Closely held business: Planning for the succession of a closely held business increases the likelihood of a successful transition to future ownership.",
                                s: 1,
                            },
                            "Tax minimization": {
                                r: "Tax minimization: Incorporating provisions that minimize tax obligations preserves greater wealth to pass along to loved ones."
                            },
                            "Long-term care": {
                                r: "Long-term care: Accounting for longer life expectancies and increasing health care costs in estate planning protects one's well-being and legacy in the golden years."
                            },
                            "Charitable giving": {
                                r: "Charitable giving: Including charitable gifts in an estate plan supports the work of countless wonderful organizations that aim to improve lives and communities."
                            },
                            "Unique asset(s)": {
                                r: "Unique asset(s): Incorporating special assets in an estate plan safeguards their unique value and meaningfulness.",
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
<style scoped lang="sass">
    .progress-bar {
  display: flex;
  justify-content: space-between;
  margin: 1rem auto;
  width: 34rem; }
  @media (max-width: 767px) {
    .progress-bar {
      padding: 0 1rem;
      width: 100%; } }
  .progress-bar .container {
    background: #EDEDED;
    display: inline-block;
    height: 0.4rem;
    width: 27.4rem; }
    @media (max-width: 767px) {
      .progress-bar .container {
        flex: 1; } }
    .progress-bar .container .fill {
      background: #54A5D9;
      height: 100%;
      transition: width 0.4s;
      width: 0; }
  .progress-bar .comp-pct {
    display: inline-block;
    font-size: 0.95rem;
    line-height: 0.4rem;
    margin-top: 0.05rem; }
    @media (max-width: 767px) {
      .progress-bar .comp-pct {
        margin-left: 1rem; } }

    .quiz-content {
  margin: 0px auto;
  width: 850px; }
  @media (max-width: 979px) {
    .quiz-content {
      width: auto; } }
  .quiz-content .dropdown-slide select {
    display: inline-block;
    height: 40px;
    line-height: 30px;
    border: 1px solid #aaa;
    padding: 10px;
    color: #555;
    font-size: 28px;
    width: 100%; }
  .quiz-content .dropdown-slide button {
    margin-top: 10px;
    font-size: 36px; }
  .quiz-content .free-text-slide input {
    display: block;
    font-size: 34px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin: 20px auto;
    padding: 5px;
    width: 600px; }
    @media (max-width: 979px) {
      .quiz-content .free-text-slide input {
        width: 480px; } }
    .quiz-content .free-text-slide input[type=number]::-webkit-outer-spin-button, .quiz-content .free-text-slide input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0; }
    .quiz-content .free-text-slide input[type=number] {
      -moz-appearance: textfield; }
  .quiz-content .free-text-slide button {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 36px; }
  .quiz-content .progression {
    width: 380px;
    height: 30px;
    margin: 5px auto 20px auto;
    position: relative; }
    .quiz-content .progression h5 {
      display: inline-block;
      margin: 10px; }
    .quiz-content .progression .meter {
      display: inline-block;
      position: absolute;
      top: 3px;
      right: 0px;
      width: 250px;
      height: 25px;
      border-radius: 10px;
      border: 2px solid; }
      .quiz-content .progression .meter .meter-fill {
        left: 0px;
        width: 0px;
        height: 22px;
        border-radius: 7px; }
  .quiz-content .slide {
    margin: 0px auto 60px auto;
    text-align: center;
    vertical-align: middle; }
    .quiz-content .slide h1 {
      display: block;
      margin: auto;
      width: 635px;
      font-weight: 700;
      font-size: 40px; }
      @media (max-width: 979px) {
        .quiz-content .slide h1 {
          font-size: 36px; } }
    .quiz-content .slide h2 {
      font-size: 24px; }
      @media (max-width: 979px) {
        .quiz-content .slide h2 {
          font-size: 20px; } }
    .quiz-content .slide h3 {
      margin: 10px;
      font-size: 14px;
      font-weight: 700; }
    .quiz-content .slide h4 {
      font-weight: 700; }
    .quiz-content .slide h5 {
      font-weight: 700;
      color: #3073ab;
      font-size: 18px; }
      @media (max-width: 979px) {
        .quiz-content .slide h5 {
          font-size: 20px; } }
    .quiz-content .slide p {
      color: #949494; }
  .quiz-content .simple-select-slide .option-title {
    font-size: 19px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .option-title {
        font-size: 24px; } }
  .quiz-content .simple-select-slide p {
    font-size: 16px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide p {
        font-size: 18px; } }
  .quiz-content .simple-select-slide.box-rectangle.flow-block .option-box {
    width: 600px;
    padding: 15px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide.box-rectangle.flow-block .option-box {
        width: 500px; } }
  .quiz-content .simple-select-slide.box-rectangle.flow-inline .option-box {
    width: 300px;
    padding: 20px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide.box-rectangle.flow-inline .option-box {
        width: 280px; } }
  .quiz-content .simple-select-slide.box-large-square .option-box {
    vertical-align: top;
    width: 199px;
    height: 140px;
    padding: 10px; }
    .quiz-content .simple-select-slide.box-large-square .option-box .img {
      height: 100px; }
    .quiz-content .simple-select-slide.box-large-square .option-box .fa {
      font-size: 100px; }
    .quiz-content .simple-select-slide.box-large-square .option-box p {
      margin-top: 20px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide.box-large-square .option-box {
        width: 280px;
        height: 110px;
        padding: 10px 0; }
        .quiz-content .simple-select-slide.box-large-square .option-box .img {
          height: 60px; }
        .quiz-content .simple-select-slide.box-large-square .option-box .fa {
          font-size: 60px; }
        .quiz-content .simple-select-slide.box-large-square .option-box p {
          margin-top: 10px; } }
  .quiz-content .simple-select-slide.box-small-square .option-box {
    vertical-align: top;
    width: 90px;
    height: 90px;
    padding: 10px; }
    .quiz-content .simple-select-slide.box-small-square .option-box .img {
      height: 40px;
      bottom: 15px; }
    .quiz-content .simple-select-slide.box-small-square .option-box .fa {
      font-size: 40px;
      bottom: 15px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide.box-small-square .option-box {
        width: 85px; } }
  .quiz-content .simple-select-slide.box-square .option-box {
    vertical-align: top;
    width: 180px;
    height: 160px; }
    .quiz-content .simple-select-slide.box-square .option-box .img {
      height: 90px; }
    .quiz-content .simple-select-slide.box-square .option-box .fa {
      font-size: 90px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide.box-square .option-box {
        width: 280px;
        height: 110px;
        padding: 10px 0; }
        .quiz-content .simple-select-slide.box-square .option-box .img {
          height: 60px; }
        .quiz-content .simple-select-slide.box-square .option-box .fa {
          font-size: 60px; } }
  .quiz-content .simple-select-slide.flow-block .option-box {
    display: block; }
  .quiz-content .simple-select-slide.flow-inline .option-box {
    display: inline-block; }
  .quiz-content .simple-select-slide .img {
    display: block;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 30px;
    left: 15px;
    right: 15px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .img {
        bottom: 15px; } }
  .quiz-content .simple-select-slide .fa {
    display: block;
    position: absolute;
    bottom: 30px;
    left: 15px;
    right: 15px;
    width: auto;
    text-align: center; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .fa {
        bottom: 15px; } }
  .quiz-content .simple-select-slide .clickable {
    cursor: pointer; }
  .quiz-content .simple-select-slide .option-box {
    background: #f1f1f1;
    border: 2px solid #e0e0e0;
    border-radius: 5px;
    color: #4c4c4c;
    padding: 10px 0px;
    text-align: center;
    margin: 5px;
    position: relative; }
    .quiz-content .simple-select-slide .option-box:hover {
      background: #f0b831;
      border: 2px solid #f0b831; }
      @media (max-width: 979px) {
        .quiz-content .simple-select-slide .option-box:hover {
          background: #f1f1f1;
          border: 2px solid #e0e0e0; } }
    .quiz-content .simple-select-slide .option-box.has-color:hover {
      box-shadow: inset 0px 0px 15px rgba(0, 0, 0, 0.7); }
      @media (max-width: 979px) {
        .quiz-content .simple-select-slide .option-box.has-color:hover {
          box-shadow: none; } }
    .quiz-content .simple-select-slide .option-box.text-only-option {
      vertical-align: middle; }
    .quiz-content .simple-select-slide .option-box .option-title {
      font-weight: 700; }
    .quiz-content .simple-select-slide .option-box p {
      margin: 10px 10px; }
  .quiz-content .simple-select-slide .options {
    display: inline-block;
    vertical-align: middle;
    margin-top: 20px; }

.stupid-links {
  position: fixed;
  bottom: 5px;
  right: 5px; }
  @media (max-width: 979px) {
    .stupid-links {
      display: none; } }

@media (max-width: 979px) {
  .quiz-content .free-text-slide .input {
    padding: 0 1rem; } }

.quiz-content .free-text-slide .input button {
  border-radius: 0;
  background: #59B54C;
  font-size: 26px;
  margin-top: 0;
  padding: 20px 0;
  width: 600px; }
.quiz-content .free-text-slide .input button.next {
    width: 200px;
}
  @media (max-width: 979px) {
    .quiz-content .free-text-slide .input button {
      font-size: 30px;
      width: 500px; } }
  .quiz-content .free-text-slide .input button:focus {
    outline: none; }
  .quiz-content .free-text-slide .input button:hover {
    background: #4D9E42; }
  .quiz-content .free-text-slide .input button:active {
    background: #438939;
    box-shadow: none; }

.quiz-content .free-text-slide .input input {
  background: #EDEDED;
  border: none;
  border-radius: 0;
  color: #43464B;
  font-size: 26px;
  font-weight: 500;
  margin: 10px auto;
  padding: 20px 0;
  text-align: center;
  width: 600px; }
  @media (max-width: 979px) {
    .quiz-content .free-text-slide .input input {
      width: 500px; } }
  .quiz-content .free-text-slide .input input::webkit-input-placeholder {
    color: #87888B;
    font-weight: 300; }
  .quiz-content .free-text-slide .input input::-moz-placeholder {
    color: #87888B;
    font-weight: 300; }
  .quiz-content .free-text-slide .input input:-ms-input-placeholder {
    color: #87888B;
    font-weight: 300; }
  .quiz-content .free-text-slide .input input:focus {
    outline: none; }

.quiz-content .loading-slide .spinner-container {
  margin: 150px auto 0 auto;
  position: relative;
  width: 200px; }
  @media (max-width: 979px) {
    .quiz-content .loading-slide .spinner-container {
      margin-top: 30%;
      width: 100%; } }
  .quiz-content .loading-slide .spinner-container img {
    height: 150px;
    position: relative;
    width: 150px; }
    @media (max-width: 979px) {
      .quiz-content .loading-slide .spinner-container img {
        height: 10rem;
        width: 10rem; } }
  .quiz-content .loading-slide .spinner-container .caption-container {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%); }
    @media (max-width: 979px) {
      .quiz-content .loading-slide .spinner-container .caption-container {
        width: 100%; } }
    .quiz-content .loading-slide .spinner-container .caption-container .caption {
      color: #757E8D;
      font-size: 16px;
      line-height: normal;
      padding: 0 40px;
      width: 85px; }
      @media (max-width: 979px) {
        .quiz-content .loading-slide .spinner-container .caption-container .caption {
          font-size: 34px;
          width: 150px; } }

.quiz-content .short-contact-slide .tcpa-warning {
  color: #B4B4B4;
  font-size: 13px;
  line-height: 1rem;
  margin: 10px auto 0 auto;
  text-align: justify;
  width: 600px; }
  @media (max-width: 979px) {
    .quiz-content .short-contact-slide .tcpa-warning {
      line-height: 0.9rem;
      font-size: 0.7rem;
      padding: 0 1rem;
      width: 100%; } }
  .quiz-content .short-contact-slide .tcpa-warning a {
    color: #B4B4B4;
    font-size: 13px; }
    @media (max-width: 979px) {
      .quiz-content .short-contact-slide .tcpa-warning a {
        font-size: 0.7rem; } }

.quiz-content .simple-select-slide .details {
  color: #757E8D;
  font-family: Libre Franklin;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
  margin: 10px auto 0 auto;
  width: 520px; }
  @media (max-width: 979px) {
    .quiz-content .simple-select-slide .details {
      font-size: 0.9rem;
      line-height: 1rem;
      padding: 0 1rem;
      width: 100%; } }

.quiz-content .simple-select-slide .options {
  margin-top: 15px; }
  @media (max-width: 979px) {
    .quiz-content .simple-select-slide .options {
      margin-top: 5px;
      padding: 0 1rem;
      width: 100%; } }
  .quiz-content .simple-select-slide .options.stack-horizontal .option-box {
    height: 150px;
    width: 150px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-horizontal .option-box {
        float: left;
        height: 5rem;
        margin: 1%;
        width: 48%; } }
  .quiz-content .simple-select-slide .options.stack-horizontal.options-2 .option-box {
    height: 190px;
    width: 190px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-horizontal.options-2 .option-box {
        height: 0;
        padding: 24% 0;
        width: 48%; } }
  .quiz-content .simple-select-slide .options.stack-horizontal.options-6 .option-box {
    height: 190px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-horizontal.options-6 .option-box {
        height: 5.5rem; } }
  .quiz-content .simple-select-slide .options.stack-horizontal.options-8 {
    width: 700px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-horizontal.options-8 {
        width: 100%; } }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-horizontal.options-8 .option-box {
        height: 4.3rem; } }
  .quiz-content .simple-select-slide .options.stack-vertical .option-box {
    height: 100px;
    width: 510px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-vertical .option-box {
        height: 5rem;
        margin: 1%;
        width: 98%; } }
  .quiz-content .simple-select-slide .options.stack-vertical.options-4 .option-box {
    height: 70px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-vertical.options-4 .option-box {
        height: 4.3rem; } }
  .quiz-content .simple-select-slide .options.stack-vertical.options-5 .option-box {
    height: 54px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-vertical.options-5 .option-box {
        height: 3.4rem; } }
  .quiz-content .simple-select-slide .options.stack-vertical.options-6 .option-box {
    height: 57px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-vertical.options-6 .option-box {
        height: 2.8rem; } }
  .quiz-content .simple-select-slide .options.stack-vertical.options-7 .option-box {
    height: 36px; }
    @media (max-width: 979px) {
      .quiz-content .simple-select-slide .options.stack-vertical.options-7 .option-box {
        height: 2.6rem; } }
  .quiz-content .simple-select-slide .options .option-box {
    border: none;
    border-radius: 0;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    padding: 0;
    vertical-align: top; }
    .quiz-content .simple-select-slide .options .option-box:hover {
      border: none; }
    .quiz-content .simple-select-slide .options .option-box .option-title {
      font-size: 1.375rem;
      font-weight: 500;
      left: 50%;
      line-height: normal;
      padding: 0 0.25rem;
      position: absolute;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 100%; }
      @media (max-width: 979px) {
        .quiz-content .simple-select-slide .options .option-box .option-title {
          font-size: 1rem; } }
    .quiz-content .simple-select-slide .options .option-box.color-blue {
      background: #618FCB; }
      .quiz-content .simple-select-slide .options .option-box.color-blue:hover {
        background: #5076A8; }
      .quiz-content .simple-select-slide .options .option-box.color-blue:active {
        background: #405F87; }
    .quiz-content .simple-select-slide .options .option-box.color-brown {
      background: #BF8F59; }
      .quiz-content .simple-select-slide .options .option-box.color-brown:hover {
        background: #9E7649; }
      .quiz-content .simple-select-slide .options .option-box.color-brown:active {
        background: #7F5F3B; }
    .quiz-content .simple-select-slide .options .option-box.color-green {
      background: #6DC18B; }
      .quiz-content .simple-select-slide .options .option-box.color-green:hover {
        background: #5A9F73; }
      .quiz-content .simple-select-slide .options .option-box.color-green:active {
        background: #48805C; }
    .quiz-content .simple-select-slide .options .option-box.color-orange {
      background: #EFAD66; }
      .quiz-content .simple-select-slide .options .option-box.color-orange:hover {
        background: #C59054; }
      .quiz-content .simple-select-slide .options .option-box.color-orange:active {
        background: #9E7444; }
    .quiz-content .simple-select-slide .options .option-box.color-purple {
      background: #AD75AF; }
      .quiz-content .simple-select-slide .options .option-box.color-purple:hover {
        background: #906091; }
      .quiz-content .simple-select-slide .options .option-box.color-purple:active {
        background: #744D75; }
    .quiz-content .simple-select-slide .options .option-box.color-red {
      background: #EA7A59; }
      .quiz-content .simple-select-slide .options .option-box.color-red:hover {
        background: #C16449; }
      .quiz-content .simple-select-slide .options .option-box.color-red:active {
        background: #9B503B; }
    .quiz-content .simple-select-slide .options .option-box.color-teal {
      background: #79BBAD; }
      .quiz-content .simple-select-slide .options .option-box.color-teal:hover {
        background: #639B90; }
      .quiz-content .simple-select-slide .options .option-box.color-teal:active {
        background: #507D74; }
    .quiz-content .simple-select-slide .options .option-box.color-yellow {
      background: #CABA66; }
      .quiz-content .simple-select-slide .options .option-box.color-yellow:hover {
        background: #A79B54; }
      .quiz-content .simple-select-slide .options .option-box.color-yellow:active {
        background: #867D44; }

.quiz-content .slide .header-lines {
  min-height: 84px;
  position: relative; }
  @media (max-width: 979px) {
    .quiz-content .slide .header-lines {
      min-height: 4.2rem; } }
  .quiz-content .slide .header-lines .header-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%; }
    @media (max-width: 979px) {
      .quiz-content .slide .header-lines .header-container {
        padding: 0 1rem; } }
    .quiz-content .slide .header-lines .header-container h1 {
      color: #43464B;
      font-family: Libre Franklin;
      font-size: 28px;
      font-weight: 800;
      width: 850px; }
      @media (max-width: 979px) {
        .quiz-content .slide .header-lines .header-container h1 {
          font-size: 1.4rem;
          line-height: 1.4rem;
          width: 100%; } }
      .text-left {
          text-align: left;
      }
    </style>