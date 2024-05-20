// head element
import Head from 'next/head'

// styles
import styles from '@/styles/Login.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import SectionTitle from '@/components/SectionTitle'
import ResetPasswordForm from '@/components/forms/ResetPaswordForm'

// hooks
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/hooks/useAuthContext'

const forgotPassword = () => {
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
				<title>ImpactPlease | Reset Password</title>
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
							<SectionTitle>Reset Password</SectionTitle>

							<ResetPasswordForm />
						</div>
					</SectionContainer>
				</section>
			</main>
		</>
	)
}

export default forgotPassword
