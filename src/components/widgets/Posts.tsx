import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Post from '../Post'

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
	likes: string[]
}

interface Props {
	userId: string | undefined
}

const Posts: FC<Props> = ({ userId }) => {
	const dispatch = useDispatch()
	const posts = useSelector((state: any) => state.posts)
	const token = useSelector((state: any) => state.token)

	// const getPosts = async () => {
	// 	const response = await fetch('http://localhost:4444/posts', {
	// 		method: 'GET',
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	})
	// 	const data = await response.json()
	// 	dispatch(setPosts({ posts: data }))
	// }

	const getUserPosts = async () => {
		const response = await fetch(
			`http://localhost:4444/posts/${userId}/posts`,
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
			{posts?.map(({ _id, user, description, imageUrl, likes }: Post) => (
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
