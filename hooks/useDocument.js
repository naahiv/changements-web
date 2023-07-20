import { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

export const useDocument = (collection, id) => {
	const [document, setDocument] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const ref = doc(db, collection, id)

		const unsub = onSnapshot(
			ref,
			snapshot => {
				if (snapshot.data()) {
					setDocument({ ...snapshot.data(), id: snapshot.id })
					setError(null)
				} else {
					setError('no such document exists')
				}
			},
			error => {
				console.log(error)
				setError('failed to get document')
			}
		)

		// unsubscribe

		return () => unsub()
	}, [collection, id])

	return { document, error }
}
