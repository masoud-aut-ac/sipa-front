<template>
  <div
    class="min-h-screen px-4"
    style="
      background-image: url('loginBackground.png');
      direction: rtl;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
    "
  >
    <div class="lg:max-w-xs my-align-middle">
      <div v-if="isLoadingData" class="text-center">
        <v-progress-circular
          indeterminate
          color="#FFA000"
          size="48"
        ></v-progress-circular>
      </div>
      <div v-else>
        <div class="pb-2 pt-2">
          <div class="grid grid-cols-2 border-b-2 border-white">
            <p class="font-serif text-white font-bold pr-2 py-3 text-xl">
              ورود
            </p>
            <img src="logo.png" class="pr-24" style="" />
          </div>
        </div>
        <div class="text-center pt-2" v-if="passwordIsIncorrect">
          <p class="font-serif text-red text-xs">
            نام کاربری یا رمز عبور اشتباه است
          </p>
        </div>
        <div>
          <v-form v-model="valid">
            <p class="font-serif text-white p-1 pt-4 text-sm">نام کاربری</p>
            <v-text-field
              @keyup.enter="login"
              v-model="username"
              class="font-serif opacity-60"
              placeholder="Username"
              :rules="usernameRules"
              solo
              dense
              dir="ltr"
            ></v-text-field>
            <p class="font-serif text-white p-1 text-sm">رمز عبور</p>
            <v-text-field
              @keyup.enter="login"
              v-model="password"
              class="font-serif opacity-60"
              placeholder="Password"
              :rules="passwordRules"
              solo
              dense
              type="password"
              dir="ltr"
            ></v-text-field>
            <v-checkbox
              color="white"
              class="font-serif text-sm mt-0"
              v-model="rememberMe"
              label="مرا به خاطر بسپار"
              dark
              dense
            ></v-checkbox>
          </v-form>
          <div class="text-center pb-12">
            <v-btn block color="#fcc66b" class="font-serif mt-2" @click="login"
              >ورود</v-btn
            >
            <!-- <v-btn
            dark
            block
            outlined
            class="font-serif mt-6 opacity-80"
            @click="$router.push('/sign-up')"
          >
            ثبت نام</v-btn
          > -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  auth: "guest",

  data() {
    return {
      isLoadingData: false,
      passwordIsIncorrect: false,
      valid: false,
      username: "",
      password: "",
      rememberMe: true,
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    async login() {
      this.isLoadingData = true;
      this.passwordIsIncorrect = false;
      try {
        const res = await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe,
          },
        });
        if (res.data.statusCode === 200) {
          this.$auth.setUser(res.data.detail.user);
          this.$router.push("/");
        } else {
          this.isLoadingData = false;
          this.passwordIsIncorrect = true;
        }
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },
};
</script>

<style>
.v-input--selection-controls {
  margin: 0 !important;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin: 0 !important;
}
.v-label {
  font-size: 12px !important;
}
.theme--light.v-messages {
  color: white !important;
}
.v-btn {
  font-weight: normal !important;
}
@media screen and (min-width: 600px) {
  .my-align-middle {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
@media screen and (max-width: 600px) {
  .my-align-middle {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-20%, -50%);
    transform: translate(-20%, -50%);
    margin-left: -20%;
  }
}
</style>
