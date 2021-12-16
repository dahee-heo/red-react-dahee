import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [ a, setA ] = useState(false);
  return (
    <header>
      <div className="logo">
        RED
      </div>
      <div>
        {/* <a href="./index.html" className="active" id="menu-a-home"><span className="material-icons-outlined">home</span></a> */}
        <NavLink to="home" activeClassName='active' id="menu-a-home"><span className="material-icons-outlined">home</span></NavLink>
      </div>
      <div>
        {/* <a href="./groceries.html" id="menu-a-groceries"><span className="material-icons-outlined">fact_check</span></a> */}
        <NavLink to="groceries" activeClassName='active' id="menu-a-groceries"><span className="material-icons-outlined">fact_check</span></NavLink>
      </div>
      <div className="menu-items">
        {/* <a href="./items.html" id="menu-a-items"><span className="material-icons">list</span></a> */}
        <NavLink to="items" activeClassName='active' id="menu-a-items"><span className="material-icons">list</span></NavLink>
        <div><span id="menu-items-counter">1</span></div>
      </div>
      <div className="empty"></div>
      <div>
        <a href="#!" id="menu-a-account" onClick={(event) => {event.preventDefault(); setA(!a)}}>
          <span className="material-icons-outlined">account_circle</span>
          <ul className={'account-menu' + (a ? ' active' : '')}>
            <li>Guest</li>
            <li>Login</li>
            <li>Hello 홍길동!</li>
            <li>Logout</li>
          </ul>
        </a>
      </div>
    </header>
  )
}

export default Header;
