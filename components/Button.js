import Link from 'next/link'

const Button = ({ children, color, url, buttonFunction }) => {
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
		<>
			{url && (
				<Link href={url}>
					<button className={btnColor}>
						{children}
						<div className='button-arrow'></div>
					</button>
				</Link>
			)}
			{buttonFunction && (
				<button className={btnColor} onClick={buttonFunction}>
					{children}
					<div className='button-arrow'></div>
				</button>
			)}
		</>
	)
}

export default Button
