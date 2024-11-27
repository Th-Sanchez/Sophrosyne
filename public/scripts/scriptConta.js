function limparSessao() {
    sessionStorage.clear();
    window.location = "./index.html";
}

function excluirConta() {
    var idUsuarioVar = sessionStorage.ID_USUARIO;
    var nomeVar = sessionStorage.NOME_USUARIO;
    var emailVar = sessionStorage.EMAIL_USUARIO;
    var senhaVar = sessionStorage.SENHA_USUARIO;

    var nome = input_nome_del.value;
    var email = input_email_del.value;
    var senha = input_senha_del.value;

    if (nome != nomeVar) {
        return alert('Nome incorreto!')
    } else if (email != emailVar) {
        return alert('Email incorreto!')
    } else if (senha != senhaVar) {
        return alert('Senha incorreta!')
    }

    fetch("/usuarios/excluirConta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);

                sessionStorage.clear()

                setTimeout(function () {
                    window.location = "/index.html";
                }, 1000); // apenas para exibir o loading
            });

        } else {

            console.log("Houve um erro ao tentar excluir a conta!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function trocarNome() {
    var idUsuarioVar = sessionStorage.ID_USUARIO;
    var nomeVar = input_nome.value

    fetch("/usuarios/trocarNome", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);

                setTimeout(function () {
                    window.location = "/index.html";
                }, 1000); // apenas para exibir o loading
            });

        } else {

            console.log("Houve um erro ao tentar excluir a conta!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function trocarTela(telaAtual) {
    var dashboard = document.getElementById('dashboard')
    var nome = document.getElementById('nome')
    var senha = document.getElementById('senha')
    var conta = document.getElementById('conta')

    if (telaAtual == 'Dashboard') {
        dashboard.style.display = 'flex';
        nome.style.display = 'none';
        senha.style.display = 'none';
        conta.style.display = 'none';
    } else if (telaAtual == 'trocarNome') {
        dashboard.style.display = 'none';
        nome.style.display = 'flex';
        senha.style.display = 'none';
        conta.style.display = 'none';
    } else if (telaAtual == 'trocarSenha') {
        dashboard.style.display = 'none';
        nome.style.display = 'none';
        senha.style.display = 'flex';
        conta.style.display = 'none';
    } else {
        dashboard.style.display = 'none';
        nome.style.display = 'none';
        senha.style.display = 'none';
        conta.style.display = 'flex';
    }
}

function totalPost() {
    var idUsuarioVar = JSON.parse(sessionStorage.ID_USUARIO);

    fetch(`/conta/totalPost/${idUsuarioVar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then( resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                var totalPost = document.getElementById('totalPost');
                totalPost.innerHTML = `${json[0].totalPost}`
            });
        } else {
            console.log("Houve um erro ao buscar o total de posts do usuario");
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro);
    })

    return false;
}

function totalCurtidas() {
    var idUsuarioVar = JSON.parse(sessionStorage.ID_USUARIO);

    fetch(`/conta/totalCurtidas/${idUsuarioVar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then( resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                var totalCurtidas = document.getElementById('totalCurtidas');
                totalCurtidas.innerHTML = `${json[0].totalCurtidas}`
            });
        } else {
            console.log("Houve um erro ao buscar o total de posts do usuario");
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro);
    })

    return false;
}

function postMaisCurtido() {
    var idUsuarioVar = JSON.parse(sessionStorage.ID_USUARIO);

    fetch(`/conta/postMaisCurtido/${idUsuarioVar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then( resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                var titulo = document.getElementById('titulo-post');
                var texto = document.getElementById('texto-post');
                titulo.innerHTML = `${json[0].titulo}`
                texto.innerHTML = `${json[0].texto}`
            });
        } else {
            console.log("Houve um erro ao buscar o total de posts do usuario");
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro);
    })

    return false;
}

function numeroPostsMes() {
    var idUsuarioVar = JSON.parse(sessionStorage.ID_USUARIO);

    fetch(`/conta/numeroPostsMes/${idUsuarioVar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then( resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                const grafico_post = document.getElementById('myChart')
                grafico_post.style.backgroundColor = '#0A0A0A'  

                var listaNumeroPosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                for (var i = 0; i < json.length; i++) {
                    listaNumeroPosts.splice(json[i].mes - 1, 1, json[i].qtdPosts);
                }

                const labels = [`Janeiro`, `Fevereiro`, `Março`, `Abril`, `Maio`, `Junho`, `Julho`, `Agosto`, `Setembro`, `Outubro`, `Novembro`, `Dezembro`];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: '',
                        data: listaNumeroPosts,
                        backgroundColor: [
                            '#F7B61C'
                        ],
                        borderWidth: 1
                    }]
                };

                const config = {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                        },
                        layout: {
                            padding: 20
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Numero de post (Mês)',
                                align: 'start',
                                color: 'white',
                                font: {
                                    size: 16,
                                    family: 'Libre Baskerville'
                                }
                            },
                            legend: {
                                display: false
                            }
                        }
                    },
                };

                const graficoPost = new Chart(grafico_post, config);
            });
        } else {
            console.log("Houve um erro ao buscar o total de posts do usuario");
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro);
    })
}