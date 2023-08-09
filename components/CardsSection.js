// components
import SectionTitle from './SectionTitle'
import Card from './Card'

const CardsSection = ({ title, content, folder, buttonText }) => {
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
							// key={item.id}
							key={index}
							name={item.name}
							title={item.title}
							subtitle={item.subtitle}
							owner={item.owner}
							text={item.description}
							photo={item.photoUrl}
							buttonText={buttonText}
							buttonUrl={`/${folder}/${item.id}`}
						/>
					))}
			</div>
		</section>
	)
}

export default CardsSection
