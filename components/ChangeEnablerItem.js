// styles
import styles from '@/styles/Portfolio.module.scss'
import podcastStyles from '@/styles/Podcasts.module.scss'

// hooks
import { useState } from 'react'

// components
import Image from 'next/image'

const ChangeEnablerItem = ({ pod }) => {
	const [showSpeech, setShowSpeech] = useState(false)

	const speechBubble = pod.message && (
		<div 
			className={podcastStyles.headText}
			style={{display: showSpeech ? 'block' : 'none'}}
			onMouseEnter={(e) => {setShowSpeech(true)}}
			onMouseLeave={(e) => {setShowSpeech(false)}}
		>
		   <img
				width={220}
				src='/speech-bubble.png'
		  	/>
			<div className={podcastStyles.imageText}>
				<p style={{fontSize: '0.82rem', lineHeight: '0.8rem'}}>{pod.message}</p>
			</div>
		</div>
	)

	return (
		<div className={podcastStyles.overallContainer}>
		<div 
			key={pod.id}
			className={styles.pod}
			onMouseEnter={(e) => {setShowSpeech(true)}}
			onMouseLeave={(e) => {setShowSpeech(false)}}
		>
			<div className={styles.podImage}>
				<Image
					src={pod.photoUrl}
					fill
					quality={100}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Pod Photo'
					priority={true}
					as='img'
				/>
			</div>
			<div>
				<h5>{pod.name}</h5>
				<p>{pod.description}</p>
			</div>
		</div>
	
		{pod.message && (
			<div className={podcastStyles.speechContainer}>
				{speechBubble}
			</div>
		)}
		</div>
	)
}

export default ChangeEnablerItem
