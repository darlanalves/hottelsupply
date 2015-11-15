(function() {
    /* globals $,angular */
    'use strict';
    var app = angular.module('app', []);

    function SubscriptionCtrl() {
        var order = {};
        var ctrl = this;

        order.products = [];

        this.order = order;
        this.newProduct = {};

        this.addMore = function () {
            var list = order.products;
            var item = ctrl.newProduct;

            if (item.price && item.name) {
                order.products.push({
                    name: item.name,
                    price: item.price
                });
                ctrl.newProduct = {};
            }
        };

        function onSubmit() {
            var input = $('.lj-contact-message');
            if (!input.is(':empty')) {
                $('.lj-contact-message').stop(true);
            }
            // event.preventDefault();
            // event.stopImmediatePropagation();

            var name = $("input#contact-name").val();
            var email = $("input#contact-email").val();
            var message = $("textarea#contact-message").val();

            if (name == "" || email == "" || message == "") {

                $(".lj-contact-message").stop(true).html('<i class="fa fa-warning"></i> All fields are required.');
            } else if (!isValidEmailAddress(email)) {
                $(".lj-contact-message").stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
                $("input#contact-email").focus();
            } else {
                $.ajax({
                    type: "POST",
                    url: "./php/send-contact.php",
                    data: {
                        contact_email: email,
                        contact_name: name,
                        contact_message: message
                    },
                    success: function() {
                        $(".lj-contact-message").html('<i class="fa fa-check"></i> Thank you for your message!');
                        $('input#contact-name').val('');
                        $('input#contact-email').val('');
                        $('textarea#contact-message').val('');
                    }
                });
            }
        }
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    app.controller('SubscriptionCtrl', SubscriptionCtrl);
})();
