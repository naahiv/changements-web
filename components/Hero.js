// styles
import styles from '@/styles/Homepage.module.scss'

// components
import Image from 'next/image'
import Button from './Button'

const Hero = () => {
	return (
		<section className={styles.hero}>
			<Image
				src='/hero.jpg'
				fill
				quality={100}
				style={{ objectFit: 'cover' }}
				alt='Image of children from India'
				priority={true}
			/>

			<div className={styles.heroContent}>
				<div className={styles.container}>
					<h1>
						Your daily Cup O'Coffee can make all the difference to change the
						world
					</h1>

					<p>
						Bringing together Change Enablers and Change-Makers to multiply the
						impact.
					</p>

					<div className={styles.buttons}>
						<Button color='orange' url=''>
							Register an NGO
						</Button>
						<Button color='red' url=''>
							Become a Donor
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
