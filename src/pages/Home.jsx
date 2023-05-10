import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'

import MyPost from '../components/MyPost'
import Post from '../components/Post'
import Friends from '../components/Friends'
import { fetchPosts, fetchUserPosts } from '../redux/slices/posts'
import { getUserFromLS } from '../utils/getUserFromLS'
import Posts from '../components/Posts'

export const Home = () => {
	const posts = useSelector(state => state.posts.posts)
	const userData = useSelector(state => state.auth.data)
	const user = getUserFromLS()
	const dispatch = useDispatch()

	// React.useEffect(() => {
	// 	dispatch(fetchUserPosts())
	// }, [dispatch])

	return (
		<>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					<MyPost />
					<Posts userId={user.id} />
					{/* {posts.map(post => (
						<Post key={post._id} {...post} />
					))} */}
				</Grid>
				<Grid xs={4} item>
					<Friends userId={user.id} />
				</Grid>
			</Grid>
		</>
	)
}
