var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Example1, Example2]
};

var game = new Phaser.Game(config);