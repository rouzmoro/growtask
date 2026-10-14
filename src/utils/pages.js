export function showPage(pageName, replace = false) {
    const pages = document.querySelectorAll('.page');
    for (const page of pages) {
        page.style.display = 'none';
    }

    document.querySelector(`.page--${pageName}`).style.display = '';

    const url = `/${pageName}`;
    const state = { page: pageName };

    if (replace) {
        history.replaceState(state, '', url);
    } else {
        history.pushState(state, '', url);
    }
}