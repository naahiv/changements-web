// components
import Image from 'next/image'
import Button from './Button'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/changements-firebase.appspot.com/o/photos%2FdefaultPodcastImage.jpg?alt=media&token=c9511146-bbe8-45cc-8a35-5b3f34a696a0'

const PodcastCard = ({ name, date, blurb, episode, image, action, lessColumns}) => {
	return (
		<div style={{gridColumn: lessColumns ? 'span 3' : 'span 4', cursor: 'pointer'}} onClick={action}>
			<div className='card-photo'>
				<Image
					src={image ? image : defaultImage}
					fill
					quality={80}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Section Image'
					priority={true}
					as='img'
				/>
			</div>

			<div className='card-text' style={{margin: '0.7rem 0', gap: '0.1rem'}}>
				<p className='subtitle' style={{color: '#999999'}}>{date}</p>
				<h4>{name}</h4>
				<p className='subtitle'>{blurb}</p>
			</div>
		</div>
	)
}


export default PodcastCard
