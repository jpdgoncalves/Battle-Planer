import { cssURL } from "./utils.js";
import { ImageResources } from "./resources.js";
import { footPopup } from "./utils.js";
import { makeDragable } from "./dragable_elements.js";

const backgroundURL = "terrae.png";
let resources = new ImageResources("resources");
let loadInput = document.createElement("input");

loadInput.type = "file";
loadInput.accept = "application/json";
loadInput.style.display = "none";
loadInput.onchange = (e) => { SaveFile.load(e.target.files[0]) };
document.body.appendChild(loadInput);

resources.load(backgroundURL, "background");

class SaveFile {

    static promptForLoad() {
        loadInput.click();
    }

    /**
     * 
     * @param {File} file 
     */
    static load(file) {
        if (file) {

            for(let ele of document.querySelectorAll("img[data-entity='true']")) {
                ele.parentElement.removeChild(ele);
            }

            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (e) {
                const json = JSON.parse(e.target.result);
                const div = document.createElement("div");
                const elements = json.map_html.match(/<.*?>/gm);

                document.body.style.backgroundImage = json.background_url;
                for (let ele of elements) {
                    div.innerHTML = ele;
                    let img = div.children[0];
                    makeDragable(img);
                    document.body.appendChild(img);
                }
                footPopup("File loaded");
            }
        } else {
            document.body.style.backgroundImage = cssURL(resources.get("background").src);
        }
    }

    static save() {

        let background_url = document.body.style.backgroundImage;
        let elements = document.querySelectorAll("img[data-entity='true']");
        let map_html = "";
        for (let img of elements) {
            console.log(img.outerHTML);
            map_html += img.outerHTML;
        }
        let json = {
            background_url: background_url,
            map_html: map_html
        };

        let file = new Blob([JSON.stringify(json)], { type: "application/json" });

        let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = `map-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
        footPopup("File saved");
    }
}

export {
    SaveFile
}