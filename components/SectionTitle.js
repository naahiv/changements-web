import React from 'react'

const SectionTitle = ({ children, color }) => {
	return <h3 className={`section-title ${color}`}>{children}</h3>
}

export default SectionTitle
