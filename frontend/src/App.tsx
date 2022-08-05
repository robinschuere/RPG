import { Route, Routes } from 'solid-app-router';
import { Container } from 'solid-bootstrap';
import { Component } from 'solid-js';
import Navigation from './components/Navigation';
import NewCharacter from './pages/NewCharacter';
import RedirectRoute from './components/RedirectRoute';
import SafeRoute from './components/SafeRoute';
import Characters from './pages/Characters';
import Forget from './pages/Forget';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Redirect from './pages/Redirect';
import Register from './pages/Register';
import User from './pages/User';
import Verify from './pages/Verify';
import { StateProvider } from './providers/StateProvider';
import AdminPanel from './pages/AdminPanel';
import Monsters from './pages/Monsters';
import Remember from './pages/Remember';
import Monster from './pages/Monster';

const App: Component = () => {
  return (
    <div>
      <StateProvider>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/verify" element={<Verify />} />

            <Route
              path="/register"
              element={
                <RedirectRoute>
                  <Register />
                </RedirectRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectRoute>
                  <Login />
                </RedirectRoute>
              }
            />
            <Route
              path="/forget"
              element={
                <RedirectRoute>
                  <Forget />
                </RedirectRoute>
              }
            />
            <Route
              path="/remember"
              element={
                <RedirectRoute>
                  <Remember />
                </RedirectRoute>
              }
            />
            <Route
              path="/user"
              element={
                <SafeRoute>
                  <User />
                </SafeRoute>
              }
            />
            <Route
              path="/characters"
              element={
                <SafeRoute>
                  <Characters />
                </SafeRoute>
              }
            />
            <Route
              path="/characters/new"
              element={
                <SafeRoute>
                  <NewCharacter />
                </SafeRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <SafeRoute>
                  <AdminPanel />
                </SafeRoute>
              }
            />

            <Route
              path="/admin/monsters"
              element={
                <SafeRoute>
                  <Monsters />
                </SafeRoute>
              }
            />

            <Route
              path="/admin/monsters/:id"
              element={
                <SafeRoute>
                  <Monster />
                </SafeRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </StateProvider>
    </div>
  );
};

export default App;
