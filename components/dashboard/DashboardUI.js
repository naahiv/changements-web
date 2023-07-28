// components
import Registration from '@/components/Registration'
import NgoDashboard from './NgoDashboard'

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

					{/* NGO Dashboard */}
					{document.registered && document.type == 'ngo' && (
						<NgoDashboard user={user} />
					)}
				</>
			)}
		</>
	)
}

export default DashboardUI
