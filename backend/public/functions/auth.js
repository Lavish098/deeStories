document.addEventListener('DOMContentLoaded', () => {
	// Fetch flash messages from the server
	fetch('/flash')
	  .then(response => response.json())
	  .then(data => {

		console.log(data);
		const flashContainer = document.getElementById('flash-messages');

		if (data.success && data.success.length > 0) {
		  data.success.forEach(message => {
			flashContainer.innerHTML += `<div class="flash flash-error w-full py-3 mb-6 text-sm font-medium rounded-lg text-white bg-red-300">
			<h2 class="ml-5">${message}</h2></div>`;		  });
		}

		if (data.error && data.error.length > 0) {
		  data.error.forEach(message => {
			flashContainer.innerHTML += `<div class="flash flash-error w-full py-3 mb-6 text-sm font-medium rounded-lg text-white bg-red-300">
			<h2 class="ml-5">${message}</h2></div>`;		  });
		}
		if (data.authError && data.authError.length > 0) {
			data.authError.forEach(message => {
			  flashContainer.innerHTML += `<div class="flash flash-error w-full py-3 mb-6 text-sm font-medium rounded-lg text-white bg-red-300">
			  <h2 class="ml-5">${message}</h2></div>`;
			});
		  }
	  })
	  .catch(error => console.error('Error fetching flash messages:', error));
  });