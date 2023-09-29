// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'

const EditDonorInfo = ({ data, setShowForm }) => {
	// firestore
	const { updateDocument } = useFirestore('users')

	// form values
	const [name, setName] = useState(data.name)
	const [phone, setPhone] = useState(data.phone)
	const [operatingCurrency, setOperatingCurrency] = useState(
		data.operatingCurrency
	)
	const [address, setAddress] = useState(data.address)
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()

		updateDocument(
			data.id,
			{
				name: name,
				phone: phone,
				operatingCurrency: operatingCurrency,
				address: address,
				registered: true
			},
			photo,
			'photos'
		)

		setShowForm && setShowForm(false)
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

				<select
					onChange={e => setOperatingCurrency(e.target.value)}
					required
					defaultValue='defaultOption'
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
					onChange={e => setAddress(e.target.value)}
					value={address}
				/>

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

export default EditDonorInfo
