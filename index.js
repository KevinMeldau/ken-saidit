const jokesCollection = firebase.database().ref('jokes');

// get variable = form with id message-form
var $form = $("#joke-form");
var $jokesBoard = $(".jokes-board");

// const source = $("#message-template").html();
$form.submit(function(event){
  event.preventDefault();

  const joke = $("#joke").val();

  if (joke) {
    jokesCollection.push({
      joke: joke,
      votes: 0
    })

    $("#joke").val("");
  }
})

// READ DATA
jokesCollection.on('value', function(results) {
  $jokesBoard.empty();

  results.forEach(function(result) {

    const joke = result.val().joke;
    const votes = result.val().votes;
    const jokeId = result.key;

    const $li = $('<li>').data('joke-id', jokeId).text(joke);

    const $right = $('<div>').addClass('right').text('Votes: ' + votes);
    const $upvote = $('<a>').attr('href', '#').addClass('upvote').text("+");
    const $downvote = $('<a>').attr('href', '#').addClass('downvote').text("-");

    $right.prepend($upvote);
    $right.append($downvote);
    $li.append($right);

    $jokesBoard.append($li);
  })
})

// DELETE DATA
$(document).on("click", "a.delete", function(event) {
  event.preventDefault();

  const key = $(event.target).closest("li").data("joke-id");
  const joke = jokesCollection.child(key);

  joke.remove();
});

$(document).on("click", "a.upvote", function(event){
  event.preventDefault();
  const key = $(event.target).closest("li").data("joke-id");
  const jokeVotes = jokesCollection.child(key).child('votes');

  jokeVotes.transaction(function(votes) {
    return (votes || 0) + 1
  });
});

$(document).on("click", "a.downvote", function(event){
  event.preventDefault();

  const key = $(event.target).closest("li").data("joke-id");
  const jokeVotes = jokesCollection.child(key).child('votes');

  jokeVotes.transaction(function(votes) {
    return votes ? (votes - 1) : 0;
  });
});