// components

import DonorProfile from '@/components/profile/DonorProfile'
import NgoProfile from './NgoProfile'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const ProfileUI = () => {
	const { user } = useAuthContext()
	const { document } = useDocument('users', user.uid)

	return (
		<>
			{document && (
				<>
					{/* Donor Profile */}
					{document.type == 'donor' && <DonorProfile user={user} />}

					{/* NGO Profile */}
					{document.type == 'ngo' && <NgoProfile user={user} />}
				</>
			)}
		</>
	)
}

export default ProfileUI
