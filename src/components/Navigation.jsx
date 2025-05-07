import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { BiHomeAlt, BiLogOut,  BiBarChartAlt2 } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (!authUser) return null;

  return (
    <nav className='navigation'>
      <div>
        <Link to='/home'>
          <BiHomeAlt />
          <p className='nav-caption'>HOME</p>
        </Link>
      </div>
      <div>
        <Link to='/leaderboard'>
          <BiBarChartAlt2 />
          <p className='nav-caption'>LEADERBOARD</p>
        </Link>
      </div>
      <div>
        <button onClick={onLogOut} className='logout-button'>
          <BiLogOut />
          <p className='nav-caption'>LOGOUT</p>
        </button>
      </div>
    </nav>
  );
}

export { Navigation };