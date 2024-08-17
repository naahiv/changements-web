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

const NGOSquare = () => {

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

				<div style={{
					width: '70%',
					float: 'left'
				}}>
					<SectionContainer>
					<Card
						name='Indian girl'
						photo='/indian-girl.jpg'
						tagline='An girl from India.'
						buttonUrl=''
						bigger
					/>
					<Card
						name='Indian girl'
						photo='/indian-girl.jpg'
						tagline='An girl from India.'
						buttonUrl=''
						bigger
					/>
					<Card
						name='Indian girl'
						photo='/indian-girl.jpg'
						tagline='An girl from India.'
						buttonUrl=''
						bigger
					/>
					<Card
						name='Indian girl'
						photo='/indian-girl.jpg'
						tagline='An girl from India.'
						buttonUrl=''
						bigger
					/>
					<Card
						name='Indian girl'
						photo='/indian-girl.jpg'
						tagline='An girl from India.'
						buttonUrl=''
						bigger
					/>
					</SectionContainer>
				</div>
				
				<div className={styles.playerContainer}>
					<p style={{textAlign: 'center'}}>Episode 1: Indian Girl</p>
					<AudioPlayer
						src='https://www.buzzsprout.com/2366613/15162307-episode-1-swabhimaan-charitable-trust.mp3'
					/>
				</div>

				<div style={{clear: 'both'}}></div>
				

				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default NGOSquare
