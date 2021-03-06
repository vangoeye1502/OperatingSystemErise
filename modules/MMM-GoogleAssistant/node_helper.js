/* Magic Mirror
 * Module: MMM-GA
 *
 * By Gaurav
 *
 */
'use strict';

var NodeHelper = require("node_helper");
var PubNub = require('pubnub');

module.exports = NodeHelper.create({

  initGoogleAssistant: function() {
    var self = this;
    this.pubnub = new PubNub({
      //publishKey,subscribeKey,secretKey
        publishKey: 'pub-c-b7f324ac-e190-4bcf-ba5e-b860168f6f9b',
        subscribeKey: 'sub-c-f97a2b14-b03f-11e7-8d4b-66b981d3b880',
        //secretKey: 'sec-c-YjQ1ZDQwYzktYTY4YS00OWY0LWIzNDUtYTlkNjI4YTIxNDBj',

    });

    this.pubnub.addListener({
      status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
          //publishSampleMessage();
        }
      },
      message: function(message) {
          console.log("MESSAGE DETECTED");
          if (message.message === 'ON_CONVERSATION_TURN_STARTED') {
          self.sendSocketNotification('ON_CONVERSATION_TURN_STARTED', null);
        } else if (message.message === 'ON_CONVERSATION_TURN_FINISHED') {
          self.sendSocketNotification('ON_CONVERSATION_TURN_FINISHED', null);
        } else if (message.message.includes('ON_RECOGNIZING_SPEECH_FINISHED')) {
          var query = message.message.split(":");
          self.sendSocketNotification('ON_RECOGNIZING_SPEECH_FINISHED', query[1]);
        } else if (message.message.includes("COMMAND")) {
            var query = message.message.split("::");
            self.sendSocketNotification('COMMAND_FOR_MIRROR', query[1]);
            console.log("COMMAND: " + query[1]);
        }
      },
      presence: function(presenceEvent) {
        // handle presence
      }
    });

    this.pubnub.subscribe({
      channels: ['magicmirror']
    });

      self.sendSocketNotification('INITIALIZATION_COMPLETED',null);
      console.log("INITIALIZATION_COMPLETED");
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'INIT') {
      console.log("now initializing assistant - " + payload);
      this.initGoogleAssistant();
    }
  }

});
