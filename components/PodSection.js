// styles
import styles from '@/styles/Portfolio.module.scss'

// components
import SectionContainer from '@/components/SectionContainer'
import Contact from '@/components/Contact'
import Image from 'next/image'
import PodProgramCard from './dashboard/PodProgramCard'

// hooks
import { useDocument } from '@/hooks/useDocument'
import { useCollection } from '@/hooks/useCollection'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'
import { useState } from 'react'

const PodSection = ({
	pod,
	user,
	backFunction,
	setOpenEditForm,
	openPledgeForm,
	setActivePod,
	setOpenPodsSearch
}) => {
	const { document: activeUser } = user
		? useDocument('users', user.uid)
		: useDocument('users', '123')

	const { documents: programs } = useCollection('programs')

	// Currencies
	const { convert } = useCurrency()

	// join a pod
	const { updateDocument } = useFirestore('pods')

	const joinPod = async () => {
		await updateDocument(pod.id, {
			members: [...pod.members, activeUser.id],
			invites: pod.invites.filter(invite => invite != activeUser.email)
		})
		setActivePod(null)
		setOpenPodsSearch(false)
	}

	// inviting to a pod
	const [showInviteForm, setShowInviteForm] = useState(false)
	const [inviteEmail, setInviteEmail] = useState('')

	const sendInvite = async e => {
		e.preventDefault()

		await updateDocument(pod.id, {
			invites: [...pod.invites, inviteEmail]
		})
		setShowInviteForm(false)
		setInviteEmail('')
	}

	return (
		<SectionContainer
			back={true}
			marginTop={true}
			title={pod.name}
			backFunction={backFunction}
		>
			<div className={styles.programPhoto}>
				<Image
					src={pod.photoUrl}
					fill
					quality={100}
					sizes='(max-width: 768px) 100vw, 768px'
					style={{ objectFit: 'cover' }}
					alt='Section Image'
					priority={true}
					as='img'
				/>
			</div>

			<div className={styles.programContent}>
				<div className={styles.programInfo}>
					{activeUser && (
						<div className='buttons-row'>
							{pod.members.includes(activeUser.id) || (
								<button onClick={joinPod} className='button-orange'>
									Join Pod
								</button>
							)}

							{pod.ownerId == activeUser.id && (
								<>
									{/* Sending Invitation */}
									{showInviteForm && (
										<>
											<form className={styles.inviteForm} onSubmit={sendInvite}>
												<input
													type='email'
													placeholder='Email Address'
													onChange={e => setInviteEmail(e.target.value)}
													required
												/>
												<button className='button-orange' value={inviteEmail}>
													Send
												</button>
											</form>
											<button
												className='button-gray'
												onClick={() => setShowInviteForm(false)}
											>
												Cancel
											</button>
										</>
									)}
									{!showInviteForm && (
										<>
											<button
												className='button-orange'
												onClick={() => setShowInviteForm(true)}
											>
												Invite
											</button>

											<button onClick={() => setOpenEditForm(true)}>
												Edit Pod
											</button>
										</>
									)}
								</>
							)}
						</div>
					)}

					<p>{pod.description}</p>

					<div>
						{programs &&
							programs
								.filter(item =>
									pod.programs.some(item2 => item2.programName == item.name)
								)
								.map(program => (
									<PodProgramCard
										key={program.id}
										program={program}
										activeUser={activeUser}
										openPledgeForm={openPledgeForm}
										pod={pod}
										// members={members}
									/>
								))}
					</div>
				</div>
				{/* <div className={styles.programPods}></div> */}
			</div>
		</SectionContainer>
	)
}

export default PodSection
