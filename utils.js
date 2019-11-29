let previousFootpopup = undefined;
/**
 * 
 * @param {string} src 
 */
function cssURL(src) {
    return `url(${src})`;
}

/**
 * 
 * @param {number} number 
 */
function pixels(number) {
    return `${number}px`
}

function getID() {
    return Math.random()*Math.pow(10,17);
}

/**
 * 
 * @param {string} text 
 */
function footPopup(text) {
    if(previousFootpopup) {
        document.body.removeChild(previousFootpopup);
    }

    const bcolor = "rgba(0, 0, 0, 0.25)";
    const tcolor = "white";

    let p = document.createElement("p");
    p.style.position = "fixed";
    p.style.display = "inline";
    p.style.top = "95vh";
    p.style.left = "50vw";
    p.style.height = "4vh";
    p.style.width = "30vw";
    p.style.marginTop = "-1.5vh";
    p.style.marginLeft = "-15vw";
    p.style.textAlign = "center";
    p.style.borderRadius = "1vh";
    p.style.lineHeight = "4vh";

    p.style.backgroundColor = bcolor;
    p.style.color = tcolor;

    p.innerHTML = text;

    previousFootpopup = p;
    document.body.appendChild(p);
    setTimeout(function() {
        if(previousFootpopup) {
            document.body.removeChild(previousFootpopup);
        }
    },10000); 
}

/**
 * 
 * @param {HTMLImageElement} image 
 */
function changeCursor(image) {
    document.body.style.cursor = `${cssURL(image.src)}, auto`;
}

function resetCursor() {
    document.body.style.cursor = "";
}

export {
    cssURL,
    pixels,
    getID,
    footPopup,
    changeCursor,
    resetCursor
}