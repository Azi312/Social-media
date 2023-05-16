import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import User from '../components/widgets/User'
import Friends from '../components/widgets/Friends'
import { Box, useMediaQuery } from '@mui/material'
import CreatePost from '../components/widgets/CreatePost'
import Posts from '../components/widgets/Posts'
import { RootState } from '../state/types'
import { Navbar } from '../components/Navbar'

interface UserTypes {
	_id: string
	fullName: string
	avatarUrl: string
	userId: string
	isProfile?: boolean
}

const UserProfile = () => {
	const [user, setUser] = useState<UserTypes>()
	const { userId } = useParams<string>()
	const token = useSelector((state: RootState) => state.token)
	const avatarUrl = useSelector((state: RootState) => state.user.avatarUrl)
	const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

	const getUser = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users/${userId}`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		const data = await response.json()
		setUser(data)
	}

	useEffect(() => {
		getUser()
	}, [])

	if (!user) return null

	return (
		<Box>
			<Navbar />
			<Box
				width='100%'
				padding='2rem 6%'
				display={isNonMobileScreens ? 'flex' : 'block'}
				gap='2rem'
				justifyContent='center'
			>
				<Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
					<User userId={userId} avatarUrl={user?.avatarUrl} />
					<Box m='2rem 0' />
					<Friends userId={userId} />
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? '42%' : undefined}
					mt={isNonMobileScreens ? undefined : '2rem'}
				>
					<CreatePost avatarUrl={avatarUrl} />
					<Box m='2rem 0' />
					<Posts userId={userId} isProfile />
				</Box>
			</Box>
		</Box>
	)
}

export default UserProfile
