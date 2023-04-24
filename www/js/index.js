/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        init();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        // WebEngage initialization
        webengage.engage();

        // Events tracking
        webengage.track("App Opened");

        // Push notification callbacks
        webengage.push.onClick(function(deeplink, customData) {
            console.log("Push notification clicked");
        });

        // In-app notification callbacks
        webengage.notification.onShown(function(inAppData) {
            console.log("In-app shown");
        });

        webengage.notification.onClick(function(inAppData, actionId) {
            console.log("In-app notification clicked");
        });

        webengage.notification.onDismiss(function(inAppData) {
            console.log("In-app notification dismissed");
        });

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function init() {
    console.log("check this")
    var userid = window.localStorage.getItem("userid");
    if (userid != null && userid != "") {
        document.getElementById('userid-input').value = userid;
        document.getElementById('log-button').textContent = "LOGOUT";
    } else {
        document.getElementById('userid-input').value = "";
        document.getElementById('log-button').textContent = "LOGIN";
    }

    var devicePushStatus = window.localStorage.getItem("device-push-opt");
    if(devicePushStatus == false){
        document.getElementById("device-push-opt-button").checked = false;
    }
    else{
        document.getElementById("device-push-opt-button").checked = true;
    }

    var pushStatus = window.localStorage.getItem("push-opt");
    if(pushStatus == false){
        document.getElementById("push-opt-button").checked = false;
    }
    else{
        document.getElementById("push-opt-button").checked = true;
    }

    var smsStatus = window.localStorage.getItem("sms-opt");
    if(smsStatus == false){
        document.getElementById("sms-opt-button").checked = false;
    }
    else{
        document.getElementById("sms-opt-button").checked = true;
    }

    var emailStatus = window.localStorage.getItem("email-opt");
    if(emailStatus == false){
        document.getElementById("email-opt-button").checked = false;
    }
    else{
        document.getElementById("email-opt-button").checked = true;
    }

    var inAppStatus = window.localStorage.getItem("inapp-opt");
    if(inAppStatus == false){
        document.getElementById("inapp-opt-button").checked = false;
    }
    else{
        document.getElementById("inapp-opt-button").checked = true;
    }

    var whatsappStatus = window.localStorage.getItem("whatsapp-opt");
    if(whatsappStatus == false){
        document.getElementById("whatsapp-opt-button").checked = false;
    }
    else{
        document.getElementById("whatsapp-opt-button").checked = true;
    }

    var viberStatus = window.localStorage.getItem("viber-opt");
    if(viberStatus == false){
        document.getElementById("viber-opt-button").checked = false;
    }
    else{
        document.getElementById("viber-opt-button").checked = true;
    }
};

document.getElementById("log-button").addEventListener("click", function() {
    var prevUserid = window.localStorage.getItem("userid");
    if (prevUserid === undefined || prevUserid === null || prevUserid === "") {
        var userid = document.getElementById('userid-input').value;
        if (userid != null && userid != "") {
            window.localStorage.setItem("userid", userid);
            document.getElementById('log-button').textContent = "LOGOUT";
            document.getElementById('userid-input').value = userid;

            // Login
            webengage.user.login(userid);
        }
    } else {
        window.localStorage.setItem("userid", "");
        document.getElementById('userid-input').value = "";
        document.getElementById('log-button').textContent = "LOGIN";

        // Logout
        webengage.user.logout();
    }
});

document.getElementById("email-button").addEventListener("click", function() {
    var email = document.getElementById("email-input").value;
    if (email != null && email != "") {
        webengage.user.setAttribute("we_email", email);
    }
});

document.getElementById("track-button").addEventListener("click", function() {
    var event = document.getElementById("event-input").value;
    if (event !== undefined && event != null && event != "") {
        webengage.track(event);
    }
});

document.getElementById("buy-button").addEventListener("click", function() {
    console.log("Clicked on buy");

    webengage.track("Purchased", {"product-id": "123", "product-name": "wrist-watch", "product-price": 25.65});
});

document.getElementById("device-push-opt-button").addEventListener("click", function() {
    console.log("Clicked on Device Push Opt");
    var pushStatus = document.getElementById("device-push-opt-button").checked;
    webengage.user.setDevicePushOptIn(pushStatus);
    window.localStorage.setItem("device-push-opt", pushStatus);
});

document.getElementById("sms-opt-button").addEventListener("click", function() {
    console.log("Clicked on sms Opt");
    var status = document.getElementById("sms-opt-button").checked;
    webengage.user.setUserOptIn("sms",status);
    window.localStorage.setItem("sms-opt", status);
});


document.getElementById("email-opt-button").addEventListener("click", function() {
    console.log("Clicked on email Opt");
    var status = document.getElementById("email-opt-button").checked;
    webengage.user.setUserOptIn("email",status);
    window.localStorage.setItem("email-opt", status);
});


document.getElementById("push-opt-button").addEventListener("click", function() {
    console.log("Clicked on push Opt");
    var status = document.getElementById("push-opt-button").checked;
    webengage.user.setUserOptIn("push",status);
    window.localStorage.setItem("push-opt", status);
});


document.getElementById("inapp-opt-button").addEventListener("click", function() {
    console.log("Clicked on inapp Opt");
    var status = document.getElementById("inapp-opt-button").checked;
    webengage.user.setUserOptIn("in_app",status);
    window.localStorage.setItem("inapp-opt", status);
});


document.getElementById("whatsapp-opt-button").addEventListener("click", function() {
    console.log("Clicked on whatsapp Opt");
    var status = document.getElementById("whatsapp-opt-button").checked;
    webengage.user.setUserOptIn("whatsapp",status);
    window.localStorage.setItem("whatsapp-opt", status);
});


document.getElementById("viber-opt-button").addEventListener("click", function() {
    console.log("Clicked on viber Opt");
    var status = document.getElementById("viber-opt-button").checked;
    webengage.user.setUserOptIn("viber",status);
    window.localStorage.setItem("viber-opt", status);
});

