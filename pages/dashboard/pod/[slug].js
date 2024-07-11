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
import Image from 'next/image'
import Button from '@/components/Button'
import ErrorPage from '@/components/ErrorPage.js'
import EditPodForm from '@/components/forms/EditPodForm.js'

// hooks
import { useCollection } from '@/hooks/useCollection'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useFirestore } from '@/hooks/useFirestore'

const NonProfit = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: programs } = useCollection('programs')
	const { documents: pods } = useCollection('pods')
	const { documents: users } = useCollection('users')

	const pod = pods && pods.find(pod => pod.id === slug)

	// check admin privelage
	const { user: authUser } = useAuthContext()
	const authUserDoc = authUser && users && users.find(usr => usr.id === authUser.uid)
	const authed = authUserDoc && authUserDoc.type === 'admin'

	// firestore
	const { deleteDocument } = useFirestore('pods')

	const deleteButtonClicked = () => {
		console.log('deleting Change Enabler')
		deleteDocument(pod.id)
		router.push('/dashboard')
	}

	return (
		<>
			<Head>
				<title>{pod && `ImpactPlease | ${pod.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>

				{authed && (
				<>

				{/* Pod Detail */}
				<SectionContainer
					back={true}
					marginTop={true}
					title="Pod Details"
				>
				
				{/* Edit a Change Enabler */}
				{pod && pod.specialty && (
				<>
					<EditPodForm
						activePod={pod}
						adminFlag={true}
					/>
					<button style={{gridColumn: 'span 2'}}className='button-red' onClick={deleteButtonClicked}>Delete Change Enabler</button>
				</>
				)}

				{/* Edit an actual Pod */}
				{pod && !pod.specialty && (
					<p style={{
						gridColumn: 'span 12',
						fontSize: 'large'
					}}>Sorry! You cannot edit pods, only standalone Change Enablers</p>
				)}
				</SectionContainer>

				</>)}

				{!authed && (
					<ErrorPage />
				)}
			</main>
		</>
	)
}

export default NonProfit
