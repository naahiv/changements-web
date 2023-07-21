// components
import SectionContainer from '@/components/SectionContainer'
import DonorInfoForm from './forms/DonorInfoForm'
import NgoInfoForm from './forms/NgoInfoForm'
import UserTypeSelection from './forms/UserTypeSelection'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const Registration = () => {
	const { user } = useAuthContext()
	const { document } = useDocument('users', user.uid)

	return (
		<>
			{document && (
				<section>
					<SectionContainer marginTop={true}>
						{!document.type && <UserTypeSelection />}

						{/* Donor Registration */}
						{document.type == 'donor' && <DonorInfoForm data={document} />}

						{/* NGO Registration */}
						{document.type == 'ngo' && <NgoInfoForm data={document} />}
					</SectionContainer>
				</section>
			)}
		</>
	)
}

export default Registration
