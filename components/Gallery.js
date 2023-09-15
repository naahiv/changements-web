// styles
import styles from '@/styles/Homepage.module.scss'

// components
import Image from 'next/image'

// hooks
import { useState } from 'react'

const Gallery = ({ images }) => {
	const [maxPhotos, setMaxPhotos] = useState(8)

	return (
		<section className={styles.gallery}>
			{images.slice(0, maxPhotos).map(image => (
				<div key={image.sys.id} className={styles.galleryImageContainer}>
					<Image
						src={'https:' + image.fields.file.url}
						fill
						quality={80}
						sizes='(max-width: 768px) 100vw, 768px'
						style={{ objectFit: 'cover' }}
						alt='Section Image'
						priority={false}
						as='img'
					/>
				</div>
			))}
			<div style={{ width: '100%' }}>
				<p
					className={styles.moreButton}
					onClick={() => setMaxPhotos(prevState => prevState + 4)}
				>
					Show More
				</p>
			</div>
		</section>
	)
}

export default Gallery
