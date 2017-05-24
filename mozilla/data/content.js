
window.onerror = function(message, source, lineno, colno, error) {
	console.error(message);
	return true;
};

var baseUrl = "https://mkkp.lazos.me/putinalert/";

var xhr = new XMLHttpRequest();
xhr.open("GET", baseUrl + "blacklist.json", true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		var blacklist = JSON.parse(xhr.responseText);
		var hostname = window.location.hostname;
		for(var d in blacklist.domains) {
			var domain = blacklist.domains[d];
			var search = '.' + domain;
			if(hostname.indexOf(search)>-1 || hostname == domain) {
				var pop = new XMLHttpRequest();
				pop.open("GET", baseUrl + "overlay.html");
				pop.onreadystatechange = function() {
					if(pop.readyState == 4) {
						var body = document.getElementsByTagName('body');
						if(body.length<1) {
							var timeout = setTimeout(function () {
								var body = document.getElementsByTagName('body');
								if (body.length > 0) {
									body[0].innerHTML += pop.responseText;
									clearInterval(timeout);
								}
							}, 1000);
						} else {
							body[0].innerHTML += pop.responseText;
						}
					}
				};
				pop.send();
				break;
			}
		}
	}
};
xhr.send();
