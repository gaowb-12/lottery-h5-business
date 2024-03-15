import request from '@/util/ajax'



/**
 * 删除支付通道
 */
export function deleteAliPayKey(data) {
	return request({
		url: '/admin/dict/deleteAliPayKey',
		method: 'put',
		data
	})
}

/**
 * 添加支付通道
 */
export function addAliPayKey(data) {
	return request({
		url: '/admin/dict/addAliPayKey',
		method: 'put',
		data
	})
}

/**
 * 游戏上下架
 */
export function updateLine(data) {
	return request({
		url: '/admin/ball/update/line/'+data.id+'/'+data.line,
		method: 'put',
		data
	})
}


/**
 * 店铺修改扣款比例
 */
export function editShopRate(data) {
	return request({
		url: '/admin/shop/editShopRate',
		method: 'post',
		data
	})
}


/**
 * 店铺上下架
 */
export function updateShopLine(data) {
	return request({
		url: '/admin/shop/editShopLine',
		method: 'post',
		data
	})
}

/**
 * 店铺详情
 */
export function shopDetail(data) {
	return request({
		url: '/admin/shop/shopDetail',
		method: 'post',
		data
	})
}


/**
 * 店铺列表
 */
export function shopList(data) {
	return request({
		url: '/admin/shop/list',
		method: 'post',
		data
	})
}

/**
 * 创建店铺
 * @param {*} data 
 */
export function createShop(data) {
	return request({
		url: '/admin/shop/add',
		method: 'post',
		data
	})
}

/**
 * 站点获取
 */
export function domainQuery(data) {
	return request({
		url: '/admin/domain/query',
		method: 'get',
		data
	})
}

/**
 * 站点修改
 */
export function update(data) {
	return request({
		url: '/admin/domain/update/'+data.id,
		method: 'put',
		data
	})
}
/**
 * 获取修改赛果列表
 */

export function getSaiguoList(data) {
    return request({
        url: '/admin/lottery/order/nrlist',
        method: 'post',
		data
    })
}
/**
 * 修改赛果信列表
 */
export function setSaiguo(data) {
    return request({
        url: '/admin/lottery/order/upnrlist',
        method: 'post',
		data
    })
}

export function createShopX(data) {
	return request({
		url: '/admin/shop/addX',
		method: 'post',
		data
	})
}
export function shopListX(data) {
	return request({
		url: '/admin/shop/listX',
		method: 'post',
		data
	})
}


/**
 * 店铺详情
 */
export function shopDetailX(data) {
	return request({
		url: '/admin/shop/shopDetailX',
		method: 'post',
		data
	})
}


export function updateShopX(data) {
	return request({
		url: '/admin/shop/updateX',
		method: 'put',
		data
	})
}

export function getShopCountX(data) {
	return request({
		url: '/admin/statistics/countShopPriceX',
		method: 'post',
		data
	})
}
