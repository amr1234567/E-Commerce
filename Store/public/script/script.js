let images = [
    `women/image1.svg`,
    `women/image2.svg`,
    `women/image3.svg`,
    `women/image4.svg`,
    `women/image5.svg`,
    `women/image6.svg`,
    `men/image1.jpg`,
    `men/image2.jpg`,
    `men/image3.jpg`,
    `men/image4.jpg`,
    `men/image5.jpg`
]

let productBox = (img, name, brand, rating, price, id) => {
    return `
<div class="card-product rounded-3 d-flex flex-column align-items-center p-xxl-4 p-2">
<img src="assets/${img}" class="card-img-top mb-3 border border-dark rounded-3" alt="...">
<div class="card-content ps-xxl-4 ps-2 d-flex flex-column justify-content-between w-100">
    <div class="details w-100 d-flex justify-content-between align-items-start flex-wrap">
        <div class="name d-flex flex-column justify-content-start">
            <p>${name}</p>
            <p class="category">${brand}</p>
        </div>
        <div class="stars d-flex mt-3">
            ${createStars(rating)}
        </div>
    </div>
    <div class="salary d-flex justify-content-between align-items-center w-100 mt-5 mb-5">
        <p class="price">$${price}</p>
        <a href="pages/ingle-product/ndex.html?id=${id}&img=${img.split('/')[1].split('.')[0]}" class="link-secondary me-xxl-3 ms-2">See More Details</a>
    </div>
</div>
</div>
`
};

let createStars = (rating) => {
    let stars = ``;
    for (let i = 0; i < Math.floor(rating); i++) {
        stars = stars + `<img src='assets/star-yellow.svg'>`;
    }
    for (let i = 0; i < 5 - Math.floor(rating); i++) {
        stars = stars + `<img src='assets/star-gray.svg'>`;
    }
    return stars;
}

let productsContainer = document.querySelector('.products-container');


let createProducts = (i = 1) => {
    let buttonSelected = document.querySelector('.filter>.btn-dark');
    if (buttonSelected.id === "all") {
        let data = axios(`/api/v1/products?page=${i}`).then((result) => {
            let product = result['data']['products']
            console.log(product);
            return product;
        });
        if (document.querySelector('.card-product')) {
            document.querySelectorAll('.card-product').forEach(ele => ele.remove());
        }
        data.then(product => {
            product.forEach(ele => {
                productsContainer.innerHTML = productsContainer.innerHTML + productBox(chooseRandomImage(), ele.name, ele.brand, ele.rating, ele.price, ele._id);
            })
        })


    } else if (buttonSelected.id === "men") {
        if (document.querySelector('.card-product')) {
            document.querySelectorAll('.card-product').forEach(ele => ele.remove());
        }
        let data = axios(`/api/v1/products?page=${i}&category=Men`).then((result) => {
            let product = result['data']['products']
            console.log(product);
            return product;
        }).then(product => {
            product.forEach(ele => {
                productsContainer.innerHTML = productsContainer.innerHTML + productBox(chooseRandomImage(), ele.name, ele.brand, ele.rating, ele.price, ele._id);
            })
        })


    } else if (buttonSelected.id === "women") {
        if (document.querySelector('.card-product')) {
            document.querySelectorAll('.card-product').forEach(ele => ele.remove());
        }
        let data = axios(`/api/v1/products?page=${i}&category=women`).then((result) => {
            let product = result['data']['products']
            console.log(product);
            return product;
        }).then(product => {
            product.forEach(ele => {
                productsContainer.innerHTML = productsContainer.innerHTML + productBox(chooseRandomImage(), ele.name, ele.brand, ele.rating, ele.price, ele._id);
            })
        })



    } else if (buttonSelected.id === "children") {
        if (document.querySelector('.card-product')) {
            document.querySelectorAll('.card-product').forEach(ele => ele.remove());
        }
        let data = axios(`/api/v1/products?page=${i}&category=children`).then((result) => {
            let product = result['data']['products']
            console.log(product);
            return product;
        }).then(product => {
            product.forEach(ele => {
                productsContainer.innerHTML = productsContainer.innerHTML + productBox(chooseRandomImage(), ele.name, ele.brand, ele.rating, ele.price, ele._id);
            })
        })



    }
}



