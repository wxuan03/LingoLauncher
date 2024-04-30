let toTranslate = "";

document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a').forEach(element => {
    element.addEventListener("mouseup", () => {
        toTranslate = window.getSelection().toString();
        console.log(toTranslate);
    });
});

function apiRequest(text, target = 'de', source = '') {
    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${target}&api-version=3.0&${source}profanityAction=NoAction&textType=plain`;
    const headers = {
        "content-type": "application/json",
        "x-rapidapi-key": "68a912a86dmsh28ce246dc9ccbddp14fa55jsnc94f0e7ccb4d",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
    };
    const data = JSON.stringify([{ "text": text }]);

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(json => json[0].translations[0].text);
}

function wholePageTextReplacement(languageToTranslateTo) {
    let allText = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
    let textToTranslate = Array.from(allText).map(el => el.innerText).join(" ");
    textToTranslate = textToTranslate.slice(0, 2500); // API limit

    apiRequest(textToTranslate, languageToTranslateTo)
        .then(translatedText => {
            let index = 0;
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

function wholePageReversion() {
    location.reload();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    switch (request.message[0]) {
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
            return true; 
        case "Revert Page Translation":
            wholePageReversion();
            break;
    }
});
