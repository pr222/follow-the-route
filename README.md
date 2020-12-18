# Follow the route

In this exercise, you should train your ability to create routes in the Node.js web application framework [Express](https://expressjs.com/) and render some simple views.

In this exercise, you should practice your ability to create routes in Node.j's web application framework [Express](https://expressjs.com/) and make some simple views.

You should not use any database, it is enough to fake (mock) one by letting the controller save the products in an array.

## The task

You should create a web application that meets the following:

1. The web application should listen to port 8080.
2. When the client asks for the root URL, a static HTML file (index.html) should be sent to the client in response.
3. The application must have a main layout template for all dynamic views.
4. The web application must have the following URLs:
   1. GET `/products` - a view should be rendered containing a list of links to the persistent products (the resource to single products is described in point 4.2).
   2. GET `/products/:id` - a view should be rendered that output an HTML document displaying the product. If the client request `/products/231`, the product with id 231 should be displayed.
   3. GET `/products/new` - a view should be rendered with a simple HTML form that should be displayed. The form should have a button that posts the form to the URL described in point 4.4.
   4. POST `/products/create` - a function should be called that saves the form data and redirects the client to the URL `/products`.
5. The server must respond with a custom page if a page is not found (404) or if there is an internal server error (500). The response must also have the appropriate status code set.
