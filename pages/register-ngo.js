// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'

// hooks
import { useState } from 'react'

const register = () => {
	const [registrationStep, setRegistrationStep] = useState(1)

	const regStepOne = e => {
		e.preventDefault()

		setRegistrationStep(2)
	}

	return (
		<>
			<Head>
				<title>Changements | Register a NGO</title>
				<meta
					name='description'
					content='We are a group of professionals committed to making a lasting impact for a happier, healthier and just world.​ A few cups of coffee can make all the difference.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				<section>
					<SectionContainer marginTop={true} title='NGO Registration'>
						<p className={styles.description}>
							Enter NGO Information here, that will help prospective donors
							browse our Portfolio.
						</p>

						{/* Registration step 1 */}
						<form className={styles.form} onSubmit={regStepOne}>
							{registrationStep == 1 ? (
								<>
									{/* Registration step 1 */}
									<input type='text' placeholder='Non-Profit Name*' required />
									<input type='email' placeholder='Email*' required />
									<input type='phone' placeholder='Phone*' required />
									<input type='password' placeholder='Password*' required />
									<input
										type='text'
										placeholder='Operating Currency*'
										required
									/>

									<input
										type='text'
										placeholder='Donation Currency*'
										required
									/>
									<input
										className={styles.twoColumnInput}
										type='text'
										placeholder='Business Address'
									/>

									<textarea placeholder='Description' required />

									<button className='button-orange'>Next</button>
								</>
							) : (
								<>
									{/* Registration step 2 */}
									<input type='text' placeholder='Non-Profit ID*' required />
									<input
										type='date'
										placeholder='Date of Formation*'
										required
									/>
									<input
										type='text'
										placeholder='Name of Primary Contact*'
										required
									/>
									<input
										type='text'
										placeholder='Non Profit Website*'
										required
									/>

									<textarea
										className={styles.twoColumnInput}
										placeholder='Description'
										required
									/>

									<div className={styles.uploadFile}>
										<p>Upload Photo</p>
										<input type='file' accept='image/png, image/jpeg' />
									</div>

									<div className={`${styles.twoColumnInput} buttons-row`}>
										<button onClick={() => setRegistrationStep(1)}>Back</button>
										<button className={'button-orange'}>Next</button>
									</div>
								</>
							)}
						</form>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default register
