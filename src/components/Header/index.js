import {useContext} from 'react'
import {HeaderContainer} from './headerElements' 
import {AuthContext} from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import './style.css';

import { Link} from 'react-router-dom'
import {FiHome,FiSettings} from 'react-icons/fi'
import {FaDog} from 'react-icons/fa'
import{CgLogOut} from 'react-icons/cg'


export default function Header (){
    const { user,signOut } = useContext(AuthContext)

    return(
        <HeaderContainer>
            <div className="sidebar">
            <div className="img">
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto avatar"/>
            </div>

            <Link to="/dashboard">
                <FiHome color="FFF" size={24}/>
                Chamados
            </Link>

            <Link to="/customers">
                <FaDog color="FFF" size={24}/>
                Clientes
            </Link>

            <Link to="/profile">
                <FiSettings color="FFF" size={24}/>
                Configurações
            </Link>

            <Link onClick={ () => signOut() }>
                <CgLogOut color="FFF" size={24} />
                Logout
            </Link>
            </div>
        </HeaderContainer>
    )
}