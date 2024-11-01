const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const DialogdiaMesAno = document.getElementById("dialog-dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const DialogHoraMinSeg = document.getElementById("dialog-hora-min-seg");

//dias da semana
const arrayDayWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];


const selecTiposPontos = document.getElementById("select-tipos-pontos");
const divAlerta = document.getElementById("div-alerta");

// Objeto que define a sequência dos pontos
let ProxPonto = {
    "Entrada": "intervalo",
    "intervalo": "Volta-intervalo",
    "Volta-intervalo": "Saída",
    "Saída": "Entrada"
};


const dialogPonto = document.getElementById("dialog-ponto");

//localizaçao
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
});

// Lógica do botão para abrir o dialog de registro de ponto
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
   
    let dialogSelect = document.getElementById("select-tipos-pontos");
    let TipoUltimoPonto = localStorage.getItem("tipoUltimoPonto");
    console.log("Último tipo de ponto registrado:", TipoUltimoPonto);

    dialogSelect.value = ProxPonto[TipoUltimoPonto];
    console.log("Próximo tipo de ponto selecionado:", dialogSelect.value);
    dialogPonto.showModal();
});

// Lógica do botão para fechar o dialog de registro de ponto
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// Função para recuperar os pontos salvos no localStorage
function recuperarPontosLocalStorage() {
    let TodosOsPontos = localStorage.getItem("registros");

    if (!TodosOsPontos) {
        return [];
    }

    return JSON.parse(TodosOsPontos);
}

// Função para salvar um novo registro de ponto no localStorage
function salvarRegistroLocalStorage(ponto) {
    let pontos = recuperarPontosLocalStorage();

    pontos.push(ponto);
    localStorage.setItem("registros", JSON.stringify(pontos));
}

// Evento para registrar o ponto
const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", () => {
    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-pontos").value;

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "Id": Date.now() // Usar timestamp como ID único
    };

    salvarRegistroLocalStorage(ponto);
    localStorage.setItem("tipoUltimoPonto", tipoPonto);

    console.log(ponto);

    // alerta de ponto registrado
    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");
    

    const AlertaTexto = document.getElementById("alerta-texto");
    AlertaTexto.textContent = "Ponto Registrado como: " + tipoPonto + " " + hora;


    // Oculta a mensagem de alerta após 5 segundos
    setTimeout(() => {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    }, 5000);

    dialogPonto.close();
    exibirDadosLocalStorage(); // Atualiza a lista de registros
});



// Função para obter o dia da semana atual
function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()];
}


// Função para obter a data completa
function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + date.getFullYear();
}

// Função para obter a hora completa
function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

// Função para atualizar a hora exibida na página
function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
    DialogHoraMinSeg.textContent = horaCompleta();
}

// Atualiza a hora imediatamente e a cada segundo
atualizaHora();
setInterval(atualizaHora, 1000);






diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();
DialogdiaMesAno.textContent = dataCompleta();



// Função para exibir os dados salvos no localStorage
function exibirDadosLocalStorage() {
    const registros = recuperarPontosLocalStorage();
    const listaRegistros = document.getElementById("lista-registros");

    listaRegistros.innerHTML = ""; // Limpa a lista antes de adicionar os itens





//exibir os registros
function exibirRegistros(registros) {
    const listaRegistros = document.getElementById('lista-registros');
    listaRegistros.innerHTML = ''; // Limpa a lista antes de adicionar os itens
    }

    registros.forEach((ponto, index) => {
        const item = document.createElement("li");
        item.textContent = `ID: ${ponto.Id}, Data: ${ponto.data}, Hora: ${ponto.hora}, Tipo: ${ponto.tipo}`;

        // Botão de editar os registros e input de observaçoes
        const btnEditar = document.createElement("button");
        const inputEditar = document.createElement("input");

        inputEditar.type = "text";
        inputEditar.placeholder = "Observação";


        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            editarRegistro(ponto.Id);
        });

        item.appendChild(inputEditar)
        item.appendChild(btnEditar);
        listaRegistros.appendChild(item);




        //botao de excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "excluir";
        btnExcluir.addEventListener("click", () => {
            alert("voce nao possui permiçao para isso");

        });

        item.appendChild(btnExcluir);
        listaRegistros.appendChild(item);




    });
}










// Função para editar um registro
function editarRegistro(id) {
    const registros = recuperarPontosLocalStorage();
    const registro = registros.find(ponto => ponto.Id === id);

    if (registro) {
        const novoTipo = prompt("Digite o novo tipo de ponto:", registro.tipo);
        if (novoTipo) {
            registro.tipo = novoTipo;
            localStorage.setItem("registros", JSON.stringify(registros));
            exibirDadosLocalStorage(); // Atualiza a lista de registros
        }
    }
}




// Chama a função para exibir os dados ao carregar a página
document.addEventListener("DOMContentLoaded", exibirDadosLocalStorage);





// botao do menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active'); // Adiciona ou remove a classe 'active'
});








//logica pro botao de mostrar os registros
const dialogRegistros = document.getElementById("dialog-registros-passados");
const btnFecharRegistros = document.getElementById("fechar-registros");



const btndialogRegistros = document.getElementById("mostrar-registros");
    btndialogRegistros.addEventListener ("click", () => {
    dialogRegistros.showModal();

    
  

});




// logica para o registro de ausencia

const dialogAusencia = document.getElementById("dialog-ausencia");
const btnRegistrarAusencia = document.getElementById("btn-dialog-registrar-ausencia");
const btnFecharDialog = document.getElementById("btn-dialog-fechar");
const inputJustificativa = document.getElementById("justificativa-ausencia");
const inputAtestado = document.getElementById("atestado-ausencia");

btnRegistrarAusencia.addEventListener("click", () => {
    const justificativa = inputJustificativa.value;
    const atestado = inputAtestado.files[0] ? inputAtestado.files[0].name : "Nenhum atestado anexado";
    
    if (justificativa) {
        const registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros.push({ justificativa, atestado, tipo: "ausencia" });
        localStorage.setItem("registros", JSON.stringify(registros));
        inputJustificativa.value = ""; // Limpa o campo de entrada
        inputAtestado.value = ""; // Limpa o campo de arquivo
        dialogAusencia.close();
    } else {
        alert("Por favor, preencha a justificativa.");
    }
});




    














   //logica pra abrir o dialog de justificativa de ausencia
    const btnFecharAusencia = document.getElementById("fechar-ausencia");
    const btndialogAusencia = document.getElementById("mostrar-ausencia");
        btndialogAusencia.addEventListener ("click", () => {
        dialogAusencia.showModal();
        
      
    
        });









