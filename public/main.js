function submitLogin() {
    let 
        email = document.getElementById('email').value,
        pass = document.getElementById('pass').value,
        url = 'http://localhost:3000/auth/login';

        $.ajax({
            type: "POST",
            url: url,
            data: {email, pass},
            success: (res) => {
                console.log('HTTP -> ' + res);
        }});
}

function submitSignUp() {
    let 
        email = document.getElementById('email').value,
        pass = document.getElementById('pass').value,
        url = 'http://localhost:3000/auth/sign-up';

    $.ajax({
        type: "POST",
        url: url,
        data: {email, pass},
        success: (res) => {
            console.log('HTTP -> ' + res);
        }});
}