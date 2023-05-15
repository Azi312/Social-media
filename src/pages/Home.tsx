import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'

import MyPost from '../components/widgets/CreatePost'
import Friends from '../components/widgets/Friends'
import Posts from '../components/widgets/Posts'
import User from '../components/widgets/User'
import Notice from '../components/Notice'
import Advert from '../components/widgets/Advert'
import { RootState } from '../state/types'

export const Home = () => {
	const { _id, avatarUrl, friends } = useSelector(
		(state: RootState) => state.user
	)
	const notice = useSelector((state: RootState) => state.notice)

	return (
		<>
			<Grid container spacing={4}>
				<Grid xs={3} item>
					<User userId={_id} avatarUrl={avatarUrl} />
				</Grid>
				<Grid xs={6} item>
					<MyPost avatarUrl={avatarUrl} />
					<Posts userId={_id} friends={friends} />
				</Grid>
				<Grid xs={3} item>
					<Advert />
					<Box m='2rem 0' />
					<Friends userId={_id} />
				</Grid>
			</Grid>
			{notice && <Notice />}
		</>
	)
}
