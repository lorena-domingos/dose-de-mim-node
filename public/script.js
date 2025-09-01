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

loadEntries();