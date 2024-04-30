
translated="";
toTranslate="";


function wholePageTextReplacement(){
    temp = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
    for (let i = 0; i < temp.length; i++) {
      //temp[i].innerText=apiRequest(temp[i].innerText, "fr");
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
  
  async function selectFunctionality(lang) {
    try {
        const translatedText = await apiRequest(toTranslate, lang);
        console.log(translatedText);
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return ''; 
    }
}
  
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log(request);
  if (request.message[0] == "Whole Page Translation") {
    wholePageTextReplacement();
  } else if (request.message[0] == "Selective Translation") {
    const translatedText = await selectFunctionality(request.message[1]);
    console.log("This is: " + translatedText);
    sendResponse({ success: true, message: hello});
  } else if (request.message[0] == "Revert Page Translation") {
    wholePageReversion();
  }
  return true;
});


  async function apiRequest(text, target = 'de', source = '') {
    const url = "https://microsoft-translator-text.p.rapidapi.com/translate?to=" +
        target + "&api-version=3.0&" + source + "profanityAction=NoAction&textType=plain";

    const headers = {
        "content-type": "application/json",
        "x-rapidapi-key": "8cc341acf1msh1184fa064c106adp1fcfa6jsn80dfc619be1b",
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
        console.log("Translated text:", translatedText); // Log the translated text
        return translatedText; // Return the translated text
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
  



  





  
 


















  