<template>
  <v-app id="app">
    <Topbar></Topbar>
    <v-content app>
      <v-container fluid class="mt-10">
        <v-fab-transition>
          <v-btn
                  class=" "
                  v-show="gotop"
                  color="primary"
                  fab
                  dark
                  fixed
                  bottom
                  right
                  @click="toTop"
          >
            <v-icon>mdi-arrow-up</v-icon>

          </v-btn>

        </v-fab-transition>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer style="postition:absolute;bottom:0;" class="py-4" dark height="auto">
      <v-container mx-auto>
        <v-layout wrap>
          <v-flex xs10>
            <v-container>
              <v-row align="end">
                {{$t("ui.developer")}}
                <v-btn icon @click="See('https://github.com/oruyanke/okayu-button')">
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </v-row>
              <v-row>
                {{$t("ui.cridits")}}
              </v-row>
              <v-row>
                {{$t("ui.developerinfo")}}
              </v-row>
            </v-container>
          </v-flex>
          <v-spacer/>
          <v-btn class="mr-0" square title="Go to top" @click="$vuetify.goTo(0)">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-footer>


  </v-app>
</template>

<script>
    import Topbar from "./components/Topbar.vue"

    export default {
        name: 'App',

        components: {
            Topbar,
        },

        data: () => ({
            gotop: false,
            prompt: false,
            deferred: null,
            addtoscreendialog: false,
            //
        }),
        mounted() {
            let timeNow = new Date();
            let hours = timeNow.getHours();
            if (hours < 6 || hours > 18) {//自动触发夜间模式
                this.$store.commit("change_dark_mode");
                this.$vuetify.theme.dark = this.$store.state.dark_mode;
                window.console.log("success")
            }
            window.onbeforeinstallprompt = (e) => {     //当浏览器触发横幅显示事件
                window.console.log(e);
                this.prompt = true;
                this.deferred = e;
                //window.console.log(this.prompt);
                this.showAddToHomeScreen();
            }
            window.addEventListener("scroll", this.handleScroll, true);
            if (this.$cookies.isKey("Lang")) {
                this.$i18n.locale = this.$cookies.get("Lang");

            }
        },
        methods: {
            showAddToHomeScreen() {
                window.console.log("success");
                this.addtoscreendialog = true;

            },
            addToHomescreen() {
                this.deferred.prompt();
                let _this = this
                this.deferred.userChoice
                    .then(function (choiceResult) {
                        if (choiceResult.outcome === 'accepted') {
                            window.console.log('User accepted the A2HS prompt');
                            _this.addtoscreendialog = false;
                        } else {
                            window.console.log('User dismissed the A2HS prompt');
                        }
                        // 释放不再有用的deferredPrompt对象
                    });

            },
            handleScroll() {
                let scrolltop =
                    document.documentElement.scrollTop || document.body.scrollTop;
                scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
            },
            toTop() {
                let top = document.documentElement.scrollTop || document.body.scrollTop;
                // 实现滚动效果
                const timeTop = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 10);
            },
            See(e) {
                window.location.href = e
            }
        }

    };
</script>
