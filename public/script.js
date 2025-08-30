// Vamos fazer da forma mais simples possível.

async function loadEntries() {
    const response = await fetch('/diario');

    const entries = await response.json();

    let containerEntries = document.getElementById('entradas');

    entries.forEach(entry => {
        const entryHtml = `<div class="entry-card">
          <h3 onclick=showItem(this)>${entry.title}</h3>
          <p class="content">${entry.content}</p>
          <small>${new Date(entry.createdAt).toLocaleString('pt-BR')}</small>
        </div>`

        containerEntries.innerHTML += entryHtml;
    });
}

// Sinto bugs vindo dessa função com certeza... O.o

function showItem(selectedItem) {
    const card = selectedItem.parentElement;
    const content = card.querySelector('.content');
    content.classList.toggle('active');
}

loadEntries();