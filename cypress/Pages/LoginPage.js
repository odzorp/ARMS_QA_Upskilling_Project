class LoginPage{
    visit(){
        cy.visit('/');
    }
    enterUsername(username){
        cy.get('[data-test="username"]').type(username);
    }
    enterPassword(password){
        cy.get('[data-test="password"]').type(password);
    }
    clickLoginButton(){
        cy.get('[data-test="login-button"]').click()
    }

    validateLoginSuccess(){
        cy.url().then((url) => {
            cy.log('Current URL: ' + url);
        })
    }
  
    
}
export default LoginPage;