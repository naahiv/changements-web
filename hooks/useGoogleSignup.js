import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, provider, db } from '@/firebase/config'
import { signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const useGoogleSignup = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const googleSignup = async userType => {
		setError(null)
		signInWithPopup(auth, provider)
			.then(res => {
				// create a user document
				setDoc(doc(db, 'users', res.user.uid), {
					email: res.user.email,
					type: userType
				})

				dispatch({ type: 'LOGIN', payload: res.user })
			})
			.catch(err => {
				console.log(err.message)
			})
	}

	return { googleSignup, error }
}
