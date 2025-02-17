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
    handle.style.height = '20px';
    handle.style.backgroundColor = '#ddd';
    handle.style.cursor = 'move';
    handle.style.userSelect = 'none';

    const closeBtn = createButton('x', () => killProcess(pid));
    const minBtn = createButton('-', () => minimizeProcess(pid));
    const maxBtn = createButton('+', () => maximizeProcess(pid));

    handle.appendChild(closeBtn);
    handle.appendChild(minBtn);
    handle.appendChild(maxBtn);

    return handle;
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.backgroundColor = 'transparent';
    button.onclick = onClick;
    return button;
}

function createProcessFrame(code, pid) {
    const procframe = document.createElement('iframe');
    procframe.style.border = 'none';
    procframe.style.width = '100%';
    procframe.style.height = '30vh';
    procframe.src = '/js/fcreator?' + encodeURIComponent(code);
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

function minimizeProcess(pid) {
    const container = document.getElementById(`container-${pid}`);
    if (container) {
        const procframe = container.querySelector(`#process-${pid}`);
        if (procframe) {
            procframe.style.display = procframe.style.display === 'none' ? 'block' : 'none';
        }
    }
}

function maximizeProcess(pid) {
    const container = document.getElementById(`container-${pid}`);
    if (container) {
        container.style.width = '90vw';
        container.style.height = '100vh';
    }
}

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