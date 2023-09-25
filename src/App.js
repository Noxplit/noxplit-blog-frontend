import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, FullPost, Registration, AddPost, Login } from './pages'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAuthMe } from './components/redux/slices/auth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
dispatch(fetchAuthMe())
  },[])
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Routes>
					<Route element={<Home />} path='/' />
          <Route element={<Home/>} path={'/tags/:id'}/>
					<Route element={<FullPost />} path='/posts/:id' />
					<Route element={<AddPost />} path='/posts/:id/edit' />
					<Route element={<AddPost />} path='/add-post' />
					<Route element={<Login />} path='/login' />
					<Route element={<Registration />} path='/registration' />
				</Routes>
			</Container>
		</>
	)
}

export default App
