function createProcess(code, pid) {
    const containerId = `container-${pid}`;
    if (document.getElementById(containerId)) {
        console.log(`Process with pid ${pid} already exists.`);
        return;
    }

    const container = document.createElement('div');
    container.id = containerId;
    container.style.width = '30vw';
    container.style.position = 'absolute';

    const handle = createHandle(pid);
    container.appendChild(handle);

    const procframe = createProcessFrame(code, pid);
    container.appendChild(procframe);

    document.body.appendChild(container);
    makeDraggable(container, handle);
}

function createHandle(pid) {
    const handle = document.createElement('div');
    handle.style.width = '100%';
    handle.style.backgroundColor = '#ddd';
    handle.style.cursor = 'move';
    handle.style.userSelect = 'none';

    const closeBtn = createButton('x', () => killProcess(pid));
    const maxBtn = createButton('+', () => maximizeProcess(pid));

    handle.height = closeBtn.height = maxBtn.height = '2vh';
    handle.appendChild(closeBtn);
    handle.appendChild(maxBtn);

    return handle;
}

// WHY THE FYCK DID I DO THIS??
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('appGUIHeaderButton');
    button.style.backgroundColor = 'transparent';
    button.onclick = onClick;
    return button;
}

function createProcessFrame(code, pid) {
    const procframe = document.createElement('iframe');
    procframe.style.border = 'none';
    procframe.style.width = '100%';
    procframe.style.height = '30vh';
    procframe.style.margin = '0';
    // hacky bullshit
    procframe.src = '/js/fcreator?' + encodeURIComponent(code);
    // fuck it im not even trying anymore
    procframe.id = `process-${pid}`;
    return procframe;
}

function killProcess(pid) {
    const container = document.getElementById(`container-${pid}`);
    if (container) {
        container.remove();
    } else {
        console.log(`Process with pid ${pid} does not exist.`);
    }
}

function maximizeProcess(pid) {
    const container = document.getElementById(`container-${pid}`);
    if (container) {
        // keep the dimensions for unfullscreening and probably other stuff later
        // like maybe crash restoration? probably not lmao
        container.dataset.originalStyle = container.getAttribute('style');

        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.zIndex = "9999";
        container.style.padding = "0";
        container.style.margin = "0";
        container.style.backgroundColor = "#000";

        const processFrame = document.getElementById(`process-${pid}`);
        if (processFrame) {
            processFrame.style.height = "100%";
            processFrame.style.width = "100%";
        }

        // if i add another div i get fucked... so i wont add another div
        const handle = container.querySelector('div');
        if (handle) {
            handle.style.cursor = 'default';
            handle.onmousedown = null;
        }

        // if esc pressed, leave fullscreen
        // jmp to restoreProcess
        function exitFullscreen(e) {
            if (e.key === 'Escape') {
                restoreProcess(pid);
                document.removeEventListener('keydown', exitFullscreen);
            }
        }
        document.addEventListener('keydown', exitFullscreen);
    }
}

function restoreProcess(pid) {
    const container = document.getElementById(`container-${pid}`);
    if (container && container.dataset.originalStyle) {
        container.setAttribute('style', container.dataset.originalStyle);
        delete container.dataset.originalStyle;
    }
    makeDraggable(container, container.querySelector('div')); // ah yes, the wonderful method of "if another div gets added we get fucked" im not changing it lol
}



function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event; // for those ie6 users or something idfk
        // its very laggy
        // im not gonna fix it
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX; // minor fuckery
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = document.onmousemove = null;
    }
}