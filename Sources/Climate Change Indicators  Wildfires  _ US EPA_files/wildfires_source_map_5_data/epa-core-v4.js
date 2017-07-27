/* EPA's Core JS file, vOneEPA Web
 * 20 June 2012: Added Google Analytics
 * 25 Feb 2014: Share dropdown: added Pinterest and Google+, removed reddit
 * 25 Feb 2014: GA Link Tracking: Added GSA code, colorbox fix, and extended file types tracked
 * 06 Aug 2014: Mailto and Colorbox fixes
 * 30 Oct 2014: Classic GA code removed -- tracking with Universal Analytics only
 * 21 Jan 2015: Added "media" parameter to PinIt share button
 * 02 Mar 2015: Added different Foresee code
 * 25 Jun 2015: Additional UA changes
 * NOTE: jQuery NOT translated to JavaScript in this version
 * Questions? hessling.michael@epa.gov
 */
var epaCore = {
  //Date related functions
  takeYear: function(theDate) { var x = theDate.getYear(); var y = x % 100; y += (y < 38) ? 2000 : 1900; return y; },
  //Bookmarklet popup
  postPopUp: function(url, name, params) { var win = window.open(url, name, params); }
};

/* Start Google Analytics */
// UA: Call the Universal Analytics script from a Google server
/* begin script call */
(function(i,s,o,g,r,a,m){
  i['GoogleAnalyticsObject']=r;
  i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)
  },
  i[r].l=1*new Date();
  a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];
  a.async=1;
  a.src=g;
  m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* end script call */

function loadtracking() {

  /* Get Root Domain- Used for Google Analytics
   * _setDomainName & Cross-Domain Checking & GSA CustomDim2
   */

  var epaGA_hostName= window.location.hostname;
  var epaGA_hostArray= epaGA_hostName.split('.').slice(-2);
  var epaGA_hostDomain= epaGA_hostArray.join('.').toLowerCase();

  /* Get GA Visitor Cookie */
  function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name) {
        return unescape(y);
      }
    }
  } // for ARRcookies loop

  // passToUA
  var cookieX=getCookie("_ga");
  if (cookieX!=null && cookieX!="") {
    var split = cookieX.split(".");
    var gaVisitorID = (split[2]);
    var passToUA = gaVisitorID;
  } else {
    passToUA = "one and done visitor";
  }

  /* START For Cross Domain Tracking Use Visitor ID
   * from __utma or _ga query param instead of cookie
   */
  function getQuerystring(key, default_) {
    if (default_==null) default_="";
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if(qs == null) {
      return default_;
    } else {
      return qs[1];
    }
  } // getQuerystring

  // passToUA
  if(window.location.href.indexOf('_ga') > 1) {
    passToUA = getQuerystring('_ga').split('.')[2];
  } else {
    //nothing
  }
  /* END For Cross Domain Tracking Use Visitor ID */

