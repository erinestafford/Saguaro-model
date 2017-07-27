//tab navigation at top of each page, removed from each individual page and tab6 added 30 April 2014 - NK  

 
//inner nav
   $('.nav1').mouseover(function(){
		$('.nav1 ul').show();
	}).mouseout(function(){
		$('.nav1 ul').hide();   
   });
   $('.nav2').mouseover(function(){
		$('.nav2 ul').show();
	}).mouseout(function(){
		$('.nav2 ul').hide();   
	});
   $('.nav3').mouseover(function(){
		$('.nav3 ul').show();
	}).mouseout(function(){
		$('.nav3 ul').hide();  
	});
   $('.nav4').mouseover(function(){
		$('.nav4 ul').show();
	}).mouseout(function(){
		$('.nav4 ul').hide();  
	});
	$('.nav5').mouseover(function(){
		$('.nav5 ul').show();
	}).mouseout(function(){
		$('.nav5 ul').hide();  
	});
	$('.nav6').mouseover(function(){
		$('.nav6 ul').show();
	}).mouseout(function(){
		$('.nav6 ul').hide();  
	});

   $('.inner-nav li ul li:last-child a').addClass('last-item');













var url = window.location.pathname;
var array = url.split('/');
var lastsegment = array[array.length-2];

//alert(lastsegment);


if (lastsegment == "ghg") {
$('.inner-nav li.nav1 a').addClass('current');
}

if (lastsegment == "weather-climate") {
$('.inner-nav li.nav2 a').addClass('current');
}

if (lastsegment == "oceans") {
$('.inner-nav li.nav3 a').addClass('current');
}

if (lastsegment == "snow-ice") {
$('.inner-nav li.nav4 a').addClass('current');
}

if (lastsegment == "health-society") {
$('.inner-nav li.nav5 a').addClass('current');
}

if (lastsegment == "ecosystems") {
$('.inner-nav li.nav6 a').addClass('current');
}




