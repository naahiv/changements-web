// styles
import styles from '@/styles/Homepage.module.scss'

// components
import SectionContainer from './SectionContainer'
import Button from './Button'

const ErrorPage = () => {
	const text = "This page requires administrator access. If you think you should have access to this page, contact impactplease@gmail.com."
	return (
		<SectionContainer 
			marginTop={true}
			title='Error'
		>
			<p id={styles.specialP}>This page requires <strong>administrator</strong> privelage. If you think you should have access, contact impactplease@gmail.com.</p>
		</SectionContainer>
	)
}

export default ErrorPage
