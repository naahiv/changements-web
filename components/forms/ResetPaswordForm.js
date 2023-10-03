// styles
import styles from '@/styles/Login.module.scss'

// components
import Link from 'next/link'

// hooks
import { useState } from 'react'
import { useResetPassword } from '@/hooks/UseResetPassword'

const ResetPasswordForm = () => {
	const [email, setEmail] = useState('')
	const [showMessage, setShowMessage] = useState(false)
	const { resetPassword, error } = useResetPassword()

	// reset pasword form
	const handleResetPassword = e => {
		e.preventDefault()
		resetPassword(email)
		setShowMessage(true)
	}

	return (
		<form onSubmit={handleResetPassword}>
			{showMessage && !error && (
				<p style={{ gridColumn: 'span 2' }}>
					We sent you an email with a link to reset your password. Please check
					your inbox or spam folder if you can't see the email.
				</p>
			)}

			<input
				type='email'
				placeholder='Email Address'
				required
				onChange={e => setEmail(e.target.value)}
				value={email}
				style={{ gridColumn: 'span 2' }}
			/>

			{error && (
				<p className={styles.error} style={{ gridColumn: 'span 2' }}>
					Account with that email address doesn't exist in our database. Please
					try again.
				</p>
			)}

			<div className={styles.loginButtons}>
				<button className='button-orange'>Reset Password</button>
				<Link href='/login'>
					<p className='orange'>Back to Login screen</p>
				</Link>
			</div>
		</form>
	)
}

export default ResetPasswordForm
