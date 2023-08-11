// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'

const EditNgoInfo = ({ data, setShowForm }) => {
	// firestore
	const { updateDocument } = useFirestore('users')

	// form values
	const [name, setName] = useState(data.name)
	const [primaryContactName, setPrimaryContactName] = useState(
		data.primaryContactName
	)
	const [phone, setPhone] = useState(data.phone)
	const [operatingCurrency, setOperatingCurrency] = useState(
		data.operatingCurrency
	)
	const [donationCurrency, setDonationCurrency] = useState(
		data.donationCurrency
	)
	const [description, setDescription] = useState(data.description)
	const [donationInformation, setDonationInformation] = useState(
		data.donationInformation
	)
	const [ngoId, setNgoId] = useState(data.ngoId)
	const [address, setAddress] = useState(data.address)
	const [website, setWebsite] = useState(data.website)
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form steps
	const [step, setStep] = useState(1)

	// form submission
	const handleForm1 = async e => {
		e.preventDefault()

		updateDocument(data.id, {
			name: name,
			phone: phone,
			operatingCurrency: operatingCurrency,
			donationCurrency: donationCurrency,
			description: description
		})

		setStep(2)
	}

	const handleForm2 = async e => {
		e.preventDefault()

		updateDocument(
			data.id,
			{
				ngoId: ngoId,
				primaryContactName: primaryContactName,
				website: website,
				address: address,
				donationInformation: donationInformation,
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
			{/* Registration step 1 */}
			{step == 1 && (
				<form className={styles.form} onSubmit={handleForm1}>
					<input
						type='text'
						placeholder='Non-Profit Name*'
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

					<select
						onChange={e => setDonationCurrency(e.target.value)}
						required
						defaultValue='defaultOption'
					>
						<option disabled hidden value='defaultOption'>
							Donation Currency*
						</option>
						{currencies &&
							currencies.map(currency => (
								<option value={currency}>{currency}</option>
							))}
					</select>

					<textarea
						placeholder='Description'
						required
						onChange={e => setDescription(e.target.value)}
						value={description}
					/>

					<button className='button-orange'>Next</button>
				</form>
			)}

			{/* Registration step 2 */}
			{step == 2 && (
				<form className={styles.form} onSubmit={handleForm2}>
					<input
						type='text'
						placeholder='Non-Profit ID*'
						required
						onChange={e => setNgoId(e.target.value)}
						value={ngoId}
					/>
					{/* <input type='date' placeholder='Date of Formation*' required /> */}
					<input
						type='text'
						placeholder='Name of Primary Contact*'
						required
						onChange={e => setPrimaryContactName(e.target.value)}
						value={primaryContactName}
					/>
					<input
						type='text'
						placeholder='Non Profit Website*'
						required
						onChange={e => setWebsite(e.target.value)}
						value={website}
					/>
					<input
						type='text'
						placeholder='Business Address'
						onChange={e => setAddress(e.target.value)}
						value={address}
					/>

					<textarea
						className={styles.twoColumnInput}
						placeholder='Donation Information'
						required
						onChange={e => setDonationInformation(e.target.value)}
						value={donationInformation}
					/>

					<div className={styles.uploadFile}>
						{photoError ? <p>{photoError}</p> : <p>Upload Photo</p>}
						<input
							type='file'
							accept='image/png, image/jpeg'
							onChange={handleFileChange}
						/>
					</div>

					<div className={`${styles.twoColumnInput} buttons-row`}>
						<button onClick={() => setStep(1)}>Back</button>
						<button className={'button-orange'}>Save</button>
					</div>
				</form>
			)}
		</>
	)
}

export default EditNgoInfo
