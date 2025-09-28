import { component$, $, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

export const Mfa = component$(() => {
  const message = useSignal('');
  const otp = useSignal('');
  const isdisable = useSignal(false);
  const userid = useSignal('');
  
  useVisibleTask$(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const uid = window.sessionStorage.getItem('USERID');
      if (uid !== null) {
        userid.value = uid;
      } 

    }
  });


  const submitMfa = $(async(event: Event) => {
    event.preventDefault();
    message.value = 'please wait...';  
    isdisable.value = true;
    const jsondata = JSON.stringify({ id: userid.value, otp: otp.value });
    api.post("/validateotp", jsondata)
    .then((res: any) => {
            message.value = res.data.message;
            window.sessionStorage.setItem('USERNAME',res.data.username);
            location.reload();
      }, (error: any) => {
            message.value = error.response.data.message;
            setTimeout(() => {
              message.value = '';
                isdisable.value = false;
            }, 3000);
            return;
    });      
  });
  
  const closeMfa = $(async(event: Event) => {
    event.preventDefault();
    otp.value = '';
    message.value = '';
    sessionStorage.removeItem('USERID')
    sessionStorage.removeItem('USERNAME')
    sessionStorage.removeItem('USERPIC')
    sessionStorage.removeItem('TOKEN')
    location.reload();
  });

  return (
<div class="modal fade" id="staticMfa" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticMfaLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <h1 class="modal-title fs-5 text-white" id="staticMfaLabel">Multi-Factor Authenticator</h1>
        <button id="close" onClick$={closeMfa} type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <Form onSubmit$={submitMfa} autocomplete='off'>
          <div class="mb-3">
            <input type="text" onInput$={(e) => (otp.value = (e.target as HTMLInputElement).value)}
            value={otp.value} required class="form-control" id="otp" name="otp" disabled={isdisable.value} placeholder="enter 6-digi OTP code"/>
          </div>
          <button type="submit" class="btn btn-warning text-white mx-1" disabled={isdisable.value}>submit</button> 
          <button id="reset" type="reset" class="btn btn-warning text-white">reset</button> 
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