import {useCallback, useState} from 'react';
import {toast} from 'react-hot-toast';
import {parseNews} from 'data/newsCSVParser';
import {useDispatch} from 'react-redux';
import {checkCSVNewsFetchStatus, updateNewsItems} from 'redux/slices/newsSlice';


const useFetchCSVNews = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchCsvNews = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const news = await parseNews();
      dispatch(updateNewsItems(news))  
      dispatch(checkCSVNewsFetchStatus())  
      setLoading(false);
      toast.success('All CSV news parsed!', {
        position: 'top-right'
      })
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [dispatch])

  return {error, loading, fetchCsvNews}

}

export default useFetchCSVNews;