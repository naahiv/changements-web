import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'] })

// Components
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
	return (
		<main className={lora.className}>
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default Layout
