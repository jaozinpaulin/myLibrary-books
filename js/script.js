import { libraryData, atualizarLocalStorage, dataApi } from './api&LocalStorage.js';
import { guardarGenero } from './filterGene.js'

import { abrirLoading, fecharLoading, mostrarErro, esconderErro, mostrarVazio } from './loading&error.js'
import {
    resetPage, resetLivros, atualizarLivrosFavoritos, atualizarGridFavoritos, horaAtualizada, atualizarIconFav, atualizarInfosFavoritos, atualizarRelogio
} from './ui.js'




let livrosVisiveis = 6;

let dadosRender = [];

const renderLivros = (dadosApi) => {
    const listaLivros = document.getElementById('listaLivros');

    const containerLivros = document.querySelector('.containerLivros');

    const favoritosGrid = document.querySelector('.favoritosGrid');

    listaLivros.innerHTML = '';
    containerLivros.innerHTML = '';
    favoritosGrid.innerHTML = '';

    /* render */

    dadosApi.slice(0, livrosVisiveis).forEach((el, index) => {
        const generoLivro = el.ficcao;

        const generosLivros = guardarGenero(generoLivro).join(' ');
        const livroAll = `

                <div class="livro" 
                    data-index="${index}" 
                    data-genero="${generosLivros}" 
                    data-author="${el.autor}">

                    <img src="${el.capaImg}" 
                        alt="Capa do livro" 
                        class="imgDoLivro">

                    <div class="cLivroInfo">
                        <h3>${el.titulo}</h3>
                        <small class="autorSub">
                            ${el.autor}
                        </small>

                        <p>${el.subTitulo}</p>
                    </div>

                    <span class="favoritosLivroIcon hide">
                        <i class="material-symbols-rounded">
                            favorite
                        </i>
                    </span>

                </div>
            `;

        listaLivros.innerHTML += livroAll;
    });

    dadosApi.forEach((el, index) => {
        const generoLivro = el.ficcao;

        const generosLivros = guardarGenero(generoLivro).join(' ');
        const livroAllP2 = `

                <div class="livro" 
                    data-index="${index}" 
                    data-genero="${generosLivros}" 
                    data-author="${el.autor}">

                    <img src="${el.capaImg}" 
                        alt="Capa do livro" 
                        class="imgDoLivro">

                    <div class="cLivroInfo">
                        <h3>${el.titulo}</h3>
                        <small class="autorSub">
                            ${el.autor}
                        </small>

                        <p>${el.subTitulo}</p>
                    </div>

                    <span class="favoritosLivroIcon hide">
                        <i class="material-symbols-rounded">
                            favorite
                        </i>
                    </span>

                </div>
            `;

        containerLivros.innerHTML += livroAllP2;
        favoritosGrid.innerHTML += livroAllP2;
    });

    /* eventos */

    const allLivro = document.querySelectorAll('.livro');
    allLivro.forEach((el) => {
        el.addEventListener('click', (evt) => {
            evt.stopPropagation();

            abrirLeitura();
            livrosHide(el, dadosApi);

            btnsFavoritosSalvos(el, dadosApi);
            lerBaixarOn(el, dadosApi);
        });
    });

    if (livrosVisiveis >= dadosRender.length) {
        btnMais.classList.add('hiddenBtn');
        btnMenos.classList.remove('hiddenBtn');
    } else {
        btnMais.classList.remove('hiddenBtn');
        btnMenos.classList.add('hiddenBtn');
    }
    atualizarIconFav();
};

