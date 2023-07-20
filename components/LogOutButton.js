// hooks
import { useLogout } from '@/hooks/useLogout'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const LogOutButton = ({ close }) => {
	const { logout } = useLogout()

	// context
	const { user } = useAuthContext()
	const { document } = useDocument('users', user.uid)

	const handleLogOut = () => {
		logout()
		close()
	}

	return (
		<>
			<p>{document && document.name}</p>
			<button className='button-orange' onClick={() => handleLogOut()}>
				Log Out
			</button>
		</>
	)
}

export default LogOutButton
