let nameInput = document.querySelector('#name');
let sizeInput = document.querySelector('#size');
let priceInput = document.querySelector('#price');
let ratingInput = document.querySelector('#rating');
let brandCheckboxes = document.querySelectorAll('.brand>input');

document.querySelector('button').addEventListener('click', async () => {
    validateBrand()
    validateCategory()
    validateName()
    validatePrice()
    validateRating()
    validateSize()
    if (validateBrand() === 1 && validateCategory() === 1 && validateName() === 1 && validatePrice() === 1 && validateRating() === 1 && validateSize() === 1) {

        await axios.post(`/api/v1/products`, {
            name: nameInput.value,
            size: sizeInput.value.split('-'),
            category: getCheckedElements(),
            brand: document.querySelector('[type="radio"]:checked').id,
            price: parseFloat(priceInput.value),
            rating: parseFloat(ratingInput.value),
        })
        window.location.href = '../index.html';
    }
})

function getCheckedElements() {
    let checked = document.querySelectorAll('[type="checkbox"]');
    let arr = [];
    checked.forEach(ele => {
        if (ele.checked == true) {
            arr.push(ele.id)
        }
    });
    return arr;
}




let validateName = () => {
    let validate = 1;
    if (/\d/.test(nameInput.value)) {
        validate = '';
    }
    if (!nameInput.value) {
        validate = ''
    }
    if (validate == '') {
        console.log("error from name");
        return validate;
    } else {
        return validate;
    }
};

let validateSize = () => {
    let validate = 1;
    if (!sizeInput.value) {
        validate = '';
    } else {
        sizeInput.value.split("").forEach(ele => {
            if (isNaN(ele)) {
                if (ele === "-") {
                    validate = 1;
                } else {
                    validate = '';
                }
            }
        });
    }
    if (validate == '') {
        console.log("error from size");
        return validate;
    } else {
        return validate;
    }
};

let validatePrice = () => {
    let validate = 1;
    if (!priceInput.value) {
        validate = '';
    } else {
        priceInput.value.split('').forEach(ele => {
            if (!/\d/.test(ele)) {
                validate = '';
            }
        })
    }
    if (validate == '') {
        console.log("error from price");
        return validate;
    } else {
        return validate;
    }
}

let validateRating = () => {
    let validate = 1
    if (!ratingInput.value) {
        validate = ''
    } else if (isNaN(ratingInput.value)) {
        validate = '';
    }
    if (validate == '') {
        console.log("error from rating");
        return validate;
    } else {
        return validate;
    }
}

let validateBrand = () => {
    let validate = 1;
    let checkedBox = document.querySelector('[type="radio"]:checked');
    if (!checkedBox) {
        validate = '';
    }
    if (validate == '') {
        console.log("error from brand");
        return validate;
    } else {
        return validate;
    }
}


let validateCategory = () => {
    let validate = 1;
    let checkedBox = document.querySelector('[type="checkbox"]:checked');
    if (!checkedBox) {
        validate = '';
    }
    if (validate == '') {
        console.log("error from category");
        return validate;
    } else {
        return validate;
    }
}

