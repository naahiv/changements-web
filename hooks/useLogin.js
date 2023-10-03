import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, db } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

export const useLogin = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const login = async (email, password) => {
		setError(null)
		signInWithEmailAndPassword(auth, email, password)
			.then(res => {
				// update a user document
				updateDoc(doc(db, 'users', res.user.uid), {
					online: true
				})

				dispatch({ type: 'LOGIN', payload: res.user })
			})
			.catch(err => {
				setError(err)
				console.log(err.message)
			})
	}

	return { login, error }
}
