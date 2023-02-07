import NewsTile from 'components/NewsTile'
import React from 'react'
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import CentralizedBox from 'layout/CentralizedBox';
import {FixedSizeList as List} from 'react-window';
import useWindowHeight from 'hooks/useWindowHeight';

const Main = () => {
  const {newsItems} = useSelector((state) => state.news);
  const {height} = useWindowHeight();
  const HEADER_HEIGHT = 50;

  if(!newsItems){
    return <EmptyNewsItems />
  }
  return (
    <CentralizedBox>
        <List
          height={height - HEADER_HEIGHT}
          itemCount={newsItems.length}
          itemSize={60}
          width={400}
          itemData={newsItems}>
          {ListItem}
        </List>           
    </CentralizedBox>
  );
}


const ListItem = ({ index, style, data }) => {
  const item = data[index];  
  if(!item){
    console.log('no item')
    return <></>
  }
  const {title, id, url} = item;
  return (
    <div style={style}>
      <NewsTile title={title} id={id} source={url} />
    </div>
  )
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