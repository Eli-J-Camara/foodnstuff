# Reconfiguration Plan

### Styling
1. Create global style variables and add colors you want.
2. Update photo
3. Update fonts
4. Add your own animation.

### Functionality
1. Update the price on the add button to match the amount of items set by the user.
2. Update the price on each item when multiple items are added in the modal.
> **Stretch Goal:** Add functionality to the order button that brings up a new modal and displays a order complete message.
---

### Checkout Backend
 - Add a form inside of the Cart.jsx modal with a name, number and address field.
 - On the submission of this form, useContext to call a function called orderCheckoutHandler in the CartProvider.jsx file.
 - The orderCheckoutHandler function will call the dispatchCartAction reducer function. 
 - The action object parameter will have five key-value pairs.
    1. key = type,  
    value = "Order"
    2. key = firstName,  
    value = customers first name added in the form.
    3. key = lastName,  
    value = customers first name added in the form.
    4. key = address,   
    value = customers address added in the form.
    5. key = PhoneNumber,  
    value = customer phone number.
 - In the cartReducer function create a new conditional statement that watches for the action type "Order".
    - This function will make a Post request to the Firebase database that submits an object called ORDER. ORDER will contain the following:
        1. Customer Name
        2. Customer Address
        3. Total Price
        4. Items (This will be an array of all the item objects accessed through state.items).  

### Alternative Approach
Reducer functions are pure functions so we should therefore avoid using any asynchranous calls in them. I will instead make my fetch request directly inside the Checkout component because there was no point in making it in a reducer function in the first place. Reducer functions are used in place of state when you have one state update the is dependent upon another previous snapshot of state. That is not something we are doing with our POST request.

 - Add a form inside of the Cart.jsx modal with a name, number and address field.
 - Get the current meal items in the Cart from the context.
 - Create a function that makes a fetch request inside of Cart.jsx.
 - POST the data from the form to the Firebase server and include the current meal items as one of the POST values.

---
### Validation
- Update the form to check if any text has been added into the two name fields.
- Use regex to validate the email (go further than before with the validation on this input.)
- For the phone number...

## Notes

1. The anonymous function that you pass to useEffect must not return a promise (meaning it cannot be asyncranous). Instead you can just nest an asyncranous function within that built-in useEffect function or call that asyncranous function from inside useEffect. Either way the functional call must be inside the useEffect call.

2. WARNING - On a server, you should never trust the data received from a client. Validation on the front end can always be cercumvented because the site visitor can always edit the javascript code. (Max has a node.js course that dives deeper into writing server side code.)
