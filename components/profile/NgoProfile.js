// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'
import SectionContainer from '@/components/SectionContainer'
import EditNgoInfo from './EditNgoInfo'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useState } from 'react'

const NgoProfile = ({ user }) => {
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

							{/* NGO Info */}
							<div className={styles.donorProfileColumn}>
								<h5>About NGO</h5>
								<p>{document.description}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>Contact Info</h5>
								<p>{document.primaryContactName}</p>
								<p>{document.phone}</p>
								<p>{document.email}</p>
								<p>{document.website}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>NGO Address</h5>
								<p>{document.address}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>NGO ID</h5>
								<p>{document.ngoId}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>Donation Information</h5>
								<p>{document.donationInformation}</p>
							</div>
							<div className={styles.donorProfileColumn}>
								<h5>Operating Currency</h5>
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
							<EditNgoInfo data={document} setShowForm={setShowForm} />
						</SectionContainer>
					)}
				</>
			)}
		</>
	)
}

export default NgoProfile
