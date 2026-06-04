/* '-' */
/* mds... */

const guardarGenero = (generosTextos) => {
    const infosGenero = generosTextos.toLowerCase();

    const generos = [];

    if (infosGenero.includes('fantasy')) generos.push('Fantasy');
    if (infosGenero.includes('science')) generos.push('Science');
    if (infosGenero.includes('history')) generos.push('History');
    if (infosGenero.includes('romance') || infosGenero.includes('love'))
        generos.push('Romance');

    if (infosGenero.includes('adventure')) generos.push('Adventure');
    if (infosGenero.includes('children') || infosGenero.includes('juvenile'))
        generos.push('Children');
    if (infosGenero.includes('horror') || infosGenero.includes('gothic'))
        generos.push('Horror');
    if (infosGenero.includes('mystery') || infosGenero.includes('detective'))
        generos.push('Mystery');

    if (infosGenero.includes('poetry')) generos.push('Poetry');
    if (infosGenero.includes('drama')) generos.push('Drama');
    if (infosGenero.includes('philosophy')) generos.push('Philosophy');
    if (infosGenero.includes('religion')) generos.push('Religion');

    if (
        infosGenero.includes('biography') ||
        infosGenero.includes('autobiography')
    )
        generos.push('Biography');
    if (infosGenero.includes('politics') || infosGenero.includes('government'))
        generos.push('Politics');
    if (infosGenero.includes('education') || infosGenero.includes('teaching'))
        generos.push('Education');
    if (infosGenero.includes('art') || infosGenero.includes('painting'))
        generos.push('Art');
    if (infosGenero.includes('music')) generos.push('Music');

    if (infosGenero.includes('travel') || infosGenero.includes('journey'))
        generos.push('Travel');
    if (infosGenero.includes('nature') || infosGenero.includes('animals'))
        generos.push('Nature');

    return generos.length ? generos : ['Fiction'];
};

export { guardarGenero };
