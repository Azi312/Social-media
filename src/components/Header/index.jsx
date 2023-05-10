import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	Box,
	IconButton,
	InputBase,
	Typography,
	Select,
	MenuItem,
	FormControl,
	useTheme,
	Container,
} from '@mui/material'
import {
	Search,
	Message,
	DarkMode,
	LightMode,
	Notifications,
	Help,
} from '@mui/icons-material'
import { setMode } from '../../redux/slices/mode'
import FlexBetween from '../FlexBetween'
import { logout } from '../../redux/slices/auth'
import { getUserFromLS } from '../../utils/getUserFromLS'

export const Header = () => {
	const userData = useSelector(state => state.auth.data)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = getUserFromLS()

	const onClickLogout = () => {
		if (window.confirm('Have you really want to logout?')) {
			dispatch(logout())
			navigate('/')
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('user')
		}
	}

	const theme = useTheme()
	const neutralLight = theme.palette.neutral.light
	const dark = theme.palette.neutral.dark
	const background = theme.palette.background.default
	const primaryLight = theme.palette.primary.light
	const alt = theme.palette.background.alt
	return (
		<Box backgroundColor={alt}>
			<Container maxWidth='lg'>
				<FlexBetween padding='1rem 0'>
					<FlexBetween gap='1.75rem'>
						<Typography
							fontWeight='bold'
							fontSize='clamp(1rem, 2rem, 2.25rem)'
							color='primary'
							onClick={() => navigate('/home')}
							sx={{
								'&:hover': {
									color: primaryLight,
									cursor: 'pointer',
								},
							}}
						>
							MoodSpace
						</Typography>

						<FlexBetween
							backgroundColor={neutralLight}
							borderRadius='9px'
							gap='3rem'
							padding='0.1rem 1.5rem'
						>
							<InputBase placeholder='Search...' />
							<IconButton>
								<Search />
							</IconButton>
						</FlexBetween>
					</FlexBetween>
					<FlexBetween gap='2rem'>
						<IconButton onClick={() => dispatch(setMode())}>
							{theme.palette.mode === 'dark' ? (
								<DarkMode sx={{ fontSize: '25px' }} />
							) : (
								<LightMode sx={{ color: dark, fontSize: '25px' }} />
							)}
						</IconButton>
						<Message sx={{ fontSize: '25px' }} />
						<Notifications sx={{ fontSize: '25px' }} />
						<Help sx={{ fontSize: '25px' }} />
						<FormControl variant='standard' value={user.fullName}>
							<Select
								value={user.fullName}
								sx={{
									backgroundColor: neutralLight,
									width: '150px',
									borderRadius: '0.25rem',
									p: '0.25rem 1rem',
									'& .MuiSvgIcon-root': {
										pr: '0.25rem',
										width: '3rem',
									},
									'& .MuiSelect-select:focus': {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={user.fullName}>
									<Typography>{user.fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={onClickLogout}>Log Out</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</FlexBetween>
			</Container>
		</Box>
	)
}
