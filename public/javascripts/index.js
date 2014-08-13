$(function() {
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    });
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').trigger('click');
    });
    $('.toggleSignin').click(function(event) {
        event.preventDefault();
        $('.signin-toggle-area').toggleClass('showing');
        $('#signin .alert').hide();
    });
});
