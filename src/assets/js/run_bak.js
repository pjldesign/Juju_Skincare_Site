//
//PJAX
//

$(function() {
    // pjax
    $(document).pjax('a[data-pjax]')
        .on('pjax:start', function() {
            $('.loader').show();
        })
        .on('pjax:end', function() {
            $('.loader').delay(1000).fadeOut();
            $(document).foundation()
        });
});

//
// SMOOTHSTATE
//

// $(function() {
//     'use strict';
//     var options = {
//             debug: true,
//             prefetch: true,
//             cacheLength: 2,
//             blacklist: '.nss',
//             scroll: false,
//             onStart: {
//                 duration: 500,
//                 render: function($container) {
//                     $container.addClass('is-exiting');
//                     smoothState.restartCSSAnimations();
//                 }
//             },
//             onReady: {
//                 duration: 0,
//                 render: function($container, $newContent) {
//                     $container.removeClass('is-exiting');
//                     $container.html($newContent);

//                 }
//             }
//         },
//         smoothState = $('#main-content').smoothState(options).data('smoothState');
// });

///////////////////////////// DOCREADY PLUGINS

$(document).on("ready pjax:end", function() {

    //
    // MMENU
    //

    // $(".shopping-bag").mmenu({
    //     extensions: [
    //         "pagedim-black"
    //     ],
    //     offCanvas: {
    //         "position": "right",
    //         "pageSelector": "#site-container"
    //     },
    //     iconPanels: true
    // });
    // var m_menu = $(".shopping-bag").data("mmenu");

    // $("#shopping-bag-toggle").click(function() {
    //     m_menu.open();
    // });

    ///////////////////////////// RESIZE CONTENT TO FIT WINDOW

    var cell = $('.cell');

    mediaCheck({
        media: '(max-width: 1024px)',
        entry: function() {
            $('.quote-block, .product-page-content').css({
                height: $(window).height()
            });
            $('#heroSlider').css({
                height: $(window).height() - 41,
                "margin-top": "40px"
            });
        }, // END MOBILE MEDIACHECK
        exit: function() {
            var win = $(window);
            var resize = function() {
                $('.royalSlider, #heroSlider, .quote-block, .product-page-content').css({
                    width: $(window).width(),
                    height: $(window).height(),
                    "margin-top": "0"
                });
            };
            $(window).on('resize', resize);
            resize();
            $(window).load(function() {

                //
                //BACKGROUNDCHECK
                //

                BackgroundCheck.init({
                    targets: '.ui'
                });
                BackgroundCheck.refresh();
            });
        }
    });

    //
    // ROYALSLIDER
    //

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
        globalCaption: false,
        globalCaptionInside: true,
        imgWidth: 2560,
        imgHeight: 1540,
        numImagesToPreload: 1
    });

    mediaCheck({
        media: '(max-width: 1024px)',
        entry: function() {
            var mps = $('body#hp #mobileProductSlider').royalSlider({
                addActiveClass: true,
                arrowsNav: true,
                arrowsNavAutoHide: false,
                arrowsNavHideOnTouch: false,
                controlNavigation: 'arrows',
                controlsInside: true,
                imageScaleMode: 'fit',
                autoScaleSlider: false,
                imgWidth: 1445,
                imgHeight: 850,
                loop: true,
                fadeinLoadedSlide: false,
                globalCaption: true,
                keyboardNavEnabled: false,
                navigateByClick: false,
                globalCaptionInside: false
            });
        }, // END MOBILE MEDIACHECK
        exit: function() {
            $('body#hp #productSlider').css("display", "block");
            var ps = $('body#hp #productSlider').royalSlider({
                addActiveClass: true,
                arrowsNav: true,
                arrowsNavAutoHide: false,
                arrowsNavHideOnTouch: true,
                sliderDrag: false,
                controlNavigation: 'arrows',
                autoScaleSlider: false,
                autoScaleSliderWidth: 1900,
                autoScaleSliderHeight: 700,
                loop: true,
                fadeinLoadedSlide: false,
                globalCaption: true,
                keyboardNavEnabled: true,
                globalCaptionInside: false,
                visibleNearby: {
                    enabled: true,
                    centerArea: 0.8,
                    center: true,
                    breakpoint: 650,
                    breakpointCenterArea: 0.64,
                    navigateByCenterClick: false
                }
            });
        }
    });
    $('.rsGCaption').appendTo('body#hp section#second #product-caption');

    //
    //COLOURBRIGHTNESS
    //

    $('body#hp .quote-block').colourBrightness();
    //Update topBar class based on colorBrightness
    function getLight(block) {
        var prefix = "bgc--";
        return $(".quote-block").hasClass("dark") ? (prefix + "dark") :
            $(".quote-block").hasClass("light") ? (prefix + "light") : "";
    };

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
    var menu = $('#menu');
    var quoteInView = checkScroll({
        target: 'body#hp #introblock'
    });
    if (quoteInView.top) {
        $(menu).addClass(getLight());
    } else {
        $(menu).removeClass(getLight());
    }

    //
    // SCROLLIFY
    //

    $.scrollify({
        section: "section",
        sectionName: "section-name",
        setHeights: false,
        easing: "easeOutExpo",
        offset: 0,
        scrollbars: true,
        standardScrollElements: "",
        before: function() {},
        after: function() { currentSlide(); },
        afterResize: function() {},
        afterRender: function() {}
    });

    // scrollify sidenav
    var slides = $("body#hp section");

    var navigation = '<ul id="sidenav" class="ui"></ul>';

    $("body#hp").append(navigation);

    $(slides).each(function() {
        var thisSlide = $(this).index("section") + 1;
        var slideName = $(this).data("section-name");
        var navItem = '<li><a href="#' + slideName + '"></a></li>';

        $("#sidenav").append(navItem);

    });
    // scrollify sidenav functionality
    $("#sidenav a").click(function() {
        var section = $(this).attr('href');
        $.scrollify.move(section);

    });

    function currentSlide() {
        var current = $.scrollify.current();
        $("section").removeClass("current");
        $(current).addClass("current");

        var currentIndex = $(".current").index("section");

        $("#sidenav li").each(function() {

            var navItem = $(this).index();

            if (navItem == currentIndex) {
                $(this).addClass("current");
            } else {
                $(this).removeClass("current");
            }
        });
    }

    currentSlide();

    //Story cell position reversals for >1024
    $('body#hp #third .cell:visible').filter(function(index) {
        return !((index + 1) % 2);
    }).addClass('right');

    ///////////////////////////// WINDOW LOAD PLUGINS

    //
    // SKROLLR/SCROLLIFY
    //

    $(window).load(function() {
        if ($(window).width() > 1024) {
            setTimeout(function() {
                var s = skrollr.init({
                    // beforerender: function(data) {
                    //     return data.direction == 'down';
                    // },
                    // render: function(data) {
                    //     console.log(data.curTop);
                    // },
                    smoothScroll: true,
                    forceHeight: false,
                    constants: {
                        screen: function() {
                            return $(window).height();
                        }
                    }
                });
                $(function() {
                    skrollr.get().refresh();
                });
            }, 3000);
        }
        $(window).on('resize', function() {
            if ($(window).width() <= 1024) {
                skrollr.init().destroy();
            }
        });
    });

    //
    //KLOSSARY
    //

    $('body#gp .nourishing_scrub').klossary({
        dataPath: 'assets/json/nourishing_scrub.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('body#gp .gentle_cleanser').klossary({
        dataPath: 'assets/json/gentle_cleanser.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('body#gp .replenishing_toner').klossary({
        dataPath: 'assets/json/replenishing_toner.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('body#gp .dry_skin_serum').klossary({
        dataPath: 'assets/json/dry_skin_serum.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('body#gp .eye_serum').klossary({
        dataPath: 'assets/json/eye_serum.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('body#gp .face_cream').klossary({
        dataPath: 'assets/json/face_cream.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('body#gp #glossary-block .tabs-panel .glossary_select').customSelectMenu({
        menuClass: 'product-select',
        openedClass: 'shown',
        selectedClass: 'active',
        selectionMadeClass: 'selected'
    });
});
