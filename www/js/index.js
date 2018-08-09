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
        webengage.track("App Open", null);
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
    var userid = window.localStorage.getItem("userid");
    if (userid != null && userid != "") {
        document.getElementById('userid-input').value = userid;
        document.getElementById('log-button').textContent = "LOGOUT";
    } else {
        document.getElementById('userid-input').value = "";
        document.getElementById('log-button').textContent = "LOGIN";
    }
};

document.getElementById("log-button").addEventListener("click", function() {
    var prevUserid = window.localStorage.getItem("userid");
    if (prevUserid === null || prevUserid == "") {
        // Login
        var userid = document.getElementById('userid-input').value;
        if (userid != null && userid != "") {
            window.localStorage.setItem("userid", userid);
            document.getElementById('log-button').textContent = "LOGOUT";
            document.getElementById('userid-input').value = userid;
            webengage.user.login(userid);
        }
    } else {
        // Logout
        window.localStorage.setItem("userid", "");
        document.getElementById('userid-input').value = "";
        document.getElementById('log-button').textContent = "LOGIN";
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
    if (event != null && event != "") {
        webengage.track(event, null);
    }
});

document.getElementById("buy-button").addEventListener("click", function() {
    webengage.track("Purchased", {"product-id": "123", "product-name": "wrist-watch", "product-price": 25.65});
});
