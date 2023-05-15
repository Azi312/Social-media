import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Post from './Post'
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
	comments: any
	createdAt: string
}

interface PostsProps {
	userId: string | undefined
	friends?: any
	isProfile?: boolean
}

const Posts: FC<PostsProps> = ({ userId, friends, isProfile = false }) => {
	const dispatch = useDispatch()
	const posts = useSelector((state: RootState) => state.posts)
	const token = useSelector((state: RootState) => state.token)

	const userFriendsId = friends?.map((friend: Friend) => friend._id)

	const getPosts = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		})

		const posts = await response.json()

		dispatch(setPosts({ posts }))
	}

	const getUserPosts = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/posts/${userId}/posts`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		const posts = await response.json()

		dispatch(setPosts({ posts }))
	}

	useEffect(() => {
		if (isProfile) {
			getUserPosts()
		} else {
			getPosts()
		}
	}, [posts.length])

	return (
		<>
			{friends?.length > 0 && !isProfile
				? posts
						?.filter(post => userFriendsId.includes(post.user._id))
						.map(
							({
								_id,
								user,
								description,
								imageUrl,
								likes,
								comments,
								createdAt,
							}) => (
								<Post
									key={_id}
									postId={_id}
									user={user}
									description={description}
									imageUrl={imageUrl}
									likes={likes}
									comments={comments}
									createdAt={createdAt}
								/>
							)
						)
				: posts.map(
						({
							_id,
							user,
							description,
							imageUrl,
							likes,
							comments,
							createdAt,
						}) => (
							<Post
								key={_id}
								postId={_id}
								user={user}
								description={description}
								imageUrl={imageUrl}
								likes={likes}
								comments={comments}
								createdAt={createdAt}
							/>
						)
				  )}
		</>
	)
}

export default Posts
