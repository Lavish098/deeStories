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
                  const Story = document.getElementById('story')

                  const storyTitle = document.createElement('h2')
                  storyTitle.textContent = stories.title

                  const storyBody = document.createElement('div')
                  storyBody.innerHTML = stories.body

                  Story.appendChild(storyTitle)
                  Story.appendChild(storyBody)
                }
          } else {
            document.body.textContent = 'No story ID provided in the URL';
          }
        }catch (err){

        }
      }

