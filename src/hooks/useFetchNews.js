import {useCallback, useState} from 'react';
import {getNewsItem, getNewsList} from 'data/newsApi';

const useFetchNews = ({onNewsItems, onNewsIds}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const batchFetchNewsItems = useCallback(async (ids) => {
    const totalItems = ids.length;
    const MAX_CONCURRENT_FETCHES = 10; //We limit it to 10 because that seems to be in the middle ground between responsiveness and speed
    const newsItems = [];
    const failedFetches = [];
    while(ids.length){
      const currentBatch = ids.splice(0, MAX_CONCURRENT_FETCHES);
      const results = await Promise.allSettled(currentBatch.map(id => getNewsItem(id)));
      results.forEach((result, index) => {
        if(result.status === "fulfilled"){
          newsItems.push(result.value);
          return;
        }
        failedFetches.push(currentBatch[index]);
      })
      const percentLoaded = Math.floor((newsItems.length / totalItems) * 100)
      setProgress(percentLoaded);      
    }
    return newsItems;
  }, []);
       
  const fetchNews = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);      
      const ids = await getNewsList();
      //clone the ids array before dispatching because passing the array directly makes it immutable making it impossible to splice it later
      onNewsIds([...ids])
      const news = await batchFetchNewsItems(ids);
      onNewsItems(news);      
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [batchFetchNewsItems, onNewsIds, onNewsItems]); 

  return {error, loading, fetchNews, progress}
}

export default useFetchNews;