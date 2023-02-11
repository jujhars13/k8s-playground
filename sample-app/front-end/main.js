

window.addEventListener('DOMContentLoaded', async (event) => {
  console.log('DOM fully loaded and parsed');

  try {
    const rawStories = await getAllHnStories();
    const stories = rawStories.map(el => {
      return {
        id: el.value?.id,
        by: el.value?.by,
        title:el.value?.title,
        url:el.value?.url
      }
    })
    renderStories(stories);
  }
  catch (error) {
    console.log({ msg: "can't get hn stories", error })
  }
});

/**
 * Render the stories into our dom
 * @param {array} stories
 */
const renderStories = (stories) => {
  const domTarget = document.getElementById("hacker-news-stories");
  let output=""
  stories.forEach(value => {
    output += `
    <div class="card" style="width: 18rem;" data-storyId="${value.id}">
      <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <a class="card-link" href="${value.url}">${value.url}</a>
        <a href="#" class="card-link">${value.by}</a>
      </div>
     </div>
     `;
  });
  domTarget.innerHTML = output;
}

/**
 * Get all HN stories from our backend service BFF
 * @returns {array}
 */
const getAllHnStories = async () => {
  const apiUrl = "http://localhost:8001/hacker-news";
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((body) => {
      if (!body) {
        throw "No news returned"
      }
      return body.data;
    })
    .catch((err) => {
      console.error({ msg: "error in getting news", err })
      return null;
    });
}
