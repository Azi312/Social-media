import './App.scss'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { Header } from './components/Header'
import UserProfile from './pages/UserProfile'
import Users from './pages/Users'
import { RootState } from './state/types'

function App() {
	const mode = useSelector((state: RootState) => state.mode)
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
	const isAuth = Boolean(useSelector((state: RootState) => state.token))
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<Header />
				<Container
					maxWidth='xl'
					sx={{
						maxWidth: '85%',
					}}
				>
					<Routes>
						<Route
							path='/home'
							element={isAuth ? <Home /> : <Navigate to='/' />}
						/>
						<Route
							path='/users'
							element={isAuth ? <Users /> : <Navigate to='/' />}
						/>
						<Route path='/profile/:userId' element={<UserProfile />} />
						<Route path='/' element={<Login />} />
						<Route path='/register' element={<Registration />} />
					</Routes>
				</Container>
			</div>
		</ThemeProvider>
	)
}

export default App
