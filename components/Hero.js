// styles
import styles from '@/styles/Homepage.module.scss'

// components
import Image from 'next/image'
import Button from './Button'

const Hero = ({ user }) => {
	return (
		<section className={styles.hero}>
			<Image
				src='/hero.jpg'
				fill
				quality={100}
				style={{ objectFit: 'cover' }}
				alt='Image of children from India'
				priority={true}
				as='img'
			/>

			<div className={styles.heroContent}>
				<div className={styles.container}>
					<h1>Together you can make a world of difference</h1>

					<p>
						Bringing together Change Enablers and Change-Makers to multiply the
						impact.
					</p>

					{!user && (
						<div className='buttons-row'>
							<Button color='orange' url='/register'>
								Register a NGO
							</Button>
							<Button color='red' url='/register'>
								Become a Donor
							</Button>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default Hero
