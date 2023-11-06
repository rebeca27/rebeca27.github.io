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

// Initialize the game with your configuration
var game = new Phaser.Game(config);

function preload() {
    this.load.image('medievalMap', 'medieval_map.png');
    this.load.spritesheet('knight', 'knight_spritesheet.png', { frameWidth: 32, frameHeight: 48 });

    // Properly manage the loading screen visibility
    this.load.on('complete', function() {
        document.getElementById('loadingScreen').style.display = 'none';
    });
}

function create() {
    // Add the map as a background
    this.add.image(400, 300, 'medievalMap');

    // Add the knight sprite to the game
    let knight = this.add.sprite(400, 300, 'knight').setOrigin(0.5, 0.5);

    // Style for the buttons
    let textStyle = {
        fontSize: '32px',
        fill: '#fff', // Text color
        backgroundColor: '#007bff', // Button background color
        padding: {
            x: 10,
            y: 5,
        },
        fontFamily: 'Arial' // You can use any font loaded in your HTML
    };

    // Create interactive buttons
    let btnMedieval = this.add.text(100, 100, 'Medieval Era', textStyle)
        .setInteractive()
        .on('pointerdown', () => this.selectEra('medieval'))
        .on('pointerover', () => btnMedieval.setStyle({ fill: '#ff0' })) // Change color on hover
        .on('pointerout', () => btnMedieval.setStyle({ fill: '#fff' })); // Change color back on out

    let btnTreaty = this.add.text(100, 200, 'Treaty of Versailles', textStyle)
        .setInteractive()
        .on('pointerdown', () => this.startTreatyEvent())
        .on('pointerover', () => btnTreaty.setStyle({ fill: '#ff0' })) // Change color on hover
        .on('pointerout', () => btnTreaty.setStyle({ fill: '#fff' })); // Change color back on out
}

function update(time, delta) {
    // Game loop logic goes here
}

function selectEra(era) {
    console.log('Era selected:', era);
    this.add.image(400, 300, era + 'Map');
}

function startTreatyEvent() {
    console.log('Treaty of Versailles event started');
    displayDialogue('Choose your approach to the Treaty of Versailles:', ['Harsh Penalties', 'Fair Peace', 'Lenient Approach']);
}

function displayDialogue(text, options) {
    // Your dialogue display logic
}

function optionSelected(choice) {
    // Your option selected logic
}

// The game variable is already defined in the config, no need to redefine it.
