import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                success: colors.cyan.base,

                primary: colors.blue.lighten1,
                secondary: colors.teal.accent3,

                info: colors.amber.base,
                failure: colors.red.lighten1,
                error: colors.red.base,
        
                background: colors.blueGrey.lighten4,

                text: colors.blueGrey.darken4
            },
        },
        options: {
            customProperties: true
        },

      },
      })



