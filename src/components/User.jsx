import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	AccountBalance,
	Group,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme, Avatar } from '@mui/material'
import FlexBetween from './FlexBetween'
import WidgetWrapper from './WidgetWrapper'

const User = ({ fullName, city, university, avatarUrl, age, friends }) => {
	const { palette } = useTheme()
	const dark = palette.neutral.dark
	const medium = palette.neutral.medium
	const main = palette.neutral.main

	return (
		<WidgetWrapper>
			<FlexBetween
				gap='0.5rem'
				pb='1.1rem'
				// onClick={() => navigate(`/profile/${userId}`)}
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
							{fullName}
						</Typography>
						<Typography color={medium}>{age} years old</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>

			<Divider />

			{/* SECOND ROW */}
			<Box p='1rem 0'>
				<Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
					<LocationOnOutlined fontSize='large' sx={{ color: main }} />
					<Typography color={medium}>{city}</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='1rem'>
					<AccountBalance fontSize='large' sx={{ color: main }} />
					<Typography color={medium}>{university}</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='1rem'>
					<Group fontSize='large' sx={{ color: main }} />
					<Typography color={medium}>
						{friends.length} {friends.length > 1 ? 'friends' : 'friend'}
					</Typography>
				</Box>
			</Box>

			{/* <Divider /> */}

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
