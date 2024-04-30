
toTranslate="";


function wholePageTextReplacement(){
    temp = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
    for (let i = 0; i < temp.length; i++) {
      temp[i].innerText="Talin";
    }
  }


    const set = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a');
    set.forEach(element => {
        element.addEventListener("mouseup", function(){
            toTranslate=window.getSelection().toString();
            console.log(toTranslate);
        });
    });
  
  
  function wholePageReversion(){
    location.reload();
  }
  
  function selectFunctionality() {
    return toTranslate;
}
  
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.message[0] == "Whole Page Translation") {
      wholePageTextReplacement();
  } else if (request.message[0] == "Selective Translation") {
      console.log("Selected text: " + toTranslate);
      apiRequest(toTranslate, request.message[1]).then(translatedText => {
          sendResponse({ success: true, message: translatedText});
      }).catch(error => {
          console.error("Translation error: ", error);
          sendResponse({ success: false, message: "Translation failed."});
      });
      return true; // Indicates that the response is asynchronous.
  } else if (request.message[0] == "Revert Page Translation") {
      wholePageReversion();
  }
});


  async function apiRequest(text, target = 'de', source = '') {
    const url = "https://microsoft-translator-text.p.rapidapi.com/translate?to=" +
        target + "&api-version=3.0&" + source + "profanityAction=NoAction&textType=plain";

    const headers = {
        "content-type": "application/json",
        "x-rapidapi-key": "68a912a86dmsh28ce246dc9ccbddp14fa55jsnc94f0e7ccb4d",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
    };

    const data = JSON.stringify([{ "text": text }]);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const translatedText = responseData[0].translations[0].text;
        console.log("Translated text:", translatedText); 
        return translatedText; 
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
  



  





  
 


















  