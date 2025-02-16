const addTocart = document.querySelectorAll('.addTocart');

addTocart.forEach(item => {
    item.addEventListener('click', event => {
        const containerProduct = event.target.closest('.containerProduct');

        displayCard(containerProduct);

    })
})

// display card 
const cartBox = document.querySelector('.cartBox');
const displayCard = containerProduct => {
    const imgContainer = containerProduct.querySelector('img').src;
    const titleContainer = containerProduct.querySelector('.title').textContent;
    const priceContainer = containerProduct.querySelector('.price').textContent;

    const titleContent = cartBox.querySelectorAll('.titleContent');
    for (let item of titleContent) {
        if (item.textContent === titleContainer) {
            alert('This item already have in card! Please check!');
            return;
        }
    }

    const containerCart = document.createElement('div');
    containerCart.classList.add('containerCart');

    containerCart.innerHTML = `
    <div class="d-flex justify-content-evenly align-items-center cartConten">
                    <div class="containerImg">
                        <img src="${imgContainer}" alt="" width="70px" height="70px" class="rounded-pill">
                    </div>
    
                    <div class="containerContent text-center mt-4">
                        <h6 class="titleContent">${titleContainer}</h6>
                        <p class="priceContent">${priceContainer}</p>

                        <div class="containerCount">
                            <button class="btn btn-primary" id="decrease">-</button>
                            <button class="btn btn-outline-primary number">1</button>
                            <button class="btn btn-primary" id="increase">+</button>
                        </div>
                    </div>

                    <i class='bx bx-trash removeCard fs-5' style="cursor: pointer;"></i>
                </div>
    `

    cartBox.appendChild(containerCart);


    // remove item form card

    containerCart.querySelector('.removeCard').addEventListener('click', () => {
        containerCart.remove();

        // if cartContent length = 0 remove class hiiden from containerNoItem

        let cartContent = cartBox.querySelectorAll('.cartConten');
        cartContent.length <= 0 ? document.querySelector('.containerNoItem').classList.remove('hidden') : document.querySelector('.containerNoItem').classList.add('hidden');

        updatePrice();

        updateCountIncrease();

    })

    // if cartContent length = 0 remove class hiiden from containerNoItem

    let cartContent = cartBox.querySelectorAll('.cartConten');
    cartContent.length <= 0 ? document.querySelector('.containerNoItem').classList.remove('hidden') : document.querySelector('.containerNoItem').classList.add('hidden');


    containerCart.querySelector('.containerCount').addEventListener('click', event => {
        const number = containerCart.querySelector('.number');
        const decrease = containerCart.querySelector('#decrease');
        let count = number.textContent;

        if(event.target.id === "decrease" && count > 1){
            count--;
        }else if(event.target.id === "increase"){
            count++;
        }       
        number.textContent = count;

        updatePrice();
    })

    updatePrice();

    updateCountIncrease();

// const containerCount = containerCart.querySelector('.containerCount');

// containerCount.addEventListener('click', event => {
//     const number = containerCart.querySelector('.number');
//         const decrease = containerCart.querySelector('#decrease');
//         let count = number.textContent;

//         if(event.target.id === "decrease" && count > 1){
//             count--;
//         }else if(event.target.id === "increase"){
//             count++;
//         }
//         number.textContent = count;

//         updatePrice();
// })


}




// update price 
const updatePrice = () => {
    let total = 0;
    const totaleContainer = document.querySelector('.total');
    const cartConten = cartBox.querySelectorAll('.cartConten');

    cartConten.forEach(item => {
        const priceContent = item.querySelector('.priceContent').textContent.replace("$", "");
        const numberContent = item.querySelector('.number').textContent;

        total += priceContent * numberContent;
    })
    totaleContainer.textContent = `$${total}.00`;
}


// update count 
let countShopping = 0;
const updateCountIncrease =  () => {
    const countContainer = document.querySelector('.countShopping');
    const containerCart = document.querySelectorAll('.containerCart');

    countShopping = containerCart.length;

    countContainer.textContent = countShopping;

    countContainer.textContent > 0 ? countContainer.style.color = "red" : countContainer.style.color = "black";
}


// buy btn 

const btnBuy = document.querySelector('.btnBuy');
btnBuy.addEventListener('click', () => {
    const cartBox = document.querySelector('.cartBox');
    const containerCart = cartBox.querySelectorAll('.containerCart');

    if(containerCart.length === 0){
        alert('No item here please add item to card first!');
        return;
    }
    
    containerCart.forEach(item => item.remove());
    alert('Thank you for payments!');
    document.querySelector('.containerNoItem').classList.remove('hidden');

    updatePrice();
    updateCountIncrease();

})