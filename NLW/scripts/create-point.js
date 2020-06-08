
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]');

    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

    fetch(url)
    .then( res => res.json())
    .then( states => {
        for ( state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>"`;
        };
    });

};

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    const ufValue = event.target.value;
    const indexOfSelectState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/mesorregioes`;

    fetch(url)
    .then ((res) => res.json())
    .then (cities => {
        console.log(cities)
        for( city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.removeAttribute('disabled');
    });


}

document.querySelector('select[name=uf]')
.addEventListener('change', getCities);