// head element
import Head from 'next/head'

import styles from '@/styles/Podcasts.module.scss'

import { useAuthContext } from '@/hooks/useAuthContext'
import React, { useState } from 'react'

// components
import PagesHero from '@/components/PagesHero'
import SectionTitle from '@/components/SectionTitle'
import SectionContainer from '@/components/SectionContainer'
import Card from '@/components/Card.js'
import Image from 'next/image'

// import PodcastPlayer from '@mrpollard/react-rss-podcast-player'

import dynamic from 'next/dynamic'

// sections
import ImageTextColumns from '@/components/ImageTextColumns'
import Contact from '@/components/Contact'


const PodcastPlayer = dynamic(() => import('@mrpollard/react-rss-podcast-player'), {
  ssr: false
});
// const rssFeed = 'https://podcasternews.com/feed/'

const rssFeed = '/2366613.rss'

const NGOSquare = () => {

	const [showSpeech, setShowSpeech] = useState(false)

	const speechText = "When we left REC Trichy in 1991, we were certain we would remain friends forever. But coming together to help create impact, has brought us together even more. We are glad to have partnered with Payir in reviving the watershed and farming in the area."
	const speechBubble = (<>
		<div 
			className={styles.headText}
			style={{display: showSpeech ? 'block' : 'none'}}
			onMouseEnter={(e) => {setShowSpeech(true)}}
			onMouseLeave={(e) => {setShowSpeech(false)}}
		>
		   <Image
				width={220}
				height={180}
				quality={100}
				src='/speech-bubble.png'
		  	/>
			<div className={styles.imageText}>
				<p style={{fontSize: '0.82rem', lineHeight: '0.8rem'}}>{speechText}</p>
			</div>
		</div>
	</>)

	return (
		<>
			<Head>
				<title>ImpactPlease | Podcasts</title>
				<meta
					name='description'
					content='View ImpactPlease podcasts directly from our website.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<main>
				{/* Hero */}
				<PagesHero imageUrl='/ngo-square-hero.jpg'>
					<h1>Podcasts</h1>
					<p style={{ fontSize: '2rem' }}>
						Listen to the stories of NGOs making change.
					</p>
				</PagesHero>

				{/* rssFeed && (
					<PodcastPlayer url={rssFeed} />
				)*/}
				<SectionContainer>
				<div 
					onMouseEnter={(e) => {setShowSpeech(true)}}
					onMouseLeave={(e) => {setShowSpeech(false)}}
					className={styles.overallContainer}
				>
					<Card
						name='Indian girl'
						photo='/indian-girl.jpg'
						tagline='An girl from India.'
						buttonUrl=''
						setShowSpeech={setShowSpeech}
					/>

					<div className={styles.speechContainer}>
						{speechBubble}
					</div>

				</div>
				</SectionContainer>

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default NGOSquare
