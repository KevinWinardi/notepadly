import { useContext, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LoadingContext } from "./contexts/Loading/LoadingContext";
import { Home } from "./pages/Home";
import { DetailNote } from "./pages/DetailNote";
import { NotFound } from "./pages/NotFound";
import { AddNote } from "./pages/AddNote";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Header } from "./components/Header"
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Loading } from "./components/Loading";
import { getAccessToken } from "./utils/network-data";

function App() {
    const { t } = useTranslation();
    const { isLoading } = useContext(LoadingContext);
    const [isAuthenticate, setIsAuthenticate] = useState(() => getAccessToken() ? true : false)

    return (
        <>
            <Header isAuthenticate={isAuthenticate}></Header>

            {
                isLoading && <Loading></Loading>
            }

            <main className="min-h-dvh pt-32 pb-8 px-4 bg-gray-100 dark:bg-black">
                <Routes>
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticate}></PrivateRoute>}>
                        <Route path="/" element={<Home isArchivedMode={false}></Home>}></Route>
                        <Route path="/archived" element={<Home isArchivedMode={true}></Home>}></Route>
                        <Route path="/detail-note/:id" element={<DetailNote></DetailNote>}></Route>
                        <Route path="/add-note" element={<AddNote></AddNote>}></Route>
                        <Route path="/profile" element={<Profile setIsAuthenticate={setIsAuthenticate}></Profile>}></Route>
                    </Route>

                    <Route element={<PublicRoute isAuthenticated={isAuthenticate}></PublicRoute>}>
                        <Route path="/login" element={<Login setIsAuthenticate={setIsAuthenticate}></Login>}></Route>
                        <Route path="/register" element={<Register></Register>}></Route>
                    </Route>

                    <Route path="*" element={<NotFound message={t('pageNotFound')} buttonBackToHome={true}></NotFound>}></Route>
                </Routes>
            </main>

            <footer className="p-4 font-bold bg-slate-900 text-white text-center">
                Notepadly @ 2025
            </footer>
        </>
    );
}

export default App
