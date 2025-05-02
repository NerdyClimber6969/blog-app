import RootLayout from './layout/RootLayout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import PostPage from './pages/PostPage/PostPage.jsx';
import PostContentPage from './pages/PostContentPage/PostContentPage.jsx';

const routes = [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
        { 
          path: 'posts', 
          children: [
            { index: true, element: <PostPage /> },
            { path: ':postId', element: <PostContentPage /> }
          ]
        },
      ]
    }
];

export default routes;