const addLivros = async () => {
    dadosRender = await dataApi();

    const todosGeneros = [];
    dadosRender.slice(0, 3).forEach((el, index) => {
        const heroImages = document.querySelector('.heroImages');

        heroImages.innerHTML += `

        <div class="livro livroHero"
            data-index="${index}"
            data-genero="${el.genero || ''}"
            data-author="${el.autor}">

            <img src="${el.capaImg}"
                alt="${el.titulo}"
                class="imgDoLivro livroHero${index + 1}">

                <div class="tagsTop">

                    <span class="rank">#${index + 1}</span>
                    <span class="tag">
                        ${index === 0
                ? 'Top'
                : index === 1
                    ? 'Popular'
                    : 'Em alta'
            }
                    </span>

                </div>


            <span class="downloadsTop">
                ${el.download || '---'} downloads
            </span>


            <span class="favoritosLivroIcon hide">
                <i class="material-symbols-rounded">
                    favorite
                </i>
            </span>

        </div>`;
    });

    renderLivros(dadosRender);
};

addLivros();

const btnMais = document.getElementById('btnMais');
const btnMenos = document.getElementById('btnMenos');

btnMais.addEventListener('click', () => {
    if (livrosVisiveis < dadosRender.length) {
        livrosVisiveis += 6;
        renderLivros(dadosRender);
    }
});

btnMenos.addEventListener('click', () => {
    livrosVisiveis = 6;
    renderLivros(dadosRender);
    document.querySelector('.sectionLivros').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
});

const livrosHide = (item, dadosApi) => {
    const indexAtual = item.dataset.index;
    const Nindex = Number(item.dataset.index);

    const favoritosSub = document.querySelector('.favoritosSub');
    const favoritoBtn = document.querySelector('.favorito');

    const ehFavorito = libraryData.favoritos.includes(Number(Nindex));

    if (ehFavorito) {
        favoritosSub.classList.remove('hide');
        favoritoBtn.classList.add('ativo');
    } else {
        favoritosSub.classList.add('hide');
        favoritoBtn.classList.remove('ativo');
    }

    const dadosInfos = dadosApi[indexAtual];

    const imgLivroHide = (document.querySelector('.imgLivroHide').src =
        dadosInfos.capaImg);
    const tituloHide = document.querySelector('.tituloHide');
    tituloHide.textContent = dadosInfos.titulo;

    const sinopseSub = document.querySelector('.sinopse p');
    sinopseSub.textContent = dadosInfos.subTitulo;

    const nameAutor = document.querySelector('.nameAutor');
    nameAutor.textContent = `👤 Nome do Autor : ${dadosInfos.autor}`;

    const lingua = document.querySelector('.lingua');
    lingua.textContent = `🌍 ${(dadosInfos.lingua = `English`)}`;

    const direitos = document.querySelector('.direitos');

    direitos.textContent = dadosInfos.direitos
        ? '🔒 Direitos Autorais'
        : '⚖️ Domínio Público';

    const categoria = document.querySelector('.categoria');
    categoria.textContent = `📚 ${dadosInfos.ficcao}`;

    const downloads = document.querySelector('.downloads');
    downloads.textContent = `⬇️ ${dadosInfos.download} downloads`;

    document.querySelector('.containerPrincipal').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};
/* seta da sinopse */
const sinopse = document.querySelector('.sinopse');
const toggle = document.querySelector('.toggle-sinopse');

toggle.onclick = () => {
    sinopse.classList.toggle('aberta');

    toggle.textContent = sinopse.classList.contains('aberta')
        ? 'expand_less'
        : 'expand_more';
};

const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', (evt) => {
    evt.stopPropagation();
    fecharLeitura();
});

const containerPrincipal = document.querySelector('.containerPrincipal');
containerPrincipal.addEventListener('click', (evt) => {
    if (evt.target === containerPrincipal) {
        const containerLeitura = document.getElementById('leituraContainer');

        if (!containerLeitura.classList.contains('hide')) {
            fecharLeitura();
        }
    }
});

const abrirLeitura = () => {
    document.querySelector('.leitura-container').classList.remove('hide');
    document.querySelector('.hero').classList.add('hide');

    document.querySelector('.sectionLivros').classList.add('hide');
    document.querySelector('.categoriasSection').classList.add('hide');
    document.querySelector('.favoritosSection').classList.add('hide');
    document.querySelector('.footer').classList.add('hide');
};

