import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { setFriends } from '../state'
import FlexBetween from './FlexBetween'
import { RootState } from '../state/types'

interface Friend {
	_id: string
	fullName: string
	avatarUrl: string
	city: string
}

interface FriendProps {
	avatarUrl: string
	fullName: string
	city: string
	friendId: string
}

const Friend: FC<FriendProps> = ({ avatarUrl, fullName, city, friendId }) => {
	const userId = useSelector((state: RootState) => state.user._id)
	const token = useSelector((state: RootState) => state.token)
	const friends = useSelector((state: RootState) => state.user.friends)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { palette } = useTheme<any>()
	const primaryLight = palette.primary.light
	const primaryDark = palette.primary.dark
	const main = palette.neutral.main
	const medium = palette.neutral.medium

	const isFriend = friends.find((friend: Friend) => friend._id === friendId)

	const patchFriend = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users/${userId}/${friendId}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		)
		const data = await response.json()
		dispatch(setFriends({ friends: data }))
	}

	return (
		<FlexBetween>
			<FlexBetween gap='1rem'>
				<Avatar src={avatarUrl} />
				<Box
					onClick={() => {
						navigate(`/profile/${friendId}`)
						navigate(0)
					}}
				>
					<Typography
						color={main}
						variant='h5'
						fontWeight='500'
						sx={{
							'&:hover': {
								color: palette.primary.light,
								cursor: 'pointer',
							},
						}}
					>
						{fullName}
					</Typography>
					<Typography color={medium} fontSize='0.75rem'>
						{city}
					</Typography>
				</Box>
			</FlexBetween>
			{userId !== friendId && (
				<IconButton
					onClick={patchFriend}
					sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
				>
					{isFriend ? (
						<PersonRemoveOutlined sx={{ color: primaryDark }} />
					) : (
						<PersonAddOutlined sx={{ color: primaryDark }} />
					)}
				</IconButton>
			)}
		</FlexBetween>
	)
}

export default Friend
