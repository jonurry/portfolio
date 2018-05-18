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


if (typeof jQuery === 'undefined') {
  var jQuery = '';
}
!(function($) {
  'use strict';

  // the following code is adapted from Jake Archibald's article on animating SVG paths
  // https://jakearchibald.com/2013/animated-line-drawing-svg/
  // begin: SVG Animate
  var supportsInlineSvg = (function() {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (
      (div.firstChild && div.firstChild.namespaceURI) ==
      'http://www.w3.org/2000/svg'
    );
  })();
  document.documentElement.className += supportsInlineSvg ? ' inline-svg' : '';

  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function animateSVG(draw) {
    if (!supportsInlineSvg) return;

    var begin;
    var duration;
    var durations;
    var paths;
    var svg;

    svg = document.getElementById('svg');
    if (svg !== null) {
      paths = toArray(svg.querySelectorAll('#svg path'));
      if (paths.length > 0) {
        durations = paths.map(function(path) {
          var length = path.getTotalLength();
          path.style.strokeDasharray = length + ' ' + length;
          path.style.strokeDashoffset = length;
          path.style.visibility = 'visible';
          return Math.pow(length, 0.5) * 0.02; //* 0.03;
        });

        // triggering a re-flow so styles are calculated in their
        // start position, so they animate from here
        begin = 0;
        paths[0].getBoundingClientRect();

        if (draw) {
          paths.forEach(function(path, i) {
            path.style.transition = path.style.WebkitTransition =
              'stroke-dashoffset ' +
              durations[i] +
              's ' +
              begin +
              's ease-in-out' +
              ', ' +
              'stroke 4s ease-in-out' +
              ', ' +
              'fill-opacity 4s ease-in-out' +
              ', ' +
              'fill 4s ease-in-out';
            path.style.strokeDashoffset = '0';
            begin += durations[i]; // + 0.1;
          });
        }

        // Fill in the SVG drawing once the strokes have finished animating
        // and change the shirt fill colour to dark blue -> pink gradient
        duration = durations.reduce(function(accumulator, currentValue) {
          return accumulator + currentValue;
        });
        setTimeout(
          function() {
            $('.shirt').css('fill', 'url(#t-shirt)');
            $('path').css('fill-opacity', '1');
          },
          duration * 1000,
          true
        );

        // 4 seconds later, change the spectacles fill colour to near black
        // and change the path stroke colour to light blue
        duration += 4;
        setTimeout(
          function() {
            $('.spectacles').css('fill', '#212121');
            $('.iris').css('fill', '#a1cAf1'); // baby blue eyes
            $('#svg path').css('stroke', '#c5cae9');
          },
          duration * 1000,
          true
        );
      }
    }
  }
  // end: SVG Animate
  $(document).ready(animateSVG(true));
})(jQuery);


// @codekit-prepend "resize.js";
// @codekit-prepend "animateSVG.js";
if (typeof jQuery === 'undefined') {
  var jQuery = '';
}
!(function($) {
  'use strict';

  $('.collapsed-testimonials').on('show.bs.collapse', function() {
    $('.show-testimonials').css('visibility', 'hidden');
  });

  // new data attribute for hiding the alerts
  $(function() {
    $('[data-hide]').on('click', function() {
      $(this)
        .closest('.' + $(this).attr('data-hide'))
        .hide();
    });
  });

  // email form validation
  $(document).ready(function() {
    const form = document.querySelector('form');
    form.onsubmit = async function(event) {
      // stop default form submission behavior
      event.preventDefault();
      //event.stopPropagation();
      if (form.checkValidity() === false) {
        form.classList.add('was-validated');
      } else {
        // Prepare data to send
        const data = {};
        const formElements = Array.from(form);
        formElements.map(input => (data[input.name] = input.value));
        try {
          // send the email
          let response = await fetch(form.action, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json'
            },
            method: 'POST' // *GET, POST, PUT, DELETE, etc.
            //mode: 'no-cors' // no-cors, cors, *same-origin
            //redirect: 'follow', // manual, *follow, error
            //referrer: 'no-referrer' // *client, no-referrer
          });
          //response = await response.json();
          if (response.ok) {
            // The form submission was successful
            // show acknowledgement message. Auto dismiss after 5 seconds.
            $('#contact-message-sent').show();
            setTimeout(function() {
              $('#contact-message-sent').hide();
            }, 5000);
            // clear the form fields
            form.reset();
          } else {
            // The form submission failed
            console.error(response);
            // show failure message.
            $('#contact-message-failed').show();
          }
          console.log(response);

          // // Construct an HTTP request
          // var xhr = new XMLHttpRequest();
          // xhr.open(form.method, form.action, true);
          // xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
          // xhr.setRequestHeader(
          //   'Content-Type',
          //   'application/json; charset=UTF-8'
          // );

          // // Send the collected data as JSON
          // xhr.send(JSON.stringify(data));

          // // Callback function
          // xhr.onloadend = response => {
          //   if (response.target.status === 200) {
          //     // The form submission was successful
          //     // show acknowledgement message. Auto dismiss after 5 seconds.
          //     $('#contact-message-sent').show();
          //     setTimeout(function() {
          //       $('#contact-message-sent').hide();
          //     }, 5000);
          //     // clear the form fields
          //     form.reset();
          //   } else {
          //     // The form submission failed
          //     console.error(JSON.parse(response.target.response).message);
          //     // show failure message.
          //     $('#contact-message-failed').show();
          //   }
          // };
        } catch (error) {
          //console.error(JSON.parse(response.target.response).message);
          // show failure message.
          $('#contact-message-failed').show();
        }
      }
    };
  });
})(jQuery);