const fecharLeitura = () => {
    const leituraContainer = document.querySelector('.leitura-container');
    const hero = document.querySelector('.hero');
    const sectionLivros = document.querySelector('.sectionLivros');
    const categoriasSection = document.querySelector('.categoriasSection');
    const favoritosSection = document.querySelector('.favoritosSection');

    document.querySelector('.footer').classList.remove('hide');

    const btnCategoriasNav = document.querySelector('.btnCategoriasNav');
    const favLivrosNav = document.querySelector('.favLivrosNav');

    leituraContainer.classList.add('hide');

    if (btnCategoriasNav.classList.contains('active')) {
        hero.classList.add('hide');
        sectionLivros.classList.add('hide');

        categoriasSection.classList.remove('hide');
        favoritosSection.classList.add('hide');
    } else if (favLivrosNav.classList.contains('active')) {
        hero.classList.add('hide');
        sectionLivros.classList.add('hide');

        categoriasSection.classList.add('hide');
        favoritosSection.classList.remove('hide');
    } else {
        hero.classList.remove('hide');
        sectionLivros.classList.remove('hide');

        categoriasSection.classList.add('hide');
        favoritosSection.classList.add('hide');
    }
};

const tiposGeneros = async () => {
    /* filtros */
    const dadosApiGenero = await dataApi();
    const todosGeneros = [];

    dadosApiGenero.forEach((el) => {
        const generoLivro = el.ficcao;
        const generosLivros = guardarGenero(generoLivro);
        todosGeneros.push(...generosLivros);
    });

    const generosFiltrados = [...new Set(todosGeneros)];

    generosFiltrados.forEach((el) => {
        const containerFiltroGenero = document.querySelector(
            '.containerFiltroGenero',
        );
        const generosFavoritos = document.querySelector('.generosFavoritos');

        containerFiltroGenero.innerHTML += `
            <div class="cardGenero" data-genero="${el}">
                ${el}
            </div>`;

        generosFavoritos.innerHTML += `
            <div class="cardGeneroFav cardGenero" data-genero="${el}">
                ${el}
            </div>`;
    });

    /* autor */

    dadosApiGenero.slice(0, 5).forEach((el) => {
        const containerAutores = document.querySelector('.containerAutores');

        containerAutores.innerHTML += `
        <div class="cardAutor" data-author="${el.autor}">
            ${el.autor}
        </div>`;
    });
};

