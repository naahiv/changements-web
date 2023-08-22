// Page Router
import { useRouter } from 'next/router'

// Head element
import Head from 'next/head'

// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'
import CardsSection from '@/components/CardsSection'
import PodSection from '@/components/PodSection'

// hooks
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'
import { useCurrency } from '@/hooks/useCurrency'
import { useAuthContext } from '@/hooks/useAuthContext'

const Program = () => {
	const { user } = useAuthContext()
	const router = useRouter()
	const { slug } = router.query

	const { documents: donorPods } = useCollection('pods')
	const { documents: programs } = useCollection('programs')

	const pod = donorPods && donorPods.find(pod => pod.id === slug)

	const podProgram =
		programs && pod && programs.find(item => item.id == pod.programId)

	return (
		<>
			<Head>
				<title>{pod && `Changements | ${pod.name}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main>
				{/* Pod Detail */}
				{pod && <PodSection pod={pod} podProgram={podProgram} user={user} />}

				{/* Other Pods Section */}
				{/* {pod && (
					<CardsSection
						title='Programs'
						content={donorPods.filter(item => item !== pod)}
						folder='portfolio/donor-pods'
						buttonText='Learn More'
					/>
				)} */}

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default Program
