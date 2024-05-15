const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const signUp = document.querySelector('.signup')
const logIn = document.querySelector('.signin')
const surnameError = document.querySelector('.surname.error')
const firstnameError = document.querySelector('.firstname.error')
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')
const emailError1 = document.querySelector('.email.error1')
const passwordError1 = document.querySelector('.password.error1')


signUp.addEventListener('submit', async (e) => {
	e.preventDefault()
	//reset errors
	surnameError.textContent = '';
			firstnameError.textContent = '';
			emailError.textContent = '';
			passwordError.textContent = '';

	const surname = signUp.surname.value
	const firstname = signUp.firstname.value
	const email = signUp.email.value
	const password = signUp.password.value

	try {
		const res = await fetch('/signup', {
			method: 'POST',
			body: JSON.stringify({ surname, firstname, email, password}),
			headers: {'Content-Type': 'application/json'}
		})
		const data = await res.json();
		console.log(data);
		if(data){
			surnameError.textContent = data.surname;
			firstnameError.textContent = data.firstname;
			emailError.textContent = data.email;
			passwordError.textContent = data.password;
		}
		if(data.user){
			location.assign('/add-product')
		}
	} catch (err) {
		console.log(err);
	}
})


logIn.addEventListener('submit', async (e) => {
	e.preventDefault()
	//rest errors
	emailError1.textContent = '';
			passwordError1.textContent = '';

			
	const email = logIn.email.value
	const password = logIn.password.value

	try {
		const res = await fetch('/signin', {
			method: 'POST',
			body: JSON.stringify({email, password}),
			headers: {'Content-Type': 'application/json'}
		})
		const data = await res.json();
		console.log(data);
		if(data.errors){
			emailError1.textContent = data.errors.email;
			passwordError1.textContent = data.errors.password;
		}
		if(data.user){
			location.assign('/add-product')
		}
	} catch (err) {
		console.log(err);
	}
})
