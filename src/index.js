'use strict';
const Alexa = require("alexa-sdk");
const APP_ID = 'amzn1.ask.skill.a9cecf35-c604-4b8d-b84b-2eff9f42dc17'
var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var ua = require('universal-analytics');
var gUA = ua('UA-104151044-3'); // Tracking-ID

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('8eaa60e48fa8e49d3198f6dbab4f00d8'); // Token


// ID ====== 'UA-104151044-3'
// TRACKING SIGNATURE ===  intentTrackingID.event("Event Category", "Event Action").send()

var speechOutput;
const welcomeOutput = "Hello, I'm going to ask you some questions to find out how kind you are. All you have to do, is say: yes. no. or, sometimes. <break time='.5s'/> Tell me to begin when you are ready to start. ";
var reprompt = "Just tell me when you're ready, to begin. ";
const DaysLeftIntro = [
  "Great. ",
  "Nice. ",
  "Alright. ",
  "Cool. "
];

var cardTitle = '';
var cardContent = '';
var imageObj = {
    smallImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/PolyRed-Final04+108.png',
    largeImageUrl: 'https://s3.amazonaws.com/mydaysleftlogo/PolyRed-Final04+512.png'
};

const handlers = {
  'LaunchRequest': function() {
    // ANALYTICS

    // intentTrackingID.pageview("/").send();

    // report a success
    var utteranceValue = "SessionEndedRequest";
    var utteranceData = ("intent: " + utteranceValue).toString();
    gUA.event("user query","successful query", {query: utteranceData}).send();
    mixpanel.track("Successful Launch", {query: utteranceData});


    if(process.env.debugFlag){
      console.log('INSIDE LaunchRequest...');
    };
    this.response.speak(welcomeOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'HowKind': function() {
    console.log("INSIDE HowKind.......");

    var filledSlots = delegateSlotCollection.call(this);
    console.log("filled slots: " + JSON.stringify(filledSlots));
    var speechOutput = randomPhrase(DaysLeftIntro);



      var userName=this.event.request.intent.slots.userName.value;
      this.attributes['userName'] = userName;
      var userGuess=this.event.request.intent.slots.userGuess.value;
      this.attributes['userGuess'] = userGuess;
      var questionOne=this.event.request.intent.slots.questionOne.value;
      this.attributes['questionOne'] = questionOne;
      var questionTwo=this.event.request.intent.slots.questionTwo.value;
      this.attributes['questionTwo'] = questionTwo;
      var questionThree=this.event.request.intent.slots.questionThree.value;
      this.attributes['questionThree'] = questionThree;
      var questionFour=this.event.request.intent.slots.questionFour.value;
      this.attributes['questionFour'] = questionFour;
      var questionFive=this.event.request.intent.slots.questionFive.value;
      this.attributes['questionFive'] = questionFive;
      var questionSix=this.event.request.intent.slots.questionSix.value;
      this.attributes['questionSix'] = questionSix;
      var questionSeven=this.event.request.intent.slots.questionSeven.value;
      this.attributes['questionSeven'] = questionSeven;
      var questionEight=this.event.request.intent.slots.questionEight.value;
      this.attributes['questionEight'] = questionEight;
      // var questionNine=this.event.request.intent.slots.questionNine.value;
      // this.attributes['questionNine'] = questionNine;
      // var questionTen=this.event.request.intent.slots.questionTen.value;
      // this.attributes['questionTen'] = questionTen;

      var result = 0;

      // Q1 = When you're unsure about another person's motives, do you assume that his/her motives are good until you have evidence otherwise?

      if(questionOne === "yes" || questionOne === "yeah" || questionOne === "yup" || questionOne === "absolutely" || questionOne === "definitely") {
        result += 1;
      } else if (questionOne === "no" || questionOne === "nope" || questionOne === "nah" || questionOne === "na" || questionOne === "never" || questionOne === "no way") {
        result -= 1;
      } else if (questionOne === "sometimes" || questionOne === "maybe" || questionOne === "i don't know" || questionOne === "perhaps" ) {
        result += 0;
      } else {
        result -= 0;
      }

      // Q2 = Do you consider yourself to have a high degree of self respect?

      if(questionTwo === "yes" || questionTwo === "yeah" || questionTwo === "yup" || questionTwo === "absolutely" || questionTwo === "definitely") {
        result += 1;
      } else if (questionTwo === "no" || questionTwo === "nope" || questionTwo === "nah" || questionTwo === "na" || questionTwo === "never" || questionTwo === "no way") {
        result -= 1;
      } else if (questionTwo === "sometimes" || questionTwo === "maybe" || questionTwo === "i don't know" || questionTwo === "perhaps" ) {
        result += 0;
      } else {
        result -= 0;
      }

      // Q3 = Are you always trying to be as honest as possible?

      if(questionThree === "yes" || questionThree === "yeah" || questionThree === "yup" || questionThree === "absolutely" || questionThree === "definitely") {
        result += 2;
      } else if (questionThree === "no" || questionThree === "nope" || questionThree === "nah" || questionThree === "na" || questionThree === "never" || questionThree === "no way") {
        result -= 1;
      } else if (questionThree === "sometimes" || questionThree === "maybe" || questionThree === "i don't know" || questionThree === "perhaps" ) {
        result += 1;
      } else {
        result -= 0;
      }

      // Q4 = Do you help out a friend, even if your friend doesn't return the favor?

      if(questionFour === "yes" || questionFour === "yeah" || questionFour === "yup" || questionFour === "absolutely" || questionFour === "definitely") {
        result += 2;
      } else if (questionFour === "no" || questionFour === "nope" || questionFour === "nah" || questionFour === "na" || questionFour === "never" || questionFour === "no way") {
        result -= 1;
      } else if (questionFour === "sometimes" || questionFour === "maybe" || questionFour === "i don't know" || questionFour === "perhaps" ) {
        result += 1;
      } else {
        result -= 0;
      }

      // Q5 = When people begin to gossip, do you make an effort to change the subject?

      if(questionFive === "yes" || questionFive === "yeah" || questionFive === "yup" || questionFive === "absolutely" || questionFive === "definitely") {
        result += 1;
      } else if (questionFive === "no" || questionFive === "nope" || questionFive === "nah" || questionFive === "na" || questionFive === "never" || questionFive === "no way") {
        result += 0;
      } else if (questionFive === "sometimes" || questionFive === "maybe" || questionFive === "i don't know" || questionFive === "perhaps" ) {
        result += 1;
      } else {
        result -= 0;
      }

      // Q6 = Do you find it difficult to forgive those who have wronged you?

      if(questionSix === "yes" || questionSix === "yeah" || questionSix === "yup" || questionSix === "absolutely" || questionSix === "definitely") {
        result -= 1;
      } else if (questionSix === "no" || questionSix === "nope" || questionSix === "nah" || questionSix === "na" || questionSix === "never" || questionSix === "no way") {
        result += 2;
      } else if (questionSix === "sometimes" || questionSix === "maybe" || questionSix === "i don't know" || questionSix === "perhaps" ) {
        result += 1;
      } else {
        result -= 0;
      }

      // Q7 = Do you listen patiently when someone says the same old story, or same old stale joke?

      if(questionSeven === "yes" || questionSeven === "yeah" || questionSeven === "yup" || questionSeven === "absolutely" || questionSeven === "definitely") {
        result += 1;
      } else if (questionSeven === "no" || questionSeven === "nope" || questionSeven === "nah" || questionSeven === "na" || questionSeven === "never" || questionSeven === "no way") {
        result -= 1;
      } else if (questionSeven === "sometimes" || questionSeven === "maybe" || questionSeven === "i don't know" || questionSeven === "perhaps" ) {
        result += 1;
      } else {
        result -= 0;
      }

      // Q8 = Do you consider yourself to have control over your temper and emotions?

      if(questionEight === "yes" || questionEight === "yeah" || questionEight === "yup" || questionEight === "absolutely" || questionEight === "definitely") {
        result += 2;
      } else if (questionEight === "no" || questionEight === "nope" || questionEight === "nah" || questionEight === "na" || questionEight === "never" || questionEight === "no way") {
        result -= 1;
      } else if (questionEight === "sometimes" || questionEight === "maybe" || questionEight === "i don't know" || questionEight === "perhaps" ) {
        result += 1;
      } else {
        result -= 0;
      }

      var realResult = result;
      var capitalName = userName;
      if (userName) {
        capitalName = capitalize(userName);
      } else {
        capitalName = null;
      }

      this.attributes["realResult"] = realResult;

      if (parseInt(result) > 10) {
        result = 10;
      } else if (parseInt(result) < 0) {
        result = 0;
      }

      this.attributes["result"] = result;
      // this.attributes["userName"] = userName.toString();

      if(process.env.debugFlag){
        console.log("realResult = " + realResult);
        console.log("result = " + result);
        console.log("userName = " + userName);
        console.log("questionOne: " + questionOne);
        console.log("questionTwo: " + questionTwo);
        console.log("questionThree: " + questionThree);
        console.log("questionFour: " + questionFour);
        console.log("questionFive: " + questionFive);
        console.log("questionSix: " + questionSix);
        console.log("questionSeven: " + questionSeven);
        console.log("questionEight: " + questionEight);
      }

      speechOutput += "<break time=\".6s\"/>Okay " + userName + ". Your guess, was, " + userGuess + ", out of ten.<break time=\".8s\"/> And, according to my calculations, your kindness, is about " + result + ", out of ten. ";

      if(parseInt(result) < parseInt(userGuess)) {

        // I want to output this if userGuess is 5 points less than result.
        // Therefore, you may find this interesting. <break time=".5s"/> A study, carried out by psychologists from Goldsmiths University in London, found that people who thought they were nice, were generally more relaxed, happy, and successful. But, not necessarily more agreeable. <break time=".6s"/> Agreeableness is one of the “super traits” in the Big Five model of personality. People who score high on agreeableness are very trustworthy, altruistic, honest, modest, empathetic, and cooperative.

        speechOutput += "It seems as if you were wrong about your initial guess. <break time='.5s'/> I sent some information to your Alexa skill, do take the time to check that out. <break time='.6s'/>And if you enjoyed this skill, please take the time to rate it five stars, in the Alexa skill store. That would help out tremendously. Thank you. ";
      } else if (parseInt(result) > parseInt(userGuess)) {
        speechOutput += "Hey " + userName + ". It seems like you're selling yourself a bit short! You're a lot nicer than you think you are.<break time='.6s'/> I sent some information to your Alexa skill, do take the time to check that out. <break time='.6s'/>And if you enjoyed this skill, please take the time to rate it five stars, in the Alexa skill store. That would help out tremendously. Thank you. ";
      } else if (parseInt(result) === parseInt(userGuess)) {
        speechOutput += "Wow! Great guess, you were spot on. <break time='.6s'/> I sent some information to your Alexa skill, do take the time to check that out. <break time='.6s'/>And if you enjoyed this skill, please take the time to rate it five stars, in the Alexa skill store. That would help out tremendously. Thank you.<break time='.4s'/> ";
      }

      if(result > 7) {
        speechOutput += "You're really kind! You should be proud of that. <break time='.4s'/> ";
      } else if(result < 5) {
        speechOutput += "I think that you should work on being kind to others.<break time='.3s'/> Love is all we really have, in this extremely, temporary life. <break time='.4s'/> "
      }

      speechOutput += " Have a wonderful day today " + userName + "! ";

      //===================== CARD INFORMATION =======================

      if(result >= 7) {
        cardTitle = "You're Extremely Kind " + capitalName + "!";
      } else if (result < 7) {
        cardTitle = "You're Kind " + capitalName + "!"
      } else if (result > 3) {
        cardTitle = "You aren't very Kind " + capitalName + " :(";
      } else if (result <= 3) {
        cardTitle = "You need to work on your Kindness " + capitalName + "!";
      }


      cardContent = "(I'm really sorry if I spelled your name wrong, Alexa isn't great with names yet)\n...\nHow kind you thought you were: " + userGuess + '/10\nHow kind you really are: ' + result + '/10\n...'+ '\nIf you enjoyed this skill, please rate it 5 stars in the Alexa skill store!\n...\n All you need to do is: \n1. Go to the "Skills" section on your Alexa app\n 2. Tap "Your Skills" in the top right corner\n3. Find "How Kind Am I" \n4. Scroll to the bottom and tap "Write a Review"\n5. Show support!\n...\n That would really help out, Thank You!.\n~\n Enjoy the present moment! :)'; +
      '\n...\n If you have the time please check out my other Alexa Skill, My Days Left, to calculate how many days you have left to live based on your habits.'

      this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);

      this.response.speak(speechOutput);
      this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
      var utteranceValue = "HelpIntent";
      var utteranceData = ("intent: " + utteranceValue).toString();
      gUA.event("exist","Help intent").send();
      mixpanel.track("Help Intent", {query: utteranceData});
      speechOutput = "All that you have to do, is say that you are ready. And then I will begin to ask you questions to test your kindness. <break time='.5s'/> So, just tell me when you're ready to begin. ";
      this.response.speak(speechOutput).listen(reprompt);
      this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
      var utteranceValue = "StopIntent";
      var utteranceData = ("intent: " + utteranceValue).toString();
      gUA.event("exist","session ended").send();
      mixpanel.track("Session Stopped", {query: utteranceData});

      speechOutput = "Stopped";
      this.response.speak(speechOutput);
      this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
      var utteranceValue = "CancelIntent";
      var utteranceData = ("intent: " + utteranceValue).toString();
      gUA.event("exist","session ended").send();
      mixpanel.track("Session Cancelled", {query: utteranceData});

      speechOutput = "Cancelled";
      this.response.speak(speechOutput);
      this.emit(':responseReady');
    },
    'Unhandled': function () {
      console.log("UNHANDLED");
    },
    'SessionEndedRequest': function() {
      // report a failure
      var utteranceValue = "SessionEndedRequest";
      var utteranceData = ("intent: " + utteranceValue).toString();
      gUA.event("user query","failed query", utteranceData).send();
      mixpanel.track("Failed Launch", {query: utteranceData});

      speechOutput = "Session Ended";
      this.response.speak(speechOutput);
      console.log('session ended!');
      this.emit(':responseReady');
    }
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.a9cecf35-c604-4b8d-b84b-2eff9f42dc17';
  alexa.dynamoDBTableName = 'HowKind';
  alexa.registerHandlers(handlers);
  alexa.execute();
};


function delegateSlotCollection(){
    if(process.env.debugFlag){
      console.log("in delegateSlotCollection")
      console.log("current dialogState: " + this.event.request.dialogState);
      console.log("current event object: " + JSON.stringify(this.event))
    };
      if (this.event.request.dialogState === "STARTED") {
        if(process.env.debugFlag){
            console.log("in Beginning");
            console.log("this.event.request.intent: " + JSON.stringify(this.event.request.intent));
          };
        var updatedIntent=this.event.request.intent;
        //optionally pre-fill slots: update the intent object with slot values for which
        //you have defaults, then return Dialog.Delegate with this updated intent
        // in the updatedIntent property
        this.emit(":delegate", updatedIntent);
      } else if (this.event.request.dialogState !== "COMPLETED") {
        if(process.env.debugFlag){console.log("in not completed")};
        // return a Dialog.Delegate directive with no updatedIntent property.
        this.emit(":delegate");
      } else {
        // ANALYTICS ~ reporting a successful test
        var utteranceValue = "TestIntent";
        var utteranceData = ("intent: " + utteranceValue).toString();
        gUA.event("user query","successful query", {query: utteranceData}).send();
        mixpanel.track("Successful Kind", {query: utteranceData});

        if(process.env.debugFlag){
          console.log("in completed")
          console.log("returning: "+ JSON.stringify(this.event.request.intent))
        };
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent;
      }
}

function randomPhrase(array) {
  var i = 0;
  i = Math.floor(Math.random() * array.length);
  return(array[i]);
}

function readItem(obj, pastTips, callback) {
  var table = "Tips";
  var id = getRandomTipWithExclusions(totalTips, tipsHeard, obj).toString();
  var params = {
    TableName: table,
    Key:{
      "Id": id
    }
  };
  if(process.env.debugFlag){console.log("GetItem Params: ", JSON.stringify(params))};
  docClient.get(params, function(err, data) {
    if(err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err));
    } else {
      if(process.env.debugFlag){console.log("GetItem succeeded:", JSON.stringify(data))};
      //
      callback(obj, data['Item']);
    }
  });
}

function getRandomTipWithExclusions(lengthOfArray = 0, arrayOfIndexesToExclude, obj) {
	var rand = 0;
	if (arrayOfIndexesToExclude.length == lengthOfArray) {
		arrayOfIndexesToExclude = [];
		obj.tipsHeard = [];
		if(process.env.debugFlag){
      console.log('RESET TIPSHEARD')
      console.log('TIPSHEARD = ' + obj.tipsHeard)
    };
	}
	var min = Math.ceil(1);
  var max = Math.floor(lengthOfArray);
	while (rand == 0 || arrayOfIndexesToExclude.includes(rand)) {
		rand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("random number from loop: " + rand);
	}
  return rand;
}

function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
