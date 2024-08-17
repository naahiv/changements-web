// componenets
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'

const Card = ({
	title,
	name,
	subtitle,
	owner,
	text,
	photo,
	buttonText,
	buttonUrl,
	buttonFunction,
	tagline,
	setShowSpeech,
	bigger
}) => {
	return (
		<div
			className='card'
			onMouseEnter={setShowSpeech && ( (e) => {setShowSpeech(true)} ) }
			onMouseLeave={setShowSpeech && ( (e) => {setShowSpeech(false)} ) }
			style={bigger && {gridColumn: 'span 4'}}
		>
			{photo && (
				<div className='card-photo'>
					<Link href={buttonUrl} style={{ width: '100%' }}>
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
					</Link>
				</div>
			)}
			<div className='card-text'>
				<div>
					<Link href={buttonUrl} style={{ width: '100%', color: 'black'}}>
					{subtitle && <p className='subtitle'>{subtitle}</p>}
					{owner && <p className='subtitle'>{owner}</p>}
					{title && <h4>{title}</h4>}
					{name && <h4>{name}</h4>}
					{tagline && <p className='subtitle'>{tagline}</p>}
					</Link>
				</div>
				{/* {text && <p>{text.slice(0, 30)}...</p>} */}
			</div>

			{/* <Button buttonFunction={buttonFunction} url={buttonUrl} color='simple'>
				{buttonText}
			</Button> */}
		</div>
	)
}

export default Card
