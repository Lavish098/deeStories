document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = window.location.pathname.split("/");
  const storyId = urlParams[urlParams.length - 1];

  const form = document.getElementById("storyForm");

  // Set the action attribute of the form
  form.action = `/stories/${storyId}`;

  try {
    const storyResponse = await fetch(`/stories/edit/${storyId}`);
    const story = await storyResponse.json();

    console.log(story);
    if (story) {
      console.log(story[0].body);
      const sanitizedBody = story[0].body
        .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
        .replace(/&nbsp;/g, " ");

      document.getElementById("title").value = story[0].title;
      document.getElementById("status").value = story[0].status;
      document.getElementById("body").textContent = sanitizedBody;

      ClassicEditor.create(document.querySelector("#body")).catch((error) => {
        console.error(error);
      });
    }
  } catch {
    console.log("error");
  }
});
