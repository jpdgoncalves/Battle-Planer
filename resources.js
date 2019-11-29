

class ImageResources {

    /**
     * 
     * @param {string} basepath 
     */
    constructor(basepath) {
        this.basepath = basepath;

        /**
         * @type {Object.<string,HTMLImageElement>}
         */
        this.images = {};
    }

    /**
     * 
     * @param {string} src 
     * @param {string} name 
     */
    load(src,name) {
        let img = document.createElement("img");
        img.src = `${this.basepath}/${src}`;
        this.images[name] = img;
    }

    /**
     * 
     * @param {string} name 
     * @returns {HTMLImageElement}
     */
    get(name) {
        if(name in this.images) {
            return this.images[name].cloneNode();
        } else {
            throw new Error(`the resource ${name} does not exist`);
        }
    }

    /**
     * 
     * @param {string} oldName 
     * @param {string} newName 
     * @param {string} filter 
     */
    createFromFilter(oldName,newName,filter) {
        let img = this.get(oldName);
        img.style.filter += filter;
        this.images[newName] = img;
    }

    /**
     * 
     * @param {number} deegres 
     */
    static hue(deegres) {
        return `hue-rotate(${deegres}deg)`
    }

}

export {
    ImageResources
}