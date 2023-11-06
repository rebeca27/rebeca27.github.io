// Configuration object for your Phaser game
var config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800,
    height: 600,
    parent: 'gameContainer',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function preload() {
    // Load your assets here
    this.load.image('medievalMap', 'medieval_map.png');
    this.load.spritesheet('knight', 'knight_spritesheet.png', { frameWidth: 32, frameHeight: 48 });

    // Properly manage the loading screen visibility
    var loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        this.load.on('complete', function() {
            loadingScreen.style.display = 'none';
        });
    }
}

function create() {
    // Add the medieval map to the game
   // this.add.image(400, 300, 'medievalMap');

    // Add the knight sprite to the game
    let knight = this.add.sprite(400, 300, 'knight');

    // Create interactive buttons
    let btnMedieval = this.add.text(100, 100, 'Medieval Era', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.selectEra('medieval'));

    let btnTreaty = this.add.text(100, 200, 'Treaty of Versailles', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.startTreatyEvent());
}

function update(time, delta) {
    // Your game loop goes here
}

function selectEra(era) {
    // Load the appropriate map for the selected era
    console.log('Era selected:', era);
    this.add.image(400, 300, era + 'Map');
}

function startTreatyEvent() {
    console.log('Treaty of Versailles event started');
    this.displayDialogue('Choose your approach to the Treaty of Versailles:', ['Harsh Penalties', 'Fair Peace', 'Lenient Approach']);
}

function displayDialogue(text, options) {
    // Display the dialogue options
    let dialogueText = this.add.text(100, 100, text, { fill: '#fff' });
    options.forEach((option, index) => {
        this.add.text(100, 150 + (index * 50), option, { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.optionSelected(option));
    });
}

function optionSelected(choice) {
    // Handle the player's choice
    console.log('Player chose:', choice);
    // Implement the outcomes based on the choice
}

// Initialize the game with your configuration
var game = new Phaser.Game(config);
