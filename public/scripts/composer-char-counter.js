$(function() {
  $(".new-tweet form textarea").on('keyup', function(event) {
      var $maxChars = 140;
      var $input = $(this);
      var $form = $input.closest('form');
      var $counter = $form.find('.counter')
      var len = $input.val().length;


      var charsLeft = 140 - len;
      $counter.html(charsLeft);

      if (charsLeft < 0) {
        $counter.addClass('over-limit');
      } else {
        $counter.removeClass('over-limit');
      }
      // console.log(input);
    });
});
