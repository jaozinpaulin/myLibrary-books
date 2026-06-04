import { abrirLoading, fecharLoading, mostrarErro, esconderErro, mostrarVazio } from './loading&error.js'



/* localStorage */
const storageKey = 'libraryData';

let libraryData = JSON.parse(localStorage.getItem(storageKey)) || {
    favoritos: [],
};
const atualizarLocalStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(libraryData));
};

/* api injetando */

const dataApi = async () => {
    try {
        abrirLoading();
        const resposta = await fetch('https://gutendex.com/books');

        if (!resposta.ok) {
            throw new Error('Erro na API');
        }
        const data = await resposta.json();

        if (!data.results || data.results.length === 0) {
            mostrarVazio();
            return [];
        }

        const infoLivros = data.results?.map((el) => {
            return {
                titulo: el.title,
                capaImg: el.formats['image/jpeg'],
                subTitulo: el.summaries,

                autor: el.authors?.[0]?.name?.split(', ')[0] || 'Desconhecido',
                lingua: el.languages,

                livro: el.formats['text/plain'],
                direitos: el.copyright,
                ficcao: el.bookshelves?.join(' ') || '',

                download: el.download_count,

                lerOn:
                    el.formats['text/html'] ||
                    el.formats['text/html; charset=utf-8'],

                pdf: el.formats['application/pdf'],
                epub: el.formats['application/epub+zip'],
            };
        });
        return infoLivros || [];
    } catch (error) {
        console.log('erro ao buscar dados', error);
        mostrarErro();
        return [];
    } finally {
        document.body.classList.remove('ativeBody');
        fecharLoading();
    }
};

export { libraryData, atualizarLocalStorage, dataApi };
