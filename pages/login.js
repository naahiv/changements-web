// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import SectionTitle from '@/components/SectionTitle'
import LoginRegisterForm from '@/components/forms/LoginRegisterForm'

// hooks
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'

const login = () => {
	// context
	const { user } = useAuthContext()

	// router
	const router = useRouter()

	useEffect(() => {
		user && router.push('/dashboard')
	}, [user])

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

							<LoginRegisterForm type='Login' />
						</div>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default login
