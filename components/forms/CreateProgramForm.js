// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const CreateProgramForm = ({ setOpenForm }) => {
	// firestore
	const { addDocumentWithPhoto } = useFirestore('programs')
	const { user } = useAuthContext()
	const { document: owner } = useDocument('users', user.uid)

	// form values
	const [name, setName] = useState('')
	const [fundsRequired, setFundsRequired] = useState('')
	const [fundsFulfilled, setFundsFulfilled] = useState('')
	const [fundsSeeking, setFundsSeeking] = useState('')
	const [description, setDescription] = useState('')
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form submission
	const handleSubmit = e => {
		e.preventDefault()

		addDocumentWithPhoto(
			{
				name: name,
				fundsRequired: fundsRequired,
				fundsFulfilled: 0,
				// fundsFulfilled: fundsFulfilled,
				// fundsSeeking: fundsSeeking,
				description: description,
				createdBy: user.uid,
				owner: owner.name,
				currency: owner.operatingCurrency,
				pledges: []
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
		<form className={styles.form} onSubmit={handleSubmit}>
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

			{/* <input
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
			/> */}

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
					required
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

export default CreateProgramForm
