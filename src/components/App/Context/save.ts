{
    /* Check if user is authitified in a loading or reloading of a page
useEffect(() => { */
}
{
    /* function checkAuth() { */
}
{
    /* axios */
}
{
    /* .get('http://localhost:3000/me') */
}
{
    /* .then((response) => { */
}

{
    /* if (response.status === 200) { */
}
// setUserAuth(response.data);
// }
// })
{
    /* .catch((error) => { */
}
// setUserAuth(null);
// return error;
// });
{
    /* } */
}
{
    /* checkAuth(); */
}
{
    /* }, []); */
}

{
    /* Activation the user after user has logged in, and put the informations in the userContext for them to be reachable from anywhere */
}
{
    /* async function handleLogin(data: ILogin) { */
}
// axios
// .post('http://localhost:3000/login', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// // credentials: 'include', Doit être ici, en dehors des headers
// body: JSON.stringify(data),
// })
// .then((response) => {
// if (response.status !== 200) {
// return response.data;
// }
// // setError({
// // message: 'Problème de serveur, veuillez réessayer plus tard',
// // });
// // throw new Error("Problème dans la connexion de l'utilisateur");
// })
// .then((data) => {
// setUserAuth(data);
// })
// .catch((error) => {
// console.log(error);
// });

// // const message = await response.json();
// // console.log(message);
// // navigate('/catalogue');
{
    /* } */
}
{
    /* logout */
}

{
    /* return( */
}
{
    /* <AuthenticateContext.Provider value={{ userAuth, setUserAuth }}> */
}
{
    /* {children} */
}
{
    /* </AuthenticateContext.Provider> */
}
{
    /* ); */
}
