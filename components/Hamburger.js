import styles from '../styles/Header.module.scss'

const Hamburger = props => {
	return (
		<div onClick={props.toggleMenu} className={props.menuClass}>
			<div className={styles.menuBtnBurger}></div>
		</div>
	)
}

export default Hamburger
