fetchStoryData();

async function fetchStoryData() {
  try {
    const response = await fetch("/stories");
    const data = await response.json();
    const stories = data;

    if (stories) {
      console.log(stories);
      const publicBody = document.getElementById("public");

      stories.forEach((story) => {
        console.log(story);
        const card = document.createElement("card");
        card.className =
          "max-w-sm p-6 mr-5 flex flex-wrap justify-center item-center bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700";

        const title = document.createElement("h5");
        title.className =
          "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
        title.textContent = story.title;

        const body = document.createElement("p");
        body.className = "text-gray-700 text-base mb-2";
        body.textContent =
          story.body
            .replace(/<\/?p>/g, "")
            .replace(/<\/?strong>/g, "")
            .replace(/&nbsp;/g, "")
            .substring(0, 70) + "..."; // Remove HTML tags and &nbsp;

        const userImage = document.createElement("div");
        userImage.className = "flex items-center bg-gray-300 w-[60%] mt-5 rounded rounded-[20px]";

        const imgElement = document.createElement("img");
        imgElement.src = story.user.image; // Set the src attribute to the image file path
        imgElement.alt = story.user.displayName; // Set the alt attribute for accessibility
        imgElement.className = "w-10 h-10 rounded-full mr-2 ";

        const userLink = document.createElement("a");
        userLink.href = `/stories/users/${story.user._id}`;
        userLink.textContent = story.user.displayName;
        userLink.className = 'font-bold'

        const readMore = document.createElement("div");
        readMore.className = 'w-full mt-5 flex justify-center item-center border-t-2 border-grey-300'

        const read = document.createElement('a')
        read.href = `/stories/users/${story._id}`;
        read.textContent = "Read More";
        read.className =
          "inline-flex mt-5 items-center px-3 py-2 text-sm font-medium text-center text-white text-[15px] bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

        readMore.appendChild(read)
        userImage.appendChild(imgElement);
        userImage.appendChild(userLink);

        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(userImage);
        card.appendChild(readMore);

        publicBody.appendChild(card);
      });
    } else {
      console.log(data.error);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}