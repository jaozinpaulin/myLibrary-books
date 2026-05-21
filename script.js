const dataApi = async () => {
    try {

        const bodyH = document.body
        bodyH.classList.add('ativeBody')

        const load = document.querySelector('.cLoad')
        load.classList.remove('hide')

        const resposta = await fetch('https://gutendex.com/books')

        const data = await resposta.json()
        const infoLivros = data.results.map(el => {
            return {
                titulo: el.title,
                capaImg: el.formats["image/jpeg"],
                subTitulo: el.summaries,

                autor: el.authors[0].name.split(', ')[0],
                lingua: el.languages,

                livro: el.formats["text/plain"],
                direitos: el.copyright,
                ficcao: el.bookshelves.join(' '),

                download: el.download_count
            }
        })
        return infoLivros

    } catch (error) {
        console.log('erro ao buscar dados')
    }
    finally {
        document.body.classList.remove('ativeBody')
        document.querySelector('.cLoad').classList.add('hide')

        /* fazer um tratamento como uma pagina de erro 404 */
        /* fazer um tratamento de um msg se estiver demorando para carregar */
    }
}


const addLivros = async () => {

    const dadosApi = await dataApi()
    console.log('execultou')
    const todosGeneros = [];

    dadosApi.slice(0, 3)
        .forEach((el, index) => {
            const heroImages = document.querySelector('.heroImages')

            heroImages.innerHTML += `

            <div class="livroHero" data-index="${index}">
                <img src="${el.capaImg}" alt="${el.titulo}" class="livroHero${index + 1}">
                <span class="rank">#${index + 1}</span>
                <span class="downloadsTop">${el.download || '---'} downloads</span>
                <span class="tag">
                    ${index === 0 ? 'Top' : index === 1 ? 'Popular' : 'Em alta'}
                </span>
            </div>`;

            const livroHero = document.querySelectorAll('.livroHero')
            livroHero.forEach((el) => {
                el.addEventListener('click', (evt) => {
                    console.log('top tres')
                    abrirLeitura()
                    livrosHide(el, dadosApi)
                })
            })

        })

    dadosApi.forEach((el, index) => {

        const generoLivro = el.ficcao
        const generosLivros = guardarGenero(generoLivro).join(' ')

        const listaLivros = document.getElementById('listaLivros')
        const containerLivros = document.querySelector('.containerLivros')


        const livroAll = `
            <div class="livro" data-index="${index}" data-genero="${generosLivros}" data-author="${el.autor}">
                <img src="${el.capaImg}" alt="Capa do livro" class="imgDoLivro">
                <div class="cLivroInfo">
                    <h3>${el.titulo}</h3>
                    <small class="autorSub">${el.autor}</small>                
                    <p>${el.subTitulo}</p>        
                </div>
            </div>`

        listaLivros.innerHTML += livroAll
        containerLivros.innerHTML += livroAll


        const allLivro = document.querySelectorAll('.livro')
        allLivro.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.stopPropagation()
                abrirLeitura()
                livrosHide(el, dadosApi)

            })
        })

    })
}

addLivros()



const livrosHide = (item, dadosApi) => {

    const indexAtual = item.dataset.index

    const dadosInfos = dadosApi[indexAtual]

    const imgLivroHide = document.querySelector('.imgLivroHide').src = dadosInfos.capaImg
    const tituloHide = document.querySelector('.tituloHide')
    tituloHide.textContent = dadosInfos.titulo

    const sinopseSub = document.querySelector('.sinopse p')
    sinopseSub.textContent = dadosInfos.subTitulo

    const nameAutor = document.querySelector('.nameAutor')
    nameAutor.textContent = `👤 Nome do Autor : ${dadosInfos.autor}`

    const lingua = document.querySelector('.lingua')
    lingua.textContent = `🌍 ${dadosInfos.lingua = `English`}`

    const direitos = document.querySelector('.direitos')

    direitos.textContent = dadosInfos.direitos ? '🔒 Direitos Autorais' : '⚖️ Domínio Público'

    const categoria = document.querySelector('.categoria')
    categoria.textContent = `📚 ${dadosInfos.ficcao}`

    const downloads = document.querySelector('.downloads')
    downloads.textContent = `⬇️ ${dadosInfos.download} downloads`

    document.querySelector('.containerPrincipal').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

}


