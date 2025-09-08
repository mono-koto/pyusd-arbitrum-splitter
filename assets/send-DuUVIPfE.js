import{c as f,n as d,a4 as c,a as m,i as w,a9 as O,C as N,b as g,j as H,aH as l,aa as D,x as u,r as W,e as V,aI as M,aJ as q,R as v,N as L,a1 as $,a3 as Y,a0 as J,S as _,k as K,E as G,l as Q,W as X}from"./index-D5PaBMwu.js";import"./index-BHHxcLCy.js";import{S as F}from"./SwapController-CqconvSL.js";const Z=f`
  :host {
    width: 100%;
    height: 100px;
    border-radius: ${({borderRadius:e})=>e[5]};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: ${({tokens:e})=>e.theme.textPrimary};
    margin: 0 ${({spacing:e})=>e[2]};
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: ${({fontFamily:e})=>e.regular};
    font-style: normal;
    font-weight: var(--apkt-font-weight-light);
    line-height: 130%;
    letter-spacing: ${({typography:e})=>e["md-medium"].letterSpacing};
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;var I=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let y=class extends w{constructor(){super(...arguments),this.inputElementRef=O(),this.instructionElementRef=O(),this.instructionHidden=!!this.value,this.pasting=!1,this.onDebouncedSearch=N.debounce(async t=>{if(!t.length){this.setReceiverAddress("");return}const n=g.state.activeChain;if(N.isAddress(t,n)){this.setReceiverAddress(t);return}try{const o=await H.getEnsAddress(t);if(o){l.setReceiverProfileName(t),l.setReceiverAddress(o);const i=await H.getEnsAvatar(t);l.setReceiverProfileImageUrl(i||void 0)}}catch{this.setReceiverAddress(t)}finally{l.setLoading(!1)}})}firstUpdated(){this.value&&(this.instructionHidden=!0),this.checkHidden()}render(){return u` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="01"
      .padding=${["8","4","5","4"]}
    >
      <wui-text
        ${D(this.instructionElementRef)}
        class="instruction"
        color="secondary"
        variant="md-medium"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral-secondary"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${D(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value??""}
        autocomplete="off"
      >
${this.value??""}</textarea
      >
    </wui-flex>`}async focusInput(){this.instructionElementRef.value&&(this.instructionHidden=!0,await this.toggleInstructionFocus(!1),this.instructionElementRef.value.style.pointerEvents="none",this.inputElementRef.value?.focus(),this.inputElementRef.value&&(this.inputElementRef.value.selectionStart=this.inputElementRef.value.selectionEnd=this.inputElementRef.value.value.length))}async focusInstruction(){this.instructionElementRef.value&&(this.instructionHidden=!1,await this.toggleInstructionFocus(!0),this.instructionElementRef.value.style.pointerEvents="auto",this.inputElementRef.value?.blur())}async toggleInstructionFocus(t){this.instructionElementRef.value&&await this.instructionElementRef.value.animate([{opacity:t?0:1},{opacity:t?1:0}],{duration:100,easing:"ease",fill:"forwards"}).finished}onBoxClick(){!this.value&&!this.instructionHidden&&this.focusInput()}onBlur(){!this.value&&this.instructionHidden&&!this.pasting&&this.focusInstruction()}checkHidden(){this.instructionHidden&&this.focusInput()}async onPasteClick(){this.pasting=!0;const t=await navigator.clipboard.readText();l.setReceiverAddress(t),this.focusInput()}onInputChange(t){const n=t.target;this.pasting=!1,this.value=t.target?.value,n.value&&!this.instructionHidden&&this.focusInput(),l.setLoading(!0),this.onDebouncedSearch(n.value)}setReceiverAddress(t){l.setReceiverAddress(t),l.setReceiverProfileName(void 0),l.setReceiverProfileImageUrl(void 0),l.setLoading(!1)}};y.styles=Z;I([d()],y.prototype,"value",void 0);I([c()],y.prototype,"instructionHidden",void 0);I([c()],y.prototype,"pasting",void 0);y=I([m("w3m-input-address")],y);const ee=f`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    color: ${({tokens:e})=>e.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: 32px;
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    line-height: 130%;
    letter-spacing: -1.28px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }
