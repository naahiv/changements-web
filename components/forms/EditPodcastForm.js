// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'

const EditPodcastForm = ({ activePodcast }) => {
	// firestore
	const { addDocumentWithPhoto } = useFirestore('podcasts')
	const { updateDocument } = useFirestore('podcasts')

	// adding program

	// form values
	const [name, setName] = useState(activePod.name)
	const [ngoName, setNgoName] = useState('')
	const [podPrograms, setPodPrograms] = useState(activePod.programs)
	const [programName, setProgramName] = useState('')
	const [description, setDescription] = useState(activePod.description)
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)
	const [message, setMessage] = useState(activePod.message)

	
	const [doc, setDoc] = useState(activePodcast)

	const handleChange = (key) => {
		return (e) => {
		  var t = {...doc}
		  // t[key] = e.target.value !== '' ? e.target.value : deleteField()
		  t[key] = e.target.value
		  setDoc(t)
		} 
  	}

	const selectNgo = value => {
		setNgoName(value)
	}

	const selectProgram = value => {
		setProgramName(value)
	}

	const addProgram = () => {
		setAddProgramForm(false)

		setPodPrograms(prevState => [
			...prevState,
			{
				ngoName: ngoName,
				programName: programName
			}
		])

		setNgoName('')
		setProgramName('')
	}

	const deleteProgram = deletedProgram => {
		setPodPrograms(prevState =>
			prevState.filter(item => item != deletedProgram)
		)
	}

	// form submission
	const handleSubmit = e => {
		e.preventDefault()

		updateDocument(
			activePodcast.id,
			{
				name: name,
				programs: podPrograms,
				description: description,
				message: message
			},
			photo,
			'photos'
		)
	}

	// validating profile image
	const handleFileChange = e => {
		setPhoto(null)
		let selected = e.target.files[0]

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
	}

	return true
	/*(
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Podcast Name*'
				required
				onChange={handleChange('name')}
				value={name}
			/>
		NOTE: IN THE MIDDLE OF MAKING


					<div className='buttons-row' style={{ gridColumn: 'span 12' }}>
						<button
							onClick={() => setAddProgramForm(false)}
							className='button-gray'
							type='button'
						>
							Add Program Later
						</button>
						<button
							type='button'
							className='button-orange'
							onClick={addProgram}
						>
							Add
						</button>
					</div>
				</>
			)}

			<textarea
				placeholder='Description'
				required
				onChange={e => setDescription(e.target.value)}
				value={description}
			/>

			<textarea
				placeholder='Message'
				onChange={e => setMessage(e.target.value)}
				value={message}
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
				{!adminFlag && (
						<button className='button-gray' onClick={() => setOpenPodForm(false)}>
					Cancel
				</button>
				)}
				<button type='submit' className='button-orange'>
					Save
				</button>
			</div>
		</form>
	)
}
*/

export default EditPodcastForm
