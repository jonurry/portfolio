if (typeof jQuery === 'undefined') {
  var jQuery = '';
}
!(function($) {
  'use strict';

  function resize() {
    // the project images don't contribute to the overall project div height
    // so we have to work out the correct height on resize by adding the
    // content height to the image height
    $('.project-content').each(function() {
      var height;
      height = $(this).height();
      height += $(window).height() * 0.8;
      height += 'px';
      $(this)
        .parent()
        .css('min-height', height);
    });
    // a bug in firefox means that the first h1 clip is drawn in the wrong location
    // accessing the height of the clip forces a redraw of the element which is
    // then rendered in the correct location
    $('.clip-height').each(function() {
      $(this).css('height', $(this).height() + 1);
      $(this).css('height', $(this).height() - 1);
    });
  }

  $(document).ready(resize);
  $(window).resize(resize);
})(jQuery);
