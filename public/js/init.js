if (localStorage.getItem('appList') === null) {
    localStorage.setItem('appList', JSON.stringify([{
        name: 'Terminal',
        icon: '/img/sh.svg',
        code: `<html><body><iframe src="/sh" height="100%" width="100%" style="border: none; margin: 0; padding: 0;"></iframe><body><head>
                html, body {
                    margin: 0;
                    padding: 0;
                }
        </head></html>`
    }]));
}

window.$dusk = {
    globalPid: 0
}

function pushApp(name, icon, code) {
    $dusk.globalPid++;
    const app = document.createElement('div');
    app.className = 'start-menu-app';
    
    const iconElement = document.createElement('img');
    iconElement.src = icon;
    iconElement.alt = name;
    iconElement.className = 'start-menu-app-icon';

    const nameElement = document.createElement('span');
    nameElement.textContent = name;
    nameElement.className = 'start-menu-app-name';

    app.appendChild(iconElement);
    app.appendChild(nameElement);

    app.addEventListener('click', () => createProcess(code, $dusk.globalPid));
    document.getElementById('startMenuApps').appendChild(app);
}

window.initStartMenu = function() {
    const startMenuApps = document.getElementById('startMenuApps');
    if (startMenuApps) {
        startMenuApps.innerHTML = ''; // Clear existing apps
        let appList = JSON.parse(localStorage.getItem('appList'));
        
        // Add CSS for start menu apps
        const style = document.createElement('style');
        style.textContent = `
            .start-menu-app {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px;
                margin: 5px;
                cursor: pointer;
                border-radius: 5px;
                transition: background-color 0.3s;
                width: 80px;
                text-align: center;
            }
            .start-menu-app:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            .start-menu-app-icon {
                width: 48px;
                height: 48px;
                margin-bottom: 5px;
            }
            .start-menu-app-name {
                color: white;
                font-size: 12px;
                word-wrap: break-word;
            }
        `;
        document.head.appendChild(style);

        appList.forEach(app => {
            pushApp(app.name, app.icon, app.code);
        });
    }
}