import {useCallback, useState} from 'react';
import {getNewsItem, getNewsList} from 'data/newsApi';
import {toast} from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {checkAPINewsFetchStatus, updateNewsIds, updateNewsItems} from 'redux/slices/newsSlice';


const useFetchNews = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

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
      dispatch(updateNewsIds([...ids]));
      const remoteNews = await batchFetchNewsItems(ids);
      const news = [...remoteNews];
      const sortedNews = news;
      dispatch(updateNewsItems(sortedNews));
      dispatch(checkAPINewsFetchStatus())
      setLoading(false);
      toast.success('All API news fetched!', {
        position: 'top-right'
      })
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [batchFetchNewsItems, dispatch]); 

  return {error, loading, fetchNews, progress}
}

export default useFetchNews;