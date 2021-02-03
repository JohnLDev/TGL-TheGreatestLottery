import React from 'react'
import { StyledHeader } from './styles'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/ducks/auth/auth'

const Header = ({ isDash = false }) => {
  const dispatch = useDispatch()
  return (
    <StyledHeader>
      <section>
        <div className='logo'>
          <h1>TGL</h1>
          <div className='line'></div>
        </div>
        {!isDash && <Link to='/dashboard'>Home</Link>}
      </section>
      <div className='options'>
        <Link to='/account'> Account</Link>
        <Link to='/' onClick={() => dispatch(logout())}>
          Log out <FiArrowRight size={20} color={'#707070'} />
        </Link>
      </div>
    </StyledHeader>
  )
}
export default Header
