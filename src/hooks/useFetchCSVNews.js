import {useCallback, useState} from 'react';
import {toast} from 'react-hot-toast';
import {parseNews} from 'data/newsCSVParser';

const useFetchCSVNews = ({onData}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCsvNews = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const news = await parseNews();
      onData(news)
      setLoading(false);
      toast.success('All CSV news parsed!', {
        position: 'top-right'
      })
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [onData])

  return {error, loading, fetchCsvNews}

}

export default useFetchCSVNews;