//生产环境
const prod = {
   BASE_API: '/api',
  //BASE_API: 'https://vue.qihang9981.com/api',
}

//开发环境
const dev = {
	 // BASE_API: 'http://116.62.152.235:8090',
	 BASE_API: 'http://localhost:48080',
  // BASE_API: 'http://47.97.27.92:8090',
}


/*
=================注意根据需要改变环境================
 */
const environment = dev;
export default {
  BASE_API: environment.BASE_API,
}
