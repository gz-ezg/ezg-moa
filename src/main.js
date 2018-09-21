// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import { Lazyload } from 'vant';
import axios from 'axios'
import VueBus from './common/vue-bus'
import { Toast } from 'vant';

Vue.use(VueBus)
Vue.use(Vant);
Vue.use(Lazyload);

Vue.prototype.$http = axios

Vue.prototype.$Get = function(url, config, success){
	let _self = this
	_self.$http.get(url, config).then(function(res){
		if(res.data.msgCode == "40000"){
			success(res)
		}else{
			_self.$toast.fail('系统错误！')
		}
	}).catch(function(err){
		_self.$toast.fail('网络错误！')
	})
}
Vue.prototype.$Post = function (url, config, success, fail) {
  let _self = this
  this.$http.post(url, config).then(function (res) {
    if (res.data.msgCode == "40000") {
      if (res.data.msg) {
        _self.$toast.success(res.data.msg)
      }
      success(res)
    } else {
      fail(res)
      _self.$toast.fail(res.data.msg)
    }
  }).catch(function (err) {
    fail(err)
    _self.$toast.fail(err)
  })
}

Vue.prototype.$backTo = function(){
  this.$router.go(-1)
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
