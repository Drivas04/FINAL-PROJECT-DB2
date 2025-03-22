
export const authHelper = (username, password, setUser, setError) => {

    if(username === "admin" && password === "admin"){

        const newUser = {name: username, rol: "admin"};
        localStorage.setItem("userSession", JSON.stringify(newUser));
        setUser(newUser);
        setError("");
        console.log("exito");

    } else{

        setError("Tus credenciales son incorrectas. Por favor intenta nuevamente.")

    }
}