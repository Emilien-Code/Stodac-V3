import { createSlice } from "@reduxjs/toolkit";

let cart = localStorage.getItem("cart");
if(!cart){
  cart={
    cart: [],
    quantity: 0,
    total: null
  }
}else{
  try{
    cart = JSON.parse(cart);
  }catch{
    cart={
      cart: [],
      quantity: 0,
      total: null
    }
  }
}
const getProductsById = (products, id) => {
  if (products.find((p) => p._id === id)) {
    console.log("produit trouvée");
  }
  return products.find((p) => p._id === id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: cart.cart,
    quantity: cart.quantity,
    total: cart.total
  },
  reducers: {
    addProductToCart: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //

      const existingProduct = getProductsById(state.cart, product._id);
      let newState = [];
      if (existingProduct) {
        newState = products.map((p) => {
          if (p._id === existingProduct._id) {
            p.quantity = p.quantity + product.quantity;
          }
          return p;
        });
        state.cart = newState;
      } else {
        state.cart = [...products, product];
      }

      localStorage.setItem('cart', JSON.stringify({
        cart: state.cart,
        quantity: state.quantity,
        total: state.total,
      }));
      // console.log(state.cart, state.quantity);
      // console.log(product);
    },
    removeProductFromCart: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const newProducts = products.filter((p) => p._id !== product._id);

      state.cart = newProducts;
    },
    removeAllProductsFromCart: (state) => {
      state.cart = [];
    },
    checkQuantity: (state, action) => {
      // declare variables
      let products = state.cart;
      //
      if (products.length > 0) {
        let quantity = 0;
        for (let index = 0; index < products.length; index++) {
          const element = products[index];
          quantity = quantity + element.quantity;
        }
        state.quantity = quantity;
      } else {
        state.quantity = 0;
      }
    },
    increaseQuantity: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const existingProduct = getProductsById(state.cart, product._id);
      let newState = [];
      console.log(products, product);
      if (existingProduct) {
        newState = products.map((p) => {
          if (p._id === existingProduct._id) {
            p.quantity = p.quantity + 1;
          }
          return p;
        });
        state.cart = newState;
        localStorage.setItem('cart', JSON.stringify({
          cart: state.cart,
          quantity: state.quantity,
          total: state.total,
        }));
      }
    },
    decreaseQuantity: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const existingProduct = getProductsById(state.cart, product._id);
      let newState = [];
      if (existingProduct) {
        newState = products.map((p) => {
          if (p._id === existingProduct._id) {
            p.quantity = p.quantity > 1 ? p.quantity - 1 : 1;
          }
          return p;
        });
        state.cart = newState;
        localStorage.setItem('cart', JSON.stringify({
          cart: state.cart,
          quantity: state.quantity,
          total: state.total,
        }));
      }
    },
    setQuantity: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const existingProduct = getProductsById(state.cart, product._id);
      let newState = [];
      if (existingProduct) {
        newState = products.map((p) => {
          if (p._id === existingProduct._id) {
            p.quantity = product.quantity;
          }
          return p;
        });
        state.cart = newState;
      }
    },
    setTotalPrice: (state, action) => {
      let total = 0;
      const TotalProductPrice = (product) => {
        return product.quantity * product.price;
      };

      state.cart.forEach((el) => {
        total = total + TotalProductPrice(el);
      });

      state.total = total;
      console.log(state.total)

      localStorage.setItem('cart', JSON.stringify({
        cart: state.cart,
        quantity: state.quantity,
        total: state.total,
      }));
      
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  changeProductQuantity,
  removeAllProductsFromCart,
  checkQuantity,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  setTotalPrice
} = cartSlice.actions;

export default cartSlice.reducer;
