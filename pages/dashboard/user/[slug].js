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
import PledgeEditor from '@/components/dashboard/PledgeEditor.js'

// hooks
import { useCollection } from '@/hooks/useCollection'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useEffect } from 'react'

const NonProfit = () => {
	const router = useRouter()
	const { slug } = router.query
	const { documents: programs } = useCollection('programs')
	const { documents: users } = useCollection('users')


	// handle shift keypress
	const shiftHandler = (setDeleteAllowed) => {
		useEffect(() => {
			const keyDownHandler = (e) => {
				if (e.code == 'ControlLeft') {
					setDeleteAllowed(true)
				}
			}

			const keyUpHandler = (e) => {
				if (e.code == 'ControlLeft') {
					setDeleteAllowed(false)
				}
			}
			document.addEventListener("keydown", keyDownHandler)
			document.addEventListener("keyup", keyUpHandler)

			// clean up
			return () => {
			  document.removeEventListener("keydown", keyDownHandler)
			  document.removeEventListener("keyup", keyUpHandler)
			}
		  }, [])
	}

	const userDoc = users && users.find(usr => usr.id === slug)

	// check admin privelage
	const { user: authUser } = useAuthContext()
	const authUserDoc = authUser && users && users.find(usr => usr.id === authUser.uid)
	const authed = authUserDoc && authUserDoc.type === 'admin'

	return (
		<>
			<Head>
				<title>{userDoc && `ImpactPlease | ${userDoc.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{authed && (
				<>
					{/* User profile data editor */}
					{userDoc && (
						<SectionContainer marginTop={true} back={true} title='Edit Profile'>
							<EditProfileInfo data={userDoc} specialKeypress={shiftHandler}/>
						</SectionContainer>
					)}

					{/* if an NGO, edit programs */}
					{userDoc && userDoc.type === 'ngo' && (
						<NgoDashboard
							user={userDoc}
							adminFlag={true}
						/>
					)}


					{/* if a donor, edit pledges */}
					{userDoc && userDoc.type === 'donor' && (
						<PledgeEditor user={userDoc}/>
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
