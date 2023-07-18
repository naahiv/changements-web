// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Button from '@/components/Button'

const register = () => {
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

						<form className={styles.form}>
							<input type='text' placeholder='Name*' required />
							<input type='email' placeholder='Email*' required />
							<input type='phone' placeholder='Phone*' required />
							<input type='password' placeholder='Password*' required />
							<input type='text' placeholder='Operating Currency*' required />
							<input
								className={styles.twoColumnInput}
								type='text'
								placeholder='Donor Address'
							/>

							<div className={styles.uploadFile}>
								<p>Upload Photo</p>
								<input type='file' accept='image/png, image/jpeg' />
							</div>

							<button className='button-orange'>Register</button>
						</form>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default register
