export default html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        *{
            font-size:0;
            margin: 0;
            padding: 0;
        }
        body{
            width: 100vw;
            height: 100vh;
        }
    </style>
    <body>
    </body>

    <script>
        const BORDER_SIZE = 22
        const LIGHT_WIDTH = 7
    </script>
    <script>
        class border {
            constructor(game) {
                this.game = game
                this.size = BORDER_SIZE
                this.grd = this.game.ctx.createLinearGradient(0, 0, this.game.size, 0);
                this.grd.addColorStop(0, "#d39e33");
                this.grd.addColorStop(.2, "#f6ec8e");
                this.grd.addColorStop(.4, "#faf599");
                this.grd.addColorStop(.6, "#f8f092");
                this.grd.addColorStop(.8, "#eeda77");
                this.grd.addColorStop(.10, "#ddb044");
            }

            draw(){
                this.game.ctx.beginPath()
                this.game.ctx.arc(
                    this.game.width/2,
                    this.game.height/2,
                    this.game.size/2,
                    0,
                    Math.PI * 2,
                    false
                )
                this.game.ctx.fillStyle = this.grd;
                this.game.ctx.fill()
            }
        }
    </script>

    <script>
        class reward {
            constructor(game) {
                this.game = game
                this.beginX = this.game.width / 2
                this.beginY = this.game.height / 2

                this.angle = Math.PI * 2 / this.game.total
                this.active = 0

                setInterval(() => {
                    this.active ++ 
                    if(this.active > this.game.total - 1){
                        this.active = 0
                    }
                }, 500);
            }

            draw () {
                
                for (let index = 0; index < window.spinInfo.length; index++) {
                    const element = window.spinInfo[index];

                    this.game.ctx.beginPath()
                    this.game.ctx.moveTo(this.beginX,this.beginY);
                    this.game.ctx.arc(
                        this.beginX,
                        this.beginY,
                        this.game.size / 2 - BORDER_SIZE,
                        this.angle * index  + this.angle / 2 + (this.game.spinDeg * Math.PI / 180),
                        this.angle * index + this.angle  + this.angle / 2 + (this.game.spinDeg * Math.PI / 180),
                        false
                    )
                    this.game.ctx.closePath();
                    this.game.ctx.fillStyle = element.bg;
                    this.game.ctx.fill()


                    var deg = Math.PI * 2 / this.game.total * index + (this.game.spinDeg * Math.PI / 180)

                    var posX = Math.cos(deg) * (this.game.size / 2 - BORDER_SIZE / 2)

                    var posY = Math.sin(deg) * (this.game.size / 2 - BORDER_SIZE / 2) 

                    this.game.ctx.beginPath()
                    this.game.ctx.arc(
                        this.game.width / 2 +posX,
                        this.game.height / 2 + posY,
                        LIGHT_WIDTH,
                        0,
                        Math.PI * 2,
                        false
                    )
                    this.game.ctx.closePath();
                    this.game.ctx.fillStyle = '#ffe528';
                    this.game.ctx.fill()

                    this.game.ctx.beginPath()
                    this.game.ctx.arc(
                        this.game.width / 2 +posX,
                        this.game.height / 2 + posY,
                        LIGHT_WIDTH - 3,
                        0,
                        Math.PI * 2,
                        false
                    )
                    this.game.ctx.closePath();
                    this.game.ctx.fillStyle = this.active === index ? '#ff0000' : '#fff';
                    this.game.ctx.fill()
                }
            }
        }
    </script>

    <script>
        class rewardText {
            constructor(game){
                this.game = game
                this.beginX = this.game.width / 2
                this.beginY = this.game.height / 2
                this.angle = Math.PI * 2 / this.game.total
            }

            draw () {
                for (let index = 0; index < window.spinInfo.length; index++) {
                    const element = window.spinInfo[index];
                    this.game.ctx.save();
                    this.game.ctx.font = '12px Arial'
                    this.game.ctx.fillStyle = element.color
                    this.game.ctx.translate(this.beginX  , this.beginY )
                    this.game.ctx.rotate(-Math.PI / 2 + this.angle * index + (this.game.spinDeg * Math.PI / 180));
                    this.game.ctx.fillText(element.vi , 50, 5);
                    this.game.ctx.restore();
                }
            }
        }
    </script>

    <script>
        class button {
            constructor(game){
                this.game = game
                this.makerSize = this.game.size * 0.1

                this.grdMaker = this.game.ctx.createLinearGradient(150, 0, 150, 300);
                this.grdMaker.addColorStop(0, "#dab041");
                this.grdMaker.addColorStop(.2, "#e4c058");
                this.grdMaker.addColorStop(.4, "#fbf89c");
                this.grdMaker.addColorStop(.6, "#e4c159");
                this.grdMaker.addColorStop(.8, "#c28c2d");
                this.grdMaker.addColorStop(.10, "#dfb449");

                this.grdMakerButton = this.game.ctx.createLinearGradient(0, 300, 300, 0);
                this.grdMakerButton.addColorStop(0, "#a90004");
                this.grdMakerButton.addColorStop(.2, "#aa0105");
                this.grdMakerButton.addColorStop(.4, "#ba1613");
                this.grdMakerButton.addColorStop(.6, "#cd2e24");
                this.grdMakerButton.addColorStop(.8, "#ff5640");
                this.grdMakerButton.addColorStop(.10, "#ff4e3b");
            }

            draw (){
                //borderamarket
                this.game.ctx.beginPath()
                this.game.ctx.moveTo(this.game.width / 2, this.game.width / 2,)
                this.game.ctx.lineTo(this.game.width / 2 - 11, this.game.width / 2,)
                this.game.ctx.lineTo(this.game.width / 2 - 11, this.game.width / 2 - this.makerSize / 2 - 11,)
                this.game.ctx.lineTo(this.game.width / 2 , this.game.width / 2 - this.makerSize / 2 - 29,)
                this.game.ctx.lineTo(this.game.width / 2 + 11, this.game.width / 2 - this.makerSize / 2 - 11,)
                this.game.ctx.lineTo(this.game.width / 2 + 11, this.game.width / 2)
                this.game.ctx.closePath()
                this.game.ctx.fillStyle = this.grdMaker;
                this.game.ctx.fill()
                //market
                this.game.ctx.beginPath()
                this.game.ctx.moveTo(this.game.width/2, this.game.width/2,)
                this.game.ctx.lineTo(this.game.width/2 - 9, this.game.width/2,)
                this.game.ctx.lineTo(this.game.width/2 - 9, this.game.width/2 - this.makerSize / 2 - 9,)
                this.game.ctx.lineTo(this.game.width/2 , this.game.width/2 - this.makerSize / 2 - 27,)
                this.game.ctx.lineTo(this.game.width/2 + 9, this.game.width/2 - this.makerSize / 2 - 9,)
                this.game.ctx.lineTo(this.game.width/2 + 9, this.game.width/2)
                this.game.ctx.closePath()
                this.game.ctx.fillStyle = this.grdMakerButton;
                this.game.ctx.fill()

                //button
                this.game.ctx.beginPath()
                this.game.ctx.arc(
                    this.game.width / 2,
                    this.game.width / 2,
                    this.makerSize / 1.5,
                    Math.PI * 2,
                    false
                )
                this.game.ctx.fillStyle = this.grdMaker;
                this.game.ctx.fill()

                this.game.ctx.beginPath()
                this.game.ctx.arc(
                    this.game.width / 2,
                    this.game.width / 2,
                    this.makerSize / 1.5 - 2,
                    Math.PI * 2,
                    false
                )
                this.game.ctx.fillStyle = this.grdMakerButton;
                this.game.ctx.fill()
            }
        }
    </script>

    <script>
        class game {
            constructor(width, height){
                this.width = width
                this.height = height
                this.size = this.width - 20
                this.total = window.spinInfo.length
                this.spinDeg = 0
                this.spinSpeed = 0
                this.spinAcceleration = 10

                this.spinTarget = 360

                this.canvas = document.createElement('canvas')
                this.ctx = this.canvas.getContext('2d')
                this.canvas.width = this.width
                this.canvas.height = this.height
                document.body.appendChild(this.canvas)
                
                this.border = new border(this)
                this.reward = new reward(this)
                this.rewardText = new rewardText(this)
                this.button = new button(this)

                
                this.loop()
            }

            loop(){
                this.update()
                this.draw()
                setTimeout(() => {
                    this.loop()
                }, 1000/30);
            }

            update(){
                if(this.spinDeg <= this.spinTarget){
                    var targetFromNow = this.spinDeg  / this.spinTarget 
                    var accelerationDown = targetFromNow *  20
                    var currentAcceleration = this.spinAcceleration - accelerationDown
                    this.spinSpeed += currentAcceleration
                    alert(currentAcceleration + '    ' + this.spinSpeed, )

                    this.spinDeg += this.spinSpeed

                    
                }
            }
            
            draw() {
                this.ctx.clearRect(0 , 0 , this.width, this.height)
                this.border.draw()
                this.reward.draw()
                this.rewardText.draw()
                this.ctx.beginPath()
                this.ctx.arc(
                    this.width / 2,
                    this.height / 2,
                    this.size / 2 - BORDER_SIZE - 10,
                    Math.PI * 2,
                    false
                )

                this.ctx.fillStyle = 'transparent';
                this.ctx.fill()
                this.ctx.strokeStyle = 'rgba(0,0,0, .3)'
                this.ctx.lineWidth = 20
                this.ctx.stroke()

                this.button.draw()

            }
        }
    </script>
    
    <script>
        window.onload = () =>{
            var interval = setInterval(() => {
                if(document.body.offsetWidth > 0 && window.spinInfo){
                    var g = new game(document.body.offsetWidth, document.body.offsetHeight)
                    clearInterval(interval)
                }
            }, 100);
        }
    </script>
    
    </html>
`