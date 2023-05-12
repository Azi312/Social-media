import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, useTheme } from '@mui/material'
import Friend from '../components/Friend'
import WidgetWrapper from '../components/WidgetWrapper'
import { setUsers } from '../state'
import { RootState } from '../state/types'

const Users = () => {
	const token = useSelector((state: RootState) => state.token)
	const users = useSelector((state: RootState) => state.users)
	const search = useSelector((state: RootState) => state.search)
	const dispatch = useDispatch()
	const { palette } = useTheme<any>()

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
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				variant='h5'
				fontWeight='500'
				sx={{ mb: '1.5rem' }}
			>
				Friend List
			</Typography>
			<Box display='flex' flexDirection='column' gap='1.5rem'>
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
		</WidgetWrapper>
	)
}

export default Users
