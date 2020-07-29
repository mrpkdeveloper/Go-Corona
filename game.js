function intit() {
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = canvas.width = 1000
    H = canvas.height = 500
}


function draw() {

}

function update() {

}

function gameloop() {

    draw()
    update()
}

intit()
let game = setInterval(gameloop, 100);