`;var E=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let A=class extends w{constructor(){super(...arguments),this.inputElementRef=O(),this.disabled=!1,this.value="",this.placeholder="0"}render(){return this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),u`<input
      ${D(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `}dispatchInputChangeEvent(t){const n=t.data;if(n&&this.inputElementRef?.value)if(n===","){const r=this.inputElementRef.value.value.replace(",",".");this.inputElementRef.value.value=r,this.value=`${this.value}${r}`}else M.test(n)||(this.inputElementRef.value.value=this.value.replace(new RegExp(n.replace(q,"\\$&"),"gu"),""));this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};A.styles=[W,V,ee];E([d({type:Boolean})],A.prototype,"disabled",void 0);E([d({type:String})],A.prototype,"value",void 0);E([d({type:String})],A.prototype,"placeholder",void 0);A=E([m("wui-input-amount")],A);const te=f`
  :host {
    width: 100%;
    height: 100px;
    border-radius: ${({borderRadius:e})=>e[5]};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
    transition: all ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.lg};
  }

  :host(:hover) {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  .totalValue {
    width: 100%;
  }
`;var z=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let P=class extends w{render(){return u` <wui-flex
      flexDirection="column"
      gap="01"
      .padding=${["5","3","4","3"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token&&!0}
          .value=${this.sendTokenAmount?String(this.sendTokenAmount):""}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="01" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`}buttonTemplate(){return this.token?u`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`:u`<wui-button
      size="md"
      variant="neutral-secondary"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`}handleSelectButtonClick(){v.push("WalletSendSelectToken")}sendValueTemplate(){if(this.token&&this.sendTokenAmount){const n=this.token.price*this.sendTokenAmount;return u`<wui-text class="totalValue" variant="sm-regular" color="secondary"
        >${n?`$${L.formatNumberToLocalString(n,2)}`:"Incorrect value"}</wui-text
      >`}return null}maxAmountTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?u` <wui-text variant="sm-regular" color="error">
          ${$.roundNumber(Number(this.token.quantity.numeric),6,5)}
        </wui-text>`:u` <wui-text variant="sm-regular" color="secondary">
        ${$.roundNumber(Number(this.token.quantity.numeric),6,5)}
      </wui-text>`:null}actionTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?u`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`:u`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`:null}onInputChange(t){l.setTokenAmount(t.detail)}onMaxClick(){if(this.token){const t=L.bigNumber(this.token.quantity.numeric);l.setTokenAmount(Number(t.toFixed(20)))}}onBuyClick(){v.push("OnRampProviders")}};P.styles=te;z([d({type:Object})],P.prototype,"token",void 0);z([d({type:Number})],P.prototype,"sendTokenAmount",void 0);P=z([m("w3m-input-token")],P);const ie=f`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e[10]} !important;
    border: 4px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: ${({borderRadius:e})=>e[4]} !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;var b=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let p=class extends w{constructor(){super(),this.unsubscribe=[],this.token=l.state.token,this.sendTokenAmount=l.state.sendTokenAmount,this.receiverAddress=l.state.receiverAddress,this.receiverProfileName=l.state.receiverProfileName,this.loading=l.state.loading,this.message="Preview Send",this.token&&(this.fetchBalances(),this.fetchNetworkPrice()),this.unsubscribe.push(l.subscribe(t=>{this.token=t.token,this.sendTokenAmount=t.sendTokenAmount,this.receiverAddress=t.receiverAddress,this.receiverProfileName=t.receiverProfileName,this.loading=t.loading}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return this.getMessage(),u` <wui-flex flexDirection="column" .padding=${["0","4","4","4"]}>
      <wui-flex class="inputContainer" gap="2" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box size="md" variant="secondary" icon="arrowBottom"></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName?this.receiverProfileName:this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${["4","0","0","0"]}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith("Preview Send")}
          size="lg"
          variant="accent-primary"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`}async fetchBalances(){await l.fetchTokenBalance(),l.fetchNetworkBalance()}async fetchNetworkPrice(){await F.getNetworkTokenPrice()}onButtonClick(){v.push("WalletSendPreview")}getMessage(){this.message="Preview Send",this.receiverAddress&&!N.isAddress(this.receiverAddress,g.state.activeChain)&&(this.message="Invalid Address"),this.receiverAddress||(this.message="Add Address"),this.sendTokenAmount&&this.token&&this.sendTokenAmount>Number(this.token.quantity.numeric)&&(this.message="Insufficient Funds"),this.sendTokenAmount||(this.message="Add Amount"),this.sendTokenAmount&&this.token?.price&&(this.sendTokenAmount*this.token.price||(this.message="Incorrect Value")),this.token||(this.message="Select Token")}};p.styles=ie;b([c()],p.prototype,"token",void 0);b([c()],p.prototype,"sendTokenAmount",void 0);b([c()],p.prototype,"receiverAddress",void 0);b([c()],p.prototype,"receiverProfileName",void 0);b([c()],p.prototype,"loading",void 0);b([c()],p.prototype,"message",void 0);p=b([m("w3m-wallet-send-view")],p);const ne=f`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:e})=>e[3]};
  }
`;var S=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let k=class extends w{constructor(){super(),this.unsubscribe=[],this.tokenBalances=l.state.tokenBalances,this.search="",this.onDebouncedSearch=N.debounce(t=>{this.search=t}),this.fetchBalancesAndNetworkPrice(),this.unsubscribe.push(l.subscribe(t=>{this.tokenBalances=t.tokenBalances}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return u`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}async fetchBalancesAndNetworkPrice(){(!this.tokenBalances||this.tokenBalances?.length===0)&&(await this.fetchBalances(),await this.fetchNetworkPrice())}async fetchBalances(){await l.fetchTokenBalance(),l.fetchNetworkBalance()}async fetchNetworkPrice(){await F.getNetworkTokenPrice()}templateSearchInput(){return u`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){return this.tokens=this.tokenBalances?.filter(t=>t.chainId===g.state.activeCaipNetwork?.caipNetworkId),this.search?this.filteredTokens=this.tokenBalances?.filter(t=>t.name.toLowerCase().includes(this.search.toLowerCase())):this.filteredTokens=this.tokens,u`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","3","0","3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4","3","3","3"]}>
          <wui-text variant="md-medium" color="secondary">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${this.filteredTokens&&this.filteredTokens.length>0?this.filteredTokens.map(t=>u`<wui-list-token
                    @click=${this.handleTokenClick.bind(this,t)}
                    ?clickable=${!0}
                    tokenName=${t.name}
                    tokenImageUrl=${t.iconUrl}
                    tokenAmount=${t.quantity.numeric}
                    tokenValue=${t.value}
                    tokenCurrency=${t.symbol}
                  ></wui-list-token>`):u`<wui-flex
                .padding=${["20","0","0","0"]}
                alignItems="center"
                flexDirection="column"
                gap="4"
              >
                <wui-icon-box icon="coinPlaceholder" color="default" size="lg"></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="2"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                  <wui-text variant="lg-regular" align="center" color="secondary">
                    Your tokens will appear here
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){v.push("OnRampProviders")}onInputChange(t){this.onDebouncedSearch(t.detail)}handleTokenClick(t){l.setToken(t),l.setTokenAmount(void 0),v.goBack()}};k.styles=ne;S([c()],k.prototype,"tokenBalances",void 0);S([c()],k.prototype,"tokens",void 0);S([c()],k.prototype,"filteredTokens",void 0);S([c()],k.prototype,"search",void 0);k=S([m("w3m-wallet-send-select-token-view")],k);const re=f`
  :host {
    height: 32px;
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    border-radius: ${({borderRadius:e})=>e[32]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    padding: ${({spacing:e})=>e[1]};
    padding-left: ${({spacing:e})=>e[2]};
  }

  wui-avatar,
  wui-image {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  wui-icon {
    border-radius: ${({borderRadius:e})=>e[16]};
  }
`;var B=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let C=class extends w{constructor(){super(...arguments),this.text=""}render(){return u`<wui-text variant="lg-regular" color="primary">${this.text}</wui-text>
      ${this.imageTemplate()}`}imageTemplate(){return this.address?u`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`:this.imageSrc?u`<wui-image src=${this.imageSrc}></wui-image>`:u`<wui-icon size="lg" color="inverse" name="networkPlaceholder"></wui-icon>`}};C.styles=[W,V,re];B([d({type:String})],C.prototype,"text",void 0);B([d({type:String})],C.prototype,"address",void 0);B([d({type:String})],C.prototype,"imageSrc",void 0);C=B([m("wui-preview-item")],C);const oe=f`
  :host {
    display: flex;
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-image {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }
`;var j=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let T=class extends w{constructor(){super(...arguments),this.imageSrc=void 0,this.textTitle="",this.textValue=void 0}render(){return u`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="primary"> ${this.textTitle} </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `}templateContent(){return this.imageSrc?u`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`:this.textValue?u` <wui-text variant="md-regular" color="secondary"> ${this.textValue} </wui-text>`:u`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`}};T.styles=[W,V,oe];j([d()],T.prototype,"imageSrc",void 0);j([d()],T.prototype,"textTitle",void 0);j([d()],T.prototype,"textValue",void 0);T=j([m("wui-list-content")],T);const se=f`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: ${({spacing:e})=>e[1]};
    border-radius: ${({borderRadius:e})=>e[5]};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[2]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
  }

  wui-list-content {
    width: -webkit-fill-available !important;
  }

  wui-text {
    padding: 0 ${({spacing:e})=>e[2]};
  }

  wui-flex {
    margin-top: ${({spacing:e})=>e[2]};
  }

  .network {
    cursor: pointer;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid ${({tokens:e})=>e.core.textAccentPrimary};
    background-color: ${({tokens:e})=>e.core.glass010};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent010};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent010};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent010};
  }

  .network:hover {
    background-color: ${({tokens:e})=>e.core.glass010};
  }

  .network:active {
    background-color: ${({tokens:e})=>e.core.glass010};
  }
`;var U=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let R=class extends w{render(){return u` <wui-text variant="sm-regular" color="secondary">Details</wui-text>
      <wui-flex flexDirection="column" gap="1">
        <wui-list-content
          textTitle="Address"
          textValue=${$.getTruncateString({string:this.receiverAddress??"",charsStart:4,charsEnd:4,truncate:"middle"})}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`}networkTemplate(){return this.caipNetwork?.name?u` <wui-list-content
        @click=${()=>this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${Y(J.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`:null}onNetworkClick(t){t&&v.push("Networks",{network:t})}};R.styles=se;U([d()],R.prototype,"receiverAddress",void 0);U([d({type:Object})],R.prototype,"caipNetwork",void 0);R=U([m("w3m-wallet-send-details")],R);const ae=f`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e[20]};
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: ${({borderRadius:e})=>e[4]} !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: ${({borderRadius:e})=>e[4]} !important;
  }
`;var x=function(e,t,n,r){var o=arguments.length,i=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(i=(o<3?s(i):o>3?s(t,n,i):s(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i};let h=class extends w{constructor(){super(),this.unsubscribe=[],this.token=l.state.token,this.sendTokenAmount=l.state.sendTokenAmount,this.receiverAddress=l.state.receiverAddress,this.receiverProfileName=l.state.receiverProfileName,this.receiverProfileImageUrl=l.state.receiverProfileImageUrl,this.caipNetwork=g.state.activeCaipNetwork,this.loading=l.state.loading,this.unsubscribe.push(l.subscribe(t=>{this.token=t.token,this.sendTokenAmount=t.sendTokenAmount,this.receiverAddress=t.receiverAddress,this.receiverProfileName=t.receiverProfileName,this.receiverProfileImageUrl=t.receiverProfileImageUrl,this.loading=t.loading}),g.subscribeKey("activeCaipNetwork",t=>this.caipNetwork=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return u` <wui-flex flexDirection="column" .padding=${["0","4","4","4"]}>
      <wui-flex gap="2" flexDirection="column" .padding=${["0","2","0","2"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="01">
            <wui-text variant="sm-regular" color="secondary">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount?$.roundNumber(this.sendTokenAmount,6,5):"unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="default" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="sm-regular" color="secondary">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName?$.getTruncateString({string:this.receiverProfileName,charsStart:20,charsEnd:0,truncate:"end"}):$.getTruncateString({string:this.receiverAddress?this.receiverAddress:"",charsStart:4,charsEnd:4,truncate:"middle"})}"
            address=${this.receiverAddress??""}
            .imageSrc=${this.receiverProfileImageUrl??void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["6","0","0","0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="1" .padding=${["3","0","0","0"]}>
          <wui-icon size="sm" color="default" name="warningCircle"></wui-icon>
          <wui-text variant="sm-regular" color="secondary">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="3" .padding=${["4","0","0","0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral-secondary"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="accent-primary"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`}sendValueTemplate(){if(this.token&&this.sendTokenAmount){const n=this.token.price*this.sendTokenAmount;return u`<wui-text variant="md-regular" color="primary"
        >$${n.toFixed(2)}</wui-text
      >`}return null}async onSendClick(){if(!this.sendTokenAmount||!this.receiverAddress){_.showError("Please enter a valid amount and receiver address");return}try{await l.sendToken(),_.showSuccess("Transaction started"),v.replace("Account")}catch(t){let n="Failed to send transaction. Please try again.";g.state.activeChain===K.CHAIN.SOLANA&&t instanceof Error&&(n=t.message),_.showError(n),console.error("SendController:sendToken - failed to send transaction",t);const r=t instanceof Error?t.message:"Unknown error";G.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:r,isSmartAccount:Q(g.state.activeChain)===X.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.token?.symbol||"",amount:this.sendTokenAmount,network:g.state.activeCaipNetwork?.caipNetworkId||""}})}}onCancelClick(){v.goBack()}};h.styles=ae;x([c()],h.prototype,"token",void 0);x([c()],h.prototype,"sendTokenAmount",void 0);x([c()],h.prototype,"receiverAddress",void 0);x([c()],h.prototype,"receiverProfileName",void 0);x([c()],h.prototype,"receiverProfileImageUrl",void 0);x([c()],h.prototype,"caipNetwork",void 0);x([c()],h.prototype,"loading",void 0);h=x([m("w3m-wallet-send-preview-view")],h);export{k as W3mSendSelectTokenView,h as W3mWalletSendPreviewView,p as W3mWalletSendView};
