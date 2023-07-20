import { useState, useEffect, useRef } from 'react'
import { db } from '@/firebase/config'
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy
} from 'firebase/firestore'

export const useCollection = (c, _query, _order) => {
	const [documents, setDocuments] = useState(null)
	const [error, setError] = useState(null)

	// query and order by
	const q = useRef(_query).current
	const order = useRef(_order).current

	useEffect(() => {
		let ref = collection(db, c)

		if (q) {
			ref = query(ref, where(...q))
		}

		if (order) {
			ref = query(ref, orderBy(...order))
		}

		const unsub = onSnapshot(
			ref,
			snapshot => {
				let results = []
				snapshot.docs.forEach(doc => {
					results.push({ ...doc.data(), id: doc.id })
				})

				// update state
				setDocuments(results)
				setError(null)
			},
			error => {
				console.log(error)
				setError('Could not fetch the data')
			}
		)

		// unsubscribe

		return () => unsub()
	}, [c, q, order])

	return { documents, error }
}
