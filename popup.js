document.addEventListener('DOMContentLoaded', function(){           //After the page is done loading continue
  var buttons = document.querySelectorAll('button');                //Iterates through the lingolauncher html and gets the buttons
  var languageSelect = document.getElementById("languageSelect");   //Gets the select feature
  var textarea = document.querySelector('textarea');                //Gets the text area 
  var TTS = "";                                                     //The currnt TTS


  buttons.forEach(button => {                                       //Creates event listeners for each button on the click
      button.addEventListener('click', function() {
          switch (button.id) {                                      //Switch statement to generate functionality for each type of button
              case "Page_Tranlation":
              case "Selective_Translation":
              case "Page_Reversion":
                  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {   //If the button is Page_Translation, Selective_Translation, or "Page_Reversion" send a message to content.js 
                      chrome.tabs.sendMessage(tabs[0].id, {                                 //Queries the browster to get the active tab within the current window 
                          message: [button.innerText, languageSelect.value]                 //Get the tabs which should only be 1 and send a message to it containing the button command and respective language
                      }, function(response) {                                               //If there is a response coming from content.js
                          if (response && response.success) {                               //If the response is there and successful
                              textarea.value = response.message;                            //Change the text area to the translation
                              TTS = response.message;                                       //Change the TTS to the translation
                              console.log("Translation received: " + response.message);     //Debug
                          } else {
                              console.log("No response received or translation failed.");   //Debug
                          }
                      });
                  });
                  break;                                                                    //Break from switch case
              case "TTS":
                  if (TTS) {                                                                //If the button is text to speech load the message into the SpeechSynthesisUtterance(TTS) or TTS request
                      var message = new SpeechSynthesisUtterance(TTS);                      
                      message.lang = languageSelect.value;                                  //Set the language of the request
                      window.speechSynthesis.speak(message);                                //Process the request
                  } else {
                      console.log("No text to speak");                                      //Debug
                  }
                  break;                                                                    //Break from switch case
          }
      });
  });
});