// head element
import Head from 'next/head'

// components
import ProfileUI from '@/components/profile/ProfileUI'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/router'

const profile = () => {
	const { user } = useAuthContext()

	// router
	const router = useRouter()

	!user && router.push('/')

	return (
		<>
			<Head>
				<title>Changements | Profle</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			{user && (
				<main>
					<ProfileUI />
				</main>
			)}
		</>
	)
}

export default profile
