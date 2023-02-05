import useFetchNews from 'hooks/useFetchNews';
import React from 'react';
import CentralizedBox from 'layout/CentralizedBox';
import {useSelector} from 'react-redux';
import useFetchCSVNews from 'hooks/useFetchCSVNews';
import { ErrorView, LoadingView } from 'components/Auxiliary';
import {useDispatch} from 'react-redux';
import {
  checkAPINewsFetchStatus,
  updateNewsIds,
  updateNewsItems,
  checkCSVNewsFetchStatus,
} from 'redux/slices/newsSlice';
import {toast} from 'react-hot-toast';

const Admin = () => {
  const {csvNewsItemsLoaded, apiNewsItemsLoaded} = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const {
    loading:apiNewsLoading,
    error:apiError, progress,
    fetchNews
  } = useFetchNews({
    onNewsItems: (items) => handleNewsItemsUpdate(items),
    onNewsIds: (ids) => handleNewsIdsUpdate(ids)
  });
  const {
    loading:csvNewsLoading,
    error:csvError,
    fetchCsvNews
  } = useFetchCSVNews({onData: (news) => handleCsvNewsUpdate(news)});

  const handleNewsItemsUpdate = (items) => {
    dispatch(updateNewsItems(items));
    dispatch(checkAPINewsFetchStatus());
    toast.success('All API news fetched!', {
      position: 'top-right'
    })
  }
  const handleNewsIdsUpdate = (ids) => {
    dispatch(updateNewsIds(ids));
  }
  const handleCsvNewsUpdate = (news) => {
    dispatch(updateNewsItems(news));
    dispatch(checkCSVNewsFetchStatus());
    toast.success('All CSV news parsed!', {
      position: 'top-right'
    })
  }

  return (
    <CentralizedBox>
      <div className="flex gap-6 justify-between items-center">
        <APIBox
          loaded={apiNewsItemsLoaded}
          loading={apiNewsLoading}
          fetch={fetchNews}
          error={apiError}
          progress={progress} />

        <CSVBox 
          loaded={csvNewsItemsLoaded}
          loading={csvNewsLoading}
          error={csvError}
          fetch={fetchCsvNews} />
      </div>
      
    </CentralizedBox>
  )
}

const CSVBox = ({loading, error, loaded, fetch, }) => {
  if(error){
    return <ErrorView retry={fetch} />
  }
  if(loading){
    return <p>Hold on...</p>
  }
  if(!loaded){
    return (
      <button
        className="bg-black grow-0 shrink-0 text-white px-4 py-2 rounded-xl" 
        onClick={e => fetch()}>
        Fetch from CSV
      </button>
    );
  }
  return (
    <p>Csv has been fetched</p>
  );
}

const APIBox = ({loading, error, progress, loaded, fetch}) => {
  if(error){
    return <ErrorView retry={fetch} />
  }
  if(loading){
    return <LoadingView progress={progress} />
  }
  if(!loaded){
    return (
      <button
        className="bg-black grow-0 shrink-0 text-white px-4 py-2 rounded-xl" 
        onClick={e => fetch()}>
        Fetch from API
      </button>
    )
  }
  return (
    <p>Api news has been fetched</p>
  )
}
export default Admin