//google analytics



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-32633028-1']);
//removing on august 7 _gaq.push(['_trackPageview']);
(function () {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

$("a[href$='pdf']").each(function(index) {
	pdfLabel = $(this).attr('href');
	pdfOnClick = "_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Download', '" + pdfLabel + "']);";
	$(this).attr("onClick", pdfOnClick);
});
$("a[href$='mp3']").each(function(index) {
	mp3Label = $(this).attr('href');
	mp3OnClick = "_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Download', '" + mp3Label + "']);";
	$(this).attr("onClick", mp3OnClick);
});
$("a[href$='wmv']").each(function(index) {
	wmvLabel = $(this).attr('href');
	wmvOnClick = "_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Download', '" + wmvLabel + "']);";
	$(this).attr("onClick", wmvOnClick);
});
$("a[href$='xls']").each(function(index) {
	xlsLabel = $(this).attr('href');
	xlsOnClick = "_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Download', '" + xlsLabel + "']);";
	$(this).attr("onClick", xlsOnClick);
});

//left navigation
var windowLoc = location.href.toLowerCase().split("/");
windowLoc.pop();
windowLoc = windowLoc.join("/") + "/";


$("#areanav > ul > li").each(function (i, nav) {
	var href = $(this).children("a").attr("href").toLowerCase();
	if (windowLoc.indexOf(href) >= 0) {
		if ($(this).children("ul").length > 0) {
			$(this).children("ul").css("display", "block");
		}
	} else {
		if ($(this).children("ul").length > 0) {
			$(this).children("ul").css("display", "none");
		}
	}
});

if (location.href.toLowerCase().indexOf("/climatechange/epaactivities.html") >= 0 || location.href.toLowerCase().indexOf("/climatechange/epaactivities/") >= 0) {
	var whatEPAIsDoing = $("#areanav a:[href$='/climatechange/EPAactivities.html']")
	if (whatEPAIsDoing.length > 0) {
		var activitiesUL = $(whatEPAIsDoing[0]).parent().children("ul");
		if (activitiesUL.length > 0) {
			activitiesUL.css("display", "block");
		}
	}
}

//WYCD pages - did you know boxes
var didYouKnow = new Array(
	"Households account for around 20% of total energy consumption in the U.S. (EIA).  The typical household spends more than $1,900 a year on energy bills.  With ENERGY STAR, you can save up to 30% or about $600 per year.",
	"In the average home, 40% of all electricity used to power home electronics is consumed while the products are turned off.  Nationwide, the total electricity consumed by electronics while idle equals the annual output of 12 power plants. Enabling your monitor's ENERGY STAR power management features can save you about $15 a year on your energy bill. To save even more, replace your old monitor with an LCD display one.  The energy consumption of an average LCD display monitor (flat-panel) is at least half of that for an average CRT.",
	"About one-sixth of all the electricity generated in the US is used to air condition buildings.",
	"Of the $1,900 per year an average household spends on utility bills, half pays for heating and cooling.  Depending on where you live, replacing your old heating and cooling equipment with ENERGY STAR qualified equipment and properly sealing your ducts can cut your energy bill by about $180 (nearly 10%).",
	"The water you save every year by purchasing a new ENERGY STAR qualified clothes washer instead of a new non-qualified model is enough to do 300 loads of laundry.",
	"By 2015, consumer electronics and small appliances will be responsible for almost 30% of all household electricity use. In 2020, the average home is expected to be 5% larger and will rely on even more electricity-powered electronics. (EIA)",
	"You can get federal tax credits under the Energy Policy Act for reducing your home's energy use associated with lighting, windows, heating and cooling, thermostats, drafts, insulation, attics, and roofs. <a href='http://www.energystar.gov/index.cfm?c=products.pr_tax_credits'>Click here for more information</a>.",
	"If all states adopted the most recent commercial and residential model energy codes, by 2020 annual consumer energy bill savings would be almost $7 billion, and the construction of 32 new 400 megawatt (MW) power plants could be avoided.",
	"States are responsible for more than 16 billion square feet of building space and spend more than $11 billion annually on building energy costs, which can account for as much as 10% of a typical government's annual operating budget.",
	"Current national recycling efforts reduce greenhouse gas emissions by 49.9 million metric tons of carbon equivalent, which is equivalent to the annual GHG emissions from 39.6 million passenger cars.",
	"U.S. recycling activity conserves significant quantities of energy. EPA estimates that our current recycling efforts saves 1.4 quadrillion BTU, equivalent to 11.3 billion gallons of gas.",
	"<a href='http://www.fueleconomy.gov/feg/flextech.shtml'>Flex Fuel Vehicles</a> are specially-designed to run on either traditional gasoline or a blend of 85% ethanol and 15% gasoline known as &quot;E-85.&quot;  E-85 reduces GHG emissions by 20%.  FFVs are available to consumers in a range of models at no extra cost.",
	"Americans saved $20 billion in 2010 on their utility bills with the help of ENERGY STAR, and prevented the equivalent of greenhouse gas emissions from 38 million vehicles. In addition, they saved more than 240 billion kWh &ndash; about 5% of U.S. electricity demand. ",
	"By replacing the five most frequently used lights in your home with ENERGY STAR qualified lighting, you can save more than $60 each year in energy costs. If every US household replaced their five highest-use fixtures, or the bulbs in them, with ENERGY STAR qualified models, the change would prevent the greenhouse gas emissions equivalent to the annual emissions from more than 10 million cars.",
	"Compared with standard construction, ENERGY STAR qualified homes use substantially less energy for heating, cooling and water heating &ndash; delivering $200 to $400 in annual savings. ",
	"ENERGY STAR certified buildings use 35% less energy and are responsible for 35% fewer GHG emissions than average buildings.",
	"Turning off just one 60-watt incandescent bulb that would otherwise burn eight hours a day can save about 1,000 pounds of carbon dioxide over the lifetime of the bulb. ",
	"Automotive exhaust treatment devices cannot reduce carbon dioxide emissions from vehicles. These emissions will only decrease if you reduce the amount of fossil fuel you burn as you drive. You can achieve this reduction by: <ul><li>driving less</li><li>using a renewable fuel, and/or </li><li>getting more mileage out of each gallon of fuel</li></ul> ");

var length = didYouKnow.length;
var rnd_no = Math.round((length - 1) * Math.random());

var didyouknow_el = $('.didyouknow p');
if (didyouknow_el.length > 0) {
	didyouknow_el.html(didYouKnow[rnd_no]);
	$('.didyouknow').show();
}

$('.enlarge-image').live("click", (function () {
	var image = $(this).attr("href");
	var captionText = "";
	if ($(this).attr('title')) {
		captionText = $(this).attr('title');
	}
	$('body').prepend(
		"<div id='enlarge-overlay'>" + "<div id='enlarge-overlay-horizon'>" + '<div id="enlarge-image-loading" style="background-color: white; width: 150px; height: 150px; margin: -75px auto 0pt;"><img src="/climatechange/images/loading.gif" style="margin-top: 35px;"><br> Loading<br> <a href="#" class="close-enlarge">Cancel</a></div>' + "<div id='enlarge-image-content' style='margin-left: -1000%'>" + "<a class='close-enlarge' style='background: url(/climatechange/images/close-overlay.png) no-repeat scroll 5px 2px transparent; display: block; height: 20px; width: 20px; position: relative; margin: 0 auto;' href='#'></a>" + "<div id='enlarge-image-caption' style='width: 0px; margin: 0 auto; background: none repeat scroll 0 0 #F4F4F4; border: 1px solid #DDDDDD; '>" + "<img id='large-image' src='" + image + "'/>" + "<p class='caption' style='padding: 2px 4px;'>" + captionText + "</p>" + "</div>" + "</div>" + "</div>" + "</div>");
	$('#large-image').load(function () {
		$('#enlarge-image-caption').css("width", $(this).width());

		var overlayHeight = $('#enlarge-overlay').height();
		var contentViewHeight = $('#enlarge-image-content').height();
		if (contentViewHeight > overlayHeight) {
			$('#enlarge-image-content').css("margin-top", (overlayHeight / 2 * -1) + "px");
			$('#enlarge-image-caption').css("max-height", overlayHeight - 20 + "px");
			$('#enlarge-image-caption').css("overflow-y", "scroll");
		} else {
			$('#enlarge-image-content').css("margin-top", (contentViewHeight / 2 * -1) + "px");
		}
		if ($(this).width() > $('#enlarge-overlay').width()) {
			$('#enlarge-image-caption').css("max-width", $('#enlarge-overlay').width() - 20 + "px");
			$('#enlarge-image-caption').css("overflow-x", "scroll");
		}
		$('.close-enlarge').css("left", ($('#enlarge-image-caption').width() / 2 - 10) + "px"); //20 is the width of the close link
		$('#enlarge-image-content').css("margin-left", "0px");
		$("#enlarge-image-loading").remove();
		$('#enlarge-image-content').fadeIn();
	});
	$('.close-enlarge').click(function () {
		$('#enlarge-overlay').remove();
		return false;
	});
	return false;
}));

$(".contentLightbox").hide();
$('.contentLightboxLink').live("click", (function () {
	var lightboxDivID = "#" + $(this).attr('title');
	if (lightboxDivID) {
		$('body').prepend(
			"<div id='contentLightbox-overlay' style='background: url(../images/overlay.png) repeat scroll left top transparent; bottom: 0; left: 0; position: fixed; right: 0; text-align: center; top: 0; width: 100%; z-index: 45;'>" + "<div id='contentLightbox-overlay-horizon' style='display: block; height: 1px; left: 0; overflow: visible; position: absolute; text-align: center; top: 50%; width: 100%;'>" + "<div id='contentLightbox-container' style='margin-left: 0;'>" + "<a class='close-contentLightbox' style='background: url(/climatechange/images/close-overlay.png) no-repeat scroll 5px 2px transparent; display: block; height: 20px; width: 20px; position: relative; margin: 0 auto; top: 21px; left: 461px' href='#'></a>" + "<div id='contentLightbox-content' style='text-align: left; overflow-y: scroll; padding: 10px 20px; width: 0px; margin: 0 auto; background: none repeat scroll 0 0 #FFF; border: 1px solid #DDDDDD; width: 940px;'>" + "</div>" + "</div>" + "</div>" + "</div>");
		$("#contentLightbox-content").css("max-height", $('#contentLightbox-overlay').height() - 50 + 'px');
		$("#contentLightbox-content").html($(lightboxDivID).html());

		$('#contentLightbox-container').css("margin-top", ($('#contentLightbox-container').height() / 2 * -1 - 10) + "px");
		$("#contentLightbox-overlay").fadeIn();

		$('.close-contentLightbox').click(function () {
			$('#contentLightbox-overlay').remove();
			return false;
		});
	}
	return false;
}));

$("#contentLightbox-content a").live("click", function () {
	if ($(this).attr("href").indexOf("#ref") == 0) {
		$('#contentLightbox-overlay').remove();
	}
});
//Impacts and Adaptation section
$("#impacts h2").hide();
var adaptHash = "#adapt";
var impactsHash = "#impacts";
$(adaptHash + " h2").hide();
$(".innerNavigation.InA").show();
var hash = "";
if (window.location.href.indexOf("#") > -1) {
	hash = window.location.href.substring(window.location.href.indexOf("#"))
}
if (hash.length > 0 && (hash == adaptHash || $(adaptHash).children(hash).length > 0)) {
	$(impactsHash).hide();
	$(".innerNavigation.InA li.selected").removeClass("selected");
	$(".innerNavigation.InA a:[href$=" + adaptHash + "]").parent().addClass("selected");
	$(adaptHash).show();
} else {
	$(adaptHash).hide();
	$(".innerNavigation.InA a:[href$=" + impactsHash + "]").parent().addClass("selected");
	$(impactsHash).show();
}

if ($(".innerNavigation.InA").length > 0) {
	//a:[href$='"+impactsHash+"'], a:[href$='"+adaptHash+"']
	$("a").click(function () {
		if ($(this).attr("href").indexOf(impactsHash) > -1 || $(this).attr("href").indexOf(adaptHash) > -1) {
			if ($(this).attr("href").indexOf(impactsHash) > -1) {
				showInA(impactsHash);
			}
			if ($(this).attr("href").indexOf(adaptHash) > -1) {
				showInA(adaptHash);
			}
			var beforeScroll = (document.documentElement.scrollTop);
			window.location.hash = $(this).attr("href");
			if ($(this).parent().parent().parent().hasClass("innerNavigation")) {
				document.documentElement.scrollTop = beforeScroll;
				return false;
			}
		}
	});

	$(".innerNavigation.InA li").click(function () {
		showInA($($(this).children("a")[0]).attr("href"));
	});

	function showInA(anchorLink) {
		var navLi = $('.innerNavigation.InA a:[href$="' + anchorLink + '"]').parent();
		if (!$(navLi).hasClass("selected")) {

			$(".innerNavigation.InA li.selected").removeClass("selected");
			$(".innerNavigation.InA a:[href$=" + anchorLink + "]").parent().addClass("selected");

			if (anchorLink == impactsHash) {
				$(anchorLink).show();
				$(adaptHash).hide();
			} else {
				$(anchorLink).show();
				$(impactsHash).hide();
				if (_gaq) {
					var region = $($('h2').get(0)).html();
					_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Adaptation Tab - Click', region]);
				}
			}
		}
	}
}

//impacts and adaptation map
var hoverTimeout;
if ($(".USMap").length > 0) {
	$(".USMap > div").hover(
		function () {
			$(".mapHoverText").hide();
			$(this).children(".mapHoverText").fadeIn();
			var divID = this.id;
			hoverTimeout = setTimeout(function () {
			    _gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Impacts Map - Map Hover', $("#" + divID + " .mapHoverText h5").html()]);
			}, 3000);
		},
		function () {
			$(this).children(".mapHoverText").fadeOut();
			clearTimeout(hoverTimeout);
		}
	);
	$(".USMap > div a").click(function () {
	    //_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Impacts Map - Map Click', $(this).html()]);
	});
	$(".boxMain.map .links a").click(function () {
	    _gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Impacts Map - Footer Link Click', $(this).html()]);
	});
	$(".links.smallMap a").click(function () {
	    _gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Impacts Map - Footer Link Click', $(this).html()]);
	});
}


if ($("#questionFactsPage").length > 0) {
	var openCloseTime = 500;
	$(".QnAcontainer > div").each(function () {
		$(this).css("height", $($(this).children("h3").first()).outerHeight() - 10 + "px");
		$($(this).children("h3")).after("<a href='#' class='more'>Answer</a>");
		$($(this).children(".answer")).after("<a href='#' class='less'>Close</a>");
	});
	$(".QnAcontainer h3").click(function () {
		if ($(this).parent().hasClass("expanded")) {
			$($(this).parent()).animate({
				height: $(this).outerHeight() - 10 + "px"
			}, openCloseTime, function () {
				$(this).removeClass("expanded");
				$($(this).children("h3")).after("<a href='#' class='more'>Answer</a>");
			});
		} else {
			if ($("#questionFactsPage .showLess").length == 0)
				$(".QnAcontainer .expanded").each(function () {
					$(this).animate({
						height: $(this).children("h3").outerHeight() - 8 + "px"
					}, openCloseTime, function () {
						$(this).removeClass("expanded");
						$($(this).children("h3")).after("<a href='#' class='more'>Answer</a>");
					});
				});
			$(this).parent().children('.more').remove();

			$($(this).parent()).animate({
				height: $(this).parent().height() + $($(this).parent().children(".answer")).height() + 28 + 'px'
			}, openCloseTime);
			$(this).parent().addClass("expanded");
			_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Facts Page - Expand', $(this).html()]);

		}
	});
	$(".QnAcontainer .more, .QnAcontainer .less").live("click", function () {
		$(this).parent().children("h3").trigger('click');
		return false;
	});
	$("#questionFactsPage .showAll").live("click", function () {
		$(this).removeClass("showAll");
		$(this).addClass("showLess");
		$(this).html("&ndash; Collapse All");
		$(".QnAcontainer > div").each(function () {
			if (!$(this).hasClass("expanded")) {
				$(this).addClass("expanded");
				$(this).children('.more').remove();
				$(this).animate({
					height: $(this).height() + $($(this).children(".answer")).height() + 28 + 'px'
				}, openCloseTime);
			}
		});
		_gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Facts Page - Expand All', '']);
	});
	$("#questionFactsPage .showLess").live("click", function () {
		$(this).removeClass("showLess");
		$(this).addClass("showAll");
		$(this).html("+ Show All Responses");
		$(".QnAcontainer > div").each(function () {
			if ($(this).hasClass("expanded")) {
				$($(this)).animate({
					height: $(this).children("h3").outerHeight() - 10 + "px"
				}, openCloseTime, function () {
					$(this).removeClass("expanded");
					$($(this).children("h3")).after("<a href='#' class='more'>Answer</a>");
				});
			}
		});
	});
}

$('#share li a').live('click', function () {
    _gaq.push(['_trackEvent', 'Climate Change Pages - Special Events', 'Share - Click', $(this).html()]);
});

$(function () {
	$(".accordion-title").click(function (e) {
		e.preventDefault();
		toggleAccordion(this);
	});
	if(window.location.hash !== ""){
		hashEvent(window.location.hash);
	}
	window.onhashchange = function(){
		hashEvent(window.location.hash);
	};
	
});


function hashEvent(hash){
	var getLink = $('a[href="' + hash + '"][class="accordion-title"]')[0];
	if(typeof getLink !== "undefined"){
		toggleAccordion(getLink);
	}
}

function toggleAccordion(obj){
	$(obj).toggleClass("active");
	$(obj).next(".accordion-pane").toggle("slow");
	$('html, body').animate({
		scrollTop: $(obj).offset().top
	}, 1000);
}