export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [];

export const dictionary = {
		"/(pages)": [~4,[2]],
		"/(pages)/designations": [~5,[2]],
		"/(auth)/login": [~3],
		"/(pages)/pages": [~6,[2]],
		"/(pages)/pages/create": [~7,[2]],
		"/(pages)/pages/edit/[id]": [~8,[2]],
		"/(pages)/services": [~9,[2]],
		"/(pages)/services/create": [~10,[2]],
		"/(pages)/services/edit/[id]": [~11,[2]],
		"/(pages)/users": [~12,[2]],
		"/(pages)/users/create": [13,[2]],
		"/(pages)/users/edit/[id]": [~14,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';