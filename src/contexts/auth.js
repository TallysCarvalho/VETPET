import { useState, createContext, useEffect } from 'react';
import firebase from '../firebaseConnection'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }

            setLoading(false);

        }
        loadStorage();
    }

        , [])
    // função de registro email. senha , e nome
    async function signUp(email, password, nome) {
        setLoadingAuth(true);
        // acessa o firebase criando a conta com email, senha
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            //se der certo o .then passa o valor do uid criado
            .then(async (value) => {
                let uid = value.user.uid;
                //cria no firebase a collection user usando o uid cria nome e avatar url
                await firebase.firestore().collection('user').doc(uid).set({
                    nome: nome,
                    avatarUrl: null,
                })
                    // then passa uid nome email e avatarUrl
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null,
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success("Bem vindo a plataforma!")
                    })
            }).catch((error) => {
                console.log(error);
                toast.error("ops algo deu errado")
                setLoadingAuth(false);
            })
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }

    //login

    async function signIn(email, password) {

        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('user')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email,
                };

                setUser(data);
                storageUser(data);
                console.log('deu certo')

                setLoadingAuth(false);
                toast.success(" Seja Bem Vindo!")


            }).catch((error) => {
                console.log('deu errado' + error)
                toast.error("ops algo deu errado")
                setLoadingAuth(false)

            })
    }

    //logout
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            signIn,
            loadingAuth,
            setUser,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )

}



export default AuthProvider;