# Cypress Notes

## Basics

- You can set `cy.visit('/home')` in the before each!

### Selectors

- getting items from an li
  - `cy.get(['data-test="list"'] li).last().cointans('last item')`
  - `cy.get(['data-test="list"'] li).first().cointans('first item')`
  - `cy.get(['data-test="list"'] li).eq(2).cointans('third item')`

### Assertions

- checking that something exists `cy.get('form').should('exist')`
- checking that something doesn't exists `cy.contains('Hoodie').should('not.exist')`
- check that content exists `cy.contains('Hello World!')`
- check if field is disabled `cy.get('button').should('be.disabled')`
- check for value `cy.get(['data-test="name-input"']).should('have.value', 'Tsuki')`
- check for length `cy.get(['data-test="list"']).its('length').should('eq', 5)`
- check for text `cy.get(['data-test="list"' li label]).first().should('have.text', 'first item')`

### Page interactions & inputs

- text input: `cy.get('input').type('hi')`
- click: `cy.get('button').click()`
- submit form: `cy.get('form').submit()`
- range filter: `cy.get('[data-test="range-input"]').invloke('val', '9').trigger('input')`
- drop down (select): `cy.get('[data-test="catDropdown"]').select('Tsuki')`
- checkbox & radio:

  ```js
  cy.get(input[(type = "checkbox")]).as("checkbox");
  cy.get("@checkbox").check();
  cy.get("@checkbox").should("be.checked");
  cy.get("@checkbox").uncheck();
  cy.get("@checkbox").should("be.unchecked");
  ```

- color input: `cy.get('[data-test="colorInput"]').invoke('val', '#abcdef').trigger('input');`

- date input: `cy.get('[data-test="dateInput"]').invoke('val', '1994-02-20').trigger('input');`

### Aliases

- using aliases in assertions
  ```js
  cy.get('[data-test="itemList"]').as("itemList");
  cy.get("@itemList").should("not.contain.text", "Howdy!");
  ```
- chaining aliases and selectors
  ```js
  cy.get("@unpackedItems").find("li").first().as("itemInQuestion");
  cy.get("@itemInQuestion").find("label").as("itemLabel");
  ```
- get the value of alias & make assertion
  ```js
  cy.get("@itemInQuestion").then((text) => {
    cy.get("@packedItems").contains(text);
  });
  ```

### cy.invoke

Invoke a function on the previously yielded subject.

```js
.invoke(functionName)
.invole(options, functionName)

cy.wrap({ animate: fn }).invoke('animate') // invoke the 'animate' function
cy.get('.modal').invoke('show') // invoke the jQuery 'show' function

const fn = () => 'bar'
cy.wrap({ foo: fn }).invoke('foo').should('eq', 'bar')

cy.get('div.container')
  .should('be.hidden') // element is hidden
  .invoke('show') // call jquery method 'show' on the '.container'
  .should('be.visible') // element is visible now
  .find('input') // drill down into a child "input" element
  .type('Cypress is great') // and type text

const greet = (name) => `hi ${name}`
cy.wrap({ greet: greet }).invoke('greet', 'Tsuki').should('eq', 'Tsuki')
```

### cy.wrap

Yield the object passed into `.wrap()`. If the object is a promise, yield its resolved value.

```js
cy.wrap(subject);
cy.wrap(subject, options);

// Invoke the function on the subject in wrap and return the new value
const getName = () => "Tsuki Cat";
cy.wrap({ name: getName }).invoke("name").should("eq", "Tsuki Cat");

// You can wrap promises
const myPromise = new Promise((resolve, reject) => {
  resolve({ message: "It worked!" });
});
cy.wrap(myPromise).its("message").should("eq", "It worked!");
```

### cy.its

Gets a properties value on the previously yielded subject

```js
cy.wrap({ age: 52 }).its("age").should("eq", 52);

// get index!
cy.wrap(["hey", "hi", "hello"]).its(1).should("eq", "hi");

// dom elements
cy.get("ul li").its("length").should("be.gt", 2); // 'be.gt' - greater than
```

### Generating Tests
