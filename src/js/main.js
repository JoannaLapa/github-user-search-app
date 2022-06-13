'use strict'

const screenModebutton = document.querySelector('#screen-mode__button')
const searchButton = document.querySelector('#search__button')
const searchInput = document.querySelector('#search__input')
const body = document.querySelector('body')
const headerWrapper = document.querySelector('#header__wrapper')
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

const getUserData = function (userName) {
	fetch(`https://api.github.com/users/${userName}`)
		.then(response => response.json())
		.then(data => renderUser(data))
}

const renderUser = function (data) {

	//setting the correct format date for joinedDate
	const options = { year: 'numeric', month: 'short', day: 'numeric' }
	const correctDateFormat = new Date(data.created_at).toLocaleDateString('en-GB', options)
	console.log(correctDateFormat)

	//seting the user data from API
	const avatar = (document.querySelector('#avatar').src = data.avatar_url)
	const name = (document.querySelector('#name').textContent = data.name)
	const login = (document.querySelector('#username').textContent = data.login)
	const joinedDate = (document.querySelector('#joined-date').textContent = `Joined ${correctDateFormat}`)
	const bio = (document.querySelector('#bio').textContent = data.bio)
	const repos = (document.querySelector('#repos').textContent = data.public_repos)
	const followers = (document.querySelector('#followers').textContent = data.followers)
	const following = (document.querySelector('#following').textContent = data.following)
	const location = (document.querySelector('#location').textContent = data.location)
	const website = (document.querySelector('#website').textContent = data.blog)
	const twitter = (document.querySelector('#twitter').textContent = data.twitter_username)
	const company = (document.querySelector('#company').textContent = data.company)
}

// const renderError (msg) => {

// }

searchButton.addEventListener('click', e => {
	e.preventDefault()
	userName = searchInput.value.split(' ').join('')
	getUserData(userName)
	searchInput.value = ''
})

screenModebutton.addEventListener('click', () => {
	changeColorScreenMode()
})
