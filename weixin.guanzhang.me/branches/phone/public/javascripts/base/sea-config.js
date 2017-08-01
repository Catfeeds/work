seajs.config({
    // 路径配置
    paths: {
   	 'root': '../../'
    },
    
	// 别名配置
	alias: {
	    'jquery': 'root/base/jquery-1.8.3.min.js',
	    'cssjs': 'root/base/dist/seajs-css.js',
	    'box': 'root/core/box/box.min.js',
	    'page': 'root/core/page/page.min.js',
	    'tab': 'root/core/tab/tab.min.js',
	    'tool': 'root/core/tool/tool.min.js',
	    'slider': 'root/core/slider/slider.min.js',
	    'marquee': 'root/core/marquee/marquee.min.js',
	    'validate': 'root/core/validate/validate.min.js',
	    'chart': 'root/chart/chart.min.js',
	    'touch': 'root/touch/touch.min.js',
	    'fullcalendar': 'root/fullcalendar/fullcalendar.min.js',
	    'laydate': 'root/laydate/laydate.min.js',
	    'md5': 'root/md5/md5.min.js'
	},
	// 文件编码
	charset: 'utf-8'
})