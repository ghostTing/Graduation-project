/*
setTimeout(function () {
    window.location='/index.html'
},2000)*/
$(function () {
    $('.login-tab').on('click',function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('.login-form').removeClass('dn');
        $('.register-form').addClass('dn');
    });
    $('.register-tab').on('click',function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('.login-form').addClass('dn');
        $('.register-form').removeClass('dn');
    });
    $('.login-btn').click(function () {
        window.location='/index.html';
    });
});