const urlParams = new URLSearchParams(window.location.search)
const renderer = new Renderer()
const game = new Game(renderer)

if (urlParams.has("file")) {
    document.getElementById("js-file").style.display = "none"
    game.loadUrl(urlParams.get("file"))
}

if (urlParams.has("game_id")) {
    document.getElementById("js-file").style.display = "none"
    game.loadByGameId(urlParams.get("game_id"))
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

// zoom on touch screen
document.addEventListener("touchstart", (e) => {
    if (game.playing) {
        return
    }
    if (e.touches.length == 2) {
        game.renderer.startZoom(e.touches)
    }
})

document.addEventListener("touchmove", (e) => {
    if (game.playing) {
        return
    }
    if (e.touches.length == 2) {
        game.renderer.zoomTouch(e.touches)
    }
})

document.addEventListener("touchend", (e) => {
    if (game.playing) {
        return
    }
    if (e.touches.length == 1) {
        game.renderer.endZoom()
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
