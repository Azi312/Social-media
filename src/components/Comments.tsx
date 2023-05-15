import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	InputBase,
	Avatar,
	useTheme,
	IconButton,
	Typography,
	Divider,
	Box,
	ListItemText,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import WidgetWrapper from './WidgetWrapper'
import FlexBetween from './FlexBetween'
import { setPost } from '../state'
import { RootState } from '../state/types'
import moment from 'moment'

interface Comment {
	postId: string
	comments: any
	avatarUrl: string
}

const Comments: FC<Comment> = ({ postId, avatarUrl, comments }) => {
	const dispatch = useDispatch()
	const [text, setText] = React.useState<string>('')
	const user = useSelector((state: RootState) => state.user)
	const token = useSelector((state: RootState) => state.token)

	const { palette } = useTheme<any>()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						text,
						user: {
							id: user._id,
							fullName: user.fullName,
							avatarUrl: user.avatarUrl,
						},
					}),
				}
			)
			const post = await response.json()
			dispatch(setPost({ post }))

			setText('')
		} catch (error) {
			if (!user) {
				alert('You need to login first')
				return
			}
			console.log(error)
			alert('Something went wrong')
		}
	}

	return (
		<WidgetWrapper>
			<FlexBetween gap='1rem'>
				<Avatar
					alt='/broken-image.jpg'
					src={avatarUrl}
					sx={{ width: 40, height: 40 }}
				/>
				<InputBase
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Write a comment...'
					sx={{
						width: '100%',
						backgroundColor: palette?.neutral?.light,
						borderRadius: '0.5rem',
						padding: '0.3rem 1rem',
					}}
				/>
				<IconButton onClick={handleSubmit} color='primary' size='medium'>
					<SendIcon fontSize='large' />
				</IconButton>
			</FlexBetween>

			<Divider sx={{ margin: '1.25rem 0' }} />

			<Box
				display='flex'
				flexDirection='column'
				justifyContent='flex-start'
				gap='1rem'
			>
				{comments.map((comment: any) => (
					<FlexBetween key={comment.user.id} gap='1rem'>
						<Avatar alt='/broken-image.jpg' src={comment.user.avatarUrl} />
						<Box sx={{ width: '100%' }}>
							<Typography>{comment.user.fullName}</Typography>
							<ListItemText>{comment.text}</ListItemText>
						</Box>
						<Typography flex='0 0 15%'>
							{moment(comment.createdAt).fromNow()}
						</Typography>
					</FlexBetween>
				))}
			</Box>
		</WidgetWrapper>
	)
}

export default Comments
