import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Post from '../Post'
import { RootState } from '../../state/types'
import Friend from '../Friend'

interface Post {
	_id: string
	user: {
		_id: string
		fullName: string
		avatarUrl: string
		age: string
		city: string
		university: string
	}
	description: string
	imageUrl: string
	likes: number[]
}

interface PostsProps {
	userId: string | undefined
	friends?: any
	isProfile?: boolean
}

const Posts: FC<PostsProps> = ({ userId, friends, isProfile }) => {
	const dispatch = useDispatch()
	const posts = useSelector((state: RootState) => state.posts)
	const token = useSelector((state: RootState) => state.token)
	// const [isProfile, setIsProfile] = useState(false)

	const userFriendsId = friends.map((friend: Friend) => friend._id)

	const getPosts = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		})

		const data = await response.json()

		dispatch(setPosts({ posts: data }))
	}
	const getUserPosts = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/posts/${userId}/posts`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		const data = await response.json()
		console.log(data)

		dispatch(setPosts({ posts: data }))
	}

	useEffect(() => {
		if (isProfile) {
			getUserPosts()
		} else {
			getPosts()
		}
	}, [])

	return (
		<>
			{friends.length > 0
				? posts
						?.filter(post => userFriendsId.includes(post.user._id))
						.map(({ _id, user, description, imageUrl, likes }) => (
							<Post
								key={_id}
								postId={_id}
								user={user}
								description={description}
								imageUrl={imageUrl}
								likes={likes}
							/>
						))
				: posts?.map(({ _id, user, description, imageUrl, likes }) => (
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
