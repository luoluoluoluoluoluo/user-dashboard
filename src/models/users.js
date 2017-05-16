import * as userService from "../services/users";

export default {
	namespace: 'users',
	state: {
		list: [],
		total: null,
		page: null,
	},
	reducers: {
		save(state, {
			payload: {
				data: list,
				total,
				page
			}
		}) {
			return {...state,
				list,
				total,
				page
			};
		},
	},
	effects: { * fetch({
			payload: {
				page = 1
			}
		}, {
			call,
			put
		}) {
			const {
				data,
				headers
			} = yield call(userService.fetch, {
				page
			});
			yield put({
				type: 'save',
				payload: {
					data,
					total: parseInt(headers['x-total-count'], 10),
					page: parseInt(page, 10),
				},
			});
		},
	},
	subscriptions: {
		setup({
			history,
			dispatch
		}) {
			return history.listen(({
				pathname,
				query
			}) => {
				if (pathname === '/users') {
					dispatch({
						type: 'fetch',
						payload: query
					});
				}
			});
		},
	},
};