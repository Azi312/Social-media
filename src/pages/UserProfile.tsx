import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import User from '../components/widgets/User'
import Friends from '../components/widgets/Friends'
import { Box } from '@mui/material'
import CreatePost from '../components/widgets/CreatePost'
import Posts from '../components/widgets/Posts'
import { RootState } from '../state/types'

interface UserTypes {
	_id: string
	fullName: string
	avatarUrl: string
	userId: string
	isProfile?: boolean
}

const UserProfile = () => {
	const [user, setUser] = useState<UserTypes>()
	const { userId } = useParams<any>()
	const token = useSelector((state: RootState) => state.token)
	const userLs = useSelector((state: RootState) => state.user)

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
		<Grid container spacing={4}>
			<Grid xs={4} item>
				<User userId={userId} avatarUrl={user?.avatarUrl} />
				<Box m='2rem 0' />
				<Friends userId={userId} />
			</Grid>
			<Grid xs={8} item>
				{userId === userLs._id ? (
					<CreatePost avatarUrl={user?.avatarUrl} />
				) : (
					<h1>{user?.fullName}'s posts</h1>
				)}
				<Posts userId={userId} isProfile />
			</Grid>
		</Grid>
	)
}

export default UserProfile
