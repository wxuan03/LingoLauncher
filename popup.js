document.addEventListener('DOMContentLoaded', function(){
    var buttons = document.querySelectorAll('button');
    var selects = document.querySelector('select');
    var textarea = document.querySelector('textarea');
    // Add click event listener to each button
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(){
        if (selects.value == 0) {
          return;
        }
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

        
        // Send message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { message: buttons[i].innerHTML }, function (response) {
              if (response) {
                  console.log(response.message);
                  textarea.innerText=response.message;
              } else {
                  console.log("No response received.");
              }
          });
          console.log("Message sent.");
      });
      });
    }
  });