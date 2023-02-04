import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
import CentralizedBox from 'layout/CentralizedBox';
export const EmptyNewsView = ({onApiClick, onCSVClick}) => {
  return (
    <CentralizedBox>
      <p className='text-2xl text-gray-600'>No news here yet</p>
      <div className="flex gap-4">
        <button
          className="bg-black text-white px-4 py-2 rounded-xl" 
          aria-label="load news"
          onClick={e => onApiClick()}>
          Fetch from API
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded-xl" 
          aria-label="load news"
          onClick={e => onCSVClick()}>
          Load CSV
        </button>

      </div>
    </CentralizedBox>
  );
}
  
export const ErrorView = ({retry}) => {
  return (
    <CentralizedBox>
      <div className="text-3xl">Whoops...something went wrong there.</div>
      <button
        className="bg-black text-white px-4 py-2 rounded-xl"
        onClick={e => retry()}>
        Try again
      </button>
    </CentralizedBox>
  );
}
  
export const LoadingView = ({progress}) => {
  return (
    <CentralizedBox>    
      <div>Hold on...</div>
      <CircularProgressWithLabel value={progress} />
    </CentralizedBox>
  );
}


