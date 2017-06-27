$(document).ready(function() {
// process the form
  $('form').submit(function(event) {

    event.preventDefault();

    $form = $(this);
    $button = $form.find('input[type=submit]');

    // Disable button
    $button.attr('value', 'Working...');
    $button.prop('disabled', true);

    // Prep action url
    action = $form.attr('action')
    action = action.replace(/post/g, 'post-json');
    action = action.concat("&c=?")

    // Post AJAX request
    $.ajax({
      type: 'POST',
      url: action,
      cache: false,
      data: $form.serialize(),
      dataType: 'jsonp',
      encode: true,
      contentType: 'application/json; charset=utf-8',
    }).done(function(data) {

      // Show the response item
      $('.form-response').show();

      if (data.result == 'success') {

        // Show the custom success message
        $('.form-response').html("Awesome! We emailed you a link to confirm.");
        $form.hide();

        // Clear the email field
        $form.find('input[type=email]').val('');

      } else {

        // Clean up the messages
        msg = data.msg.replace(/0\s-\s/g, '');
        msg = msg.replace(/\s\(#6592\)/g, '');
        msg = msg.replace(/\sto\slist\sWarptalk\slaunch\slist/g, '');

        // Show the message
        $('.form-response').html($.parseHTML(msg));
      }

      // Enable the button
      $button.attr('value', 'Sign up');
      $button.prop('disabled', false);

      //console.log(data.msg);
    });
  });
});
