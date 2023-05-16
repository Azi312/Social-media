import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, InputBase, Typography, useTheme } from '@mui/material'
import Friend from '../components/Friend'
import { setSearch, setUsers } from '../state'
import { RootState } from '../state/types'
import { Navbar } from '../components/Navbar'
import FlexBetween from '../components/FlexBetween'
import { Search } from '@mui/icons-material'

const Users = () => {
	const token = useSelector((state: RootState) => state.token)
	const users = useSelector((state: RootState) => state.users)
	const search = useSelector((state: RootState) => state.search)
	const dispatch = useDispatch()
	const theme = useTheme<any>()
	const neutralLight = theme.palette.neutral.light

	const getUsers = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users?search=${search}`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		const data = await response.json()
		dispatch(setUsers({ users: data }))
	}

	useEffect(() => {
		if (search.length > 0) {
			getUsers()
		}
	}, [search])

	return (
		<>
			<Navbar />
			<Box
				display='flex'
				flexDirection='column'
				gap='20px'
				sx={{ padding: 0, margin: '2% 6%' }}
			>
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
						placeholder='Search...'
					/>
					<IconButton>
						<Search />
					</IconButton>
				</FlexBetween>
				<Box
					display='flex'
					flexDirection='column'
					gap='1.5rem'
					padding='10px'
					sx={{
						backgroundColor: theme.palette.background.alt,
						borderRadius: '0.75rem',
					}}
				>
					{users.map(user => (
						<Friend
							key={user._id}
							friendId={user._id}
							fullName={user.fullName}
							avatarUrl={user.avatarUrl}
							city={user.city}
						/>
					))}
				</Box>
			</Box>
		</>
	)
}

export default Users
