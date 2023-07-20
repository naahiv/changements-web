import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, storage, db } from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

export const useSignup = () => {
	const [isCancelled, setIsCanceled] = useState(false)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const { dispatch } = useAuthContext()

	const signup = async (email, password, displayName, thumbnail, data) => {
		setError(null)
		setIsPending(true)

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)

			if (!res) {
				throw new Error('Could not complete signup')
			}

			// // upload image and get the download url
			// const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
			// const photoRef = ref(storage, uploadPath)
			// await uploadBytes(photoRef, thumbnail)
			// const url = await getDownloadURL(photoRef)

			// // add display name and profile image
			// await updateProfile(res.user, { displayName, photoURL: url })

			// create a user document
			await setDoc(doc(db, 'users', res.user.uid), {
				online: true,
				email: email
				// name: displayName
				// photoURL: url,
				// ...data
			})

			dispatch({ type: 'LOGIN', payload: res.user })

			if (!isCancelled) {
				setIsPending(false)
				setError(null)
			}
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message)
				setError(err.message)
				setIsPending(false)
			}
		}
	}

	useEffect(() => {
		setIsCanceled(false)
		return () => setIsCanceled(true)
	}, [])

	return { signup, error, isPending }
}
