# CSS Scoping
So far we have used regular CSS with regular CSS selectors:
even if we are importing a css file e.g. **CourseGoalList.css** in the **CourseGoulaList.js** and using the className "goal-list" for styling the list component, this css is not scoped: if on the webpage other components (that are not the CourseGoalList component) are styled with the "goal-list" className, they will be affected because this css class is not scoped to the CourseGoalList component (it would affect any element on the entire page (**downstream of the import**))

NB by default the styles are not scoped: this is not necessarily a rpoblem because you can simply be careful about your selectors

# 2 Approaches to scope styles
1. Use a package named **Styled Components** https://styled-components.com/ : this package helps you build components that have certain styles attached to them, where the styles really only affect the components to which they are attached to, and not other components; install it with `npm install --save styled-components`
2. **CSS Modules** CSS Modules is a feature which is only available in projects that are configured to support it, because it needs a code transformation that needs to be done before your code runs in the browser. Now, the good thing is the react projects created with create react app which we used are already configured to support CSS Modules. (reference: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

JetBrains Mono https://www.jetbrains.com/lp/mono/#how-to-install https://vueschool.io/articles/vuejs-tutorials/how-to-install-jetbrains-mono-font-in-visual-studio-code/