/**
 * Login page scripts: for Memberships & Affiliates Management API
 */

self.addEventListener('load', async e => {
/** event listener to load an event listener for login submit event **/
    const login_form = document.getElementById('login')
    login_form.addEventListener('submit', async e => {
        /** login submit event listener used to send login request only backend will handle page flow on success **/
        e.preventDefault();
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const response = await do_login(email, password)
        /** NOTE: flask app will automatically redirect user and display the login successfull message on success**/
        console.log(response)
        document.getElementById('message').innerHTML = `${response.message}`
        //TODO - update user details and also update token
        try{
            /* TODO- send message to clear service worker caches */
            localStorage.removeItem('x-access-token');
            localStorage.setItem('x-access-token', response['payload']['token'])
        }catch(err){
            localStorage.setItem('x-access-token', response['payload']['token'])
        }
    })
})


async function do_login(email, password){
    if ((email !== '') && (password !== '')){
            // TODO authentication not required
        const request_par = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({email, password}),
            mode: 'cors',
            credentials: 'same-origin',
            cache: 'no-cache'
        }
        const url = '/api/v1/user/login'
        const request = new Request(url, request_par)
        const response = await fetch(request)
        return await response.json()
    }
    document.getElementById('message').innerHTML='Please enter <code>email</code> and <code>password</code> ' +
        'combination for your account in order to login'
}