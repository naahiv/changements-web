// components
import Registration from '@/components/Registration'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const DashboardUI = () => {
	const { user } = useAuthContext()
	const { document } = useDocument('users', user.uid)

	return <>{document && <>{!document.registered && <Registration />}</>}</>
}

export default DashboardUI
