document.addEventListener('DOMContentLoaded', function(){
  var buttons = document.querySelectorAll('button');
  var selects = document.querySelector('select');
  var textarea = document.querySelector('textarea');
  var languageSelect = document.getElementById("languageSelect");
  var TTS="";

  // Add click event listener to each button
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(){
          if (selects.value == 0) {
              if(buttons[i].innerText=="Revert Page Translation"){
                  if (buttons[i].innerText != "Selective Translation") {
                      buttons.forEach(btn => {
                          btn.classList.remove('opaque-button');
                          btn.disabled = false;
                      });
                  }
                  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { message: [buttons[i].innerText, languageSelect.value] });
                  });
                  this.classList.add('opaque-button');
                  buttons[i].disabled = true;

              }
              return;
          }
          if (buttons[i].innerText != "Selective Translation" && buttons[i].id!="TTS") {
              buttons.forEach(btn => {
                  btn.classList.remove('opaque-button');
                  btn.disabled = false;
              });
          }
          if(buttons[i].id=="TTS"){
              var message = new SpeechSynthesisUtterance(TTS);
              message.lang=languageSelect.value;
              window.speechSynthesis.speak(message);
              return;
          }

          if (buttons[i].innerText == "Revert Page Translation") {
              chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, { message: [buttons[i].innerText, languageSelect.value] });
              });
          } 
          if (buttons[i].innerText == "Whole Page Translation") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { message: [buttons[i].innerText, languageSelect.value] });
            });
        } 
          if (buttons[i].innerText == "Selective Translation") {
              chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, { message: [buttons[i].innerText, languageSelect.value] }, function (response) {
                      if (response && response.success) {
                          console.log("Translation received: " + response.message);
                          textarea.innerText = response.message;
                          TTS = response.message;
                      } else {
                          console.log("No response received or translation failed.");
                      }
                  });
              });
          } 
          if (buttons[i].innerText != "Selective Translation") {
              this.classList.add('opaque-button');
              buttons[i].disabled = true;
          }
      });
  }
});