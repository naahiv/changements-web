// head element
import Head from 'next/head'

// components
import SectionContainer from '@/components/SectionContainer'
import SectionTitle from '@/components/SectionTitle'
import UserTypeSelection from '@/components/forms/UserTypeSelection'
import DonorInfoForm from '@/components/forms/DonorInfoForm'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const dashboard = () => {
	const { user } = useAuthContext()

	// router
	const router = useRouter()

	let documentData = null

	if (user) {
		const { document } = useDocument('users', user.uid)
		documentData = document
	} else {
		router.push('/')
	}

	return (
		<>
			<Head>
				<title>Changements | Dashboard</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			{documentData && (
				<main>
					<section>
						<SectionContainer marginTop={true}>
							{/* Registration */}
							{!documentData.registered && (
								<>
									{/* User type selection */}
									{!documentData.type && <UserTypeSelection />}

									{/* Donor Registration */}
									{documentData.type == 'donor' && (
										<DonorInfoForm data={documentData} />
									)}
								</>
							)}
						</SectionContainer>
					</section>
				</main>
			)}
		</>
	)
}

export default dashboard
