import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import User from '../components/User'
import Friends from '../components/Friends'
import { Box } from '@mui/material'
import MyPost from '../components/MyPost'
import Post from '../components/Post'
import axios from '../axios'
import Posts from '../components/Posts'
import { fetchUser } from '../redux/slices/users'
import { getUserFromLS } from '../utils/getUserFromLS'

const UserProfile = () => {
	const user = useSelector(state => state.users.userInfo)
	const dispatch = useDispatch()
	const { userId } = useParams()
	const userLs = getUserFromLS()

	useEffect(() => {
		dispatch(fetchUser({ userId }))
	}, [])

	return (
		<Grid container spacing={4}>
			<Grid xs={4} item>
				<User {...user} />
				<Box m='2rem 0' />
				<Friends userId={userId} />
			</Grid>
			<Grid xs={8} item>
				{userId === userLs.id ? <MyPost /> : <h1>{user.fullName}'s posts</h1>}
				{/* <MyPost /> */}
				<Posts userId={userId} isProfile />
			</Grid>
		</Grid>
	)
}

export default UserProfile
