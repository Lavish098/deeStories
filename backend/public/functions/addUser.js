

    addUserData();

    async function addUserData() {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
			const user = data

            if (user) {
                // Assuming you have a form element with the id "storyForm"
    const form = document.getElementById('storyForm');

    // Create a hidden input field
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'user'; // Name of the field in your form
    hiddenInput.value = JSON.stringify(user); // Convert user object to JSON string

    // Append the hidden input field to the form
    form.appendChild(hiddenInput);
            } else {
                console.log(data.error); // Display error message if any
               
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }


