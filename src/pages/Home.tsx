import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'

import Friends from '../components/widgets/Friends'
import Posts from '../components/widgets/Posts'
import User from '../components/widgets/User'
import Notice from '../components/Notice'
import Advert from '../components/widgets/Advert'
import { RootState } from '../state/types'
import CreatePost from '../components/widgets/CreatePost'
import { Navbar } from '../components/Navbar'

export const Home = () => {
	const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
	const { _id, avatarUrl, friends } = useSelector(
		(state: RootState) => state.user
	)
	const notice = useSelector((state: RootState) => state.notice)

	return (
		<>
			<Box>
				<Navbar />
				<Box
					width='100%'
					padding='2rem 6%'
					display={isNonMobileScreens ? 'flex' : 'block'}
					gap='0.5rem'
					justifyContent='space-between'
				>
					<Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
						<User userId={_id} avatarUrl={avatarUrl} />
					</Box>
					<Box
						flexBasis={isNonMobileScreens ? '42%' : undefined}
						mt={isNonMobileScreens ? undefined : '2rem'}
					>
						<CreatePost avatarUrl={avatarUrl} />
						<Posts userId={_id} friends={friends} />
					</Box>
					{isNonMobileScreens && (
						<Box flexBasis='26%'>
							<Advert />
							<Box m='2rem 0' />
							<Friends userId={_id} />
						</Box>
					)}
				</Box>
			</Box>
			{notice && <Notice />}
		</>
	)
}
