class MpurseSendButton extends HTMLElement {
    constructor(options) {
        super();
        try {
            window.mpurse.updateEmitter.removeAllListeners()
              .on('stateChanged', isUnlocked => this.stateChanged(isUnlocked))
              .on('addressChanged', address => this.addressChanged(address));
        } catch(e) { console.debug(e) }
        this.title = '投げモナする'
        //this.src = './asset/image/monacoin/png/64/coin-monar.png'
        this.src = null
        this.srcId = 'coin-monar'
        this.size = 64
        this.to = 'MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu'
        this.asset = 'MONA'
        this.amount = 0.11411400
        this.memo = ''
        this.ok = '投げモナしました！\nありがとうございます！（ ´∀｀）'
        this.cancel = 'キャンセルしました(´・ω・｀)'
        this.baseUrl = './asset/image/monacoin'
        if (!this.baseUrl.endsWith('/')) { this.baseUrl += '/' }
        this.format = 'png' // svg
        this.party = 'confetti' // confetti,confetti-star,confetti-hart,confetti-img,confetti-mix,sparkle,sparkle-star,sparkle-hart,sparkle-img
        this.partySrc = null
        //this.partySrc = './asset/image/monacoin/png/64/monar.png' // sparkle-imageのとき使う画像
        this.partySrcId = 'monar' // confetti-img,sparkle-imgのとき使う画像
        this.partySize = 32 // 画像サイズ
        if (PartySparkleHart) { PartySparkleHart.setup() }
        if (PartySparkleImage) { PartySparkleImage.setup(this.format, this.partySize) }
    }
    static get observedAttributes() {
        return ['to', 'asset', 'amount', 'memo', 'src', 'size', 'title', 'ok', 'cancel', 'src-id', 'base-url', 'format', 'party', 'party-src', 'party-src-id', 'party-size'];
    }
    attributeChangedCallback(property, oldValue, newValue) {
        //if (oldValue === newValue) { return; }
        const isChainCase = property.includes('-')
        const nums = ['size', 'party-size']
        const name = (isChainCase) ? property.split('-').map((s,i)=>(0===i) ? s.toLowerCase() : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join('') : property
        const value = (nums.includes(property)) ? Number(newValue) : newValue
        this[name] = value
        if ('base-url' === property) {
            if (!this.baseUrl.endsWith('/')) { this.baseUrl += '/' }
        }
        else if ('party-size' === property || 'format' === property) {
            if (PartySparkleImage) { PartySparkleImage.setup(this.format, this.partySize) }
        }
        console.debug(property, name, value)
        /*
        if (isChainCase) {
            const camel = property.split('-').map((s,i)=>(0===i) ? s.toLowerCase() : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
            this[camel] = newValue
            if (nums.includes(property)) {

            }
        }
        else if ('size' === property || 'amount' === property) { this[property] = Number(newValue) }
        else if ('base-url' === property) {
            this.baseUrl = newValue
            if (!this.baseUrl.endsWith('/')) { this.baseUrl += '/' }
        }
        else if ('src-id' === property) { this.srcId = newValue }
        else if ('party-src' === property) {
            this.partySrc = newValue
        }
        else if ('party-src-id' === property) {
            this.partySrcId = newValue
        }
        else if ('party-size' === property) {
            this.partySize = Number(newValue)
            if (PartySparkleImage) { PartySparkleImage.setup(this.format, this.partySize) }
        }
        else if ('format' === property) {
            this[property] = newValue;
            if (PartySparkleImage) { PartySparkleImage.setup(this.format, this.partySize) }
        }
        else { this[property] = newValue; }
        */
    }
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' }); // マウスイベント登録に必要だった。CSS的にはclosedにしたいのに。
        const button = await this.#make()
        await this.#makeClickEvent()
        console.debug(button.innerHTML)
        shadow.innerHTML = `<style>${this.#cssBase()}${this.#cssAnimation()}</style>${button.innerHTML}` 
        this.shadowRoot.querySelector('img').addEventListener('animationend', (e)=>{ e.target.classList.remove('jump'); }, false);
    }
    #cssBase() { return `img{cursor:pointer; text-align:center; vertical-align:middle; user-select:none;}` }
    #cssAnimation() { return `
@keyframes jump {
  from {
    position:relative;
    bottom:0;
    transform: rotateY(0);
  }
  45% {
    position:relative;
    bottom: ${this.size*2}px;
  }
  55% {
    position:relative;
    bottom: ${this.size*2}px;
  }
  to {
    position:relative;
    bottom: 0;
    transform: rotateY(720deg);
  }
}
.jump {
  transform-origin: 50% 50%;
  animation: jump .5s linear alternate;
}
`; }
    stateChanged(isUnlocked) {
        console.debug(`Mpurseのロック状態が変更されました：${isUnlocked}`)
    }
    addressChanged(address) {
        console.debug(`Mpurseのログイン中アドレスが変更されました：${address}`)
        this.to = address
        this.#make().then(
            result=>{this.innerHTML = ''; this.appendChild(result); }, 
            error=>{console.debug('アドレス変更に伴いボタン更新を試みましたが失敗しました。', e);})
    }
    async #make() {
        const a = await this.#makeSendButtonA()
        const img = this.#makeSendButtonImg()
        a.appendChild(img)
        return a
    }
    #makeSendButtonA() {
        const a = document.createElement('a')
        a.setAttribute('title', this.title)
        return a
    }
    #makeSendButtonImg() {
        const img = document.createElement('img')
        img.setAttribute('width', `${this.size}`)
        img.setAttribute('height', `${this.size}`)
        img.setAttribute('src', `${this.#getImgSrc()}`)
        console.debug(this.size, this.src)
        return img
    }
    #getImgSrc() {
        if (this.src) { return this.src }
        console.debug(this.size, `${this.baseUrl}${this.format}${('svg'==this.format) ? '' : '/' + ((64 < this.size) ? 256 : 64)}/${this.srcId}.${this.format}`)
        return `${this.baseUrl}${this.format}${('svg'==this.format) ? '' : '/' + ((64 < this.size) ? 256 : 64)}/${this.srcId}.${this.format}`
    }
    async #makeClickEvent() {
        const to = this.to || await window.mpurse.getAddress()
        const asset = this.asset
        const amount = Number(this.amount)
        const memoType = (this.memo) ? 'plain' : 'no' // 'no', 'hex', 'plain'
        const memo = this.memo
        this.addEventListener('pointerdown', async(event) => {
            console.debug(`クリックしました。\n宛先：${to}\n金額：${amount} ${asset}\nメモ：${memo}`)
            console.debug(event.target)
            event.target.shadowRoot.querySelector('img').classList.add('jump')
            //this.#party()
            const txHash = await window.mpurse.sendAsset(to, asset, amount, memoType, memo).catch((e) => null);
            console.debug(txHash)
            if (!txHash) { Toaster.toast(this.cancel); }
            else {
                console.debug(txHash)
                console.debug(`送金しました。\ntxHash: ${txHash}\n宛先：${to}\n金額：${amount} ${asset}\nメモ：${memo}`)
                this.#party()
                Toaster.toast(this.okMsg);
            }
        });
    }
    #party() {
        if (!party) { return }
        const target = this.shadowRoot.querySelector('img')
        switch(this.party) {
            case 'confetti':
            case 'confetti-square':
                this.#confetti(target, ['square']); break;
            case 'confetti-star':
                this.#confetti(target, ['star']); break;
            case 'confetti-hart':
                this.#confetti(target, ['hart']); break;
            case 'confetti-img':
                this.#confetti(target, [this.partySrc]); break;
            case 'confetti-mix':
                this.#confetti(target, ['star','hart',this.partySrc]); break;
            case 'sparkle':
            case 'sparkle-star':
                party.sparkles(target,{
                    lifetime: party.variation.range(2, 3),
                    count: party.variation.range(30, 40),
                    speed: party.variation.range(100, 500),
                    //size: party.variation.range(1, 3),
                }); break;
            case 'sparkle-hart': PartySparkleHart.animate(target); break;
            //case 'sparkle-img': PartySparkleImage.animate(target, {src:this.partySrc || this.src, size:this.size}); break;
            case 'sparkle-img': PartySparkleImage.animate(target, {src:this.#getPartySrcUrl() || this.src, size:this.partySize}); break;
            default: break;
        }
    }
    #confetti(target, shapes) {
        party.confetti(target,{
            shapes: shapes,
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
    }
    #getPartySrcUrl() {
        if(this.partySrc) { return this.partySrc }
        //const url = `./asset/image/monacoin/${format}${('png'==format) ? '/' + ((64 < size) ? 256 : 64) : ''}/${kind}.${format}`
        return `${this.baseUrl}${this.format}${('svg'==this.format) ? '' : '/' + ((64 < this.size) ? 256 : 64)}/${this.partySrcId}.${this.format}`
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    customElements.define('mpurse-send-button', MpurseSendButton);
});

