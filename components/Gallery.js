// styles
import styles from '@/styles/Homepage.module.scss'

// components
import Image from 'next/image'

// hooks
import { useState } from 'react'

const Gallery = ({ images }) => {
	const [firstImage, setFirstImage] = useState(0)
	const [lastImage, setLastImage] = useState(4)

	const nextImg = () => {
		if (images.length > lastImage) {
			setFirstImage(prevState => prevState + 1)
			setLastImage(prevState => prevState + 1)
		}
	}

	const prevImg = () => {
		if (firstImage > 0) {
			setFirstImage(prevState => prevState - 1)
			setLastImage(prevState => prevState - 1)
		}
	}

	return (
		<section className={styles.gallery}>
			<div className={styles.arrowLeft} onClick={prevImg}>
				<Image
					src={'./left.svg'}
					width={15}
					height={30}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Arrow Left'
					priority={false}
					as='img'
				/>
			</div>
			<div className={styles.arrowRight} onClick={nextImg}>
				<Image
					src={'./right.svg'}
					width={15}
					height={30}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Arrow Left'
					priority={false}
					as='img'
				/>
			</div>
			{images.slice(firstImage, lastImage).map(image => (
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
		</section>
	)
}

export default Gallery
