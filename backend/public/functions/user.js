const userIn = document.querySelector('.user')
const logOut = document.querySelector('.user-out')
const logIn = document.querySelector('.user-in')



    fetchUserData();

    async function fetchUserData() {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
			const user = data

            if (user) {
                displayUserInfo(user);
                logIn.className = 'hidden'
            } else {
                console.log(data.error); // Display error message if any
                logOut.className = 'hidden'
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    function displayUserInfo(user) {
		console.log(user);
        userIn.textContent = `
            Welcome ${user.displayName}
        `;
    }

