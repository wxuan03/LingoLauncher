toTranslate="";
  function wholePageTextReplacement(){
    temp = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
    for (let i = 0; i < temp.length; i++) {
      temp[i].innerText="Talin is pookie"; //translate each one
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
  
  function selectFunctionality(){
    return toTranslate; // translate the text before returning
  }

  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.message == "Whole Page Translation") {
        wholePageTextReplacement();
    }else if(request.message == "Selective Translation"){
        selectFunctionality();
        sendResponse({ success: true, message: toTranslate });
    }else if(request.message == "Revert Page Translation"){
        wholePageReversion();
    }
    return true;
  });
 