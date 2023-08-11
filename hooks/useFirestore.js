import { useReducer, useEffect, useState } from 'react'
import { db, storage } from '@/firebase/config'
import {
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
	serverTimestamp
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

let intialState = {
	document: null,
	isPending: false,
	error: null,
	success: null
}

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { isPending: true, document: null, success: false, error: null }
		case 'ADDED_DOCUMENT':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null
			}
		case 'DELETED_DOCUMENT':
			return {
				isPending: false,
				document: null,
				success: true,
				error: null
			}
		case 'UPDATED_DOCUMENT':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null
			}
		case 'ERROR':
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload
			}
		default:
			return state
	}
}

export const useFirestore = data => {
	const [response, dispatch] = useReducer(firestoreReducer, intialState)
	const [isCancelled, setIsCancelled] = useState(false)

	// collection ref
	const collectionRef = collection(db, data)

	// dispatch if note cancelled
	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			dispatch(action)
		}
	}

	// add a document
	const addDocument = async doc => {
		dispatch({ type: 'IS_PENDING' })

		try {
			const createdAt = serverTimestamp()

			const addedDocument = await addDoc(collectionRef, {
				...doc,
				createdAt
			})
			dispatchIfNotCancelled({
				type: 'ADDED_DOCUMENT',
				payload: addedDocument
			})
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
		}
	}

	// add a document
	const addDocumentWithPhoto = async (doc, photo, photoPath) => {
		dispatch({ type: 'IS_PENDING' })

		try {
			const createdAt = serverTimestamp()

			// Uploading photo
			const uploadPath = `${photoPath}/${photo.name}`
			const photoRef = ref(storage, uploadPath)
			await uploadBytes(photoRef, photo)
			const photoUrl = await getDownloadURL(photoRef)

			const addedDocument = await addDoc(collectionRef, {
				...doc,
				createdAt,
				photoUrl: photoUrl
			})
			dispatchIfNotCancelled({
				type: 'ADDED_DOCUMENT',
				payload: addedDocument
			})
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
		}
	}

	// delete a document
	const deleteDocument = async id => {
		dispatch({ type: 'IS_PENDING' })

		try {
			await deleteDoc(doc(db, data, id))
			dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
		}
	}

	// update a document
	const updateDocument = async (id, updates, photo, photoPath) => {
		dispatch({ type: 'IS_PENDING' })

		try {
			// Uploading photo
			let photoUrl
			if (photo) {
				const uploadPath = `${photoPath}/${photo.name}`
				const photoRef = ref(storage, uploadPath)
				await uploadBytes(photoRef, photo)
				photoUrl = await getDownloadURL(photoRef)
			}

			const updatedDocument = photo
				? await updateDoc(doc(db, data, id), {
						...updates,
						photoUrl: photoUrl
				  })
				: await updateDoc(doc(db, data, id), {
						...updates
				  })

			dispatchIfNotCancelled({
				type: 'UPDATED_DOCUMENT',
				payload: updatedDocument
			})
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
		}
	}

	useEffect(() => {
		setIsCancelled(false)
		return () => setIsCancelled(true)
	}, [])

	return {
		addDocument,
		deleteDocument,
		updateDocument,
		addDocumentWithPhoto,
		response
	}
}
