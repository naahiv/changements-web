// components
import SectionContainer from '../SectionContainer'

const Verification = () => {
	return (
		<SectionContainer marginTop={true} title={'Verification'}>
			<p style={{ gridColumn: 'span 12' }}>
				Please verify your email address. If you don't see the email in inbox,
				please check the spam folder.
				<br />
				<br />
				If you already verified, please reload the page.
			</p>
		</SectionContainer>
	)
}

export default Verification
