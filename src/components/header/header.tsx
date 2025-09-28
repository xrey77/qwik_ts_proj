import { component$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Login } from '../login/login';
import { Register } from '../register/regsiter';

export const Header = component$(() => {
  const userName = useSignal('');
  const userPic = useSignal('');

  useVisibleTask$(() => {
    // Dynamically import the bootstrap bundle
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    if (typeof window !== 'undefined' && window.sessionStorage) {
      const usrName = window.sessionStorage.getItem('USERNAME');
      if (usrName !== null) {
        userName.value = usrName;
      } else {
        userName.value
      }

      const usrPic = window.sessionStorage.getItem('USERPIC');
      if (usrPic !== null) {
        userPic.value = usrPic;
      } else {
        userPic.value = '';
      }
    }
  });

  const logout = $(async(event: Event) => {
    event.preventDefault();
    sessionStorage.removeItem('USERID');
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('USERPIC');    
    userName.value = '';
    userPic.value = '';
    location.href = '/';
    location.reload();
  });

  return (    
  <>    
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
          <Link class="navbar-brand" href="/"><img class="logo" src="/images/logo.png" alt=""/></Link>
          <button class="navbar-toggler" type="button"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasWithBothOptions">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link emboss-menu" aria-current="page" href="/about">About Us</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle emboss-menu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul class="dropdown-menu">
                  <li><Link class="dropdown-item" href="/prodlist">Products List</Link></li>
                  <li><Link class="dropdown-item" href="/prodcatalog">Product Catalog</Link></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><Link class="dropdown-item" href="/prodsearch">Product Search</Link></li>
                </ul>
              </li>
              <li class="nav-item">
                <Link class="nav-link emboss-menu" href="/contact" >Contact Us</Link>
              </li>
            </ul>
                { userName.value === '' ? 
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link emboss-menu" href="#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link emboss-menu" href="#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                    </li>
                  </ul>                      
                : 
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img class="user" src={userPic.value} alt=""/>
                      <span>&nbsp;{ userName.value }</span>
                    </a>
                  <ul class="dropdown-menu">
                      <li>
                      <a onClick$={logout} class="dropdown-item" href="/#">LogOut</a>
                      </li>
                      <li>
                      <Link class="dropdown-item" href="/profile">Profile</Link> 
                      </li>
                      <li><hr class="dropdown-divider"/></li>
                      <li>
                        <a class="dropdown-item" href="/#">Messenger</a>
                      </li>
                  </ul>
                </li>  
              }          
        </div>        
    </div>
  </nav>
{/* DRWAER MENU  */}
 <div class="offcanvas offcanvas-end" data-bs-scroll="true" id="offcanvasMenu" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header bg-danger">
      <h5 class="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Drawer Menu</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item" data-bs-dismiss="offcanvas">
          <a class="nav-link emboss-menu" aria-current="page" href="/about">About Us</a>
        </li>
        <li class="nav-item"><hr/></li>
        <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle emboss-menu" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul class="dropdown-menu">
                <li data-bs-dismiss="offcanvas"><Link class="dropdown-item" href="/prodlist">Products List</Link></li>
                <li><hr class="dropdown-divider"/></li>
                <li data-bs-dismiss="offcanvas"><Link class="dropdown-item" href="/prodcatalog">Products Catalog</Link></li>
                <li><hr class="dropdown-divider"/></li>
                <li data-bs-dismiss="offcanvas"><Link class="dropdown-item" href="/prodsearch">Product Search</Link></li>
              </ul>
          </li>

            <li class="nav-item"><hr/></li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
                <a class="nav-link emboss-menu" aria-current="page" href="/contact">Contact Us</a>
            </li>
            <li class="nav-item"><hr/></li>
            
          </ul>

          { userName.value !== '' ? 
            <ul class="navbar-nav mr-auto">              
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">                   
                    <img class="user" src={userPic.value} />
                    <span>{ userName.value}</span>
                  </a>
                  <ul class="dropdown-menu">
                    <li data-bs-dismiss="offcanvas">
                      <a onClick$={logout} class="dropdown-item" href="/#">LogOut</a>
                    </li>
                    <li class="nav-item"><hr/></li>
                    <li data-bs-dismiss="offcanvas">
                      <Link class="dropdown-item" href="/profile">Profile</Link> 
                    </li>
                    <li><hr class="dropdown-divider"/></li>
                    <li data-bs-dismiss="offcanvas">
                      <a class="dropdown-item" href="/#">Messenger</a>
                    </li>
                  </ul>
                </li>          
                <li class="nav-item"><hr/></li>                                        
              </ul>       
           : 
            <ul class="nav flex-column">
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <a class="nav-link emboss-menu" href="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
            </li>
            <li class="nav-item"><hr/></li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <a class="nav-link emboss-menu" href="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
            </li>            
          </ul>
          }             
    </div>
  </div>

 <Login initialCount={10}/>
 <Register/>
</>
);

});
