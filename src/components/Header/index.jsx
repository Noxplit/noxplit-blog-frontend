import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAuthUser } from '../redux/slices/auth';
import { Box } from '@mui/material';

export const Header = () => {
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.auth)
  const isAuth = Boolean(data)
  useEffect(() => {
    dispatch(setAuthUser(isAuth))
  },[isAuth])


  const onClickLogout = () => {
    if(window.confirm('Вы действительно хотите выйти из аккаунта?'))
    dispatch(logout())
    window.localStorage.removeItem('token')
  };


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Box className={styles.logo}  >
          <Link style={{color:'inherit', textDecoration:'none'}}  to="/">
            <div>NOXPLIT BLOG</div>
          </Link>
          </Box>
          {/* <Box className={styles.logo} sx={{visibility:['visible', 'visible','hidden']}} >
          <Link style={{color:'inherit', textDecoration:'none'}}  to="/">
            <ImportContactsIcon/>
          </Link>
          </Box> */}
          <div className={styles.buttons}>
            {isAuth ? (
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'2px'}}>
                <Box sx={{visibility:['hidden','hidden','visible'], display:'flex', justifyItems:'center', alignItems:'center', gap:2}}>
                <div>{data.fullName}</div>
                <img style={{border:'1px solid black', borderRadius:'100%', height:'20px', width:'20px'}} src={data.avatarUrl} alt='Not found'/>
                </Box>
                <Box >
                <Link to="/add-post">
                  <Button  variant="contained">Написать статью</Button>
                </Link>
                </Box>
                {/* <Box color='inherit' sx={{visibility:['visible', 'visible','hidden']}} ><Link to="/add-post"><MailOutlineIcon/></Link></Box> */}

                <Box >
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
                </Box>
                {/* <Box sx={{visibility:['visible', 'visible','hidden']}}>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  <ExitToAppIcon/>
                </Button>
                </Box> */}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
