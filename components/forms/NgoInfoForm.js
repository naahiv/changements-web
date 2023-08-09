// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useStorage } from '@/hooks/useStorage'
import { useCurrency } from '@/hooks/useCurrency'

// currencies
const BASE_URL =
	'http://api.exchangeratesapi.io/v1/latest?access_key=1bc0b9b89f46f8b00412ef839178199d&symbols=USD,INR,GBP'

const NgoInfoForm = ({ data }) => {
	// firestore
	const { updateDocument } = useFirestore('users')
	const { uploadFile } = useStorage('photos')

	// form values
	const [name, setName] = useState('')
	const [primaryContactName, setPrimaryContactName] = useState('')
	const [phone, setPhone] = useState('')
	const [operatingCurrency, setOperatingCurrency] = useState('')
	const [donationCurrency, setDonationCurrency] = useState('')
	const [description, setDescription] = useState('')
	const [donationInformation, setDonationInformation] = useState('')
	const [ngoId, setNgoId] = useState('')
	const [address, setAddress] = useState('')
	const [website, setWebsite] = useState('')
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
			<p className={styles.description}>
				Enter NGO Information here, that will help prospective donors browse our
				Portfolio.
			</p>

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

export default NgoInfoForm
