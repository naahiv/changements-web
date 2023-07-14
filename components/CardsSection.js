// components
import SectionTitle from './SectionTitle'
import Card from './Card'

const CardsSection = ({ title, content }) => {
	return (
		<section>
			<div className='titleContainer'>
				<SectionTitle>{title}</SectionTitle>
			</div>
			<div className='sectionContainer'>
				{content &&
					content.map((item, index) => (
						<Card
							key={index}
							title={item.title}
							subtitle={item.subtitle}
							text={item.text}
							photo={item.photo}
							buttonText={item.buttonText}
							buttonUrl={item.buttonUrl}
						/>
					))}
			</div>
		</section>
	)
}

export default CardsSection
