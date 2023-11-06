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
    this.load.spritesheet('knight', 'knight_spritesheet.png', {
        frameWidth: 32,
        frameHeight: 48
    });

    // Properly manage the loading screen visibility
    this.load.on('complete', function () {
        document.getElementById('loadingScreen').style.display = 'none';
    });
}

function create() {
    // Add the map as a background
    this.add.image(400, 300, 'medievalMap');
    this.dialogueOptions = [];

    // Add the knight sprite to the game
    let knight = this.add.sprite(400, 300, 'knight').setOrigin(0.5, 0.5);

    // Modern style for the buttons
    let textStyle = {
        fontSize: '24px', // smaller font size
        fill: '#000', // Text color (black for modern look)
        backgroundColor: '#ffffff', // Button background color (white for modern look)
        padding: {
            x: 10,
            y: 5
        },
        fixedWidth: 150, // Fixed width for smaller buttons
        fixedHeight: 40, // Fixed height for smaller buttons
        borderRadius: 5, // Rounded corners for buttons
        borderColor: '#000000', // Border color (black)
        borderThickness: 3, // Border thickness
        fontFamily: 'Arial', // You can use any font loaded in your HTML
    };


    // Create interactive buttons
    let btnMedieval = this.add.text(100, 100, 'Medieval Era', textStyle)
        .setInteractive()
        .on('pointerdown', () => this.selectEra('medieval'))
        .on('pointerover', () => btnMedieval.setStyle({
            fill: '#ff0'
        })) // Change color on hover
        .on('pointerout', () => btnMedieval.setStyle({
            fill: '#fff'
        })); // Change color back on out

    let btnTreaty = this.add.text(100, 200, 'Treaty of Versailles', textStyle)
        .setInteractive()
        .on('pointerdown', () => this.startTreatyEvent())
        .on('pointerover', () => btnTreaty.setStyle({
            fill: '#ff0'
        })) // Change color on hover
        .on('pointerout', () => btnTreaty.setStyle({
            fill: '#fff'
        })); // Change color back on out
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
    if (!this.dialogueOptions) {
        this.dialogueOptions = [];
    }
    // Clear previous dialogue options
    this.dialogueOptions.forEach(option => option.destroy());
    this.dialogueOptions = [];

    // Display the dialogue text
    let dialogueText = this.add.text(100, 50, text, {
        fill: '#fff',
        fontSize: '22px',
        fontFamily: 'Arial',
        backgroundColor: '#333333',
        padding: {
            x: 10,
            y: 5
        }
    });
    this.dialogueOptions.push(dialogueText);

    // Display the options
    options.forEach((option, index) => {
        let optionStyle = {
            fill: '#fff',
            fontSize: '18px',
            fontFamily: 'Arial',
            backgroundColor: '#333333',
            padding: {
                x: 5,
                y: 5
            },
            fixedWidth: 200,
            fixedHeight: 30
        };
        let optionText = this.add.text(100, 100 + (index * 50), option, optionStyle)
            .setInteractive()
            .on('pointerdown', () => this.optionSelected(option));
        this.dialogueOptions.push(optionText);
    });
}

function optionSelected(choice) {
    // Handle the player's choice
    console.log('Player chose:', choice);

    // Example outcomes based on the choice
    switch (choice) {
        // Implement the outcomes based on the choice
        // Example:
        case 'Harsh Penalties':
            // Implement what happens for Harsh Penalties
            break;
        case 'Fair Peace':
            // Implement what happens for Fair Peace
            break;
        case 'Lenient Approach':
            // Implement what happens for Lenient Approach
            break;
    }

    // After making a choice, clear the dialogue options
    this.dialogueOptions.forEach(option => option.destroy());
    this.dialogueOptions = [];
}
