import React from 'react'
import {Link} from 'react-router-dom';

const NewsTile = ({title, id}) => {
  return (
    <article className='w-[400px] grow-0 shrink-0'>
      <Link
        to={`/article/${id}`}
        className="underline">
        {title}
      </Link>
    </article>
  )
}

export default NewsTile;