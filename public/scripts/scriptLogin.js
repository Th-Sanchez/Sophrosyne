var containerLogin = document.getElementById('login')
    var containerRegister = document.getElementById('register')

    function changeForms(telaAtual) {
        if (telaAtual == 'login') {
            containerLogin.style.display = 'none'
            containerRegister.style.display = 'flex'
        } else {
            containerLogin.style.display = 'flex'
            containerRegister.style.display = 'none'
        }
    }

    function entrar() {
        var emailVar = email_input.value;
        var senhaVar = senha_input.value;

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log(json);
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.SENHA_USUARIO = json.senha;

                    setTimeout(function () {
                        window.location = "/feed.html";
                    }, 1000); // apenas para exibir o loading
                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

    function cadastrar() {
        // aguardar();
        var nomeVar = cadastro_nome_input.value;
        var emailVar = cadastro_email_input.value;
        var senhaVar = cadastro_senha_input.value;
        var confirmacaoSenhaVar = confirmacao_senha_input.value;

        if (senhaVar != confirmacaoSenhaVar) {
            alert('ATENÇÃO! As senha digitadas deve ser iguais');
            return;
        }

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    setTimeout(() => {
                        window.location = "login.html";
                    }, "2000");
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }

    function estaLogado() {
        var email = sessionStorage.EMAIL_USUARIO;
        var id = sessionStorage.ID_USUARIO;

        if (email != null && id != null) {
            window.location = "./conta.html"
        } else {
            sessionStorage.clear()
        }
    }