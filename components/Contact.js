// styles
import styles from '@/styles/Contact.module.scss'

// components
import SectionTitle from './SectionTitle'
import ContactForm from './ContactForm'
import Link from 'next/link'

// menu
import { menu } from './Header'

const Contact = () => {
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
					<ul>
						<li>Phone: 111 222 3333</li>
						<li>Email: office@changements.com</li>
						<li>Office Address</li>
					</ul>

					<ul className={styles.contactMenu}>
						{menu.map(mapItem => (
							<Link key={mapItem.url} href={mapItem.url}>
								<li>{mapItem.text}</li>
							</Link>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Contact
