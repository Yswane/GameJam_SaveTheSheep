var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,

  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

var game = new Phaser.Game(config);

function preload () {
  // this.load.image('preload', 'assets/background/sheep.js');
  this.load.image('backGround', 'assets/background/bg.jpg');
}

function create () {
  this.add.image(550, 400, 'backGround');
  // this.add.image(400, 200, 'sheep');
}

function update () {

}