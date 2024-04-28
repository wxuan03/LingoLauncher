// sends selected text to the background script
function sendTextForTranslation(selectedText, language) {
    chrome.runtime.sendMessage({ text: selectedText, language: language }, function(response) {
        displayTranslation(response.translatedText);
    });
}

// display the translated text with a close button
function displayTranslation(translatedText) {
    // removes any translation bubble
    const existingBubble = document.querySelector('.translation-bubble');
    if (existingBubble) {
        existingBubble.remove();
    }

    const translationBubble = document.createElement('div');
    translationBubble.className = 'translation-bubble';
    translationBubble.style.position = 'fixed';    
    translationBubble.style.bottom = '20px';
    translationBubble.style.right = '20px';
    translationBubble.style.padding = '10px';
    translationBubble.style.background = 'white';
    translationBubble.style.border = '1px solid black';  
    translationBubble.style.borderRadius = '5px';
    translationBubble.style.zIndex = '1000';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginLeft = '10px';
    closeButton.onclick = function() {
        translationBubble.remove();
    };

    translationBubble.textContent = translatedText;
    translationBubble.appendChild(closeButton);
    document.body.appendChild(translationBubble);
}

// Listener for text selection
document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        // Assume the language is set via some mechanism, e.g., stored setting or popup selection
        const language = 'en'; // Default to English for demonstration
        sendTextForTranslation(selectedText, language);
    }
});

// Optional: Clear any existing selections or bubbles when clicking elsewhere
document.addEventListener('click', function(event) {
    const bubble = document.querySelector('.translation-bubble');
    if (bubble && !bubble.contains(event.target)) {
        bubble.remove();
    }
});
