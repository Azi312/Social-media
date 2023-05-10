import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import { Box, Typography, useTheme } from '@mui/material'
import Friend from './Friend'
import WidgetWrapper from './WidgetWrapper'
import { getUserFromLS } from '../utils/getUserFromLS'
import { fetchUserFriends, setAddFriend } from '../redux/slices/users'

const Friends = ({ userId }) => {
	const friends = useSelector(state => state.users.user)
	const dispatch = useDispatch()
	const { palette } = useTheme()
	const user = getUserFromLS()

	// const friends = user.friends
	// const friends = userData

	const getFriends = async () => {
		dispatch(fetchUserFriends({ userId }))
	}

	React.useEffect(() => {
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
