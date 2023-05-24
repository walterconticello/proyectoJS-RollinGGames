//
let swiper = new Swiper(".miSwiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	coverflowEffect: {
		rotate: 15,
		stretch: 0,
		depth: 300,
		modifier: 1,
		slideShadows: true,
	},
	loop: true,
});


let index = 0,
	interval = 1000;

const rand = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
	star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
	star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

	star.style.animation = "none";
	star.offsetHeight;
	star.style.animation = "";
}

for (const star of document.getElementsByClassName("magic-star")) {
	setTimeout(() => {
		animate(star);

		setInterval(() => animate(star), 1000);
	}, index++ * (interval / 3))
}


const icon = document.getElementById("icon");
const header = document.querySelector(".header");

icon.onclick = function () {
	document.body.classList.toggle("light-theme");
	if (document.body.classList.contains("light-theme")) {
		icon.src = "img/sun.png";
		header.style.backgroundImage = "url(./img/bg-light.png)";
	} else {
		icon.src = "img/moon.png";
		header.style.backgroundImage = "url(./img/bg-dark.jpg)";
	}
}


if (document.body.classList.contains("light-theme")) {
	header.style.backgroundImage = "url(./img/bg-light.png)";
} else {
	header.style.backgroundImage = "url(./img/bg-dark.jpg)";
}


const btnFilter = document.querySelector('.icon-filter');
btnFilter.addEventListener('click', () => {
	const containerFilter = document.querySelector('.container-filters')

	containerFilter.classList.toggle('active')
})


const btnCloseFilter = document.querySelector('.close-filter');
btnCloseFilter.addEventListener('click', () => {
	const containerFilter = document.querySelector('.container-filters');
	containerFilter.classList.remove('active');
});




let cuentaActiva = localStorage.getItem("cuentaActiva");
if (cuentaActiva !== null) {
	cuentaActiva = JSON.parse(cuentaActiva);
}


let cuentas = localStorage.getItem("cuentas");
if (cuentas === null) {
	cuentas = [];
	const cuentaAdmin = new Cuenta("admin", "admin@admin.com", "1234", true);
	cuentas.push(cuentaAdmin);
	localStorage.setItem("cuentas", JSON.stringify(cuentas));
}
else {
	cuentas = JSON.parse(cuentas);
}




let juegosString = localStorage.getItem('tablaJuegoStorage');


let juegos = JSON.parse(juegosString);


let catalogo = document.getElementById('catalogue');


function mostrarJuegos(juegos) {
	
	catalogo.innerHTML = '';

	
	juegos.forEach(function (juego) {
		juego = JSON.parse(juego);

		
		let gameCard = document.createElement('div');
		gameCard.className = 'game-card';

		let contentGameCard = document.createElement('div');
		contentGameCard.className = 'content-game-card';

		let imgBx = document.createElement('div');
		imgBx.className = 'imgBx';

		let gameImg = document.createElement('img');
		gameImg.src = juego.url;

		let contentBx = document.createElement('div');
		contentBx.className = 'contentBx';

		let gameName = document.createElement('h3');
		let precioNumerico = parseInt(juego.precio);
		let free = precioNumerico !== 0 ? `${precioNumerico}` : 'Gratis';
		gameName.innerHTML = `${juego.nombre}<br><span>${juego.genero}</span><br>${free}`;


		let ul = document.createElement('ul');
		ul.className = 'sci';

		let liCart = document.createElement('li');
		liCart.style = '--i:1';

		let aCart = document.createElement('a');

		let cartIcon = document.createElement('i');
		cartIcon.className = 'cart fas fa-shopping-cart';
		cartIcon.setAttribute('aria-hidden', 'true');

		let likeIcon = document.createElement('i');
		if (cuentaActiva && cuentaActiva.favoritos.find(juegoFav => JSON.parse(juegoFav).IdJuego === juego.IdJuego)) {
			likeIcon.className = 'fas fa-heart like liked';
		}
		else if (cuentaActiva) {
			likeIcon.className = 'fas fa-heart like';
		}
		else {
			likeIcon.className = 'bi bi-heartbreak-fill like';
			likeIcon.setAttribute('title', 'Inicia Sesion para añadir este juego a favoritos');
		}
		likeIcon.setAttribute('aria-hidden', 'true');
		likeIcon.dataset.idLike = `${juego.IdJuego}`;

		let liLike = document.createElement('li');
		liLike.style = '--i:1';

		let aLike = document.createElement('a');

		
		aCart.appendChild(cartIcon);
		liCart.appendChild(aCart);

		aLike.appendChild(likeIcon);
		liLike.appendChild(aLike);

		ul.appendChild(liCart);
		ul.appendChild(liLike);

		imgBx.appendChild(gameImg);

		
		const generoCapitalizado = juego.genero.charAt(0).toUpperCase() + juego.genero.slice(1);

		contentBx.appendChild(gameName);

		gameName.innerHTML = `${juego.nombre}<br><span>${generoCapitalizado}</span><br>${free !== 'Gratis' ? '$' + free : free}`;

		contentGameCard.appendChild(imgBx);
		contentGameCard.appendChild(contentBx);

		gameCard.appendChild(contentGameCard);
		gameCard.appendChild(ul);

		catalogo.appendChild(gameCard);
	});

	
	const like = document.querySelectorAll('.like');
	like.forEach(like => {
		like.addEventListener("click", () => {
			if (cuentaActiva) {
				let id = like.dataset.idLike;
				let juego = juegos.find(juego => JSON.parse(juego).IdJuego === id);
				if (like.classList.contains("liked")) {
					cuentaActiva.favoritos.splice(cuentaActiva.favoritos.findIndex(juego => juego.IdJuego === id), 1);
				}
				else {
					cuentaActiva.favoritos.push(juego);
				}
				localStorage.setItem("cuentaActiva", JSON.stringify(cuentaActiva));
				cuentas.splice(cuentas.findIndex(cuenta => cuenta.usuario === cuentaActiva.usuario), 1, cuentaActiva);
				localStorage.setItem("cuentas", JSON.stringify(cuentas));
				like.classList.toggle('liked');
			}
		});
	});

	
	const carts = document.querySelectorAll('.cart')
	carts.forEach(cart => {
		cart.addEventListener('click', () => {
			cart.classList.toggle('cart-added');
		});
	});
}


