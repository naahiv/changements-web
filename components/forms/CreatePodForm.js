// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'

const CreatePodForm = ({ setOpenPodForm }) => {
	// firestore
	const { addDocumentWithPhoto } = useFirestore('pods')
	const { user } = useAuthContext()
	const { document: owner } = useDocument('users', user.uid)
	const { documents: programs } = useCollection('programs')

	// form values
	const [name, setName] = useState('')
	const [programName, setProgramName] = useState('')
	const [programId, setProgramId] = useState('')
	const [description, setDescription] = useState('')
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	const selectedProgram =
		programs && programs.find(program => program.name == programName)

	const selectProgram = value => {
		setProgramName(value)
		setProgramId(selectedProgram && selectedProgram.id)
	}

	// form submission
	const handleSubmit = e => {
		e.preventDefault()

		addDocumentWithPhoto(
			{
				name: name,
				programName: programName,
				programId: programId,
				description: description,
				createdBy: user.uid,
				owner: owner.name,
				members: [owner.id]
			},
			photo,
			'photos'
		)

		setOpenPodForm(false)
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
				placeholder='Pod Name'
				required
				onChange={e => setName(e.target.value)}
				value={name}
			/>

			<select
				onChange={e => selectProgram(e.target.value)}
				required
				defaultValue='defaultOption'
			>
				<option disabled hidden value='defaultOption'>
					Select a Program*
				</option>
				{programs &&
					programs.map(program => (
						<option key={program.id} value={program.name}>
							{program.name}
						</option>
					))}
			</select>

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
				<button className='button-gray' onClick={() => setOpenPodForm(false)}>
					Cancel
				</button>
				<button className='button-orange'>Save</button>
			</div>
		</form>
	)
}

export default CreatePodForm
