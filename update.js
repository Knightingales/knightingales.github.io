function last(data)
{
	if (last_five.length == 5)
	{
		last_five.shift();
	}
	
	if ((last_five.length == 0) || ((last_five.length > 0) && (last_five[last_five.length - 1] != data)))
	{
		last_five.push(data);
	}
	
	$("#last-5").empty();
	
	for (var i in last_five)
	{
		var word = last_five[last_five.length - i - 1];
		
		var res = document.createElement("div");
		res.innerText = word;
		
		$("#last-5").append(res);
	}
}

function set(data)
{
	if ((last_five.length > 0) && (last_five[last_five.length - 1] == data))
		return;
	
	last(data);
	
	firebase.database().ref("travelercon").set(data);
}

function populate_data(data)
{
	$("#when").fadeOut("slow", "linear", function () {
			$("#when").val(data);
			$("#when").fadeIn("slow");
		});
}

function get()
{
	firebase.database().ref("travelercon").on("value", function (data) {
		
		/* Don't fade */
		if (data.val() == $("#when").val())
			return;
		
		last($("#when").val());
		
		populate_data(data.val());
	});
}

var firebaseConfig = {
    apiKey: "AIzaSyB_BTCW2PT1BkQDEPD9FbyTuQwWpC5ecDo",
    authDomain: "witchcraft-fb499.firebaseapp.com",
    databaseURL: "https://witchcraft-fb499.firebaseio.com",
    projectId: "witchcraft-fb499",
    storageBucket: "witchcraft-fb499.appspot.com",
    messagingSenderId: "966579536904",
    appId: "1:966579536904:web:6d2b40887e683b1e66bdbd"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var timerId = setInterval(function() {
    get();
}, 10000);

var last_five = [];

$(window).on('load', function() {
	$("#submit").click(function (event) {
		set($("#when").val());
	});
	
	$('#when').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);

		if(keycode == '13'){
			set($("#when").val());
		}
	});
	
	firebase.database().ref("travelercon").on("value", function (data) {
		populate_data(data.val());
	});
});