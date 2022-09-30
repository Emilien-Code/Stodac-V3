import { createSlice } from "@reduxjs/toolkit";

const getProductsById = (products, id) => {
  if (products.find((p) => p.id === id)) {
    console.log("produit trouvée");
  }
  return products.find((p) => p.id === id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
    total: null
  },
  reducers: {
    addProductToCart: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //

      const existingProduct = getProductsById(state.cart, product.id);
      let newState = [];
      if (existingProduct) {
        newState = products.map((p) => {
          if (p.id === existingProduct.id) {
            p.quantity = p.quantity + product.quantity;
          }
          return p;
        });
        state.cart = newState;
      } else {
        state.cart = [...products, product];
      }
      console.log(state.cart, state.quantity);
      console.log(product);
    },
    removeProductFromCart: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const newProducts = products.filter((p) => p.id !== product.id);

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
      const existingProduct = getProductsById(state.cart, product.id);
      let newState = [];
      console.log(products, product);
      if (existingProduct) {
        newState = products.map((p) => {
          if (p.id === existingProduct.id) {
            p.quantity = p.quantity + 1;
          }
          return p;
        });
        state.cart = newState;
      }
    },
    decreaseQuantity: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const existingProduct = getProductsById(state.cart, product.id);
      let newState = [];
      if (existingProduct) {
        newState = products.map((p) => {
          if (p.id === existingProduct.id) {
            p.quantity = p.quantity > 1 ? p.quantity - 1 : 1;
          }
          return p;
        });
        state.cart = newState;
      }
    },
    setQuantity: (state, action) => {
      // declare variables
      let products = state.cart;
      let product = action.payload;
      //
      const existingProduct = getProductsById(state.cart, product.id);
      let newState = [];
      if (existingProduct) {
        newState = products.map((p) => {
          if (p.id === existingProduct.id) {
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
