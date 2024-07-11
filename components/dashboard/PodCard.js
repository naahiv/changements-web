// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'
import Button from '../Button'

// hooks
import { useCurrency } from '@/hooks/useCurrency'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'

const PodCard = ({ name, photoUrl, description, setActivePod, pod, user }) => {
	// console.log(pod);
	const { documents: programs } = useCollection('programs')

	// documents && console.log(documents.find(pledge => pledge.donorId == user.id))

	// Currencies
	const { convert } = useCurrency()

	return (
		<>
			<div className={styles.card}>
				<div className={styles.cardPhoto}>
					<Image
						src={photoUrl ? photoUrl : '/indian-girl.jpg'}
						fill
						quality={80}
						sizes='(max-width: 768px) 100vw, 768px'
						style={{ objectFit: 'cover' }}
						alt='Section Image'
						priority={true}
						as='img'
					/>
				</div>

				<div className={styles.cardContent}>
					<div onClick={setActivePod} className={styles.cardTitle}>
						<h4>{name}</h4>
					</div>

					<p style={{ marginBottom: '1rem' }}>{description}</p>

					<div className='buttons-row'>
						{pod.ownerId == user.id && (
							<Button color='orange' buttonFunction={setActivePod}>
								Invite Members
							</Button>
						)}

						<Button color='orange' url='/portfolio'>
							Make a Pledge
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default PodCard
