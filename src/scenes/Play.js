class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        //can set rules here for velocity and movement?
    }

    create(){
        //variables for game settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;
        this.batSpeedRange = [-300, -600 ];
        this.spiderSpeedRange = [-100, -225];
        this.batSpawnRange= [150, 450];
        this.respawnTime = 0;
        this.respawnTimeS = 0;
        this.isGameRunning = true; //want to set flag here so we can end game on collision
        this.hitCount = 0;

       this.physics.world.setBounds(0, 0, 3500, game.config.height);
       this.shroom = this.add.tileSprite(0,0,game.config.width, game.config.height, 'gamebg').setOrigin(0);
        
        //actual ground object from spritesheet and json 
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'indy_atlas', 'stoneTile').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        
        //scrolling sprite for movement animation
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize,  'groundScroll').setOrigin(0);

        //adding group for bat enemies 
        this.batGroup = this.add.group({
        });

        //adding group for spider enemies
        this.spiderGroup = this.add.group({
        });

        var scoreConfig = {font: "24px Aseprite Remix", fill: '#4684F0', stroke: '#000', strokeThickness: 4};

        timeText = this.add.text(25, 20, "Time Survived: ", scoreConfig );

        //creating my lil guy
        this.indy = this.physics.add.sprite(120, game.config.height/2-tileSize, 'indy_atlas', 'idle').setScale(SCALE);
        this.indy.health = 3;

        //adding collision between player char and ground tiles
        this.physics.add.collider(this.indy, this.ground);
    
        //adding collision between spider enemies and ground, so they walk on them
        this.physics.add.collider(this.spiderGroup, this.ground);
   
        //this.physics.add.overlap(this.indy, this.batGroup, (obj1, obj2) => {
       //     obj2.destroy(); //destroy enemy on collision
    //    });
    
       this.physics.add.overlap(this.indy, this.spiderGroup, (player, enemy) => {
        if(!player.immune){
            player.immune = true;
            player.alpha = 0.4;
            //player.damage(1);
            enemy.destroy();
            this.hitCount+=1;
            console.log(this.hitCount);
            this.time.addEvent({
                delay: 2000,
                loop : false,
                callback: () => {
                    player.immune = false;
                    player.alpha = 1;
                },
                callbackScope: this
            });
        }
    });
       
       this.physics.add.overlap(this.indy, this.batGroup, (player, enemy) => {
        if(!player.immune){
            player.immune = true;
            player.alpha = 0.4;
            //player.damage(1);
            enemy.destroy();
            this.hitCount+=1;
            console.log(this.hitCount);
            this.time.addEvent({
                delay: 2000,
                loop : false,
                callback: () => {
                    player.immune = false;
                    player.alpha = 1;
                },
                callbackScope: this
            });
        }
    });

        //setting up phaser input for cursor keys
        cursors = this.input.keyboard.createCursorKeys();

    }

    //addBat function, have to remember to set animations as well as disable gravity on bats, still need collision below as well!
    addBat(xPos, yPos){
        let bat;
            bat = this.physics.add.sprite(xPos, yPos,  'enemy_atlas', 'bat'); //can also set the scale here
            //want to make sure we are setting them immune to gravity as well
            bat.anims.play('bat'); //double check here!
            bat.body.setAllowGravity(false);
            bat.setVelocityX(Phaser.Math.Between(this.batSpeedRange[0], this.batSpeedRange[1])); //variable velocity here
            this.batGroup.add(bat);
    }

    addSpider(xPos){
        let spider;
        spider = this.physics.add.sprite(xPos, game.config.height - 75, 'enemy_atlas', 'spider_walk_0001');
        spider.anims.play('spider'); //add in anims here
        spider.body.setAllowGravity(true);
        spider.setVelocityX(Phaser.Math.Between(this.spiderSpeedRange[0], this.spiderSpeedRange[1])); //making spiders move slower
        this.spiderGroup.add(spider);
    }


    update(time, delta){
        if(this.hitCount >= 3){
            this.scene.start("gameoverScene");
        }


        this.respawnTime += delta *this.SCROLL_SPEED *0.08; //just an intro value test it
        this.respawnTimeS += delta *this.SCROLL_SPEED*0.08 //like this value, can adjust respawntime value in ms for thresholds below

        var seconds = time* 0.001; //game time converted to seconds
        timeText.setText("Time Survived: " + Math.round(seconds) + " seconds");

        
        this.shroom.tilePositionX += this.SCROLL_SPEED;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED+0.75;
        this.indy.isGrounded = this.indy.body.touching.down;

        this.batGroup.getChildren().forEach(bat=> {
            if(bat.getBounds().right < 0 ){ //want to make sure bats dissapear off screen
            this.batGroup.killAndHide(bat);
            }
        })

        this.spiderGroup.getChildren().forEach(spider=> {
            if(spider.getBounds().right < 0){
                this.spiderGroup.killAndHide(spider);
            }
        })

    //adding new bats
        if(this.respawnTime >= 300){ //play with this value
            this.addBat(game.config.width + Phaser.Math.Between(10, 174), Phaser.Math.Between(game.config.height - 85, 0));
            this.respawnTime = 0;
        }

        if(this.respawnTimeS >= 1700){
            this.addSpider(game.config.width + Phaser.Math.Between(50, 75));
            this.respawnTimeS = 0;
        }

        if(this.indy.isGrounded && (cursors.down.isDown == true)){
            this.indy.anims.play('slide', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
        } 
       else if(this.indy.isGrounded) {
            this.indy.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        else {
	    	this.indy.anims.play('jump');
	    }
        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.indy.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    } 
        if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
      
    }
}