const btnVoltar = document.getElementById('btnVoltar')
btnVoltar.addEventListener('click', (evt) => {

    evt.stopPropagation()
    fecharLeitura()
})

const containerPrincipal = document.querySelector('.containerPrincipal')
containerPrincipal.addEventListener('click', (evt) => {

    if (evt.target === containerPrincipal) {
        const containerLeitura = document.getElementById('leituraContainer')

        if (!containerLeitura.classList.contains('hide')) {
            fecharLeitura()
        }

    }
})



const abrirLeitura = () => {
    document.querySelector('.leitura-container').classList.remove('hide')
    document.querySelector('.hero').classList.add('hide')

    document.querySelector('.boxBusca').classList.add('hide')
    document.querySelector('.categorias').classList.add('hide')
    document.querySelector('.sectionLivros').classList.add('hide')

}


const fecharLeitura = () => {
    document.querySelector('.leitura-container').classList.add('hide')
    document.querySelector('.hero').classList.remove('hide')

    document.querySelector('.boxBusca').classList.remove('hide')
    document.querySelector('.categorias').classList.remove('hide')
    document.querySelector('.sectionLivros').classList.remove('hide')
}




const tiposGeneros = async () => {
    /* filtros */
    const dadosApiGenero = await dataApi()
    const todosGeneros = [];

    dadosApiGenero.forEach((el) => {
        const generoLivro = el.ficcao
        const generosLivros = guardarGenero(generoLivro)
        todosGeneros.push(...generosLivros)
    })

    const generosFiltrados = [... new Set(todosGeneros)]

    generosFiltrados.forEach((el) => {
        const containerFiltroGenero = document.querySelector('.containerFiltroGenero');

        containerFiltroGenero.innerHTML += `
            <div class="cardGenero" data-genero="${el}">
                ${el}
            </div>`;
    })

    /* autor */

    dadosApiGenero.slice(0, 5).forEach((el) => {
        const containerAutores = document.querySelector('.containerAutores');

        containerAutores.innerHTML += `
        <div class="cardAutor" data-author="${el.autor}">
            ${el.autor}
        </div>`;
    })
}

const filterBtns = () => {
    /* btn close */
    const filtroHp2 = document.querySelector('.filtroHp2').addEventListener('click', () => {
        document.querySelectorAll('.livro').forEach(e => e.classList.remove('hide'))

        cardGenero.forEach(e => e.classList.remove('ativo'))
        cardAutor.forEach(e => e.classList.remove('ativo'))
    })

    /* input */
    const inputCategoria = document.querySelector('.inputCategoria').addEventListener('input', (evt) => {
        const inputNameLivro = evt.target.value.trim().toLowerCase()
        let encontrados = 0;

        document.querySelectorAll('.livro').forEach((e) => {
            const nomeLivro = e.querySelector('.cLivroInfo h3').textContent.toLowerCase()
            const nomeAutor = e.querySelector('.autorSub').textContent.toLowerCase()
            const nomeGenero = e.dataset.genero.toLowerCase()

            const encontrou =
                nomeLivro.includes(inputNameLivro) ||
                nomeAutor.includes(inputNameLivro) ||
                nomeGenero.includes(inputNameLivro);

            e.classList.toggle('hide', !encontrou)

            if (encontrou) encontrados++;
            const estadoVazio = document.querySelector('.estadoVazio')
            if (encontrados === 0) {
                estadoVazio.classList.remove('hide')
            } else {
                estadoVazio.classList.add('hide')
            }
        })
    })


    const cardGenero = document.querySelectorAll('.cardGenero')

    cardGenero.forEach((el) => {

        el.addEventListener('click', (evt) => {
            cardGenero.forEach(e => e.classList.remove('ativo'))
            evt.target.classList.toggle('ativo')

            const generoTipo = evt.target.dataset.genero
            const livroGenero = document.querySelectorAll('.livro')

            livroGenero.forEach((el) => {
                const dataGenero = el.dataset.genero.split(' ')

                if (dataGenero.includes(generoTipo)) {
                    cardAutor.forEach(e => e.classList.remove('ativo'))
                    el.classList.remove('hide')

                } else {
                    el.classList.add('hide')
                }
            })


        })
    })


    const cardAutor = document.querySelectorAll('.cardAutor')
    cardAutor.forEach((el) => {
        el.addEventListener('click', (evt) => {
            cardAutor.forEach(e => e.classList.remove('ativo'))
            evt.target.classList.add('ativo')

            const authorTipo = evt.target.dataset.author

            const livroGenero = document.querySelectorAll('.livro')
            livroGenero.forEach((el) => {
                const dataAuthor = el.dataset.author

                if (dataAuthor.includes(authorTipo)) {
                    cardGenero.forEach(e => e.classList.remove('ativo'))
                    el.classList.remove('hide')

                } else {
                    el.classList.add('hide')
                }
            })

        })
    })

}

