const text = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a')
for (let i = 0; i < text.length; i++) {
    let toBeTranslated = text[i].innerHTML;
    (function(index) {
        google.translate.translate(toBeTranslated, 'de', function(translation) {
            text[index].innerHTML = translation.translationText;
        });
    })(i);
}



function google_translate_api(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}

google_translate_api()
