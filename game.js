function intit() {
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = canvas.width = 1000
    H = canvas.height = 500
    cw = 70
    //fighter
    fighter_img = new Image()
    fighter_img.src = "./assets/superhero.png"
    fighter = {
        x: 20,
        y: 200
    }


    //virus image
    virus_img = new Image()
    virus_img.src = "./assets/v1.png"

    //virus class
    class virusclass {
        constructor(x, y, direction, speed) {
            this.x = x
            this.y = y
            this.direction = direction
            this.speed = speed
            this.update_virus = function () {
                if (this.y > H - cw || this.y < 0) {
                    this.speed *= -1
                }
                this.y += this.speed
            }
        }
    }

    //virus objects created
    virus1 = new virusclass(W / 3 - 100, 0, "down", 30)
    virus2 = new virusclass(W / 2, H - cw, "up", 50)
    virus3 = new virusclass(W - 200, 0, "down", 30)



    function keypressed(e) {
        if (e.key == "ArrowRight") {
            // console.log("in arrow right")
            fighter.x += 30
        }
        if (e.key == "ArrowLeft") {
            // console.log("in arrow left")
            fighter.x -= 30
        }
    }
    document.addEventListener("keydown", keypressed)
}


function draw() {
    // console.log("in draw")
    // console.log(virus.y)
    pen.clearRect(0, 0, W, H)
    pen.drawImage(fighter_img, fighter.x, fighter.y, cw, cw)
    pen.drawImage(virus_img, virus1.x, virus1.y, cw, cw)
    pen.drawImage(virus_img, virus2.x, virus2.y, cw, cw)
    pen.drawImage(virus_img, virus3.x, virus3.y, cw, cw)
}

function update() {
    // console.log("in update")
    virus1.update_virus()
    virus2.update_virus()
    virus3.update_virus()
}

function gameloop() {

    draw()
    update()
}

intit()
let game = setInterval(gameloop, 100);