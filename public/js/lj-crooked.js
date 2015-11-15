/*
  Author: Lumberjacks
  Template: Crooked (Coming Soon)
  Version: 1.0
  URL: http://themeforest.net/user/Lumberjacks/
*/

(function($) {
  "use strict";

  $(document).ready(function (){
    'use strict';

    // backstretch
    $("header").backstretch("img/bg.jpg");
  });

  /*! Hide on scroll js
   * http://the-lumberjacks.com/
   */
  function hideOnScroll(elements, distance, offset) {
    var toHide = $(elements);
    $(window).on('scroll', function() {
      var height = $(this).scrollTop();
      toHide.css({
        'opacity' : (1 - (height - offset)/distance),
       });
    });
  }

  hideOnScroll('.lj-insignia', 300, 0);
  hideOnScroll('.lj-countdown', 300, 300);

  // Preloader
  // Change delay and fadeOut speed (in miliseconds)
  $(window).load(function() {
    $('.lj-preloader').delay(100).fadeOut(200);
    $('.lj-insignia, .lj-countdown').delay(500).animate({
      opacity: '1'
    }, 2000);

    // WOW js
    new WOW().init();
  });


})(jQuery);