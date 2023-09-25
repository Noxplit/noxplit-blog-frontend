import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../components/redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [data,setData] = useState({email: "", password: "",})
  const dispatch = useDispatch()
  const {isAuthUser} = useSelector(state => state.auth)
   useEffect(() => {},[])
   const handleSubmut = async() => {
    const user = await dispatch(fetchUserData(data))
if(!user.payload) {
  return alert('Не удалось авторизоваться')
}
console.log(user);
if('token' in user.payload) {
  window.localStorage.setItem('token', user.payload.token)
}

   }
   if(isAuthUser) {
    return <Navigate to='/'/>
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
      value={data.email}
        onChange={e => setData({...data, email:e.target.value })}
        className={styles.field}
        label="E-Mail"
        error
        helperText="Неверно указана почта"
        fullWidth
      />
      <TextField value={data.password} onChange={e => setData({...data, password:e.target.value })} className={styles.field} label="Пароль" fullWidth />
      <Button onClick={handleSubmut} size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </Paper>
  );
};
