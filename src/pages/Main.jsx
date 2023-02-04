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
        Nothing has been loaded. Head on over to the &nbsp;
        <Link
          to="/admin"
          className="underline">
          admin
        </Link> 
        &nbsp; page and load some news
      </p>
    </CentralizedBox>
  )
}

export default Main