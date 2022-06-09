const button = document.querySelector('#screen-mode__button')
const body = document.querySelector('body')
const headerWrapper = document.querySelector('#headerWrapper')
let theme = localStorage.getItem('theme') || 'light'

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
button.addEventListener('click', () => {
	changeColorScreenMode()
})

