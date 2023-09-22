import emailjs from '@emailjs/browser'

export const useEmailJS = () => {
	// add form.current instead of formRef
	const sendEmail = formRef => {
		emailjs
			.sendForm(
				'changementsinfo',
				'template_nqhoin9',
				formRef,
				'm6KQHX88ImtfbCLaf'
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
