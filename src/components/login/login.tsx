import { component$, $, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import jQuery from 'jquery';
import axios from "axios";
import { Mfa } from '../mfa/mfa';

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

type Props = {
  initialCount: number;
};

export const Login = component$((s: Props) => {
  const message = useSignal('');
  const username = useSignal('');
  const password = useSignal('');
  const isdisable = useSignal(false);

  const submitLogin = $(async(event: Event) => {
    event.preventDefault();
    message.value = 'please wait...';  
    isdisable.value = true;
    const jsondata = JSON.stringify({ username: username.value, password: password.value });
    api.post("/signin", jsondata)
    .then((res: any) => {
            message.value = res.data.message;
            if (res.data.qrcodeurl !== null) {
               sessionStorage.setItem('USERID',res.data.id);
               sessionStorage.setItem('TOKEN',res.data.token);
               sessionStorage.setItem('ROLE',res.data.roles);
               sessionStorage.setItem('USERPIC',res.data.profilepic);
               isdisable.value = false;
               jQuery("#reset").trigger("click");
              jQuery("#mfaModal").trigger("click");
            } else {
                sessionStorage.setItem('USERID',res.data.id);
                window.sessionStorage.setItem('USERNAME',res.data.username);
                sessionStorage.setItem('TOKEN',res.data.token);                        
                sessionStorage.setItem('ROLE',res.data.roles);
                window.sessionStorage.setItem('USERPIC',res.data.profilepic);                    
                jQuery("#close").trigger("click");
            }
      }, (error: any) => {
            message.value = error.response.data.message;
            setTimeout(() => {
              message.value = '';
                isdisable.value = false;
            }, 3000);
            return;
    });      
  });
  
  const closeLogin = $(async(event: Event) => {
    event.preventDefault();
    username.value = '';
    password.value = '';
    message.value = '';
    location.reload();
  });

  return (
    <>
<div class="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticLoginLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-purple">
        <h1 class="modal-title fs-5 text-white" id="staticLoginLabel">User's Login</h1>
        <button id="close" onClick$={closeLogin} type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <Form onSubmit$={submitLogin} autocomplete='off'>
          <div class="mb-3">
            <input type="text" onInput$={(e) => (username.value = (e.target as HTMLInputElement).value)}
            value={username.value} required class="form-control" id="usrname" name="usrname" disabled={isdisable.value} placeholder="enter Username"/>
          </div>
          <div class="mb-3">
            <input type="password" onInput$={(e) => (password.value = (e.target as HTMLInputElement).value)}
            value={password.value} required class="form-control" id="passwd" name="paswd" disabled={isdisable.value} placeholder="enter Password"/>
          </div>
          <button type="submit" class="btn btn-purple text-white mx-1" disabled={isdisable.value}>login</button> 
          <button id="reset" type="reset" class="btn btn-purple text-white">reset</button> 
          <button id="mfaModal" type="button" class="btn btn-primay d-none" data-bs-toggle="modal" data-bs-target="#staticMfa">mfa</button>
        </Form>
      </div>
      <div class="modal-footer">
        <div class="w-100 text-center text-danger">{message.value}</div>
      </div>
    </div>
  </div>
</div>    
<Mfa/>
</>
  );
});