document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('p.typewriter');
    const pdNoteElement = document.querySelector('p.pd-note');

    const fullTypeText = typewriterElement.getAttribute('data-text');
    
    const mainTitleRegex = /(<span class='main-title'>.*?<\/span>)/;
    const match = fullTypeText.match(mainTitleRegex);

    let titleHtml = '';
    let textAfterTitle = fullTypeText;

    if (match) {
        titleHtml = match[0]; 
        textAfterTitle = fullTypeText.replace(mainTitleRegex, ''); 
    }

    typewriterElement.innerHTML = titleHtml;

    const typewriterElements = [
        {
            element: typewriterElement, 
            text: textAfterTitle,
            speed: 50,
            delayAfter: 1500
        },
        {
            element: pdNoteElement,
            text: pdNoteElement.getAttribute('data-text'),
            speed: 70,
            htmlToAppend: '<img src="3.png" alt="Animación bonita" class="inline-animation">'
        }
    ];

    let currentTypewriterIndex = 0;
    let charIndex = 0; 

    function typeWriterEffect(itemIndex) {
        if (itemIndex >= typewriterElements.length) {
            return; 
        }

        const currentItem = typewriterElements[itemIndex];
        const targetElement = currentItem.element;
        const fullTextToType = currentItem.text;
        const speed = currentItem.speed;
        const delayAfter = currentItem.delayAfter || 0;
        const htmlToAppend = currentItem.htmlToAppend || '';

    
        if (itemIndex > 0) {
            targetElement.innerHTML = '';
        }

        charIndex = 0; 

        function type() {
            if (charIndex < fullTextToType.length) {
                if (fullTextToType.charAt(charIndex) === '<') {
                    const closingTagIndex = fullTextToType.indexOf('>', charIndex);
                    if (closingTagIndex !== -1) {
                        const tag = fullTextToType.substring(charIndex, closingTagIndex + 1);
                        targetElement.innerHTML += tag;
                        charIndex = closingTagIndex + 1;
                    } else {
                        targetElement.innerHTML += fullTextToType.charAt(charIndex);
                        charIndex++;
                    }
                } else {
                    targetElement.innerHTML += fullTextToType.charAt(charIndex);
                    charIndex++;
                }
                setTimeout(type, speed);
            } else {
                if (htmlToAppend) {
                    targetElement.innerHTML += htmlToAppend;
                    const inlineAnimationImg = targetElement.querySelector('.inline-animation');
                    if (inlineAnimationImg) {
                        setTimeout(() => {
                            inlineAnimationImg.style.opacity = '1';
                            inlineAnimationImg.style.transform = 'scale(1) rotate(0deg)';
                        }, 50);
                    }
                }
                
                setTimeout(() => {
                    typeWriterEffect(itemIndex + 1);
                }, delayAfter);
            }
        }
        type(); 
    }

    typeWriterEffect(0);
});