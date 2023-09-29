// components
import SectionTitle from './SectionTitle'
import Card from './Card'

const CardsSection = ({ title, content, folder, buttonText, contentful }) => {
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

				{contentful &&
					contentful.map(item => (
						<Card
							key={item.sys.id}
							title={item.fields.title}
							subtitle={item.sys.createdAt.slice(0, -14)}
							photo={
								item.fields.photo
									? 'https:' + item.fields.photo.fields.file.url
									: null
							}
							buttonText={buttonText}
							buttonUrl={`/${folder}/${item.fields.title
								.toLowerCase()
								.replace(/\s+/g, '-')}`}
						/>
					))}
			</div>
		</section>
	)
}

export default CardsSection
