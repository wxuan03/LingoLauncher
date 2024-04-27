
const originalText = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a');
highlightedText="";

function wholePageTextReplacement(){
    temp = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a')
    for (let i = 0; i < temp.length; i++) {
        temp[i].innerText="";
    }
}


function wholePageReversion(){
    temp=document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a')
    for (let i = 0; i < temp.length; i++) {
        temp[i].innerText=originalText[i].innerText;
    }
}


function selectFunctionality(){
    document.addEventListener("mouseup", function(){ 
        highlightedText=window.getSelection().toString();
    });
}



