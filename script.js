console.log("Hola Mundo");

window.addEventListener("load", () => {
	const submitButton = document.querySelector("#submit");
	submitButton?.addEventListener("click", (event) => {
		event.preventDefault();
		const name = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;
		const phone = document.querySelector("#phone").value;
		const message = document.querySelector("#message").value;

		const formElem = document.querySelector("#form-msg");
		//reset msg style
		formElem.classList.remove(...formElem.classList);
		console.log("cleared classes");

		if (name !== "" && email !== "" && message !== "") {
			// ok
			document.querySelector("#user-name").innerHTML = name;
			document.querySelector("#user-email").innerHTML = email;
			document.querySelector("#user-phone").innerHTML = phone;
			document.querySelector("#user-message").innerHTML = message;
			formElem.classList.add("show-success");
			formElem.innerHTML = "Mensaje enviado correctamente!";
		} else {
			// error
			formElem.classList.add("show-error");
			formElem.innerHTML = "Debe ingresar todos los campos obligatorios";
		}
	});

	document.querySelector("#get-user")?.addEventListener("click", getUser);
});

function alertMsg(msg) {}

function getUser() {
	fetch("https://randomuser.me/api/")
		.then((data) => {
			return data.json();
		})
		.then((response) => {
			console.log(response);
			const userData = response.results[0].name;
			document.querySelector("#get-user").style.display = "none";
			document.querySelector(
				"#user-name"
			).innerHTML = `${userData.title}. ${userData.first} ${userData.last}`;
			document.querySelector("#user-img").src =
				response.results[0].picture.large;
		})
		.catch((error) => {
			console.error("Fetch user: ", error);
			document.querySelector("#user-name").innerHTML =
				"No se ha podido recuperar el usuario. Por favor inténtelo más tarde.";
			document.querySelector("#user-name").classList.add("show-error");
		});
}
