const button = document.querySelector('#screen-mode__button');
const body = document.querySelector('body');
const headerWrapper = document.querySelector('#headerWrapper')
let theme = localStorage.getItem('theme') || 'light'
button.addEventListener("click", () => {
   if(theme === "dark"){
    body.classList.remove('dark')
    button.textContent = 'DARK'
    theme = 'light'
   }else {
    body.classList.add('dark')
    button.textContent = 'LIGHT'
    theme = 'dark'
   }
localStorage.setItem('theme', theme)
})

if(theme === 'dark') {
    body.classList.add('dark')
    button.textContent = 'LIGHT'
}