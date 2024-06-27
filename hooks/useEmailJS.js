import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
	// add form.current instead of formRef
	// NOTE: this only works for Pledge emails
	const sendEmail = formRef => {
		emailjs
			.sendForm(
				'service_m28rvve',
				'template_11de3km',
				formRef,
				'Otv13-tmfAo18EPpR'
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
