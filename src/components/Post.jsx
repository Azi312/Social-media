import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from '@mui/icons-material'
import { IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from './FlexBetween'

import Friend from './Friend'
import WidgetWrapper from './WidgetWrapper'
import { fetchLikePost, fetchUserPosts, setPosts } from '../redux/slices/posts'

const Post = ({ postId, description, imageUrl, user, likes }) => {
	const userData = useSelector(state => state.auth.data.userData)
	const dispatch = useDispatch()
	const userId = userData._id

	console.log('Likes:', likes, 'User ID:', userId)
	const isLiked = likes && Boolean(likes[userId])
	const likeCount = Object.keys(likes).length

	// console.log('Current user ID:', userId)
	// console.log('Is liked:', isLiked)
	// console.log(Object.keys(likes) == userId)

	const { palette } = useTheme()
	const main = palette.neutral.main
	const primary = palette.primary.main

	const patchLike = async () => {
		const userId = JSON.stringify(userData._id)
		dispatch(fetchLikePost({ postId, userId }))
		dispatch(fetchUserPosts({ userId: user._id }))
	}

	return (
		<WidgetWrapper m='2rem 0'>
			<Friend {...user} friendId={user._id} />
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
						<IconButton>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>5</Typography>
					</FlexBetween>
				</FlexBetween>

				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>
		</WidgetWrapper>
	)
}

export default Post
