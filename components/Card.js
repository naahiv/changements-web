// componenets
import Image from 'next/image'
import Button from './Button'

const Card = ({ title, subtitle, text, photo, buttonText, buttonUrl }) => {
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
					priority={false}
					loading='lazy'
					as='img'
				/>
			</div>
			<div className='card-text'>
				<div>
					{subtitle && <p className='subtitle'>{subtitle}</p>}
					<h4>{title}</h4>
				</div>
				{text && <p>{text.slice(0, 130)}</p>}
			</div>
			<Button url={buttonUrl} color='simple'>
				{buttonText}
			</Button>
		</div>
	)
}

export default Card
