$(document).ready(function () {
  $('.header-full-wrp').load('header.html');
  $('.footer-wrp').load('footer.html');

  $('body').on('click', '.hamburger-ico', function () {
    $('.hamburger-menu').addClass('hamburger-menu-active');
  });

  $('body').on('click', '.close-menu', function () {
    $('.hamburger-menu').removeClass('hamburger-menu-active');
  });
});
