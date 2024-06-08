const userIn = document.querySelectorAll('.user')
const logOut = document.querySelectorAll('.user-out')
const logIn = document.querySelectorAll('.user-in')

const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');
        const closeMenu = document.getElementById('close-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.remove('hidden');
            navMenu.classList.add('block');
            navMenu.style.zIndex = '9999'; // Ensure high z-index value
            
        });

        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('block');
            navMenu.classList.add('hidden');
        });


    fetchUserData();

    async function fetchUserData() {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
			const user = data

            if (user) {
                displayUserInfo(user);
                
                logIn.forEach(logIn => {
                    logIn.className = 'hidden'
                })
            } else {
                console.log(data.error); // Display error message if any
                logOut.forEach(logOut => {
                    logOut.className = 'hidden'
                })
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    function displayUserInfo(user) {
		console.log(user);
        userIn.forEach(userIn => {
            userIn.textContent = `
                Welcome ${user.displayName}
            `;
        })
    }

