!(function($) {
  "use strict";

  // the following code is adapted from Jake Archibald's article on animating SVG paths
  // https://jakearchibald.com/2013/animated-line-drawing-svg/
  // begin: SVG Animate
  var supportsInlineSvg = (function() {
    var div = document.createElement("div");
    div.innerHTML = "<svg/>";
    return (
      (div.firstChild && div.firstChild.namespaceURI) ==
      "http://www.w3.org/2000/svg"
    );
  })();
  document.documentElement.className += supportsInlineSvg ? " inline-svg" : "";

  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function animateSVG(draw) {
    if (!supportsInlineSvg) return;

    var begin;
    var durations;
    var paths;
    var svg;

    svg = document.getElementById("svg");
    if (svg !== null) {
      paths = toArray(svg.querySelectorAll("#svg path"));
      if (paths.length > 0) {
        durations = paths.map(function(path) {
          var length = path.getTotalLength();
          path.style.strokeDasharray = length + " " + length;
          path.style.strokeDashoffset = length;
          path.style.visibility = "visible";
          return Math.pow(length, 0.5) * 0.02; //* 0.03;
        });

        // triggering a reflow so styles are calculated in their
        // start position, so they animate from here
        begin = 0;
        paths[0].getBoundingClientRect();

        if (draw) {
          paths.forEach(function(path, i) {
            path.style.transition = path.style.WebkitTransition =
              "stroke-dashoffset " +
              durations[i] +
              "s " +
              begin +
              "s ease-in-out" +
              ", " +
              "fill-opacity 4s ease-in-out";
            path.style.strokeDashoffset = "0";
            begin += durations[i]; // + 0.1;
          });
        }
        // Fill in the SVG drawing once the strokes have finished animating
        setTimeout(
          function() {
            $("path").css("fill-opacity", "1");
          },
          durations.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
          }) * 1000,
          true
        );
      }
    }
  }
  // end: SVG Animate
  $(document).ready(animateSVG(true));
})(jQuery);
