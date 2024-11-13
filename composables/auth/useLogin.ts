// composables/auth/useLogin.ts

import {z, ZodError} from "zod";
import {computed} from "vue";

export default function useLogin() {
 const data = reactive({
  email: {
   value: '',
   error: ""
  },
  password: {
   value: '',
   error: ""
  }
 });
 
 const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
 const error = ref<string | null>(null);
 
 const validateEmail = () => {
  const schema = z.string().email("Invalid email address");
  try {
   schema.parse(data.email.value);
   data.email.error = "";
  } catch (e: unknown) {
   data.email.error = (e as ZodError).issues[0].message;
  }
 };
 
 const validatePassword = () => {
  const schema = z.string({message: "Password is required"})
         .min(6, "Password must be at least 6 characters");
  try {
   schema.parse(data.password.value);
   data.password.error = "";
  } catch (e: unknown) {
   data.password.error = (e as ZodError).issues[0].message;
  }
 };
 
 
 const login = async () => {
    status.value = 'loading';
    try {
     const result = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
       email: data.email.value,
       password: data.password.value
      }
     });
     
     if (result.status !== 200) {
      error.value = result.body.message;
      status.value = 'error';
      return;
     }
     
     error.value = null;
     status.value = 'success';
    } catch (e) {
     error.value = (e as Error).message || "An error occurred while logging in";
     status.value = 'error';
    }
 }
 
 const isFormValid = computed(() => {
  return (
   data.email.value !== "" &&
   data.password.value !== "" &&
   data.email.error === "" &&
   data.password.error === ""
  );
 });
 
 return {
  data, login, status, error, validateEmail, validatePassword, isFormValid
 }
}