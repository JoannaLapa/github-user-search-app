'use strict'

const searchErrorMessage = document.querySelector('#error-message')
const searchErrorMessageBox = document.querySelector('#error-message-box')
let theme = localStorage.getItem('theme') || 'light'

//CHANGING COLOR SCREEN MODE
const changeColorScreenMode = () => {
	const body = document.querySelector('body')
	if (
		window.matchMedia('(prefers-color-scheme: light)').matches === true &&
		body.classList.contains('light') !== true &&
		body.classList.contains('dark') !== true
	) {
		body.classList.add('dark')
		theme = 'dark'
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

//PRINTING ERROR MESSAGE
const renderError = msg => {
	searchErrorMessage.textContent = msg
	searchErrorMessageBox.style.display = 'inline-block'
	return searchErrorMessage, searchErrorMessageBox
}

//CHECKING IF THE USER SET THE NAME
const checkiIfHasName = data => {
	const name = document.querySelector('#name')
	if (data.name !== null) {
		name.textContent = data.name
	} else {
		name.textContent = data.login
	}
	return name
}

//SETTING THE CORRECT DATE'S FORMAT
const setCorrecJoinedDate = data => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	const correctDateFormat = new Date(data.created_at).toLocaleDateString('en-GB', options)
	const joinedDate = (document.querySelector('#joined-date').textContent = `Joined ${correctDateFormat}`)
	return joinedDate
}

//CHECKING IS THE USER SET THE BIO
const checkIfHasBio = data => {
	const bio = document.querySelector('#bio')
	if (data.bio === null) {
		bio.textContent = 'This profile has no bio'
		bio.classList.add('overview__bio--transparency')
	} else {
		bio.textContent = data.bio
		bio.classList.remove('overview__bio--transparency')
	}
	return bio
}

//CHECKING IF THE USER SET LOCATION
const checkIfHasNoLocation = data => {
	const location = document.querySelector('#location')
	const locationBox = document.querySelector('#location-box')
	if (data.location === null || data.location === 0) {
		location.textContent = 'Not available'
		locationBox.classList.add('contact__box--transparency')
	} else {
		location.textContent = data.location
		locationBox.classList.remove('contact__box--transparency')
	}
	return location, locationBox
}

// CHECKING IF THE USER SET COMPANY DETAILS
const checkIfHasNoCompanyDetails = data => {
	const company = document.querySelector('#company')
	const companyBox = document.querySelector('#company-box')
	if (data.company === null || data.company.length === 0) {
		addClassesToElement(company, companyBox)
	} else if (data.company.charAt(0) == '@') {
		company.textContent = `${data.company}`
		company.href = `https://github.com/${data.company.substring(1)}`
		removeClassesFromElement(company, companyBox)
	} else {
		company.textContent = `${data.company}`
		company.href = `https://github.com/${data.company}`
		removeClassesFromElement(company, companyBox)
	}
	return company, companyBox
}

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

// CHECKING IF THE USER SET WEBSITE ADDRESS
const checkIfHasNoWebsite = data => {
	const website = document.querySelector('#website')
	const websiteBox = document.querySelector('#website-box')

	if (data.blog === null || data.blog.length === 0) {
		website.href = ''
		addClassesToElement(website, websiteBox)
	} else if (!data.blog.includes('http')) {
		if (isValidHttpUrl((website.href = `http://${data.blog}`)) === false) {
			website.textContent = data.blog
			website.href = `https://${data.blog}`
			removeClassesFromElement(website, websiteBox)
		} else {
			website.textContent = data.blog
			website.href = `http://${data.blog}`
			removeClassesFromElement(website, websiteBox)
		}
	} else {
		website.textContent = data.blog
		website.href = `${data.blog}`
		removeClassesFromElement(website, websiteBox)
	}
	return website, websiteBox
}

//CHECKING IF THE USER SET TWITTER DETAILS
const checkIfHasTwitter = data => {
	const twitter = document.querySelector('#twitter')
	const twitterBox = document.querySelector('#twitter-box')
	if (data.twitter_username === null || data.twitter_username.length === 0) {
		addClassesToElement(twitter, twitterBox)
	} else {
		twitter.textContent = data.twitter_username
		twitter.href = `http://twitter.com/${data.twitter_username}`
		removeClassesFromElement(twitter, twitterBox)
	}
	return twitter, twitterBox
}

//GETTING USER DATA FROM API
const getUserData = function (userName) {
	fetch(`https://api.github.com/users/${userName}`)
		.then(response => {
			console.log(response)
			if (!response.ok) throw new Error(renderError('No results'))

			return response.json()
		})
		.then(data => renderUser(data))
		.catch(err => console.error('No results'))
}

//REMOVING UNDERLINE AND TRANSPARENCY ON THE ELEMENT
const removeClassesFromElement = (element, elementBox) => {
	element.classList.remove('contact__details--text-decoration')
	elementBox.classList.remove('contact__box--transparency')
}

//ADDING  UNDERLINE AND TRANSPARENCY ON THE ELEMENT
const addClassesToElement = (element, elementBox) => {
	element.textContent = 'Not available'
	element.classList.add('contact__details--text-decoration')
	elementBox.classList.add('contact__box--transparency')
}

//SETTING THE USER DATA FROM API
const renderUser = function (data) {
	const avatar = (document.querySelector('#avatar').src = data.avatar_url)
	const name = checkiIfHasName(data)
	const login = (document.querySelector('#username').textContent = `@${data.login}`)
	const joinedDate = setCorrecJoinedDate(data)
	const bio = checkIfHasBio(data)
	const repos = (document.querySelector('#repos').textContent = data.public_repos)
	const followers = (document.querySelector('#followers').textContent = data.followers)
	const following = (document.querySelector('#following').textContent = data.following)
	const location = checkIfHasNoLocation(data)
	const company = checkIfHasNoCompanyDetails(data)
	const website = checkIfHasNoWebsite(data)
	const twitter = checkIfHasTwitter(data)
}

//ADDEVENTLISTENERS
document.querySelector('#search-button').addEventListener('click', e => {
	const searchInput = document.querySelector('#search-input')
	e.preventDefault()
	searchErrorMessage.textContent = ''
	const userName = searchInput.value.split(' ').join('')
	getUserData(userName)
	searchInput.value = ''
})

document.querySelector('#screen-mode-button').addEventListener('click', () => {
	changeColorScreenMode()
})
