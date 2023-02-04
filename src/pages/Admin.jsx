import useFetchNews from 'hooks/useFetchNews';
import React from 'react';
import CentralizedBox from 'layout/CentralizedBox';
import {useSelector} from 'react-redux';
import useFetchCSVNews from 'hooks/useFetchCSVNews';
import { ErrorView, LoadingView } from 'components/Auxiliary';

const Admin = () => {
  const {csvNewsItemsLoaded, apiNewsItemsLoaded} = useSelector((state) => state.news);
  const {loading:apiNewsLoading, error:apiError, progress, fetchNews} = useFetchNews();
  const {loading:csvNewsLoading, error:csvError, fetchCsvNews} = useFetchCSVNews();

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
        aria-label="load news"
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
        aria-label="load news"
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