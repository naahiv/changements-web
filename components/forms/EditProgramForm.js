// styles
import styles from '@/styles/Login.module.scss'

// hooks
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'

// for the quillbox
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

import 'react-quill/dist/quill.snow.css';
const quillModules = {
		toolbar: [
			[{header: [4,5,6, false]}],
			['bold','italic','underline','strike'],
			[
				{list: 'ordered'},
				{list: 'bullet'},
				{indent: '-1'},
				{indent: '+1'}
			],
			['link', 'image']
		]
	}

const EditProgramForm = ({ setOpenForm, activeProgram, adminFlag }) => {
	// firestore
	const { updateDocument } = useFirestore('programs')

	// form values
	const [name, setName] = useState(activeProgram.name)
	const [fundsRequired, setFundsRequired] = useState(
		activeProgram.fundsRequired
	)
	const [fundsFulfilled, setFundsFulfilled] = useState(
		activeProgram.fundsFulfilled
	)
	// const [fundsSeeking, setFundsSeeking] = useState(activeProgram.fundsSeeking)
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// @naahiv
	const [quillbox, setQuillbox] = useState(activeProgram.description)
	


	// @naahiv
	// disables "Save" button if there is an error with the image.
	const [buttonEnabled, setButtonEnabled] = useState(true)

	useEffect(() => {
		setButtonEnabled((photoError == null))
	}, [photoError])	

	// ---

	
	// form submission
	const handleSubmit = e => {
		e.preventDefault()

		updateDocument(
			activeProgram.id,
			{
				name: name,
				fundsRequired: fundsRequired,
				fundsFulfilled: fundsFulfilled,
				description: quillbox
			},
			photo,
			'photos'
		)

		setOpenForm(false)
	}

	// validating profile image
	const handleFileChange = e => {
		setPhoto(null)
		let selected = e.target.files[0]
		console.log(selected)

		if (!selected) {
			setPhotoError('Please select a file.')
			return
		}

		if (!selected.type.includes('image')) {
			setPhotoError('Selected file must be an image.')
			return
		}

		if (selected.size > 1000000) {
			setPhotoError('Image file size must be less than a 1000kb')
			return
		}

		setPhotoError(null)
		setPhoto(selected)
		console.log('Photo updated.')
	}

	// Function to format the amount
	const formattedAmount = () => {
		// Remove formatting characters like commas
		const cleanedAmount = parseFloat(fundsRequired.replace(/,/g, ''))

		// Check if cleanedAmount is a valid number
		if (!isNaN(cleanedAmount)) {
			// Format the cleanedAmount and return it as a string
			return cleanedAmount.toLocaleString('en-US')
		} else {
			// If cleanedAmount is not a valid number, return an empty string or an error message
			return ''
		}
	}

	return (
		<form className={styles.form} id={styles.editProgramForm} onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Program Name'
				required
				onChange={e => setName(e.target.value)}
				value={name}
			/>

			<input
				type='text'
				placeholder='Funds Required'
				required
				onChange={e => setFundsRequired(e.target.value.replace(/,/g, ''))}
				value={formattedAmount()}
			/>

			{adminFlag && (
				<input
					type='text'
					placeholder='Funds Fulfilled'
					required
					onChange={e => setFundsFulfilled(e.target.value)}
					value={fundsFulfilled}
				/>
			)}

			<div className={styles.quillbox}>
				<ReactQuill theme="snow" value={quillbox} placeholder ="Description" onChange={setQuillbox} className={styles.quillboxInput} modules={quillModules} required />
			</div>

		{/*
			<textarea
				placeholder='Description'
				required
				onChange={e => setDescription(e.target.value)}
				value={description}
			/>
		*/}

			<div className={styles.uploadFile}>
				{photoError ? <p>{photoError}</p> : <p>Upload Photo</p>}
				<input
					type='file'
					accept='image/png, image/jpeg'
					onChange={handleFileChange}
				/>
			</div>

			<div className='buttons-row' style={{ gridColumn: 'span 12' }}>
				<button className='button-gray' onClick={() => setOpenForm(false)}>
					Cancel
				</button>
				<button className='button-orange' disabled={!buttonEnabled}>Save</button>
			</div>
		</form>
	)
}

export default EditProgramForm
