
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
        const dashboard = document.getElementById("dashboard");
  
        stories.forEach((story) => {
          console.log(story);
          const card = document.createElement("card");
          card.className =
            "max-w-[20em] p-6 mr-5 mt-6 relative flex flex-wrap justify-center item-center bg-white shadow";
  
            const img = document.createElement("img");
          img.src = `data:image/jpeg;base64,${story.image}`; 
          img.className = "w-40 h-42 mr-2 ";
          img.alt = story.title;
  
  
          const title = document.createElement("h5");
          title.className =
            "mb-2 mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
          title.textContent = story.title;
  
          const body = document.createElement("p");
          body.className = "text-gray-700 text-base mb-2";
          body.textContent =
            story.body
              .replace(/<\/?p>/g, "")
              .replace(/<\/?strong>/g, "")
              .replace(/<\/?h2>/g, "")
              .replace(/&nbsp;/g, "")
              .substring(0, 70) + "..."; // Remove HTML tags and &nbsp;
  
          const readMore = document.createElement("div");
          readMore.className =
            "w-full mt-5 flex justify-center item-center border-t-2 border-grey-300";
  
          const read = document.createElement("a");
          read.href = `./story.html?id=${story._id}`;
          read.textContent = "Read More";
          read.className =
            "inline-flex mt-5 items-center px-3 py-2 text-sm font-medium text-center text-white text-[15px] bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
            
          if (user._id == story.user) {
            const edit = document.createElement("a");
            edit.href = `/stories/edits/${story._id}`;
            edit.className =
              "absolute top-0 right-0 mt-3 mr-3 z-10 items-center text-[20px] font-medium text-center text-gray-300 text-[15px] focus:ring-4 focus:outline-none focus:ring-blue-300";
            const icon = document.createElement("i");
  
            icon.className = "fas fa-edit";

            const deleteForm = document.createElement('form')
        deleteForm.action = `/stories/${story._id}`
        deleteForm.method = 'POST'

        const deleteInput = document.createElement("input");
        deleteInput.type = 'hidden';
        deleteInput.name = '_method';
        deleteInput.value = 'DELETE';

        deleteForm.className =
          "absolute top-0 right-0 flex mt-3 mr-12 z-10 items-center text-[20px] font-medium text-center text-gray-300 text-[15px] focus:ring-4 focus:outline-none focus:ring-blue-300";
        
        const deleteBtn = document.createElement('button')
        deleteBtn.type = 'submit'
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash";
  
            edit.appendChild(icon);
            deleteBtn.appendChild(deleteIcon);
            deleteForm.appendChild(deleteInput);
            deleteForm.appendChild(deleteBtn);

            card.appendChild(edit);
            card.appendChild(deleteForm);
          }
  
          readMore.appendChild(read);
  
          card.appendChild(img)
          card.appendChild(title);
          card.appendChild(body);
          card.appendChild(readMore);
  
          dashboard.appendChild(card);
        });
      } else {
        console.log(data.error);
      }
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        
    }