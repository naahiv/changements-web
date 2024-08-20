import Image from 'next/image'

const PagesHero = ({ children, imageUrl, style }) => {
	return (
		<section className='pages-hero' style={style}>
			<Image
				src={imageUrl}
				fill
				quality={100}
				style={{ objectFit: 'cover' }}
				alt='Page Hero Image'
				priority={true}
				as='img'
			/>

			<div className='pages-hero-content'>
				<div>{children}</div>
			</div>
		</section>
	)
}

export default PagesHero
