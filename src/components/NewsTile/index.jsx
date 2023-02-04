import React from 'react'
import {Link, useLocation} from 'react-router-dom';

const NewsTile = ({title, id}) => {
  const location = useLocation();
  return (
    <article className='w-[400px] grow-0 shrink-0'>
      <Link
        to={`/article/${id}`}
        state={{ background: location }}
        className="underline">
        {title}
      </Link>
    </article>
  )
}

export default NewsTile;