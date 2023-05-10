import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { setLogin } from '../../state'
import { Box } from '@mui/material'

interface Values {
	email: string
	password: string
}

export const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (values: Values) => {
		const response = await fetch('http://localhost:4444/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})

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
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label='E-Mail'
					type='email'
					{...register('email', { required: 'Enter your email' })}
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label='Password'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Enter your password' })}
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Login
				</Button>
			</form>
			<Box mt='1rem' textAlign='center'>
				Not registered?{' '}
				<span
					style={{ cursor: 'pointer', color: 'blue' }}
					onClick={() => navigate('/register')}
				>
					Create an account
				</span>
			</Box>
		</Paper>
	)
}
