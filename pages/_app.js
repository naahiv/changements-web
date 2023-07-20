// STYLES

// global styles
import '@/styles/globals.scss'

// section styles
import '@/styles/sections.scss'

// button styles
import '@/styles/buttons.scss'

// components
import Layout from '@/components/Layout'

// context
import { AuthContextProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContextProvider>
	)
}
