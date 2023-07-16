// router
import { useRouter } from 'next/router'

const SectionContainer = ({ children, back, marginTop }) => {
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
			{children}
		</section>
	)
}

export default SectionContainer
