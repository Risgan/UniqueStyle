class userModel {
    constructor({ username, email, password, avatar, role }) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.avatar = avatar || '';
      this.role = role || 'user';
    }
  }
  
  module.exports = userModel;
  