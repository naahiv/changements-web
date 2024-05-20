// styles
import styles from '@/styles/Footer.module.scss'

// components
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className={styles.credits}>
			<div className={styles.footerContainer}>
				<p>ImpactPlease - Copyright 2023 - All Rights Reserved</p>
				<div className={styles.footerLinks}>
					<Link href=''>
						<p>Privacy Policy</p>
					</Link>
					<Link href=''>
						<p>Terms of Use</p>
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
