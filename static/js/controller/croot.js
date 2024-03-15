import { token } from "./cookies.js";

if (token === "") {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Oops sesi anda telah habis, silahkan login lagi.'
	})
	.then(() => {
		window.location.assign("https://euis.ulbi.ac.id");
	})
}