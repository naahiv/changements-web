import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
	// add form.current instead of formRef
	const sendEmail = formRef => {
		emailjs
			.sendForm(
				'service_7h7nkgq',
				'template_fb9ozya',
				formRef,
				'Lt_F4u0p31faEVI5y'
			)
			.then(
				result => {
					console.log(result.text)
				},
				error => {
					console.log(error.text)
				}
			)
	}

	return { sendEmail }
}
