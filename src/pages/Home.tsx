import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'

import MyPost from '../components/widgets/CreatePost'
import Friends from '../components/widgets/Friends'
import Posts from '../components/widgets/Posts'
import User from '../components/widgets/User'
import { RootState } from '../state/types'
import Notice from '../components/Notice'

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
					<Friends userId={_id} />
				</Grid>
			</Grid>
			{notice && <Notice />}
		</>
	)
}
