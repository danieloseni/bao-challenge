import NewsTile from 'components/NewsTile'
import React from 'react'
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import CentralizedBox from 'layout/CentralizedBox';

const Main = () => {
  const {newsItems} = useSelector((state) => state.news);
  if(!newsItems){
    return <EmptyNewsItems />
  }
  return (
    <ol className="px-12 py-6 flex gap-8 flex-wrap">
      {
        newsItems?.map(({title, url, id}) => (
          <NewsTile key={id} title={title} id={id} source={url} />
        ))
      }     
    </ol>
  );
}

const EmptyNewsItems = () => {
  return (
    <CentralizedBox>
      <p>
        Nothing has been loaded. Head on over to the admin page and load some news
      </p>

      <Link
          to="/admin"
          className="px-6 py-2 bg-black text-white rounded-full">
          Go to Admin
        </Link> 
    </CentralizedBox>
  )
}

export default Main