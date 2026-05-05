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

                autor: el.authors[0].name,
                lingua: el.languages,

                livro: el.formats["text/plain"],
                direitos: el.copyright,
                ficcao: el.subjects.join(', '),

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

    }

}


const addLivros = async () => {


    const dadosApi = await dataApi()

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

        const listaLivros = document.getElementById('listaLivros')

        listaLivros.innerHTML += `
            <div class="livro" data-index="${index}">
                <img src="${el.capaImg}" alt="Capa do livro" class="imgDoLivro">
                <div class="cLivroInfo">
                    <h3>${el.titulo}</h3>
                    <small>${el.autor}</small>                
                    <p>${el.subTitulo}</p>        
                </div>
            </div>`

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

/* fazer um innerHtml pra colocar todas as clasees duma vez para nao ficar precisando ficar criarnado varioas consts  e almentando o codigo */

/* ajustar pra criar um function pra criar os livros com hide */
