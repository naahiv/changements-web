// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'

// hooks
import { useDocument } from '@/hooks/useDocument'

const DonorProfile = ({ activeDonor }) => {
	const { document: donor } = useDocument('users', activeDonor)

	return (
		<>
			{donor && (
				<>
					<div className={styles.donorPhoto}>
						<Image
							src={donor.photoUrl}
							fill
							quality={100}
							sizes='(max-width: 768px) 100vw, 768px'
							style={{ objectFit: 'cover' }}
							alt='Section Image'
							priority={true}
							as='img'
						/>
					</div>
					<h3>{donor.name}</h3>
					<div className={styles.donorProfileTitle}></div>
				</>
			)}
		</>
	)
}

export default DonorProfile
