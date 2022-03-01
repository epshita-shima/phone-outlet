const searchPhone = () => {
    const searchField = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data.slice(0, 20)));
}
const displaySearchResult = (data) => {
    const searchResult = document.getElementById('search-result');
    if (data.length == 0) {
        console.log('searching product in not available');
    }
    data.forEach(data => {
        // console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.brand}</h5>
                <p class="card-text">${data.slug}</p>
            </div>
            <button onclick="loadPhoneDetails('${data.slug}')" class="btn btn-success">Explore</button>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
const loadPhoneDetails = (dataId) => {
    console.log('hello', dataId);
    const url = `https://openapi.programming-hero.com/api/phone/${dataId}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}

