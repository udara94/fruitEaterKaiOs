class Example1 extends Phaser.Scene {
    constructor() {
        super({key: "Example1", active: true});
        //pipe gap
        this.pip = {
            pipGap: 85,
            width: config.width / 10,
            height: config.width / 10,
            position: 150,
            dx: 2,
            maxYposition: -150
        }


        this.pipeNorth = [];
        this.pipeSouth = []
        this.timer = 0;
        this.i = 0;
        this.score = 0;
        this.BestScore = 0;
        this.currentScore = 0;
        this.charX = 0;
        this.charY = 0;
        this.randomFruit = "ab";
        this.gameOver = false;
        this.score = 0;

    }

    preload() {
        this.load.image('background', 'assets/images/BG/BG.jpg');
        this.load.image('bird', 'assets/images/flappy-bird-20.png');
        this.load.image('land', 'assets/images/fg.png');
        this.load.image('pipNorth', 'assets/images/pipeNorth.png');
        this.load.image('pipSouth', 'assets/images/pipeSouth.png');
        this.load.audio('flySound', 'assets/audio/sfx_flap.wav');
        this.load.audio('hitPip', 'assets/audio/sfx_hit.wav');

        this.load.image('fruit1', 'assets/images/Fruits/Fruit1.png');
        this.load.image('fruit2', 'assets/images/Fruits/Fruit2.png');
        this.load.image('fruit3', 'assets/images/Fruits/Fruit3.png');
        this.load.image('fruit4', 'assets/images/Fruits/Fruit4.png');
        this.load.image('fruit5', 'assets/images/Fruits/Fruit5.png');
        this.load.image('bomb', 'assets/images/Fruits/Bomb.png');
        this.load.image('character', 'assets/images/Character/Player.png');

        this.load.image('gameOver', 'assets/images/gearmovar.jpg');
        this.load.image('scoreBord', 'assets/images/scoreboard.png');
        this.load.image('goldMedale', 'assets/images/gold.png');
        this.load.image('silverMedale', 'assets/images/bronzes.png');
        this.load.image('bronzeMedale', 'assets/images/silver.png');
    }

    bronzeMedale

    randy(x, y) {
        return Phaser.Math.Between(x, y);
    }


    create() {
        this.image = this.add.image(120, 160, 'background');

        this.fruits = ["fruit1", "fruit2", "fruit3", "fruit4", "fruit5", "bomb"];


        this.fruit1 = this.physics.add.sprite(this.randy(0, 240), 10, "fruit1");
        this.fruit1.setBounceY(.2);
        this.fruit1.displayHeight = 50;
        this.fruit1.displayWidth = 50;


        this.character = this.physics.add.sprite(120, 300, "character");
        this.character.setBounceY(.2);
        this.character.setScale(0.5);

        this.finalScore = this.add.text(10, 10, "Score: " + this.score, {font: "15px Impact", color: "#7d765b"});


        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.physics.add.collider(this.character, this.fruit1);

    }

    collideFruit() {
        this.score++;
        this.finalScore.setText("Score: " + this.score);
        console.log(this.randomFruit)
        this.fruit1.destroy();
    }

    startRandomFruit() {
        this.fruit1.destroy();
        this.randomFruit = this.random_item(this.fruits)
        this.fruit1 = this.physics.add.sprite(this.randy(0, 240), 10, this.randomFruit);
        this.fruit1.displayHeight = 50;
        this.fruit1.displayWidth = 50;
        //this.fruit1.setGravityY(50);
        this.fruit1.setBounceY(.2);
    }

    random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    moveFruit() {
        this.fruit1.y++;
    }

    endGame() {
        this.image = this.add.image(120, 110, 'gameOver');
        this.image.displayWidth = 100;
        this.image.displayHeight = 25;
    }

    update() {

        if (this.key_left.isDown) {
            if (this.character.x > 0) {
                this.character.x--;
            }

        }
        if (this.key_right.isDown) {
            if (this.character.x < 240)
                this.character.x++;

        }

        if (this.fruit1.y > 340) {
            if (!this.gameOver) {
                this.startRandomFruit();
            }
        } else {
            this.moveFruit()
        }

        this.pipNorthCollesion = this.physics.collide(this.fruit1, this.character, this.collideFruit, null, this);

        if (this.pipNorthCollesion == true) {

            if (this.randomFruit == "bomb") {
                this.gameOver = true;
                this.endGame();
                console.log("Game over");
            }
        }


    }
}