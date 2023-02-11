/**
 * Hacker news API wrapper
 * @see https://hackernews.api-docs.io/
 */

/**
 * Get all hacker new story ids
 * @returns array of all hacker news story ids
 */
const getAllStoryIds = () => {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((response) => response.json())
    .then((body) => {
      if (!body) {
        throw "No news ids returned"
      }
      return body;
    })
    .catch((err) => {
      console.error({ msg: "error in getting stories", err })
      return null;
    });
}

/**
 * Get a HN story by id
 * @param {int} storyId
 * @returns {object} story
 */
const getStoryById = (storyId) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
    .then((response) => response.json())
    .then((body) => {
      if (!body) {
        throw "No news item body returned"
      }
      return body;
    })
    .catch((err) => {
      console.error({ msg: `error in getting story ${storyId}`, err })
      return null;
    });
}

/**
 * Get hacker news stories
 *
 * @returns {object} story
 */
const getAllHnStories = () => {
  return getAllStoryIds()
    .then(allStoryIds => {
      // API returns 500 story ids, we only want 20 of them
      const storyIds = allStoryIds.slice(0, 20);
      const promArr = [];
      //
      storyIds.forEach(el => {
        promArr.push(getStoryById(el))
      });

      // Promise.allSettled, in case one fails we don't want can still make use
      // of some of the data
      return Promise.allSettled(promArr)
        // remove the promise "status" field
        .then(data => {
          return data.map(el => {
            delete el.status;
            return el;
          })
        });
})
}

module.exports = { getAllHnStories }
