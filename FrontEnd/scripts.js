
const lista = document.getElementById('lista')
const apiUrl = 'http://localhost:3000/';

let edicao = false;
let idEdicao = 0;
let Nome = document.getElementById('titulo');
let Imagem = document.getElementById('empresa');
let Genero = document.getElementById('logo');
let Nota = document.getElementById('salario');




const getFilmes = async () => {
    
    const response = await fetch(apiUrl)
    const filmes = await response.json();
    console.log(filmes);

    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend',`
        <div class="col">
            <div class="card">
                        <div>
                            <h4 class="card-subtitle text-success text-center">${filme.Nota}</h4>
                        </div>
                      <img src="${filme.Imagem}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title text-center"> ${filme.Nome}</h5>
                        <h7 class="card-title">${filme.Genero}</h7>
                        <p class="card-text"></p>
                        <div>
                          <button class="btn btn-danger ('${filme.id}')">Excluir</button>
                          <button class="btn btn-primary ('${filme.id}')">Editar</button>
                        </div>
                      </div>
                    </div>
                </div>
        
        `)
    })
}

const submitForm = async (event) => {
    
    event.preventDefault();
    const filme = {
        Nome: Nome.value,
        Imagem: Imagem.value,
        Genero: Genero.value,
        Nota: parseFloat(Nota.value),
    }
    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
    
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    const response = await fetch(request);
    const result = await response.json();
    alert(result.message)
    getFilmes();

}

const putFilme = async(filme, id) => {
    
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}



const deleteFilme = async (id) => {
    
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })
    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}
const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}

const editFilme = async (id) => {
    
    edicao = true;
    idEdicao = id;
    const filme = await getFilmeById(id);
    Nome.value = filme.Nome;
    Imagem.value =  filme.Imagem;
    Genero.value = filme.Genero;
    Nota.value = filme.Nota;
    
    
}

const clearFields = () => {
    Nome.value = '';
    Imagem.value = '';
    Genero.value = '';
    Nota.value = '';
    
}

getFilmes();
