import '@app-styles/App.css';

window.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement('div');
    container.classList.add('app-wrapper');
    container.innerHTML = 'Loading website, please wait...';
    document.body.appendChild(container);
});