
function flashElementFadeOut(messageElement) {
    setTimeout(() => {  
        let opacity = 1; 
        let timer = setInterval(() => {
            if (opacity < 0.05) {
                clearInterval(timer);
                messageElement.remove();
            }
            opacity = opacity - 0.05;
            messageElement.style.opacity = opacity;
        }, 50);
    }, 4000);
}


let flashElement = document.getElementById('flash-message');
if (flashElement) {
    flashElementFadeOut(flashElement);
}