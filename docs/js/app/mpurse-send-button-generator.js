class MpurseSendButtonGenerator {
    constructor() {
        //this.iconGen = new MonacoinIconBase64Generator()
    }
    async copy() {
        try {
            Toaster.toast('クリップボードにコピーしました！')
            await navigator.clipboard.writeText(document.getElementById('export-code').value) 
        }
        catch(e) { Toaster.toast('クリップボードのコピーに失敗しました……。', true) }
    }
    /*
    setImage() {
        const icon = new MonacoinIconBase64()
        document.getElementById('img-src-img').style.display = (document.getElementById('img-src').value) ? 'inline' : 'none'
        console.log(icon.get('coin-mark', 64))
        document.getElementById('coin-mark-img').src = icon.get('coin-mark', 64)
        document.getElementById('coin-monar-img').src = icon.get('coin-monar', 64)
        document.getElementById('monar-mark-img').src = icon.get('monar-mark', 64)
    }
    */
    async generate() {
        await this.#export(this.#makeMpurseSendButton())
    }
    /*
    async generate(selectedImgId=null) {
        this.selectedImgId = selectedImgId
        await this.#export(this.#makeMpurseSendButton())
    }
    */
    async #export(button) {
        document.getElementById('export').innerHTML = button
        const js = await this.#getScript()
        document.getElementById('export-code').value = js + button
    }
    #makeMpurseSendButton() {
        const attrs = []
        for (const name of ['format', 'party']) {
            const value = document.querySelector(`input[name=${name}][checked]`).value
            if (value) { attrs.push(`${name}="${value}"`) }
        }
        for (const id of ['to', 'asset', 'amount', 'memo', 'src', 'size', 'title', 'ok', 'cancel', 'src-id', 'base-url', 'party-src', 'party-src-id', 'party-size']) {
            console.debug(id)
            const value = document.getElementById(id).value
            if (value) { attrs.push(`${id}="${value}"`) }
        }
        if (this.selectedImgId) {
            const img = document.querySelector(`input[name="img"][checked]`)
            attrs.push(`img="${this.selectedImgId.split('-').slice(0,-1).join('-')}"`)
        }
        return `<mpurse-send-button ${attrs.join(' ')}></mpurse-send-button>`
    }
    async #getScript() {
        //const res = await fetch('./js/mpurse-send-button.js')
        const res = await fetch('./js/app/mpurse-send-button.js.tpl')
        const js = await res.text()
        const code = this.#setInitValues()
        return js.replace('//-----replace-----//', code)
        //return `<script>${js}${this.#getMonacoinIconBase64Code()}</script>`
    }
    #setInitValues() {
        const to = `this.to = '${document.getElementById(`to`).value}'`
        const amount = `this.amount = '${document.getElementById(`amount`).value}'`
        const asset = `this.asset = '${document.getElementById(`asset`).value}'`
        const memo = `this.memo = '${document.getElementById(`memo`).value}'`
        const ok = `this.ok = '${document.getElementById(`ok`).value}'`
        const cancel = `this.cancel = '${document.getElementById(`cancel`).value}'`
        //const party = `this.party = '` + document.querySelector(`input[type=radio][name=party][checked]`).getAttribute('value') + `'`
        const baseUrl = `this.baseUrl = '${document.getElementById(`base-url`).value}'`
        const party = `this.party = '${document.querySelector(`input[type=radio][name=party][checked]`).value}'`
        const partySrc = `this.partySrc = ${(document.getElementById(`party-src`).value) ? "'"+document.getElementById(`party-src`).value+"'" : 'null'}`
        const partySrcId = `this.partySrcId = '${document.getElementById(`party-src-id`).value}'`
        //const format = `this.format = '` + document.querySelector(`input[type=radio][name=party-img-format][checked]`).getAttribute('value') + `'`
        const format = `this.format = '${document.querySelector(`input[type=radio][name=format][checked]`).value}'`
        const partySize = `this.partySize = '${document.getElementById(`party-size`).value}'`
        const src = `this.src = ` + ((document.getElementById(`src`).value) ? `'` + document.getElementById(`src`).value + `'` : 'null')
        const srcId = `this.srcId = '${document.getElementById(`src-id`).value}'`
        const size = `this.size = ${document.getElementById(`size`).value}`
        const title = `this.title = '${document.getElementById('title').value}'`
        const alt = `this.alt = '${document.getElementById('alt').value}'`
        return `${to}
        ${amount}
        ${asset}
        ${memo}
        ${ok}
        ${cancel}
        ${baseUrl}
        ${party}
        ${partySrc}
        ${partySrcId}
        ${partySize}
        ${format}
        ${src}
        ${srcId}
        ${size}
        ${title}
        ${alt}`
    }
    #getMonacoinIconBase64Code() {
        return this.iconGen.generate(this.selectedImgId)
    }
}

