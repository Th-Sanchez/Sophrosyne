function estaLogado() {
    var email = sessionStorage.EMAIL_USUARIO;
    var id = sessionStorage.ID_USUARIO;

    if (email != null && id != null) {
        if (window.location.pathname.endsWith(`index.html`)) {
            var navBar = document.querySelector('#loginNav')
            navBar.textContent = 'Feed'
            navBar.href = './feed.html'
        } else if (window.location.pathname.endsWith(`login.html`)) {
            window.location = "./conta.html"
        }
    } else {
        sessionStorage.clear()
    }
}