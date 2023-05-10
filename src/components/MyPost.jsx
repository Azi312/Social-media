import React from 'react'
import { useDispatch } from 'react-redux'
import {
	EditOutlined,
	DeleteOutlined,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from '@mui/icons-material'
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
	Avatar,
} from '@mui/material'
import Dropzone from 'react-dropzone'

import FlexBetween from './FlexBetween'
import WidgetWrapper from './WidgetWrapper'
import axios from '../axios'
import { fetchPosts, fetchUserPosts } from '../redux/slices/posts'
import { getUserFromLS } from '../utils/getUserFromLS'

const MyPost = () => {
	const dispatch = useDispatch()
	const [isImage, setIsImage] = React.useState(false)
	const [description, setDescription] = React.useState('')
	const [isEditing, setIsEditing] = React.useState(false)
	const [imageUrl, setImageUrl] = React.useState('')
	const inputFileRef = React.useRef(null)
	const user = getUserFromLS()

	const { palette } = useTheme()
	const mediumMain = palette.neutral.mediumMain
	const medium = palette.neutral.medium

	const handleChangeFile = async event => {
		try {
			const file = event.target.files?.[0]
			if (!file) {
				return
			}

			const formData = new FormData()
			// const file = event.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
		} catch (error) {
			console.warn(error)
			alert('Error while uploading image. Try again later.')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onSubmit = async event => {
		event.preventDefault()
		try {
			const fields = {
				description,
				imageUrl,
			}

			const { data } = isEditing
				? await axios.patch(`/posts/`, fields)
				: await axios.post('/posts', fields)
			// const _id = isEditing ? id : data._id

			// navigate(`/posts/${_id}`)
			setIsImage(false)
			setDescription('')
			setImageUrl('')
			dispatch(fetchUserPosts({ userId: user.id }))
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
					src='../assets/p1.jpeg'
					sx={{ width: 60, height: 60 }}
				/>
				<InputBase
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="What's on your mind..."
					sx={{
						width: '100%',
						backgroundColor: palette.neutral.light,
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
					<div
					// acceptedFiles='.jpg,.jpeg,.png'
					// multiple={false}
					// onChange={handleChangeFile}
					// onDrop={acceptedFiles => setImageUrl(acceptedFiles[0].name)}
					>
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
						{/* {({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed ${palette.primary.main}`}
									p='1rem'
									width='100%'
									sx={{ '&:hover': { cursor: 'pointer' } }}
								>
									<input {...getInputProps()} />
									{!imageUrl ? (
										<p>Add Image Here</p>
									) : (
										<FlexBetween>
											<Typography></Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{imageUrl && (
									<IconButton
										onClick={() => setImageUrl(null)}
										sx={{ width: '15%' }}
									>
										<DeleteOutlined />
									</IconButton>
								)}
							</FlexBetween>
						)} */}
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
