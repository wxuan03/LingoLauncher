let toTranslate = ""; //variable for selected text

//listeners for potential text elements selected
document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a').forEach(element => {
    element.addEventListener("mouseup", () => {
        toTranslate = window.getSelection().toString();
        console.log(toTranslate);
    });
});

//this function requests the translation through microsoft translator text rapidapi
function apiRequest(text, target = 'de', source = '') {
    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${target}&api-version=3.0&${source}profanityAction=NoAction&textType=plain`;
    const headers = {
        "content-type": "application/json",
        "x-rapidapi-key": "68a912a86dmsh28ce246dc9ccbddp14fa55jsnc94f0e7ccb4d",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
    };
    //prepares text data for sending the request
    const data = JSON.stringify([{ "text": text }]);

    //makes the translation request 
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => { //checks for response, throws error if the response fails
        if (!response.ok) throw new Error('Network response was not ok'); 
        return response.json();
    })
    .then(json => json[0].translations[0].text);
}

//function to translate full page
function wholePageTextReplacement(languageToTranslateTo) {
    let allText = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
    let textToTranslate = Array.from(allText).map(el => el.innerText).join(" ");
    textToTranslate = textToTranslate.slice(0, 2500); // joins all text on page but limits due to API

    //requests translation for text
    apiRequest(textToTranslate, languageToTranslateTo)
        .then(translatedText => {
            let index = 0;
            //replaces each element's text with translated text
            allText.forEach(element => {
                let textLength = element.innerText.length;
                if (index + textLength <= translatedText.length) {
                    element.innerText = translatedText.slice(index, index + textLength);
                    index += textLength;
                }
            });
        })
        .catch(error => console.error("Translation error: ", error));
}

//refreshes page 
function wholePageReversion() {
    location.reload();
}

//listener for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    switch (request.message[0]) { //depending on the message sent from popup.js, performs functionality
        case "Whole Page Translation":
            wholePageTextReplacement(request.message[1]);
            break;
        case "Selective Translation":
            console.log("Selected text: " + toTranslate);
            apiRequest(toTranslate, request.message[1]).then(translatedText => {
                sendResponse({ success: true, message: translatedText });
            }).catch(error => {
                console.error("Translation error: ", error);
                sendResponse({ success: false, message: "Translation failed." });
            });
            return true; //keeps message channel open for response
        case "Revert Page Translation":
            wholePageReversion();
            break;
    }
});
