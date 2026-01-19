import Config from "../../utils/config";

const TOKEN = Config.localStoragePrefix + "token";
const USER = Config.localStoragePrefix + "user";

class UserStorage {
  static getUser() {
    const s = localStorage.getItem(USER);
    if (s !== null) return JSON.parse(s);
    return null;
  }

  static setUser(user) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static removeUser() {
    localStorage.removeItem(USER);
    console.log(
      "----------------------- attempt to remove user ---------------------"
    );
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static setToken(token) {
    localStorage.setItem(TOKEN, token);
    console.log(
      "----------------------- attempt to set token ---------------------",
      token
    );
  }

  static removeToken() {
    localStorage.removeItem(TOKEN);
    console.log(
      "----------------------- attempt to remove token ---------------------"
    );
  }
}

export default UserStorage;