const filterBtns = () => {
    /* btn close */
    const filtroHp2 = document
        .querySelector('.filtroHp2')
        .addEventListener('click', () => {
            document
                .querySelectorAll('.livro')
                .forEach((e) => e.classList.remove('hide'));

            cardGenero.forEach((e) => e.classList.remove('ativo'));
            cardAutor.forEach((e) => e.classList.remove('ativo'));
        });

    /* input */
    document.querySelectorAll('.inputCategoria').forEach((el) => {
        el.addEventListener('input', (evt) => {
            const inputNameLivro = evt.target.value.trim().toLowerCase();
            let encontrados = 0;

            const categoriaAtiva = [
                ...document.querySelectorAll('.btnCategoriasNav'),
            ].some((el) => el.classList.contains('active'));

            const favoritosAtivo = [
                ...document.querySelectorAll('.favLivrosNav'),
            ].some((el) => el.classList.contains('active'));

            document.querySelectorAll('.livro').forEach((e) => {
                const titulo = e.querySelector('.cLivroInfo h3');
                const autor = e.querySelector('.autorSub');

                // Ignora os cards Hero
                if (!titulo || !autor) return;

                const nomeLivro = titulo.textContent.toLowerCase();
                const nomeAutor = autor.textContent.toLowerCase();
                const nomeGenero = e.dataset.genero.toLowerCase();

                const encontrou =
                    nomeLivro.includes(inputNameLivro) ||
                    nomeAutor.includes(inputNameLivro) ||
                    nomeGenero.includes(inputNameLivro);

                const idLivro = Number(e.dataset.index);
                const ehFavorito = libraryData.favoritos.includes(idLivro);

                if (categoriaAtiva) {
                    e.classList.toggle('hide', !encontrou);
                    if (encontrou) encontrados++;
                } else if (favoritosAtivo && ehFavorito) {
                    e.classList.toggle('hide', !encontrou);
                    if (encontrou) encontrados++;
                }
            });

            /* tratamento de mensagens */
            const favoritosEmpty = document.querySelector('.favoritosEmpty');
            const favoritosEmptyGenero = document.querySelectorAll(
                '.favoritosEmptyGenero',
            );

            if (libraryData.favoritos.length === 0) {
                favoritosEmpty.classList.remove('hide');
                favoritosEmptyGenero.forEach((el) => {
                    el.classList.add('hide');
                });
            } else if (encontrados === 0) {
                favoritosEmpty.classList.add('hide');
                favoritosEmptyGenero.forEach((el) => {
                    el.classList.remove('hide');
                });
            } else {
                favoritosEmpty.classList.add('hide');
                favoritosEmptyGenero.forEach((el) => {
                    el.classList.add('hide');
                });
            }
            atualizarGridFavoritos();
        });
    });
    let encontradosGene = 0;

    const cardGenero = document.querySelectorAll('.cardGenero');

    cardGenero.forEach((el) => {
        el.addEventListener('click', (evt) => {
            cardGenero.forEach((e) => e.classList.remove('ativo'));
            encontradosGene = 0;

            evt.target.classList.toggle('ativo');

            const generoTipo = evt.target.dataset.genero;
            const livroGenero = document.querySelectorAll('.livro');

            const categoriaAtiva = [
                ...document.querySelectorAll('.btnCategoriasNav'),
            ].some((el) => el.classList.contains('active'));

            const favoritosAtivo = [
                ...document.querySelectorAll('.favLivrosNav'),
            ].some((el) => el.classList.contains('active'));

            livroGenero.forEach((el) => {
                const dataGenero = el.dataset.genero?.split(' ') || [];

                const idLivro = Number(el.dataset.index);
                const ehFavorito = libraryData.favoritos.includes(idLivro);

                if (categoriaAtiva) {
                    if (dataGenero.includes(generoTipo)) {
                        cardAutor.forEach((e) => e.classList.remove('ativo'));

                        el.classList.remove('hide');
                        encontradosGene++;
                    } else {
                        el.classList.add('hide');
                    }
                } else if (favoritosAtivo) {
                    if (ehFavorito && dataGenero.includes(generoTipo)) {
                        cardAutor.forEach((e) => e.classList.remove('ativo'));

                        el.classList.remove('hide');
                        encontradosGene++;
                    } else {
                        el.classList.add('hide');
                    }
                }
            });

            const estadoGenero = document.querySelectorAll(
                '.favoritosEmptyGenero',
            );
            const abaFavoritosAtiva = [
                ...document.querySelectorAll('.favLivrosNav'),
            ].some((el) => el.classList.contains('active'));

            if (abaFavoritosAtiva) {
                estadoGenero.forEach((el) => {
                    el.classList.toggle('hide', encontradosGene > 0);
                });
            } else {
                estadoGenero.forEach((el) => {
                    el.classList.add('hide');
                });
            }
        });
    });

    const cardGeneroFav = document.querySelectorAll('.cardGeneroFav');

    cardGeneroFav.forEach((el) => {
        el.addEventListener('click', (evt) => {
            cardGeneroFav.forEach((e) => e.classList.remove('ativo'));
            evt.currentTarget.classList.add('ativo');

            const favoritosEmpty = document.querySelector('.favoritosEmpty');
            const favoritosEmptyGenero = document.querySelectorAll(
                '.favoritosEmptyGenero',
            );

            /* sem favoritos */
            if (libraryData.favoritos.length === 0) {
                favoritosEmpty.classList.remove('hide');

                favoritosEmptyGenero.forEach((el) => {
                    el.classList.add('hide');
                });

                atualizarGridFavoritos();
                return;
            }

            favoritosEmpty.classList.add('hide');

            if (encontradosGene === 0) {
                favoritosEmptyGenero.forEach((el) => {
                    el.classList.remove('hide');
                });
            } else {
                favoritosEmptyGenero.forEach((el) => {
                    el.classList.add('hide');
                });
            }

            atualizarGridFavoritos();
        });
    });
    const closeGene = document.querySelector('.closeGene');

    const favoritosEmpty = document.querySelector('.favoritosEmpty');
    const favoritosEmptyGenero = document.querySelectorAll(
        '.favoritosEmptyGenero',
    );
    const favoritosGrid = document.querySelector('.favoritosGrid');

    closeGene.addEventListener('click', () => {
        atualizarGridFavoritos()


        document
            .querySelectorAll('.cardGeneroFav')
            .forEach((el) => el.classList.remove('ativo'));

        document.querySelectorAll('.livro').forEach((el) => {
            const id = Number(el.dataset.index);
            const favorito = libraryData.favoritos.includes(id);

            el.classList.toggle('hide', !favorito);
        });

        /* reexibe a grade de livros */
        // favoritosGrid.classList.remove('hide');

        if (libraryData.favoritos.length === 0) {
            favoritosEmpty.classList.remove('hide');

            favoritosEmptyGenero.forEach((el) => {
                el.classList.add('hide');
            });
        } else {
            favoritosEmpty.classList.add('hide');

            favoritosEmptyGenero.forEach((el) => {
                el.classList.add('hide');
            });
        }
    });

    const cardAutor = document.querySelectorAll('.cardAutor');
    cardAutor.forEach((el) => {
        el.addEventListener('click', (evt) => {
            cardAutor.forEach((e) => e.classList.remove('ativo'));
            evt.target.classList.add('ativo');

            const authorTipo = evt.target.dataset.author;

            const livroGenero = document.querySelectorAll('.livro');
            livroGenero.forEach((el) => {
                const dataAuthor = el.dataset.author;

                if (dataAuthor.includes(authorTipo)) {
                    cardGenero.forEach((e) => e.classList.remove('ativo'));
                    el.classList.remove('hide');
                } else {
                    el.classList.add('hide');
                }
            });
        });
    });

    const btnVerMaisLivros = document.getElementById('btnVerMaisLivros');
    const containerLivros = document.querySelector('.containerLivros');

    btnVerMaisLivros.addEventListener('click', () => {
        containerLivros.classList.toggle('aberto');

        if (containerLivros.classList.contains('aberto')) {
            btnVerMaisLivros.textContent = 'Mostrar menos';
        } else {
            btnVerMaisLivros.textContent = 'Ver todos os livros';
            containerLivros.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
};

const btnsHomePage = () => {
    const sectionLivros = document.getElementById('sectionLivros');
    const hero = document.querySelector('.hero');
    const categoriasSection = document.querySelector('.categoriasSection');
    const favoritosSection = document.querySelector('.favoritosSection');
    const leituraContainer = document.getElementById('leituraContainer');

    document.getElementById('btnExplorar').addEventListener('click', () => {
        sectionLivros.scrollIntoView({
            behavior: 'smooth',
        });
    });

    /* home */

    document.querySelectorAll('.homeNav').forEach((el) => {
        el.addEventListener('click', () => {
            resetPage();
            resetLivros();

            document.querySelector('.homeNavHero').classList.add('active');

            hero.classList.remove('hide');
            sectionLivros.classList.remove('hide');
        });
    });

    /* categorias */
    document.querySelectorAll('.btnCategorias').forEach((el) => {
        el.addEventListener('click', () => {
            resetPage();
            resetLivros();

            document.querySelector('.btnCategoriasNav').classList.add('active');

            categoriasSection.classList.remove('hide');
        });
    });
};

btnsHomePage();

const btnsFavoritosSalvos = (livro, dadosInfos) => {
    let idLivro = parseInt(livro.dataset.index);

    document.getElementById('favoritoBtn').onclick = () => {
        const favoritosSub = document.querySelector('.favoritosSub');
        const favoritoBtn = document.getElementById('favoritoBtn');

        const index = libraryData.favoritos.findIndex((id) => id === idLivro);

        if (index !== -1) {
            libraryData.favoritos.splice(index, 1);

            favoritoBtn.classList.remove('ativo');
            favoritosSub.classList.add('hide');
        } else {
            libraryData.favoritos.push(idLivro);

            favoritoBtn.classList.add('ativo');
            favoritosSub.classList.remove('hide');
        }

        atualizarLocalStorage();
        atualizarInfosFavoritos();
        atualizarIconFav();

        // Atualiza a tela somente se estiver na aba Favoritos
        if (
            document.querySelector('.favLivrosNav').classList.contains('active')
        ) {
            atualizarLivrosFavoritos();

            document
                .querySelector('.favoritosEmpty')
                .classList.toggle('hide', libraryData.favoritos.length > 0);
        }

        atualizarGridFavoritos();
    };
};

const criarLivroFavorito = () => {
    // const dadosLivro = await dataApi();

    const livrosFavId = libraryData.favoritos;
    const livro = document.querySelectorAll('.livro');

    document.querySelectorAll('.favLivrosNav').forEach((el) => {
        el.addEventListener('click', () => {
            resetPage();
            atualizarLivrosFavoritos();

            const favoritosSection = document.querySelector('.favoritosSection');
            const favoritosEmpty = document.querySelectorAll('.favoritosEmpty');

            document.querySelector('.favLivrosNav').classList.add('active');

            favoritosSection.classList.remove('hide');

            livro.forEach((el) => {
                const indexLivro = parseInt(el.dataset.index, 10);

                if (livrosFavId.includes(indexLivro)) {
                    el.classList.remove('hide');
                } else {
                    el.classList.add('hide');
                }
            });

            favoritosEmpty.forEach((el) => {
                el.classList.toggle(
                    'hide',
                    libraryData.favoritos.length > 0
                );
            });

            atualizarInfosFavoritos()
            atualizarGridFavoritos();
        });
    });
};

const esperaInit = async () => {
    await tiposGeneros();
    filterBtns();
    criarLivroFavorito();

};

esperaInit();

const lerBaixarOn = (item, dadoLivro) => {
    const index = item.dataset.index;
    const acao = dadoLivro[index];

    document.querySelector('.salvar').textContent = acao.pdf
        ? '📄 Baixar PDF'
        : '📚 Baixar EPUB';

    document.querySelector('.ler').onclick = () => {
        window.open(acao.lerOn, '_blank');
    };

    document.querySelector('.salvar').onclick = (evt) => {
        if (acao.pdf) {
            window.open(acao.pdf, '_blank');
        } else if (acao.epub) {
            window.open(acao.epub, '_blank');
        } else {
            alert('Formato indisponível');
        }
    };
};

/* menu hide */

const btnMenuMobile = document.querySelector('.btnMenuMobile');
const menuMobile = document.querySelector('.menuMobile');
const overlayMenu = document.querySelector('.overlayMenu');

btnMenuMobile.addEventListener('click', () => {
    menuMobile.classList.toggle('active');
    overlayMenu.classList.toggle('active');
});

overlayMenu.addEventListener('click', () => {
    menuMobile.classList.remove('active');
    overlayMenu.classList.remove('active');
});

document.querySelectorAll('.menuMobile .navItem').forEach((link) => {
    link.addEventListener('click', (evt) => {
        console.log(evt.target);
        menuMobile.classList.remove('active');
        overlayMenu.classList.remove('active');
    });
});



/* tem que colocar a function de atulaizar o grid na parte de limpar o s genoros closegene*/