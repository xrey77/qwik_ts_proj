import { component$, $,  useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";
import jQuery from "jquery";
import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7292",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
  })
  
export default component$(() => {    
    const firstname = useSignal('');
    const lastname = useSignal('');
    const email = useSignal('');
    const mobile = useSignal('');
    const newpassword = useSignal('');
    const confnewpassword = useSignal('');
    const profileMsg = useSignal('');
    const profilepic = useSignal('');
    const qrcodeurl = useSignal('');
    const userid = useSignal('');
    const token = useSignal('');
    const showSave = useSignal(false);
    const chgPwd = useSignal(false);
    const chkMfa = useSignal(false);
    const selectedFile = useSignal([]);

    useVisibleTask$(() => {
        jQuery("#cpwd").hide();
        jQuery("#mfa1").hide();
        jQuery("#mfa2").hide();  
    });            

    useVisibleTask$(() => {

        if (typeof window !== 'undefined' && window.sessionStorage) {
            const uid = window.sessionStorage.getItem('USERID');
            if (uid !== null) {
              userid.value = uid;
            }
        }

        if (typeof window !== 'undefined' && window.sessionStorage) {
            const tokenid = window.sessionStorage.getItem('TOKEN');
            if (tokenid !== null) {
                token.value = tokenid;             
            }
        }

        chgPwd.value = false;
        chkMfa.value = false;
        profileMsg.value = "Please wait.....";
        api.get(`/api/getbyid/${userid.value}`, { headers: {
            Authorization: `Bearer ${token.value}`
        }} )
            .then((res: any) => {
                profileMsg.value = res.data.user.message;
                   firstname.value = res.data.user.firstname;                
                    lastname.value = res.data.user.lastname;
                    email.value = res.data.user.email;
                    mobile.value = res.data.user.mobile;
                    profilepic.value = res.data.user.profilepic;
                    if (res.data.user.qrcodeurl !== null) {
                        qrcodeurl.value = res.data.user.qrcodeurl;
                    }
              }, (error: any) => {
                  profileMsg.value = error.response.data.message;
            });    
            setTimeout(() => {
                profileMsg.value = '';
            }, 3000);  
            profileMsg.value = '';
    });
    

    const submitProfile = $(async(event: Event) => {
        event.preventDefault();
        const data =JSON.stringify({ lastname: lastname.value, 
            firstname: firstname.value, mobile: mobile.value });
    
        api.patch(`/api/updateprofile/${userid.value}`, data, { headers: {
        Authorization: `Bearer ${token.value}`
        }})
        .then((res: any) => {
                profileMsg.value = res.data.message;
          }, (error: any) => {
                profileMsg.value = error.response.data.message;
        });
        setTimeout(() => {
          profileMsg.value = '';
        }, 3000);        
    });

    const checkboxPassword = $(async(event: Event) => {
        event.preventDefault();        
        if (chgPwd.value) {
            chgPwd.value = false;
            jQuery("#cpwd").show();
            showSave.value = false;
        } else {
            jQuery('#chkMfa').prop('checked', false);
            chkMfa.value = false;
            chgPwd.value = true;
            newpassword.value = '';
            confnewpassword.value = '';
            showSave.value = true;
            jQuery("#cpwd").hide();
        }        
    });

    const checkboxMFA = $(async(event: Event) => {
        event.preventDefault();
        if (chkMfa.value) {
            jQuery('#chkPwd').prop('checked', true);
            jQuery("#cpwd").hide();
            chkMfa.value = false;
            chgPwd.value = false;
            showSave.value = false;
            // jQuery('#chkMfa').prop('checked', true);

          } else {
            // jQuery('#chkPwd').prop('checked', true);
            chgPwd.value = false;
            chkMfa.value = true;
            showSave.value = true;
          }        
    });

    const enableMFA = $(async(event: Event) => {
        event.preventDefault();
        const data =JSON.stringify({ Twofactorenabled: true });
        api.patch(`/api/enablemfa/${userid.value}`, data, { headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
        }} )
        .then((res: any) => {
            qrcodeurl.value = res.data.qrcodeurl;
            profileMsg.value = res.data.message;
          }, (error: any) => {
                profileMsg.value = error.response.data.message;
        });
        setTimeout(() => {
          profileMsg.value = '';
        }, 3000);        
    });

    const disableMFA = $(async(event: Event) => {
        event.preventDefault();
        const data =JSON.stringify({ Twofactorenabled: false });
        api.patch(`/api/enablemfa/${userid.value}`, data, { headers: {
            Authorization: `Bearer ${token.value}`
        }} )
        .then((res: any) => {
                qrcodeurl.value = '';
                profileMsg.value = res.data.message;
          }, (error: any) => {
                profileMsg.value = error.response.data.message;
        });
        setTimeout(() => {
          profileMsg.value = '';
        }, 3000);        
    });

    const changePicture = $(async(event: any) => {
        event.preventDefault();
        let file: any = event.target.files[0];
        if (file) {
            selectedFile.value = file;
            jQuery("#userpic").attr('src',URL.createObjectURL(file));
        }
    
        if (selectedFile.value) {
            let formdata = new FormData();
            formdata.append('Id', userid.value);
            formdata.append('Profilepic', file);
    
            api.post("/api/uploadpicture", formdata, { headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token.value}`
            }} )
            .then((res: any) => {
                profileMsg.value = res.data.message;
                profilepic.value = res.data.profilepic;
                sessionStorage.setItem('USERPIC',res.data.profilepic);
                setTimeout(() => {
                  profileMsg.value = '';
                  location.reload();
    
                }, 3000);    
            }, (error: any) => {
                  profileMsg.value = error.response.data.message;
            });
            setTimeout(() => {
                profileMsg.value = '';
            }, 3000);        
        }
    });

    const changePassword = $(async(event: Event) => {
        event.preventDefault();
        if (newpassword.value === '') {
            profileMsg.value = "Please enter New Password.";
            setTimeout(() => {
              profileMsg.value = '';
            }, 3000);
            return;
        }
        if (confnewpassword.value === '') {
            profileMsg.value = "Please confirm New Password.";
            setTimeout(() => {
              profileMsg.value = '';
            }, 3000);
            return;
        }
        if (newpassword.value != confnewpassword.value) {
            profileMsg.value = "New Password does not matched.";
            setTimeout(() => {
              profileMsg.value = '';
            }, 3000);
            return;
        }
        profileMsg.value = 'Please wait...';
        const data =JSON.stringify({ password: newpassword.value });
        api.patch(`/api/updatepassword/${userid.value}`, data, { headers: {
        Authorization: `Bearer ${token.value}`
        }} )
        .then((res: any) => {
              profileMsg.value = res.data.message;
          }, (error: any) => {
                profileMsg.value = error.response.data.message;
        });
        setTimeout(() => {
            profileMsg.value = '';
            newpassword.value = '';
            confnewpassword.value = '';
        }, 3000);                
    });

  return (
    <>
    <div class="container">
    <div class="card card-width bs-info-border-subtle">
      <div class="card-header bg-info text-light">
        <strong>USER'S PROFILE NO.&nbsp; {userid.value}</strong>
      </div>
      <div class="card-body bg-warning">

        <Form enctype="multipart/form-data" autocomplete='off'>
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <input type="text" required onInput$={(e) => (firstname.value = (e.target as HTMLInputElement).value)} value={firstname.value} 
                        class="form-control bg-input" placeholder="First Name"  autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" required onInput$={(e) => (lastname.value = (e.target as HTMLInputElement).value)} value={lastname.value} 
                        class="form-control bg-input" placeholder="Last Name" autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="email" onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)} value={email.value} 
                        class="form-control bg-input" placeholder="Email Address" readOnly/>
                    </div>
                    <div class="mb-3">
                        <input type="text" required onInput$={(e) => (mobile.value = (e.target as HTMLInputElement).value)} value={mobile.value} 
                        class="form-control bg-input" placeholder="Mobile No." autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                      { !showSave.value ? 
                        <button type="button" onClick$={submitProfile} class="btn btn-info text-white">save</button>
                      : 
                        null
                      }
                    </div>

                </div>
                <div class="col">
                    {profilepic.value !== '' ? 
                        <img id="userpic" class="usr" src={profilepic.value} alt=""/>
                     : 
                        <img id="userpic" class="usr" src='/images/pix.png' alt=""/>
                    }
                    <div class="mb-3">
                        <input type="file" multiple accept="image/*" onChange$={changePicture} class="form-control form-control-sm mt-3"/>
                    </div>

                </div>
                <div class="mb-3">
              </div>

            </div>

            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input id="chkPwd" onChange$={checkboxPassword} type="checkbox" class="form-check-input bg-input" />
                        <label class="form-check-label" for="chgPwd">
                            Change Password
                        </label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input bg-input" type="checkbox" id="chkMfa" onChange$={checkboxMFA} />
                        <label class="form-check-label" for="chkMfa">
                            Multi-Factor Authenticator
                        </label>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col">

                  {chgPwd.value ?
                    <>
                    <div class="mb-3">
                        <input type="password" onInput$={(e) => (newpassword.value = (e.target as HTMLInputElement).value)} value={newpassword.value} class="form-control pwd mt-2" placeholder="enter new Password" autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="password" onInput$={(e) => (confnewpassword.value = (e.target as HTMLInputElement).value)} value={confnewpassword.value} class="form-control pwd" placeholder="confirm new Password" autocomplete="off"/>
                    </div>
                    <button onClick$={changePassword} type="button" class="btn btn-primary">change password</button>
                    </>
                   : 
                        null
                  }

                {chkMfa.value ? 
                      <>
                        {qrcodeurl.value === '' ?                  
                            <img class="qrcode2" src="/images/qrcode.png" alt="QRCODE" />
                        : 
                            <img class="qrcode1" src={qrcodeurl.value} alt="qrcodeurl"/>
                        }
                        </>                        
                : 
                    null
                }
                </div>

                <div class="col">
                    {chkMfa.value ? 
                        <>
                            <p id="qrcode-cap1" class='text-danger'><strong>Requirements</strong></p>
                            <p id="qrcode-cap2">You need to install <strong>Google or Microsoft Authenticator</strong> in your Mobile Phone, once installed, click Enable Button below, and <strong>SCAN QR CODE</strong>, next time you login, another dialog window will appear, then enter the <strong>OTP CODE</strong> from your Mobile Phone in order for you to login.</p>
                            <div class="row">
                                <div class="col btn-1">
                                    <button onClick$={enableMFA} type="button" class="btn btn-primary mx-1 qrcode-cap3">Enable</button>
                                    <button onClick$={disableMFA} type="button" class="btn btn-secondary qrcode-cap3">Disable</button>
                                </div>
                                <div class="col col-3 btn-2">
                                </div>
                            </div>
                        </>                            
                     : 
                        null
                    }
                </div>
            </div>
        </Form>
      </div>
      {profileMsg.value !== '' ? 
       <div class="card-footer">
         <div class="w-100 text-left text-danger">{profileMsg.value}</div>
       </div>
       : 
        null
      }

    </div>    
    </div>
    </>
  );
});

export const profile: DocumentHead = {
  title: "Pepsi Cola Botlers Inc.",
  meta: [
    {
      name: "description",
      content: "Pepsi Cola Home Page",
    },
  ],
};
function connectedCallback() {
    throw new Error("Function not implemented.");
}

function handleLoad() {
    throw new Error("Function not implemented.");
}

