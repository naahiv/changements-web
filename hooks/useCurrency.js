// hooks
import { useState, useEffect } from 'react'

const BASE_URL =
	'http://api.exchangeratesapi.io/v1/latest?access_key=8aaddd8db0610550895e7f8551c574eb&symbols=USD,INR,GBP'

export const useCurrency = () => {
	const [currencies, setCurrencies] = useState(['EUR', 'USD', 'INR', 'GBP'])
	const [data, setData] = useState()

	const tempData = { USD: 1.06951874, INR: 89.36014056, GBP: 0.84535325, EUR: 1.0 }

	const convertUnformatted = (fromValue, toValue, amount) => {
		const from =
			tempData &&
			Object.entries(tempData).filter(([key, value]) => key == fromValue)
		const to =
			tempData &&
			Object.entries(tempData).filter(([key, value]) => key == toValue)

		return (
			from &&
			to &&
			((1 / from[0][1]) * to[0][1] * amount)
		)
	}
	
	const format = (curr, num) => {
		return num.toLocaleString(`en-${curr.slice(0, 2)}`, {
			style: 'currency',
			currency: curr
		})
		.slice(0, -3)
	}

	const convert = (fromValue, toValue, amount) => {
		return format(toValue, convertUnformatted(fromValue, toValue, amount))
	}

	// useEffect(() => {
	// 	fetch(BASE_URL)
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setCurrencies([data.base, ...Object.keys(data.rates)]),
	// 				setData({ ...data.rates, EUR: 1 })
	// 		})
	// }, [])
	// FOR LIVE UPDATES: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json

	return { currencies, convert, convertUnformatted, format}
}
