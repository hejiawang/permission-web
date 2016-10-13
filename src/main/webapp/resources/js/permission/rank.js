var permission = permission || {};

/**
 * 职级js
 * 
 * @author HeJiawang
 * @date   2016.10.12
 */
permission.rank = {

	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
	
	common	:	{
		/**
		 * 职级url
		 */
		myurl	:	permission.domainUrl.baseDomain + '/rank',
		
		/**
		 * 职级列表选中项
		 */
		tableRowDateObj	: Object,
		
	},
	
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		
	},
}