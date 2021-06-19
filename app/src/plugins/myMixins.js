// import { mapState, mapMutations } from 'vuex'

const myPlugin = {
    install(Vue){


        Vue.mixin({
          data:()=>({
            api: process.env.VUE_APP_URL,
          }),
          
          computed: {
            
              
          
          },
          methods: {
            
          },
         
        })
    }
}

export default myPlugin