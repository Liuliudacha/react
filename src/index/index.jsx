import React, { Component } from 'react'
import Head from '../head/head'
import { DatePicker, Table, Tag, Space, message } from 'antd'
import { work } from '../api/api'
import Item from 'antd/lib/list/Item';

const { Column } = Table;

export default class Index extends Component {

	constructor(){
		super(...arguments)
		this.state = {
			time : '',
			pagination: {
				current: 1,
				pageSize: 10,
				total:30,
			},
			data : []
		}
	}

	componentWillMount(){
		let token = sessionStorage.getItem('token')
		if(!token){
			this.props.history.push('/login')
			return
		}
		work().then(res=>{
			if(res.status === 200){
				this.setState({ data : res.data.data })
			}else{
				message.error(res.msg)
			}
		})
	}

	onChange(date, dateString){
		this.setState({ time : dateString })
	}

	render() {
		return (
			<div className="y_maxBoxs">
				<Head />
				<div className="maxBox">
					<div className="table">
					{/* 顶部操作栏  */}
						<div className="header">
							<div className="copy">
								<div className="financeButtonActive">批量排班</div>
								<div className="financeButtonActive">批量发布</div>
							</div>
							<div className="time">
								<ul>
									<li>
										<span>选择日期 : </span>
										<DatePicker onChange={this.onChange.bind(this)} placeholder="选择日期" />
									</li>
									<li>
										<span>关键字 : </span>
										<input type="text" placeholder="起点/终点名称" className="keyword" />
									</li>
									<li>
										<div className="search" >搜索</div>
									</li>
								</ul>
							</div>
						</div>
						{/* 表格 */}
						<div className="content">
							<Table 
								dataSource={this.state.data}
								pagination={this.state.pagination}
								// Key={(record, key) => {return key}}
								rowKey={record => record.uid}
							>
								<Column title="ID" dataIndex="id" key="id" render={(item,index) => (
									console.log(item,index)
								)} />
								<Column title="任务来源" dataIndex="id" key="id" />
								<Column title="类型" dataIndex="id" key="id" />
								<Column title="时间" dataIndex="id" key="id" />
								<Column title="起点终点" dataIndex="id" key="id" />
								<Column title="派单需求" dataIndex="id" key="id" />
								<Column title="状态" dataIndex="id" key="id" />
								<Column title="操作人" dataIndex="id" key="id" />
								<Column title="所需车型" dataIndex="id" key="id" />
								<Column title="车型/车牌/司机" dataIndex="id" key="id" />
								<Column
									title="操作"
									key="id"
									render={(text, record) => (
										<Space size="middle">
											<span>234</span>
										</Space>
									)}
								/>
							</Table>
						</div>

					</div>
				</div>
			</div>
    	)
	}


}