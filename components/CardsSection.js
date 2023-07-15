// components
import SectionTitle from './SectionTitle'
import Card from './Card'

const CardsSection = ({ title, content, folder }) => {
	return (
		<section>
			{title && (
				<div className='titleContainer'>
					<SectionTitle>{title}</SectionTitle>
				</div>
			)}
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
							buttonUrl={`/${folder}/${item.title
								.toLowerCase()
								.replace(/\s+/g, '-')}`}
						/>
					))}
			</div>
		</section>
	)
}

export default CardsSection
