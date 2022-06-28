class ZipDownloader {
    constructor() {
        this.dependents = ['lib/toastify/1.11.2/min.css', 'lib/toastify/1.11.2/min.js', 'js/toaster.js', 'lib/party/party.min.js', 'js/party-sparkle-image.js', 'js/party-sparkle-hart.js']
    }
    async download(selectedImgId=null) {
        this.zip = new JSZip()
        //await this.#makeHtmlFiles()
        //await this.#makeJsFiles()
        //await this.#makeImageFiles()
        await Promise.all([this.#makeHtmlFiles(), this.#makeJsFiles(), this.#makeImageFiles()])
        const file = await this.zip.generateAsync({type:'blob', platform:this.#getOs()})
        const url = (window.URL || window.webkitURL).createObjectURL(file);
        const download = document.createElement('a');
        download.href = url;
        download.download = 'mpurse-send-button.zip';
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
        this.#toast(`ZIPファイルをダウンロードしました！`)
    }
    async #makeHtmlFiles() {
        const head = `<head><meta charset="UTF-8"><title>投げモナボタン</title>${this.#makeLoad()}</head>`
        const docs = await this.#makeNote()
        const body = `<body>
${docs}
</body>`
        const html = `<!DOCTYPE html>
${head}
${body}`
        //const html = this.#makeScript() + '\n' + this.#makeMpurseSendButtons() + '\n' + this.#makeNote()
        this.zip.file('index.html', html)
        this.zip.file('article-1.html', html)
    }
    async #makeJsFiles() {
        //const res = await fetch('./js/mpurse-send-button.js')
        //const js = await res.text()
        //zip.file('mpurse-send-button.js', js + this.iconGen.generate(selectedImgId))
        //const gen = new MpurseSendButtonGenerator()
        //await gen.getScript()
        //const files = ['lib/toastify/1.11.2/min.css', 'lib/toastify/1.11.2/min.js', 'js/toaster.js', 'lib/party/party.min.js', 'js/party-sparkle-image.js', 'js/party-sparkle-hart.js']
        for (const file of this.dependents) {
            this.zip.file(file, await this.#getData(file))
        }
        this.zip.file('js/mpurse-send-button.js', await new MpurseSendButtonGenerator().getScript())
        //this.zip.file('server.sh', await this.#getData('server.sh'), {unixPermissions: "755"})
        this.zip.file('server.sh', await this.#getData('server.sh'), {unixPermissions: "0100755"})
        this.zip.file('run_server.py', await this.#getData('run_server.py'))
        /*
        this.zip.file('js/toaster.js', await this.#getData('js/toaster.js'))
        this.zip.file('js/mpurse-send-button.js', await new MpurseSendButtonGenerator().getScript())
        this.zip.file('js/mpurse-send-button.js', await new MpurseSendButtonGenerator().getScript())
        this.zip.file('js/mpurse-send-button.js', await new MpurseSendButtonGenerator().getScript())
        */
    }
    async #makeImageFiles() {
        const base = document.getElementById(`base-url`).value.split('/').filter(v=>v).filter(v=>'.'!==v && '..'!==v).join('/')
        //if (!base.endsWith('/')) { base += '/' }
        const files = Array.prototype.slice.call(document.querySelectorAll(`input[type=checkbox][name=img-files]`)).filter(e=>e.checked).map(e=>e.value)
        console.debug(files)
        const formats = Array.prototype.slice.call(document.querySelectorAll(`input[type=radio][name=img-format]`)).filter(e=>e.checked)[0].value.split(',')
        const sizes = document.querySelector(`#img-file-sizes`).value.split(',')
        for (const file of files) {
            for (const format of formats) {
                const [createPaths, sourcePaths] = this.#getImgPaths(base, file, format, sizes)
                console.debug(createPaths, sourcePaths)
                for (let i=0; i<createPaths.length; i++) {
                    this.zip.file(createPaths[i], await this.#getData(sourcePaths[i], ('svg'!==format)))
                }
            }
        }
    }
    #getImgPaths(base, file, format, sizes) {
        const hasSizeDir = ('svg'===format) ? false : true
        const createFilePaths = sizes.map(size=>`${base}/${format}/${(hasSizeDir) ? size+"/" : ''}${file}.${format}`)
        const sourceFilePaths = sizes.map(size=>`./asset/image/monacoin/${format}/${(hasSizeDir) ? size+"/" : ''}${file}.${format}`)
        return [createFilePaths, sourceFilePaths]
    }
    async #getData(url, isBin=false) {
        const res = await fetch(url)
        return await res[(isBin) ? 'blob' : 'text']()
        //return (isBin) ? await res.blob() : await res.text()
    }
    #toast(message) {
        if (Toastify) { Toastify({text: message, position:'center'}).showToast(); }
        else { alert(message) }
    }
    #makeLoad() {
        //const files = ['lib/toastify/1.11.2/min.css', 'lib/toastify/1.11.2/min.js', 'js/toaster.js', 'lib/party/party.min.js', 'js/mpurse-send-button.js']
        //return files.map(f=>(f.endsWith('css')) ? this.#makeLinkCss(f) : this.#makeScript(f)).join('\n')
        const depends = this.dependents.map(f=>(f.endsWith('css')) ? this.#makeLinkCss(f) : this.#makeScript(f))
        depends.push(this.#makeScript(`js/mpurse-send-button.js`)) 
        return depends.join('\n')
        //return this.dependents.map(f=>(f.endsWith('css')) ? this.#makeLinkCss(f) : this.#makeScript(f)).join('\n')
        //return html.join('\n')
    }
    /*
    #makeLinks() {
        const files = ['lib/toastify/1.11.2/min.css', 'lib/toastify/1.11.2/min.js', 'js/toaster.js', 'lib/party/party.min.js', 'js/mpurse-send-button.js']
        return files.map(f=>this[((f.endsWith('css')) ? 'makeLinkCss' : 'makeScript')](f)).join('\n')
        //return files.map(f=>this.#makeScript(f)).join('\n')
    }
    #makeScripts() {
        const files = ['lib/toastify/1.11.2/min.css', 'lib/toastify/1.11.2/min.js', 'js/toaster.js', 'lib/party/party.min.js', 'js/mpurse-send-button.js']
        return files.map(f=>this.#makeScript(f)).join('\n')
    }
    */
    #makeScript(path) { return `<script src="${path}"></script>` }
    #makeLinkCss(path) { return `<link rel="stylesheet" type="text/css" href="${path}">` }
    #makeMpurseSendButtons() {
        const simple = `<mpurse-send-button></mpurse-send-button>`
        const fullAttrs = new MpurseSendButtonGenerator().makeMpurseSendButton()
        return `${simple}${fullAttrs}`
    }
    /*
    #makeButtonTo() { return `<mpurse-send-button to="${document.getElementById('to').value}"></mpurse-send-button>` }
    #makeButtonToImg(img) { return `<mpurse-send-button to="${document.getElementById('to').value}" img="${img}"></mpurse-send-button>` }
    #makeButtonToImgSize(img,size) { return `<mpurse-send-button to="${document.getElementById('to').value}" img="${img}" img-size="${size}"></mpurse-send-button>` }
    */
    async #makeNote() {
        const res = await fetch(`/asset/content/document.md`)
        console.debug(res)
        let md = await res.text()
        const table = this.#makeInnerImageTable()
        console.debug(table)
        md = md.replace('//-----inner-img-table-----//', table)
        md = md.replace('//-----mpurse-send-button-----//', this.#makeMpurseSendButtons())
        console.debug(md)
        await markdown.ready;
        return markdown.parse(md);
    }
    #makeInnerImageTable() {
        const base = document.getElementById(`base-url`).value.split('/').filter(v=>v).filter(v=>'.'!==v && '..'!==v).join('/')
        const files = Array.prototype.slice.call(document.querySelectorAll(`input[type=checkbox][name=img-files]`)).filter(e=>e.checked).map(e=>e.value)
        const formats = Array.prototype.slice.call(document.querySelectorAll(`input[type=radio][name=img-format]`)).filter(e=>e.checked)[0].value.split(',')
        const sizes = document.querySelector(`#img-file-sizes`).value.split(',')

        const ths = [`<th><code>src-id</code></th>`]
        for (const format of formats) {
            if ('svg'===format) { ths.push(`<th>${format}</th>`) }
            else {
                for (const size of sizes) {
                    ths.push(`<th>${format} ${size}</th>`) 
                }
            }
        }
        const trs = []
        for (const file of files) {
            const tds = [`<th>${file}</th>`]
            for (const format of formats) {
                const hasSizeDir = ('svg'===format) ? false : true
                if (hasSizeDir) {
                    for (const size of sizes) {
                        const path = `${base}/${format}/${size}/${file}.${format}`
                        //tds.push(`<td><img src="${path}" width="64" height="64"></td>`)
                        tds.push(`<td><mpurse-send-button format="${format}" src-id="${file}" size="64"></mpurse-send-button></td>`)
                    }
                } else {
                    const path = `${base}/${format}/${file}.${format}`
                    //tds.push(`<td><object type="image/svg+xml" data="${path}" width="64" height="64"></object></td>`)
                    tds.push(`<td><mpurse-send-button format="${format}" src-id="${file}" size="64"></mpurse-send-button></td>`)
                }
            }
            trs.push(`<tr>${tds.join('')}</tr>`)
        }
        return `<table><tr>${ths.join('')}</tr>${trs.join('')}<table>`
    }
    /*
    */
    /*
    #makeNote() { return `<h1>投げモナボタン</h1>
<p>　これは<a href="https://github.com/tadajam/mpurse">Mpurse</a>を使って暗号通貨モナコインを指定したアドレスに送金するためのボタンです。

<h2>作成元</h2>
　<p>　これは<a href="https://ytyaru.github.io/Html.Mpurse.Send.Button.Generator.20220626095139/">Mpurseを使ったモナコイン送金ボタンを生成する</a>で作成されました。</p>
<p>　ダウンロードしたソースコードや画像ファイルはご自由にお使いください。</p>

<h2>使用方法</h2>
<p>　<code>&lt;mpurse-send-button&gt;</code>タグで投げモナボタンを作れます。</p>
<p>詳しくはHTMLソースコードをご覧ください。</p>
<p>　このボタンで投げモナするにはHTTPSサーバにアップする必要があります。<a href="https://github.com/tadajam/mpurse">Mpurse</a> APIの仕様です。</p>` }
    */
    #getOs() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf("windows nt") !== -1) { return 'DOS' }
        return 'UNIX'
        /*
        if(ua.indexOf("windows nt") !== -1) {
          console.log("「Microsoft Windows」をお使いですね!");
        } else if(ua.indexOf("android") !== -1) {
          console.log("「Android」をお使いですね!");
        } else if(ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
          console.log("「iOS」をお使いですね!");
        } else if(ua.indexOf("mac os x") !== -1) {
          console.log("「macOS」をお使いですね!");
        } else {
          console.log("何をお使いなのですか?");
        }
        */
    }
}
