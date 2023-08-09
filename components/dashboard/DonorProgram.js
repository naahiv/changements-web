// styles
import styles from '@/styles/Dashboard.module.scss'
import portfolioStyles from '@/styles/Portfolio.module.scss'

// components

import Image from 'next/image'

const DonorProgram = ({ activeProgram: program }) => {
	return (
		<>
			{program && (
				<div className={styles.openProject}>
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
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default DonorProgram
