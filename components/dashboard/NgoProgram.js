// styles
import styles from '@/styles/Dashboard.module.scss'
import portfolioStyles from '@/styles/Portfolio.module.scss'

// components
import Image from 'next/image'

// hooks
import { useCurrency } from '@/hooks/useCurrency'

const NgoProgram = ({
	setOpenProgram,
	activeProgram: program,
	openEditForm,
	deleteOpenProgram,
	user
}) => {
	// Currencies
	const { convert } = useCurrency()

	return (
		<>
			{program && (
				<div className={styles.openProject}>
					<button className='button-back' onClick={() => setOpenProgram(false)}>
						<div className='button-arrow'></div>
						Back
					</button>

					<div className={styles.openProjectTitle}>
						<h3>{program.name}</h3>
						<div className={styles.cardButtons}>
							<button
								className='button-simple'
								onClick={() => openEditForm(program)}
							>
								Edit
							</button>
							<button
								style={{ color: '#9A031E' }}
								className='button-simple'
								onClick={deleteOpenProgram}
							>
								Delete
							</button>
						</div>
					</div>
					<div className={`${styles.openProjectContent} sectionContainer`}>
						<div className={portfolioStyles.programPhoto}>
							<Image
								src={program.photoUrl}
								fill
								quality={100}
								sizes='(max-width: 768px) 100vw, 768px'
								style={{ objectFit: 'cover' }}
								alt='Section Image'
								priority={true}
								as='img'
							/>
						</div>

						<div className={portfolioStyles.programContent}>
							<div className={portfolioStyles.programInfo}>
								<div className={portfolioStyles.programHighlights}>
									<div>
										<h2 className='dark-orange'>
											{program.fundsRequired}
											<span style={{ fontSize: '1rem' }}>
												{program.currency}
											</span>
										</h2>
										<p>Funds Required</p>
									</div>
									<div>
										<h2 className='orange'>
											{program.fundsFulfilled}
											<span style={{ fontSize: '1rem' }}>
												{program.currency}
											</span>
										</h2>
										<p>Funds Fulfilled</p>
									</div>
									<div>
										<h2 className='red'>
											{program.fundsRequired - program.fundsFulfilled}
											<span style={{ fontSize: '1rem' }}>
												{program.currency}
											</span>
										</h2>
										<p>Funds Fulfilled</p>
									</div>
								</div>

								<p>{program.description}</p>

								{program.pledges.length > 0 && (
									<>
										<h4>Donors</h4>
										<div className={styles.donorsList}>
											{program.pledges.map(pledge => (
												<div className={styles.donorCard} key={pledge.donorId}>
													<div className={styles.donorCardHeader}>
														<div className={styles.donorCardPhoto}>
															<Image
																src={pledge.donorPhoto}
																fill
																quality={100}
																sizes='(max-width: 768px) 100vw, 768px'
																style={{ objectFit: 'cover' }}
																alt='Donor Profile Image'
																priority={true}
																as='img'
															/>
														</div>

														<button className='button-simple'>
															{pledge.donorName}
														</button>
													</div>
													<div className={styles.donorCardPledges}>
														<p>
															Total Pledge:{' '}
															<b>
																{Math.floor(
																	pledge.amount *
																		convert(
																			pledge.donorCurrency,
																			program.currency
																		)
																)}{' '}
																{program.currency}
															</b>
														</p>

														<p>
															Fulfilled Pledge: <b>2 {program.currency}</b>
														</p>

														<p>
															Pending Pledge: <b>1 {program.currency}</b>
														</p>
													</div>
												</div>
											))}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default NgoProgram
