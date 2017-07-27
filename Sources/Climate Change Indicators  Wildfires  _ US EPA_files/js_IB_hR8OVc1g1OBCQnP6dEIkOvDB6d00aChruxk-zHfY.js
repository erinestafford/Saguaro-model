(function ($, Drupal) {

// Remove no-js class
Drupal.behaviors.epa = {
  attach: function (context) {
    $('html.no-js', context).removeClass('no-js');
  }
};

// Accessible skiplinks
Drupal.behaviors.skiplinks = {
  attach: function (context) {
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;

    // Set tabindex on the skiplink targets so IE knows they are focusable, and
    // so Webkit browsers will focus() them.
    $('#main-content, #site-navigation', context).attr('tabindex', -1);

    // Set focus to skiplink targets in Webkit and Opera.
    if (isWebkit || isOpera) {
      $('.skip-links a[href^="#"]', context).click(function() {
        var clickAnchor = '#' + this.href.split('#')[1];
        $(clickAnchor).focus();
      });
    }
  }
};

// Add 'new' class if content is less than 30 days old.
Drupal.behaviors.epaNew = {
  attach: function (context) {
    var now = new Date();
    now = now.getTime();

    $('ins[data-date]', context).each(function () {
      var data = $(this).data(),
        offset = 30 * 24 * 60 * 60 * 1000,
        date = data.date.replace(/\,/g, '/'), // Replace , with / for IE9.
        expired = Date.parse(date) + offset;

      if (now < expired) {
        $(this).addClass('new');
      }
    });
  }
};

// Use jQuery tablesorter plugin.
Drupal.behaviors.tablesorter = {
  attach: function (context) {
    $('table.tablesorter', context).tablesorter();
  }
};

// Add simple accordion behavior.
Drupal.behaviors.accordion = {
  attach: function (context) {
    $('.accordion', context).each(function () {
      var $titles = $(this).find('.accordion-title'),
          $panes = $titles.next('.accordion-pane');
      $panes.addClass('is-closed');
      $titles.each(function () {
        var $target = $(this).next('.accordion-pane');
        $(this).click(function (e) {
          if(!$(this).hasClass('is-active')) {
            $titles.removeClass('is-active');
            $panes.addClass('is-closed');
            $(this).addClass('is-active');
            $target.removeClass('is-closed');
          }
          else {
            $(this).removeClass('is-active');
            $target.addClass('is-closed');
          }
          e.preventDefault();
        });
      });
    });
  }
};

// Move header images before .pane-content.
Drupal.behaviors.headerImages = {
  attach: function (context) {
    $('.box', context).each(function() {
        var $image = $('.image.view-mode-block_header:not(.caption, .block_header-processed)', this).first(),
            $box = $(this);

        // Avoid processing this again in the case of nested boxes.
        $image.addClass("block_header-processed");
        $image.detach();
        $box.prepend($image);
    });
  }
};

Drupal.behaviors.setLoginFocus = {
  attach: function (context) {
    $('body.page-user #edit-name').focus();
  }
};

})(jQuery, Drupal);
;
(function ($) {

// Convert main menu into a mobile menu and move original menu.
Drupal.behaviors.mobileMenu = {
  attach: function (context) {

    // Create mobile menu container, create mobile bar, and clone the main menu.
    var $mobileNav = $('<div id="mobile-nav" class="mobile-nav"></div>'),
        $mobileBar = $('<div class="mobile-bar clearfix"><a class="menu-button" href="#mobile-links">Menu</a></div>'),
        $mobileLinks = $('<div id="mobile-links" class="mobile-links element-hidden"></div>'),
        $mainNav = $('.simple-main-nav', context),
        $secondaryNav = $('.simple-secondary-nav', context),
        $newMenu = $mainNav.find('> .nav__inner > .menu').clone();

    // Reset menu list class and remove second level menu items.
    $newMenu.attr('class', 'menu').find('ul').each(function() {
      $(this).attr('class', 'menu sub-menu');
    });
    $newMenu.find('ul').remove();

    // Insert the cloned menus into the mobile menu container.
    $newMenu.appendTo($mobileLinks);

    // Insert the top bar into mobile menu container.
    $mobileBar.prependTo($mobileNav);

    // Insert the mobile links into mobile menu container.
    $mobileLinks.appendTo($mobileNav);

    // Add mobile menu to the page.
    $('.masthead', context).after($mobileNav);

    // Open/Close mobile menu when menu button is clicked.
    var $mobileMenuWrapper = $('#mobile-nav', context).find('.mobile-links'),
        $mobileMenuLinks = $mobileMenuWrapper.find('a');

    $mobileMenuLinks.attr('tabindex', -1);
    $('.mobile-bar .menu-button', context).click(function(e) {
      $(this).toggleClass('menu-button-active');
      $mobileMenuWrapper.toggleClass('element-hidden');
      // Take mobile menu links out of tab flow if hidden.
      if ($mobileMenuWrapper.hasClass('element-hidden')) {
        $mobileMenuLinks.attr('tabindex', -1);
      }
      else {
        $mobileMenuLinks.removeAttr('tabindex');
      }
      e.preventDefault();
    });

    // Set the height of the menu.
    $mobileMenuWrapper.height($(document).height());

    // Detach original menus and reset classes.
    $mainNav.detach().attr('class', 'nav main-nav clearfix');
    $secondaryNav.detach().attr('class', 'nav secondary-nav');

    // Add pipeline class to secondary menu.
    $secondaryNav.find('.secondary-menu').addClass('pipeline');

    // Move main and secondary menus to the top of the page for wide screens.
    $('.masthead').before($secondaryNav);
    $('.masthead').after($mainNav);
  }
};

})(jQuery);
;
(function ($) {

// Accessible drop-down menus
Drupal.behaviors.dropDownMenu = {
  attach: function (context) {

    var $mainMenu = $('.main-nav', context).find('> .nav__inner > .menu'),
        $topItems = $mainMenu.find('> .menu-item'),
        $topLinks = $topItems.find('> .menu-link'),
        $subLinks = $topItems.find('> .menu > .menu-item > .menu-link');

    // Add ARIA roles to menu elements.
    $mainMenu.attr('role', 'menu');
    $topItems.attr('role', 'presentation');
    $topLinks.attr('role', 'menuitem');

    // Add show-menu class when top links are focused.
    $topLinks.focusin(function () {
      $(this).parent().addClass('show-menu');
    });
    $topLinks.focusout(function () {
      $(this).parent().removeClass('show-menu');
    });

    // Add show-menu class when links are focused.
    $subLinks.focusin(function () {
      $(this).parent().parent().parent().addClass('show-menu');
    });
    $subLinks.focusout(function () {
      $(this).parent().parent().parent().removeClass('show-menu');
    });
  }
};

// hoverIntent
Drupal.behaviors.epaHoverIntent = {
  attach: function (context, settings) {
    if ($().hoverIntent) {
      var config = {
        sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
        interval: 200,   // number = milliseconds of polling interval
        over: Drupal.epa.epaHoverIntentOver,
        timeout: 250,   // number = milliseconds delay before onMouseOut function call
        out: Drupal.epa.epaHoverIntentOut
      };
      $('.main-nav > .nav__inner > .menu > .menu-item').hoverIntent(config);
    }
  }
};

Drupal.epa = Drupal.epa || {};

Drupal.epa.epaHoverIntentOver = function () {
  "use strict";
  $(this).addClass('show-menu');
}

Drupal.epa.epaHoverIntentOut = function() {
  "use strict";
  $(this).removeClass('show-menu');
}

})(jQuery);
;
!function(){if(window&&window.addEventListener){var e,t,n=Object.create(null),o=function(){clearTimeout(t),t=setTimeout(e,100)},i=function(){},r=function(){var e;window.addEventListener("resize",o,!1),window.addEventListener("orientationchange",o,!1),window.MutationObserver?(e=new MutationObserver(o),e.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),i=function(){try{e.disconnect(),window.removeEventListener("resize",o,!1),window.removeEventListener("orientationchange",o,!1)}catch(t){}}):(document.documentElement.addEventListener("DOMSubtreeModified",o,!1),i=function(){document.documentElement.removeEventListener("DOMSubtreeModified",o,!1),window.removeEventListener("resize",o,!1),window.removeEventListener("orientationchange",o,!1)})};e=function(){function e(){--m,0===m&&r()}function t(e){return function(){!0!==n[e.base]&&e.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+e.hash)}}function o(t){return function(){var n=document.body,o=document.createElement("x");t.onload=null,o.innerHTML=t.responseText,(o=o.getElementsByTagName("svg")[0])&&(o.setAttribute("aria-hidden","true"),o.style.position="absolute",o.style.width=0,o.style.height=0,o.style.overflow="hidden",n.insertBefore(o,n.firstChild)),e()}}function d(t){return function(){t.onerror=null,t.ontimeout=null,e()}}var u,s,a,l,c,w,v,m=0;if(window.XMLHttpRequest&&(c=new XMLHttpRequest,c=void 0!==c.withCredentials?XMLHttpRequest:XDomainRequest||void 0),void 0!==c){for(i(),v=document.getElementsByTagName("use"),l=0;l<v.length;l+=1){try{s=v[l].getBoundingClientRect()}catch(h){s=!1}a=v[l].getAttributeNS("http://www.w3.org/1999/xlink","href").split("#"),u=a[0],a=a[1],w=s&&0===s.left&&0===s.right&&0===s.top&&0===s.bottom,s&&0===s.width&&0===s.height&&!w?u.length&&(w=n[u],!0!==w&&setTimeout(t({useEl:v[l],base:u,hash:a}),0),void 0===w&&(w=new c,n[u]=w,w.onload=o(w),w.onerror=d(w),w.ontimeout=d(w),w.open("GET",u),w.send(),m+=1)):w||(void 0===n[u]?n[u]=!0:n[u].onload&&(n[u].abort(),n[u].onload=void 0,n[u]=!0))}v="",m+=1,e()}},window.addEventListener("load",function d(){window.removeEventListener("load",d,!1),t=setTimeout(e,0)},!1)}}();;
