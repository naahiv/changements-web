import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, db } from '@/firebase/config'
import {
	createUserWithEmailAndPassword,
	sendEmailVerification
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const useSignup = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const signup = async (email, password, userType) => {
		setError(null)
		const newUser = createUserWithEmailAndPassword(auth, email, password)
			.then(res => {
				// create a user document
				setDoc(
					doc(db, 'users', res.user.uid),
					{
						email: res.user.email,
						online: true,
						type: userType
					},
					{ merge: true }
				)

				sendEmailVerification(res.user)

				dispatch({ type: 'LOGIN', payload: res.user })
			})
			.catch(err => {
				setError(err)
				console.log(err.message)
			})
	}

	return { signup, error }
}
