import React, { FC } from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	AccountBalance,
	Group,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme, Avatar } from '@mui/material'
import FlexBetween from '../FlexBetween'
import WidgetWrapper from '../WidgetWrapper'
import { RootState } from '../../state/types'

interface User {
	_id: string
	fullName: string
	avatarUrl: string
	age: string
	city: string
	university: string
	friends: string[]
}

interface UserProps {
	userId?: string
	avatarUrl?: string
}

const User: FC<UserProps> = ({ userId, avatarUrl }) => {
	const [user, setUser] = useState<User>()
	const navigate = useNavigate()
	const token = useSelector((state: RootState) => state.token)

	const { palette } = useTheme<any>()
	const dark = palette.neutral.dark
	const medium = palette.neutral.medium
	const main = palette.neutral.main

	const getUser = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users/${userId}`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		const data = await response.json()
		setUser(data)
	}

	useEffect(() => {
		getUser()
	}, [])

	if (!user) {
		return null
	}

	return (
		<WidgetWrapper>
			<FlexBetween
				gap='0.5rem'
				pb='1.1rem'
				onClick={() => navigate(`/profile/${userId}`)}
			>
				<FlexBetween gap='1rem'>
					<Avatar src={avatarUrl} />
					<Box>
						<Typography
							variant='h4'
							color={dark}
							fontWeight='500'
							sx={{
								'&:hover': {
									color: palette.primary.light,
									cursor: 'pointer',
								},
							}}
						>
							{user.fullName}
						</Typography>
						<Typography color={medium}>{user.age} years old</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>

			<Divider />

			<Box p='1rem 0'>
				<Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
					<LocationOnOutlined fontSize='large' sx={{ color: main }} />
					<Typography color={medium}>{user.city}</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='1rem'>
					<AccountBalance fontSize='large' sx={{ color: main }} />
					<Typography color={medium}>{user.university}</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='1rem'>
					<Group fontSize='large' sx={{ color: main }} />
					<Typography color={medium}>
						{user.friends.length}{' '}
						{user.friends.length > 1 ? 'friends' : 'friend'}
					</Typography>
				</Box>
			</Box>

			<Divider />

			{/* FOURTH ROW */}
			<Box p='1rem 0'>
				<Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
					Social Profiles
				</Typography>

				<FlexBetween gap='1rem' mb='0.5rem'>
					<FlexBetween gap='1rem'>
						<img src='../assets/twitter.png' alt='twitter' />
						<Box>
							<Typography color={main} fontWeight='500'>
								Twitter
							</Typography>
							<Typography color={medium}>Social Network</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>

				<FlexBetween gap='1rem'>
					<FlexBetween gap='1rem'>
						<img src='../assets/linkedin.png' alt='linkedin' />
						<Box>
							<Typography color={main} fontWeight='500'>
								Linkedin
							</Typography>
							<Typography color={medium}>Network Platform</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	)
}

export default User
