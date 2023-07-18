// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

const login = () => {
	return (
		<>
			<Head>
				<title>Changements | Login</title>
				<meta
					name='description'
					content='We are a group of professionals committed to making a lasting impact for a happier, healthier and just world.​ A few cups of coffee can make all the difference.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				<section>
					<SectionContainer marginTop={true}>
						<div className={styles.authContainer}>
							<SectionTitle>Login</SectionTitle>
							<form>
								<input
									type='email'
									id='emailAddress'
									name='emailAddress'
									placeholder='Email Address'
									required
								/>

								<input
									type='password'
									id='password'
									name='password'
									placeholder='Password'
									required
								/>

								<div className={styles.loginButtons}>
									<button className='button-orange'>Login</button>
									<Button url='/register' color='simple'>
										Register
									</Button>
								</div>
							</form>
						</div>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default login
