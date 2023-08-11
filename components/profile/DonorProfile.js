// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'
import EditDonorInfo from './EditDonorInfo'
import SectionContainer from '@/components/SectionContainer'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useState } from 'react'

const DonorProfile = ({ user }) => {
	const { document } = useDocument('users', user.uid)
	const [showForm, setShowForm] = useState(false)

	return (
		<>
			{document && (
				<>
					{/* Profile Information */}
					{!showForm && (
						<SectionContainer marginTop={true}>
							<div className={styles.donorProfileTitleSection}>
								<div className={styles.donorTitle}>
									<div className={styles.donorPhoto}>
										<Image
											src={document.photoUrl}
											fill
											quality={100}
											sizes='(max-width: 768px) 100vw, 768px'
											style={{ objectFit: 'cover' }}
											alt='Section Image'
											priority={true}
											as='img'
										/>
									</div>
									<h3>{document.name}</h3>
								</div>
								<div className={`buttons-row ${styles.profileTitleButtons}`}>
									<button
										className='button-orange'
										onClick={() => setShowForm(true)}
									>
										Edit Data
									</button>
									{/* <button>Delete Profile</button> */}
								</div>
							</div>

							{/* Donor Info */}
							<div className={styles.donorProfileColumn}>
								<h5>Contact Info</h5>
								<p>{document.phone}</p>
								<p>{document.email}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>Donor Address</h5>
								<p>{document.address}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>Preferred Donation Currency</h5>
								<p>{document.operatingCurrency}</p>
							</div>
						</SectionContainer>
					)}

					{/* Edit Info */}
					{showForm && (
						<SectionContainer
							marginTop={true}
							back={true}
							backFunction={() => setShowForm(false)}
							title='Edit Profile Information'
						>
							<EditDonorInfo data={document} setShowForm={setShowForm} />
						</SectionContainer>
					)}
				</>
			)}
		</>
	)
}

export default DonorProfile
