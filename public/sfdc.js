/*
    Copyright  Salesforce.com 2015
    Copyright 2010 Meebo Inc.
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
var SFIDWidget_loginHandler,SFIDWidget_logoutHandler,SFIDWidget=function(){function e(e){return SFIDWidget.config.expid&&(-1===e.indexOf("?")?e+="?expid="+encodeURIComponent(SFIDWidget.config.expid):e+="&expid="+encodeURIComponent(SFIDWidget.config.expid)),e}function t(t){null!=t&&(t.innerHTML="");var i=document.createElement("div");if("modal"===SFIDWidget.config.mode?i.id="sfid-content":"inline"===SFIDWidget.config.mode&&(i.id="sfid-inline-content"),SFIDWidget.config.useCommunityBackgroundColor&&(i.style.backgroundColor=SFIDWidget.authconfig.LoginPage.BackgroundColor),"modal"===SFIDWidget.config.mode&&null!=SFIDWidget.authconfig.LoginPage.LogoUrl){var o=document.createElement("div");o.id="sfid-logo_wrapper",o.className="sfid-standard_logo_wrapper sfid-mt12";var d=document.createElement("img");d.src=SFIDWidget.authconfig.LoginPage.LogoUrl,d.className="sfid-standard_logo",d.alt="Salesforce",o.appendChild(d);var a=document.createElement("h2");a.id="dialogTitle";var r=document.createTextNode("Salesforce Login");a.appendChild(r),i.setAttribute("role","dialog"),i.setAttribute("aria-labelledby",a.id),i.tabIndex="-1",i.addEventListener("keydown",function(e){27===e.keyCode&&SFIDWidget.cancel()},!0),i.appendChild(o)}var l=document.createElement("div");if(l.className="sfid-mb1",l.id="sfid-error",l.innerHTML="We can\'t log you in. Make sure your username and password are correct.",l.style.display="none",l.setAttribute("role","alert"),i.appendChild(l),SFIDWidget.authconfig.LoginPage.UsernamePasswordEnabled){var c=document.createElement("form");c.setAttribute("onSubmit","SFIDWidget.authenticate();return false;");var s=document.createElement("input");s.className="sfid-wide sfid-mb12",s.type="text",s.name="username",s.id="sfid-username",s.setAttribute("autofocus","autofocus");var g=document.createElement("LABEL");g.htmlFor=s.id,g.className="sfid-button-label",g.innerText="Username";var u=document.createElement("input");u.className="sfid-wide sfid-mb12",u.type="password",u.name="password",u.id="sfid-password";var m=document.createElement("LABEL");m.innerText="Password",m.htmlFor=u.id,m.className="sfid-button-label",(q=document.createElement("input")).className="sfid-button sfid-wide sfid-mb16",q.type="submit",q.id="sfid-submit",q.value="Log In",SFIDWidget.config.useCommunityPrimaryColor&&(q.style.backgroundColor=SFIDWidget.authconfig.LoginPage.PrimaryColor),c.appendChild(g),c.appendChild(s),c.appendChild(m),c.appendChild(u),c.appendChild(q),i.appendChild(c)}var f,p,S=document.createElement("div");if(S.id="sfid-selfreg-password","true"===SFIDWidget.config.forgotPasswordEnabled){var I=document.createElement("a");I.id="sfid-forgot-password",I.href=decodeURIComponent(e(SFIDWidget.authconfig.LoginPage.ForgotPasswordUrl)),I.text="Forgot your password?",S.appendChild(I)}if(SFIDWidget.authconfig.LoginPage.SelfRegistrationEnabled&&"true"===SFIDWidget.config.selfRegistrationEnabled){var D=document.createElement("a");D.id="sfid-self-registration";var W=e(SFIDWidget.authconfig.LoginPage.SelfRegistrationUrl);D.href=(f=W,p="/services/oauth2/authorize?response_type=token&client_id="+SFIDWidget.config.client_id+"&redirect_uri="+encodeURIComponent(SFIDWidget.config.redirect_uri),"true"===SFIDWidget.config.addStartUrlToSelfReg&&(-1===f.indexOf("?")?f+="?startURL="+encodeURIComponent(p):f+="&startURL="+encodeURIComponent(p)),f),D.text="Not a member?",S.appendChild(D)}S.children.length>0&&i.appendChild(S);var v=SFIDWidget.authconfig.LoginPage.UsernamePasswordEnabled,F=SFIDWidget.authconfig.AuthProviders.length,h=SFIDWidget.authconfig.SamlProviders.length;if(v&&(F>0||h>0)){var b=document.createElement("br");(y=document.createElement("p")).className="sfid-small",y.innerHTML="or log in using",i.appendChild(b),i.appendChild(y)}else if(!v&&(F>0||h>0)){var y;(y=document.createElement("p")).className="sfid-small sfid-mb16",y.innerHTML="Choose an authentication provider.",i.appendChild(y)}if(SFIDWidget.authconfig.AuthProviders.length>0){(A=document.createElement("div")).id="sfid-social";var w=document.createElement("ul");for(var C in SFIDWidget.authconfig.AuthProviders){var k=document.createElement("li"),_=SFIDWidget.authconfig.AuthProviders[C].IconUrl,R=SFIDWidget.authconfig.AuthProviders[C].SsoUrl;-1===R.indexOf("?")?R+="?startURL="+encodeURIComponent(SFIDWidget.config.authorizeURL):R+="&startURL="+encodeURIComponent(SFIDWidget.config.authorizeURL);var E=SFIDWidget.authconfig.AuthProviders[C].Name;if(k.className="sfid-button-ap",k.id="sfid-button-ap-"+E,null!=_){var U=document.createElement("img");U.className="sfid-social-buttonimg",U.src=_,U.alt="Login with "+E;var L=document.createElement("a");L.href=R,L.appendChild(U),L.title=E,k.appendChild(L)}else{(q=document.createElement("button")).setAttribute("onclick","location.href='"+R+"';");var x=document.createTextNode(E);q.appendChild(x),k.appendChild(q)}w.appendChild(k)}A.appendChild(w),i.appendChild(A)}if(SFIDWidget.authconfig.SamlProviders.length>0){var A;(A=document.createElement("div")).id="sfid-social";w=document.createElement("ul");for(var N in SFIDWidget.authconfig.SamlProviders){k=document.createElement("li");var q=document.createElement("button"),T=n(SFIDWidget.authconfig.SamlProviders[N].SsoUrl,"RelayState"),P="&RelayState="+encodeURIComponent(SFIDWidget.config.authorizeURL),O=SFIDWidget.authconfig.SamlProviders[N].Name;k.className="sfid-button-saml",k.id="sfid-button-saml-"+O,q.setAttribute("onclick","location.href='"+T+P+"';");x=document.createTextNode(O);q.appendChild(x),k.appendChild(q),w.appendChild(k)}A.appendChild(w),i.appendChild(A)}if("modal"===SFIDWidget.config.mode){var M=document.createElement("div");M.className="sfid-lightbox",M.id="sfid-login-overlay",M.setAttribute("onClick","SFIDWidget.cancel()");var H=document.createElement("div");H.id="sfid-wrapper",H.onclick=function(e){(e=e||window.event).stopPropagation?e.stopPropagation():e.cancelBubble=!0},H.appendChild(i),M.appendChild(H),document.body.appendChild(M)}else t.appendChild(i)}function n(e,t){var n=e.split("?");if(n.length>=2){for(var i=encodeURIComponent(t)+"=",o=n[1].split(/[&;]/g),d=o.length;d-- >0;)-1!==o[d].lastIndexOf(i,0)&&o.splice(d,1);return e=n[0]+(o.length>0?"?"+o.join("&"):"")}return e}function i(e){var t;"string"==typeof e.data&&(t=JSON.parse(e.data)),t&&t.cmd&&"string"==typeof t.cmd&&("sfdcCallback::extendDone"===t.cmd?function(e){var t=e.origin.split("://")[1].split("/")[0],n=JSON.parse(e.data);if(!n)return;if(t!==location.host&&!function(e){if(!e||!SFIDWidget.config.allowedDomains)return!1;for(var t=0;t<SFIDWidget.config.allowedDomains.length;t+=1){var n=SFIDWidget.config.allowedDomains[t];if(n===e)return!0;if(0===n.indexOf("*.")){var i=n.substring(2,n.length);if(d=i,-1!==(o=e).indexOf(d,o.length-d.length))return!0}}var o,d;return!1}(t))return void console.log("message from host not allowed : "+t);window.location=n.redirectUri}(e):function(e){var t=e.origin.split("://")[1].split("/")[0];if(t!==SFIDWidget.config.domain)return void console.log("doesnt match domain: "+t+" : "+SFIDWidget.config.domain);var n=JSON.parse(e.data);if(!n)return;if("sfdcxauth::ready"===n.cmd)return postWindow=iframe.contentWindow,void setTimeout(o,0);var i=openRequests[n.id];i&&(i.callback&&i.callback(n),delete openRequests[n.id])}(e))}function o(){for(var e=0;e<requestQueue.length;e++)d(openRequests[requestQueue.shift()])}function d(e){document.getElementById("sfid_xdomain").contentWindow.postMessage(JSON.stringify(e),SFIDWidget.XAuthServerUrl)}function a(e){unsupported||(e.id=requestId,openRequests[requestId++]=e,iframe&&postWindow?d(e):(requestQueue.push(e.id),function(){if(!iframe&&!postWindow){var e=win.document;iframe=e.createElement("iframe"),iframe.id="sfid_xdomain",iframe.style.display="none",win.addEventListener?win.addEventListener("message",i,!1):win.attachEvent&&win.attachEvent("onmessage",i),e.body.appendChild(iframe),iframe.src=SFIDWidget.XAuthServerUrl}}()))}function r(e){e.alive&&!SFIDWidget.openid_response?(console.log("you got logged in"),SFIDWidget.init()):!e.alive&&SFIDWidget.openid_response&&(console.log("you got logged out"),SFIDWidget.logout())}function l(e){var n=e.identityServiceResponses;for(var i in n){var o=n[i].identityServiceResponse,d=atob(o);SFIDWidget.openid_response=JSON.parse(d)}if(SFIDWidget.openid_response)window[SFIDWidget_loginHandler](SFIDWidget.openid_response);else if("modal"===SFIDWidget.config.mode||"inline"===SFIDWidget.config.mode||"popup"===SFIDWidget.config.mode){var a=new XMLHttpRequest;a.onreadystatechange=function(){var e=this.DONE||4;this.readyState===e&&(SFIDWidget.authconfig=JSON.parse(this.responseText),function(){var e="";e="popup"===SFIDWidget.config.mode?encodeURIComponent(SFIDWidget_loginHandler):SFIDWidget.config.startURL?encodeURIComponent(SFIDWidget.config.startURL):"";var n="token";SFIDWidget.config.serverCallback&&(n="code");SFIDWidget.config.authorizeURL="/services/oauth2/authorize",SFIDWidget.config.expid&&(SFIDWidget.config.authorizeURL+="/expid_"+encodeURIComponent(SFIDWidget.config.expid));SFIDWidget.config.authorizeURL+="?response_type="+n+"&client_id="+SFIDWidget.config.client_id+"&redirect_uri="+encodeURIComponent(SFIDWidget.config.redirect_uri)+"&state="+e,"inline"===SFIDWidget.config.mode?t(document.querySelector(SFIDWidget.config.target)):function(e){e.innerHTML="";var t=document.createElement("button");t.id="sfid-login-button",t.className="sfid-button",t.innerHTML="Log in",t.setAttribute("onClick","SFIDWidget.login()"),SFIDWidget.config.useCommunityPrimaryColor&&(t.style.backgroundColor=SFIDWidget.authconfig.LoginPage.PrimaryColor),e.appendChild(t)}(document.querySelector(SFIDWidget.config.target))}())};var r=SFIDWidget.config.communityURL+"/.well-known/auth-configuration";SFIDWidget.config.expid&&(r+="?expid="+encodeURIComponent(SFIDWidget.config.expid)),a.open("GET",r,!0),a.send(null)}setInterval("SFIDWidget.isAlive()",3e3)}function c(){document.getElementById("sfid-error").style.display="inline"}this.config=null,this.access_token=null,this.openid=null,this.openid_response=null,this.win=window,this.unsupported=!(this.win.postMessage&&function(e){try{var t=window[e],n="__storage_test__";return t.setItem(n,n),t.removeItem(n),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==t.length}}("localStorage")&&this.win.JSON),this.XAuthServerUrl=null,this.iframe=null,this.postWindow=null,this.openRequests={},this.requestId=0,this.requestQueue=[];function s(){SFIDWidget.getToken({callback:l})}return{init:function(){SFIDWidget.config={},SFIDWidget.config.startURL=location;var e=document.querySelector('meta[name="salesforce-expid"]');null!==e&&(SFIDWidget.config.expid=e.content);var t=document.querySelector('meta[name="salesforce-use-min-js"]');null!==t&&(SFIDWidget.config.nonMinifiedJS="false"===t.content);var n=document.querySelector('meta[name="salesforce-cache-max-age"]');null!==n&&(SFIDWidget.config.salesforceCacheMaxAge=n.content),SFIDWidget.config.logoutOnBrowserClose=!0;var i=document.querySelector('meta[name="salesforce-logout-on-browser-close"]');null!==i&&(SFIDWidget.config.logoutOnBrowserClose="true"===i.content);var o=document.querySelector('meta[name="salesforce-use-login-page-background-color"]');null!==o&&(SFIDWidget.config.useCommunityBackgroundColor="true"===o.content);var d=document.querySelector('meta[name="salesforce-use-login-page-login-button"]');null!==d&&(SFIDWidget.config.useCommunityPrimaryColor="true"===d.content);var a=document.querySelector('meta[name="salesforce-community"]');if(null!==a){SFIDWidget.config.communityURL=a.content,SFIDWidget.config.domain=SFIDWidget.config.communityURL.split("://")[1].split("/")[0],SFIDWidget.XAuthServerUrl=SFIDWidget.config.communityURL+"/servlet/servlet.loginwidgetcontroller?type=javascript_xauth",SFIDWidget.config.expid&&(SFIDWidget.XAuthServerUrl+="&expid="+encodeURIComponent(SFIDWidget.config.expid)),SFIDWidget.config.nonMinifiedJS&&(SFIDWidget.XAuthServerUrl+="&min=false"),SFIDWidget.config.salesforceCacheMaxAge&&(SFIDWidget.XAuthServerUrl+="&cacheMaxAge="+encodeURIComponent(SFIDWidget.config.salesforceCacheMaxAge));var r=document.querySelector('meta[name="salesforce-server-callback"]');null===r||"false"===r.content?SFIDWidget.config.serverCallback=!1:"true"===r.content&&(SFIDWidget.config.serverCallback=!0);var l=document.querySelector('meta[name="salesforce-allowed-domains"]');null!==l&&(SFIDWidget.config.allowedDomains=l.content.split(","));var c=document.querySelector('meta[name="salesforce-mode"]');if(null!==c){if(SFIDWidget.config.mode=c.content,"popup-callback"===SFIDWidget.config.mode||"modal-callback"===SFIDWidget.config.mode||"inline-callback"===SFIDWidget.config.mode){if(null===l)return void window.sfdcAlert("Enter the trusted domains, for example, localhost, @.somedomain.com.");var g=document.querySelector('meta[name="salesforce-save-access-token"]');return null===g||"false"===g.content?SFIDWidget.config.saveToken=!1:"true"===g.content&&(SFIDWidget.config.saveToken=!0),void SFIDWidget.handleLoginCallback()}var u=document.querySelector('meta[name="salesforce-mask-redirects"]');SFIDWidget.config.maskRedirects=u?u.content:"true";var m=document.querySelector('meta[name="salesforce-client-id"]');if(null!==m){SFIDWidget.config.client_id=m.content;var f=document.querySelector('meta[name="salesforce-redirect-uri"]');if(null!==f){SFIDWidget.config.redirect_uri=f.content;var p=document.querySelector('meta[name="salesforce-forgot-password-enabled"]');SFIDWidget.config.forgotPasswordEnabled=!!p&&p.content;var S=document.querySelector('meta[name="salesforce-self-register-enabled"]');SFIDWidget.config.selfRegistrationEnabled=!!S&&S.content;var I=document.querySelector('meta[name="salesforce-login-handler"]');if(null!==I){SFIDWidget_loginHandler=I.content;var D=document.querySelector('meta[name="salesforce-target"]');if(null!==D){SFIDWidget.config.target=D.content;var W=document.querySelector('meta[name="salesforce-logout-handler"]');null!==W&&(SFIDWidget_logoutHandler=W.content);var v=document.querySelector('meta[name="salesforce-self-register-starturl-enabled"]');SFIDWidget.config.addStartUrlToSelfReg=!!v&&v.content,"popup"!==SFIDWidget.config.mode&&"modal"!==SFIDWidget.config.mode&&"inline"!==SFIDWidget.config.mode||(null===document.body?function(e){document;document&&document.addEventListener?document.addEventListener("DOMContentLoaded",e):window.attachEvent("onload",e)}(function(){s()}):s())}else window.sfdcAlert("Enter the target on the webpage, for example, a sign-in link, to perform the login.")}else window.sfdcAlert("Enter the name of the JavaScript function to call on a successful login event for the salesforce-login-handler metatag.")}else window.sfdcAlert("Enter the Callback URL for your client-side callback page, for example, https://:logindemo.herokuapp.com/_callback.php.")}else window.sfdcAlert("Enter the Consumer Key of the OAuth connected app which issues the access token.")}else window.sfdcAlert("Enter the mode for the salesforce-mode metatag, either inline, modal, or popup.")}else window.sfdcAlert("Enter the URL for your Salesforce community for the salesforce-community metatag.")},login:function(){if(null!=SFIDWidget.config){if("popup"===SFIDWidget.config.mode){var e=window.open(SFIDWidget.config.communityURL+SFIDWidget.config.authorizeURL,"Login Window","height=580,width=450");return window.focus&&e.focus(),!1}"modal"===SFIDWidget.config.mode&&t()}},authenticate:function(){document.getElementById("sfid-error").style.display="none",document.getElementById("sfid-submit").disabled=!0,document.getElementById("sfid-submit").className="sfid-disabled sfid-wide sfid-mb16";var e=document.getElementById("sfid-username").value,t=document.getElementById("sfid-password").value;if(e&&t){var n=new XMLHttpRequest;n.open("POST",SFIDWidget.config.communityURL+"/servlet/servlet.loginwidgetcontroller?type=login",!0),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){var e=this.DONE||4;if(this.readyState===e){var t=JSON.parse(n.responseText);if("invalid"===t.result)c(),document.getElementById("sfid-submit").disabled=!1,document.getElementById("sfid-submit").className="sfid-button sfid-wide sfid-mb16",document.getElementById("sfid-password").value="";else if("true"===SFIDWidget.config.maskRedirects){var i=document.createElement("iframe");i.setAttribute("src",t.result),i.className="sfid-callback",i.id="sfid-callback",document.body.appendChild(i)}else window.location.replace(t.result)}},n.send("username="+e+"&password="+t+"&startURL="+encodeURIComponent(SFIDWidget.config.authorizeURL))}else c(),document.getElementById("sfid-submit").className="sfid-button sfid-wide sfid-mb16",document.getElementById("sfid-submit").disabled=!1},cancel:function(){!function(){var e=document.getElementById("sfid-login-overlay");e.style.display="none";var t=document.getElementById("sfid-login-button");e.parentNode&&e.parentNode.removeChild(e),t&&t.focus()}()},handleLoginCallback:function(){if(SFIDWidget.config.serverCallback){var e=document.querySelector('meta[name="salesforce-server-starturl"]');SFIDWidget.config.startURL=null===e?"/":e.content;var t=document.querySelector('meta[name="salesforce-server-response"]');if(null===t)return void window.sfdcAlert("The server didn\'t provide a response to the callback.");SFIDWidgetHandleOpenIDCallback(JSON.parse(atob(t.content)))}else if(window.location.hash){var n=window.location.hash.substr(1).split("&");for(var i in n){var o=n[i].split("=");"id"===o[0]?SFIDWidget.openid=decodeURIComponent(o[1]):"access_token"===o[0]?SFIDWidget.access_token=o[1]:"state"===o[0]&&null!==o[1]&&("popup-callback"===SFIDWidget.config.mode?null!=o[1]&&(SFIDWidget_loginHandler=decodeURIComponent(o[1])):SFIDWidget.config.startURL=decodeURIComponent(o[1]))}for(var d=SFIDWidget.openid.split("/"),a=SFIDWidget.config.communityURL,r=3;r<d.length;r+=1)a+="/"+d[r];SFIDWidget.openid=a;var l=document.createElement("script");l.setAttribute("src",SFIDWidget.openid+"?version=latest&format=jsonp&callback=SFIDWidgetHandleOpenIDCallback&access_token="+SFIDWidget.access_token),document.head.appendChild(l)}},redirectToStartURL:function(){if("popup-callback"===SFIDWidget.config.mode)window.close();else if("modal-callback"===SFIDWidget.config.mode||"inline-callback"===SFIDWidget.config.mode){var e={cmd:"sfdcCallback::extendDone",redirectUri:SFIDWidget.config.startURL};window.parent.postMessage(JSON.stringify(e),location.protocol+"//"+location.host+"/")}},logout:function(){if(SFIDWidget.openid_response&&SFIDWidget.openid_response.access_token){var e=SFIDWidget.config.communityURL+"/services/oauth2/revoke?callback=SFIDWidgetHandleRevokeCallback&token="+SFIDWidget.openid_response.access_token,t=document.createElement("script");t.setAttribute("src",e),document.head.appendChild(t)}SFIDWidget.expireToken({callback:SFIDWidgetHandleExpireCallback});var n=document.createElement("iframe");n.setAttribute("src",SFIDWidget.config.communityURL+"/secur/logout.jsp"),n.className="sfid-logout",n.onload=function(){this.parentNode.removeChild(this),console.log("idp session was invalidated")},document.body.appendChild(n)},setToken:function(e){e&&a({cmd:"sfdcxauth::extend",uid:e.uid||null,oid:e.oid||null,identity:e.identity||null,identityServiceResponse:e.identityServiceResponse||"",expire:e.expire||0,allowedDomains:e.allowedDomains||[],widgetSession:e.widgetSession,callback:e.callback||null,communityURL:SFIDWidget.config.communityURL,active:e.active,community:e.community,mydomain:e.mydomain,activeonly:e.activeonly,retainhint:e.retainhint})},getToken:function(e){e||(e={}),a({cmd:"sfdcxauth::retrieve",retrieve:e.retrieve||null,callback:e.callback||null})},expireToken:function(e){e||(e={});var t=null;SFIDWidget.openid_response&&SFIDWidget.openid_response.organization_id&&SFIDWidget.openid_response.user_id&&(t=SFIDWidget.openid_response.organization_id.substring(0,15)+SFIDWidget.openid_response.user_id.substring(0,15)),a({cmd:"sfdcxauth::expire",callback:e.callback||null,storageKey:t})},isAlive:function(e){e||(e={}),a({cmd:"sfdcxauth::alive",retrieve:e.retrieve||null,callback:e.callback||r})},disabled:unsupported}}();function SFIDWidgetHandleOpenIDCallback(e){e.user_id=e.user_id.substring(0,15),e.organization_id=e.organization_id.substring(0,15),SFIDWidget.openid_response=e,console.log(SFIDWidget.openid_response),SFIDWidget.config.saveToken&&!SFIDWidget.config.serverCallback&&(SFIDWidget.openid_response.access_token=SFIDWidget.access_token);var t=btoa(JSON.stringify(e)),n={};n.uid=e.user_id,n.username=e.username,n.thumbnail=e.photos?e.photos.thumbnail:"",n.oid=e.organization_id,n.instance=SFIDWidget.config.communityURL,n.ll=e.is_lightning_login_user,SFIDWidget.setToken({uid:e.user_id,oid:e.organization_id,callback:SFIDWidget.redirectToStartURL,identity:n,expire:(new Date).getTime()+1e5,active:!1,mydomain:!!e.urls.custom_domain,community:!0,activeonly:!0,retainhint:!1,widgetSession:SFIDWidget.config.logoutOnBrowserClose,allowedDomains:SFIDWidget.config.allowedDomains,identityServiceResponse:t})}function SFIDWidgetHandleRevokeCallback(e){null!=e.error?console.log("access token was already invalid"):console.log("access token was revoked")}function SFIDWidgetHandleExpireCallback(e){console.log("xauth token was expired: "+e),SFIDWidget.access_token=null,SFIDWidget.openid=null,SFIDWidget.openid_response=null,SFIDWidget.config=null,SFIDWidget.authconfig=null,window[SFIDWidget_logoutHandler]()}SFIDWidget.init();