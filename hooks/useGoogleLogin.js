import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, provider, db } from '@/firebase/config'
import { signInWithPopup } from 'firebase/auth'
import { doc, updateDoc, setDoc } from 'firebase/firestore'

export const useGoogleLogin = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const googleLogin = async () => {
		setError(null)
		signInWithPopup(auth, provider)
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

	return { googleLogin, error }
}
