import React, { ChangeEvent, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
} from '@mui/icons-material'
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	Avatar,
} from '@mui/material'

import FlexBetween from '../FlexBetween'
import WidgetWrapper from '../WidgetWrapper'
import { setPosts } from '../../state'

interface FormFields {
	description: string
	imageUrl: string
}

interface MyPostProps {
	avatarUrl?: string
}

const MyPost: React.FC<MyPostProps> = ({ avatarUrl }) => {
	const dispatch = useDispatch()

	const [isImage, setIsImage] = React.useState(false)
	const [description, setDescription] = React.useState('')
	const [imageUrl, setImageUrl] = React.useState('')

	const inputFileRef = React.useRef(null as any)

	const { palette } = useTheme<any>()
	const token = useSelector((state: any) => state.token)
	const mediumMain = palette.neutral.mediumMain
	const medium = palette.neutral.medium

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event.target.files?.[0]
			if (!file) {
				return
			}

			const formData = new FormData()
			formData.append('image', file)
			const response = await fetch('/upload', {
				method: 'POST',
				body: formData,
			})
			const data = await response.json()
			setImageUrl(data.url)
		} catch (error) {
			console.warn(error)
			alert('Error while uploading image. Try again later.')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onSubmit = async (event: any) => {
		event.preventDefault()
		try {
			const fields = {
				description,
				imageUrl,
			}
			console.log(token)
			const response = await fetch('http://localhost:4444/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(fields),
			})
			const posts = await response.json()

			dispatch(setPosts({ posts }))
			setIsImage(false)
			setDescription('')
			setImageUrl('')
		} catch (error) {
			console.warn(error)
			alert('Error while creating post. Try again later.')
		}
	}

	return (
		<WidgetWrapper>
			<FlexBetween gap='1.5rem'>
				<Avatar
					alt='/broken-image.jpg'
					src={avatarUrl}
					sx={{ width: 60, height: 60 }}
				/>
				<InputBase
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="What's on your mind..."
					sx={{
						width: '100%',
						backgroundColor: palette?.neutral?.light,
						borderRadius: '2rem',
						padding: '1rem 2rem',
					}}
				/>
			</FlexBetween>

			{isImage && (
				<Box
					border={`1px solid ${medium}`}
					borderRadius='5px'
					mt='1rem'
					p='1rem'
				>
					<div>
						<Button
							onClick={() => inputFileRef.current.click()}
							variant='outlined'
							size='large'
						>
							Download previews
						</Button>
						<input
							ref={inputFileRef}
							type='file'
							onChange={handleChangeFile}
							name='image'
							hidden
						/>
						{imageUrl && (
							<>
								<Button
									variant='contained'
									color='error'
									onClick={onClickRemoveImage}
								>
									Delete
								</Button>
								<img
									style={{ width: '100%', height: 'auto' }}
									src={imageUrl}
									alt='Uploaded'
								/>
							</>
						)}
					</div>
				</Box>
			)}

			<Divider sx={{ margin: '1.25rem 0' }} />

			<FlexBetween>
				<FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
					<ImageOutlined sx={{ color: mediumMain }} />
					<Typography
						color={mediumMain}
						sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
					>
						Image
					</Typography>
				</FlexBetween>

				<>
					<FlexBetween gap='0.25rem'>
						<GifBoxOutlined sx={{ color: mediumMain }} />
						<Typography color={mediumMain}>Clip</Typography>
					</FlexBetween>

					<FlexBetween gap='0.25rem'>
						<AttachFileOutlined sx={{ color: mediumMain }} />
						<Typography color={mediumMain}>Attachment</Typography>
					</FlexBetween>

					<FlexBetween gap='0.25rem'>
						<MicOutlined sx={{ color: mediumMain }} />
						<Typography color={mediumMain}>Audio</Typography>
					</FlexBetween>
				</>

				<Button
					// disabled={!post}
					onClick={onSubmit}
					sx={{
						color: palette.background.alt,
						backgroundColor: palette.primary.main,
						borderRadius: '3rem',
					}}
				>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
	)
}

export default MyPost
