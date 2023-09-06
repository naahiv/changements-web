// styles
import styles from '@/styles/Homepage.module.scss'

// hooks
import { useCollection } from '@/hooks/useCollection'

const Highlights = () => {
	const { documents: users } = useCollection('users')

	return (
		<section>
			<div className='sectionContainer'>
				<div className={styles.highlights}>
					<div>
						<h2 style={{ color: '#FB8B24' }}>10K</h2>
						<p>
							Cups O'Coffee
							<br />@ work
						</p>
					</div>
					<div>
						<h2 style={{ color: '#E36414' }}>800</h2>
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
							NGO's in
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
