import axios from 'axios';

export const getNewsItem = async (itemId) => {
  const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
  return item.data;
}

export const getNewsList = async () => {
  const items = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  return items.data;
}