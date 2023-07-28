// componenets
import Image from 'next/image'
import Button from './Button'

const Card = ({
	title,
	name,
	subtitle,
	owner,
	text,
	photo,
	buttonText,
	buttonUrl
}) => {
	return (
		<div className='card'>
			<div className='card-photo'>
				<Image
					src={photo}
					fill
					quality={80}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Section Image'
					priority={true}
					as='img'
				/>
			</div>
			<div className='card-text'>
				<div>
					{subtitle && <p className='subtitle'>{subtitle}</p>}
					{owner && <p className='subtitle'>{owner}</p>}
					{title && <h4>{title}</h4>}
					{name && <h4>{name}</h4>}
				</div>
				{text && <p>{text.slice(0, 30)}...</p>}
			</div>
			<Button url={buttonUrl} color='simple'>
				{buttonText}
			</Button>
		</div>
	)
}

export default Card
