import { onMount } from "solid-js";

function StartMenu() {
    onMount(() => {
        if (window.initStartMenu) {
            
            window.initStartMenu();
        }
    });

    return (
        <>
        <style>
            {`
                .startMenu {
                    background-color: rgba(255, 255, 255, 0.5);
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 30vw;
                    height: 50vh;
                    display: block;
                    margin-bottom: 7vh;
                    border-top-left-radius: 1rem;
                    border-top-right-radius: 1rem;
                }
            `}
        </style>
        <div class="startMenu" id="startMenu">
            <div class="startMenuApps" id="startMenuApps">
            </div>
        </div>
        </>
    )
}

export default StartMenu