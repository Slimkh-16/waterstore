document.addEventListener("DOMContentLoaded", preloader);
function preloader() {
  document.querySelector('body').classList.add('loading');
}


(function() {

  "use strict";

  var body = document.querySelector('body'),
      isMobile = false,
      scrollTopPosition,
      browserYou;
  var genFunc = {

    initialized: false,

    initialize: function() {

      if (this.initialized) return;

      this.initialized = true;

      this.build();
    },

    build: function() {
      // preloader
      // this.pagePreloader();
      // browser
      browserYou = this.getBrowser();
      if (browserYou.platform == 'mobile') { isMobile = true;document.documentElement.classList.add('mobile')}else {document.documentElement.classList.add('desktop')}
      if ((browserYou.browser == 'ie')) {document.documentElement.classList.add('ie');}
      if ((browserYou.browser == 'ie' &&  browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' &&  browserYou.versionShort < 30)) {
          alert('Обновите браузер')
      }
      // materialPlagin
      this.materialPlagins();
      // map
      if(document.getElementById('map') !== null) {
        this.mapFunction();
      }
      // swiper
      this.swiperSliders();
      //appear
      this.appearFunction();
      //quantityFunc
      if(document.querySelector('.quantity-wrap') !== null) {
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
    },
    catalogMenu: function(){
      var _catBody = $('.navigation-catalog__body'),
          _catNav = $('.navigation-catalog__nav'),
          _catButt = $('.navigation-catalog__butt');
      $('.navigation-catalog__nav ul li').on('mouseover',function(){
        var catalogId = $(this).attr('data-menu');
        $('.navigation-catalog__nav ul li').removeClass('active');
        _catBody.css('display','inline-block');
        $('.catalog-menu').hide();
        $('.catalog-menu[data-menu="' + catalogId + '"]').show();
        $('.navigation-catalog__nav ul li[data-menu="' + catalogId + '"]').addClass('active')
      });
      _catBody.on('mouseleave',function(){
        _catButt.dropdown('close');
        _catBody.hide();
      });
      // size catalog
      _catBody.width($('.container').outerWidth() - _catButt.outerWidth() - 60);
      _catNav.width(_catButt.outerWidth());
      $(window).resize(function(){
        _catBody.width($('.container').outerWidth() - _catButt.outerWidth() - 60);
        _catNav.width(_catButt.outerWidth());
      })
    },
    searchFunc: function(){
      $(document).on('keyup','.head-search input',function(){
        if($(this).val().length > 3) {
          $('.head-search .head-search-drop').fadeIn(500);
        }else {
          $('.head-search .head-search-drop').fadeOut(500);
        }
      });
      $(document).on('click',function(e) {
        if ($(e.target).closest(".head-search-drop").length) {
          return
        }
        $('.head-search .head-search-drop').fadeOut(500);
      });
    },
    dropdownFunc: function(){
      $(document).on('click','.head-dropdown__butt',function(){
        var dropID = $(this).data('activates');
        $('.head-dropdown__butt').dropdown('close');
        $('[data-activates="' + dropID + '"]').dropdown('open');
      });
      $(document).on('click','.js_change_form',function(){
        $('[data-activates="drop-enter"]').dropdown('open')
        if($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).html(' Уже есть аккаунт? <span> Войти</span>')
        }else {
          $(this).addClass('active');
          $(this).html(' Нет учетной записи? <span> Зарегистрироваться </span>')
        }
        $('.drop-head--form').find('.drop-enter__box').toggleClass('active');
      });
    },
    quantityFunc: function(){
      var qty, priceItem, col_vo, totalPrice = 0;
      //count item
      $('.head-dropdown__butt .cout').text($('.cart-container .cart-row').length);
      //count item
      $('.cart-container .quantity-wrap').find('.quantity').on('input',function(){
        this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
      });
      $('.cart-container .plus-icon').click(function(){
          qty = parseFloat($(this).parents('.quantity-wrap').find('.quantity').val());
          qty = qty + 1;
          $(this).parents('.quantity-wrap').find('.quantity').val(qty);
      });

      $('.cart-container .minus-icon').click(function(){
          qty = parseFloat($(this).parents('.quantity-wrap').find('.quantity').val());
          qty = qty - 1;
          if(qty < 1){
            qty = 0;
          }
          $(this).parents('.quantity-wrap').find('.quantity').val(qty);
      });
      $(document).on('click','.js_remove_item' ,function(){
        $(this).parents('.cart-row').remove();
        $('.head-dropdown__butt .cout').text($('.cart-container .cart-row').length);
        if($('.cart-container .cart-row').length == 0) {
          
          $('.cart-container .cart-container-box').html('<div class="align-center empty-cart">Корзина пуста</div>')
        }
      });
      $(document).on('click','.quantity-wrap span' ,function(){
            priceItem = parseInt($(this).parents('.cart-row').find('.quantity').data('price-product')),
            col_vo = parseInt($('.quantity').text().replace(/\D+/g,""));
        $(this).parents('.cart-row').find('.js_item_total').text(priceItem * qty )
      });
      $('.quantity-wrap').find('.quantity').on('blur',function(){
            priceItem = parseFloat($(this).parents('.cart-row').find('.quantity').data('price-product')),
            thisValue = parseFloat($(this).val());
        $(this).parents('.cart-row').find('.js_item_total').text(priceItem * thisValue )
      });
    },
    copyright: function(){
      var yearBlock = document.querySelector('.yearN'), 
          yearNow = new Date().getFullYear().toString();
      if (yearNow.length) {
        yearBlock.innerText = yearNow
      }
    },
    getBrowser: function() {
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
    swiperSliders: function(){
      var swiper = new Swiper('.general-slider .swiper-container', {
        loop:true,
        autoplay: 2000,
        speed: 1500,
        pagination: '.general-slider .swiper-pagination',
        paginationClickable: true,
        nextButton: '.general-slider .swiper-button-next',
        prevButton: '.general-slider .swiper-button-prev',
        parallax: true
      });
      $('.product-slider-cont').each(function(i,item){
        var lp = false;
        if($(item).find('.swiper-slide').length > 4) {
          lp = true
        }
        var swiper2 = new Swiper($(item).find('.swiper-container'), {
          loop:lp,
          speed: 1500,
          slidesPerView: 5,
          spaceBetween: 25,
          nextButton: $(item).find('.swiper-button-next'),
          prevButton: $(item).find('.swiper-button-prev'),
          breakpoints: {
            1100: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            400: {
                slidesPerView: 1,
                spaceBetween: 0
            }
          }
        });
      });
    },
    pagePreloader: function() {
      window.addEventListener('load',function(){
        setTimeout(function(){body.classList.add('loaded')},2000);
        setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},2500);
      })
    },
    validateForm : function(){
      $(document).on('click','.close-toast', function(){
        $(this).parents('.toast').hide();
      });
      $('.js_validate button[type="submit"]').on("click", function(){
        var $toastContent = '<b>Спасибо</b> Все успешно',
            $tosatClose = '<span class="close-toast"></span>';
          Materialize.toast($tosatClose + $toastContent, 4000);
        return validate($(this).parent(".js_validate"));
      }); 
      function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item        = form.find("[required]");
        var e           = 0;
        var reg         = undefined;
        var pass        = form.find('.password').val();
        var pass_1      = form.find('.password_1').val();
        var email       = false;
        var password    = false;
        var phone       = false;
        function mark (object, expression) {
            if (expression) {
                object.parents('.required-field').addClass(error_class).removeClass(norma_class);
                e++;
            } else
                object.parents('.required-field').addClass(norma_class).removeClass(error_class);
        }
        form.find("[required]").each(function(){
            switch($(this).attr("data-validate")) {
                case undefined:
                    mark ($(this), $.trim($(this).val()).length === 0);
                break;
                case "email":
                    email = true;
                    reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    email = false;
                break;
                case "phone":
                    phone = true;
                    reg = /[0-9 -()+]{10}$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    phone = false;
                break;
                case "pass":
                    password = true;
                    reg = /^[a-zA-Z0-9_-]{6,}$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    password = false;
                break;
                case "pass1":
                    mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
                break;
                default:
                    reg = new RegExp($(this).attr("data-validate"), "g");
                    mark ($(this), !reg.test($.trim($(this).val())));
                break;
            }
        })
        $('.js_valid_radio').each(function(){
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
                e=1;
            } else {
                $(this).addClass(norma_class).removeClass(error_class);
            }
        })
        if (e === 0) {
         return true;
        }
        else {
            form.find("."+error_class+" input:first").focus();
            return false;
        }
      }
    },
    materialPlagins: function() {
      $('.dropdown-button').dropdown();
      $('select').not('.my_select_box').material_select();
      $('.collapsible').collapsible();
      /*if(isMobile === false) {
        $('.parallax').parallax();
      }*/
      
      $('.modal').modal({opacity: 1});
    },
    appearFunction: function() {
      if(isMobile == false) {
        $('.animated').appear(function() {
          var elem = $(this);
          var animation = elem.data('animation');
          if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
              setTimeout(function() {
                  elem.addClass(animation + " visible");
              }, animationDelay);
            } else {
              elem.addClass(animation + " visible");
            }
          }
        },{accX: 0, accY: -500});
      } else {
        $('.animated').each(function(){
          var animation = $(this).data('animation');
          $(this).addClass(animation + " visible");                                                                                                                                                                
        });
      }
    },
  };

  genFunc.initialize();
  window.addEventListener('scroll',function(){
    scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  });
  window.onload = function(){
    if(document.getElementById('.swiper-caption') !== undefined) {
      captionPosition('.swiper-caption')
    }
  };
  window.addEventListener('resize',function(){
    if(document.getElementById('.swiper-caption') !== undefined) {
      captionPosition('.swiper-caption')
    }
  });
  function captionPosition(element) {
    [].slice.call(document.querySelectorAll(element)).forEach(function(i,item){
      var thisHeight = i.clientHeight;
      i.style.marginTop = -thisHeight/2 + 'px'; 
    });
  };
  function heightBlock(ell){
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
    for (var i = 0; i < elem.length; ++i) {
      elem[i].style.height = maxH + "px";
    }
    
  };
})();
