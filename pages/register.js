// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'

const register = () => {
	return (
		<>
			<Head>
				<title>Changements | Register</title>
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
							<SectionTitle>Register</SectionTitle>

							<div className={styles.registerButtons}>
								<Button url='/register-ngo' color='orange'>
									Register a NGO
								</Button>

								<Button url='/register-donor'>Become a Doner</Button>
							</div>

							<Button url='/login' color='simple'>
								Login
							</Button>
						</div>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default register
