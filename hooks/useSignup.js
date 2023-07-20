import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, db } from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const useSignup = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const signup = async (email, password) => {
		setError(null)
		createUserWithEmailAndPassword(auth, email, password)
			.then(res => {
				// create a user document
				setDoc(
					doc(db, 'users', res.user.uid),
					{
						email: res.user.email
					},
					{ merge: true }
				)

				dispatch({ type: 'LOGIN', payload: res.user })
			})
			.catch(err => {
				console.log(err.message)
			})
	}

	return { signup, error }
}
