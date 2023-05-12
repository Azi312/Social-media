import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Avatar from '@mui/material/Avatar'
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './Login.module.scss'
import { setLogin } from '../../state'
import { Box } from '@mui/material'

interface Values {
	fullName: string
	age: string
	city: string
	university: string
	email: string
	password: string
}

export const Registration = () => {
	const [avatarUrl, setAvatarUrl] = React.useState('')
	const [isHovered, setIsHovered] = React.useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const inputFileRef = React.useRef(null as any)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: '',
			age: '',
			city: '',
			university: '',
			email: '',
			password: '',
			avatarUrl: avatarUrl,
		},
		mode: 'onChange',
	})

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event.target.files?.[0]
			if (!file) {
				return
			}

			const formData = new FormData()
			formData.append('avatar', file)
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/upload-avatar`,
				{
					method: 'POST',
					body: formData,
				}
			)
			const data = await response.json()

			setAvatarUrl(data.url)
		} catch (error) {
			console.warn(error)
			alert('Error while uploading image. Try again later.')
		}
	}

	const onSubmit = async (values: Values) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/auth/register`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						...values,
						avatarUrl,
					}),
				}
			)

			const loggedIn = await response.json()
			if (loggedIn) {
				dispatch(
					setLogin({
						user: loggedIn.user,
						token: loggedIn.token,
					})
				)
				navigate('/home')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const removeAvatar = () => {
		setAvatarUrl('')
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Create an account
			</Typography>
			<div className={styles.avatar}>
				<Avatar alt='/broken-image.jpg' sx={{ width: 100, height: 100 }}>
					<Avatar
						alt='/broken-image.jpg'
						src={avatarUrl}
						sx={{ width: 100, height: 100 }}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<IconButton
							onClick={() => inputFileRef.current.click()}
							color='primary'
							size='large'
						>
							<input
								ref={inputFileRef}
								type='file'
								onChange={handleChangeFile}
								name='avatar'
								hidden
							/>

							{!avatarUrl && <PhotoCamera fontSize='large' />}
						</IconButton>
					</Avatar>
				</Avatar>
			</div>
			{avatarUrl ? (
				<Button
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					variant='contained'
					size='small'
					onClick={removeAvatar}
					sx={{
						opacity: isHovered ? 1 : 0,
						height: '22px',
						position: 'absolute',
						top: 'calc(50% - 24px)',
						left: 'calc(49% - 24px)',
						zIndex: '10',
						transition: 'all 0.3s ease',
					}}
					startIcon={<DeleteIcon />}
				>
					Delete
				</Button>
			) : (
				''
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('fullName', { required: 'Enter your full name' })}
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					className={styles.field}
					label='Full name'
					fullWidth
				/>
				<TextField
					{...register('age', { required: 'Enter your age' })}
					error={Boolean(errors.age?.message)}
					helperText={errors.age?.message}
					className={styles.field}
					label='Age'
					fullWidth
				/>
				<TextField
					{...register('city', { required: 'Enter your city' })}
					error={Boolean(errors.city?.message)}
					helperText={errors.city?.message}
					className={styles.field}
					label='City'
					fullWidth
				/>
				<TextField
					{...register('university', { required: 'Enter your university' })}
					error={Boolean(errors.university?.message)}
					helperText={errors.university?.message}
					className={styles.field}
					label='University'
					fullWidth
				/>
				<TextField
					className={styles.field}
					type='email'
					label='E-Mail'
					{...register('email', { required: 'Enter your email' })}
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label='Password'
					{...register('password', { required: 'Enter your password' })}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Sign up
				</Button>
			</form>
			<Box mt='1rem' textAlign='center'>
				Already registered?{' '}
				<span
					style={{ cursor: 'pointer', color: 'blue' }}
					onClick={() => navigate('/')}
				>
					Sign In
				</span>
			</Box>
		</Paper>
	)
}
