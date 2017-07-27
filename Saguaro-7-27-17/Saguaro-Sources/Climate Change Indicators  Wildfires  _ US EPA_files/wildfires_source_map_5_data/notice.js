// To add emergency announcements to pages with the NEW TEMPLATE (3):
// 1) Put the message between the single quotes in the var line - include <span> tags - if you use HTML code, be sure to use double quotes

// 2) Add the message to all var lines that need it
// a) to show the announcement on the EPA home page, AA home pages, and regional home pages only, add message
// to first var line only

// b) to show the announcement on the pages above PLUS other major home pages, add message
// to first and second var lines only

// c) to show the announcement on all other EPA pages, add message to all var lines

// Otherwise, leave quote marks empty

//NOTE!!! For new 2015 homepage, you must include tags in the line for var toponly or the text will not display correctly

//Suggested text - Our Web site will undergo scheduled maintenance from 6pm ET on Sunday, August 16, 2015 to 7am ET on Monday, August 17, 2015. During this time, you may find that our web pages are slow to load or that certain applications are not working. We apologize for any inconvenience. 


var toponly = '';
var othermajor = '';
var allother = '';

	
// DO NOT EDIT ANYTHING BELOW

// EPA home page, all AA home pages, and all regional home pages

 if(document.getElementById("sitewidea") && toponly != '') {
	var sitewidea = document.getElementById("sitewidea");
	sitewidea.innerHTML = toponly;
}

// Several other home pages

if(document.getElementById("sitewideb") && othermajor != '') {
	var sitewideb = document.getElementById("sitewideb");
	sitewideb.innerHTML = othermajor;
}

// ALL pages using EPA template versions 3 and later

if(document.getElementById("sitewidec") && allother != '') {
	var sitewidec = document.getElementById("sitewidec");
	sitewidec.innerHTML = allother;
}

