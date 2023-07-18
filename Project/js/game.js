$(document).ready(function () {

    var words = [
        { word: "avenue", hint: "A type of road often lined with trees or buildings on both sides." },
        { word: "duplex", hint: "A popular housing option in densely populated urban areas." },
        { word: "gossip", hint: "Talk often involves sharing rumors or personal information about others." },
        { word: "jackpot", hint: "Winning it can lead to prize money in casinos." },
        { word: "jumbo", hint: "The word can be used to refer to a type of jet airliner designed for long-haul flights with a large seating capacity." }
    ];

    var chosenWord, remainingGuesses, correctGuesses, usedLetters;

    function initializeGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        remainingGuesses = 6;
        correctGuesses = 0;
        usedLetters = [];

        $("#hint").text("Hint: " + chosenWord.hint);
        $("#guess-input").val("");
        $("#word").text(getHiddenWord());
        $("#hangman-image").attr("src", "images/hangman_0.png");
        $("#result").text("");
        $("#play-again-button").html(`Play Again`);
        $("#play-again-button").hide();
        $("#guess-button").html(`Guess`);
        $("#guess-button").prop("disabled", false);
    }

    function getHiddenWord() {
        var hiddenWord = "";
        for (var i = 0; i < chosenWord.word.length; i++) {
            if (usedLetters.includes(chosenWord.word[i])) {
                hiddenWord += chosenWord.word[i];
            } else {
                hiddenWord += "_";
            }
        }
        return hiddenWord;
    }

    function updateWordDisplay() {
        $("#word").text(getHiddenWord());
    }

    function updateHangmanImage() {
        var imageIndex = 6 - remainingGuesses;
        $("#hangman-image").attr("src", "images/hangman_" + imageIndex + ".png");
    }

    function checkGuess(letter) {
        if (usedLetters.includes(letter)) {
            alert("You have already guessed that letter!");
            return;
        }

        usedLetters.push(letter);
        if (chosenWord.word.includes(letter)) {
            correctGuesses++;
            updateWordDisplay();
            if (correctGuesses === chosenWord.word.length) {
                endGame(true);
            }
        } else {
            remainingGuesses--;
            updateHangmanImage();
            if (remainingGuesses === 0) {
                endGame(false);
            }
        }
    }

    function endGame(isWin) {
        $("#guess-button").prop("disabled", true);
        $("#play-again-button").show();
        if (isWin) {
            $("#result").text("Congratulations! You won the game.");
        } else {
            $("#result").text("Game over. You lost the game.");
        }
        $("#hangman-image").fadeToggle(2000, 'swing');
    }

    $("#guess-button").click(function () {
        var guess = $("#guess-input").val().toLowerCase();
        if (guess.length !== 1 || !guess.match(/[a-z]/)) {
            alert("Please enter a single letter.");
            return;
        }
        checkGuess(guess);
        $("#guess-input").val("");
    });

    $("#play-again-button").click(function () {
        $("#hangman-image").fadeToggle('fast', 'swing');
        initializeGame();
    });

    initializeGame();
});