import StartMenu from "./StartMenu.jsx";
import { createSignal } from "solid-js";

function Footer() {
    const [show, setShown] = createSignal(false);
    return (
        <>
        <style>
            {`
            .footer {
                position: fixed;
                width: 100%;
                left: 0;
                height: 5vh;
                bottom: 0;
                background-color: rgb(22, 22, 22);
                opacity: .9;
                color: white;
                padding: 1vh;
                grid-column: 3;
                text-align: center;
            }
            .startMen {
                left: 0;
                bottom: 0;
                position: fixed;
                height: 5vh;
                width: 5vh;
            }
            .startMenu_button {
                background-color: transparent;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            .startMenu_button img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        `}
        </style>
        <div class="footer" id="footer">
            <div class="startMen" id="startMen">
                <button class="startMenu_button" onClick={() => {
                    if (show()) {
                        setShown(false);
                    } else {
                        setShown(true);
                    }
                    }}>
                    <img src="/img/logo.svg" alt="startMenu"/>
                </button>
            </div>
            <div class="pinnedApps" id="pinnedApps"></div>
        </div>
        {show() && <StartMenu />}
        </>
    )
}
export default Footer;