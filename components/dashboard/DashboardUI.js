// components
import Registration from '@/components/Registration'
import NgoDashboard from './NgoDashboard'
import DonorDashboard from './DonorDashboard'
import Verification from './Verification'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const DashboardUI = () => {
	const { user } = useAuthContext()
	const { document } = useDocument('users', user.uid)

	return (
		<>
			{document && (
				<>
					{/* Registration process */}
					{document.online && !document.registered && <Registration />}

					{/* Verification */}
					{document.registered && !user.emailVerified ? (
						<Verification />
					) : (
						<>
							{/* NGO Dashboard */}
							{document.registered && document.type == 'ngo' && (
								<NgoDashboard user={document} />
							)}

							{/* Donor Dashboard */}
							{document.registered && document.type == 'donor' && (
								<DonorDashboard user={document} />
							)}
						</>
					)}
				</>
			)}
		</>
	)
}

export default DashboardUI
