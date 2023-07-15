// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// components
import Contact from '@/components/Contact'

// temp lists
import { programs } from '@/temp/listPlaceholders'

const Program = () => {
	const router = useRouter()
	const { slug } = router.query

	const program = programs.find(
		program => program.title.toLowerCase().replace(/\s+/g, '-') === slug
	)

	return (
		<>
			<Head>
				<title>{program && `Changements | ${program.title}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default Program
