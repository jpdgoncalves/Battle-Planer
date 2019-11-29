let dragTarget = undefined;
let dragBlocked = false;

/**
 * 
 * @param {MouseEvent} ev 
 */
function mouseDown(ev) {
    let target = ev.target;
    if (target.dataset.draggable == "true") {
        dragTarget = target;
    }
}

function mouseUp() {
    dragTarget = undefined;
}

/**
 * 
 * @param {MouseEvent} ev 
 */
function mouseMove(ev) {

    if(dragTarget && !dragBlocked) {
        let height = dragTarget.height;
        let width = dragTarget.width; 
        let clientX = ev.clientX;
        let clientY = ev.clientY;
        dragTarget.style.top = `${~~(clientY - height / 2)}px`;
        dragTarget.style.left = `${~~(clientX - width / 2)}px`;
    }
}

/**
 * 
 * @param {HTMLElement} ele 
 */
function makeDragable(ele) {
    ele.style.position = "fixed";
    ele.dataset.draggable = true;
    ele.draggable = false;

    ele.addEventListener("mousedown", mouseDown);
    ele.addEventListener("mouseup", mouseUp);
    ele.addEventListener("mousemove", mouseMove);
}

/**
 * 
 * @param {HTMLElement} ele 
 */
function undoDragable(ele) {
    ele.dataset.draggable = false;
}

window.addEventListener("mouseup", mouseUp);
window.addEventListener("mousemove", mouseMove);

/**
 * 
 */
function disableDrag() {
    dragBlocked = true;
}

function enableDrag() {
    dragBlocked = false;
}

export {
    makeDragable,
    undoDragable,
    disableDrag,
    enableDrag
}