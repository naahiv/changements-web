// head element
import Head from 'next/head'

// components
import SectionContainer from '@/components/SectionContainer'
import DonorProfile from '@/components/dashboard/DonorProfile'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile = () => {
	const { user: loggedIn } = useAuthContext()

	// router
	const router = useRouter()

	!loggedIn && router.push('/')

	return (
		<>
			<Head>
				<title>Changements | Profle</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			{loggedIn && (
				<main>
					{loggedIn.type == 'donor' && (
						<SectionContainer marginTop={true}>test</SectionContainer>
					)}
				</main>
			)}
		</>
	)
}

export default Profile
