// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'

const EditProgramForm = ({ setOpenForm, activeProgram }) => {
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
	const [fundsSeeking, setFundsSeeking] = useState(activeProgram.fundsSeeking)
	const [description, setDescription] = useState(activeProgram.description)
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form submission
	const handleSubmit = e => {
		e.preventDefault()

		updateDocument(
			activeProgram.id,
			{
				name: name,
				fundsRequired: fundsRequired,
				fundsFulfilled: fundsFulfilled,
				fundsSeeking: fundsSeeking,
				description: description
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
			setPhotoError('Image file size must be lesst than a 1000kb')
			return
		}

		setPhotoError(null)
		setPhoto(selected)
		console.log('Photo updated.')
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Program Name'
				required
				onChange={e => setName(e.target.value)}
				value={name}
			/>

			<input
				type='number'
				placeholder='Funds Required'
				required
				onChange={e => setFundsRequired(e.target.value)}
				value={fundsRequired}
			/>

			<input
				type='number'
				placeholder='Funds Fulfilled'
				required
				onChange={e => setFundsFulfilled(e.target.value)}
				value={fundsFulfilled}
			/>

			<input
				type='number'
				placeholder='Funds Seeking'
				required
				onChange={e => setFundsSeeking(e.target.value)}
				value={fundsSeeking}
			/>

			<textarea
				placeholder='Description'
				required
				onChange={e => setDescription(e.target.value)}
				value={description}
			/>

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
				<button className='button-orange'>Save</button>
			</div>
		</form>
	)
}

export default EditProgramForm
