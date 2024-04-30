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
            if (buttons[i].innerText != "Selective Translation") {
              this.classList.add('opaque-button');
              buttons[i].disabled = true;
            }
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
          message.lang=selectedLanguage;
          window.speechSynthesis.speak(message);
          return;
        }
        if (buttons[i].innerText != "Selective Translation" && buttons[i].id!="TTS") {
          this.classList.add('opaque-button');
          buttons[i].disabled = true;
        }


        
        // Send message to the content script
         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { message: [buttons[i].innerHTML,languageSelect.value] }, function (response) {
              if (response) {
                  console.log(response.message);
                  textarea.innerText=response.message;
                  TTS=response.message;
              } else {
                  console.log("No response received.");
              }
          });
          console.log("Message sent.");
      });
      });
    }
  });