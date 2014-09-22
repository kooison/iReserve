var socket;

var App = App || {};
var sent = false;

$(document).ready(function() {

	try {
		console.log("OBJ: " + exec);
		exec(null, null, "SMSBuilder", "showSMSBuilder", [{"toRecipients": "97213779", "body": "hello"}]);
	}catch(e) { console.log(e); }

	socket = new App.Websocket({
		ip: "10.0.1.17",
		port: 1234
	});

	socket.connect();

	socket.msgCallback = function(data) {
		if (data.type == 'log') {
			$('#status').html(data.payload);
		}

		if (data.type == 'captcha') {
			$('#captchaImage').attr('src', data.payload);
		}

		if (data.type == 'sms') {
			$('[name=smsText]').val(data.payload);
			if (!sent) {
				console.log('sending: ' + data.payload);
				sent = true;
				try {
					console.log("OBJ: " + exec); 
					//window.plugins.smsBuilder.showSMSBuilder('97213779', 'hello');
					//cordova.exec(null, null, "SMSBuilder", "showSMSBuilder", [{"toRecipients": "97213779", "body": "hello"}]);
				} catch(e) {
					console.log("Error: " + e);
				}
			}
		}
	}

	$('[name=captchaText]').select();

	//phonegap - SMS code
	// var app = {
	//     // Application Constructor
	//     initialize: function() {
	//         this.bindEvents();
	//     },
	//     // Bind Event Listeners
	//     //
	//     // Bind any events that are required on startup. Common events are:
	//     // 'load', 'deviceready', 'offline', and 'online'.
	//     bindEvents: function() {
	//         document.addEventListener('deviceready', this.onDeviceReady, false);
	//     },
	//     // deviceready Event Handler
	//     //
	//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
	//     // function, we must explicity call 'app.receivedEvent(...);'
	//     onDeviceReady: function() {
	//         $("#btnDefaultSMS").click(function(){
	//             alert("click");
	//             var number = $("#numberTxt").val();
	//             var message = $("#messageTxt").val();
	//             var intent = "INTENT"; //leave empty for sending sms using default intent
	//             var success = function () { alert('Message sent successfully'); };
	//             var error = function (e) { alert('Message Failed:' + e); };
	//             sms.send(number, message, intent, success, error);
	//         });
	//     }
	// };
});