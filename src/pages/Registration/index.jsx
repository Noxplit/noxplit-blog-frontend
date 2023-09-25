import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { fetchCreateUser } from '../../components/redux/slices/auth';

export const Registration = () => {
  const [data,setData] = useState({fullName:'', email:'', password:'', avatarUrl:''})
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(fetchCreateUser(data))
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField value={data.fullName} onChange={e => setData({...data, fullName:e.target.value})} className={styles.field} label="Полное имя" fullWidth />
      <TextField value={data.email} onChange={e => setData({...data, email:e.target.value})} className={styles.field} label="E-Mail" fullWidth />
      <TextField value={data.password} onChange={e => setData({...data, password:e.target.value})} className={styles.field} label="Пароль" fullWidth />
      <TextField value={data.avatarUrl} onChange={e => setData({...data, avatarUrl:e.target.value})} className={styles.field} label="Изображение" fullWidth />
      <Button onClick={handleClick} size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
