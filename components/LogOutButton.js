// styles
import styles from '@/styles/Header.module.scss'

// components
import Link from 'next/link'

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
			<Link href='/profile'>
				<p className={styles.profileButton}>{document && document.name}</p>
			</Link>
			<button className='button-orange' onClick={() => handleLogOut()}>
				Log Out
			</button>
		</>
	)
}

export default LogOutButton
