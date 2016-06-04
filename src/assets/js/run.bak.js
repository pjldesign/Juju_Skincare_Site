jQuery(document).ready(function($) {

    ///////////////////////////// MMENU

    $("#shopping-bag").mmenu({
        "extensions": [
            "pagedim-black"
        ],
        "offCanvas": {
            "position": "right"
        },
        "iconPanels": true
    });
    var API = $("#shopping-bag").data("mmenu");

    $("#shopping-bag-toggle").click(function() {
        API.open();
    });

    ///////////////////////////// ROYALSLIDER

    var win = $(window);
    var resize = function() {
        $('.royalSlider').css({
            width: $(window).width(),
            height: $(window).height()
        });
    };

    $(window).on('resize', resize);
    resize();

    $('#heroSlider').css("display", "block");
    var hs = $('#heroSlider').royalSlider({
        autoPlay: {
            enabled: false,
            pauseOnHover: false,
            stopAtAction: false,
            delay: 5000
        },
        arrowsNav: true,
        addActiveClass: true,
        arrowsNavAutoHide: false,
        arrowsNavHideOnTouch: false,
        sliderDrag: false,
        fadeinLoadedSlide: true,
        loop: true,
        keyboardNavEnabled: true,
        controlsInside: true,
        imageScaleMode: 'fill',
        autoScaleSlider: false,
        controlNavigation: 'arrows',
        navigateByClick: false,
        startSlideId: 0,
        transitionType: 'fade',
        transitionSpeed: 600,
        globalCaption: true,
        globalCaptionInside: false,
        imgWidth: 2560,
        imgHeight: 1440,
        numImagesToPreload: 1
    });

    $('#productSlider').css("display", "block");
    var ps = $('#productSlider').royalSlider({
        addActiveClass: true,
        arrowsNav: true,
        arrowsNavAutoHide: false,
        arrowsNavHideOnTouch: true,
        controlNavigation: 'arrows',
        autoScaleSlider: true,
        autoScaleSliderWidth: 2000,
        autoScaleSliderHeight: 700,
        loop: true,
        fadeinLoadedSlide: false,
        globalCaption: true,
        keyboardNavEnabled: true,
        globalCaptionInside: false,
        visibleNearby: {
            enabled: true,
            centerArea: 0.4,
            center: true,
            breakpoint: 650,
            breakpointCenterArea: 0.64,
            navigateByCenterClick: false
        }
    });
    $('.rsGCaption').appendTo('section#second #product-caption');

    ///////////////////////////// SKROLLR

    $('#about-block .cell').css('display', 'block');
    // var winY = $(window).height();
    // var winX = $(window).width();
    // $('section').height (winY);
    // (function($) {
        // Init Skrollr
        var s = skrollr.init({
            render: function(data) {
                // forceHeight: false,
                //Debugging - Log the current scroll position.
                console.log(data.curTop);
            }
        });
    // })(jQuery);

    // (function($) {

    //     // Setup variables
    //     $window = $(window);
    //     $slide = $('.slide');
    //     $slideTall = $('.slideTall');
    //     $slide2Tall = $('.slide2Tall');
    //     $slide6Tall = $('.slide6Tall');
    //     $slide8Tall = $('.slide8Tall');
    //     $body = $('body');

    //     //FadeIn all sections   
    //     $body.imagesLoaded(function() {
    //         setTimeout(function() {

    //             // Resize sections
    //             adjustWindow();

    //             // Fade in sections
    //             $body.removeClass('loading').addClass('loaded');

    //         }, 800);
    //     });

    //     function adjustWindow() {

    //         // Init Skrollr
    //         var s = skrollr.init({
    //             render: function(data) {
    //                 //Debugging - Log the current scroll position.
    //                 console.log(data.curTop);
    //             }
    //         });

    //         // Get window size
    //         winH = $window.height();

    //         // Keep minimum height 550
    //         if (winH <= 550) {
    //             winH = 550;
    //         }

    //         // Resize our slides
    //         $slide.height(winH);
    //         $slideTall.height(winH * 2);
    //         $slide2Tall.height(winH * 3);
    //         $slide6Tall.height(winH * 6);
    //         $slide8Tall.height(winH * 8);

    //         // Refresh Skrollr after resizing our sections
    //         s.refresh($('.slide'));

    //     }

    // })(jQuery);

    ///////////////////////////// GLOSSARY

    // $('#row3 #wordHolder #glossaryWordDropdown').css('display','block');

    // $('#row3 #wordHolder #glossaryWordDropdown').customSelectMenu({
    //     menuClass: 'product-select',
    //     openedClass: 'shown',
    //     selectedClass: 'active',
    //     selectionMadeClass: 'selected'
    // });

    // CART
    // var pushLink = $('header ul li a.push-link');
    // var drawer = $('header ul li ul');

    // pushLink.click(function() {
    //     drawer.addClass('open');
    // }, function() {
    //     drawer.removeClass('open');
    //     $('nav.global_nav svg').attr('class', '');
    //     return false;
    // });

    // BACKGROUND CHECK

    BackgroundCheck.init({
        targets: '.ui',
    });
    BackgroundCheck.refresh();

    // CENTER PRODUCT IMAGE

    // jQuery.fn.center = function() {
    //     this.css("position", "absolute");
    //     this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
    //         $(window).scrollTop()) + "px");
    //     this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
    //         $(window).scrollLeft()) + "px");
    //     return this;
    // }

    // jQuery.fn.center_bottom = function() {
    //     this.css("position", "absolute");
    //     this.css("bottom", "20%");
    //     this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
    //         $(window).scrollLeft()) + "px");
    //     return this;
    // }

    // $('.shopping-item img').center_bottom();

});
