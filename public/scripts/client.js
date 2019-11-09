/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // hide validation message when page loaded
  $(".validationError").hide();

  // toggle button for tweet post
  $(".tweet-button").click(function() {
    $(".new-tweet").slideToggle();
    // let user type right away
    $("#typeBox").focus();
    // hide the error message after close up tweet toggle
    $(".validationError").hide();
  });
  
  // function handle the sumbit request from html
  $("#submitForm").submit(function(event) {
    // avoid default sumbit sending request
    event.preventDefault();
    // hide validation message before validation
    $(".validationError").hide();
    // remove the red highlight around input box when re-submit
    $("#typeBox").removeClass("errorHighlight");

    // validation before past to ajax
    const inputLength = $("#typeBox").val().length;
    // if there is no input
    if (inputLength === 0) {
      // error message for no input
      $(".validationError").html(`
        <p><i class="material-icons">error</i>Yoo, you need to type something!</p>
      `);
      // add red highlight around input box
      $("#typeBox").addClass("errorHighlight").focus();
      // slidedown the validation error message
      return $(".validationError").slideDown("fast");
    }
    // if the input is over the limit
    if (inputLength > 140) {
      // error message for over limit
      $(".validationError").html(`
        <p><i class="material-icons">error</i>Oops, too many characters!</p>
      `);
      // add red highlight around input box
      $("#typeBox").addClass("errorHighlight").focus();
      // slidedown the validation error message
      return $(".validationError").slideDown("fast");
    }

    // post data to server
    $.ajax({
      data: $("#submitForm").serialize(),
      method: "POST",
      url: "/tweets",
      dataType: "json"
    }).then(function(input) {
      // post the new tweet to the tweets container
      $(".tweets-container").prepend(createTweetElement(input));
    }).fail(function(err) {
      // catch error
      alert(`error: ${err.status}`);
    });
  
  });
  
  // function load the posts from server
  const loadtweets = () => {
    // get data from server
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function(tweets) {
      // load the posts
      renderTweets(tweets);
    });
  };

  loadtweets();

  // function loop through tweets, callback createTweetElement function
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $(".tweets-container").prepend(createTweetElement(tweet));
    }
  };
  
  // function generate HTML template for tweet object
  const createTweetElement = (tweet) => {
    // safe text, not taking the value of the input
    const escape =  function(str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $("<article>").addClass("tweet");
    // tweet time
    const tweetTime = new Date(tweet.created_at);
    // template for tweet post
    const tweetMarkup = `
      <header>
        <img src="${tweet.user.avatars}">
        <h2 id="userName">${tweet.user.name}</h2>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <p>${tweetTime.toLocaleString()}</p>
        <div id="icons">
          <i class="material-icons">flag</i>
          <i class="material-icons">repeat</i>
          <i class="material-icons">favorite</i>
        <div>
      </footer>
    `;
    $tweet.append(tweetMarkup);

    return $tweet;
  };

});
