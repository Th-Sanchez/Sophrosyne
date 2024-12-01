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
                if (json[0].totalCurtidas != null) {
                    totalCurtidas.innerHTML = `${json[0].totalCurtidas}`
                } else {
                    totalCurtidas.innerHTML = `0`
                }
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

function confirmarTrocarNome() {
    const nomeUsuario = sessionStorage.NOME_USUARIO;
    const nomeAtual = input_nome_atual.value
    const novoNome = input_novo_nome.value
    const confirmarNovoNome = input_cnovo_nome.value

    if (nomeAtual != nomeUsuario) {
        return alert('O nome atual está incorreto!')
    } else if (nomeAtual == novoNome) {
        return alert('O novo nome é igual ao nome antigo!')
    } else if (novoNome != confirmarNovoNome) {
        return alert('A confirmarção de nome está errada!')
    }

    var displayConfirmarcao = document.getElementById('confirmarNome');
    var sectionConfirmacoes = document.getElementById('confirmacoes');

    displayConfirmarcao.style.display = 'flex';
    sectionConfirmacoes.style.display = 'flex';
}

function closeConfirm(telaConfirma) {
    var sectionConfirmacoes = document.getElementById('confirmacoes');
    if (telaConfirma == `Name`) {
        var displayConfirmarcao = document.getElementById('confirmarNome');

        displayConfirmarcao.style.display = 'none';
        sectionConfirmacoes.style.display = 'none';
    }
}

function confirmarTrocarSenha() {
    const senhaUsuario = sessionStorage.SENHA_USUARIO;
    const senhaAtual = input_senha_atual.value
    const novaSenha = input_novo_senha.value
    const confirmarNovaSenha = input_cnovo_senha.value

    if (senhaAtual != senhaUsuario) {
        return alert('A senha atual está incorreto!')
    } else if (senhaAtual == novaSenha) {
        return alert('O novo nome é igual ao nome antigo!')
    } else if (novaSenha != confirmarNovaSenha) {
        return alert('A confirmarção de nome está errada!')
    }
    
    var tudoCerto = 1 

    for (var i = 0; i <= tudoCerto; i++) {
        var primeiraPosicao = Math.round(Math.random() * 18 + 1);
        var segundaPosicao = Math.round(Math.random() * 19 + 1);

        if (primeiraPosicao > segundaPosicao || segundaPosicao - primeiraPosicao > 4 || segundaPosicao - primeiraPosicao == 0) {
            tudoCerto++
        }
    }

    const listaPalavras = [
        "virtude ", "sabedoria ", "disciplina ", "autocontrole ", "tranquilidade ",
        "reflexão ", "gratidão ", "razão ", "fortaleza ", "eudaimonia ",
        "cosmos ", "prática ", "resiliência ", "destino ", "ação ",
        "aceitação ", "propósito ", "harmonia ", "coragem ", "serenidade "
    ];

    var fraseFinal = ''

    for (var palavraAtual = primeiraPosicao; palavraAtual <= segundaPosicao; palavraAtual++) {
        fraseFinal += listaPalavras[palavraAtual]
    }

    fraseAleatoria.innerHTML = fraseFinal

    var displayConfirmarcao = document.getElementById('confirmarSenha');
    var sectionConfirmacoes = document.getElementById('confirmacoes');

    displayConfirmarcao.style.display = 'flex';
    sectionConfirmacoes.style.display = 'flex';
}

function closeConfirm(telaConfirma) {
    var sectionConfirmacoes = document.getElementById('confirmacoes');
    if (telaConfirma == `Name`) {
        var displayConfirmarcao = document.getElementById('confirmarNome');

        displayConfirmarcao.style.display = 'none';
        sectionConfirmacoes.style.display = 'none';
    } else if (telaConfirma == `Password`) {
        var displayConfirmarcao = document.getElementById('confirmarSenha');

        displayConfirmarcao.style.display = 'none';
        sectionConfirmacoes.style.display = 'none';
    }
}

function trocarNome() {
    var idUsuarioVar = sessionStorage.ID_USUARIO;
    var senhaStorage = sessionStorage.SENHA_USUARIO;
    var nomeVar = input_novo_nome.value;
    var senhaUsuario = input_confirm_senha.value;

    if (senhaUsuario != senhaStorage) {
        return alert(`Senha incorreta!`)
    }

    fetch("/usuarios/trocarNome", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar,
            nomeServer: nomeVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                alert(`Nome alterado com sucesso!`)

                sessionStorage.NOME_USUARIO	= nomeVar;

                input_nome_atual.value = ''
                input_novo_nome.value = ''
                input_cnovo_nome.value = ''
                input_confirm_senha.value = ''
                
                var sectionConfirmacoes = document.getElementById('confirmacoes');
                var displayConfirmarcao = document.getElementById('confirmarNome');

                displayConfirmarcao.style.display = 'none';
                sectionConfirmacoes.style.display = 'none';
            });

        } else {

            console.log("Houve um erro ao tentar trocar o nome!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function trocarSenha() {
    var idUsuarioVar = sessionStorage.ID_USUARIO;
    var senhaVar = input_novo_senha.value
    var fraseFinal = fraseAleatoria.innerHTML
    var fraseUsuario = input_confirm_quote.value; + ' '

    if (fraseFinal != fraseUsuario) {
        return alert(`Frase incorreta!`)
    }

    fetch("/usuarios/trocarSenha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                alert(`Senha alterada com sucesso!`)

                sessionStorage.SENHA_USUARIO = senhaVar;

                input_senha_atual.value = ''
                input_novo_senha.value = ''
                input_cnovo_senha.value = ''
                input_confirm_quote.value = ''
                
                var sectionConfirmacoes = document.getElementById('confirmacoes');
                var displayConfirmarcao = document.getElementById('confirmarSenha');

                displayConfirmarcao.style.display = 'none';
                sectionConfirmacoes.style.display = 'none';
            });

        } else {

            console.log("Houve um erro ao tentar trocar a senha!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
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

function limparSessao() {
    sessionStorage.clear();
    window.location = "./index.html";
}
