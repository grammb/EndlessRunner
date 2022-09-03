class GameOver extends Phaser.Scene{
    constructor(){
        super("gameoverScene");

    }

    preload(){
    
    
    }
    
    create(){
    this.endscreen = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'gamebg').setOrigin(0);
    this.reload = this.input.keyboard.addKey('R');
    let menuConfig = {
        fontFamily: 'Aseprite Remix',
        fontSize: '64px',
        //backgroundColor: '#FC4506',
          color: '#050505',
       align: 'right',
       padding: {
           top: 5,
           bottom: 5,
        },
        fixedWidth: 0
           }
    
           this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER ', menuConfig).setOrigin(0.5); 
           this.add.text(game.config.width/2, (game.config.height/2) + 75, 'RESTART: PRESS R', menuConfig).setOrigin(0.5); 

    }

    update(){
    
        this.endscreen.tilePositionX +=2;
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.start("playScene");
        }
    }
}