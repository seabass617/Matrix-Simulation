//============================================
// Sketch File 
//============================================

let characterSize = 15;
let streams = [];
let character_array = [];

function windowResized() {
	resizeCanvas(clientWidth, clientHeight);
}

function setup() {

	let clientHeight = document.getElementById('window').clientHeight;
	let clientWidth = document.getElementById('window').clientWidth;

	canvas = createCanvas (clientWidth, clientHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-10');
	background(0);
	let x = 0;
	// Populate the characters array
	character_array = populate_characters_array();
	
	// Create individual streams and push it to the group 
	for (let i = 0; i <= width / characterSize; i++){
		let stream = new Stream();
		stream.generateCharacters(x, random(-1000,0));
		streams.push(stream);
		x += characterSize;
	}
	textSize(characterSize);
}
  
function draw() {
	background(0, 125);
	streams.forEach(function(stream){
		stream.render();
	});
}


class Stream {
	constructor(speed){
		this.characters = [];
		this.totalCharacters = round(random(5,20)); //<----- Total Characters
		this.speed = random(2,6); //<------ Fall Speed
	}

	generateCharacters(x, y){
		let first = round(random(0,4)) == 1; //<<-------- Coding coin toss! 
		for (let i = 0; i <= this.totalCharacters; i++){
			let character = new Character(x, y, this.speed, first);
			character.setToRandomCharacter();
			this.characters.push(character);
			y -= characterSize;
			first = false;
		}
	}

	render(){
	this.characters.forEach(function(character) {
			if (character.first) {
				fill(225,150,100);
			}else {
				fill(200,50,255);
			}
			text(character.value, character.x, character.y);
			character.setToRandomCharacter();
			character.rain();
		});
	}
}


class Character {
	constructor(x, y, fall_speed, first){
		this.x = x;
		this.y = y;
		this.value;
		this.fall_speed = fall_speed;
		this.switchInterval = round(random(10,20));
		this.first = first;
	}

	setToRandomCharacter(){
		if (frameCount % this.switchInterval == 0){
			//this.value  = String.fromCharCode(
			//	0x30A0 + round(random(0, 96))); 
			this.value = character_array[Math.floor(Math.random() * character_array.length)];
		}
	}

	rain(){
		this.y = (this.y >= height) ? 0 : this.y += this.fall_speed;
	}

}

function populate_characters_array(){
	array = [];

	for (let i = 0; i <= 96; i++){
		array.push(String.fromCharCode(0x30A0 + i));
	};

	// for (let i = 65; i <= 90; i++){
	// 	array.push(String.fromCharCode(i));
	// };

	for (let i = 0; i <= 9; i++){
		array.push(`${i}`)
	};

	return array
}
