// styles
import styles from '@/styles/Login.module.scss'

// components
import Link from 'next/link'

// hooks
import { useState } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { useGoogleLogin } from '@/hooks/useGoogleLogin'
import { useGoogleSignup } from '@/hooks/useGoogleSignup'
import { useSignup } from '@/hooks/useSignup'

const LoginRegisterForm = ({ type, userType }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, isPending: loginPending, error: loginError } = useLogin()
	const { signup, isPending: signupPending, error: signupError } = useSignup()

	// login form submission
	const handleLoginSubmit = e => {
		e.preventDefault()
		login(email, password)
	}

	// login form submission
	const handleSignupSubmit = e => {
		e.preventDefault()
		signup(email, password, userType)
	}

	// google login
	const { googleLogin } = useGoogleLogin()
	const { googleSignup } = useGoogleSignup()

	return (
		<form onSubmit={type == 'Login' ? handleLoginSubmit : handleSignupSubmit}>
			<input
				type='email'
				placeholder='Email Address'
				required
				onChange={e => setEmail(e.target.value)}
				value={email}
			/>

			<input
				type='password'
				placeholder='Password'
				required
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>

			{loginError && (
				<p className={styles.error} style={{ marginBottom: '1rem' }}>
					{loginError.message == 'Firebase: Error (auth/user-not-found).' &&
						`Account with that email address doesn't exist in our database. Please
						try again.`}
					{loginError.message == 'Firebase: Error (auth/wrong-password).' &&
						`Password doesn't match the email address. Please
						try again.`}
				</p>
			)}

			{signupError && (
				<p className={styles.error} style={{ marginBottom: '1rem' }}>
					Something went wrong, please try again later.
				</p>
			)}

			<div className={styles.loginButtons}>
				<button className='button-orange'>
					{loginPending || signupPending ? 'Loading...' : type}
				</button>

				<button
					onClick={
						type == 'Register' ? () => googleSignup(userType) : googleLogin
					}
				>
					{type} with Google
				</button>
			</div>

			<Link href='/reset-password'>
				<p className='orange'>Forgot Password</p>
			</Link>
		</form>
	)
}

export default LoginRegisterForm
