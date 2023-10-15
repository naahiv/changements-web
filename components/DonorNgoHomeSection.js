// styles
import styles from '@/styles/Homepage.module.scss'

// components
import SectionTitle from './SectionTitle'
import Button from './Button'

const DonorNgoHomeSection = () => {
	return (
		<section>
			<div className={styles.donorNgoBackground}>
				<div className={styles.orange}></div>
				<div className={styles.darkRed}></div>
			</div>
			<div className='twoColumnSectionContainer'>
				{/* Donor */}
				<div className='columnText' style={{ background: 'none' }}>
					<SectionTitle>
						<span className='red'>Donor's</span> Nook
					</SectionTitle>
					<p>
						We are a group of professionals committed to making a lasting impact
						for a happier, healthier and just world. ​A few cups of coffee can
						make all the difference.
					</p>
					<div className='buttons-row'>
						<Button url='/donors-nook'>Learn More</Button>
						<Button color='dark-red' url='/register'>
							Become a Donor
						</Button>
					</div>
				</div>

				{/* NGO */}
				<div className='columnText' style={{ background: 'none' }}>
					<SectionTitle color='white'>
						<span className='orange'>NGO</span> Square
					</SectionTitle>
					<p className='white'>
						We are a group of professionals committed to making a lasting impact
						for a happier, healthier and just world. ​A few cups of coffee can
						make all the difference.
					</p>
					<div className='buttons-row'>
						<Button url='/ngo-square' color='white'>
							Learn More
						</Button>
						<Button color='orange' url='/register'>
							Register a NGO
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DonorNgoHomeSection
