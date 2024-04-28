

  
  function wholePageTextReplacement(){
    temp = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
    for (let i = 0; i < temp.length; i++) {
      temp[i].innerText="";
    }
  }
  
  function wholePageReversion(){
    location.reload();
  }
  
  function selectFunctionality(){
  }

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.message == "Whole Page Translation") {
        wholePageTextReplacement();
    }else if(request.message == "Selective Translation"){
        selectFunctionality();
    }else if(request.message == "Revert Page Translation"){
        console.log("hi")
        wholePageReversion();
    }
  });
 