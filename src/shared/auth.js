import cookies from '../thirdparty/cookies';


class AuthSerive {
    getUsername = () => cookies.get('username');
    checkUsername = () => !!cookies.get('username');

    setCookies = (username) => {
        let datenow  = new Date();
        cookies.set('username', `${username}`, {
            path: '/',
            expires: new Date(datenow.setHours(datenow.getHours()+12))
        });
    };

    clearCookies = () => {
        cookies.remove("username");
    };

}
export default new AuthSerive();