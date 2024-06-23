// styles
import styles from '@/styles/Homepage.module.scss'

// hooks
import { useCollection } from '@/hooks/useCollection'

import React, { useState, useEffect } from 'react';

const Highlights = () => {
	const { documents: users } = useCollection('users')
	const { documents: staticData} = useCollection('staticData')

	function highlightsData() {
		return staticData.find(e => e.id == 'highlights')
	}
	const [countryCode, setCountryCode] = useState('')
	const locURI = `https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.NEXT_PUBLIC_GEO_KEY}`

	const getCountryCode = async () => {
		const response = await fetch(locURI)
		const data = await response.json()
		setCountryCode(data.country.iso_code)
	}

	useEffect(() => {
		getCountryCode()
	}, [])


	return (
		<section>
			<div className='sectionContainer'>
				<div className={styles.highlights}>
					<div>
						<h2 style={{ color: '#FB8B24' }}>{staticData && ((countryCode == 'IN') ? highlightsData().rupeesDonated : highlightsData().dollarsDonated)}</h2>
						<p>
							{(countryCode == 'IN') ? 'Rupees' : 'Dollars'}
							<br />
							donated
						</p>
					</div>
					<div>
						<h2 style={{ color: '#E36414' }}>{staticData && highlightsData().peopleBenefitted}</h2>
						<p>
							People
							<br />
							Benefitted
						</p>
					</div>
					<div>
						<h2 style={{ color: '#9A031E' }}>
							{users && users.filter(user => user.type == 'donor').length}
						</h2>
						<p>
							Friends & Family
							<br />
							Collaborating
						</p>
					</div>
					<div>
						<h2 style={{ color: '#360C25' }}>
							{users && users.filter(user => user.type == 'ngo').length}
						</h2>
						<p>
							NGOs in
							<br />
							Action
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Highlights