// Page Level Google Analytics Code

  // UA: create tracker object for EPA Universal property
  ga('create', {
    'trackingId': 'UA-32633028-1',
    'cookieDomain': 'auto',
    'name': 'EPA',
    'allowLinker': true
  });

  // Code to mimic referral exclusion list - NEW as of 6/17/2015
  if ( /(epa(-(otis|echo))?|energystar|airnow|urbanwaters|relocatefeds|lab21century)\.gov|supportportal\.com|enviroflash\.info/.test(document.referrer) ) {
      ga('EPA.set','referrer','');
  }

  // UA: track page view and send custom dimension
  ga('EPA.set', {
    'dimension1': passToUA,
    'dimension18': 'EPA 2.0 150618',
    'dimension19': 'epa-core-v4.js'
  });
  ga('EPA.send', 'pageview');

  // Parallel tracking to GSA

  ga('create', {
    'trackingId': 'UA-33523145-1',
    'cookieDomain': 'auto',
    'name': 'GSA',
    'allowLinker': true
  });

  // Code to mimic referral exclusion list - NEW as of 6/17/2015
  if ( /(epa(-(otis|echo))?|energystar|airnow|urbanwaters|relocatefeds|lab21century)\.gov|supportportal\.com|enviroflash\.info/.test(document.referrer) ) {
      ga('GSA.set','referrer','');
  }

  // UA: track page view and send custom dimensions to GSA

  ga('GSA.set', {
    'dimension1': 'EPA',
    'dimension2': 'EPA - ' + epaGA_hostName,
    'dimension3': 'EPA 2.0 150618'
  });

  ga('GSA.send', 'pageview');

  /* Google Analytics Download and
   * External Link & Mailto & Cross Domain Tracking
   */

  //Helper function to safely attach to a link
  var unobtrusiveAddEvent = function (element, event, fn) {
    try {
      var old = element[event] ? element[event] : function () {};
      element[event] = function () {fn.call(this);return old.call(this);};
    } catch (err) { }
  };

  function trackDownloads() {
    var myLinks = document.links;

    //Specify Filetypes Tracked
    var fileTypes = ['ai', 'csv', 'dmg', 'doc', 'docx', 'eps', 'exe', 'gif', 'ico', 'jpeg', 'jpg', 'json', 'kml', 'mp3', 'msi', 'pdf', 'png', 'ppt', 'pptx', 'psd', 'rar', 'smi', 'swf', 'tif', 'txt', 'xls', 'xlsm', 'xlsx', 'xml', 'xsd', 'zip'];

    //Specify Cross Domains Tracked
    var crossDomains = ['epa.gov','epa-otis.gov','epa-echo.gov','echo.epa.gov','energystar.gov','enviroflash.info','airnow.gov','urbanwaters.gov','relocatefeds.gov','lab21century.gov','supportportal.com'];
    var crossDomainExclude = ['http://oaspub.epa.gov/enviro/fii_query_dtl.disp_program_facility','http://iaspub.epa.gov/enviro/tsca.get_chem_info','http://iaspub.epa.gov/enviro/ICIS_DETAIL_REPORTS_NPDESID.icis_tst','http://oaspub.epa.gov/enviro/tris_control.tris_print', 'https://www.epa.gov/myenv/myenview2.html','https://www.epa.gov/emefdata/em4ef.html','http://nepassisttool.epa.gov/nepassist/nepamap.aspx','http://nepassist.epa.gov/nepave/nepamap.aspx','cfpub.epa.gov','yosemite.epa.gov','iaspub.epa.gov','oaspub.epa.gov','ofmpub.epa.gov','watersgeo.epa.gov','cfpub2.epa.gov','cumulis.epa.gov','cfpub1.epa.gov','actor.epa.gov','nepis.epa.gov','yosemite1.epa.gov','ofmext.epa.gov','epamap32.epa.gov','gispub2.epa.gov','gispub6.epa.gov','epamap10.epa.gov','epamap21.epa.gov','maps6.epa.gov','http://ghgdata.epa.gov/ghgp/main.do'];

    var theLink ='';
    var theValue = '';
    var theType = '';
    var theTarget = '';

    function track(type, theLink, val1, target){
      var cbox_check1 = "colorbox";
      var cbox_check2 = "cbox";
      if(target == ""){
        target = "_self";
      }
      // UA: new lines rewrite _gaq.push as ga(send)
      try {
        if(type == "Email") {
          setTimeout("window.open('" + theLink.href + "','_self')", 150);
          ga('EPA.send', 'event', type, 'Link Click', val1);
          ga('GSA.send', 'event', type, 'Link Click', val1);
        }
        else if(type == "Download") {
          if (theLink.className.indexOf(cbox_check1) == -1 && theLink.className.indexOf(cbox_check2) == -1) {
            setTimeout("window.open('"+theLink.href+"','"+ target+"')", 150);
          }
          ga('EPA.send', 'event', type, val1 + ' Click', theLink.href);
          ga('GSA.send', 'event', type, val1 + ' Click', theLink.href);
        }
        else if(type == "External" && document.location.hostname != theLink.hostname) {
          if (theLink.className.indexOf(cbox_check1) == -1 && theLink.className.indexOf(cbox_check2) == -1) {
            setTimeout("window.open('"+theLink.href+"','"+ target+"')", 150);
          }
          ga('EPA.send', 'event', type, val1, theLink.href);
          ga('GSA.send', 'event', type, val1, theLink.href);
        }
        else {
          window.open(theLink.href, target);
        }
      } // close try
        catch(e){}
    };//close track()

    for(var i=0;i < myLinks.length;i++) {
      if(myLinks[i].onclick != null || myLinks[i].href.indexOf("javascript:") > -1) {
        continue;
      }
      var download = false;
      for(var k=0;k < fileTypes.length; k++) {
        if(myLinks[i].href.indexOf("." + fileTypes[k]) > -1) {
          theLink = myLinks[i];
          theValue = fileTypes[k];
          theTarget = myLinks[i].target;
          theType = "Download";
          theTarget = myLinks[i].target;
          var f =function(theType, theLink, theValue, theTarget) {
            return function() {
              track(theType, theLink, theValue, theTarget);
              return false;
            };
          }(theType, theLink, theValue, theTarget);
          myLinks[i].onclick = f;
          download = true;
          break;
        }//close ifmyLinks href
      }//close fileTypesLoop

      if(download == false) {
        if(myLinks[i].href.indexOf("mailto:") > -1) {
          theLink = myLinks[i];
          theTarget = null;
          theValue = myLinks[i].href.slice(7);
          theType = "Email";
          var g = function(theType, theLink, theValue, theTarget) {
            return function(){
              track(theType, theLink, theValue, theTarget);
              return false;
            };
          }(theType, theLink, theValue, theTarget);
          myLinks[i].onclick = g;
        }//close ifmyLinks Mail
        else {
          //Cross Domain
          var crossDomain = false;
          for(c=0;c < crossDomains.length; c++) {
            if((myLinks[i].href.indexOf(crossDomains[c]) > -1) && (myLinks[i].href.indexOf(epaGA_hostDomain) == -1)) {
              myLinks[i].onclick = function() {
                for(b=0;b < crossDomainExclude.length; b++) {
                  if(this.href.indexOf(crossDomainExclude[b]) > -1) {
                    target = this.target;
                    if(target == "") {
                      target = "_self";
                    }
                    setTimeout("window.open('"+this.href+"','"+ target+"')", 150);
                    ga('EPA.send', 'event', 'External', 'Link Click', this.href);
                    ga('GSA.send', 'event', 'External', 'Link Click', this.href);
                    return false;
                  } // if crossDomainExclude
                } //for CrossDomainExclude
                ga('EPA.send', 'event', 'crossDomain', 'Link Click', this.href);
                ga('GSA.send', 'event', 'crossDomain', 'Link Click', this.href);

                // UA: decorate the destination URL
                var trackers = ga.getAll();
                var linker = new window.gaplugins.Linker(trackers[0]);
                var destinationUrl = linker.decorate(this.href);

                // follow the link in the same window or a new window
                if (this.target == '_self' || this.target == '') {
                  window.location=destinationUrl;
                } else {
                  window.open(destinationUrl, this.target);
                }
                return false;
              }; //myLinks onClick function
              crossDomain = true;
              break;
            } // if myLinks crossDomains
          } // for crossDomains
          //External
          if((crossDomain == false) && (myLinks[i].href.indexOf(epaGA_hostDomain) == -1)) {
            theLink = myLinks[i];
            theTarget = myLinks[i].target;
            theValue = "Link Click";
            theType = "External";
            var h = function(theType, theLink, theValue, theTarget) {
              return function(){
                track(theType, theLink, theValue, theTarget);
                return false;
              };
            }(theType, theLink, theValue, theTarget);
            myLinks[i].onclick = h;
          } //close if ExternalLink
        } // close if else crossDomain
      }  //close if download false
    } //close myLinks for Loop
  } //close trackDownloads

  unobtrusiveAddEvent(window, 'onload', trackDownloads);
  /* END Google Analytics Download */
} // loadtracking

