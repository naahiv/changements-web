import '@/styles/globals.scss'

// components
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
