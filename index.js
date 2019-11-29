import { Menu } from "./menu.js";
import { SaveFile } from "./loadsave.js";

window.addEventListener("load", function() {
    SaveFile.load();
    
    document.addEventListener("keydown", function(e) {
        console.log(`key down: ${e.code}`);
        if(e.code === "Space") {
            Menu.toggle();
        }
    });
});