// Função para atualizar o relógio
function atualizarRelogio() {
    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');

    // Obtém a data atual
    const dataAtual = new Date();
    
    // Obtém horas, minutos e segundos
    let hr = dataAtual.getHours();
    let min = dataAtual.getMinutes();
    let s = dataAtual.getSeconds();

    // Adiciona zero à esquerda se for menor que 10
    hr = hr < 10 ? '0' + hr : hr;
    min = min < 10 ? '0' + min : min;
    s = s < 10 ? '0' + s : s;

    // Atualiza os elementos do relógio com as novas horas, minutos e segundos
    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = s;
}

// Define a função para atualizar o relógio a cada segundo
const relogio = setInterval(atualizarRelogio, 1000);

// Função para preencher automaticamente o campo de data
function preencherCampoData() {
    // Obtém a referência para o campo de data
    const campoData = document.getElementById('data');

    // Obtém a data atual
    const dataAtual = new Date();

    // Formata a data para o formato dd/mm/yyyy
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Preenche o campo de data com a data atual
    campoData.value = dataFormatada;
}

// Chama a função para preencher automaticamente o campo de data
preencherCampoData();

// Função para buscar a descrição do produto pelo código
function buscarDescricaoProduto(codigo) {
    // Caminho relativo para o arquivo JSON
    const path = 'DADOS.JSON';

    // Realiza uma requisição AJAX para ler o arquivo JSON
    fetch(path)
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            // Verifica se o código está presente no JSON
            if (codigo in data) {
                // Se estiver presente, exibe a descrição do produto correspondente
                document.getElementById('descricao').value = data[codigo];
            } else {
                // Se não estiver presente, exibe uma mensagem de erro
                document.getElementById('descricao').value = 'Código não encontrado';
            }
        })
        .catch(error => {
            // Em caso de erro, exibe uma mensagem de erro
            console.error('Erro ao ler o arquivo JSON:', error);
        });
}

// Função para salvar os dados do formulário
function salvarDados() {
    const dados = {
        nome: document.getElementById('nome').value,
        data: document.getElementById('data').value,
        codigo: document.getElementById('codigo').value,
        descricao: document.getElementById('descricao').value,
        rev: document.getElementById('rev').value
    };

    // Adiciona os dados à lista de produtos
    listaProdutos.push(dados);

    // Limpa os campos do formulário
    limparCampos();

    // Exibe uma mensagem de sucesso ou atualiza a interface de acordo com sua necessidade
    console.log('Dados salvos:', listaProdutos);
}

// Função para limpar os campos do formulário após salvar os dados
function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('rev').value = '';
}

// Lista para armazenar os produtos
const listaProdutos = [];
