/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary).
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function() {
  const createTweetElement = (tweet) => {
    let tweetTime = new Date(tweet.created_at);
    const tweetMarkup = `
    <article class="tweet">
      <header>
        <img src="${tweet.user.avatars}">
        <h2 id="userName">${tweet.user.name}</h2>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <p>${tweetTime.toLocaleString()}</p>
        <div id="icons">
          <i class="material-icons">flag</i>
          <i class="material-icons">repeat</i>
          <i class="material-icons">favorite</i>
        <div>
      </footer>
    </article>
    `;
    return tweetMarkup;
  }

  const $tweet = createTweetElement(tweetData);
  // to see what it looks like
  console.log($tweet); 
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $('.tweets-container').append($tweet); 
});
