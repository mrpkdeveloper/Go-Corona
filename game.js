function intit() {
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = canvas.width = 900
    H = canvas.height = 500
    cw = 60
    score = 0
    health = 100
    gameover = false

    //fighter
    fighter_img = new Image()
    fighter_img.src = "./assets/superhero.png"
    fighter = {
        x: 30,
        y: 200
    }

    //prize
    prize_image = new Image()
    prize_image.src = "./assets/gem.png"
    prize = {
        x: 30,
        y: 200,
        random_prize: function () {
            this.x = (Math.round(Math.random() * 28) + 1) * 30
        },
        prize_update: function () {
            if (this.x == fighter.x && this.y == fighter.y) {
                // alert("u won")
                score++
                this.random_prize()
                // gameover = true

            }
        }
    }
    prize.random_prize()
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
            this.attack = function () {
                if (this.x < fighter.x + cw &&
                    this.x + cw > fighter.x &&
                    this.y < fighter.y + cw &&
                    this.y + cw > fighter.y) {
                    // collision detected!
                    health -= 10
                }
            }
        }
    }

    //virus objects created
    virus1 = new virusclass(W / 3 - 100, 0, "down", 30)
    virus2 = new virusclass(W / 2, H - cw, "up", 30)
    virus3 = new virusclass(W - 210, 0, "down", 30)



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
    pen.drawImage(prize_image, prize.x, prize.y, cw, cw)

    //score
    pen.fillStyle = "black"
    pen.font = "25px roboto"
    pen.fillText(score, 50, 50)

    //health
    pen.fillText(health, 100, 50)
}

function update() {
    // console.log("in update")
    virus1.update_virus()
    virus1.attack()
    virus2.update_virus()
    virus2.attack()
    virus3.update_virus()
    virus3.attack()
    prize.prize_update()
    if (gameover == true) {
        clearInterval(game)
    }
}

function gameloop() {

    draw()
    update()
}

intit()
let game = setInterval(gameloop, 100);