mostrarJuegos(juegos);


function obtenerGenerosUnicos(juegos) {
	const generos = [];
	juegos.forEach(function (juego) {
		juego = JSON.parse(juego);
		generos.push(juego.genero);
	});
	generos.push("Deseados"); 
	const generosUnicos = [...new Set(generos)];
	return generosUnicos;
}


const generosUnicos = obtenerGenerosUnicos(juegos);
const filterByGender = document.querySelector('.filter-by-gender');

generosUnicos.forEach(genero => {
	const groupTypeContainer = document.createElement('div');
	groupTypeContainer.className = 'group-type';

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.id = genero;
	input.name = 'genero';
	groupTypeContainer.appendChild(input);

	const label = document.createElement('label');
	label.htmlFor = genero;

	
	const generoCapitalizado = genero.charAt(0).toUpperCase() + genero.slice(1);
	label.textContent = generoCapitalizado;

	groupTypeContainer.appendChild(label);

	
	input.addEventListener('click', function () {
		
		const checkboxes = document.querySelectorAll('.group-type input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
			if (checkbox !== input) {
				checkbox.checked = false;
			}
		});

		
		let juegosFiltrados;
		if (genero === "Deseados") {
			juegosFiltrados = juegos.filter(function (juego) {
				juego = JSON.parse(juego);
				if (cuentaActiva && cuentaActiva.favoritos) {
					return cuentaActiva.favoritos.find(juegoFav => JSON.parse(juegoFav).IdJuego === juego.IdJuego);
				}
				return false;
			});
		} else {
			juegosFiltrados = juegos.filter(function (juego) {
				juego = JSON.parse(juego);
				return juego.genero === genero;
			});
		}

		
		if (!input.checked) {
			mostrarJuegos(juegos);
			VanillaTilt.init(document.querySelectorAll(".game-card"), {
				max: 25,
				speed: 400
			});

		} else {
			
			mostrarJuegos(juegosFiltrados);
			VanillaTilt.init(document.querySelectorAll(".game-card"), {
				max: 25,
				speed: 400
			});
		}
	});

	filterByGender.appendChild(groupTypeContainer);
});


const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


searchInput.addEventListener('input', function () {
	const searchTerm = searchInput.value.toLowerCase();

	
	const checkboxes = document.querySelectorAll('.group-type input[type="checkbox"]');
	checkboxes.forEach(function (checkbox) {
		checkbox.checked = false;
	});

	
	const juegosFiltrados = juegos.filter(function (juego) {
		juego = JSON.parse(juego);
		const nombre = juego.nombre.toLowerCase();
		return nombre.includes(searchTerm);
	});

	
	mostrarJuegos(juegosFiltrados);

	
	VanillaTilt.init(document.querySelectorAll(".game-card"), {
		max: 25,
		speed: 400
	});
});


searchButton.addEventListener('click', function (event) {
	event.preventDefault(); 
});



let buttons = document.querySelectorAll('.magic-btn a, .magic-btn2 a');
const sensitivity = 0.7; 

buttons.forEach(function (btn) {
	let x = 0;

	btn.addEventListener('mousemove', function (e) {
		let rect = e.target.getBoundingClientRect();
		x = (e.clientX - rect.left) / rect.width * sensitivity;
		requestAnimationFrame(animateButton);
	});

	function animateButton() {
		btn.style.setProperty('--x', `${x * 360}deg`);
	}
});


const form = document.getElementById('suscribe-form');
form.addEventListener('submit', function (event) {
	event.preventDefault(); 

	
	Swal.fire({
		title: '¡Gracias por suscribirte a nuestras noticias!',
		text: 'Recibirás las últimas novedades en juegos, DLC, actualizaciones y más.',
		icon: 'success',
		confirmButtonText: 'Aceptar'
	});

	
	form.reset();

	return false; 
});