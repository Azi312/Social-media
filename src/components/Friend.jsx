import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { getUserFromLS } from '../utils/getUserFromLS'
import { fetchAddFriend } from '../redux/slices/users'
import FlexBetween from './FlexBetween'

const Friend = ({ avatarUrl, fullName, city, friendId }) => {
	const userData = useSelector(state => state.auth.data.userData)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = getUserFromLS()

	const { palette } = useTheme()
	const primaryLight = palette.primary.light
	const primaryDark = palette.primary.dark
	const main = palette.neutral.main
	const medium = palette.neutral.medium

	const isFriend = userData.friends.find(friend => friend === friendId)

	const patchFriend = async () => {
		dispatch(fetchAddFriend({ userId: user.id, friendId }))
	}

	return (
		<FlexBetween>
			<FlexBetween gap='1rem'>
				<Avatar src={avatarUrl} />
				<Box
					onClick={() => {
						navigate(`/userProfile/${friendId}`)
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
			{user.id !== friendId && (
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
