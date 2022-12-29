# Comparisons between React Router v5 and v6

## 1. Switch Component (see App.js)
The Switch component is no longer present; it has been replaces by the Routes component

## 2. The usage of the Route component (see App.js)
The Component that should be rendered on a specific route is no longer called as a child of the Route component, but in the element prop of the Route component

## 3. The exact prop is gone (see App.js)
In v5 we needed to add exact because a match was found if a path started with a specific string. In v6, it always looks for exact matches.
If you want the old behavior you cane get that by adding /* after the path: path="/products/*" --> so this route will become active if a URL path starts with /products.
In addition React Router v6 has a better algorithm for picking the best route to be loaded for a given path --> therefore the order of the routes does not matter anymore!

## 4. activeClassName prop in NavLink has been removed (see MainHeader.js)
With v6 if you want to apply a specific class when a NavLink item is active, you have to manually find out whether it is active or not.
You can do it with the style prop or the className prop to apply dynamic styling: both props work in a special way when applied to NavLink: you can pass a function into className and this function returns some information about the link and the current state of navigation.

## 5. redirecting the user (see App.js)
We can still redirect, but instead of using the Redirect component (v5) we have to use the Navigate component (v6)

## 6. Nested Routes (see Welcome.js and App.js)
No need for custom paths like the ones in the previous project in QuoteDetail.js (`${match.path}/comments`); in v6 you can built easily nested routes with relative paths.
There are two ways of writing nested routes: uncomment in Welcome.js and App.js to see them work.

## 7. Programmatic Navigation: useHistory does not exist anymore (see Products.js)
with v6 there is a useNavigate Hook

## 8. the Prompt component does not exist anymore
so you have to implement your own workaround (but maybe the have introduced a new component? NB TO CHECK)
