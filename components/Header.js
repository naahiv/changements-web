import { useState } from 'react'

// styles
import styles from '@/styles/Header.module.scss'

// components
import Image from 'next/image'
import Link from 'next/link'
import Hamburger from './Hamburger'

// Menu
export const menu = [
	{
		url: '/about',
		text: 'About Us'
	},
	{
		url: '/ngo',
		text: 'NGO Square'
	},
	{
		url: '/donor',
		text: `Donor's Nook`
	},
	{
		url: '/portfolio',
		text: 'Portfolio'
	},
	{
		url: '/blog',
		text: 'Change Buzz'
	}
]

const Header = () => {
	// Mobile Menu

	const [menuOpen, setMenuOpen] = useState(false)
	const [menuClass, setMenuClass] = useState(styles.menuBtnClosed)

	const toggleMenu = () => {
		if (!menuOpen) {
			setMenuClass(styles.menuBtnOpen)
			setMenuOpen(true)
		} else {
			setMenuClass(styles.menuBtnClosed)
			setMenuOpen(false)
		}
	}

	const closeMenu = () => {
		setMenuClass(styles.menuBtnClosed)
		setMenuOpen(false)
	}

	return (
		<header className={`${styles.header} ${menuOpen ? styles.openMenu : ''}`}>
			<div className={styles.headerElements}>
				<div className={styles.logoNav}>
					<Link href='/' scroll={false} passHref>
						<Image
							src='logo.svg'
							width={176}
							height={42}
							alt='Changements Logo'
							priority={true}
						/>
					</Link>

					<Hamburger toggleMenu={toggleMenu} menuClass={menuClass} />
				</div>

				<nav className={menuOpen ? '' : styles.hidden}>
					<ul>
						{menu.map(mapItem => (
							<Link
								key={mapItem.url}
								href={mapItem.url}
								scroll={false}
								passHref
							>
								<li onClick={() => closeMenu()} className='nav-li'>
									{mapItem.text}
								</li>
							</Link>
						))}
					</ul>
				</nav>

				<div className={`${menuOpen ? '' : styles.hidden} ${styles.auth}`}>
					<button onClick={() => closeMenu()} className='button-orange'>
						Login
					</button>
					<button onClick={() => closeMenu()}>Register</button>
				</div>
			</div>
		</header>
	)
}

export default Header
