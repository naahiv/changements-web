// head element
import Head from 'next/head'

// components
import DashboardUI from '@/components/dashboard/DashboardUI'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const dashboard = () => {
	const { user } = useAuthContext()

	// router
	const router = useRouter()

	!user && router.push('/')

	return (
		<>
			<Head>
				<title>Changements | Dashboard</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			{user && (
				<main>
					<DashboardUI />
				</main>
			)}
		</>
	)
}

export default dashboard
