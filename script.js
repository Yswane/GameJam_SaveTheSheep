var config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 850,

  scene: {
    preload: preload,
    create: create,
    update: update
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
      debug: false
    }
  },

};



var player;
var stars;
var bombs;
var platforms;
var trees;
var castle;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
// var song;
var textGameOver;
var game = new Phaser.Game(config);
var emitter;



// *******************RELOAD SECTION*******************

function preload() {
  
  this.load.image('backGround', 'assets/background/bg.jpg');
  this.load.spritesheet('rain', 'assets/object/rain.png', { frameWidth: 17, frameHeight: 17});
  this.load.spritesheet('mainCharacter', 'assets/characters/adventurer.png', { frameWidth: 50, frameHeight: 36 });
  this.load.spritesheet('mainCharacter_reverse', 'assets/characters/adventurer_reverse.png', { frameWidth: 50, frameHeight: 36 });
  this.load.image('ground', 'assets/platform/platform.png');
  this.load.image('ground2', 'assets/platform/platform2.png');
  this.load.image('ground3', 'assets/platform/platform4.png');
  this.load.image('ground4', 'assets/background/platform5.png');
  this.load.image('manoir', 'assets/house/manoir.png');
  this.load.image('bomb', 'assets/enemy/FlameDemon.png');
  // this.load.image('bomb', 'assets/enemy/FlameDemon2.png');  
  this.load.image('star', 'assets/animals/White.gif', { frameWidth: 30, frameHeight: 30 }); 
  this.load.image('tree', 'assets/background/Trees.png'); 
  this.load.audio('music', 'assets/music/Prologue.mp3');
}





// *******************CREATE SECTION*******************

