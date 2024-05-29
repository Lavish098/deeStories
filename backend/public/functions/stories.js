
    fetchStoryData();

    async function fetchStoryData() {
        try {
            const response = await fetch('/api/stories');
            const data = await response.json();
			const stories = data

            const userResponse = await fetch("/api/user");
    const userData = await userResponse.json();
    const user = userData;

            if (stories) {
                console.log(stories);
                const tableBody = document.getElementById('stories-table-body');
                    stories.forEach(story => {
                const row = document.createElement('tr');
                row.className = 'border-b border-neutral-200 bg-black/[0.02] dark:border-white/10'
    
                const titleCell = document.createElement('td');
                const read = document.createElement("a");
        read.href = `./story.html?id=${story._id}`;
        read.textContent = story.title;
        read.className = 'whitespace-nowrap px-6 py-4'

                titleCell.appendChild(read)
    
                const dateCell = document.createElement('td');
                const dateOptions = { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: true
                };
                dateCell.textContent = new Date(story.createdAt).toLocaleString('en-US', dateOptions); // Assuming 'date' field contains a valid date
                dateCell.className = 'whitespace-nowrap px-6 py-4'

                const statusCell = document.createElement('td');
                statusCell.textContent = story.status;
                statusCell.className = 'whitespace-nowrap px-6 py-4'

                const editDelete = document.createElement('td')
                editDelete.className = 'flex'

                if (user._id == story.user) {
                    console.log(story._id);
                    const edit = document.createElement("a");
                    edit.href = `/stories/edits/${story._id}`;
                    edit.className =
                      " mt-3 mr-3 z-10 items-center text-[20px] font-medium text-center text-gray-300 text-[15px] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
                    const icon = document.createElement("i");
                    icon.className = "fas fa-edit";

                    const deleteForm = document.createElement('form')
                    deleteForm.action = `/stories/${story._id}`
                    deleteForm.method = 'POST'

                    const deleteInput = document.createElement("input");
                    deleteInput.type = 'hidden';
                    deleteInput.name = '_method';
                    deleteInput.value = 'DELETE';

                    deleteInput.className =
                      " mt-3 mr-10 z-10 items-center text-[20px] font-medium text-center text-gray-300 text-[15px] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
                    
                    const deleteBtn = document.createElement('button')
                    deleteBtn.type = 'submit'
                    const deleteIcon = document.createElement("i");
                    deleteIcon.className = "fas fa-trash";
          
                    edit.appendChild(icon)
                    deleteBtn.appendChild(deleteIcon);
                    deleteForm.appendChild(deleteInput);
                    deleteForm.appendChild(deleteBtn);

                    editDelete.appendChild(edit);
                    editDelete.appendChild(deleteForm);
                  }
    
                row.appendChild(titleCell);
                row.appendChild(dateCell);
                row.appendChild(statusCell);
                row.appendChild(editDelete);
    
                tableBody.appendChild(row);
            })
            } else {
                console.log(data.error); 
            }
            
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        
    }
