// styles
import dashboardStyles from '@/styles/Dashboard.module.scss'


// components
import SectionTitle from './SectionTitle'
import Card from './Card'

const CardsSection = ({ title, content, folder, buttonText, contentful, adminFlag, titleButton, titleButtonAction}) => {
	const prettyType = (type) => {
		if (type == 'ngo') return 'NGO'
		else if (type == 'donor') return 'Donor'
		else return null
	}
	return (
		<section>
			{title && (
				<div className={`titleContainer ${dashboardStyles.dashboardHeader}`}>
					<SectionTitle>{title}</SectionTitle>
					{titleButton && (
						<button className='button-orange' onClick={titleButtonAction}>{titleButton}</button>
					)}
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
							subtitle={adminFlag ? prettyType(item.type) : item.subtitle}
							owner={item.owner}
							text={item.description}
							photo={item.photoUrl ? item.photoUrl : item.imageUrl}
							buttonText={buttonText}
							buttonUrl={`/${folder}/${item.id}`}
							tagline={adminFlag ? item.email : item.tagline }
						/>
					))}

				{contentful &&
					contentful.map(item => (
						<Card
							key={item.sys.id}
							title={item.fields.title}
							subtitle={item.sys.createdAt.slice(0, -14)}
							photo={
								item.fields.image
									? 'https:' + item.fields.image.fields.file.url
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
