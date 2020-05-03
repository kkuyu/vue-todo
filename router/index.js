import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home"
import About from "../views/Home"
import TodoApp from "../views/TodoApp"

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/about",
		component: About
	},
	{
		path: "/todos",
		component: TodoApp
	}
]

export default new VueRouter({
	routes
})