// styles
import styles from '@/styles/Contact.module.scss'

const ContactForm = () => {
	return (
		<form name='contact' netlify-honeypot='bot-field' data-netlify='true'>
			<input type='hidden' name='form-name' value='contact' />

			<div className={styles.inputs}>
				<label htmlFor='fullName'>Full Name</label>
				<input
					type='text'
					id='fullName'
					name='fullName'
					placeholder='Full Name'
					required
				/>

				<label htmlFor='emailAddress'>Email Address</label>
				<input
					type='email'
					id='emailAddress'
					name='emailAddress'
					placeholder='Email Address'
					required
				/>

				<label htmlFor='phoneNumber'>Phone Number</label>
				<input
					type='tel'
					id='phoneNumber'
					name='phoneNumber'
					placeholder='Phone Number'
					required
				/>
			</div>

			<textarea id='message' name='message' placeholder='Message' required />

			<button className='button-orange'>Send Message</button>
		</form>
	)
}

export default ContactForm
