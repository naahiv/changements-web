// styles
import dashboardStyles from '@/styles/Dashboard.module.scss'


// components
import SectionTitle from './SectionTitle'
import Card from './Card'

const ButtonCardSection = ({ children, title, content, folder, buttonText, adminFlag, titleButton, formOpen, titleButtonAction }) => {
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
				{formOpen ? children : (content &&
					content.map((item, index) => (
						<Card
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
					)))}

			</div>
		</section>
	)
}

export default ButtonCardSection
