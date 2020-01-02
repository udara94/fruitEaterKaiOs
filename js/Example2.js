class Example2 extends Phaser.Scene {
    constructor() {
        super({ key: "Example2", active: true });
    }

    create() {
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        
    }
}