import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotice } from '../state'
import { Link } from 'react-router-dom'
import { RootState } from '../state/types'

const Notice = () => {
	const dispatch = useDispatch()
	const { notice, user } = useSelector((state: RootState) => state)

	React.useEffect(() => {
		dispatch(setNotice(true))
		setTimeout(() => {
			dispatch(setNotice(false))
		}, 5000)
	}, [notice, dispatch])

	return (
		<div className='notification'>
			<div className='body'>
				<h3>This entry was published </h3>
				<p>
					You published an entry on{' '}
					<Link to={`/profile/${user._id}`}>your page</Link>
				</p>
			</div>
		</div>
	)
}

export default Notice
