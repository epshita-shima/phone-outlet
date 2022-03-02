// to get data
const searchPhone = () => {
    const searchField = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    const spinner = document.getElementById('spinner');
    spinner.style.display = "block";
    if (searchField == '') {
        window.alert('please write something');
        spinner.style.display = "none";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)));
    }
}
// display all data
const displaySearchResult = (data) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        const errorMessage = document.getElementById("failure");
        errorMessage.style.textAlign = "center";
        const spinner = document.getElementById('spinner');
        spinner.style.display = "none";
        document.getElementById("phone-name").innerText = "No Phone Found!";
    }
    else {
        data.forEach(data => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${data.image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <p class="card-text">${data.phone_name}</p>
                </div>
                <button onclick="loadPhoneDetails('${data.slug}')" class="btn btn-success">Explore</button>
            </div>
            `;
            searchResult.appendChild(div);
            const spinner = document.getElementById('spinner');
            spinner.style.display = "none";
            document.getElementById("failure").style.display = "none";
        })
    }

}

// loading data function declear
const loadPhoneDetails = (dataId) => {
    console.log('hello', dataId);
    const url = `https://openapi.programming-hero.com/api/phone/${dataId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

// display details data function
const displayPhoneDetail = (phone) => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-explore');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
   <img src="${phone.image}" class="card-img-top  mx-auto w-25 pt-2" alt="...">
   <div class="card-body p-3 ms-5">
       <p class="card-title"><b>Brand:</b> ${phone.brand}</p>
       <p class="card-title"><b>Name:</b> ${phone.name}</p>
      
       <p class="card-text"><b>Chipset:</b> ${phone.mainFeatures.chipSet}</p>
       <p class="card-text"><b>Display Size:</b> ${phone.mainFeatures.displaySize}</p>
       <p class="card-text"><b>Memory:</b> ${phone.mainFeatures.memory}</p>
       <p class="card-text"><b>Storage:</b> ${phone.mainFeatures.storage}</p>
       <p class="card-text"><b>Release Date:</b> ${phone.releaseDate ? phone.releaseDate : 'no relsease Date'}</p>
       <p class="card-text"><b>Sensors:</b> ${phone.mainFeatures.sensors}</p>
       <p class="card-text"><b>WLAN:</b> ${phone.others.WLAN}</p>
       <p class="card-text"><b>Bluetooth:</b> ${phone.others.Bluetooth}</p>
       <p class="card-text"><b>GPS:</b> ${phone.others.GPS}</p>
       <p class="card-text"><b>NFC:</b> ${phone.others.NFC}</p>
       <p class="card-text"><b>Radio:</b> ${phone.others.Radio}</p>
       <p class="card-text"><b>USB:</b> ${phone.others.USB}</p>
    </div>
     `;
    phoneDetails.appendChild(div);
}

