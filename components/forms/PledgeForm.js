// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState, useRef } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'
import { useDocument } from '@/hooks/useDocument'
import { useEmailJS } from '@/hooks/useEmailJS'
import { useRouter } from 'next/router'
import { useCollection } from '@/hooks/useCollection'

const PledgeForm = ({
	activeProgram,
	user,
	setOpenForm,
	setActiveProgram,
	setOpenSearch
}) => {

	console.log('in the pledge form thingy')

	// firestore
	const { updateDocument } = useFirestore('programs')
	const { addDocument } = useFirestore(`programs/${activeProgram.id}/pledges`)

	const { documents: pods} = useCollection('pods')

	const podFirestore = useFirestore('pods')
	const updatePods = podFirestore.updateDocument


	// router
	const router = useRouter()

	// Email JS
	const { sendEmail } = useEmailJS()

	// Owner Email
	const { document: owner } = useDocument('users', activeProgram.createdBy)

	// form values
	const [amount, setAmount] = useState('')
	const [frequency, setFrequency] = useState('')
	const [donationCurrency, setDonationCurrency] = useState(
		user.operatingCurrency
	)

	const form = useRef()

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()

		updateDocument(activeProgram.id, {
			pledges: [
				...activeProgram.pledges,
				{
					amount: amount,
					fulfilledAmount: 0,
					frequency: frequency,
					donorId: user.id,
					donorName: user.name,
					currency: donationCurrency,
					donorPhoto: user.photoUrl
				}
			]
		})

		pods.forEach((pod) => {
			if (pod.members.indexOf(user.id) >= 0) {
				updatePods(pod.id, {programs: [...pod.programs,{
					programName: activeProgram.name
				}]})
			}
		})	

		/*
		addDocument({
			// programId: activeProgram.id,
			amount: amount,
			fulfilledAmount: 0,
			frequency: frequency,
			donorId: user.id,
			donorName: user.name,
			donorCurrency: donationCurrency,
			donorPhoto: user.photoUrl
		})
		*/

		setOpenForm(false)
		setActiveProgram && setActiveProgram(null)
		setOpenSearch && setOpenSearch(false)

		// sending email
		sendEmail(form.current)

		router.push('/dashboard')	
	}

	// currencies
	const { currencies } = useCurrency()

	// Function to format the amount
	const formattedAmount = () => {
		// Remove formatting characters like commas
		const cleanedAmount = parseFloat(amount.replace(/,/g, ''))

		// Check if cleanedAmount is a valid number
		if (!isNaN(cleanedAmount)) {
			// Format the cleanedAmount and return it as a string
			return cleanedAmount.toLocaleString('en-US')
		} else {
			// If cleanedAmount is not a valid number, return an empty string or an error message
			return ''
		}
	}

	return (
		<form ref={form} className={styles.form} onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Amount'
				required
				onChange={e => setAmount(e.target.value.replace(/,/g, ''))}
				value={formattedAmount()}
			/>

			<select
				onChange={e => setDonationCurrency(e.target.value)}
				required
				defaultValue='defaultOption'
			>
				<option value='defaultOption'>{user.operatingCurrency}</option>
				{currencies &&
					currencies
						.filter(
							filteredCurrency => filteredCurrency != user.operatingCurrency
						)
						.map(currency => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
			</select>

			<select
				required
				defaultValue='defaultOption'
				onChange={e => setFrequency(e.target.value)}
			>
				<option disabled hidden value='defaultOption'>
					Donation Frequency*
				</option>
				<option value='Monthly'>Monthly</option>
				<option value='Quarterly'>Quarterly</option>
				<option value='Semi-yearly'>Semi-yearly</option>
				<option value='Yearly'>Yearly</option>
			</select>

			{/* Sending Email fields */}

			{owner && (
				<input
					type='email'
					placeholder='Email Address'
					style={{ display: 'none' }}
					name='email'
					value={owner.email}
				/>
			)}

			<input
				type='text'
				placeholder='Email Address'
				value={`${user.name} has pledged ${amount} ${donationCurrency} ${frequency}. Please contact ${user.name} at ${user.email} for more information.`}
				name='message'
				style={{ display: 'none' }}
			/>

			<button className='button-orange'>Make a pledge</button>
		</form>
	)
}

export default PledgeForm
