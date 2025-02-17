function createProcess(code, pid) {
    if (document.getElementById(pid)) {
        console.log('Process with pid ' + pid + ' already exists.')
        return;
    }
    let procframe = document.createElement('iframe')
    procframe.style.border = 'none'
    procframe.style.width = '100%'
    procframe.style.height = '30vh'
    procframe.src = '/js/fcreator?' + encodeURIComponent(code)
    procframe.id = 'process-' + pid

    let container = document.createElement('div')
    container.style.width = '30vw'
    container.style.position = 'absolute'
    container.appendChild(procframe)

    let handle = document.createElement('div')
    let closeBtn = document.createElement('button')
    let minBtn = document.createElement('button')
    let maxBtn = document.createElement('button')
    closeBtn.textContent = 'x'
    minBtn.textContent = '-'
    maxBtn.textContent = '+'
    maxBtn.style.backgroundColor = 'transparent'
    closeBtn.style.backgroundColor = 'transparent'
    minBtn.style.backgroundColor = 'transparent'

    handle.appendChild(closeBtn)
    handle.appendChild(minBtn)
    handle.appendChild(maxBtn)
    handle.style.width = '100%'
    handle.style.height = '20px'
    handle.style.backgroundColor = '#ddd'
    handle.style.cursor = 'move'
    handle.style.userSelect = 'none' // Prevent text selection on double click
    container.insertBefore(handle, procframe)

    document.body.appendChild(container)
    makeDraggable(container, handle)
}


// as chatgpt i cannot work on shit code please try agin latr
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}