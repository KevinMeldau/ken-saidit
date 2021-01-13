// A joke is 
// {
    // joke: String,
    // votes: Number (defaults to 0),
// }
const jokesCollection = firebase.database().ref('jokes');
$('#joke-form').on('submit', function (event) {
    event.preventDefault();
    // Test that the button is working
    //console.log("Hello");
    const jokeText = $('#joke').val();
    if(jokeText.trim() !== '') {
        // Add Joke to Database
        jokesCollection.push({
            joke: jokeText.trim(),
            votes: 0,
        })
        // Clear Text
        $('#joke').val('');
    }
});
jokesCollection.on('value', function (results) {
    results.forEach(function (result) {
        console.log(result.val());
    })
})