let boxContainer = document.querySelector('.container');
let imagesURLWomen = [
    `women/image1.svg`,
    `women/image2.svg`,
    `women/image3.svg`,
    `women/image4.svg`,
    `women/image5.svg`,
    `women/image6.svg`,
];
let imagesURLMen = [
    `men/image1.jpg`,
    `men/image2.jpg`,
    `men/image3.jpg`,
    `men/image4.jpg`,
    `men/image5.jpg`
]

let createProducts = () => {
    let data = fetch('/api/v1/products').then((result) => {
        return result.json();
    }).then(result => {
        let products = result['products'];
        return products;
    })
    if (document.querySelector('.box')) {
        document.querySelectorAll('.box').forEach(ele => ele.remove());
    }
    data.then(products => {
        products.forEach(element => {
            let createDiv = document.createElement('div');
            createDiv.className = 'box';
            createDiv.id = `${element._id}`;
            let image = document.createElement('img');
            let imgurl = element.category.includes('Men') ? chooseRandomPhoto(imagesURLMen) : element.category.includes('Men') ? chooseRandomPhoto(imagesURLWomen) : chooseRandomPhoto(imagesURLWomen);
            image.setAttribute('src', `../../assets/${imgurl}`);
            image.className = 'box-image';
            createDiv.appendChild(image);
            createDiv.appendChild(createParagraph(`${element.name}`, 'name'));
            createDiv.appendChild(createParagraph(`Price: ${element.price}$`, 'price'));
            createDiv.appendChild(createParagraph(`Categories: ${element.category.join(' - ')}`, 'category'));
            createDiv.appendChild(createParagraph(`Sizes Avilable: ${element.size.join(' -')}`, 'size'));
            createDiv.appendChild(createParagraph(`Brand Name: ${element.brand}`, 'brand'));
            createDiv.appendChild(createButton(`delete`, `delete-button`));
            createDiv.appendChild(createButton(`Edit`, `edit-button`, `./edit-page/edit-product.html?id=${element._id}&img=${imgurl.split(".")[0]}`));
            boxContainer.appendChild(createDiv);
        });
    })
}
window.onload = createProducts();


document.addEventListener('click', async (ele) => {
    if (ele.target.className === 'delete-button') {
        let id = ele.target.parentElement.id;
        console.log(id)
        await axios.delete(`/api/v1/products/${id}`).then(() => { createProducts(); })
    } else if (ele.target.parentElement.className === 'delete-button' && ele.target.tagName.toLowerCase() == 'a') {
        let id = ele.target.parentElement.parentElement.id;
        console.log(id)
        await axios.delete(`/api/v1/products/${id}`).then(() => { createProducts(); })
    }
})

let createParagraph = (content, className = " ") => {
    let paragraph = document.createElement('p');
    let text = document.createTextNode(content);
    paragraph.appendChild(text);
    paragraph.className = className;
    return paragraph;
};


let chooseRandomPhoto = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

let createButton = (text, className = " ", link = "#") => {
    let content = document.createTextNode(text);
    let createLink = document.createElement('a');
    createLink.href = link;
    let button = document.createElement('button');
    button.className = className;
    createLink.appendChild(content);
    button.appendChild(createLink)
    return button;
}