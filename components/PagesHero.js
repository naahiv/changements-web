import Image from 'next/image'

const PagesHero = ({ children, imageUrl }) => {
	return (
		<section className='pages-hero'>
			<Image
				src={imageUrl}
				fill
				quality={100}
				style={{ objectFit: 'cover' }}
				alt='Page Hero Image'
				priority={true}
			/>

			<div className='pages-hero-content'>
				<div>{children}</div>
			</div>
		</section>
	)
}

export default PagesHero
