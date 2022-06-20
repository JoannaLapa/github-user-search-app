'use strict'

const screenModebutton = document.querySelector('#screen-mode__button')
const searchButton = document.querySelector('#search__button')
const searchInput = document.querySelector('#search__input')
const body = document.querySelector('body')
const headerWrapper = document.querySelector('#header__wrapper')
let searchErrorMessage = document.querySelector('#error-message')
let theme = localStorage.getItem('theme') || 'light'
let userName = 'octokat'
const userURL = URL

const changeColorScreenMode = () => {
	if (
		window.matchMedia('(prefers-color-scheme: dark)').matches === true &&
		body.classList.contains('light') !== true &&
		body.classList.contains('dark') !== true
	) {
		body.classList.add('light')
		theme = 'light'
		console.log(theme)
	} else if (body.classList.contains('light')) {
		body.classList.add('dark')
		body.classList.remove('light')
		theme = 'dark'
		console.log(theme)
	} else {
		body.classList.remove('dark')
		body.classList.add('light')
		theme = 'light'
		console.log(theme)
	}
	localStorage.setItem('theme', theme)
}

const renderError = msg => {
	searchErrorMessage.textContent = msg
}

const getUserData = function (userName) {
	fetch(`https://api.github.com/users/${userName}`)
		.then(response => {
			console.log(response)
			if (!response.ok) throw new Error(renderError('No results'))

			return response.json()
		})
		.then(data => renderUser(data))
	// .catch(err => console.error('No results'))
}

const renderUser = function (data) {
	console.log(data.blog)
	console.log(data.url)

	//SETTING THE CORRECT DATE'S FORMAT

	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	const correctDateFormat = new Date(data.created_at).toLocaleDateString('en-GB', options)
	console.log(correctDateFormat)

	//CHECKING IF THE USER SET THE NAME

	const correctName = name => {
		if (data.name !== null) {
			name = document.querySelector('#name').textContent = data.name
		} else {
			name = document.querySelector('#name').textContent = data.login
		}
	}
	//CHECKING IS THE USER SET THE BIO
	const checkIfHasBio = bio1 => {
		if (data.bio === null) {
			bio1 = document.querySelector('#bio')
			bio1.textContent = 'This profile has no bio'
			bio1.classList.add('overview__bio--transparency')
		} else {
			bio1 = document.querySelector('#bio')
			bio1.textContent = data.bio
			bio1.classList.remove('overview__bio--transparency')
		}
	}

	//CHECKING IF THE USER SET LOCATION
	const checkIfHasNoLocation = () => {
		let location = document.querySelector('#location')
		const locationBox = document.querySelector('#location-box')
		if (data.location === null || data.location === 0) {
			location.textContent = 'Not available'
			locationBox.classList.add('contact__box--transparency')
		} else {
			location.textContent = data.location
			locationBox.classList.remove('contact__box--transparency')
		}
	}

	// CHECKING IF THE USER SET WEBSITE ADDRESS

	const checkIfHasNoWebsite = () => {
		const website = document.querySelector('#website')
		const websiteBox = document.querySelector('#website-box')

		//CHECKING IF THE URL HTTP IS VALID
		function isValidHttpUrl(string) {
			let url

			try {
				url = new URL(string)
			} catch (_) {
				return false
			}

			return url.protocol === 'http:' || url.protocol === 'https:'
		}

		if (data.blog === null || data.blog.length === 0) {
			website.textContent = 'Not available'
			website.classList.add('contact__details--text-decoration')
			websiteBox.classList.add('contact__box--transparency')
		} else if (!data.blog.includes('http')) {
			if (isValidHttpUrl((website.href = `http://${data.blog}`)) === false) {
				website.textContent = data.blog
				website.href = `https://${data.blog}`
				website.classList.remove('contact__details--text-decoration')
				websiteBox.classList.remove('contact__box--transparency')
			} else {
				website.textContent = data.blog
				website.href = `http://${data.blog}`
				website.classList.remove('contact__details--text-decoration')
				websiteBox.classList.remove('contact__box--transparency')
			}
		} else {
			website.textContent = data.blog
			website.href = `${data.blog}`
			website.classList.remove('contact__details--text-decoration')
			websiteBox.classList.remove('contact__box--transparency')
		}
	}

	// CHECKING IF THE USER SET COMPANY DETAILS

	const checkIfHasNoCompanyDetails = () => {
		const company = document.querySelector('#company')
		const companyBox = document.querySelector('#company-box')
		if (data.company === null || data.company.length === 0) {
			company.textContent = 'Not available'
			company.classList.add('contact__details--text-decoration')
			companyBox.classList.add('contact__box--transparency')
		} else if (data.company.charAt(0) == '@') {
			company.textContent = `${data.company}`
			company.href = `https://github.com/${data.company.substring(1)}`
			company.classList.remove('contact__details--text-decoration')
			companyBox.classList.remove('contact__box--transparency')
		} else {
			company.textContent = `${data.company}`
			company.href = `https://github.com/${data.company}`
			company.classList.remove('contact__details--text-decoration')
			companyBox.classList.remove('contact__box--transparency')
		}
	}

	//CHECKING IF THE USER SET TWITTER DETAILS
	const checkIfHasTwitter = () => {
		if (data.twitter_username === null || data.twitter_username.length === 0) {
			twitter.textContent = 'Not available'
			twitter.classList.add('contact__details--text-decoration')
			twitterBox.classList.add('contact__box--transparency')
		} else {
			twitter.textContent = data.twitter_username
			twitter.href = `http://twitter.com/${data.twitter_username}`
			twitter.classList.remove('contact__details--text-decoration')
			twitterBox.classList.remove('contact__box--transparency')
		}
	}

	//SETTING THE USER DATA FROM API

	const avatar = (document.querySelector('#avatar').src = data.avatar_url)
	const name = correctName()
	const login = (document.querySelector('#username').textContent = `@${data.login}`)
	const joinedDate = (document.querySelector('#joined-date').textContent = `Joined ${correctDateFormat}`)
	const bio = checkIfHasBio()
	const repos = (document.querySelector('#repos').textContent = data.public_repos)
	const followers = (document.querySelector('#followers').textContent = data.followers)
	const following = (document.querySelector('#following').textContent = data.following)
	checkIfHasNoLocation()
	checkIfHasNoCompanyDetails()
	checkIfHasNoWebsite()
	const twitter = document.querySelector('#twitter')
	const twitterBox = document.querySelector('#twitter-box')
	checkIfHasTwitter()
}

//addEventListeners

searchButton.addEventListener('click', e => {
	e.preventDefault()
	searchErrorMessage.textContent = ''
	userName = searchInput.value.split(' ').join('')
	getUserData(userName)
	searchInput.value = ''
})

screenModebutton.addEventListener('click', () => {
	changeColorScreenMode()
})