loadtracking();
// End Google Analytics

// Use jQuery no conflict
// EPA core stuff below

// Answers (ForeSee) Services Embed Script v1.02
// DO NOT MODIFY BELOW THIS LINE *****************************************
;(function (g) {
    var d = document, i, am = d.createElement('script'), h = d.head || d.getElementsByTagName("head")[0],
        aex = {
            "src": "//gateway.answerscloud.com/epa-gov/production/gateway.min.js",
            "type": "text/javascript",
            "async": "true",
            "data-vendor": "acs",
            "data-role": "gateway"
        };
    for (var attr in aex) { am.setAttribute(attr,aex[attr]); }
    h.appendChild(am);
    g['acsReady'] = function () {var aT = '__acsReady__', args = Array.prototype.slice.call(arguments, 0),k = setInterval(function () {if (typeof g[aT] === 'function') {clearInterval(k);for (i = 0; i < args.length; i++) {g[aT].call(g, function(fn) { return function() { setTimeout(fn, 1) };}(args[i]));}}}, 50);};
})(window);
// DO NOT MODIFY ABOVE THIS LINE *****************************************

jQuery(document).ready(function() {

  // Load Notice Script
  var ns = document.createElement('script');
  ns.async;
  ns.src = 'https://www3.epa.gov/epahome/notice.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ns, s);

  //Search Autosuggest
  var sb = jQuery("#searchbox");
  if (sb[0]) {
    sb.autocomplete("/autocomplete",{minChars:2,delay:200,matchSubset:false,selectFirst:false}).result(function (event, data, formatted) {
      jQuery('#EPAsearch').submit();
    });
  }

  //Stripe all tables with class="zebra"
  var t = jQuery('table.zebra tr:even');
  if (t[0]) { t.addClass('tint'); }

  //Date last modified
  if (document.lastModified == "") { var d = new Date(); }
  else { var d = new Date(document.lastModified); }
  var updated = document.createElement('p'); updated.id = 'date';
  updated.appendChild(document.createTextNode('Last updated on ' + d.toLocaleDateString()));
  var f = document.getElementById('footer');
  f.appendChild(updated);
  //Page URL
  var page_URL = document.createElement('p'); page_URL.id = 'url';
  page_URL.appendChild(document.createTextNode(window.location.href));
  f.appendChild(page_URL);

  //NEW! icon
  var x = new Date(); var today = new Date(x.toGMTString());
  var now = (Date.UTC(epaCore.takeYear(today),today.getMonth(),today.getDate(),0,0,0))/86400000;
  $("ins").each(function(i) {
    var a = $(this).attr('datetime'); var b = a.split('-');
    var posted = (Date.UTC(b[0],b[1],b[2],0,0,0))/86400000;
    var time_left = posted - (now + 1);
    if (time_left < 31  &&  time_left > 0) {
      $(this).prepend("<img src='https://www3.epa.gov/epafiles/images/new-en.gif' alt='New!' width='34' height='16'/>");
    }
  });

  // Share Bookmarklet
  jQuery('#content').append('<ul id="share"><li><a href="#area">Share</a></li></ul>');
  var bookmarkList = '<ul><li class="facebook"><a href="#area" title="facebook">Facebook</a></li><li class="gplus"><a href="#area" title="gplus">Google+</a></li><li class="pin"><a href="#area" title="pin">Pinterest</a></li><li class="twitter"><a href="#area" title="twitter">Twitter</a></li></ul>';
  jQuery('#share li').append(bookmarkList).hover(function() {jQuery(this).addClass("on");}, function() {jQuery(this).removeClass("on");});
  jQuery("#share li ul li a").click(function () {
    var site = jQuery(this).attr('title');
    var popURL = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    var pin_media = encodeURIComponent('https://www.epa.gov/sites/all/themes/epa/img/epa-seal.png');
    switch (site) {
      case "facebook":
        ga('EPA.send', 'social', 'facebook', 'share click', popURL);
        ga('EPA.send', 'event', 'Share', 'facebook', popURL);
        epaCore.postPopUp('https://www.facebook.com/sharer.php?u='+popURL+'&t='+title, 'facebook', 'height=436,width=646,scrollbars=yes,resizable=yes');
        break;
      case "gplus":
        ga('EPA.send', 'social', 'gplus', 'share click', popURL);
        ga('EPA.send', 'event', 'Share', 'gplus', popURL);
        epaCore.postPopUp('https://plus.google.com/share?url='+popURL, 'gplus', 'height=375,width=550,scrollbars=yes,resizable=yes');
        break;
      case "pin":
        ga('EPA.send', 'social', 'pin', 'share click', popURL);
        ga('EPA.send', 'event', 'Share', 'pin', popURL);
        epaCore.postPopUp('https://pinterest.com/pin/create/button/?url='+popURL+'&description='+title+'&media='+pin_media, 'pin', 'height=375,width=550,scrollbars=yes,resizable=yes');
        break;
      case "twitter":
        ga('EPA.send', 'social', 'twitter', 'share click', popURL);
        ga('EPA.send', 'event', 'Share', 'twitter', popURL);
        epaCore.postPopUp('https://twitter.com/share?text='+title+'&url='+popURL+'&via=EPA&count=none&lang=en', 'twitter', 'height=375,width=550,scrollbars=yes,resizable=yes');
        break;
    }
  });

}); //jQuery
