// Vamos fazer da forma mais simples possível.

async function loadEntries() {
    const response = await fetch('/diario');

    const entries = await response.json();

    let containerEntries = document.getElementById('entradas');

    containerEntries.innerHTML = "";

    entries.forEach(entry => {
        const entryHtml = `<div class="entry-card" id="${entry.id}">
          <div>
          <h3 onclick=showItem(this)>${entry.title}</h3>
          <button onclick=deleteItem(${entry.id})>Deletar</button>
          <button onclick=getAnItem(${entry.id})>Editar</button>
          </div>
          
          <p class="content">${entry.content}</p>
          <small>${new Date(entry.createdAt).toLocaleString('pt-BR')}</small>
        </div>`

        containerEntries.innerHTML += entryHtml;
    });
}

// Sinto bugs vindo dessa função com certeza... O.o

function showItem(selectedItem) {
    const card = selectedItem.closest('.entry-card');
    const content = card.querySelector('.content');
    content.classList.toggle('active');
}

// Parece que é mais simples do que parece?
// Algo bem interessante é que toda rota precisa de respostas, ambos se ligam pra tudo funcionar bonitinho.

async function deleteItem(id) {
    let resposta = prompt("Deseja deletar a entrada?", "(Digite 'Sim'");

    if (resposta.toLowerCase() === "sim") {
        const deleteDiario = await fetch(`/diario/${id}`, {
            method: 'DELETE',
        });

        if (deleteDiario.ok) {
            loadEntries();
        } else {
            console.log("Erro ao deletar a entrada.");
        }
    }
};

// Criando a rota mais sozinha que nunca T=T #Editar

function fillInput(data) {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    titleInput.value = data.title;
    contentInput.value = data.content;
}

async function getAnItem(id) {
    const getItem = await fetch(`/diario/${id}`);

    const content = await getItem.json();

    if (content.data) {
        fillInput(content.data);
        document.getElementById('diaryId').value = id;
    }

    console.log(content);
}

// Salvar sem tratamento algum, deixaremos bonito depois

async function salvarItem() {
    const id = document.getElementById('diaryId').value;
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const editItem = await fetch (`/diario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInput.value,
            content: contentInput.value
        })
    });

    if (editItem.ok) {
        console.log('Entrada editada com sucesso!');
        document.getElementById('diaryId').value = '';
        titleInput.value = '';
        contentInput.value = '';
        loadEntries();
    }
};

loadEntries();