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
    this.load.image('medievalMap', 'medieval_map.png');
    this.load.spritesheet('knight', 'night_spritesheet.png', { frameWidth: 32, frameHeight: 48 });

    // Properly manage the loading screen visibility
    this.load.on('complete', function() {
        document.getElementById('loadingScreen').style.display = 'none';
    });
}

function create() {
    // Create game entities, backgrounds, and set up the game world
    this.dialogueOptions = []; // Initialize the dialogue options array
    this.add.image(400, 300, 'medievalMap');

    // Example of creating a button in Phaser to choose an era
    let btnMedieval = this.add.text(100, 100, 'Medieval Era', {
            fill: '#0f0'
        })
        .setInteractive()
        .on('pointerdown', () => selectEra('medieval'));

    let btnTreaty = this.add.text(100, 200, 'Treaty of Versailles', {
            fill: '#0f0'
        })
        .setInteractive()
        .on('pointerdown', () => startTreatyEvent());


    // Add a character sprite
    let knight = this.add.sprite(400, 300, 'knight');
    // ...create more buttons for different eras
}

function update(time, delta) {
    // Handle the game loop, where all your game logic goes
    // This is continuously called by Phaser
}

function selectEra(era) {
    // Handle era selection
    // Load the appropriate map, events, and setup the game world for this era
    console.log('Era selected:', era);
    // For example, you might set the background image to the map for the selected era
    this.add.image(400, 300, era + 'Map');
}

function startTreatyEvent() {
    // This function will set up the event
    console.log('Treaty of Versailles event started');

    // Here you would set up what happens when the event starts.
    // For example, displaying a dialogue with options for the player to choose from:
    displayDialogue('Choose your approach to the Treaty of Versailles:', ['Harsh Penalties', 'Fair Peace', 'Lenient Approach']);
}


function displayDialogue(text, options) {
    // Clear previous dialogue options
    // You would probably have a better system for handling UI elements
    this.dialogueOptions.forEach(option => option.destroy());
    this.dialogueOptions = [];

    // Display the dialogue text
    let dialogueText = this.add.text(100, 100, text, {
        fill: '#fff'
    });
    this.dialogueOptions.push(dialogueText);

    // Display the options
    options.forEach((option, index) => {
        let optionText = this.add.text(100, 150 + (index * 50), option, {
                fill: '#0f0'
            })
            .setInteractive()
            .on('pointerdown', () => optionSelected(option));
        this.dialogueOptions.push(optionText);
    });
}

function optionSelected(choice) {
    // Handle the player's choice
    console.log('Player chose:', choice);

    // Example outcomes based on the choice
    switch (choice) {
        case 'Harsh Penalties':
            console.log('Harsh penalties imposed. Military strength increases, but stability decreases.');
            // Code to increase military strength and decrease stability
            break;
        case 'Fair Peace':
            console.log('A fair peace proposed. Stability increases.');
            // Code to increase stability
            break;
        case 'Lenient Approach':
            console.log('A lenient approach taken. Diplomatic relations improve, but military strength might suffer.');
            // Code to improve diplomatic relations and potentially decrease military strength
            break;
    }

    // After making a choice, clear the dialogue options
    this.dialogueOptions.forEach(option => option.destroy());
    this.dialogueOptions = [];
}

// In your Phaser game config
var game = new Phaser.Game(config);
