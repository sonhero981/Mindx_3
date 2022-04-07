const loginFormEl = document.getElementById('loginForm')
const usernameEl = document.getElementById('usernameInp')
const passwordEl = document.getElementById('passwordInp')

loginFormEl.addEventListener('submit', e => {
    e.preventDefault
})

// call http request len server

const authUserInfo = {
    username: usernameEl.value,
    password: passwordEl.value
}

fetch("http:localhost:9000/auth/login", {
    method:"POST",
    header: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(authUserInfo),
})
.then((res) => res.json())
.then(data => {
    if(data.success){
        alert('dang nhap thanh cong')
    } else {
        alert('dang nhap that bai')
    }
})
.catch(err => {
    console.log(err)
    alert('dang nhap that bai')
})