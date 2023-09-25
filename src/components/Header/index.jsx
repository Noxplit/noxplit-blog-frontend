import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAuthUser } from '../redux/slices/auth';

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
          <Link className={styles.logo} to="/">
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'5px'}}>
                <div>{data.fullName}</div>
                <img style={{border:'1px solid black', borderRadius:'100%', height:'20px', width:'20px'}} src={data.avatarUrl} alt='Not found'/>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
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