function create() {

  

  // Permet l'affichage du fond d'écran
  this.add.image(550, 400, 'backGround');


  // Permet d'agrandir le monde
  this.physics.world.setBounds(0, 0, 2250, 850);
  this.cameras.main.setBounds(0, 0, 2470, 850);


  // Permet la création d'un group pour le décors
  platforms = this.physics.add.staticGroup();
  treeground = this.physics.add.staticGroup();
  castle = this.physics.add.staticGroup();
  // moutains = this.physics.add.staticGroup();



  // platforms.create(300, 700, 'ground');
  platforms.create(-20, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(300, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(600, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(900, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(1200, 850, 'ground2').setScale(2).refreshBody();

  platforms.create(1400, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(1600, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(1800, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(2000, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(2200, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(2400, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(2600, 850, 'ground2').setScale(2).refreshBody();
  platforms.create(2800, 850, 'ground2').setScale(2).refreshBody();


  platforms.create(100, 550, 'ground3').setScale(1).refreshBody();
  platforms.create(280, 700, 'ground3').setScale(1).refreshBody();
  platforms.create(200, 250, 'ground3').setScale(1).refreshBody();
  platforms.create(400, 450, 'ground3').setScale(1).refreshBody();
  platforms.create(600, 600, 'ground3').setScale(1).refreshBody();
  platforms.create(600, 250, 'ground3').setScale(1).refreshBody();
  platforms.create(800, 400, 'ground3').setScale(1).refreshBody();
  platforms.create(1000, 250, 'ground3').setScale(1).refreshBody();
  platforms.create(950, 700, 'ground3').setScale(1).refreshBody();
  platforms.create(1400, 250, 'ground3').setScale(1).refreshBody();
  platforms.create(1200, 200, 'ground3').setScale(2).refreshBody();
  platforms.create(1400, 700, 'ground3').setScale(1).refreshBody();
  platforms.create(1600, 500, 'ground3').setScale(1).refreshBody();
  platforms.create(1800, 250, 'ground3').setScale(1).refreshBody();
  platforms.create(1800, 550, 'ground3').setScale(1).refreshBody();
  platforms.create(2000, 450, 'ground3').setScale(1).refreshBody();
  platforms.create(2200, 250, 'ground3').setScale(1).refreshBody();

  castle.create(1200, 578, 'manoir').setScale(0.2).refreshBody();

  treeground.create(200, 690, 'tree').setScale(2).refreshBody();
  treeground.create(300, 690, 'tree').setScale(2).refreshBody();
  treeground.create(300, 755, 'tree').setScale(1).refreshBody();
  treeground.create(500, 690, 'tree').setScale(2).refreshBody();
  treeground.create(800, 755, 'tree').setScale(1).refreshBody();
  treeground.create(900, 690, 'tree').setScale(2).refreshBody();
  treeground.create(1000, 755, 'tree').setScale(1).refreshBody(); 
  treeground.create(1500, 755, 'tree').setScale(1).refreshBody();
  treeground.create(1700, 690, 'tree').setScale(2).refreshBody();
  treeground.create(1800, 690, 'tree').setScale(2).refreshBody();
  treeground.create(2000, 690, 'tree').setScale(2).refreshBody();



  // Permet l'affichage du perso
  player = this.physics.add.sprite(50, 100, 'mainCharacter').setScale(5);

  // Permet à la caméra de suivre le perso
  this.cameras.main.startFollow(player);

  // Permet au perso de rebondir
  player.setBounce(0.2);

  // Permet à ce que le personnage ne sortent pas de l'écran
  player.setCollideWorldBounds(true);

  // Permet l'animation du perso lors du déplacement

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('mainCharacter_reverse', {
      start: 9, end: 13
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mainCharacter', {
      start: 8, end: 13
    }),
    frameRate: 10,
    repeat: -1
  });


  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('mainCharacter', {
      start: 4, end: 6
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'mainCharacter', frame: 0 }],
    frameRate: 20
  });



  // Permet l'écoute du clavier
  cursors = this.input.keyboard.createCursorKeys()


  // Permet l'affichage des moutons

  stars = this.physics.add.group({
    key: 'star',
    repeat: 0,
    setXY: { x: Phaser.Math.Between(0, 2000), y: 10 },
    // setXY: { x: Phaser.Math.Between(0, 2000), y: 10, stepX: 70 },
  })


  // Permet le rebond des moutons
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  })

// Creation d'un groupe pour les ennemis
  bombs = this.physics.add.group();

  //  Permet l'affichage du score
  scoreText = this.add.text(16, 16, 'Save the sheep !! score: 0', { fontSize: '32px', fill: '#FFF' });
  scoreText.setScrollFactor(0);
  // scoreText.fixedToCamera = true;
  // scoreText.cameraOffset.setTo(300, 500);

  // Permet de gerer les collisions  
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);


  // Permet de controler si le perso touche un mouton si c'est le cas il lance la fonction collectstar
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // Permet de gerer la collision du perso avec la bombe
  this.physics.add.collider(player, bombs, hitBomb, null, this);

// Lance la musique du jeux
  let soundSample = this.sound.add('music')
  soundSample.play();

}







// *******************UPDATE SECTION*******************

function update() {

  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-400);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(400);
    player.anims.play('right', true)
  }
  else if (cursors.down.isDown) {
    player.setVelocityY(0);
    player.anims.play('down', true)
  }
  else if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-550)
    player.anims.play('space', true)
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn')
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-550);
  }
}



function collectStar(player, star) {

  // Fait disparaitre le mouton lorsque le perso marche dessus
  star.disableBody(true, true);

  //  Add and update the score
  score += 1;
  scoreText.setText('Save the sheep !! Score: ' + score);




  // Se déclenche lorsqu'il n'y a plus de moutons sur la map
  if (stars.countActive(true) === 0) {

    //  A new sheep to collect
    stars.children.iterate(function (child) {      
    child.enableBody(true, child.x, 0, true, true);
    console.log(child)
    });
    
    
    // Phaser.Math.Between(0, 2000)
  // Permet l'affichage des moutons

  // stars = this.physics.add.group({
  //   key: 'star',
  //   repeat: 0,
  //   setXY: { x: Phaser.Math.Between(0, 2000), y: 10, stepX: 200 },
    // setXY: { x: Phaser.Math.Between(0, 2000), y: 10, stepX: 70 },
  // })


  // Permet le rebond des moutons
  // stars.children.iterate(function (child) {
  //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  // })


    
    var x = (player.x < 400) ? Phaser.Math.Between(1000, 1500) : Phaser.Math.Between(0, 1000);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-50, 50), 20);
    bomb.allowGravity = false;
  }
  // stars.reset(this.rnd.integerInRange(20, 780), 1);

}

function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
  textGameOver = this.add.text(500, 400, 'Game Over', { fontSize: '50px', fill: '#FFF'})
  textGameOver.setScrollFactor(0);

}

