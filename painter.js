import {makeDragable} from "./dragable_elements.js";
import {pixels, getID} from "./utils.js"

class Painter {

    constructor() {
        /**
         * @type {HTMLImageElement}
         */
        this.imgToPaint = undefined;
        this.mode = undefined;

        window.addEventListener("click", (e) => {
            if(this.mode) {
                switch (this.mode) {
                    case "paint":
                        this.paint(e.clientX,e.clientY);
                        break;
                    case "eraser":
                        if(e.target.id) {
                            this.erase(e.target.id);
                        }
                        break;
                    case "mirror":
                        if(e.target.id) {
                            this.mirror(e.target.id);
                        }
                        break;
                    case "rotate":
                        if(e.target.id) {
                            this.rotate(e.target.id);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    paint(x,y) {
        let img = this.imgToPaint.cloneNode();
        img.id = getID();
        img.style.height = pixels(30);
    
        img.style.top = pixels(~~(y - this.imgToPaint.height / 2));
        img.style.left = pixels(~~(x - this.imgToPaint.width / 2));

        img.dataset.entity = "true";
        img.dataset.eraseable = "true";
        img.dataset.flipable = "true";
        img.dataset.rotatable = "true";
    
        makeDragable(img);
        document.body.appendChild(img);
    }

    /**
     * 
     * @param {string} id 
     */
    erase(id) {
        let erasedEle = document.getElementById(id);
        if (erasedEle.dataset.eraseable == "true" && document.body.contains(erasedEle)) {
            document.body.removeChild(erasedEle);
        }
    }

    /**
     * 
     * @param {string} id 
     */
    mirror(id) {
        let flippedEle = document.getElementById(id);
        if (flippedEle.dataset.flipable == "true") {
            let transform = flippedEle.style.transform;
            let match = transform.match(/scaleX\(-1\)/);
            let flipString = match !== null ? match[0] : undefined;

            if(flipString) {
                transform = transform.replace("scaleX(-1)","");
                flippedEle.style.transform = transform;
            } else {
                flippedEle.style.transform += " scaleX(-1)";
            }
        }
    }

    /**
     * 
     * @param {string} id 
     */
    rotate(id) {
        let rotatedEle = document.getElementById(id);
        if(rotatedEle) {
            let transform = rotatedEle.style.transform;
            let match = transform.match(/rotate\(-?[0-9]*deg\)/);
            let rotateString = undefined;
            if(match !== null) {
                rotateString = match[0];
            }
            if(rotateString) {
                let angle = parseInt(rotateString.match(/-?[0-9]+/)[0]);
                transform = transform.replace(/rotate\(-?[0-9]*deg\)/, `rotate(${angle - 45 > -360 ? angle - 45 : 0}deg)`);
                rotatedEle.style.transform = transform;
            } else {
                rotatedEle.style.transform += ` rotate(${-45}deg)`;
            }
        }
    }

}

const painter = new Painter();

export {
    painter as Painter
}