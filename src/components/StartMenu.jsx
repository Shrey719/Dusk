function StartMenu() {
    return (
        <>
        <style>
            {`
                .startMenu {
                    background-color: rgba(100, 100, 100, 0.5);
                    position: fixed;
                    bottom: 0; 
                    left: 0;
                    width: 20vw;
                    height: 50vh;
                    display: hidden;
                    margin-bottom: 7vh;
                    border-top-left-radius: 1rem;
                    border-top-right-radius: 1rem;
                }
            `}
        </style>
        <div class="startMenu" id="startMenu">

        </div>
        </>
    )
}

export default StartMenu