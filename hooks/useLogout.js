// firebase imports
import { auth, db } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'

export const useLogout = () => {
	const { user, dispatch } = useAuthContext()

	const logout = async () => {
		signOut(auth)
			.then(() => {
				// update a user document
				updateDoc(doc(db, 'users', user.uid), {
					online: false
				})

				dispatch({ type: 'LOGOUT' })
			})
			.catch(err => {
				console.log(err.message)
			})
	}

	return { logout }
}
