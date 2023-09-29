// styles
import styles from '@/styles/Contact.module.scss'

// components
import SectionTitle from './SectionTitle'
import ContactForm from './ContactForm'
import Link from 'next/link'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'

const Contact = () => {
	// context
	const { user } = useAuthContext()

	return (
		<section>
			<div className='titleContainer'>
				<SectionTitle color='black'>
					Get In <span className='red'>Touch</span>
				</SectionTitle>
			</div>
			<div className='sectionContainer'>
				<div className={styles.contact}>
					<p>
						We'd love to hear from you. If you have any questions, suggestions,
						or would simply like to connect with our team, please feel free to
						reach out to us using the contact form below. Our dedicated staff is
						here to assist you and provide the information you need.
					</p>

					<ContactForm />
				</div>

				<div className={styles.links}>
					<ul className={styles.contactMenu}>
						<Link href='/about'>
							<li>About Us</li>
						</Link>
						{!user && (
							<>
								<Link href='/ngo-square'>
									<li>NGO Square</li>
								</Link>
								<Link href='/donors-nook'>
									<li>Donor's Nook</li>
								</Link>
							</>
						)}
						<Link href='/portfolio'>
							<li>Portfolio</li>
						</Link>
						<Link href='/blog'>
							<li>Change Buzz</li>
						</Link>
					</ul>
					<ul>
						{/* <li>Phone: 111 222 3333</li> */}
						<li>
							Email:
							<br />
							changementsinfo@gmail.com
						</li>
						{/* <li>Office Address</li> */}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Contact
