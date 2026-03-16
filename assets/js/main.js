/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav. (Commented out as this is for single-page scroll navigation and no longer needed for multi-page)
		// var $nav_a = $nav.find('a');

		// $nav_a
		// 	// .addClass('scrolly') // No longer needed for multi-page navigation
		// 	.on('click', function(e) {

		// 		var $this = $(this);

		// 		// External link? Bail.
		// 			// if ($this.attr('href').charAt(0) != '#')
		// 			// 	return; // Keep this part to allow external links, but prevent default for internal # links if any.

		// 		// Prevent default. (Only for internal anchor links if they exist)
		// 			// e.preventDefault();

		// 		// Deactivate all links.
		// 			$nav_a.removeClass('active');

		// 		// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
		// 			$this
		// 				.addClass('active')
		// 				.addClass('active-locked');
		// 	})
		// 	.each(function() {

		// 		var	$this = $(this),
		// 			id = $this.attr('href'),
		// 			$section = $(id);

		// 		// No section for this link? Bail.
		// 			if ($section.length < 1)
		// 				return;

		// 		// Scrollex. (Commented out as no longer single-page scroll)
		// 			// $section.scrollex({
		// 			// 	mode: 'middle',
		// 			// 	top: '-10vh',
		// 			// 	bottom: '-10vh',
		// 			// 	initialize: function() {

		// 			// 		// Deactivate section.
		// 			// 			$section.addClass('inactive');

		// 			// 	},
		// 			// 	enter: function() {

		// 			// 		// Activate section.
		// 			// 			$section.removeClass('inactive');

		// 			// 		// No locked links? Deactivate all links and activate this section's one.
		// 			// 			if ($nav_a.filter('.active-locked').length == 0) {

		// 			// 				$nav_a.removeClass('active');
		// 			// 				$this.addClass('active');

		// 			// 			}

		// 			// 		// Otherwise, if this section's link is the one that's locked, unlock it.
		// 			// 			else if ($this.hasClass('active-locked'))
		// 			// 				$this.removeClass('active-locked');

		// 			// 	}
		// 			// });

		// 	});

	// Scrolly. (Commented out as no longer single-page scroll)
		// $('.scrolly').scrolly();

// Header (narrower + mobile).
$(function() { // Ensure DOM is ready for these manipulations
    console.log("main.js: Header (narrower + mobile) logic executing.");

    // Toggle.
        var $headerToggle = $(
            '<div id="headerToggle">' +
                '<a href="#header" class="toggle"></a>' +
            '</div>'
        );
        if ($body.length) {
            $headerToggle.appendTo($body);
            console.log("main.js: #headerToggle appended to body.");
        } else {
            console.log("main.js: $body not found when trying to append #headerToggle.");
        }


    // Header.
        if ($('#header').length) {
            $('#header')
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'header-visible'
                });
            console.log("main.js: #header panel initialized.");
        } else {
            console.log("main.js: #header not found when trying to initialize panel.");
        }
});

})(jQuery);