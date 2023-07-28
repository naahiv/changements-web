// firebase imports
import { storage, db } from '../firebase/config'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

// hooks
import { useState } from 'react'

export const useStorage = path => {
	const [fileUrl, setFileUrl] = useState()

	const uploadFile = async file => {
		try {
			const uploadPath = `${path}/${file.name}`
			const fileRef = ref(storage, uploadPath)
			await uploadBytes(fileRef, file)
			setFileUrl(await getDownloadURL(fileRef))
		} catch (err) {
			console.log(err.message)
		}
	}

	return { uploadFile, fileUrl }
}
