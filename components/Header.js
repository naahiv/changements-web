import { useState } from 'react'

// styles
import styles from '@/styles/Header.module.scss'

// components
import Image from 'next/image'
import Link from 'next/link'
import Hamburger from './Hamburger'
import Menu from './Menu'
import LogOutButton from './LogOutButton'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'

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
							src='/Aug22_nocup.svg'
							width={215}
							height={68}
							alt='Changements Logo'
							priority={true}
							as='img'
							resizeMode='cover'
							styles={{marginTop: '4.5px'}}
						/>
					</Link>

					<Hamburger toggleMenu={toggleMenu} menuClass={menuClass} />
				</div>

				<nav className={menuOpen ? '' : styles.hidden}>
					<ul>
						<Link href='/'>
							<li onClick={() => closeMenu()} className='nav-li'>
								Home
							</li>
						</Link>

						{user && (
							<Link href='/dashboard'>
								<li onClick={() => closeMenu()} className='nav-li'>
									Dashboard
								</li>
							</Link>
						)}

						<Link href='/about'>
							<li onClick={() => closeMenu()} className='nav-li'>
								About Us
							</li>
						</Link>

						{!user && (
							<Link href='/ngo-square'>
								<li onClick={() => closeMenu()} className='nav-li'>
									NGO Square
								</li>
							</Link>
						)}

						{!user && (
							<Link href='/donors-nook'>
								<li onClick={() => closeMenu()} className='nav-li'>
									Donor's Nook
								</li>
							</Link>
						)}

						{user && <Menu closeMenu={closeMenu} />}

						<Link href='/portfolio'>
							<li onClick={() => closeMenu()} className='nav-li'>
								Portfolio
							</li>
						</Link>
						{/*
						<Link href='/blog'>
							<li onClick={() => closeMenu()} className='nav-li'>
								Impact Buzz
							</li>
						</Link>
						*/}
						<Link href='/podcasts'>
							<li onClick={() => closeMenu()} className='nav-li'>
								Podcasts
							</li>
						</Link>
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
