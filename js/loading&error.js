/* loading */
const loading = document.querySelector('.loadingOverlay');
const body = document.body;

const abrirLoading = () => {
    loading.classList.remove('hide');
    body.classList.add('ativeBody');
};

const fecharLoading = () => {
    loading.classList.add('hide');
    body.classList.remove('ativeBody');
};

/* tratamento de erro api */

const errorContainer = document.querySelector('.errorContainer');
const cabecalho = document.querySelector('.cabecalho');
const main = document.querySelector('.containerPrincipal');
const footer = document.querySelector('.footer');

const mostrarErro = () => {
    errorContainer.classList.remove('hide');

    cabecalho.classList.add('hide');
    main.classList.add('hide');
    footer.classList.add('hide');
};

const esconderErro = () => {
    errorContainer.classList.add('hide');

    cabecalho.classList.remove('hide');
    main.classList.remove('hide');
    footer.classList.remove('hide');
};

const mostrarVazio = () => {
    errorContainer.classList.remove('hide');

    const title = document.querySelector('.errorTitle');
    const text = document.querySelector('.errorText');

    title.innerText = 'Nenhum livro encontrado';
    text.innerText =
        'A API respondeu corretamente, mas não trouxe nenhum resultado.';

    cabecalho.classList.add('hide');
    main.classList.add('hide');
    footer.classList.add('hide');
};

export { abrirLoading, fecharLoading, mostrarErro, esconderErro, mostrarVazio };
