import { useState } from 'react'

// styles
import styles from '@/styles/Header.module.scss'

// components
import Image from 'next/image'
import Link from 'next/link'
import Hamburger from './Hamburger'
import LogOutButton from './LogOutButton'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'

// Menu
export const menu = [
	{
		url: '/about',
		text: 'About Us'
	},
	{
		url: '/ngo-square',
		text: 'NGO Square'
	},
	{
		url: '/donors-nook',
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
	// context
	const { user } = useAuthContext()

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
					<Link href='/'>
						<Image
							src='/logo.svg'
							width={176}
							height={42}
							alt='Changements Logo'
							priority={true}
							as='img'
						/>
					</Link>

					<Hamburger toggleMenu={toggleMenu} menuClass={menuClass} />
				</div>

				<nav className={menuOpen ? '' : styles.hidden}>
					<ul>
						{user && (
							<Link href='/dashboard'>
								<li onClick={() => closeMenu()} className='nav-li'>
									Dashboard
								</li>
							</Link>
						)}
						{menu.map(mapItem => (
							<Link key={mapItem.url} href={mapItem.url}>
								<li onClick={() => closeMenu()} className='nav-li'>
									{mapItem.text}
								</li>
							</Link>
						))}
					</ul>
				</nav>

				<div className={`${menuOpen ? '' : styles.hidden} ${styles.auth}`}>
					{!user ? (
						<>
							<Link href='/login'>
								<button onClick={() => closeMenu()} className='button-orange'>
									Login
								</button>
							</Link>
							<Link href='/register'>
								<button onClick={() => closeMenu()}>Register</button>
							</Link>
						</>
					) : (
						<LogOutButton close={closeMenu} />
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
