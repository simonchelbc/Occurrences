document.addEventListener("DOMContentLoaded", function(event) { 
	//sends the input text to the server to process it 
	//so to receive a coloured version of the text
	document
	.getElementById("textSendButton")
	.addEventListener("click", function(event) {
		var textInput = 
			document.getElementById("textInput").value;
		var str_json = JSON.stringify({text: textInput});
		var request= new XMLHttpRequest()
		request.open("POST", window.location.href+"result", true);
		request.setRequestHeader("Content-type", "application/json");
		request.onreadystatechange = function() {
			if (this.readyState == XMLHttpRequest.DONE 
				&& this.status == 200) {
				var coloredText = this.response;
				document
				.getElementById("result")
				.innerHTML = coloredText;

				positionObjects();
			}
		}
		request.send(str_json);
	});

				
	/*this function position the owner info to the bottom
	 * of the page AND below the wrapper.
	 * this function is careful about the fact
	 * that owner info should not overflow on the send button
	 * of the wrapper by positioning the owner info
	 * below the wrapper in all cases.
	 * wHeight is the window height */
	var positionOwnerInfos = function(wHeight) {
		
		var elementAboveOwnerInfo = "wrapper";

		var setHeightElemAboveInfo = function(h) {
			document
			.getElementById(elementAboveOwnerInfo)
			.style
			.height = h;
		};
	
		// the size of the content of the wrapper
		var wrapperHeight =
			document
			.getElementById(elementAboveOwnerInfo)
			.scrollHeight;
			
		var windowBottom = wHeight - 80;

		if (windowBottom < wrapperHeight) {
			var newH = 
				(wrapperHeight + 10) + "px";
			setHeightElemAboveInfo(newH);
			/* this impeach that the result text will be over the
			 * the footer. Indeed if we don't remove the bottom property 
			 * no space is added between the footer and the wrapper. 
			 */
			var footerChilds =
				document
				.getElementsByClassName("footerChild");
			for (var i=0; i < footerChilds.length; i++) {
				footerChilds[i].style.bottom = "auto";
			}
		} else {
			var newH = windowBottom + "px";
			setHeightElemAboveInfo(newH);
		}
	};

	/*some responsive design for small screens*/
	var setWrapperWidth = function(wWidth) {
		if (wWidth < 300) {
			document
			.getElementById("wrapper") 
			.style
			.width = "100%";
		}
	};


	var positionObjects = function() {
		var w = window,
		    d = document,
		    e = d.documentElement,
		    g = d.getElementsByTagName('body')[0],
		    x = w.innerWidth || e.clientWidth || g.clientWidth,
		    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		positionOwnerInfos(y);
		setWrapperWidth(x);
		
		
	};
	
	positionObjects();

	window
	.addEventListener("resize", positionObjects);



});