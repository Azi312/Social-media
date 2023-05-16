import React, { useState } from 'react'
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
	useMediaQuery,
} from '@mui/material'
import {
	Search,
	Message,
	DarkMode,
	LightMode,
	Notifications,
	Help,
	Close,
	Menu,
} from '@mui/icons-material'
import { setMode, setLogout, setSearch } from '../state'
import FlexBetween from './FlexBetween'

interface RootState {
	user: {
		fullName?: string
	}
	search: string
}

export const Navbar: React.FC = () => {
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
	const fullName = useSelector((state: RootState) => state?.user?.fullName)
	const search = useSelector((state: RootState) => state.search)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

	const onClickLogout = () => {
		if (window.confirm('Have you really want to logout?')) {
			dispatch(setLogout())
			navigate('/')
		}
	}

	const theme = useTheme<any>()
	const neutralLight = theme.palette.neutral.light
	const dark = theme.palette.neutral.dark
	const background = theme.palette.background.default
	const primaryLight = theme.palette.primary.light
	const alt = theme.palette.background.alt

	return (
		<FlexBetween padding='1rem 6%' sx={{ backgroundColor: alt }}>
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

				{isNonMobileScreens ? (
					<FlexBetween
						sx={{
							backgroundColor: neutralLight,
						}}
						borderRadius='9px'
						gap='3rem'
						padding='0.1rem 1.5rem'
					>
						<InputBase
							value={search}
							onChange={e => dispatch(setSearch(e.target.value))}
							onFocus={() => navigate(`/users`)}
							placeholder='Search...'
						/>
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				) : (
					<IconButton onClick={() => navigate(`/users`)}>
						<Search />
					</IconButton>
				)}
			</FlexBetween>

			{/* DESKTOP NAV */}
			{isMobileMenuToggled ? (
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
					<FormControl>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: '160px',
								borderRadius: '0.25rem',
								p: '0.25rem 1rem',
								'& .MuiSvgIcon-root': {
									width: '3rem',
								},
								'& .MuiSelect-select:focus': {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={onClickLogout}>Log Out</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton
					onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
				>
					<Menu />
				</IconButton>
			)}

			{/* MOBILE NAV */}
			{!isNonMobileScreens && isMobileMenuToggled && (
				<Box
					sx={{
						position: 'fixed',
						left: '0',
						bottom: '0',
						height: '100%',
						maxWidth: '500px',
						minWidth: '300px',
						backgroundColor: background,
						zIndex: '10',
						transform: 'translateX(0)',
						transition: 'transform 0.3s ease-in-out',
					}}
				>
					{/* CLOSE ICON */}
					<Box display='flex' justifyContent='flex-end' p='1rem'>
						<IconButton
							onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
						>
							<Close />
						</IconButton>
					</Box>

					{/* MENU ITEMS */}
					<FlexBetween
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						gap='3rem'
					>
						<IconButton
							onClick={() => dispatch(setMode())}
							sx={{ fontSize: '25px' }}
						>
							{theme.palette.mode === 'dark' ? (
								<DarkMode sx={{ fontSize: '25px' }} />
							) : (
								<LightMode sx={{ color: dark, fontSize: '25px' }} />
							)}
						</IconButton>
						<Message sx={{ fontSize: '25px' }} />
						<Notifications sx={{ fontSize: '25px' }} />
						<Help sx={{ fontSize: '25px' }} />
						<FormControl>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: '150px',
									borderRadius: '0.25rem',
									p: '0.25rem 1rem',
									'& .MuiSvgIcon-root': {
										width: '3rem',
									},
									'& .MuiSelect-select:focus': {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => dispatch(setLogout())}>
									Log Out
								</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	)
}
