let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o desenho do canvas
let box = 32; //tamanho de cada quadrado
let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box,
};
let direction = "right";
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
	context.fillStyle = "lightgreen"; //estilo do contexto, cor
	context.fillRect(0, 0, 16 * box, 16 * box); //desenha retângulo, posição x e y, altura e largura
}
function setDirection(dir) {
	if (dir === "left" && direction !== "right") direction = "left";
	if (dir === "up" && direction !== "down") direction = "up";
	if (dir === "right" && direction !== "left") direction = "right";
	if (dir === "down" && direction !== "up") direction = "down";
}
function criarCobrinha() {
	for (let i = 0; i < snake.length; i++) {
		context.fillStyle = "green";
		context.fillRect(snake[i].x, snake[i].y, box, box);

		// Desenha o rostinho apenas na cabeça
		if (i === 0) {
			// Olhos
			context.fillStyle = "white";
			context.beginPath();
			context.arc(snake[i].x + box * 0.25, snake[i].y + box * 0.3, box * 0.08, 0, 2 * Math.PI);
			context.arc(snake[i].x + box * 0.75, snake[i].y + box * 0.3, box * 0.08, 0, 2 * Math.PI);
			context.fill();

			context.fillStyle = "black";
			context.beginPath();
			context.arc(snake[i].x + box * 0.25, snake[i].y + box * 0.3, box * 0.04, 0, 2 * Math.PI);
			context.arc(snake[i].x + box * 0.75, snake[i].y + box * 0.3, box * 0.04, 0, 2 * Math.PI);
			context.fill();

			// Boca
			context.strokeStyle = "black";
			context.beginPath();
			context.arc(snake[i].x + box * 0.5, snake[i].y + box * 0.5, box * 0.2, 0, Math.PI);
			context.stroke();
		}
	}
}

function drawFood() {
	// Desenha a maçã (frutinha)
	context.fillStyle = "red";
	context.fillRect(food.x, food.y, box, box);

	// Desenha a folhinha
	context.fillStyle = "rgba(56, 149, 49, 1)";
	context.beginPath();
	context.arc(food.x + box * 0.7, food.y + box * 0.3, box * 0.15, Math.PI, 2 * Math.PI);
	context.fill();
}

document.addEventListener("keydown", update);

function update(event) {
	if (event.keyCode == 37 && direction != "right") direction = "left";
	if (event.keyCode == 38 && direction != "down") direction = "up";
	if (event.keyCode == 39 && direction != "left") direction = "right";
	if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
	if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	for (i = 1; i < snake.length; i++) {
		if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
			clearInterval(jogo);
			alert("GAME OVER :(");
		}
	}

	criarBG();
	criarCobrinha();
	drawFood();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (direction == "right") snakeX += box;
	if (direction == "left") snakeX -= box;
	if (direction == "up") snakeY -= box;
	if (direction == "down") snakeY += box;

	if (snakeX != food.x || snakeY != food.y) {
		snake.pop();
	} else {
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
	}

	let newHead = {
		x: snakeX,
		y: snakeY,
	};

	snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
