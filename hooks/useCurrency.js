// hooks
import { useState, useEffect } from 'react'

const BASE_URL =
	'http://api.exchangeratesapi.io/v1/latest?access_key=1bc0b9b89f46f8b00412ef839178199d&symbols=USD,INR,GBP'

export const useCurrency = () => {
	const [currencies, setCurrencies] = useState([])
	const [data, setData] = useState()

	const convert = (fromValue, toValue) => {
		const from =
			data && Object.entries(data).filter(([key, value]) => key == fromValue)
		const to =
			data && Object.entries(data).filter(([key, value]) => key == toValue)

		return from && to && (1 / from[0][1]) * to[0][1]
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
