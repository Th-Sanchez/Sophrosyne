const grafico_post = document.getElementById('myChart')

grafico_post.style.backgroundColor = '#0A0A0A'  

const labels = [`Janeiro`, `Fevereiro`, `Março`, `Abril`, `Maio`, `Junho`, `Julho`, `Agosto`, `Setembro`, `Outubro`, `Novembro`, `Dezembro`];

const data = {
    labels: labels,
    datasets: [{
        label: '',
        data: [65, 59, 80, 81, 56, 55, 40, 43, 21, 63, 33, 56],
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