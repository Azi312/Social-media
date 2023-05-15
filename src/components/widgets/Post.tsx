import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from '@mui/icons-material'
import { IconButton, Typography, useTheme } from '@mui/material'
import { setPost } from '../../state'
import { RootState } from '../../state/types'

import FlexBetween from '../FlexBetween'
import Friend from '../Friend'
import WidgetWrapper from '../WidgetWrapper'
import Comments from '../Comments'

interface PostProps {
	postId: string
	description: string
	imageUrl: string
	user: {
		_id: string
		fullName: string
		avatarUrl: string
		age: string
		city: string
		university: string
	}
	likes: number[]
	comments: any
	createdAt: string
}

const Post: FC<PostProps> = ({
	postId,
	description,
	imageUrl,
	user,
	likes,
	comments,
	createdAt,
}) => {
	const [commentOpen, setCommentOpen] = React.useState(false)

	const dispatch = useDispatch()
	const token = useSelector((state: RootState) => state.token)
	const loggedInUserId = useSelector((state: RootState | any) => state.user._id)
	const isLiked = Boolean(likes[loggedInUserId])
	const likeCount = Object.keys(likes).length

	const { palette } = useTheme<any>()
	const main = palette.neutral.main
	const primary = palette.primary.main

	const patchLike = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId: loggedInUserId }),
			}
		)
		const updatedPost = await response.json()
		dispatch(setPost({ post: updatedPost }))
	}

	return (
		<WidgetWrapper m='2rem 0'>
			<Friend
				postId={postId}
				fullName={user.fullName}
				avatarUrl={user.avatarUrl}
				city={user.city}
				friendId={user._id}
				createdAt={createdAt}
			/>
			<Typography color={main} sx={{ mt: '1rem' }}>
				{description}
			</Typography>

			<img
				width='100%'
				height='auto'
				alt='post'
				style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
				src={imageUrl}
			/>

			<FlexBetween mt='0.25rem'>
				<FlexBetween gap='1rem'>
					<FlexBetween gap='0.3rem'>
						<IconButton onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: primary }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>

					<FlexBetween gap='0.3rem'>
						<IconButton onClick={() => setCommentOpen(prev => !prev)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>

				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>

			{commentOpen && (
				<Comments
					comments={comments}
					avatarUrl={user.avatarUrl}
					postId={postId}
				/>
			)}
		</WidgetWrapper>
	)
}

export default Post
