//============================================
// Matrix Sketch File
//============================================


//Set the size of each character
//Create an array to hold all the streams
//Create an array to hold all the character options you have
let characterSize = 15;
let streams = [];
let character_array = [];


// Resize canvas every time the window size changes
function windowResized() {
	resizeCanvas(clientWidth, clientHeight);
}

//===========================================
//Initial Setup
//===========================================
function setup() {

	// Define the window size 
	let clientHeight = document.getElementById('window').clientHeight;
	let clientWidth = document.getElementById('window').clientWidth;

	//Create a canvas the size of the window
	canvas = createCanvas (clientWidth, clientHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-10');
	background(0);

	//Start x value for first stream at the left of the window 
	let x = 0;
	
	// Populate the characters array
	character_array = populate_characters_array();
	
	// Create individual streams and push it to the streams array
	for (let i = 0; i <= width / characterSize; i++){
		let stream = new Stream();
		stream.generateCharacters(x, random(-1000,0)); //<--- Y value will be randomly distributed so that there is a staggerd start
		streams.push(stream);
		x += characterSize;
	}

	//Define the text size
	textSize(characterSize);
}

//===========================================
//Draw Function (Iterated 60 times per second)
//===========================================
function draw() {
	background(0, 125);
	streams.forEach(stream => stream.render()); //<---- Iterate through the streams and render each one
}


//===========================================
// CLASSES 
//===========================================


//Stream Class (Comprised of Characters)
class Stream {
	constructor(){
		this.characters = []; //<---- All the characters in this specific stream
		this.totalCharacters = round(random(5,20)); //<----- Total # of Characters per stream
		this.speed = random(2,6); //<------ Fall Speed
	}

	//Generate the characters that will go in each stream, takes in x and y coordinates
	generateCharacters(x, y){
		let first = round(random(0,4)) == 1; //<-------- Coding coin toss! 1 in 5 chance that the first character will be orange!
		for (let i = 0; i <= this.totalCharacters; i++){ //<--- Create the characters and push them to the array
			let character = new Character(x, y, this.speed, first);
			character.setToRandomCharacter();
			this.characters.push(character);
			y -= characterSize;
			first = false;
		}
	}
	//Display each stream
	render(){
	this.characters.forEach(character => {
			if (character.first) { //<--- Make orange is first is true
				fill(225,150,100);
			}else {   //<--- Otherwise just make it purple
				fill(200,50,255);
			}
			text(character.value, character.x, character.y); //<--- Render the character in the desired location
			character.setToRandomCharacter(); //<--- Reset the value for the character (So it changes)
			character.rain(); //<--- Make it rain!
		});
	}
}

//Character Class
class Character {
	constructor(x, y, fall_speed, first){
		this.x = x;
		this.y = y;
		this.value;
		this.fall_speed = fall_speed;
		this.switchInterval = round(random(10,20)); //<----How often the characters will be switching
		this.first = first; //<--- If set to true, then this is the first character 
	}

	setToRandomCharacter(){ 
		// Frame count is tracking how many frames have passed, if the current count 
		// is divisible by the switch interval, then the expression will evaluate to true
		// and you will change the value of the character. 
		if (frameCount % this.switchInterval == 0){
			this.value = character_array[Math.floor(Math.random() * character_array.length)];
		}
	}

	rain(){
		// If character has reached the bottom of the page then
		// bring it back to the top, if it has yet to hit the bottom
		// make the character appear lower on the next frame
		this.y = (this.y >= height) ? 0 : this.y += this.fall_speed;
	}

}

// Global Function to populate the array of available characters
function populate_characters_array(){
	array = [];

	// Adding Katana Characters
	for (let i = 0; i <= 96; i++){
		array.push(String.fromCharCode(0x30A0 + i)); 
	};

	// Adding Numbers
	for (let i = 0; i <= 9; i++){
		array.push(`${i}`)
	};

	return array
}
