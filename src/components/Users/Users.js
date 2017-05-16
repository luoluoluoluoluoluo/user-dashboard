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

function Users({
	list: dataSource,
	loading,
	total,
	page: current
}) {
	function deleteHandler(id) {
		console.warn(`TODO:${id}`);
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
		render: (text, id) => (
			<span className={styles.operation}>
				<a href="">Edit</a>
				<Popconfirm title="Confirm to delete?" onConfrim={deleteHandler.bind(null,id)}>
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