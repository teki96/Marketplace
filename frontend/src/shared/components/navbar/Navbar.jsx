import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

function Navbar(props) {
  const auth = useContext(AuthContext);

  const menuItems = (
    <>
      <li>
        {' '}
        <NavLink to="/" exact>Home</NavLink>
        {' '}
      </li>
      <li>
        {' '}
        <NavLink to="/create">Add new item</NavLink>
      </li>
      <li><NavLink to="/items">View my items</NavLink></li>
      <li><a onClick={props.logout}>Logout</a></li>
    </>
  );

  return (
    <div className="navbar sticky opacity-100 z-50 top-0 bg-base-100">
      <div className="flex-1">
        <div className="btn btn-ghost normal-case text-xl"><NavLink to="/" exact>Marketplace</NavLink></div>
      </div>
      <div className="flex-none">
        {auth.isLoggedIn && (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" />
            </div>
          </label>

          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
