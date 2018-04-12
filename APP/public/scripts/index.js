$.get('/comments', function (data) {
    if (data && data.length > 0) {
        document.getElementById('textComment').innerHTML = data[0].comment;
    }
});

var typingTimer;
var doneTypingInterval = 2000;
var $input = $('#textComment');

$input.on('input', function () {
    var a = this.value;
    clearTimeout(typingTimer);
    if ($('#textComment').val()) {
        typingTimer = setTimeout(TypingComplete, doneTypingInterval);
    }
});

function TypingComplete() {
    let comment = $('#textComment').val();
    $.post('/sync', {
        comment: comment
    }, function (response) {
        console.log('Comments sync successfully');
    });
}