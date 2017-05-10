document.addEventListener("DOMContentLoaded", preloader);
function preloader() {
    document.querySelector('body').classList.add('loading');
}
(function () {

    "use strict";

    var body = document.querySelector('body'),
        isMobile = false,
        scrollTopPosition,
        browserYou,
        _winWidth = $(window).outerWidth(),
        swiper4, swiper5;
    var genFunc = {

        initialized: false,

        initialize: function () {

            if (this.initialized) return;

            this.initialized = true;

            this.build();
        },

        build: function () {
            // preloader
            if (document.querySelector('.preloader') !== null) {
                this.pagePreloader();
            }

            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Обновите браузер');
            }
            // materialPlagin
            this.materialPlagins();
            // map
            if (document.getElementById('map') !== null) {
                this.mapFunction();
            }
            // swiper
            this.swiperSliders();
            //productSlider
            if (document.querySelector('.product-one-slider__thumb') !== null) {
                this.productSlider();
            }
            //appear
            this.appearFunction();
            //quantityFunc
            if (document.querySelector('.quantity-wrap') !== null) {
                this.quantityFunc();
            }
            this.dropdownFunc();
            //copyright
            this.copyright();
            //validateForm
            this.validateForm();
            //searchFunc
            this.searchFunc();
            //catalogMenu
            this.catalogMenu();
            //mobileMenu
            this.mobileMenu();
            if (document.querySelector('.range-slider') !== null) {
                this.sliderRange();
            }
            if (document.querySelector('.filter-section-top') !== null) {
                this.filterfunction();
            }
            if (document.querySelector('.animate-svg') !== null) {
                this.svganimate();
            }
            if (document.querySelector('.my-order-table') !== null) {
                this.cabinetFunctions();
            }
        },
        cabinetFunctions: function () {
            $('.my-order-table tbody tr').each(function(j,col){
                if($(col).find('.order-list-pr li').length > 1) {
                    $(col).find('.js_view_all').css('display','inline-block');
                }
            });
            $('.order-list-pr').each(function(k,list){
                $(list).find('li:gt(0)').slideUp();
            });
            $(document).on('click','.js_view_all',function(){
                if($(this).hasClass('active')) {
                    $(this).removeClass('active');

                    $(this).parents('tr').find('.order-list-pr').each(function(k_1,list_1){
                        $(list_1).find('li:gt(0)').slideUp();
                    });
                } else {
                    $(this).addClass('active');
                    $(this).parents('tr').find('.order-list-pr').each(function(k_2,list_2){
                        $(list_2).find('li').slideDown();
                    });
                }
            });
        },
        mapFunction: function () {
            if ($('#map').length > 0) {
                var coords = $('#map').data('coords').split(',');
                var myLatlng = new google.maps.LatLng(coords[0], coords[1]);
                var myCenter = new google.maps.LatLng(coords[0], coords[1]);
                var mapOptions = {
                    zoom: 15,
                    center: myCenter,
                    scrollwheel: false,
                    disableDefaultUI: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: 'images/ico-16.png'
                });
            }
        },
        svganimate: function () {
            setTimeout(function(){
                $('.animate-svg').each(function (i, item) {
                    var $svg = $(item).drawsvg({
                        duration: 2000,
                        callback: function () {
                            fillAnim();
                        }
                    });
                    $svg.drawsvg('animate');
                    function fillAnim() {
                        $('.animate-svg').find('path').each(function (k, path) {
                            var fill = $(path).attr('stroke');
                            $(path).attr('fill', fill);
                            $(path).attr('class', 'active');
                        });

                    }
                });
            },2000)

        },
        filterfunction: function () {
            $('.filter-section-top ul li').on('click', function () {
                var _this = $(this).attr('data-category');
                $('.filter-section-top ul li').removeClass('active');
                $(this).addClass('active');
                $('.filter-category').hide();
                $('.filter-category[data-category="' + _this + '"]').show();
                setTimeout(function () {
                    $('.filter-section-body').slideDown(500, function () {

                        heightBlock('.height_');
                    });
                }, 200);

            });
            $(document).on('click', '.js_open_filter', function () {
                $('.filter-section-body').slideToggle(500);
            });
            $(document).on('click', '.js_filter_close', function () {
                $('.filter-section-body').slideUp(500);
                $('.filter-category').hide();
                $('.filter-section-top ul li').removeClass('active');
            });
        },
        sliderRange: function () {
            var sliders = document.querySelectorAll('.range-slider [id]'),
                _thisMin, _thisMax, _thisMinCur, _thisMaxCur;

            for (var i = 0; i < sliders.length; i++) {
                _thisMin = parseInt(sliders[i].getAttribute('data-min')),
                    _thisMax = parseInt(sliders[i].getAttribute('data-max')),
                    _thisMinCur = parseInt(sliders[i].getAttribute('data-slider-min')),
                    _thisMaxCur = parseInt(sliders[i].getAttribute('data-slider-max'));
                if (!_thisMaxCur) {
                    _thisMinCur = _thisMin
                }
                if (!_thisMaxCur) {
                    _thisMaxCur = _thisMax
                }
                noUiSlider.create(sliders[i], {
                    start: [_thisMinCur, _thisMaxCur],
                    connect: true,
                    step: 1,
                    range: {
                        'min': _thisMin,
                        'max': _thisMax
                    },
                    format: wNumb({
                        decimals: 0
                    }),
                    // tooltips: [true, wNumb({decimals: 0})],
                });
                var thisInputFrom = $(sliders[i]).parents('.range-slider').find('.js_from'),
                    thisInputTo = $(sliders[i]).parents('.range-slider').find('.js_to');
                sliders[i].noUiSlider.on('update', function (values, handle) {

                    var value = parseInt(values[handle]);
                    if (handle) {
                        thisInputTo.val(value);
                    } else {
                        thisInputFrom.val(value);
                    }
                });
                var sliderIt = sliders[i];
                document.querySelectorAll('.js_from')[i].addEventListener('change', function () {
                    sliderIt.noUiSlider.set([this.value, null]);
                });

                document.querySelectorAll('.js_to')[i].addEventListener('change', function () {
                    sliderIt.noUiSlider.set([null, this.value]);
                });
            }
        },
        mobileMenu: function () {
            $("#mmenu").mmenu({
                navbars: [{
                    title: "Меню",
                    content: [
                        '<div class="head-search"><form action="#"><input type="search" placeholder="Поиск "><span class="icon-10-search"></span><button type="submit" class="btn"><div class="btn-animate"></div><span>Искать</span></button></form></div>',
                    ]
                }, true],
                "extensions": [
                    "pagedim-black",
                    "fx-listitems-slide", "fx-menu-slide"

                ]
            });
            $("#catalog").mmenu({
                navbars: {
                    title: "Каталог"
                },
                extensions: ["pagedim-black", "fx-listitems-slide", "fx-menu-slide"]
            });
            if (_winWidth < 767) {
                $(document).on('click', '.foot-nav__head ', function () {
                    $(this).toggleClass('active');
                    $(this).parents('.foot-nav').find('ul').slideToggle();
                });
            }
        },
        catalogMenu: function () {
            var _catBody = $('.navigation-catalog__body'),
                _catNav = $('.navigation-catalog__nav'),
                _catButt = $('.navigation-catalog__butt');
            $('.navigation-catalog__nav ul li').on('mouseover', function () {
                var catalogId = $(this).attr('data-menu');
                $('.head-dropdown.dropdown-button').dropdown('close');
                $('.navigation-catalog__nav ul li').removeClass('active');
                _catBody.css('display', 'inline-block');
                $('.catalog-menu').hide();
                $('.catalog-menu[data-menu="' + catalogId + '"]').show();
                $('.navigation-catalog__nav ul li[data-menu="' + catalogId + '"]').addClass('active');
            });
            $('.navigation-catalog-inner').on('mouseleave', function () {
                $('.navigation-catalog__nav ul li').removeClass('active');
                _catButt.dropdown('close');
                _catBody.hide();
            });
            // size catalog
            if (window.innerWidth > 992) {
                _catBody.width($('.container').outerWidth() - _catButt.outerWidth() - 30);
                _catNav.width(_catButt.outerWidth());
                $(window).resize(function () {
                    _catBody.width($('.container').outerWidth() - _catButt.outerWidth() - 30);
                    _catNav.width(_catButt.outerWidth());
                });
            }


        },
        searchFunc: function () {
            $(document).on('keyup', '.head-search input', function () {
                if ($(this).val().length > 3) {
                    $('.head-search .head-search-drop').fadeIn(500);
                    $('.overlay').fadeIn(500);
                } else {
                    $('.head-search .head-search-drop').fadeOut(500);
                    $('.overlay').fadeOut(500);
                }
            });
            $(document).on('click', function (e) {
                if ($(e.target).closest(".head-search-drop,.head-dropdown__butt,.dropdown-content").length) {
                    return ;
                }
                $('.head-search .head-search-drop').fadeOut(500);
                $('.overlay').fadeOut(500);

            });
            $(document).on('click','.overlay',function(){
                $('.modal').modal('close');
                $('.dropdown-button').dropdown('close');
            });
        },
        dropdownFunc: function () {
            $(document).on('click', '.head-dropdown__butt', function () {
                var dropID = $(this).data('activates');
                $('.head-dropdown__butt').dropdown('close');
                $('[data-activates="' + dropID + '"]').dropdown('open');
                $('.overlay').fadeIn(500);
            });
            $(document).on('click', '.js_change_form', function () {
                $('[data-activates="drop-enter"]').dropdown('open');
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).html(' Уже есть аккаунт? <span> Войти</span>');
                } else {
                    $(this).addClass('active');
                    $(this).html(' Нет учетной записи? <span> Зарегистрироваться </span>');
                }
                $('.drop-head--form').find('.drop-enter__box').toggleClass('active');
            });
            $(document).on('click', '.navigation-catalog__butt', function () {
                $('.head-dropdown__butt').dropdown('close');
            });
        },
        quantityFunc: function () {
            var qty, priceItem, col_vo, thisValue, totalPrice = 0,rowCart;
            //count item
            $('.head-dropdown__butt .cout').text($('.cart-container .cart-row').length);
            //count item
            $('.cart-container .quantity-wrap').find('.quantity').on('input', function () {
                this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
            });
            $('.plus-icon').click(function () {
                rowCart = $(this).parents('.cart-row').data('product-id');
                qty = parseFloat($('[data-product-id="'+ rowCart +'"]').find('.quantity').val());
                qty = qty + 1;
                $('[data-product-id="'+ rowCart +'"]').find('.minus-icon').removeClass('disabled');
                $('[data-product-id="'+ rowCart +'"]').find('.quantity').val(qty);
            });

            $('.minus-icon').click(function () {
                rowCart = $(this).parents('.cart-row').data('product-id');
                qty = parseFloat($('[data-product-id="'+ rowCart +'"]').find('.quantity').val());
                qty = qty - 1;
                if (qty < 1) {
                    qty = 0;
                    $('[data-product-id="'+ rowCart +'"]').find('.minus-icon').addClass('disabled');
                }
                $('[data-product-id="'+ rowCart +'"]').find('.quantity').val(qty);
            });
            $(document).on('click', '.js_remove_item', function () {
                rowCart = $(this).parents('.cart-row').data('product-id');
                $('[data-product-id="'+ rowCart +'"]').remove();
                $('.head-dropdown__butt .cout').text($('.cart-container .cart-row').length);
                if ($('.cart-container .cart-row').length === 0) {

                    $('.cart-container .cart-container-box').html('<div class="align-center empty-cart">Корзина пуста</div>');
                }
                totalCart();
            });
            totalCart();
            $('.js_total_price').text(totalPrice);
            $(document).on('click', '.quantity-wrap span', function () {
                priceItem = parseInt($('[data-product-id="'+ rowCart +'"]').find('.quantity').data('price-product')),
                    col_vo = parseInt($('.quantity').text().replace(/\D+/g, ""));
                $('[data-product-id="'+ rowCart +'"]').find('.js_item_total').text(priceItem * qty);
                totalCart();
            });
            $('.quantity-wrap').find('.quantity').on('blur', function () {
                rowCart = $(this).parents('.cart-row').data('product-id');
                priceItem = parseFloat($('[data-product-id="'+ rowCart +'"]').find('.quantity').data('price-product')),
                thisValue = parseFloat($(this).val());
                $('[data-product-id="'+ rowCart +'"]').find('.quantity').val(thisValue);
                $('[data-product-id="'+ rowCart +'"]').find('.js_item_total').text(priceItem * thisValue);
                totalCart();
            });
            function totalCart() {
                totalPrice = 0;
                $('.parent-cart .js_item_total').each(function(i,item){
                    var thisPrice = parseInt($(item).text().replace(/\D+/g,""));
                    totalPrice = totalPrice + thisPrice;
                });
                $('.js_total_price').text(totalPrice);
            }
        },
        copyright: function () {
            var yearBlock = document.querySelector('.yearN'),
                yearNow = new Date().getFullYear().toString();
            if (yearNow.length) {
                yearBlock.innerText = yearNow
            }
        },
        getBrowser: function () {
            var ua = navigator.userAgent;
            var bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();

            var version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            var platform = 'desktop';
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            var browsrObj;
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
        swiperSliders: function () {
            var swiper = new Swiper('.general-slider .swiper-container', {
                loop: true,
                autoplay: 4000,
                speed: 2000,
                pagination: '.general-slider .swiper-pagination',
                paginationClickable: true,
                nextButton: '.general-slider .swiper-button-next',
                prevButton: '.general-slider .swiper-button-prev',
                parallax: true
            });
            var swiper_brand = new Swiper('.brand-slider .swiper-container', {
                loop: true,
                autoplay: 2000,
                speed: 2000,
                slidesPerView: 6,
                spaceBetween: 15,
                breakpoints: {
                    1400: {
                        slidesPerView: 5,
                        spaceBetween: 15
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 15
                    },
                    805: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    500: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            });
            $('.product-slider-cont').each(function (i, item) {
                var lp = false;
                if ($(item).find('.swiper-slide').length > 4) {
                    lp = true
                }
                if (_winWidth < 1023 && $(item).find('.swiper-slide').length > 2) {
                    lp = true
                }
                var swiper2 = new Swiper($(item).find('.swiper-container'), {
                    loop: lp,
                    speed: 1500,
                    slidesPerView: 5,
                    spaceBetween: 25,
                    nextButton: $(item).find('.swiper-button-next'),
                    prevButton: $(item).find('.swiper-button-prev'),
                    breakpoints: {
                        1400: {
                            spaceBetween: 15
                        },
                        1300: {
                            slidesPerView: 4,
                            spaceBetween: 15
                        },
                        805: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        500: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        }
                    }
                });

            });
            var settings = {
                    loop: false,
                    direction: 'vertical',
                    nextButton: '.product-one-slider__thumb .swiper-button-next',
                    prevButton: '.product-one-slider__thumb .swiper-button-prev',
                    speed: 1000,
                    slidesPerView: 4,
                    breakpoints: {
                        767: {
                            direction: 'horizontal',
                            slidesPerView: 3
                        },
                        600: {
                            direction: 'horizontal',
                            slidesPerView: 2
                        }
                    }
                },
                swiper4 = new Swiper('.product-one-slider__thumb .swiper-container', settings);
            window.addEventListener('resize', function () {
                if (document.querySelector('.product-one-slider__thumb .swiper-container') !== null) {
                    swiper4.destroy(true, true);
                    swiper4 = new Swiper('.product-one-slider__thumb .swiper-container', settings);
                }
            });
            swiper5 = new Swiper('.product-one-slider__img .swiper-container', {
                loop: false,
                speed: 1500,
                slidesPerView: 1,
                simulateTouch: false,
                grabCursor: false,
                centeredSlides: false,
            });
        },
        productSlider: function () {
            var elem = document.querySelectorAll('.product-one-slider__thumb .swiper-slide');
            for (var i = 0; i < elem.length; i++) {
                elem[i].addEventListener('click', function () {
                    var indexSlide = parseInt(this.getAttribute('data-slide') - 1);
                    for (var k = 0; k < elem.length; k++) {
                        elem[k].classList.remove('active');
                    }
                    this.classList.add('active');
                    swiper5.slideTo(indexSlide);
                });
            }
        },
        pagePreloader: function () {
            window.addEventListener('load', function () {
                setTimeout(function () {
                    body.classList.add('loaded');
                }, 2000);
                setTimeout(function () {
                    document.querySelector('.preloader').style.display = 'none';
                }, 2600);
            });
        },
        validateForm: function () {
            $(document).on('click','.change-pass',function(){
                $(this).parents('.input-field').slideUp(500);
                $('.change-pass-cont').slideDown(500);
            });
            $(document).on('change','.js_change-field',function(){
                $(this).toggleClass('active');
                $('.other-peop').slideToggle(500);
            });
            $(document).on('click', '.close-toast', function () {
                $(this).parents('.toast').hide();
            });
            $('.js_validate button[type="submit"]').on("click", function () {
                var $toastContent = '<b>Спасибо</b> Все успешно',
                    $tosatClose = '<span class="close-toast"></span>';
                Materialize.toast($tosatClose + $toastContent, 4000);
                return validate($(this).parent(".js_validate"));
            });
            function validate(form) {
                var error_class = "error";
                var norma_class = "pass";
                var item = form.find("[required]");
                var e = 0;
                var reg = undefined;
                var pass = form.find('.password').val();
                var pass_1 = form.find('.password_1').val();
                var email = false;
                var password = false;
                var phone = false;

                function mark(object, expression) {
                    if (expression) {
                        object.parents('.required-field').addClass(error_class).removeClass(norma_class);
                        e++;
                    } else
                        object.parents('.required-field').addClass(norma_class).removeClass(error_class);
                }

                form.find("[required]").each(function () {
                    switch ($(this).attr("data-validate")) {
                        case undefined:
                            mark($(this), $.trim($(this).val()).length === 0);
                            break;
                        case "email":
                            email = true;
                            reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            email = false;
                            break;
                        case "phone":
                            phone = true;
                            reg = /[0-9 -()+]{10}$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            phone = false;
                            break;
                        case "pass":
                            password = true;
                            reg = /^[a-zA-Z0-9_-]{6,}$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            password = false;
                            break;
                        case "pass1":
                            mark($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
                            break;
                        default:
                            reg = new RegExp($(this).attr("data-validate"), "g");
                            mark($(this), !reg.test($.trim($(this).val())));
                            break;
                    }
                });
                $('.js_valid_radio').each(function () {
                    var inp = $(this).find('input.required');
                    var rezalt = 0;
                    for (var i = 0; i < inp.length; i++) {
                        if ($(inp[i]).is(':checked') === true) {
                            rezalt = 1;
                            break;
                        } else {
                            rezalt = 0;
                        }
                    }
                    if (rezalt === 0) {
                        $(this).addClass(error_class).removeClass(norma_class);
                        e = 1;
                    } else {
                        $(this).addClass(norma_class).removeClass(error_class);
                    }
                });
                if (e === 0) {
                    return true;
                }
                else {
                    form.find("." + error_class + " input:first").focus();
                    return false;
                }
            }
        },
        materialPlagins: function () {
            //play video
            $('.js_play_video').on('click', function(ev) {
                $(this).addClass('hidden-this');
                $(this).parents('.video-box-single').find('iframe')[0].src += "&autoplay=1";
                ev.preventDefault();

            });
            //toggle box
            $('.toggle-butt').on('click',function(){
                $(this).toggleClass('active');
                $(this).parents('.toggle-parent').find('.toggle-hidden').slideToggle(500);
            });
            //toggle box
            $('.materialboxed').materialbox();
            $('.collapsible').collapsible();
            $(document).on('click', '.share-box .share-box_butt', function () {
                $(this).parent('.share-box').toggleClass('active');
                return false;
            });
            if (_winWidth < 1023) {
                $('.navigation-catalog__butt .hamburger').removeClass('is-active');
            }
            $('.tooltipped').tooltip({delay: 50});
            $('.dropdown-button').dropdown();
            $('select').not('.my_select_box').material_select();
            $('.collapsible').collapsible();
            /*if(isMobile === false) {
             $('.parallax').parallax();
             }*/

            $('.modal').modal({
                opacity: 1,
                ready: function(){
                    $('.overlay').fadeIn(500);
                },
                complete: function(){
                    $('.overlay').fadeOut(500);
                }
            });
        },
        appearFunction: function () {
            if (isMobile === false) {
                $('.animated').appear(function () {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + " visible");
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + " visible");
                        }
                    }
                }, {accX: 0, accY: -500});
            } else {
                $('.animated').each(function () {
                    var animation = $(this).data('animation');
                    $(this).addClass(animation + " visible");
                });
            }
        },
    };

    genFunc.initialize();
    window.addEventListener('scroll', function () {
        scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    });
    window.onload = function () {
        if (document.getElementById('.swiper-caption') !== undefined) {
            captionPosition('.swiper-caption');
        }
        if (document.querySelector('.height_') !== undefined) {
            heightBlock('.height_');
        }
    };
    window.addEventListener('resize', function () {
        if (document.getElementById('.swiper-caption') !== undefined) {
            captionPosition('.swiper-caption');
        }
        if (document.querySelector('.height_') !== undefined) {
            heightBlock('.height_');
        }
    });
    function captionPosition(element) {
        [].slice.call(document.querySelectorAll(element)).forEach(function (i, item) {
            var thisHeight = i.clientHeight;
            i.style.marginTop = -thisHeight / 2 + 'px';
        });
    };
    function heightBlock(ell) {
        var elem = document.querySelectorAll(ell);
        var maxH = 0;
        for (var i = 0; i < elem.length; ++i) {
            elem[i].style.height = "";
            elem[i].removeAttribute("style");
            if (maxH < elem[i].offsetHeight) {
                maxH = elem[i].offsetHeight;
            }

            elem[i].style.height = maxH + "px";
        }
        // for (var j = 0; j < elem.length; ++j) {
        //     elem[i].style.height = maxH + "px";
        // }

    };
})();
