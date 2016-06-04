$(document).ready(function() {

    // Check the scroll position of element
    function checkScroll(_ref) {
        var target = _ref.target;
        var $elem = $(target);
        var result = {};
        if ($elem[0].scrollHeight - $elem.scrollTop() === $elem.outerHeight()) {
            result.bottom = true;
        }
        if ($elem.scrollTop() === 0) {
            result.top = true;
        }
        return result;
    };
    //Get colourBrightness
    $('.quote-block').colourBrightness();
    //Update topBar class based on colorBrightness
    function getLight(block) {
        var prefix = "bgc--";
        return $(".quote-block").hasClass("dark") ? (prefix + "dark") :
            $(".quote-block").hasClass("light") ? (prefix + "light") : "";
    };
    $('#main-content').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors: [],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: [],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'left',
        sectionsColor: [],

        //Scrolling
        hybrid: true,
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 500,
        scrollBar: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: false,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize: false,
        sectionsColor: [],
        paddingTop: '0',
        paddingBottom: '0',
        fixedElements: '.top-bar, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '',

        //Custom methods
        onLeave: function(index, nextIndex, direction) {
            var menu = $("#menu");
            //after leaving section 1
            if (index === 1 && direction === 'down') {
                console.log("Going to section 2!");
                menu.addClass(getLight());
            };
            //after leaving section 2 (quote-block 1)
            if (index == 2 && direction == 'up') {
                menu.removeClass(getLight());
            } else if (index == 2 && direction == 'down') {
                menu.removeClass(getLight());
            };
            //after leaving section 3
            if (index === 3 && direction === 'up') {
                menu.addClass(getLight());
            } else if (index == 3 && direction == 'down') {
                menu.addClass(getLight());
            };
            //after leaving section 4 (quote-block 2)
            if (index == 4 && direction == 'up') {
                menu.removeClass(getLight());
            } else if (index == 4 && direction == 'down') {
                menu.removeClass(getLight());
            };
            //after leaving section 5 (story section)
            if (index === 1 && direction === 'up') {
                menu.addClass(getLight());
            };

            // //Remove story block from fullPage flow
            // if (index === 5 && direction === 'up') {
            //     var story = checkScroll({
            //         target: '#third .story-content-wrapper'
            //     });
            //     if (story.top) {
            //         return false;
            //     }
            // }
        }
    });
});
