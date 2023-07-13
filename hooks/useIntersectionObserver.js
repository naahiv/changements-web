import { useState, useEffect, useRef } from 'react'

export const useIntersectionObserver = (
	options = { root: null, rootMargin: '0px', threshold: 1.0 }
) => {
	const [isIntersecting, setIsIntersecting] = useState(false)
	const targetRef = useRef()

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting)
		}, options)

		const target = targetRef.current
		if (target) observer.observe(target)

		return () => {
			if (target) observer.unobserve(target)
		}
	}, [options])

	return [targetRef, isIntersecting]
}
