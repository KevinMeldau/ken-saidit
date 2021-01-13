const jokesCollection = firebase.database().ref('jokes');
// Create
$('#joke-form').on('submit', function (event) {
  event.preventDefault();
  const jokeText = $('#joke').val();
  if (jokeText.trim() !== '') {
    // Add Joke to Database
    jokesCollection.push({
      joke: jokeText.trim(),
      votes: 0,
    });
    // Clear Text
    $('#joke').val('');
  }
});
// Read
jokesCollection.on('value', function (results) {
  const $jokesBoard = $('.jokes-board');
  $jokesBoard.empty();
  results.forEach(function (result) {
    const { joke, votes } = result.val();
    // const joke = result.val().joke;
    // const votes = result.val().votes;
    const key = result.key;
    const $li = $('<li>').attr('data-joke-id', key).text(joke);
    const $right = $('<div>').addClass('right').text('Votes: ' + votes);
    const $upvote = $('<a>').attr('href', '#').addClass('upvote').append('<i class="fa fa-thumbs-up"></i>');
    const $downvote = $('<a>').attr('href', '#').addClass('upvote').append('<i class="fa fa-thumbs-down"></i>');
    $right.prepend($downvote);
    $right.append($upvote);
    $li.append($right);
    $jokesBoard.append($li);
  })
})
// Update
$('.jokes-board').on('click', 'a.upvote', function(event) {
  event.preventDefault();
  const key = $(event.target).closest('li').attr('data-joke-id')
  const jokeVotes = jokesCollection.child(key).child('votes');
  jokeVotes.transaction(function (votes) {
    return votes + 1;
  });
})
$('.jokes-board').on('click', 'a.downvote', function(event) {
  event.preventDefault();
  const key = $(event.target).closest('li').attr('data-joke-id')
  const jokeVotes = jokesCollection.child(key).child('votes');
  jokeVotes.transaction(function (votes) {
    if (votes === 0) {
      return votes;
    }
    return votes - 1;
  });
})
// Delete