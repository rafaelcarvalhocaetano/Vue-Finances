<template>
  <v-container fill-height >
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg13 x13>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
            v-show="isLoader"
            indeterminate
            color="write"
            width="2"
            ></v-progress-circular>
          </v-toolbar>

            <v-card-text>
              <v-form>
                <v-text-field
                  v-if="!isLogin"
                  prepend-icon="person"
                  name="name"
                  label="Nome"
                  type="text"
                  :error-messages="nameErrors"
                  :success="!$v.user.name.$invalid"
                  v-model.trim="$v.user.name.$model"
                  ></v-text-field>
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="email"
                  :error-messages="emailErrors"
                  :success="!$v.user.email.$invalid"
                  v-model.trim="$v.user.email.$model"
                  ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Senha"
                  type="password"
                  :error-messages="passwordErrors"
                  :success="!$v.user.password.$invalid"
                  v-model.trim="$v.user.password.$model"
                  ></v-text-field>
              </v-form>
              <v-btn
                block depressed color="secondary"
                @click="isLogin = !isLogin"
              >{{ texts.button }}</v-btn>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary" large
                :disabled="$v.$invalid"
                @click="submit"
              >{{ texts.toolbar }}</v-btn>
            </v-card-actions>

            <v-snackbar v-model="showSnackBar" top>
              {{
                error
              }}
              <v-btn
                color="pink"
                flat
                icon
                @click="showSnackBar = false"
              >
              <v-icon>close</v-icon>
              </v-btn>
            </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { required, email, minLength } from 'vuelidate/lib/validators'
// import AuthService from './../services/auth-service'
import { AuthService } from '../services/auth-service'; 

export default {
  name: 'Login',
  data: () => ({
    isLogin: true,
    isLoader: false,
    error: undefined,
    showSnackBar: false,
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  validations () {
    const formValid = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
    if (this.isLogin) {
      return formValid
    }
    return {
      user: {
        ...formValid.user,
        name: {
          required,
          minLength: minLength(4)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin ? { toolbar: 'Entrar', button: 'Criar conta' } : { toolbar: 'Criar conta', button: 'Já tenho uma conta' }
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) {
        return errors
      }
      !name.required && errors.push('Nome é obrigatório')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) {
        return errors
      }
      !email.required && errors.push('Email é obrigatório')
      !email.email && errors.push('Insira um email válido')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) {
        return errors
      }
      !password.required && errors.push('Password é obrigatório')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres`)
      return errors
    }
  },
  methods: {
    async submit () {
      this.isLoader = true      
      console.log(' data ', this.user);
      try {
        const authData = this.isLogin ? await AuthService.login(this.user) : await AuthService.signup(this.user)
      } catch (error) {
        this.error = e.message;
        this.showSnackBar = true;
      } finally {
        this.showSnackBar = false;
      }
    }
  }
}
</script>
