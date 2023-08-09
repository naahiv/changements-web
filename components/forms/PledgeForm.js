// styles
import styles from '@/styles/Login.module.scss'

// hooks
import { useState } from 'react'
import { useFirestore } from '@/hooks/useFirestore'

const PledgeForm = ({ activeProgram, user }) => {
	// firestore
	const { updateDocument } = useFirestore('programs')

	// form values
	const [amount, setAmount] = useState('')
	const [frequency, setFrequency] = useState('')

	// form submission
	const handleSubmit = async e => {
		e.preventDefault()

		updateDocument(activeProgram.id, {
			pledges: [
				...activeProgram.pledges,
				{
					amount: amount,
					frequency: frequency,
					donorId: user.id,
					donorName: user.name,
					donorCurrency: user.operatingCurrency,
					donorPhoto: user.photoUrl
				}
			]
		})
	}

	// const ratio = (1 / from) * to

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{/* <select
				required
				defaultValue='defaultOption'
				onChange={e => setDonationCurrency(e.target.value)}
			>
				<option disabled hidden value='defaultOption'>
					Operating Currency*
				</option>
				{currencies &&
					currencies.map(currency => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
			</select> */}

			<input
				type='number'
				placeholder='Amount'
				required
				onChange={e => setAmount(e.target.value)}
				value={amount}
			/>

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
