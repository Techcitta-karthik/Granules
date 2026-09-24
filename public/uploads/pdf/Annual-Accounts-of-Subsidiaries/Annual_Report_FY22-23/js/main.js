$(document).ready(function () {
  wow = new WOW({
    mobile: false, // default
  });
  wow.init();
  const headerHeight = document.querySelector('.header').clientHeight;
  const viewport = document.querySelector('.viewport');

  viewport.style.paddingTop = `${headerHeight}px`;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
  } else {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    var smoother = ScrollSmoother.create({
      content: '.viewport',
      smooth: 0.5,
      smoothTouch: 0.1,
      effects: true,
    });
  }

  // responsive tab navigtion (tabs on desktop and dropdown on mobile)
  function createTabNavigation(navSelector, contentSelector) {
    // Create the select dropdown and append it to the specified navigation container
    $('<select />').appendTo(navSelector);

    // Populate the select options from the navigation items
    $(navSelector + ' li').each(function () {
      var el = $(this);
      $('<option />', {
        value: el.attr('data-id'),
        text: el.text(),
      }).appendTo(navSelector + ' select');
    });

    // Handle click events for navigation items
    $(navSelector + ' li').on('click', function (e) {
      e.preventDefault();
      $(navSelector + ' li').removeClass('active');
      $(this).addClass('active');

      var tabId = $(e.currentTarget).data('id');
      $(contentSelector + ' .content').hide();
      $('#' + tabId).show();
    });

    // Handle change event for the select dropdown
    $(contentSelector + ' select').on('change', function () {
      $(contentSelector + ' .content').hide();
      $('#' + this.value).show();
    });
  }

  createTabNavigation('.esg-nav', '.egs-tabs');
  createTabNavigation('.highlights-nav', '.highlights');

  function animSlide() {
    $('.swiper-slide-active .anim').addClass('fadeInUp animated');
    $('.swiper-slide-active .imganim').addClass('fadeInRight animated');
    $('.swiper-slide-active .imganimup').addClass('fadeInUp animated');
  }

  var sustainibiltyswiper = new Swiper('.sustainabilitySwiper', {
    autoHeight: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: animSlide,
      slideChange: animSlide,
    },
  });

  $('[data-bs-toggle="tooltip"]').tooltip();
});
