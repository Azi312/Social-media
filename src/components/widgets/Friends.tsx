import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, useTheme } from '@mui/material'
import WidgetWrapper from '../WidgetWrapper'
import { setFriends } from '../../state'
import { RootState } from '../../state/types'
import Friend from '../Friend'

interface FriendType {
	_id: string
	fullName: string
	avatarUrl: string
	city: string
}

interface FriendsProps {
	userId: string | undefined
}

const Friends: FC<FriendsProps> = ({ userId }) => {
	const token = useSelector((state: RootState) => state.token)
	const friends = useSelector((state: RootState) => state.user.friends)
	const ownerId = useSelector((state: RootState) => state.user._id)
	const dispatch = useDispatch()
	const { palette } = useTheme<any>()

	const getFriends = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users/${userId}/friends`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		const data = await response.json()
		dispatch(setFriends({ friends: data }))
	}

	useEffect(() => {
		getFriends()
	}, [])

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
				{friends.map(friend => (
					<Friend
						key={friend._id}
						friendId={friend._id}
						fullName={friend.fullName}
						avatarUrl={friend.avatarUrl}
						city={friend.city}
					/>
				))}
			</Box>
		</WidgetWrapper>
	)
}

export default Friends
