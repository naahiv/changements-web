// styles
import styles from '@/styles/Dashboard.module.scss'

// components
import Image from 'next/image'
import Link from 'next/link'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'
import { useState } from 'react'

const DonorProfile = ({
	activeDonor,
	activeProgram: program,
	setOpenDonor,
	user
}) => {
	const [showEdit, setShowEdit] = useState(false)
	const [fulfilledPledge, setFulfilledPledge] = useState()

	const { document: donor } = useDocument('users', activeDonor)
	const { documents: pledges } = useCollection(`programs/${program.id}/pledges`)

	// firestore
	const { updateDocument } = useFirestore('programs')
	const { deleteDocument } = useFirestore(`programs/${program.id}/pledges`)
	const { updateDocument: updatePledge } = useFirestore(
		`programs/${program.id}/pledges`
	)

	// Currencies
	const { convert } = useCurrency()

	const pledge =
		donor && pledges && pledges.find(pledge => pledge.donorId == donor.id)

	const removeDonor = () => {
		updateDocument(program.id, {
			pledges: program.pledges.filter(pledge => pledge.donorId != donor.id)
		})

		deleteDocument(pledge.id)

		setOpenDonor(false)
	}

	// defining weather it's ngo or donor view
	const displayedUser = user.type == 'ngo' ? donor : user

	// updating fulfilled pledge
	const updateFulfilledPledge = () => {
		updatePledge(pledge.id, {
			fulfilledAmount: fulfilledPledge
		})

		// updateDocument(program.id, {
		// 	fundsFulfilled: program.fundsFulfilled + Number(fulfilledPledge)
		// })

		setShowEdit(false)
	}

	return (
		<>
			{displayedUser && (
				<>
					<div className={styles.donorProfileTitleSection}>
						<div className={styles.donorTitle}>
							<div className={styles.donorPhoto}>
								<Image
									src={displayedUser.photoUrl}
									fill
									quality={100}
									sizes='(max-width: 768px) 100vw, 768px'
									style={{ objectFit: 'cover' }}
									alt='Section Image'
									priority={true}
									as='img'
								/>
							</div>
							<h3>{displayedUser.name}</h3>
						</div>
						{user.type == 'ngo' && (
							<div className={`buttons-row ${styles.profileTitleButtons}`}>
								<Link href={'mailto:' + donor.email}>
									<button className='button-orange'>Contact Donor</button>
								</Link>
								<button onClick={removeDonor}>Remove Donor</button>
							</div>
						)}
					</div>

					{/* Pledges */}
					{user.type == 'ngo' && pledge && (
						<>
							<div className={styles.donorProfileColumn}>
								<h2 className='dark-orange'>
									{convert(
										pledge.donorCurrency,
										program.currency,
										pledge.amount
									)}
								</h2>
								<p>Total Pledge</p>
							</div>
							<div className={styles.donorProfileColumn}>
								{!showEdit && (
									<h2 className='orange'>
										{convert(
											pledge.donorCurrency,
											program.currency,
											pledge.fulfilledAmount
										)}
									</h2>
								)}

								{showEdit && (
									<input
										style={{ margin: '0.8rem 0' }}
										type='number'
										value={fulfilledPledge}
										placeholder={convert(
											pledge.donorCurrency,
											program.currency,
											pledge.fulfilledAmount
										)}
										onChange={e => setFulfilledPledge(e.target.value)}
									/>
								)}

								{!showEdit && <p>Fulfilled Pledge</p>}

								{!showEdit && (
									<button
										className='button-simple'
										onClick={() => setShowEdit(true)}
									>
										Edit
									</button>
								)}

								{showEdit && (
									<button
										className='button-simple'
										onClick={updateFulfilledPledge}
									>
										Save
									</button>
								)}
							</div>
							<div className={styles.donorProfileColumn}>
								<h2 className='red'>
									{convert(
										pledge.donorCurrency,
										program.currency,
										pledge.amount - pledge.fulfilledAmount
									)}
								</h2>
								<p>Pending Pledge</p>
							</div>
						</>
					)}

					{/* Donor Info */}
					<div className={styles.donorProfileColumn}>
						<h5>Contact Info</h5>
						<p>{displayedUser.phone}</p>
						<p>{displayedUser.email}</p>
					</div>
					<div className={styles.donorProfileColumn}>
						<h5>Donor Address</h5>
						<p>{displayedUser.address}</p>
					</div>
					<div className={styles.donorProfileColumn}>
						<h5>Preferred Donation Currency</h5>
						<p>{displayedUser.operatingCurrency}</p>
					</div>
				</>
			)}
		</>
	)
}

export default DonorProfile
