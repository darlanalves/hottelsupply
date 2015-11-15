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

    // E-mail validation via regular expression
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };


    // Ajax mailchimp
    $('#subscribe').ajaxChimp({
      language: 'en',
      url: 'http://example.com'
    });

    // Mailchimp translation
    //
    // Defaults:
    //'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.lj = {
      'submit': 'Submitting...',
      0: '<i class="fa fa-check"></i> We will be in touch soon!',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    }


    // Contact form functions
    $(function () {
      $("#contactform").submit(function (event) {
        var input = $('.lj-contact-message');
          if(!input.is(':empty')) {
            $('.lj-contact-message').stop(true);
          }
          event.preventDefault();
          event.stopImmediatePropagation();

          var name = $("input#contact-name").val();
          var email = $("input#contact-email").val();
          var message = $("textarea#contact-message").val();

          if (name == "" || email == "" || message == "") {

            $(".lj-contact-message").stop(true).html('<i class="fa fa-warning"></i> All fields are required.');
          }
          else if (!isValidEmailAddress( email )) {
            $(".lj-contact-message").stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
            $("input#contact-email").focus();
          }
          else {
            $.ajax({
              type: "POST",
              url: "./php/send-contact.php",
              data: {contact_email:email,
                     contact_name:name,
                     contact_message:message},
              success: function () {
                $(".lj-contact-message").html('<i class="fa fa-check"></i> Thank you for your message!');
                $('input#contact-name').val('');
                $('input#contact-email').val('');
                $('textarea#contact-message').val('');
              }
            });
          }
       });
    });

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