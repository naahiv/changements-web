// head element
import Head from 'next/head'

import { useAuthContext } from '@/hooks/useAuthContext'
import React from 'react'
//
// components
import PagesHero from '@/components/PagesHero'
import SectionTitle from '@/components/SectionTitle'
import SectionContainer from '@/components/SectionContainer'
// import PodcastPlayer from '@mrpollard/react-rss-podcast-player'

import dynamic from 'next/dynamic'

// sections
import ImageTextColumns from '@/components/ImageTextColumns'
import Contact from '@/components/Contact'


const PodcastPlayer = dynamic(() => import('@mrpollard/react-rss-podcast-player'), {
  ssr: false
});
// const rssFeed = 'https://podcasternews.com/feed/'
const rssFeed = 'https://anchor.fm/s/3ca3951c/podcast/play/34000987/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-4-22%2F189000537-44100-2-8ece7d27bd7d2.m4a%22'

const NGOSquare = () => {
	// context
	const { user } = useAuthContext()

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


					<PodcastPlayer url={rssFeed} />


				{/* Contact */}
				<Contact />
			</main>
		</>
	)
}

export default NGOSquare
