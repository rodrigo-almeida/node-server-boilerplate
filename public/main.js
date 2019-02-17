function submitLogin() {
    let 
        email = document.getElementById('email').value,
        pass = document.getElementById('pass').value,
        url = 'http://localhost:3000/auth/login';

    $.ajax({
        type: "POST",
        contentType:"application/json",
        url: url,
        data: JSON.stringify({email, pass}),
        success: (res) => {
            console.dir(res);
        }
    });
}

function submitSignUp() {
    let 
        email = document.getElementById('email').value,
        pass = document.getElementById('pass').value,
        url = 'http://localhost:3000/auth/sign-up';

    $.ajax({
        type: "POST",
        contentType:"application/json",
        url: url,
        data: JSON.stringify({email, pass}),
        success: (res) => {
            console.dir(res);
        }
    });
}

function submitOAuthGoogle() {
    let url = 'http://localhost:3000/auth/google';
    window.location = url;
}

function submitDeleteAllUsers() {
    let url = 'http://localhost:3000/api/users';

    $.ajax({
        type: "DELETE",
        contentType:"application/json",
        url: url,
        success: (res) => {
            console.log(res);
        }
    });
}