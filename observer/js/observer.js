const urlParams = new URLSearchParams(window.location.search)
const renderer = new Renderer()
const game = new Game(renderer)

if (urlParams.has("file")) {
    document.getElementById("js-file").style.display = "none"
    game.loadUrl(urlParams.get("file"))
}

document.getElementById("js-speed").addEventListener("change", (e) => {
    game.frameSpeed = parseInt(e.target.value)
})

document.getElementById("js-slider").addEventListener("input", (e) => {
    game.nextFrameId = parseInt(e.target.value)
})

document.getElementById("js-play").addEventListener("click", (e) => {
    game.startPlayback()
})

document.getElementById("js-pause").addEventListener("click", (e) => {
    game.stopPlayback()
})

// on mouse drag
document.addEventListener("mousedown", (e) => {
    if (game.playing) {
        return
    }
    let x = e.clientX
    let y = e.clientY
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    function onMouseMove(e) {
        game.renderer.pan(e.clientX - x, e.clientY - y)
        x = e.clientX
        y = e.clientY
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    }
})

// on mouse wheel, zoom in and out
document.addEventListener("wheel", (e) => {
    if (game.playing) {
        return
    }
    if (e.deltaY > 0) {
        game.renderer.zoom(0.9)
    } else {
        game.renderer.zoom(1.1)
    }
})

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (game.playing) {
            game.stopPlayback()
        } else {
            game.startPlayback()
        }
        e.preventDefault()
    }

    if (e.code === "ArrowLeft") {
        if (game.playing) {
            return
        }
        game.frame = Math.max(game.frame-1, 0)
        game.nextFrameId = game.frame
        game.nextFrame()
        e.preventDefault()
    }
    if (e.code === "ArrowRight") {
        if (game.playing) {
            return
        }
        game.frame = Math.min(game.frame+1, game.frames.length-1)
        game.nextFrameId = game.frame
        game.nextFrame()
        e.preventDefault()
    }
})
