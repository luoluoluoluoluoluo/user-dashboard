import React from 'react';
import styles from './Users.css';
import {
	Table,
	Pagination,
	Popconfirm,
	Button
} from 'antd';
import {
	connect
} from 'dva';
import {
	PAGE_SIZE
} from '../../constants';
import {
	routerRedux
} from 'dva/router';
import UserModal from './UserModal';

function Users({
	dispatch,
	list: dataSource,
	loading,
	total,
	page: current
}) {

	function deleteHandler(id) {
		dispatch({
			type: 'users/remove',
			payload: id
		});
	}

	function pageChangeHandler(page) {
		dispatch(routerRedux.push({
			pathname: '/users',
			query: {
				page
			}
		}));
	}

	function editHandler(id, values) {
		dispatch({
			type: 'users/patch',
			payload: {
				id,
				values
			}
		})
	}

	const columns = [{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a href="">{text}</a>,
	}, {
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	}, {
		title: 'Website',
		dataIndex: 'website',
		key: 'website',
	}, {
		title: 'Operation',
		key: 'operation',
		render: (text, record) => (
			<span className={styles.operation}>
				<UserModal record={record} onOk={editHandler.bind(null,record.id)}>
					<a>Edit</a>
				</UserModal>
				<Popconfirm title="Confirm to delete?" onConfrim={deleteHandler.bind(null,record.id)}>
					<a href="">Delete</a>
				</Popconfirm>
			</span>
		),
	}, ];

	return (
		<div className={styles.normal}>
      <Table 
	      columns={columns}
	      loading={loading}
	      dataSource={dataSource}
	      rowKey={record=>record.id}
	      pagination={false}
	      />
      <Pagination 
      	className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
	);
}

function mapStateToProps(state) {
	const {
		list,
		total,
		page
	} = state.users;
	return {
		list,
		loading: state.loading.models.users,
		total,
		page
	};
}
export default connect(mapStateToProps)(Users);