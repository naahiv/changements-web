// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'

// hooks
import { useState } from 'react'
import { useSignup } from '@/hooks/useSignup'

const register = () => {
	const { signup, error, isPending } = useSignup()

	// form values
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [operatingCurrency, setOperatingCurrency] = useState('')
	const [address, setAddress] = useState('')
	const [photo, setPhoto] = useState(null)
	const [photoError, setPhotoError] = useState(null)

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()
		signup(email, password, name, photo, {
			type: 'donor',
			phone: phone,
			operatingCurrency: operatingCurrency,
			address: address
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
			<Head>
				<title>Changements | Become a Donor</title>
				<meta
					name='description'
					content='We are a group of professionals committed to making a lasting impact for a happier, healthier and just world.​ A few cups of coffee can make all the difference.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				<section>
					<SectionContainer marginTop={true} title='Donor Registration'>
						<p className={styles.description}>
							Enter your information here in order to join Donor Pods, find your
							favorite Non-profit and begin the journey of change.
						</p>

						{/* {error && <p>{error}</p>} */}

						<form className={styles.form} onSubmit={handleSubmit}>
							<input
								type='text'
								placeholder='Name*'
								required
								onChange={e => setName(e.target.value)}
								value={name}
							/>
							<input
								type='email'
								placeholder='Email*'
								required
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
							<input
								type='phone'
								placeholder='Phone*'
								required
								onChange={e => setPhone(e.target.value)}
								value={phone}
							/>
							<input
								type='password'
								placeholder='Password*'
								required
								onChange={e => setPassword(e.target.value)}
								value={password}
							/>
							<input
								type='text'
								placeholder='Operating Currency*'
								required
								onChange={e => setOperatingCurrency(e.target.value)}
								value={operatingCurrency}
							/>
							<input
								className={styles.twoColumnInput}
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
									required
									onChange={handleFileChange}
								/>
							</div>

							<button className='button-orange'>
								{isPending ? 'Loading' : 'Register'}
							</button>
						</form>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default register
