// My palindrome checker JavaScript file

// This function checks if a word is real using a dictionary API
async function isRealWord(word) {
    try {
        // Use the Free Dictionary API to check if the word exists
        let response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// This function checks if a word is a palindrome
async function checkWord() {
    // Get the word from the input box
    let word = document.getElementById('wordInput').value;
    
    // Make everything lowercase and remove spaces
    word = word.toLowerCase();
    word = word.replace(/[^a-z0-9]/g, '');
    
    // Make sure they typed something
    if(word === '') {
        document.getElementById('result').innerHTML = 'Please type something!';
        document.getElementById('result').style.color = 'red';
        return;
    }
    
    // Check if it's a real word first
    if(!(await isRealWord(word))) {
        document.getElementById('result').innerHTML = 
            '❌ "' + document.getElementById('wordInput').value + '" is not a real English word ❌';
        document.getElementById('result').style.color = 'red';
        return;
    }
    
    // Make the word backwards
    let backwards = '';
    for(let i = word.length - 1; i >= 0; i--) {
        backwards = backwards + word[i];
    }
    
    // Check if it's the same forwards and backwards
    if(word === backwards) {
        // It's a palindrome!
        document.getElementById('result').innerHTML = 
            '✨ Yes! "' + document.getElementById('wordInput').value + '" is a palindrome! ✨';
        document.getElementById('result').style.color = 'green';
    } else {
        // Not a palindrome
        document.getElementById('result').innerHTML = 
            '❌ Sorry, "' + document.getElementById('wordInput').value + '" is not a palindrome ❌';
        document.getElementById('result').style.color = 'red';
    }
}

// This function clears everything to try again
function tryAgain() {
    // Clear the input box
    document.getElementById('wordInput').value = '';
    // Clear the result
    document.getElementById('result').innerHTML = '';
    // Put the cursor back in the input box
    document.getElementById('wordInput').focus();
}

// This makes the Enter key work too
document.getElementById('wordInput').addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        checkWord();
    }
});