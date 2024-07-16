import styles from '@/styles/Podcasts.module.scss'

const SpeechBubble = ({ message, setShowSpeech }) => {

	return (
		<div 
			className={styles.headText}
			style={{display: showSpeech ? 'block' : 'none'}}
			onMouseEnter={(e) => {setShowSpeech(true)}}
			onMouseLeave={(e) => {setShowSpeech(false)}}
		>
		   <img
				width={220}
				src='/speech-bubble.png'
		  	/>
			<div className={styles.imageText}>
				<p style={{fontSize: '0.82rem', lineHeight: '0.8rem'}}>{message}</p>
			</div>
		</div>
	)
}

export default SpeechBubble
