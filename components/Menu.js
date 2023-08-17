// components
import Link from 'next/link'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import { useDocument } from '@/hooks/useDocument'

const Menu = ({ closeMenu }) => {
	// context
	const { user } = useAuthContext()
	const { document } = useDocument('users', user.uid)

	return (
		<>
			{document && document.type == 'ngo' && (
				<Link href='/ngo-square'>
					<li onClick={() => closeMenu()} className='nav-li'>
						NGO Square
					</li>
				</Link>
			)}

			{document && document.type == 'donor' && (
				<Link href='/donors-nook'>
					<li onClick={() => closeMenu()} className='nav-li'>
						Donor's Nook
					</li>
				</Link>
			)}
		</>
	)
}

export default Menu
