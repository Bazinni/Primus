/*function wesu_checkbox_validation() {
	if ( document.getElementById('wesu_tablinks_tax_label').classList.contains('active') ) {
	    const form = document.querySelector('#sectionForm');
	    const checkboxes = form.querySelectorAll('input[type=checkbox]');
	    const checkboxLength = checkboxes.length;
	    const firstCheckbox = checkboxLength > 0 ? checkboxes[0] : null;

	    function init() {
	        if (firstCheckbox) {
	            for (let i = 0; i < checkboxLength; i++) {
	                checkboxes[i].addEventListener('change', checkValidity);
	            }

	            checkValidity();
	        }
	    }

	    function isChecked() {
	        for (let i = 0; i < checkboxLength; i++) {
	            if (checkboxes[i].checked) return true;
	        }

	        return false;
	    }

	    function checkValidity() {
	        const errorMessage = !isChecked() ? 'At least one checkbox must be selected.' : '';
	        firstCheckbox.setCustomValidity(errorMessage);
	    }

	    init();
	}	
};

*/


function wepu_openTab(evt, tabName, radioName, requiredName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("wesu-tab__content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("wesu-tab__links");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	
	tabrequired = document.getElementsByClassName("wesu-tab__required");
	for (i = 0; i < tabrequired.length; i++) {
		tabrequired[i].required = "";
	}
	if (requiredName){
		document.getElementById(requiredName).required = true;
	}
}

function wesu_displayOptions(checkID, optionID, requiredID) {
	// Get the checkbox
	var checkBox = document.getElementById(checkID).checked;

	// If the checkbox is checked, display the output text
	if (checkBox == true){
		document.getElementById(optionID).style.display = "block";
		if (requiredID){
			document.getElementById(requiredID).required = true;
		}
	} if (checkBox == false) {
		document.getElementById(optionID).style.display = "none";
		if (requiredID){
			document.getElementById(requiredID).required = "";
		}
	}
}

function wesu_displayOptions_radio(radioID, displayClass, hideClass, requiredClass, unrequiredClass) {
	// Get the checkbox
	var checkBox = document.getElementById(radioID).checked;

	// If the checkbox is checked, display the output text

	var x = document.getElementsByClassName(hideClass);
	var i;
	for (i = 0; i < x.length; i++) {
			x[i].style.display = 'none';	    
	}
	if (unrequiredClass){

		var w = document.getElementsByClassName(unrequiredClass);
		var h;
		for (h = 0; h < w.length; h++) {
			w[h].required = false;	    
		}
	}
	if (checkBox == true){

		var y = document.getElementsByClassName(displayClass);
		var j;
		for (j = 0; j < y.length; j++) {
				y[j].style.display = 'block';	    
		}

		if (requiredClass){
			var z = document.getElementsByClassName(requiredClass);
			var k;
			for (k = 0; k < z.length; k++) {
				z[k].required = true;	    
			}
		}
		
	} 
}

function wesu_hideOptions(checkID, optionID, requiredID) {
	// Get the checkbox
	var checkBox = document.getElementById(checkID).checked;

	// If the checkbox is checked, display the output text
	if (checkBox == true){
		document.getElementById(optionID).style.display = "none";
		if (requiredID){
			document.getElementById(requiredID).required = "";
		}
	} else {
		document.getElementById(optionID).style.display = "block";
		if (requiredID){
			document.getElementById(requiredID).required = true;
		}
	}
}

function wesu_displayEmail(checkID, optionID) {
	// Get the checkbox
	var checkBox = document.getElementById(checkID).checked;

	// If the checkbox is checked, display the output text
	if (checkBox == true){
		document.getElementById(optionID).style.display = "block";
		document.getElementById('wesu_email_subject').required = true;
		document.getElementById('wesu_email_message').required = true;

	} else {
		document.getElementById(optionID).style.display = "none";
		document.getElementById('wesu_email_subject').required = "";
		document.getElementById('wesu_email_message').required = "";
	}
}

function wesu_hideEmail(checkID, optionID) {
	// Get the checkbox
	var checkBox = document.getElementById(checkID).checked;

	// If the checkbox is checked, display the output text
	if (checkBox == true){
		document.getElementById(optionID).style.display = "none";
		document.getElementById('wesu_email_subject').required = "";
		document.getElementById('wesu_email_message').required = "";
	} else {
		document.getElementById(optionID).style.display = "block";
		document.getElementById('wesu_email_subject').required = true;
		document.getElementById('wesu_email_message').required = true;
	}
}

function wesu_displayOptions_methods(checkID, optionID, methodClass, requiredID, optionID2) {
	// Get the checkbox
	var checkBox = document.getElementById(checkID).value;

	// If the checkbox is checked, display the output text
	if ((checkBox != "all") && (checkBox != "")){
		document.getElementById(optionID).style.display = "inline-block";
		if (optionID2) {
			document.getElementById(optionID2).style.display = "inline-block";
		}
		
		var x = document.getElementsByClassName(methodClass);
		var i;
		for (i = 0; i < x.length; i++) {
			if (x[i].classList.contains(methodClass + "_" + checkBox)) {
				x[i].style.display = 'block';
			} else {
				x[i].style.display = 'none';
			}
		    
		}

	} else {
		document.getElementById(optionID).style.display = "none";

	}
}

function wesu_custom_ID_display() {
	var subID = document.getElementById("wesu_sub_ID").value;
	if (subID == "custom_ID") {
		document.getElementById('wesu_sub_custom_ID_td').style.display = "inline-block";
	} else {
		document.getElementById('wesu_sub_custom_ID_td').style.display = "none";
	}

}

function wesu_custom_ID_switch_display() {
	var subID = document.getElementById("wesu_sub_newproduct").value;
	if (subID == "custom_ID") {
		document.getElementById('wesu_sub_custom_ID_switch_td').style.display = "inline-block";
	} else {
		document.getElementById('wesu_sub_custom_ID_switch_td').style.display = "none";
	}

}
