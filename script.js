let containercard = document.querySelector('.containercard')
let api = "https://6889b23c4c55d5c7395324da.mockapi.io/BazarTajik"
let add = document.querySelector('.add')
let body = document.querySelector('body')
let search = document.querySelector('.search')
async function getMarket() {
    try {
        containercard.innerHTML = `
    <div class="loading-screen">
        <p class="loading-text">BazarTajik...</p>
    </div>
`;
        let response = await axios.get(api)
        get(response.data)
    } catch (error) {
        console.error(error);
        containercard.innerHTML = "Хатогӣ дар боркунӣ";
    }
}

getMarket()
async function searchMarket(value) {
    try {
        containercard.innerHTML = "<p class='loading-text'>BazarTajik...</p>"; // хабар ҳангоми ҷустуҷӯ
        let response = await axios.get(`${api}?title=${value}`)
        get(response.data)

    } catch (error) {
        console.error(error);
        containercard.innerHTML = "Нет данных по запросу:"
    }
}
async function filterMarket(value) {
    try {
        containercard.innerHTML = "<p class='loading-text'>BazarTajik...</p>"; // хабар ҳангоми ҷустуҷӯ
        let response = await axios.get(`${api}?category=${value}`)
        get(response.data)

    } catch (error) {
        console.error(error);
        containercard.innerHTML = "Нет данных по запросу:"
    }
}

async function filterMoney(value) {
    try {
        containercard.innerHTML = "<p class='loading-text'>BazarTajik...</p>"; // хабар ҳангоми ҷустуҷӯ
        let response = await axios.get(`${api}?price=${value}`)
        get(response.data)

    } catch (error) {
        console.error(error);
        containercard.innerHTML = "Нет данных по запросу:" + value
    }

}

function get(data) {
    containercard.innerHTML = ""
    data.forEach(element => {
        let card = document.createElement('div')
        card.classList.add('card')
        let image = document.createElement('img')
        image.classList.add('image')


        image.src = element.image
        let title = document.createElement('h3')
        title.classList.add('title')
        title.innerHTML = element.title
        let description = document.createElement('p')
        description.classList.add('description')
        description.innerHTML = element.description
        let price = document.createElement('p')
        price.classList.add('price')
        price.innerHTML = "$" + element.price
        let category = document.createElement('p')
        category.classList.add('category')
        category.innerHTML = element.category
        let rating = document.createElement('p')
        rating.classList.add('rating')
        rating.innerHTML = element.rating
        let status = document.createElement('button')
        status.classList.add('status')
        status.innerHTML = element.status == true || element.status == 'true' ? "Хороший цена" : "Не хороший цена"
        let owner = document.createElement('div')
        owner.classList.add('owner')
        let ownername = document.createElement('p')
        ownername.classList.add('ownername')
        ownername.innerHTML = element.owner
        let avatar = document.createElement('img')
        avatar.classList.add('avatar')
        avatar.src = element.avatar
        owner.append(ownername, avatar)
        let detaileddiv = document.createElement('div')
        detaileddiv.classList.add('detaileddiv')
        let detailed = document.createElement('button')
        detailed.classList.add('detailed')
        detailed.innerHTML = "Подробное"
        let modalGallery = detailedModal.querySelector('.modal-gallery');

        detailed.onclick = () => {
            modalTitle.innerHTML = element.title;
            modalImage.src = element.image;
            modalDescription.innerHTML = element.description;
            modalCategory.innerHTML = element.category;
            modalPrice.innerHTML = '$' + element.price;
            modalRating.innerHTML = element.rating;
            modalOwner.innerHTML = element.owner;
            modalAvatar.src = element.avatar;
            modalTelephone.innerHTML = element.telephone

            // Очистка галереи
            modalGallery.innerHTML = '';

            // Массив дополнительных изображений
            let extraImages = [element.image2, element.image3, element.image4, element.image5];

            // Создание и добавление изображений в галерею
            extraImages.forEach(img => {
                if (img) {
                    let imageEl = document.createElement('img');
                    imageEl.src = img;
                    imageEl.style.width = '100px';
                    imageEl.style.margin = '5px';
                    imageEl.onclick = () => {
                        modalImage.src = img;

                    }
                    imageEl.style.borderRadius = '8px';
                    modalGallery.appendChild(imageEl);
                }
            });

            detailedModal.showModal();
        };

        detaileddiv.append(detailed, owner)
        card.append(image, title, description, price, category, rating, status, detaileddiv)
        containercard.appendChild(card)
    });
}

search.oninput = () => {
    let value = search.value
    searchMarket(value)
}
let filtermoney = document.querySelector('.filter-money')
filtermoney.oninput = () => {
    let selected = filtermoney.value
    filterMoney(selected)
}
let filterselect = document.querySelector('.filter-select')
filterselect.onchange = () => {
    let selected = filterselect.value
    filterMarket(selected)
}

let logoutBtn = document.querySelector('.logout');
let login = document.querySelector('.login')
login.onclick = () => {
    window.location.href = 'https://bazartajiklogin.netlify.app'; // переход на защищённую страницу
}

let xclose = document.querySelector('.x')
let registeralert = document.querySelector('.registeralert')
let register = document.querySelector('.register')
register.onclick = () => {
    registeralert.style.display = 'block'
}
xclose.onclick = () => {
    registeralert.style.display = 'none'
}
// Получаем dialog и его элементы
let detailedModal = document.querySelector('.detailedModal');
let modalImage = detailedModal.querySelector('.modal-image');
let modalTitle = detailedModal.querySelector('.modal-title');
let modalDescription = detailedModal.querySelector('.modal-description');
let modalCategory = detailedModal.querySelector('.modal-category');
let modalPrice = detailedModal.querySelector('.modal-price');
let modalRating = detailedModal.querySelector('.modal-rating');
let modalOwner = detailedModal.querySelector('.modal-owner');
let modalAvatar = detailedModal.querySelector('.modal-avatar');
let modalClose = detailedModal.querySelector('.modal-close');
let modalTelephone = detailedModal.querySelector('.modal-telephone');
// Обработка кнопки закрытия
modalClose.onclick = () => {
    detailedModal.close();
};
async function addMarket(obj) {
    try {
        await axios.post(api, obj)
        getMarket()
    } catch (error) {
        console.error(error);

    }
}
