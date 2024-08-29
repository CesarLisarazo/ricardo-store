//Aquí se cargan los datos del Json y se arman las card

fetch('items.json')
  .then((response) => response.json())
  .then((items => items.forEach((items, i) => {

    list.innerHTML += `<li>

      <div> ${items.name}</div>
      <div>Precio: $${items.price}</div>
      <image src="${items.image}" />
      <input type="number" placeholder="cantidad" onchange='inputChange(${i}, "${items.name}", "${items.price}", "${items.image}", "${items.id}")'/> <br>
      <button>Agregar al carrito</button> <br>
     
  </li>`
  }



  )))

//Se declaran variables 

let list = document.getElementById('lista')
let clearCart = document.getElementById('ClearCart')
let finalizarCompra = document.getElementById('finalizarCompra')
let carrito = []



//Aquí se carg el contenido del carrito del local storage si es que existe 
document.addEventListener('DOMContentLoaded', () => {
  cart = JSON.parse(localStorage.getItem('cartShop')) || []
  renderCart()
})



//boton de finalizar compra
finalizarCompra.addEventListener('click', () => {
  if (cart.length == 0) {
    swal(" ", "No hay productos para finalizar la compra", "warning");
  }
  else {
    swal(" ", "Gracias por su compra", "success");
  }
})



//botón para limpiar el carrito
clearCart.addEventListener('click', () => {
  if (cart.length !== 0) {
    swal({
      title: "¿Estás seguro?",
      text: "Estás a punto de vaciar el carrito",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          cart.length = []
          localStorage.removeItem('cartShop')
          renderCart()
          swal("El carrito se vació", {
            icon: "success",
          });

        } else {
          swal(" ", "Podés seguir con tu compra ", "success");
        }
      })
  }
})



// Aquí se renderiza el carrito
function renderCart() {
  let cartItems = document.getElementById('carrito');
  let total = 0;
  cartItems.innerHTML = '';
  
  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <li>
        <div>${item.name}</div>
        <div>Cantidad: ${item.quantity}</div>
        <div>Sub-total: $${item.quantity * item.price}</div>
        <image src="${item.image}" />
        <button onclick='eliminarProducto(${item.id})'>Eliminar del carrito</button>
      </li>`;
  });

  document.getElementById('total').innerHTML = '$' + total;
}


// Función invocada para manejar el cambio de input y agregar al carrito
function inputChange(i, name, price, image, id) {
  let listItem = document.querySelectorAll('li')[i];
  let input = listItem.querySelector('input');
  let button = listItem.querySelector('button');
  
  const agregarItem = () => {
    cart.push({
      quantity: Number(input.value),
      name: name,
      price: price,
      image: image,
      id: id,
    });
  };

  const actualizarCantidad = (item) => {
    item.quantity += Number(input.value);
  };

  if (input.value < 1) {
    swal(" ", "Debes agregar al menos 1", "error");
    input.value = "";
  } else {
    button.onclick = function () {
      let found = cart.find(element => element.id == id);
      found ? actualizarCantidad(found) : agregarItem();
      
      renderCart();

      // Aquí se guarda el carrito en el local storage
      localStorage.setItem('cartShop', JSON.stringify(cart));
    };
  }
}





//función invocada para eliminar elementos del carrito
function eliminarProducto(id) {
  cart = cart.filter((el) => el.id != id);
  itemId = id
  localStorage.setItem('cartShop', JSON.stringify(cart))
  renderCart()
}

function id(id) {
  console.log(id)
}