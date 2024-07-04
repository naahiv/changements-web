// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'
import { deleteField } from 'firebase/firestore'

const EditProfileInfo = ({ data, setShowForm }) => {

	const { updateDocument } = useFirestore('users')
	const [doc, setDoc] = useState(data)
	
	const handleChange = (key) => {
		return (e) => {
		  var t = {...doc}
		  // t[key] = e.target.value !== '' ? e.target.value : deleteField()
		  t[key] = e.target.value
		  setDoc(t)
		} 
  	}

	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()
		updateDocument(data.id, doc, photo, 'photos')
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

	// currencies
	const { currencies } = useCurrency()

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>

				<input
					type='text'
					placeholder='Name*'
					required
					onChange={handleChange('name')}
					value={doc.name}
				/>

				<input
					type='email'
					placeholder='Email*'
					disabled
					value={data.email}
				/>

				<input
					type='phone'
					placeholder='Phone*'
					required
					onChange={handleChange('phone')}
					value={doc.phone}
				/>

				<select
					onChange={handleChange('operatingCurrency')}
					required
					defaultValue='defaultOption'
					value={doc.operatingCurrency}
				>
					<option disabled hidden value='defaultOption'>
						Operating Currency*
					</option>
					{currencies &&
						currencies.map(currency => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
				</select>

				<input
					type='text'
					placeholder='Mailing Address'
					onChange={handleChange('address')}
					value={doc.address}
				/>


				{/* If an NGO, the extra fields are:
					donationCurrency
					donationInformation
					ngoId
					ngoReportFile
					primaryContactName
					tagline
					website
					description
				*/}
				{data.type === 'ngo' && [
					'donationCurrency',
					'donationInformation',
					'ngoId',
					'ngoReportFile',
					'primaryContactName',
					'tagline',
					'website',
					'description'
				].map((val, i, arr) => {return (
					<input
						type='text'
						placeholder={val}
						onChange={handleChange(val)}
						value={doc[val]}
					/>
				)})}


				<div className={styles.uploadFile}>
					{photoError ? <p>{photoError}</p> : <p>Upload Photo</p>}
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

export default EditProfileInfo
