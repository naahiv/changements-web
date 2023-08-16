// hooks
import { useState, useEffect } from 'react'

const BASE_URL =
	'https://api.exchangeratesapi.io/v1/latest?access_key=8aaddd8db0610550895e7f8551c574eb&symbols=USD,INR,GBP'

export const useCurrency = () => {
	const [currencies, setCurrencies] = useState([])
	const [data, setData] = useState()

	const convert = (fromValue, toValue, amount) => {
		const from =
			data && Object.entries(data).filter(([key, value]) => key == fromValue)
		const to =
			data && Object.entries(data).filter(([key, value]) => key == toValue)

		return (
			from &&
			to &&
			((1 / from[0][1]) * to[0][1] * amount)
				.toLocaleString('en-US', {
					style: 'currency',
					currency: toValue
				})
				.slice(0, -3)
		)
	}

	useEffect(() => {
		fetch(BASE_URL)
			.then(res => res.json())
			.then(data => {
				setCurrencies([data.base, ...Object.keys(data.rates)]),
					setData({ ...data.rates, EUR: 1 })
			})
	}, [])

	return { currencies, convert }
}
