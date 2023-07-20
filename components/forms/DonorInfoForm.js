// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'

const DonorInfoForm = ({ data }) => {
	// firestore
	const { updateDocument } = useFirestore('users')

	// form values
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [operatingCurrency, setOperatingCurrency] = useState('')
	const [address, setAddress] = useState('')
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()

		updateDocument(data.id, {
			name: name,
			phone: phone,
			operatingCurrency: operatingCurrency,
			address: address,
			registered: true
		})
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
		<>
			<p className={styles.description}>
				Enter your information here in order to join Donor Pods, find your
				favorite Non-profit and begin the journey of change.
			</p>
			<form className={styles.form} onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name*'
					required
					onChange={e => setName(e.target.value)}
					value={name}
				/>

				<input
					type='phone'
					placeholder='Phone*'
					required
					onChange={e => setPhone(e.target.value)}
					value={phone}
				/>

				<input
					type='text'
					placeholder='Operating Currency*'
					required
					onChange={e => setOperatingCurrency(e.target.value)}
					value={operatingCurrency}
				/>
				<input
					type='text'
					placeholder='Donor Address'
					onChange={e => setAddress(e.target.value)}
					value={address}
				/>

				<div className={styles.uploadFile}>
					<p>Upload Photo</p>
					<input
						type='file'
						accept='image/png, image/jpeg'
						onChange={handleFileChange}
					/>
				</div>

				<button className='button-orange'>Save</button>
			</form>
		</>
	)
}

export default DonorInfoForm
