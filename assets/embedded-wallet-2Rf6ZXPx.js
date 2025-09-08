import{h as U,i as h,a8 as z,O as V,x as l,t as F,a2 as k,ax as K,a4 as y,a as f,c as S,r as O,e as B,n as c,d as R,a3 as Y,a9 as G,ay as w,A as P,C as M,az as C,aa as L,k as D,E,l as _,b as A,W as T,S as X,aA as q,R as Q}from"./index-BHTb1IXA.js";const Z=U`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var H=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};const N=600,W=360,J=64;let $=class extends h{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(z.subscribeKey("open",t=>{t||this.onHideIframe()}),z.subscribeKey("shake",t=>{t?this.iframe.style.animation="w3m-shake 500ms var(--apkt-easings-ease-out-power-2)":this.iframe.style.animation="none"}))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach(t=>t()),this.bodyObserver?.unobserve(window.document.body)}async firstUpdated(){await this.syncTheme(),this.iframe.style.display="block";const t=this?.renderRoot?.querySelector("div");this.bodyObserver=new ResizeObserver(i=>{const r=i?.[0]?.contentBoxSize?.[0]?.inlineSize;this.iframe.style.height=`${N}px`,t.style.height=`${N}px`,V.state.enableEmbedded?this.updateFrameSizeForEmbeddedMode():r&&r<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset",this.onShowIframe()):(this.iframe.style.width=`${W}px`,this.iframe.style.left=`calc(50% - ${W/2}px)`,this.iframe.style.top=`calc(50% - ${N/2}px + ${J/2}px)`,this.iframe.style.bottom="unset",this.onShowIframe())}),this.bodyObserver.observe(window.document.body)}render(){return l`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){const t=window.innerWidth<=430;this.ready=!0,this.iframe.style.animation=t?"w3m-iframe-zoom-in-mobile 200ms var(--apkt-easings-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--apkt-easings-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--apkt-easings-ease-out-power-2)"}async syncTheme(){const t=F.getAuthConnector();if(t){const i=k.getSnapshot().themeMode,n=k.getSnapshot().themeVariables;await t.provider.syncTheme({themeVariables:n,w3mThemeVariables:K(n,i)})}}async updateFrameSizeForEmbeddedMode(){const t=this?.renderRoot?.querySelector("div");await new Promise(n=>{setTimeout(n,300)});const i=this.getBoundingClientRect();t.style.width="100%",this.iframe.style.left=`${i.left}px`,this.iframe.style.top=`${i.top}px`,this.iframe.style.width=`${i.width}px`,this.iframe.style.height=`${i.height}px`,this.onShowIframe()}};$.styles=Z;H([y()],$.prototype,"ready",void 0);$=H([f("w3m-approve-transaction-view")],$);const ee=S`
  a {
    border: none;
    border-radius: ${({borderRadius:e})=>e[20]};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, box-shadow, border;
  }

  /* -- Variants --------------------------------------------------------------- */
  a[data-type='success'] {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    color: ${({tokens:e})=>e.core.textSuccess};
  }

  a[data-type='error'] {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  a[data-type='warning'] {
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
    color: ${({tokens:e})=>e.core.textWarning};
  }

  /* -- Sizes --------------------------------------------------------------- */
  a[data-size='sm'] {
    height: 24px;
  }

  a[data-size='md'] {
    height: 28px;
  }

  a[data-size='lg'] {
    height: 32px;
  }

  a[data-size='sm'] > wui-image,
  a[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  a[data-size='md'] > wui-image,
  a[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  a[data-size='lg'] > wui-image,
  a[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
    padding-right: ${({spacing:e})=>e[1]};
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[3]};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    a[data-type='success']:not(:disabled):hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({tokens:e})=>e.core.borderSuccess};
    }

    a[data-type='error']:not(:disabled):hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({tokens:e})=>e.core.borderError};
    }

    a[data-type='warning']:not(:disabled):hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({tokens:e})=>e.core.borderWarning};
    }
  }

  a[data-type='success']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({tokens:e})=>e.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  a[data-type='error']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({tokens:e})=>e.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  a[data-type='warning']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({tokens:e})=>e.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  a:disabled {
    opacity: 0.5;
  }
`;var g=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};const te={sm:"md-regular",md:"lg-regular",lg:"lg-regular"},ie={success:"sealCheck",error:"warning",warning:"exclamationCircle"};let d=class extends h{constructor(){super(...arguments),this.type="success",this.size="md",this.imageSrc=void 0,this.disabled=!1,this.href="",this.text=void 0}render(){return l`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-type=${this.type}
        data-size=${this.size}
      >
        ${this.imageTemplate()}
        <wui-text variant=${te[this.size]} color="inherit">${this.text}</wui-text>
      </a>
    `}imageTemplate(){return this.imageSrc?l`<wui-image src=${this.imageSrc} size="inherit"></wui-image>`:l`<wui-icon
      name=${ie[this.type]}
      weight="fill"
      color="inherit"
      size="inherit"
      class="image-icon"
    ></wui-icon>`}};d.styles=[O,B,ee];g([c()],d.prototype,"type",void 0);g([c()],d.prototype,"size",void 0);g([c()],d.prototype,"imageSrc",void 0);g([c({type:Boolean})],d.prototype,"disabled",void 0);g([c()],d.prototype,"href",void 0);g([c()],d.prototype,"text",void 0);d=g([f("wui-semantic-chip")],d);var oe=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let j=class extends h{render(){return l`
      <wui-flex flexDirection="column" alignItems="center" gap="5" padding="5">
        <wui-text variant="md-regular" color="primary">Follow the instructions on</wui-text>
        <wui-semantic-chip
          icon="externalLink"
          variant="fill"
          text=${R.SECURE_SITE_DASHBOARD}
          href=${R.SECURE_SITE_DASHBOARD}
          imageSrc=${R.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-semantic-chip>
        <wui-text variant="sm-regular" color="secondary">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};j=oe([f("w3m-upgrade-wallet-view")],j);const ne=S`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[4]};
  }

  .name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      cursor: pointer;
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
      border-radius: ${({borderRadius:e})=>e[6]};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button:focus-visible:enabled {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`;var v=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let m=class extends h{constructor(){super(...arguments),this.name="",this.registered=!1,this.loading=!1,this.disabled=!1}render(){return l`
      <button ?disabled=${this.disabled}>
        <wui-text class="name" color="primary" variant="md-regular">${this.name}</wui-text>
        ${this.templateRightContent()}
      </button>
    `}templateRightContent(){return this.loading?l`<wui-loading-spinner size="lg" color="primary"></wui-loading-spinner>`:this.registered?l`<wui-tag variant="info" size="sm">Registered</wui-tag>`:l`<wui-tag variant="success" size="sm">Available</wui-tag>`}};m.styles=[O,B,ne];v([c()],m.prototype,"name",void 0);v([c({type:Boolean})],m.prototype,"registered",void 0);v([c({type:Boolean})],m.prototype,"loading",void 0);v([c({type:Boolean})],m.prototype,"disabled",void 0);m=v([f("wui-account-name-suggestion-item")],m);const re=S`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .base-name {
    position: absolute;
    right: ${({spacing:e})=>e[4]};
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[1]};
  }
