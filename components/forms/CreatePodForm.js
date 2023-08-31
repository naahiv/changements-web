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
	const { documents: users } = useCollection('users')

	// adding program
	const [addProgramForm, setAddProgramForm] = useState(false)

	// form values
	const [name, setName] = useState('')
	const [ngoName, setNgoName] = useState('')
	const [podPrograms, setPodPrograms] = useState([])
	const [programName, setProgramName] = useState('')
	const [description, setDescription] = useState('')
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

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

		addDocumentWithPhoto(
			{
				name: name,
				programs: podPrograms,
				description: description,
				createdBy: user.uid,
				owner: owner.name,
				ownerId: owner.id,
				members: [owner.id],
				invites: []
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

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Pod Name*'
				required
				onChange={e => setName(e.target.value)}
				value={name}
			/>

			{!addProgramForm && (
				<button
					onClick={() => setAddProgramForm(true)}
					className='button-orange'
					type='button'
				>
					Add a Program
				</button>
			)}

			{addProgramForm && (
				<>
					<select
						onChange={e => selectNgo(e.target.value)}
						defaultValue='defaultOption'
					>
						<option disabled hidden value='defaultOption'>
							Select a NGO
						</option>
						{users &&
							users
								.filter(user => user.type == 'ngo')
								.map(ngo => (
									<option key={ngo.id} value={ngo.name}>
										{ngo.name}
									</option>
								))}
					</select>
					{ngoName != '' && (
						<select
							onChange={e => selectProgram(e.target.value)}
							defaultValue='defaultOption'
						>
							<option disabled hidden value='defaultOption'>
								Select a Program
							</option>
							{programs &&
								programs
									.filter(item => item.owner == ngoName)
									.map(program => (
										<option key={program.id} value={program.name}>
											{program.name}
										</option>
									))}
						</select>
					)}

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

			{podPrograms.length > 0 && (
				<div style={{ gridColumn: 'span 12' }}>
					{podPrograms.map(podProgram => (
						<p>
							{podProgram.programName} -{' '}
							<span
								style={{
									fontSize: '0.8rem',
									color: '#9a031e',
									cursor: 'pointer'
								}}
								onClick={() => deleteProgram(podProgram)}
							>
								Remove
							</span>
						</p>
					))}
				</div>
			)}

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
				<button type='submit' className='button-orange'>
					Save
				</button>
			</div>
		</form>
	)
}

export default CreatePodForm
