import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchUserPosts } from '../redux/slices/posts'
import Post from './Post'
import { getUserFromLS } from '../utils/getUserFromLS'

const Posts = ({ userId, isProfile = false }) => {
	const posts = useSelector(state => state.posts.posts)
	const dispatch = useDispatch()

	useEffect(() => {
		// if (isProfile) {
		dispatch(fetchUserPosts({ userId }))
		// } else {
		// 	dispatch(fetchPosts())
		// }
	}, [dispatch])
	return (
		<>
			{posts.map(({ _id, user, description, imageUrl, likes }) => (
				<Post
					key={_id}
					postId={_id}
					user={user}
					description={description}
					imageUrl={imageUrl}
					likes={likes}
				/>
			))}
		</>
	)
}

export default Posts
