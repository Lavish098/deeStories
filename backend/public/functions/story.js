function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get the story ID from the URL
const storyId = getQueryParam('id');

fetchStoryData();

    async function fetchStoryData() {
        try {
          if (storyId) {
            // Fetch the story data from the server
            const response = await fetch(`/stories/${storyId}`);
                      const data = await response.json();
                const stories = data
          
                console.log(stories);

                if(stories){
                  document.title = stories.title;

                  const Story = document.getElementById('story')
                  Story.className = 'bg-gray-300 m-10 p-10 rounded-[20px] w-[90%]'

                  const storyTitle = document.createElement('h2')
                  storyTitle.textContent = stories.title
                  storyTitle.className = 'font-bold text-[30px] mb-10px'

                  const storyBody = document.createElement('div')
                  storyBody.innerHTML = stories.body
                  storyBody.className = 'text-[20px]'

                  Story.appendChild(storyTitle)
                  Story.appendChild(storyBody)
                }
          } else {
            document.body.textContent = 'No story ID provided in the URL';
          }
        }catch (err){

        }
      }

