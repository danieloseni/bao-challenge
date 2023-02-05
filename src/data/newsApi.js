
export const getNewsItem = async (itemId) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`,
    {cache: "force-cache"}//we use the force-cache policy to remove that overhead, since the resource will most likely not change
  );
  const item = await response.json()
  return item;
}

export const getNewsList = async () => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json'); //no cache policy because resource may change
  const items = await response.json();
  return items;
}