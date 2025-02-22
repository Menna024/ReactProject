
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Components/MainLayout/MainLayout';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import { RegisterContextProvider } from './Context/RegisterContext';
import { LoginContextProvider } from './Context/LoginContext';
import '../node_modules/tailwindcss/tailwind.css';
import { ForgotPassContextProvider } from './Context/ForgotPassContext';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import VerifyCode from './Pages/VerifyCode/VerifyCode';
import { VerifyCodeContextProvider } from './Context/VerifyCodeContext';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import { ResetPasswordContextProvider } from './Context/ResetPasswordContext';
import Home from './Pages/Home/Home';
import { GetAllProductsContextProvider } from './Context/GetAllProductsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TokenContextProvider } from './Context/TokenContext';
import './index.css';
import { ProductDetailsContextProvider } from './Context/ProductDetailsContext';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Products from './Pages/Products/Products';
import Brands from './Pages/Brands/Brands';
import Wishlist from './Pages/Wishlist/Wishlist';
import Categories from './Pages/Categories/Categories';
import Cart from './Pages/Cart/Cart';
import { GetAllBrandsContextProvider } from './Context/GetAllBrandsContext';
import { GetAllCategoriesContextProvider } from './Context/GetAllCategoriesContext';
import { AddProdToWishListContextProvider } from './Context/AddProdToWishListContext';
import { AddProdToCartContextProvider } from './Context/AddProdToCartContext';
import { GetWishListProductsContextProvider } from './Context/GetWishListProductsContext';
import { GetCartProductsContextProvider } from './Context/GetCartProductsContext';
import { CartIDContextProvider } from './Context/CartIDContext';
import CheckOut from './Pages/CheckOut/CheckOut';
import { CreateOrderContextProvider } from './Context/CreateOrderContext';
import { ClearCartContextProvider } from './Context/ClearCartContext';
import { RemoveProdCartContextProvider } from './Context/RemoveProdCartContext';
import { RemoveProdWishListContextProvider } from './Context/RemoveProdWishListContext';
import { CheckoutSessionContextProvider } from './Context/CheckoutSessionContext';
import { UserIDContextProvider } from './Context/UserIDContext';
import Payment from './Pages/Payment/Payment';

function App() {
  const routes = createBrowserRouter(
    [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true, element: <Login />
          },
          {
            path: 'login', element: <Login />
          },
          {
            path: 'register', element: <Signup />
          },
          {
            path: 'forgot-password', element: <ForgotPassword />
          },
          {
            path: 'verify-code', element: <VerifyCode />
          },
          {
            path: 'reset-password', element: <ResetPassword />
          },
          {
            path: 'home', element: <Home />
          },
          {
            path: 'ProductDetails/:id', element: <ProductDetails />
          },
          {
            path: 'products', element: <Products />
          },
          {
            path: 'wishlist', element: <Wishlist />
          },
          {
            path: 'brands', element: <Brands />
          },
          {
            path: 'categories', element: <Categories />
          },
          {
            path: 'cart', element: <Cart />
          },
          {
            path: 'check-out/:cartID', element: <CheckOut />
          },
          {
            path: 'payment', element: <Payment />
          }
        ]
      }
    ]
  );


  const queryClient = new QueryClient();

  return (
    <TokenContextProvider>
      <UserIDContextProvider>
        <CartIDContextProvider>
          <QueryClientProvider client={queryClient}>
            <CheckoutSessionContextProvider>
              <CreateOrderContextProvider>
                <AddProdToCartContextProvider>
                  <AddProdToWishListContextProvider>
                    <ProductDetailsContextProvider>
                      <GetAllProductsContextProvider>
                        <GetAllCategoriesContextProvider>
                          <GetAllBrandsContextProvider>
                            <GetCartProductsContextProvider>
                              <GetWishListProductsContextProvider>
                                <RemoveProdCartContextProvider>
                                  <RemoveProdWishListContextProvider>
                                    <ClearCartContextProvider>
                                      <ResetPasswordContextProvider>
                                        <VerifyCodeContextProvider>
                                          <ForgotPassContextProvider>
                                            <LoginContextProvider>
                                              <RegisterContextProvider>
                                                <RouterProvider router={routes}>
                                                </RouterProvider>
                                              </RegisterContextProvider>
                                            </LoginContextProvider>
                                          </ForgotPassContextProvider>
                                        </VerifyCodeContextProvider>
                                      </ResetPasswordContextProvider>
                                    </ClearCartContextProvider>
                                  </RemoveProdWishListContextProvider>
                                </RemoveProdCartContextProvider>
                              </GetWishListProductsContextProvider>
                            </GetCartProductsContextProvider>
                          </GetAllBrandsContextProvider>
                        </GetAllCategoriesContextProvider>
                      </GetAllProductsContextProvider>
                    </ProductDetailsContextProvider>
                  </AddProdToWishListContextProvider>
                </AddProdToCartContextProvider>
              </CreateOrderContextProvider>
            </CheckoutSessionContextProvider>
          </QueryClientProvider>
        </CartIDContextProvider>
      </UserIDContextProvider>
    </TokenContextProvider >
  )
}

export default App
