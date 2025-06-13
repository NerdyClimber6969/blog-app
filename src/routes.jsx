import App from './App/App.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import PostListPage from './pages/PostListPage/PostListPage.jsx';
import PostContentPage from './pages/PostContentPage/PostContentPage.jsx';
import { NotFoundError } from "./components/Error";

const routes = [
    {
      path: '/',
      element: <App />, 
      errorElement: <NotFoundError />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
        { 
          path: 'posts', 
          children: [
            { index: true, element: <PostListPage /> },
            { path: ':postId', element: <PostContentPage /> }
          ]
        },
      ]
    }
];

export default routes;