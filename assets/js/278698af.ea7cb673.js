(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{146:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(8),i=(n(0),n(522)),o=n(526),c=n(527),s={id:"redux-integration",title:"Redux integration",sidebar_label:"Redux integration"},l={unversionedId:"redux-integration",id:"version-2.x/redux-integration",isDocsHomePage:!1,title:"Redux integration",description:"Warning: in the next major version of React Navigation, to be released in Fall 2018, we will no longer provide any information about how to integrate with Redux and it may cease to work. Issues related to Redux that are posted on the React Navigation issue tracker will be immediately closed. Redux integration may continue to work but it will not be tested against or considered when making any design decisions for the library.",source:"@site/versioned_docs/version-2.x/redux-integration.md",slug:"/redux-integration",permalink:"/docs/2.x/redux-integration",editUrl:"https://github.com/react-navigation/react-navigation.github.io/edit/main/versioned_docs/version-2.x/redux-integration.md",version:"2.x",sidebar_label:"Redux integration",sidebar:"version-2.x-docs",previous:{title:"App containers",permalink:"/docs/2.x/app-containers"},next:{title:"Overview",permalink:"/docs/2.x/custom-navigator-overview"}},u=[{value:"Overview",id:"overview",children:[]},{value:"Step-by-step guide",id:"step-by-step-guide",children:[]},{value:"Full example",id:"full-example",children:[]},{value:"Mocking tests",id:"mocking-tests",children:[]},{value:"Under the hood",id:"under-the-hood",children:[{value:"Creating your own navigation reducer",id:"creating-your-own-navigation-reducer",children:[]}]},{value:"Handling the Hardware Back Button in Android",id:"handling-the-hardware-back-button-in-android",children:[]}],d={toc:u};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Warning: in the next major version of React Navigation, to be released in Fall 2018, we will no longer provide any information about how to integrate with Redux and it may cease to work"),". Issues related to Redux that are posted on the React Navigation issue tracker will be immediately closed. Redux integration may continue to work but it will not be tested against or considered when making any design decisions for the library."),Object(i.b)("p",null,"Some folks like to have their navigation state stored in the same place as the rest of their application state. ",Object(i.b)("em",{parentName:"p"},"Think twice before you consider doing this, there is an incredibly good chance that you do not need to do this!"),". Storing your React Navigation state in your own Redux store is likely to give you a very difficult time if you don't know what you're doing."),Object(i.b)("p",null,"If your only reason for doing this is that you want to be able to perform navigation actions from outside of your components (eg: from a Redux middleware), you can learn more about this in ",Object(i.b)("a",{parentName:"p",href:"/docs/2.x/navigating-without-navigation-prop"},"navigating without the navigation prop"),"."),Object(i.b)("h2",{id:"overview"},"Overview"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"To handle your app's navigation state in Redux, you can pass your own ",Object(i.b)("a",{parentName:"p",href:"/docs/2.x/navigation-prop"},Object(i.b)("inlineCode",{parentName:"a"},"navigation"))," prop to a navigator. ",Object(i.b)("inlineCode",{parentName:"p"},"react-navigation-redux-helpers"),' handles this for you behind the scenes with a "higher-order component" called ',Object(i.b)("inlineCode",{parentName:"p"},"reduxifyNavigator"),". You pass in your root navigator component to the ",Object(i.b)("inlineCode",{parentName:"p"},"reduxifyNavigator")," function, and it returns a new component that takes your navigation ",Object(i.b)("inlineCode",{parentName:"p"},"state")," and ",Object(i.b)("inlineCode",{parentName:"p"},"dispatch")," function as props.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"A middleware is needed so that any events that mutate the navigation state properly trigger React Navigation's event listeners.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"The navigation state inside Redux will need to be kept updated using React Navigation's navigation reducer. You will call this reducer from your Redux master reducer."))),Object(i.b)("h2",{id:"step-by-step-guide"},"Step-by-step guide"),Object(i.b)("p",null,"The following steps apply to ",Object(i.b)("inlineCode",{parentName:"p"},"react-navigation@^2.3.0")," and ",Object(i.b)("inlineCode",{parentName:"p"},"react-navigation-redux-helpers@^2.0.0-beta"),"."),Object(i.b)("p",null,"First, you need to add the ",Object(i.b)("inlineCode",{parentName:"p"},"react-navigation-redux-helpers")," package to your project."),Object(i.b)(o.a,{defaultValue:"npm",values:[{label:"npm",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},Object(i.b)(c.a,{value:"npm",mdxType:"TabItem"},Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"npm install react-navigation-redux-helpers\n"))),Object(i.b)(c.a,{value:"yarn",mdxType:"TabItem"},Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"yarn add react-navigation-redux-helpers\n")))),Object(i.b)("p",null,"The following is a minimal example of how you might use navigators within a Redux application:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-es6"},"import {\n  createStackNavigator,\n} from 'react-navigation';\nimport {\n  createStore,\n  applyMiddleware,\n  combineReducers,\n} from 'redux';\nimport {\n  reduxifyNavigator,\n  createReactNavigationReduxMiddleware,\n  createNavigationReducer,\n} from 'react-navigation-redux-helpers';\nimport { Provider, connect } from 'react-redux';\nimport React from 'react';\n\nconst AppNavigator = createStackNavigator(AppRouteConfigs);\n\nconst navReducer = createNavigationReducer(AppNavigator);\nconst appReducer = combineReducers({\n  nav: navReducer,\n  ...\n});\n\n// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator\nconst middleware = createReactNavigationReduxMiddleware(\n  \"root\",\n  state => state.nav,\n);\n\nconst App = reduxifyNavigator(AppNavigator, \"root\");\nconst mapStateToProps = (state) => ({\n  state: state.nav,\n});\nconst AppWithNavigationState = connect(mapStateToProps)(App);\n\nconst store = createStore(\n  appReducer,\n  applyMiddleware(middleware),\n);\n\nclass Root extends React.Component {\n  render() {\n    return (\n      <Provider store={store}>\n        <AppWithNavigationState />\n      </Provider>\n    );\n  }\n}\n")),Object(i.b)("p",null,"Once you do this, your navigation state is stored within your Redux store, at which point you can fire navigation actions using your Redux dispatch function."),Object(i.b)("p",null,"Keep in mind that when a navigator is given a ",Object(i.b)("inlineCode",{parentName:"p"},"navigation")," prop, it relinquishes control of its internal state. That means you are now responsible for persisting its state, handling any deep linking, ",Object(i.b)("a",{parentName:"p",href:"#handling-the-hardware-back-button-in-android"},"Handling the Hardware Back Button in Android"),", etc."),Object(i.b)("p",null,"Navigation state is automatically passed down from one navigator to another when you nest them. Note that in order for a child navigator to receive the state from a parent navigator, it should be defined as a ",Object(i.b)("inlineCode",{parentName:"p"},"screen"),"."),Object(i.b)("p",null,"Applying this to the example above, you could instead define ",Object(i.b)("inlineCode",{parentName:"p"},"AppNavigator")," to contain a nested ",Object(i.b)("inlineCode",{parentName:"p"},"TabNavigator")," as follows:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-es6"},"const AppNavigator = createStackNavigator({\n  Home: { screen: MyTabNavigator },\n});\n")),Object(i.b)("p",null,"In this case, once you ",Object(i.b)("inlineCode",{parentName:"p"},"connect")," ",Object(i.b)("inlineCode",{parentName:"p"},"AppNavigator")," to Redux as is done in ",Object(i.b)("inlineCode",{parentName:"p"},"AppWithNavigationState"),", ",Object(i.b)("inlineCode",{parentName:"p"},"MyTabNavigator")," will automatically have access to navigation state as a ",Object(i.b)("inlineCode",{parentName:"p"},"navigation")," prop."),Object(i.b)("h2",{id:"full-example"},"Full example"),Object(i.b)("p",null,"There's a working example app with Redux ",Object(i.b)("a",{parentName:"p",href:"https://github.com/react-navigation/react-navigation/tree/2.x/examples/ReduxExample"},"here")," if you want to try it out yourself."),Object(i.b)("h2",{id:"mocking-tests"},"Mocking tests"),Object(i.b)("p",null,"To make jest tests work with your React Navigation app, you need to change the jest preset in the ",Object(i.b)("inlineCode",{parentName:"p"},"package.json"),", see ",Object(i.b)("a",{parentName:"p",href:"https://facebook.github.io/jest/docs/tutorial-react-native.html#transformignorepatterns-customization"},"here"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-json"},'"jest": {\n  "preset": "react-native",\n  "transformIgnorePatterns": [\n    "node_modules/(?!(jest-)?react-native|react-navigation|react-navigation-redux-helpers)"\n  ]\n}\n')),Object(i.b)("h2",{id:"under-the-hood"},"Under the hood"),Object(i.b)("h3",{id:"creating-your-own-navigation-reducer"},"Creating your own navigation reducer"),Object(i.b)("p",null,"If you want to replace ",Object(i.b)("inlineCode",{parentName:"p"},"createNavigationReducer")," reducer creator this is how you would do it yourself:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-es6"},"const AppNavigator = createStackNavigator(AppRouteConfigs);\n\nconst initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));\n\nconst navReducer = (state = initialState, action) => {\n  const nextState = AppNavigator.router.getStateForAction(action, state);\n\n  // Simply return the original `state` if `nextState` is null or undefined.\n  return nextState || state;\n};\n")),Object(i.b)("h2",{id:"handling-the-hardware-back-button-in-android"},"Handling the Hardware Back Button in Android"),Object(i.b)("p",null,"By using the following snippet, your nav component will be aware of the back button press actions and will correctly interact with your stack. This is really useful on Android."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-es6"},'import React from "react";\nimport { BackHandler } from "react-native";\nimport { NavigationActions } from "react-navigation";\n\n/* your other setup code here! this is not a runnable snippet */\n\nclass ReduxNavigation extends React.Component {\n  componentDidMount() {\n    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);\n  }\n\n  componentWillUnmount() {\n    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);\n  }\n\n  onBackPress = () => {\n    const { dispatch, nav } = this.props;\n    if (nav.index === 0) {\n      return false;\n    }\n\n    dispatch(NavigationActions.back());\n    return true;\n  };\n\n  render() {\n    /* more setup code here! this is not a runnable snippet */\n    return <AppNavigator navigation={navigation} />;\n  }\n}\n')))}p.isMDXComponent=!0},522:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return g}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=u(n),b=a,g=d["".concat(o,".").concat(b)]||d[b]||p[b]||i;return n?r.a.createElement(g,c(c({ref:t},l),{},{components:n})):r.a.createElement(g,c({ref:t},l))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},523:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},524:function(e,t,n){"use strict";var a=n(0),r=n(525);t.a=function(){var e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},525:function(e,t,n){"use strict";var a=n(0),r=Object(a.createContext)(void 0);t.a=r},526:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(524),o=n(523),c=n(59),s=n.n(c);var l=37,u=39;t.a=function(e){var t=e.lazy,n=e.block,c=e.defaultValue,d=e.values,p=e.groupId,b=e.className,g=Object(i.a)(),m=g.tabGroupChoices,v=g.setTabGroupChoices,h=Object(a.useState)(c),f=h[0],y=h[1],O=a.Children.toArray(e.children),j=[];if(null!=p){var w=m[p];null!=w&&w!==f&&d.some((function(e){return e.value===w}))&&y(w)}var N=function(e){var t=e.target,n=j.indexOf(t),a=O[n].props.value;y(a),null!=p&&(v(p,a),setTimeout((function(){var e,n,a,r,i,o,c,l;(e=t.getBoundingClientRect(),n=e.top,a=e.left,r=e.bottom,i=e.right,o=window,c=o.innerHeight,l=o.innerWidth,n>=0&&i<=l&&r<=c&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s.a.tabItemActive),setTimeout((function(){return t.classList.remove(s.a.tabItemActive)}),2e3))}),150))},x=function(e){var t,n;switch(e.keyCode){case u:var a=j.indexOf(e.target)+1;n=j[a]||j[0];break;case l:var r=j.indexOf(e.target)-1;n=j[r]||j[j.length-1]}null===(t=n)||void 0===t||t.focus()};return r.a.createElement("div",{className:"tabs-container"},r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(o.a)("tabs",{"tabs--block":n},b)},d.map((function(e){var t=e.value,n=e.label;return r.a.createElement("li",{role:"tab",tabIndex:f===t?0:-1,"aria-selected":f===t,className:Object(o.a)("tabs__item",s.a.tabItem,{"tabs__item--active":f===t}),key:t,ref:function(e){return j.push(e)},onKeyDown:x,onFocus:N,onClick:N},n)}))),t?Object(a.cloneElement)(O.filter((function(e){return e.props.value===f}))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},O.map((function(e,t){return Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==f})}))))}},527:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){var t=e.children,n=e.hidden,a=e.className;return r.a.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}}}]);