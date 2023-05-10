import './App.css'
import { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Header } from './components/Header'
import UserProfile from './pages/UserProfile'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import { fetchLoginUser } from './redux/slices/auth'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchLoginUser())
	}, [dispatch])

	const mode = useSelector(state => state.mode.mode)
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<Header />
				<Container maxWidth='lg'>
					<Routes>
						<Route path='/home' element={<Home />} />
						<Route path='/userProfile/:userId' element={<UserProfile />} />
						<Route path='/' element={<Login />} />
						<Route path='/register' element={<Registration />} />
					</Routes>
				</Container>
			</div>
		</ThemeProvider>
	)
}

export default App
