import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'] })

// Components
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
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
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default Layout
