// components
import Link from 'next/link'

const SectionContainer = ({ children, back, backUrl, marginTop }) => {
	return (
		<section className={marginTop && 'section-margin-top'}>
			{back && (
				<div className='backButtonContainer'>
					<Link href={backUrl}>
						<button className='button-back'>
							<div className='button-arrow'></div>
							Back
						</button>
					</Link>
				</div>
			)}
			{children}
		</section>
	)
}

export default SectionContainer
