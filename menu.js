import {changeCursor} from "./utils.js";
import {ImageResources} from "./resources.js";
import {Painter} from "./painter.js";
import {enableDrag, disableDrag} from "./dragable_elements.js";
import {SaveFile} from "./loadsave.js";

class Menu {

    constructor() {
        let menuElement = (function() {
            let container = document.createElement("div");
            
            for(let i = 0; i < 10; i++) {
                let item = document.createElement("div");
                item.classList.add("item");
                container.appendChild(item);
            }

            container.classList.add("menu");
            return container;
        })();
        

        window.addEventListener("load", function() {
            document.body.appendChild(menuElement);
        });

        this.menuElement = menuElement;
        this.items = this.menuElement.children;
    }

    /**
     * 
     * @param {HTMLElement} item 
     * @param {number} pos 
     * @param {Function} callback 
     */
    setItemAt(item,pos,callback) {
        this.unsetItemAt(pos);
        this.items[pos].appendChild(item);
        this.items[pos].onclick = callback;
    }

    /**
     * 
     * @param {number} pos 
     */
    unsetItemAt(pos) {
        if(pos >= 0 && pos < this.items.length) {
            this.items[pos].onclick = undefined;
            this.items[pos].innerHTML = "";
        } else {
            throw new RangeError("Invalid index");
        }
    }

    clear() {
        for(let item of this.items) {
            item.onclick = undefined;
            item.innerHTML = "";
        }
    }

    toggle() {
        this.menuElement.classList.toggle("hide");
        if (this.menuElement.classList.contains("hide")) {
            this.menuElement.style.top = "-13vh";
        } else {
            this.menuElement.style.top = "0.5vw";
        }
    }
}

class BattleMakerMenu extends Menu {

    constructor() {
        super();

        this.resources = new ImageResources("resources");
        this.resources.load("back.svg","back");
        this.resources.load("diskette.svg","save");
        this.resources.load("loading.svg","load");
        this.resources.load("cursor.svg","cursor-icon");
        this.resources.load("cursor.png","cursor");
        this.resources.load("brush.svg","brush-icon");
        this.resources.load("brush.png","brush-cursor");
        this.resources.load("eraser.svg","eraser-icon");
        this.resources.load("eraser.png","eraser-cursor");
        this.resources.load("mirror.svg","mirror-icon");
        this.resources.load("mirror.png","mirror-cursor");
        this.resources.load("rotate.svg","rotate-icon");
        this.resources.load("rotate.png","rotate-cursor");

        this.resources.load("bear.png","bear");
        this.resources.createFromFilter("bear","bear-2",ImageResources.hue(180));
        this.resources.load("compass.png","arrow");
        this.resources.createFromFilter("arrow","arrow-2", ImageResources.hue(120));

        this.main();
    }

    main() {
        let images = this.resources.images;

        this.clearMenu();
        this.createOptionAt(images["brush-icon"], 0, (e) => this.brush());
        this.createOptionAt(images["eraser-icon"], 1, function(e) {
            disableDrag();
            changeCursor(images["eraser-cursor"]);
            Painter.mode = "eraser";
        });
        this.createOptionAt(images["mirror-icon"], 2, (e) => {
            disableDrag();
            changeCursor(images["mirror-cursor"]);
            Painter.mode = "mirror";
        });
        this.createOptionAt(images["cursor-icon"], 3, (e) => {
            this.main();
        });
        this.createOptionAt(images["rotate-icon"], 4, (e) => {
            disableDrag();
            changeCursor(images["rotate-cursor"]);
            Painter.mode = "rotate";
        });
        this.createOptionAt(images["save"], 5, SaveFile.save);
        this.createOptionAt(images["load"], 6, SaveFile.promptForLoad);
    }

    brush() {
        let images = this.resources.images;

        this.clearMenu();
        disableDrag();
        this.createOptionAt(images["bear"], 0, (e) => {
            setTimeout(() => {
                disableDrag();
                changeCursor(images["brush-cursor"]);
                Painter.imgToPaint = images["bear"];
                Painter.mode = "paint";
            }, 1000);
        });
        this.createOptionAt(images["bear-2"], 1, (e) => {
            setTimeout(() => {
                disableDrag();
                changeCursor(images["brush-cursor"]);
                Painter.imgToPaint = images["bear-2"];
                Painter.mode = "paint";
            }, 1000);
        }
        );
        this.createOptionAt(images["arrow"], 2, (e) => {
            setTimeout(() => {
                disableDrag();
                changeCursor(images["brush-cursor"]);
                Painter.imgToPaint = images["arrow"];
                Painter.mode = "paint";
            }, 1000);
        }
        );
        this.createOptionAt(images["arrow-2"], 3, (e) => {
            setTimeout(() => {
                disableDrag();
                changeCursor(images["brush-cursor"]);
                Painter.imgToPaint = images["arrow-2"];
                Painter.mode = "paint";
            }, 1000);
        }
        );
        this.createOptionAt(images["back"], 9, (e) => this.main());
    }

    /**
     * 
     * @param {HTMLImageElement} icon 
     * @param {number} pos
     * @param {Function} callback
     */
    createOptionAt(icon,pos,callback) {
        this.setItemAt(icon,pos,callback);
    }

    /**
     * 
     * @param {number} pos 
     */
    removeOptionAt(pos) {
        this.unsetItemAt(pos);
    }

    clearMenu() {
        Painter.mode = undefined;
        enableDrag();
        changeCursor(this.resources.images["cursor"]);
        this.clear();
    }

}

const menu = new BattleMakerMenu();

export {
    menu as Menu
}