import { libraryData, atualizarLocalStorage, dataApi } from './api&LocalStorage.js';
import { guardarGenero } from './filterGene.js'


/* padrao */
const resetPage = () => {
    const sectionLivros = document.getElementById('sectionLivros');
    const hero = document.querySelector('.hero');
    const categoriasSection = document.querySelector('.categoriasSection');
    const favoritosSection = document.querySelector('.favoritosSection');
    const leituraContainer = document.getElementById('leituraContainer');

    document
        .querySelectorAll('.navItem')
        .forEach((el) => el.classList.remove('active'));

    document
        .querySelectorAll('.nafavoritosEmptyvItem')
        .forEach((el) => el.classList.add('hide'));

    document.querySelectorAll('.favoritosEmptyGenero').forEach(e => e.classList.add('hide'))


    document
        .querySelectorAll('.cardGenero')
        .forEach((e) => e.classList.remove('ativo'));
    document
        .querySelectorAll('.cardAutor')
        .forEach((e) => e.classList.remove('ativo'));

    const inputs = document.querySelectorAll('.inputCategoria');
    inputs.forEach((input) => {
        input.value = '';
    });

    hero.classList.add('hide');
    sectionLivros.classList.add('hide');
    categoriasSection.classList.add('hide');
    favoritosSection.classList.add('hide');
    leituraContainer.classList.add('hide');
};

/* reset pagina */
const resetLivros = () => {
    document
        .querySelectorAll('.livro')
        .forEach((el) => el.classList.remove('hide'));
};

const atualizarLivrosFavoritos = () => {
    document.querySelectorAll('.livro').forEach((el) => {
        const id = Number(el.dataset.index);
        const favorito = libraryData.favoritos.includes(id);

        el.classList.toggle('hide', !favorito);
    });
};

/* atualizar fav */
const atualizarGridFavoritos = () => {
    const favoritosGrid = document.querySelector('.favoritosGrid');

    const semFavoritos = !document
        .querySelector('.favoritosEmpty')
        .classList.contains('hide');

    const semGenero = [...document.querySelectorAll('.favoritosEmptyGenero')]
        .some(el => !el.classList.contains('hide'));

    favoritosGrid.classList.toggle('hide', semFavoritos || semGenero);
};
/* hora atualozada */
const horaAtualizada = () => {
    const agora = new Date();

    const hora = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    return `${hora}:${minutos}`;
};

/* horario atualizado */

const atualizarIconFav = () => {
    document.querySelectorAll('.livro').forEach((el) => {
        const idNumber = Number(el.dataset.index);

        const temFav = libraryData.favoritos.includes(idNumber);
        const iconFav = el.querySelector('.favoritosLivroIcon');

        if (temFav) {
            iconFav.classList.remove('hide');
        } else {
            iconFav.classList.add('hide');
        }
    });
};

const atualizarInfosFavoritos = () => {
    document.querySelector('.contFav').textContent =
        libraryData.favoritos.length;
    document.querySelector('.horaAtual').textContent = horaAtualizada();
};

/* hora atualizada pra o relogio menu hide */

const horaEl = document.querySelector('.hora');

const atualizarRelogio = () => {
    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    horaEl.textContent = `${horas}:${minutos}:${segundos}`;
};

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

export {
    resetPage,
    resetLivros,
    atualizarLivrosFavoritos,
    atualizarGridFavoritos,
    horaAtualizada,
    atualizarIconFav,
    atualizarInfosFavoritos,
    atualizarRelogio
};
