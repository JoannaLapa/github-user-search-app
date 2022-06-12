'use strict'

const screenModebutton = document.querySelector('#screen-mode__button')
const searchButton = document.querySelector('#search__button')
const searchInput = document.querySelector('#search__input')
const body = document.querySelector('body')
const headerWrapper = document.querySelector('#header__wrapper')
let theme = localStorage.getItem('theme') || 'light'
const userProfileContainer = document.querySelector('#user-profile__container')

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

const getUserData = function (userName){
fetch(`https://api.github.com/users/${userName}`).then(response => response.json()).then(data => renderUser(data))
}

const renderUser = function (data){
	console.log(data.created_at);
const avatar = document.querySelector('#avatar').src = data.avatar_url
const name = document.querySelector('#name').textContent = data.name
const login = document.querySelector('#username').textContent = data.login
const joinedDate = document.querySelector('#joined-date').textContent= data.created_at
//   </div>
//   <h2 class="overview__bio">${data.bio}</h2>
// </div>
// <div class="statistics__container">
//   <div class="statistics__box">
// 	<h4 class="statistics__title">Repos</h4>
// 	<p class="statistics__numbers">${data.public_repos}</p>
//   </div>
//   <div class="statistics__box">
// 	<h4 class="statistics__title">Followers</h4>
// 	<p class="statistics__numbers">${data.followers}</p>
//   </div>
//   <div class="statistics__box">
// 	<h4 class="statistics__title">Following</h4>
// 	<p class="statistics__numbers">${data.following}</p>
//   </div>
// </div>

// <div class="contact__container">
//   <div class="contact__box">
// 	<img src="/src/img/icon-location.svg" alt="" class="contact__icon">
// 	<p class="contact__details">${data.location}</p>
//   </div>
//   <div class="contact__box">
// 	<img src="../src/img/icon-website.svg" alt="" class="contact__icon">
// 	<p class="contact__details">${data.blog}</p>
//   </div>
//   <div class="contact__box">
// 	<img src="../src/img/icon-twitter.svg" alt="" class="contact__icon">
// 	<p class="contact__details">${data.twitter_username}</p>
//   </div>
//   <div class="contact__box">
// 	<img src="../src/img/icon-company.svg" alt="" class="contact__icon">
// 	<p class="contact__details">${data.company}</p>
//   </div>
// </div>`;

}
getUserData(userName)


searchButton.addEventListener('click', (e) =>{
	e.preventDefault()
	userName = searchInput.value.split(' ').join('')
	console.log(userName)
	getUserData(userName)
})
		
screenModebutton.addEventListener('click', () => {
	changeColorScreenMode()
})

// const renderUser = function (data){
// 	const html = 
// 	`<div class="overview__container">
// 	  <a href="" class="overview__avatar"><img class="avatar" src="${data.avatar_url}"
// 		  alt=""></a>
// 	  <div class="overview__names-box">
// 		<h1 class="overview__name">${data.name}</h1>
// 		<h3 class="overview__username">@ ${data.login}</h3>
// 		<p class="overview__joined-date">Joined ${data.created_at}</p>
// 	  </div>
// 	  <h2 class="overview__bio">${data.bio}</h2>
// 	</div>
// 	<div class="statistics__container">
// 	  <div class="statistics__box">
// 		<h4 class="statistics__title">Repos</h4>
// 		<p class="statistics__numbers">${data.public_repos}</p>
// 	  </div>
// 	  <div class="statistics__box">
// 		<h4 class="statistics__title">Followers</h4>
// 		<p class="statistics__numbers">${data.followers}</p>
// 	  </div>
// 	  <div class="statistics__box">
// 		<h4 class="statistics__title">Following</h4>
// 		<p class="statistics__numbers">${data.following}</p>
// 	  </div>
// 	</div>
	
// 	<div class="contact__container">
// 	  <div class="contact__box">
// 		<img src="/src/img/icon-location.svg" alt="" class="contact__icon">
// 		<p class="contact__details">${data.location}</p>
// 	  </div>
// 	  <div class="contact__box">
// 		<img src="../src/img/icon-website.svg" alt="" class="contact__icon">
// 		<p class="contact__details">${data.blog}</p>
// 	  </div>
// 	  <div class="contact__box">
// 		<img src="../src/img/icon-twitter.svg" alt="" class="contact__icon">
// 		<p class="contact__details">${data.twitter_username}</p>
// 	  </div>
// 	  <div class="contact__box">
// 		<img src="../src/img/icon-company.svg" alt="" class="contact__icon">
// 		<p class="contact__details">${data.company}</p>
// 	  </div>
// 	</div>`;
	
// 	userProfileContainer.insertAdjacentHTML('beforeend', html);
// 	}