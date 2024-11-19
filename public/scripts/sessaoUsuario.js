function estaLogado() {
    var email = sessionStorage.EMAIL_USUARIO;
    var id = sessionStorage.ID_USUARIO;

    if (email != null && id != null) {
        window.location = "./conta.html"
    } else {
        sessionStorage.clear()
    }
}