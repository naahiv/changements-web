import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'] })

// Components
import Header from './Header'
import Footer from './Footer'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'

const Layout = ({ children }) => {
	const { user, authIsReady } = useAuthContext()

	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				minHeight: '100vh'
			}}
			className={lora.className}
		>
			{authIsReady && (
				<>
					<Header />
					{children}
					<Footer />
				</>
			)}
		</main>
	)
}

export default Layout
