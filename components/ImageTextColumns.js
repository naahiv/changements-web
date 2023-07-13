// components
import Image from 'next/image'
import Button from './Button'

const ImageTextColumns = ({
	children,
	direction,
	buttonText,
	url,
	photoUrl
}) => {
	return (
		<section>
			<div
				className='twoColumnSectionContainer'
				style={{ flexDirection: direction }}
			>
				<div className='columnImage'>
					<Image
						src={photoUrl}
						fill
						quality={100}
						sizes='(max-width: 768px) 100vw, 768px'
						style={{ objectFit: 'cover' }}
						alt='Section Image'
						priority={false}
						loading='lazy'
					/>
				</div>
				<div className='columnText'>
					{children}

					{buttonText && (
						<div className='buttons'>
							<Button color='orange' url={url}>
								{buttonText}
							</Button>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default ImageTextColumns
