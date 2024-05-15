
    fetchStoryData();

    async function fetchStoryData() {
        try {
            const response = await fetch('/api/stories');
            const data = await response.json();
			const stories = data

            if (stories) {
                console.log(stories);
                const tableBody = document.getElementById('stories-table-body');
                    stories.forEach(story => {
                const row = document.createElement('tr');
                row.className = 'border-b border-neutral-200 bg-black/[0.02] dark:border-white/10'
    
                const titleCell = document.createElement('td');
                titleCell.textContent = story.title;
                titleCell.className = 'whitespace-nowrap px-6 py-4'
    
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
    
                row.appendChild(titleCell);
                row.appendChild(dateCell);
                row.appendChild(statusCell);
    
                tableBody.appendChild(row);
            })
            } else {
                console.log(data.error); 
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        
    }
