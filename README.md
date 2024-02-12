hola amigos! 👋

I've created few samples of Cypress tests for demonstration purposes. Each test suite is followed by BDD test scenario. 

Technics that were used: 
- assigning viewports
- checking response status codes (404, 200, 302)
- setting IF condition
- using forEach() method
- assigning variables
- verifying elements visibility & attributes
- using spread() method for multiple elements with the same selector for better readability
- verifying expected state once action is completed
- setting baseURL in config file
- using cy.intercept() and assigning alias
- creating custom acceptCookies() command for accepting cookies
- set acceptCookies() command to be a part of beforeEach() hook
- creating function for price comparison (each number should be less or equal to the next number)
- checking length of elements dynamically
- mocking data
- working with date-fns library (import data, change format)
- manipulating with sliders (custom command to set screen, client and page position)
- accessing BE calls & verifying that it follows FE changes