`;var x=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let p=class extends h{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return l`
      <wui-input-text
        value=${Y(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        icon="search"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      ></wui-input-text>
    `}};p.styles=[O,re];x([c()],p.prototype,"errorMessage",void 0);x([c({type:Boolean})],p.prototype,"disabled",void 0);x([c()],p.prototype,"value",void 0);x([c({type:Boolean})],p.prototype,"loading",void 0);x([c({attribute:!1})],p.prototype,"onKeyDown",void 0);p=x([f("wui-ens-input")],p);const se=S`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .suggestion:hover:not(:disabled) {
    cursor: pointer;
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[6]};
    padding: ${({spacing:e})=>e[4]};
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 22px;
    transform: translateY(-50%);
    right: 10px;
  }
`;var b=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let u=class extends h{constructor(){super(),this.formRef=G(),this.usubscribe=[],this.name="",this.error="",this.loading=w.state.loading,this.suggestions=w.state.suggestions,this.profileName=P.state.profileName,this.onDebouncedNameInputChange=M.debounce(t=>{t.length<4?this.error="Name must be at least 4 characters long":C.isValidReownName(t)?(this.error="",w.getSuggestions(t)):this.error="The value is not a valid username"}),this.usubscribe.push(w.subscribe(t=>{this.suggestions=t.suggestions,this.loading=t.loading}),P.subscribeKey("profileName",t=>{this.profileName=t,t&&(this.error="You already own a name")}))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach(t=>t()),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["1","3","4","3"]}
      >
        <form ${L(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){const t=this.suggestions.find(n=>n.name?.split(".")?.[0]===this.name&&n.registered);if(this.loading)return l`<wui-loading-spinner
        class="input-loading-spinner"
        color="secondary"
      ></wui-loading-spinner>`;const i=`${this.name}${D.WC_NAME_SUFFIX}`;return l`
      <wui-icon-link
        ?disabled=${!!t}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${t?"default":"accent-primary"}
        @click=${()=>this.onSubmitName(i)}
      >
      </wui-icon-link>
    `}onNameInputChange(t){const i=C.validateReownName(t.detail||"");this.name=i,this.onDebouncedNameInputChange(i)}onKeyDown(t){t.key.length===1&&!C.isValidReownName(t.key)&&t.preventDefault()}templateSuggestions(){return!this.name||this.name.length<4||this.error?null:l`<wui-flex flexDirection="column" gap="1" alignItems="center">
      ${this.suggestions.map(t=>l`<wui-account-name-suggestion-item
            name=${t.name}
            ?registered=${t.registered}
            ?loading=${this.loading}
            ?disabled=${t.registered||this.loading}
            data-testid="account-name-suggestion"
            @click=${()=>this.onSubmitName(t.name)}
          ></wui-account-name-suggestion-item>`)}
    </wui-flex>`}isAllowedToSubmit(t){const i=t.split(".")?.[0],n=this.suggestions.find(r=>r.name?.split(".")?.[0]===i&&r.registered);return!this.loading&&!this.error&&!this.profileName&&i&&w.validateName(i)&&!n}async onSubmitName(t){try{if(!this.isAllowedToSubmit(t))return;E.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:_(A.state.activeChain)===T.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t}}),await w.registerName(t),E.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:_(A.state.activeChain)===T.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t}})}catch(i){X.showError(i.message),E.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:_(A.state.activeChain)===T.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t,error:i?.message||"Unknown error"}})}}onEnterKey(t){if(t.key==="Enter"&&this.name&&this.isAllowedToSubmit(this.name)){const i=`${this.name}${D.WC_NAME_SUFFIX}`;this.onSubmitName(i)}}};u.styles=se;b([c()],u.prototype,"errorMessage",void 0);b([y()],u.prototype,"name",void 0);b([y()],u.prototype,"error",void 0);b([y()],u.prototype,"loading",void 0);b([y()],u.prototype,"suggestions",void 0);b([y()],u.prototype,"profileName",void 0);u=b([f("w3m-register-account-name-view")],u);const ae=U`
  .continue-button-container {
    width: 100%;
  }
`;var le=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let I=class extends h{render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0","0","4","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{M.openHref(q.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0","6","0","6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box size="xl" color="success" icon="checkmark"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="md-medium" color="primary">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l`<wui-flex
      .padding=${["0","4","0","4"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){Q.replace("Account")}};I.styles=ae;I=le([f("w3m-register-account-name-success-view")],I);export{$ as W3mApproveTransactionView,I as W3mRegisterAccountNameSuccess,u as W3mRegisterAccountNameView,j as W3mUpgradeWalletView};
