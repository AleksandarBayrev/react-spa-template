import '@app-styles/App.css';
document.body.addEventListener("load", () => {
    const container = document.createElement('div');
    container.classList.add('app-wrapper');
    container.innerHTML = 'Loading website, please wait...';
    document.body.appendChild(container);
});