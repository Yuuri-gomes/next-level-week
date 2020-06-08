
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

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;
    fetch(url)
    .then ((res) => res.json())
    .then (cities => {
        for( city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    });


};

document.querySelector('select[name=uf]')
.addEventListener('change', getCities);

//Itens de coleta

const itemsToColet = document.querySelectorAll('.items-grid li');

const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

function handleSelectedItem(event) {
    // adicionar ou remover uma classe com JS

    const itemLi = event.target;

    itemLi.classList.toggle('selected');
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    });

    if(alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    }else {
        selectedItems.push(itemId);
        
    };
    
    collectedItems.value = selectedItems;    
    
}

for (item of itemsToColet) {
    item.addEventListener('click', handleSelectedItem)
}
