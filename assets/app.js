/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import Vue from 'vue';
import Base from './Base';
import Auth from './components/Auth';
import App from './components/App';
import AppContacts from './components/App/AppContacts';
import AppChats from './components/App/AppChats';
import AppSettings from './components/App/AppSettings';
import Chat from './components/App/Chat';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'
import { faSave} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'
import { faQuestion} from '@fortawesome/free-solid-svg-icons'
import { faBan} from '@fortawesome/free-solid-svg-icons'
import { faEraser} from '@fortawesome/free-solid-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faCogs)
library.add(faCog)
library.add(faUserPlus)
library.add(faEdit)
library.add(faFile)
library.add(faImage)
library.add(faCamera)
library.add(faPaperPlane)
library.add(faComments)
library.add(faSave)
library.add(faSignInAlt)
library.add(faSignOutAlt)
library.add(faAddressBook)
library.add(faQuestion)
library.add(faBan)
library.add(faEraser)
library.add(faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import VueConfirmDialog from 'vue-confirm-dialog'
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(require('vue-moment'));
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({  
    mode:'history',
    components: {Base},
    routes: [
        { 
                name: "auth",
                path: '/auth', 
                component:  Auth,
                props: true,
        },
        { 
                name: "app",
                path: '/app', 
                component:  App,
                props: true,
                children:[
                  
                  { 
                    name: "app_contacts",
                    path: '/app/contacts', 
                    component:  AppContacts,
                    props: true,
                  },
                  { 
                    name: "app_chats",
                    path: '/app/chats', 
                    component:  AppChats,
                    props: true,
                  },
                  { 
                    name: "app_settings",
                    path: '/app/settings', 
                    component:  AppSettings,
                    props: true,
                  },
                  { 
                    name: "app_chat",
                    path: '/app/chat/:id', 
                    component:  Chat,
                    props: true,
                  },
                ]

        }
    ]
});
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import device from "vue-device-detector"
Vue.use(device)

new Vue({
    created: function() {
      this.config = JSON.parse(document.getElementById('_symfonyData').innerHTML);
      this.connection = new WebSocket(this.config.websocket_url)
        this.connection.onopen =  () => {
            this.connected = true;
        }
        this.connection.onclose =  () => {
            this.connected = false;
        }
        
        this.connection.onmessage = (event) => {
            let result = JSON.parse(event.data);
            this.$emit(result.command, result)
            
      }
    },
    methods: {
      notify:function(message) {
        if (this.notify_permission) {
          console.log("got permissions, sending notification")
          var notification = new Notification(message);
        } else {
          console.log("no permissions")
        }
      },
      created() {
      },
    },
    data: function() {
      return {
        config:[],
        connection:null,
        connected:false,
        token:null,
        claim:null,
        notify_permission:null,
      }
    },
    el: '#app',
    render: h => h(Base),  router: router,
});