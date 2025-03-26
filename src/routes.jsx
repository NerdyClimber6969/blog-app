import RootLayout from './layout/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import PostPage from './pages/PostPage.jsx';

const routes = [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
        { path: 'posts', element: <PostPage /> }
      ]
    }
  ];

export default routes;