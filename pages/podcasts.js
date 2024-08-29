// head element
import Head from 'next/head'

import styles from '@/styles/Podcasts.module.scss'

// hooks
import { useAuthContext } from '@/hooks/useAuthContext'
import React, { useState, useEffect } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { useWindowSize } from "@uidotdev/usehooks";
//
// components
import PagesHero from '@/components/PagesHero'
import SectionTitle from '@/components/SectionTitle'
import SectionContainer from '@/components/SectionContainer'
import Card from '@/components/Card.js'
import Image from 'next/image'
import PodcastCard from '@/components/PodcastCard'

// extras
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import PodcastPlayer from '@mrpollard/react-rss-podcast-player'

import dynamic from 'next/dynamic'

// sections
import ImageTextColumns from '@/components/ImageTextColumns'
import Contact from '@/components/Contact'


// const rssFeed = 'https://podcasternews.com/feed/'

const rssFeed = '/2366613.rss'

const Podcasts = () => {
	const [activePodcast, setActivePodcast] = useState(null)
	const { documents: podcasts } = useCollection('podcasts')
	const size = useWindowSize()
	const mobile = size && size.width <= 768

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
			{/* transitions are temporarily disabled on this page */}
			<main className={styles.notrans}> 
				{/* Hero */}
				<PagesHero imageUrl='/ngo-square-hero.jpg' style={{marginBottom: '3rem'}}>
					<h1>Podcasts</h1>
					<p style={{ fontSize: '2rem', lineHeight: '2rem' }}>
						Listen to the stories of NGOs making change.
					</p>
				</PagesHero>

				<div style={{
					width: (activePodcast && !mobile) ? 'calc(97% - 400px)' : '87%',
					float: !mobile && 'left',
					margin: 'auto'
				}}>

					<div className='titleContainer' style={{paddingBottom: '0.5rem'}}>
						<h3 style={{paddingBottom: '0.5rem'}}>Podcasts</h3>
						<p className='section-title undefined'><i>Tip: Click on a Podcast to listen.</i></p>
					</div>

					<SectionContainer>
					{podcasts && podcasts.map(podcast => (<>
						<PodcastCard
							name={podcast.name}
							date={podcast.date}
							blurb={podcast.blurb}
							image={podcast.imageUrl}
							action={() => {setActivePodcast(podcast = activePodcast ? null : podcast)}}
							isMobile={size && mobile}
						/>
						{mobile && activePodcast && (
							<div style={{gridColumn: 'span 12'}}>

							<AudioPlayer
								src={activePodcast.audioUrl}
								customAdditionalControls={[]}
							/>
							<div className={styles.buttonRow}>
							<PodcastButtonRow podcast={podcast} />
							</div>

							</div>
							
						)}
					</>))}
					</SectionContainer>
				</div>
				
				{activePodcast && !mobile && (
					<div className={`${styles.playerContainer} ${styles.mobileHidden}`}>
						<h3>Episode {activePodcast.episode}</h3>
						<h4>{activePodcast.name}</h4>
						<img
							src={activePodcast.imageUrl}
							width='50%'
						/>
						<p className={styles.descriptionText}>{activePodcast.description}</p>
						<AudioPlayer
							src={activePodcast.audioUrl}
							customAdditionalControls={[]}
							style={{width: '95%'}}
						/>
							
						<div className={styles.buttonRow}>
							<button className='button-orange' onClick={() => {setActivePodcast(null)}}>Close</button>
							<div style={{flex: 1}}></div>
							{/* Apple Podcasts, Spotify, YouTube button*/}
							<PodcastButtonRow podcast={activePodcast} />

						</div>


					</div>
				)}

				<div style={{clear: 'both'}}></div>
				

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

const PodcastButtonRow = ({ podcast }) => {
	return (<>
		<a className={styles.iconButton} href={podcast.appleLink} target='_blank'>
			<img className={styles.iconImage} src={'/apple_podcasts_icon.svg'} />
		</a>
		<a className={styles.iconButton} href={podcast.spotifyLink} target='_blank'>
			<img className={styles.iconImage} src={'/spotify_podcasts_icon.png'} />
		</a>
		<a className={`${styles.iconButton} ${podcast.youtubeLink ? '' : styles.disabled}`} href={podcast.youtubeLink} target='_blank'>
			<img
				className={styles.iconImage}
				src={podcast.youtubeLink ? '/youtube_podcasts_icon.svg' : '/youtube_podcasts_icon_disabled.svg'} 
			/>
		</a>
	</>)
}

export default Podcasts
