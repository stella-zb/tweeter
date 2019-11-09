$(document).ready(function() {
  // how much character left to type in the tweet
  $( "#typeBox" ).on("input", function() {
    const maxLength = 140;
    const textLength = $(this).val().length;
    const counter = $(this).parent().children(".counter");
    if (textLength <= maxLength) {
      $(counter).removeClass('error');
    } else {
      $(counter).addClass('error');
    }
    $(counter).text(maxLength - textLength);
  });

  // textarea auto resize for input
  $( "#typeBox").on("input", function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
});