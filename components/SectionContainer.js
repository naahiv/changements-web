// router
import { useRouter } from 'next/router'

// components
import SectionTitle from './SectionTitle'

const SectionContainer = ({ children, back, marginTop, title, noGap }) => {
	const router = useRouter()

	return (
		<section className={marginTop && 'section-margin-top'}>
			{back && (
				<div className='backButtonContainer'>
					<button className='button-back' onClick={() => router.back()}>
						<div className='button-arrow'></div>
						Back
					</button>
				</div>
			)}

			{title && (
				<div className='titleContainer'>
					<SectionTitle>{title}</SectionTitle>
				</div>
			)}
			<div className='sectionContainer' style={noGap && { gridGap: '0' }}>
				{children}
			</div>
		</section>
	)
}

export default SectionContainer
