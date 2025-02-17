function createProcess(code, pid) {
    if (document.getElementById(pid)) {
        console.log('Process with pid ' + pid +' already exists.')
        return;
    }
    let procframe = document.createElement('iframe')
    procframe.style.border = 'none'
    procframe.style.width = '30%'
    procframe.style.height = '30%'
    procframe.src = '/js/fcreator?' + encodeURIComponent(code) 
    procframe.id = 'process-' + pid
    document.body.appendChild(procframe)
}
