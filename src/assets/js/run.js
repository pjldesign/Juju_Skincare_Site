jQuery(document).ready(function($) {


    function widgetsInit() {
        initResize();
        initSkrollr();
        initRS();
    };

    function widgetsRefresh() {
        BackgroundCheck.refresh();
        $.scrollify.update()
    };

    //
    // MMENU
    //

    $(".shopping-bag").mmenu({
        extensions: [
            "pagedim-black"
        ],
        offCanvas: {
            "position": "right",
            "pageSelector": "#site-container"
        },
        iconPanels: true
    });
    var m_menu = $(".shopping-bag").data("mmenu");

    $("#shopping-bag-toggle").click(function() {
        m_menu.open();
    });

    ///////////////////////////// RESIZE CONTENT TO FIT WINDOW

    function initResize() {

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

                //
                //BACKGROUNDCHECK
                //

                BackgroundCheck.init({
                    targets: '.ui'
                });
                BackgroundCheck.refresh();
            }
        });
    };
    initResize();

    //
    // ROYALSLIDER
    //

    function initRS() {

        $('#heroSlider').css("display", "block");
        $('#heroSlider').royalSlider({
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
                $('#mobileProductSlider').royalSlider({
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
                $('#productSlider').css("display", "block");
                $('#productSlider').royalSlider({
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
        $('.rsGCaption').appendTo('section#second #product-caption');
    };
    initRS();

    //
    //COLOURBRIGHTNESS/SCROLLIFY
    //

    function initScrollify() {

        $('.quote-block').colourBrightness();
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
            target: '#introblock'
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
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: true,
            standardScrollElements: "",
            before: function() {},
            after: function() { currentSlide(); },
            afterResize: function() {},
            afterRender: function() {}
        });

        // scrollify sidenav
        var slides = $("section");

        var navigation = '<ul id="sidenav" class="ui"></ul>';

        $("body").append(navigation);

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
    };
    initScrollify();

    //Story cell position reversals for >1024
    $('#third .cell:visible').filter(function(index) {
        return !((index + 1) % 2);
    }).addClass('right');

    //
    // SKROLLR
    //

    function initSkrollr() {

        if ($(window).width() > 1024) {
            setTimeout(function() {
                var s = skrollr.init({
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
    };
    initSkrollr();

    //
    //KLOSSARY
    //

    $('.nourishing_scrub').klossary({
        dataPath: 'assets/json/nourishing_scrub.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('.gentle_cleanser').klossary({
        dataPath: 'assets/json/gentle_cleanser.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('.replenishing_toner').klossary({
        dataPath: 'assets/json/replenishing_toner.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('.dry_skin_serum').klossary({
        dataPath: 'assets/json/dry_skin_serum.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('.eye_serum').klossary({
        dataPath: 'assets/json/eye_serum.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('.face_cream').klossary({
        dataPath: 'assets/json/face_cream.json',
        selectBoxClass: 'glossary_select',
        onselectChange: function() {
            // alert("hellow");
        },
        onResultsChange: function() {
            // alert("rs");
        }
    });
    $('#glossary-block .tabs-panel .glossary_select').customSelectMenu({
        menuClass: 'product-select',
        openedClass: 'shown',
        selectedClass: 'active',
        selectionMadeClass: 'selected'
    });
});
