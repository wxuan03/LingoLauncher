document.addEventListener('DOMContentLoaded', function(){
  var buttons = document.querySelectorAll('button');
  var languageSelect = document.getElementById("languageSelect");
  var textarea = document.querySelector('textarea');
  var TTS = "";

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          switch (button.id) {
              case "Page_Tranlation":
              case "Selective_Translation":
              case "Page_Reversion":
                  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                      chrome.tabs.sendMessage(tabs[0].id, {
                          message: [button.innerText, languageSelect.value]
                      }, function(response) {
                          if (response && response.success) {
                              textarea.value = response.message;
                              TTS = response.message; 
                              console.log("Translation received: " + response.message);
                          } else {
                              console.log("No response received or translation failed.");
                          }
                      });
                  });
                  break;
              case "TTS":
                  if (TTS) {
                      var message = new SpeechSynthesisUtterance(TTS);
                      message.lang = languageSelect.value; 
                      window.speechSynthesis.speak(message);
                  } else {
                      console.log("No text to speak");
                  }
                  break;
          }
      });
  });
});
