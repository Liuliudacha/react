import React, { Component } from 'react'
import Head from '../head/head'
import { DatePicker, Table, Space, message } from 'antd'
import { work } from '../api/api'
import  moment  from 'moment'

const { Column } = Table;

export default class Index extends Component {

	constructor(){
		super(...arguments)
		this.state = {
			time : '',
			data : [],
            height : '',
            params : {
                station_name : '',
                mix_state : '',
                date : new Date().toLocaleDateString().replace(/\//g,'-'),
                page : '',
                pagesize : '',
            }
        }
    }
    
	componentWillMount(){
		this.setState({ height : window.innerHeight - 290})
		let token = sessionStorage.getItem('token')
		if(!token){
			this.props.history.push('/login')
			return
		}
		this.getList()
    }
    
    // 获取列表
    getList(){
        work().then(res=>{
			if(res.status === 200){
				const { data } = res.data
				data.forEach((o,idx)=>{ o.key = idx })
				this.setState({ data : res.data.data })
			}else{
				message.error(res.msg)
			}
		})
    }

    search(){
        console.log(this.state.params.station_name)
    }

    // 监听日期变化
	onChange(date, dateString){
		this.setState({ time : dateString })
    }
    
    // 监听状态筛选
    changeStatus(pagination, filters, sorter, extra){
        const { bind_state:[first] } = filters
        console.log(first)
    }

    selectedRowKeys(scope){
        console.log(scope)
    }

    station(event){
        event.persist()
        this.setState({ params : {
            ...this.state.params,
            station_name : event.target.value
        } },()=>{
            console.log(this.state.params.station_name)
        })
    }

	render() {
		const { height } = this.state
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
										<DatePicker defaultValue={moment()} onChange={this.onChange.bind(this)} placeholder="选择日期" />
									</li>
									<li>
										<span>关键字 : </span>
										<input type="text" onChange={(event)=>this.station(event)} placeholder="起点/终点名称" className="keyword" />
									</li>
									<li>
										<div className="search" onClick={this.search.bind(this)} >搜索</div>
									</li>
								</ul>
							</div>
						</div>
						{/* 表格 */}
						<div className="content">
							<Table 
								dataSource={this.state.data}
								rowKey={(index) => index.key}
                                scroll={{ y: height }}
                                onChange={this.changeStatus.bind(this)}
                                selectedRowKeys={this.selectedRowKeys.bind(this)}
							>
								<Column title="ID" dataIndex="id" width="70px" />
								<Column title="任务来源" width="110px" dataIndex="create_user" render={(item,index) => {
									if (index.model_type === 1005){
										return(
											<span>{index.create_user}</span>
										)
									} else {
										return(
											<span>微巴士派单</span>
										)
									}
								}}  />
								<Column title="类型" width="70px" dataIndex="model_type" render={(item,index) => {
									if ( index.model_type === 1005 ) {
										return(
											<span>{index.route_type === 1 ? '单程' : (index.route_type === 2) ? '往返' : '单接单送' }</span>
										)
									} else {
										return(
											<span>{ index.model_type === 1004 ? '教育' : ( index.model_type === 1001 ) ? '专线' : '包车'}</span>
										)
									}
								}}/>
								<Column title="时间" dataIndex="start_time" render={(index) => <span>{index.substring(0,index.length - 3)}</span>} />
								<Column title="起点终点" width="200px" dataIndex="model_station_start_name" render={(item,index) => <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{index.model_station_start_name + ' - ' + index.model_station_end_name}</span>} />
								<Column title="派单需求" dataIndex="remark" />
								<Column title="状态" filters={
                                    [{ text: '全部', value: '0',},{text: '待发布', value: '4', },{text: '已发布', value: '2', },{text: '待排班', value: '3', }]
                                    } width="70px" dataIndex="bind_state" render={(item,index) => <span>{index.bind_state === 0 ? '待排班' : ( index.bind_state === 1 ) ? '待发布' : '已发布'}</span>} />
								<Column title="操作人" width="80px" dataIndex="create_user" />
								<Column title="所需车型" dataIndex="bus_type_name" />
								<Column title="车型/车牌/司机" width="220px" render={(item) => (
									<>
										{item.bind_list.map((it,idx) => {
											return(
												<div key={idx}>
													<span >{it.bus_name === null ? '' : it.bus_name }{'/' + it.bus_plate + '/' + it.driver_name}</span>
                                                    <div>
                                                        <span className={item.isclick === true && item.handel.changeBind === 1? 'operateButton' : 'cor66'}>更换</span>
                                    				    <span className={item.isclick === true && item.handel.changeBind === 1? 'operateButton' : 'cor66'}>解绑</span>
                                                    </div>
												</div>
											)
										})}
									</>
								)} />
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