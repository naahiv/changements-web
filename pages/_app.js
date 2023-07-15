// STYLES

// global styles
import '@/styles/globals.scss'

// section styles
import '@/styles/sections.scss'

// button styles
import '@/styles/buttons.scss'

// components
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
