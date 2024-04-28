async function fetchTranslation(text, targetLanguage) {
    const apiKey = 'AIzaSyBlGgw4Uott8Qf0vPRUAZXhnZ-XvjAPvCA'; 
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            q: text,
            target: targetLanguage
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data.data.translations[0].translatedText;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === 'translateText') {
            fetchTranslation(request.text, request.language).then(translation => {
                sendResponse({translatedText: translation});
            }).catch(error => {
                console.error('Translation error:', error);
                sendResponse({error: 'Failed to translate text'});
            });
            return true;
        }
    }
);
