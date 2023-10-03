import { useState } from 'react'

// firebase imports
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/config'

export const useResetPassword = () => {
	const [error, setError] = useState(null)

	const resetPassword = async email => {
		await sendPasswordResetEmail(auth, email).catch(err => {
			console.log(err.message)
			setError(err)
		})
	}

	return { resetPassword, error }
}