const btnsHomePage = () => {

    document.getElementById('btnExplorar').addEventListener('click', () => {
        document.getElementById('sectionLivros').scrollIntoView('#sectionLivros')
    })

    document.querySelectorAll('.btnCategorias').forEach((el) => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.navItem').forEach(e => e.classList.remove('active')
            )

            document.querySelector('.btnCategoriasNav').classList.add('active')
            document.getElementById('sectionLivros').classList.add('hide')
            document.querySelector('.hero').classList.add('hide')
            document.querySelector('.categoriasSection').classList.remove('hide')
        })
    })

    document.querySelectorAll('.homeNav').forEach((el) => {
        el.addEventListener('click', (evt) => {
            document.querySelectorAll('.navItem').forEach(e => e.classList.remove('active')
            )
            document.querySelector('.homeNavHero').classList.add('active')
            document.getElementById('sectionLivros').classList.remove('hide')
            document.querySelector('.hero').classList.remove('hide')
            document.querySelector('.categoriasSection').classList.add('hide')
        })
    })
}
btnsHomePage()


const esperaInit = async () => {
    await tiposGeneros()
    filterBtns()
}

esperaInit()

const guardarGenero = (generosTextos) => {

    const infosGenero = generosTextos.toLowerCase();

    const generos = [];

    if (infosGenero.includes("fantasy"))
        generos.push("Fantasy");

    if (infosGenero.includes("science"))
        generos.push("Science");

    if (infosGenero.includes("history"))
        generos.push("History");

    if (
        infosGenero.includes("romance") ||
        infosGenero.includes("love")
    )
        generos.push("Romance");

    if (infosGenero.includes("adventure"))
        generos.push("Adventure");

    if (
        infosGenero.includes("children") ||
        infosGenero.includes("juvenile")
    )
        generos.push("Children");

    if (
        infosGenero.includes("horror") ||
        infosGenero.includes("gothic")
    )
        generos.push("Horror");

    if (
        infosGenero.includes("mystery") ||
        infosGenero.includes("detective")
    )
        generos.push("Mystery");

    if (infosGenero.includes("poetry"))
        generos.push("Poetry");

    if (infosGenero.includes("drama"))
        generos.push("Drama");

    if (infosGenero.includes("philosophy"))
        generos.push("Philosophy");

    if (infosGenero.includes("religion"))
        generos.push("Religion");

    if (
        infosGenero.includes("biography") ||
        infosGenero.includes("autobiography")
    )
        generos.push("Biography");

    if (
        infosGenero.includes("politics") ||
        infosGenero.includes("government")
    )
        generos.push("Politics");

    if (
        infosGenero.includes("education") ||
        infosGenero.includes("teaching")
    )
        generos.push("Education");

    if (
        infosGenero.includes("art") ||
        infosGenero.includes("painting")
    )
        generos.push("Art");

    if (infosGenero.includes("music"))
        generos.push("Music");

    if (
        infosGenero.includes("travel") ||
        infosGenero.includes("journey")
    )
        generos.push("Travel");

    if (
        infosGenero.includes("nature") ||
        infosGenero.includes("animals")
    )
        generos.push("Nature");

    return generos.length ? generos : ["Fiction"];
};


