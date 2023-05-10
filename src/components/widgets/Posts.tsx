import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Post from '../Post'
import { RootState } from '../../state/types'

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
}

const Posts: FC<PostsProps> = ({ userId }) => {
	const dispatch = useDispatch()
	const posts = useSelector((state: RootState) => state.posts)
	const token = useSelector((state: RootState) => state.token)

	const getUserPosts = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/posts/${userId}/posts`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		const data = await response.json()
		dispatch(setPosts({ posts: data }))
	}

	useEffect(() => {
		getUserPosts()
	}, [])

	return (
		<>
			{posts?.map(({ _id, user, description, imageUrl, likes }) => (
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