document.querySelectorAll('.filter .btn').forEach(ele => {
    ele.addEventListener('click', () => {
        let filterDiv = document.querySelector('.ranges-div');
        if (!ele.classList.contains('btn-dark') && ele.id !== 'range') {
            let darkButton = document.querySelector('.filter .btn-dark');
            if (darkButton.id === 'range') {
                darkButton.classList.replace('btn-dark', 'btn-secondary');
                filterDiv.classList.replace('d-flex', 'display-none')
                ele.classList.add('btn-dark')
            } else {
                darkButton.classList.replace('btn-dark', 'btn-light');
                ele.classList.add('btn-dark')
            }
            createProducts();
        } else if (ele.id === 'range') {
            if (filterDiv.classList.contains('display-none')) {
                filterDiv.classList.replace('display-none', 'd-flex')
                ele.classList.replace('btn-secondary', 'btn-dark');
                let RangeContainer = `
            <div class="size-range d-flex flex-column align-items-center mb-4">
                <h3>Size</h3>
                <!--<input type="text" name="max-size" id="max-size" placeholder="Max">-->
                <input type="text" name="min-size" id="min-size" placeholder="Min">
                <!--<div class="btn btn-primary">Assendind</div>
                <div class="btn btn-secondary">disandding</div>-->
            </div>
            <div class="brands-select d-flex flex-column mb-4">
                <h3>Brands</h3>
                <div class="mt-2 mb-2 w-100">
                    <label for="Gucci">Gucci</label>
                    <input type="radio" name="brand" id="Gucci">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="Addidas">Addidas</label>
                    <input type="radio" name="brand" id="Addidas">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="Zara">Zara</label>
                    <input type="radio" name="brand" id="Zara">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="Puma">Puma</label>
                    <input type="radio" name="brand" id="Puma">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="H&M">H&M</label>
                    <input type="radio" name="brand" id="H&M">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="Tommy">Tommy</label>
                    <input type="radio" name="brand" id="Tommy">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="Nike">Nike</label>
                    <input type="radio" name="brand" id="Nike">
                </div>
                <div class="mt-2 mb-2 w-100">
                    <label for="others">others</label>
                    <input type="radio" name="brand" id="others">
                </div>
            </div>
            <div class="rating-range  d-flex flex-column align-items-center mb-4">
                <h3>Rating Range</h3>
                <!--<input type="text" name="max-rate" id="max-rate" placeholder="Max">-->
                <input type="text" name="min-rate" id="min-rate" placeholder="Min">
                <!--<div class="btn btn-primary">Assendind</div>
                <div class="btn btn-secondary">disandding</div>-->
            </div>
            <div class="price-range d-flex flex-column align-items-center mb-4">
                <h3>Price</h3>
                <input type="text" name="max-price" id="max-price" placeholder="Max">
                <!--<input type="text" name="min-price" id="min-price" placeholder="Min">-->
                <!--<div class="btn btn-primary">Assendind</div>
                <div class="btn btn-secondary">disandding</div>-->
            </div>
            <div class="rating-range  d-flex flex-column align-items-center mb-4">
                <h3>Name</h3>
                <input type="text" name="name" id="name" placeholder="name search">
            </div>
            <div class="d-flex flex-column mb-4">
            <!--<div class="btn btn-danger h-25">Clear </div>-->
            <div class="btn btn-primary h-25 mt-5" id="send-range"> get the range </div>
            </div>
                `;
                filterDiv.style.backgroundColor = '#939393';
                filterDiv.innerHTML = RangeContainer;
                let darkButton = document.querySelector('.filter .btn-dark');
                darkButton.classList.replace('btn-dark', 'btn-light');
            } else {
                filterDiv.classList.replace('d-flex', 'display-none')
                let darkButton = document.querySelector('.filter .btn-dark');
                darkButton.classList.replace('btn-dark', 'btn-secondary');
                document.querySelector('#all').classList.replace('btn-light', 'btn-dark')
            }
        }
    })
})


document.addEventListener('click', (ele) => {
    let filterDiv = document.querySelector('.ranges-div');
    if (ele.target.id === 'send-range') {
        filterDiv.classList.replace('d-flex', 'display-none')
        let maxSize = document.querySelector('#max-size')
        let minSize = document.querySelector('#min-size')
        let maxRate = document.querySelector('#max-rate')
        let minRate = document.querySelector('#min-rate')
        let minPrice = document.querySelector('#min-price')
        let maxPrice = document.querySelector('#max-price')
        let checkBox = document.querySelector('.brands-select [type="radio"]:checked')
        let name = document.querySelector('#name')
        if (document.querySelector('.card-product')) {
            document.querySelectorAll('.card-product').forEach(ele => ele.remove());
        }
        let data = axios(`/api/v1/products?numericFilters=size<=${(maxSize.value) ? parseFloat(maxSize.value) : ""},size>=${(minSize.value) ? parseFloat(minSize.value) : ""},rating>=${(minRate.value) ? parseFloat(minRate.value) : ""},rating<=${(maxRate.value) ? parseFloat(maxRate.value) : ""},price>=${(minPrice.value) ? parseFloat(minPrice.value) : ""},price<=${(maxPrice.value) ? parseFloat(maxPrice.value) : ""}&brand=${checkBox.id || ""}&name=${name.value || ""}`)
            .then((result) => {
                let product = result['data']['products']
                console.log(product);
                return product;
            }).then(product => {
                product.forEach(ele => {
                    productsContainer.innerHTML = productsContainer.innerHTML + productBox(chooseRandomImage(), ele.name, ele.brand, ele.rating, ele.price, ele._id);
                })
            })
    }
})

let chooseRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
}

window.onload = () => {
    createProducts();
    axios('/api/v1/products?limit=99999').then((result) => {
        return result['data'].nbHits;
    }).then((num) => {
        let pageNumber = document.querySelector('.page-number')
        for (let i = 0; i < Math.ceil(num / 9); i++) {
            let circleDiv = document.createElement('div')
            circleDiv.className = 'circle'
            if (i === 0) {
                circleDiv.classList.add('special');
            }
            let text = document.createTextNode(`${i + 1}`)
            circleDiv.appendChild(text)
            pageNumber.appendChild(circleDiv)
        }
    })
};

setTimeout(()=>{
    document.querySelectorAll('.page-number .circle').forEach((ele,index,arr)=>{
        ele.addEventListener('click',(event)=>{
            if (!ele.classList.contains('special')) {
                arr.forEach(ele=>ele.classList.remove('special'));
                ele.classList.add('special')
                createProducts(parseInt(ele.textContent));
            }
        })
    })
},4000)