import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header(props) {
  const { loginStore } = props;
  const [ a, setA ] = useState(false);
  useEffect(() => {
    loginStore.onAuthStateChanged();
  }, [loginStore]);
  return (
    <header>
      <div className="logo">
        RED
      </div>
      <div>
        {/* <a href="./index.html" className="active" id="menu-a-home"><span className="material-icons-outlined">home</span></a> */}
        <NavLink to="home" activeClassName='active' id="menu-a-home"><span className="material-icons-outlined">home</span></NavLink>
      </div>
      {loginStore.user.uid ? 
        <>
          <div>
            {/* <a href="./groceries.html" id="menu-a-groceries"><span className="material-icons-outlined">fact_check</span></a> */}
            <NavLink to="groceries" activeClassName='active' id="menu-a-groceries"><span className="material-icons-outlined">fact_check</span></NavLink>
          </div>
          <div className="menu-items">
            {/* <a href="./items.html" id="menu-a-items"><span className="material-icons">list</span></a> */}
            <NavLink to="items" activeClassName='active' id="menu-a-items"><span className="material-icons">list</span></NavLink>
            <div><span id="menu-items-counter">1</span></div>
          </div>
        </> : <></>
      }
      <div className="empty"></div>
      <div>
        <a href="#!" id="menu-a-account" onClick={(event) => {event.preventDefault(); setA(!a)}}>
          <span className="material-icons-outlined">account_circle</span>
          <ul className={'account-menu' + (a ? ' active' : '')}>
            {loginStore.user.uid ? 
            <>
              <li>Hello {loginStore.user.displayName || '게스트'}!</li>
              <li onClick={() => loginStore.googleLogout()}>Logout</li>
            </> :
            <>
              <li onClick={() => loginStore.emailSignin()}>Guest</li>
              <li onClick={() => loginStore.googleLogin()}>Login</li>
            </>}
          </ul>
        </a>
      </div>
    </header>
  )
}

export default inject('loginStore')(observer(Header));
