class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio portions from Kenney sheet 

        //loading in the assets for character animations, can be reached from anywhere so can load here
        this.load.path = "assets/";
        //load atlas here 
        //this.load.atlas('alien_atlas', 'alienSheet.png', 'alienchar.json');
        this.load.atlas('indy_atlas', 'indy.png', 'indytile.json');
        this.load.atlas('enemy_atlas', 'enemies.png', 'enemiessheet.json');

        //load all other needed files/assets/images here in preload, want to see if can port over to play scene

        //load images here
        this.load.image('shroomMenu', './shroomBG.png');
        this.load.image('groundScroll', 'stoneMid.png');
        this.load.image('gamebg', 'bg_grasslands.png');
        this.load.image('bat_enemy', 'bat.png');
        //load images if needed for menu 
        //this.load.image()
        
    }

    create() {   
        //can create tilesprite from image preloaded
        this.shroomMenu = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'shroomMenu').setOrigin(0);

           // menu text configuration
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

           let menuConfig2 = {
            fontFamily: 'Aseprite Remix',
            fontSize: '28px',
            //backgroundColor: '#FC4506',
              color: '#050505',
           align: 'right',
           padding: {
               top: 5,
               bottom: 5,
            },
            fixedWidth: 0
               }

    //can add animations made here for play scene?       
   this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('indy_atlas', {
            prefix: 'walk_',
            start: 1,
            end: 8,
            suffix: '',
            zeroPad: 4
        }),
        frameRate: 14, //play with this
        repeat: -1,
        repeatDelay:4000,
        yoyo: true
   });

   this.anims.create({
    key: 'idle',
    defaultTextureKey: 'indy_atlas',
    frames: [
        {frame: 'idle_0001'}
    ],
    repeat: -1
   });

   this.anims.create({
    key: 'jump',
    defaultTextureKey: 'indy_atlas',
    frames: [
        {frame: 'jump_0001'}
    ],
   });

   this.anims.create({
    key: 'slide',
    defaultTextureKey: 'indy_atlas',
    frames: [
        {frame: 'slide_0001'}
    ],
   });

   this.anims.create({
    key: 'bat',
    defaultTextureKey: 'enemy_atlas',
    frames:  this.anims.generateFrameNames('enemy_atlas', {
        prefix: 'bat_',
        start: 1,
        end: 2,
        suffix: '',
        zeroPad: 4
   }),
   frameRate: 10, //play w value
   repeat: -1
});

this.anims.create({
    key: 'spider',
    defaultTextureKey: 'enemy_atlas',
    frames:  this.anims.generateFrameNames('enemy_atlas', {
        prefix: 'spider_walk_',
        start: 1,
        end: 3,
        suffix: '',
        zeroPad: 4
   }),
   frameRate: 10, //play w value
   repeat: -1
});
    

   this.add.text(game.config.width/2, game.config.height/2, 'Endless Runner ', menuConfig).setOrigin(0.5);  
   this.add.text(game.config.width/2 -20, game.config.height/2 + 50, 'Press ← to start!', menuConfig2).setOrigin(0.5);
   this.add.text(game.config.width/2, game.config.height/2 + 80, 'Use ↑ to jump and double jump! ',menuConfig2).setOrigin(0.5);
   this.add.text(game.config.width/2, game.config.height/2 + 120, 'Avoid the enemies! Lose all three lives, and its GAME OVER ',menuConfig2).setOrigin(0.5);
   //here we define keys for input and scene change
   cursors = this.input.keyboard.createCursorKeys();
   //can add extra cotnrols or change here
    }

    update(){
    //can add in sounds and image here
    this.shroomMenu.tilePositionX -=4;
    if(cursors.left.isDown){
         //this.sound.play('kenney sheet examples') want to pull sounds from kenney sheet on game start
        this.scene.start("playScene");
        }


    }


}