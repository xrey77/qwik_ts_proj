import { component$, $, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

export const Register = component$(() => {
    const fname = useSignal('');
    const lname = useSignal('');
    const email = useSignal('');
    const mobile = useSignal('');
    const username = useSignal('');
    const password = useSignal('');
    const message = useSignal('');

    const submitRegistration = $(async(event: Event) => {
        event.preventDefault();  
        message.value = "please wait...";
        const jsondata =JSON.stringify({ lastname: lname.value, firstname: fname.value,
            email: email.value, mobile: mobile.value, username: username.value, 
            password: password.value });
        api.post("/signup", jsondata)
        .then((res: any) => {            
              message.value = res.data.message;
              setTimeout(() => {
                message.value = '';
              }, 3000);
              return;
          }, (error: any) => {
                message.value = error.response.data.message;
                setTimeout(() => {
                message.value = '';
              }, 3000);
        });    
    });

    const closeRegistration = $(async(event: Event) => {
      event.preventDefault();
      fname.value = '';
      lname.value = '';
      email.value = '';
      mobile.value = '';
      username.value = '';
      password.value = '';
      message.value = '';      
    });

  return (
<div class="modal fade" id="staticRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticRegisterLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h1 class="modal-title fs-5 text-white" id="staticRegisternLabel">Account Registration</h1>
        <button onClick$={closeRegistration} type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <Form onSubmit$={submitRegistration} autocomplete='off'>
            <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <input type="text" required onInput$={(e: any) => (fname.value = (e.target as HTMLInputElement).value)} value={fname.value}                     
                    class="form-control" id="fname" name="fnane" placeholder="enter First Name"/>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3"> 
                    <input type="text" required onInput$={(e: any) => (lname.value = (e.target as HTMLInputElement).value)} value={lname.value}
                    class="form-control" id="lname" name="lname" placeholder="enter Last Name"/>
                  </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <input type="email" required onInput$={(e: any) => (email.value = (e.target as HTMLInputElement).value)} value={email.value} 
                    class="form-control" id="email" name="email" placeholder="enter Email Address"/>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input type="text" required onInput$={(e: any) => (mobile.value = (e.target as HTMLInputElement).value)} value={mobile.value}                     
                    class="form-control" id="mobile" name="mobile" placeholder="enter Mobile No."/>
                  </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <input type="text" required onInput$={(e: any) => (username.value = (e.target as HTMLInputElement).value)} value={username.value}                     
                    class="form-control" id="usrname" name="userName" placeholder="enter Username"/>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input type="text" required onInput$={(e: any) => (password.value = (e.target as HTMLInputElement).value)}value={password.value}                     
                    class="form-control" id="passwd" name="passWord" placeholder="enter Password"/>
                  </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary text-white mx-1">register</button> 
            <button id="reset" type="reset" class="btn btn-primary text-white">reset</button> 
        </Form>
      </div>
      <div class="modal-footer">
        <div class="w-100 text-center text-danger">{message.value}</div>
      </div>
    </div>
  </div>
</div>    
  );
});