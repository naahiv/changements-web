// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'
import { useCurrency } from '@/hooks/useCurrency'

const PledgeForm = ({
	activeProgram,
	user,
	setOpenForm,
	setActiveProgram,
	setOpenSearch
}) => {
	// firestore
	const { updateDocument } = useFirestore('programs')
	const { addDocument } = useFirestore(`programs/${activeProgram.id}/pledges`)

	// form values
	const [amount, setAmount] = useState('')
	const [frequency, setFrequency] = useState('')
	const [donationCurrency, setDonationCurrency] = useState(
		user.operatingCurrency
	)

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()

		updateDocument(activeProgram.id, {
			pledges: [
				...activeProgram.pledges,
				{
					// amount: amount,
					// fulfilledAmount: 0,
					// frequency: frequency,
					donorId: user.id
					// donorName: user.name,
					// donorCurrency: user.operatingCurrency,
					// donorPhoto: user.photoUrl
				}
			]
		})

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

		setOpenForm(false)
		setActiveProgram(null)
		setOpenSearch(false)
	}

	// currencies
	const { currencies } = useCurrency()

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type='number'
				placeholder='Amount'
				required
				onChange={e => setAmount(e.target.value)}
				value={amount}
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

			<button className='button-orange'>Make a pledge</button>
		</form>
	)
}

export default PledgeForm
