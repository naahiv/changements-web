// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { React, useState, useEffect } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'
import Select from 'react-select'


const AddPodcastForm = ({setPodFormOpen}) => {
	// firestore
	const { addDocumentWithPhoto } = useFirestore('pods')
	const { documents: programs } = useCollection('programs')

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

	const [selectedObj, setSelectedObj] = useState(null)

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

		const programArr = selectedObj.map((e) => {
			return {programName: e.value}
		})

		addDocumentWithPhoto(
			{
				name: name,
				programs: programArr,
				description: description,
				members: [],
				invites: [],
				specialty: true
			},
			photo,
			'photos'
		)

		setPodFormOpen && setPodFormOpen(false)
	}
		
	// <Select /> setup
	
	const selectorOptions = programs && programs.map((program) => {
		return {
			value: program.name,
			label: `${program.owner} - ${program.name}`
		}
	})

	const selectorStyles = { control: (baseStyles, state) => ({
		...baseStyles,
		borderColor: 'black',
		minHeight: '44.5px'
	})}
	
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
			setPhotoError('Image file size must be less than a 1000kb')
			return
		}

		setPhotoError(null)
		setPhoto(selected)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Name*'
				required
				onChange={e => setName(e.target.value)}
				value={name}
			/>

			{selectorOptions && (
			<span className={styles.searchableSelect}>
				<Select
					isMulti
					value={selectedObj}
					onChange={setSelectedObj}
					placeholder='Select programs...'
					options={selectorOptions}
					styles={selectorStyles}
				/>
			</span>
			)}

			<textarea
				placeholder='Description*'
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
		
			<button className='button-orange' type='submit'>Submit</button>

		</form>
	)
}

export default AddPodcastForm
