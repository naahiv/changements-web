import Link from 'next/link'

const Button = ({ children, color, url }) => {
	let btnColor

	if (color == 'orange') {
		btnColor = 'button-orange'
	} else if (color == 'red') {
		btnColor = 'button-red'
	} else if (color == 'dark-red') {
		btnColor = 'button-dark-red'
	} else if (color == 'white') {
		btnColor = 'button-white'
	} else if (color == 'simple') {
		btnColor = 'button-simple'
	}

	return (
		<Link href={url}>
			<button className={btnColor}>
				{children}
				<div className='button-arrow'></div>
			</button>
		</Link>
	)
}

export default Button
