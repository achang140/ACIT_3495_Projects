const loginform = document.getElementById("login");
const submit = document.getElementById("submit");

loginform.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await fetch("http://authentication-service:3000/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password })
    }).then((response) => response.json())
    .then((data) =>  {
        if (data.status === 200) {
            window.location.href = "watch.html"
        } else {
            alert("Incorrect Credentials")
        }
    }).then((err) =>{
        console.log(err)
    })
})
