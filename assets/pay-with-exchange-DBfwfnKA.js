import{c as g,i as y,b as f,x as a,R as w,S as p,A as P,j as k,a4 as c,a as b,C as A}from"./index-D5PaBMwu.js";import{E as t}from"./ExchangeController-BkjZpYvX.js";const I=g`
  .amount-input-container {
    border-radius: ${({borderRadius:i})=>i[5]};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom: 1px solid ${({tokens:i})=>i.core.glass010};
    background-color: ${({tokens:i})=>i.theme.backgroundPrimary};
  }

  .container {
    background-color: ${({tokens:i})=>i.theme.foregroundSecondary};
    border-radius: 30px;
  }
`;var u=function(i,e,n,o){var l=arguments.length,s=l<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(i,e,n,o);else for(var d=i.length-1;d>=0;d--)(m=i[d])&&(s=(l<3?m(s):l>3?m(e,n,s):m(e,n))||s);return l>3&&s&&Object.defineProperty(e,n,s),s};const v=[10,50,100];let r=class extends y{constructor(){super(),this.unsubscribe=[],this.network=f.state.activeCaipNetwork,this.exchanges=t.state.exchanges,this.isLoading=t.state.isLoading,this.amount=t.state.amount,this.tokenAmount=t.state.tokenAmount,this.priceLoading=t.state.priceLoading,this.isPaymentInProgress=t.state.isPaymentInProgress,this.currentPayment=t.state.currentPayment,this.paymentId=t.state.paymentId,this.paymentAsset=t.state.paymentAsset,this.unsubscribe.push(f.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.setDefaultPaymentAsset()}),t.subscribe(e=>{this.exchanges=e.exchanges,this.isLoading=e.isLoading,this.amount=e.amount,this.tokenAmount=e.tokenAmount,this.priceLoading=e.priceLoading,this.paymentId=e.paymentId,this.isPaymentInProgress=e.isPaymentInProgress,this.currentPayment=e.currentPayment,this.paymentAsset=e.paymentAsset,e.isPaymentInProgress&&e.currentPayment?.exchangeId&&e.currentPayment?.sessionId&&e.paymentId&&this.handlePaymentInProgress()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),t.reset()}async firstUpdated(){await this.getPaymentAssets(),this.paymentAsset||await this.setDefaultPaymentAsset(),await t.fetchExchanges()}render(){return a`
      <wui-flex flexDirection="column" gap="2" class="container">
        ${this.amountInputTemplate()} ${this.exchangesTemplate()}
      </wui-flex>
    `}exchangesLoadingTemplate(){return Array.from({length:2}).map(()=>a`<wui-shimmer width="100%" height="65px" borderRadius="xxs"></wui-shimmer>`)}_exchangesTemplate(){return this.exchanges.length>0?this.exchanges.map(e=>a`<wui-list-item
              @click=${()=>this.onExchangeClick(e)}
              chevron
              variant="image"
              imageSrc=${e.imageUrl}
              ?loading=${this.isLoading}
            >
              <wui-text variant="md-regular" color="secondary">
                Deposit from ${e.name}
              </wui-text>
            </wui-list-item>`):a`<wui-flex flexDirection="column" alignItems="center" gap="4" padding="4">
          <wui-text variant="lg-medium" align="center" color="primary">
            No exchanges support this asset on this network
          </wui-text>
        </wui-flex>`}exchangesTemplate(){return a`<wui-flex
      flexDirection="column"
      gap="2"
      .padding=${["3","3","3","3"]}
      class="exchanges-container"
    >
      ${this.isLoading?this.exchangesLoadingTemplate():this._exchangesTemplate()}
    </wui-flex>`}amountInputTemplate(){return a`
      <wui-flex flexDirection="column" gap="3" .padding=${["0","3","3","3"]} class="amount-input-container">
        <wui-flex justifyContent="space-between" alignItems="center">
          <wui-text variant="md-medium" color="secondary">Asset</wui-text>

          <wui-token-button
            data-testid="deposit-from-exchange-asset-button"
            flexDirection="row-reverse"
            text=${this.paymentAsset?.metadata.symbol||""}
            imageSrc=${this.paymentAsset?.metadata.iconUrl||""}
            @click=${()=>w.push("PayWithExchangeSelectAsset")}
            >
          </wui-token-button>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" justifyContent="center">
          <wui-flex alignItems="center" gap="1">
            <wui-text variant="h2-regular" color="secondary">${this.amount}</wui-text>
            <wui-text variant="md-regular" color="secondary">USD</wui-text>
          </wui-flex>
          ${this.tokenAmountTemplate()}
          </wui-flex>
          <wui-flex justifyContent="space-between" gap="2">
            ${v.map(e=>a`<wui-button @click=${()=>this.onPresetAmountClick(e)} variant=${this.amount===e?"neutral-primary":"neutral-secondary"} size="sm" fullWidth>$${e}</wui-button>`)}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}tokenAmountTemplate(){return this.priceLoading?a`<wui-shimmer
        width="65px"
        height="20px"
        borderRadius="xxs"
        variant="light"
      ></wui-shimmer>`:a`
      <wui-text variant="md-regular" color="secondary">
        ${this.tokenAmount.toFixed(4)} ${this.paymentAsset?.metadata.symbol}
      </wui-text>
    `}async onExchangeClick(e){if(!this.amount){p.showError("Please enter an amount");return}await t.handlePayWithExchange(e.id)}handlePaymentInProgress(){const e=f.state.activeChain;this.isPaymentInProgress&&this.currentPayment?.exchangeId&&this.currentPayment?.sessionId&&this.paymentId&&(t.waitUntilComplete({exchangeId:this.currentPayment.exchangeId,sessionId:this.currentPayment.sessionId,paymentId:this.paymentId}).then(n=>{n.status==="SUCCESS"?(p.showSuccess("Deposit completed"),e&&(P.fetchTokenBalance(),k.updateBalance(e))):n.status==="FAILED"&&p.showError("Deposit failed")}),p.showLoading("Deposit in progress..."),w.replace("Account"))}onPresetAmountClick(e){t.setAmount(e)}async getPaymentAssets(){this.network&&await t.getAssetsForNetwork(this.network.caipNetworkId)}async setDefaultPaymentAsset(){if(this.network){const e=await t.getAssetsForNetwork(this.network.caipNetworkId);e[0]&&t.setPaymentAsset(e[0])}}};r.styles=I;u([c()],r.prototype,"network",void 0);u([c()],r.prototype,"exchanges",void 0);u([c()],r.prototype,"isLoading",void 0);u([c()],r.prototype,"amount",void 0);u([c()],r.prototype,"tokenAmount",void 0);u([c()],r.prototype,"priceLoading",void 0);u([c()],r.prototype,"isPaymentInProgress",void 0);u([c()],r.prototype,"currentPayment",void 0);u([c()],r.prototype,"paymentId",void 0);u([c()],r.prototype,"paymentAsset",void 0);r=u([b("w3m-deposit-from-exchange-view")],r);const $=g`
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
    border-radius: ${({borderRadius:i})=>i[3]};
  }
`;var x=function(i,e,n,o){var l=arguments.length,s=l<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(i,e,n,o);else for(var d=i.length-1;d>=0;d--)(m=i[d])&&(s=(l<3?m(s):l>3?m(e,n,s):m(e,n))||s);return l>3&&s&&Object.defineProperty(e,n,s),s};let h=class extends y{constructor(){super(),this.unsubscribe=[],this.assets=t.state.assets,this.search="",this.onDebouncedSearch=A.debounce(e=>{this.search=e}),this.unsubscribe.push(t.subscribe(e=>{this.assets=e.assets}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return a`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}templateSearchInput(){return a`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){const e=this.assets.filter(o=>o.metadata.name.toLowerCase().includes(this.search.toLowerCase())),n=e.length>0;return a`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","3","0","3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4","3","3","3"]}>
          <wui-text variant="md-medium" color="secondary">Available tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${n?e.map(o=>a`<wui-list-item
                    .imageSrc=${o.metadata.iconUrl}
                    ?clickable=${!0}
                    @click=${this.handleTokenClick.bind(this,o)}
                  >
                    <wui-text variant="md-medium" color="primary">${o.metadata.name}</wui-text>
                    <wui-text variant="md-regular" color="secondary"
                      >${o.metadata.symbol}</wui-text
                    >
                  </wui-list-item>`):a`<wui-flex
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
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){w.push("OnRampProviders")}onInputChange(e){this.onDebouncedSearch(e.detail)}handleTokenClick(e){t.setPaymentAsset(e),w.goBack()}};h.styles=$;x([c()],h.prototype,"assets",void 0);x([c()],h.prototype,"search",void 0);h=x([b("w3m-deposit-from-exchange-select-asset-view")],h);export{h as W3mDepositFromExchangeSelectAssetView,r as W3mDepositFromExchangeView};
