// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionTitle from '../SectionTitle'

// hooks
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'

const UserTypeSelection = () => {
	const { user } = useAuthContext()
	const { updateDocument } = useFirestore('users')

	return (
		<div className={styles.authContainer}>
			{/* <SectionTitle>Register</SectionTitle> */}

			<div className={styles.registerButtons}>
				<button
					className='button-orange'
					onClick={() => updateDocument(user.uid, { type: 'ngo' })}
				>
					Register a NGO
				</button>

				<button onClick={() => updateDocument(user.uid, { type: 'donor' })}>
					Become a Doner
				</button>
			</div>
		</div>
	)
}

export default UserTypeSelection
