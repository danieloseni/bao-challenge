import React from 'react'
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav
      data-testid="header"
      className="py-4 flex items-center justify-between absolute w-full overflow-hidden px-6 h-[50px] bg-primary">
      Logo here

      <ul className="flex items-center gap-4">        
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin">
            Admin
          </Link>
        </li>
      </ul>           
    </nav>
  );
}

export default Header