/* Magic Mirror
 * Module: MMM-GoogleAssistant
 *
 * By Gaurav
 *
 */

Module.register("MMM-GoogleAssistant", {
  // Module config defaults.
  defaults: {

    header: "Google Assistant",
    maxWidth: "100%",
    publishKey: 'pub-c-b7f324ac-e190-4bcf-ba5e-b860168f6f9b',
    subscribeKey: 'sub-c-f97a2b14-b03f-11e7-8d4b-66b981d3b880',
  },

  // Define start sequence.
  start: function() {
    Log.info('Starting module: Google Assistant Now');
    this.assistantActive = false;
    this.processing = false;
    this.userQuery = null;
    this.sendSocketNotification('INIT', 'handshake');
  },

  getDom: function() {
    Log.log('Updating DOM for GA');
    var wrapper = document.createElement("div");

    if (this.assistantActive == true) {
      if (this.processing == true) {
          wrapper.innerHTML = "<img src='MMM-GoogleAssistant/giphy.gif' /><br/>" + this.userQuery.toUpperCase() + "?";
      } else {
        /*wrapper.innerHTML = "<div class=\"sk-folding-cube\">\n" +
            "  <div class=\"sk-cube1 sk-cube\"></div>\n" +
            "  <div class=\"sk-cube2 sk-cube\"></div>\n" +
            "  <div class=\"sk-cube4 sk-cube\"></div>\n" +
            "  <div class=\"sk-cube3 sk-cube\"></div>\n" +
            "</div><br/>" + "LISTENING";*/
          wrapper.innerHTML = "<img src='modules/MMM-GoogleAssistant/image1.gif' style='width: 200px;' /><br/>" + "Waar kan ik mee helpen?";
      }

    } else {
        wrapper.innerHTML = "Zeg, \"Hey Google\" ";
    }
    return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification == 'ON_CONVERSATION_TURN_STARTED') {
        this.assistantActive = true;
    } else if (notification == 'ON_CONVERSATION_TURN_FINISHED') {
        this.assistantActive = false;
        this.processing = false;
    } else if (notification == 'ON_RECOGNIZING_SPEECH_FINISHED') {
        this.userQuery = payload;
        this.processing = true;
    } else if (notification == 'INITIALIZATION_COMPLETED') {
        this.assistantActive = true;
    } else if (notification == 'COMMAND_FOR_MIRROR') {
        var pl = JSON.parse(payload);
        //this.sendNotification('REMOTE_ACTION', {action: 'BRIGHTNESS', value: pl.value});
        this.sendNotification('REMOTE_ACTION', {action: 'MONITOROFF'});

    }
    this.updateDom(500);
  },
});
