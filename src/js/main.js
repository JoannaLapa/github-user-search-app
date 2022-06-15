'use strict'

const screenModebutton = document.querySelector('#screen-mode__button')
const searchButton = document.querySelector('#search__button')
const searchInput = document.querySelector('#search__input')
const bio = document.querySelector('#bio')
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
	// .catch(err => renderError('No results'))
	//muszę rozdzielić błąd z połączeniem internetowym z brakiem usera - sprawdzić dokładnie jeszcze raz jak ma zapisaną funkcję renderError tak, żebym mogła mieć dwa komunikaty i żeby po kliknięciu na button ten komunikat zniknął (na początku addEventListenera dodać pusty textContent)
}

const renderUser = function (data) {
	console.log(data.bio)
	console.log(data)
	//setting the correct format date for joinedDate
	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	const correctDateFormat = new Date(data.created_at).toLocaleDateString('en-GB', options)
	console.log(correctDateFormat)

	const correctName = name => {
		if (data.name !== null) {
			name = document.querySelector('#name').textContent = data.name
		} else {
			name = document.querySelector('#name').textContent = data.login
		}
	}
	const checkIfHasBio = () => {
		if (data.bio === null) {
			bio.textContent = 'This profile has no bio'
			// bio.style.color = 'rgba(75, 106, 155, 0.75)'
			bio.classList.add('overview__bio--transparency')
		} else {
			bio.textContent = data.bio
			bio.classList.remove('overview__bio--transparency')
		}
	}
	//seting the user data from API
	const avatar = (document.querySelector('#avatar').src = data.avatar_url)
	const name = correctName()
	const login = (document.querySelector('#username').textContent = `@${data.login}`)
	const joinedDate = (document.querySelector('#joined-date').textContent = `Joined ${correctDateFormat}`)
bio = checkIfHasBio()
	const repos = (document.querySelector('#repos').textContent = data.public_repos)
	const followers = (document.querySelector('#followers').textContent = data.followers)
	const following = (document.querySelector('#following').textContent = data.following)
	const location = (document.querySelector('#location').textContent = data.location)
	const website = (document.querySelector('#website').textContent = data.blog)
	const twitter = (document.querySelector('#twitter').textContent = data.twitter_username)
	const company = (document.querySelector('#company').textContent = data.company)
}

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
