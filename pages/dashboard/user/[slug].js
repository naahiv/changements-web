// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import CardsSection from '@/components/CardsSection'
import Contact from '@/components/Contact'
import EditProfileInfo from '@/components/profile/EditProfileInfo.js'
import NgoDashboard from '@/components/dashboard/NgoDashboard.js'
import Image from 'next/image'
import Button from '@/components/Button'
import ErrorPage from '@/components/ErrorPage.js'

// hooks
import { useCollection } from '@/hooks/useCollection'
import { useAuthContext } from '@/hooks/useAuthContext'

const NonProfit = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: programs } = useCollection('programs')
	const { documents: users } = useCollection('users')

	const document = users && users.find(usr => usr.id === slug)

	// check admin privelage
	const { user: authUser } = useAuthContext()
	const authUserDoc = authUser && users && users.find(usr => usr.id === authUser.uid)
	const authed = authUserDoc && authUserDoc.type === 'admin'

	return (
		<>
			<Head>
				<title>{document && `ImpactPlease | ${document.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{authed && (
				<>
					{document && (
						<SectionContainer marginTop={true} back={true} title='Edit Profile'>
							<EditProfileInfo data={document} />
						</SectionContainer>
					)}

					{document && document.type === 'ngo' && (
						<NgoDashboard
							user={document}
							adminFlag={true}
						/>
					)}
				</>
				)}
				
				{!authed && (
					<ErrorPage />
				)}
			</main>
		</>
	)
}

export default NonProfit
