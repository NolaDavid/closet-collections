import React, { ReactElement } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import { set } from 'js-cookie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Navbar = (): ReactElement => {
  const [sidebar, setSidebar] = React.useState(false);

  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('/isloggedin')
      .then(({ data }) => setLogin(data))
      .catch(err => console.warn(err));
  });

  const showSidebar = (): void => setSidebar(!sidebar);
  React.useEffect(() => {
    axios.get('/isloggedin')
      .then(({ data }) => setLogin(data))
      .catch(err => console.log('err', err));
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>

          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <header className="logo">

            <img src="https://i.ibb.co/9vTGQyw/Closet-Collection-Logo.png"
              alt="CC logo"
              height="60px" width="auto" />

          </header>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (

                <Link className='nav-text' key={index} to={item.link}>{item.icon}<span>{item.title}</span></Link>
              );
            })}
            {
              login === true ?
                <Link className='nav-text' to='/logout'><ExitToAppIcon style={{color: '#7ed957'}}/><span>{'Logout'}</span></Link> :
                <Link className='nav-text' to='/login'><ExitToAppIcon style={{color: '#7ed957' }}/><span>{'Login'}</span></Link>
            }
          </ul>

        </nav>



      </IconContext.Provider>

    </>
  );
};

export default Navbar;
