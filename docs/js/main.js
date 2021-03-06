window.addEventListener('DOMContentLoaded', async(event) => {
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', async(isUnlocked) => { /*await init();*/ console.log(isUnlocked); })
          .on('addressChanged', async(address) => { /*await init(address);*/ console.log(address); });
    } catch(e) { console.debug(e) }
    Loading.setup()
    //Loading.show()
    document.getElementById('amount').focus()
    const gen = new MpurseSendButtonGenerator() 
    const downloader = new ZipDownloader()
    const imgSz = new ImageFileSize()
    await imgSz.setup()
    document.getElementById('get-address').addEventListener('click', async(event) => {
        document.getElementById('to').value = await window.mpurse.getAddress()
        await gen.generate()
    })
    document.getElementById('to').addEventListener('input', async(event) => { await gen.generate() })
    document.getElementById('amount').addEventListener('input', async(event) => { await gen.generate() })
    document.getElementById('asset').addEventListener('input', async(event) => { await gen.generate() })
    document.getElementById('memo').addEventListener('input', async(event) => { await gen.generate() })
    for (const radio of document.querySelectorAll('input[name="img"]')) {
        radio.addEventListener('change', async(event) => {
            await gen.generate((document.getElementById('img-src').value) ? null : event.target.id)
        })
    }
    document.getElementById('src').addEventListener('change', async(event) => { await gen.generate() })
    document.getElementById('size').addEventListener('change', async(event) => { await gen.generate() })
    document.getElementById('title').addEventListener('change', async(event) => { await gen.generate() })
    document.getElementById('ok').addEventListener('input', async(event) => { await gen.generate() })
    document.getElementById('cancel').addEventListener('input', async(event) => { await gen.generate() })
    for (const ui of document.querySelectorAll(`input[type=radio][name=party]`)) { ui.addEventListener('change', async(event) => { await gen.generate() }) }
    for (const ui of document.querySelectorAll(`input[type=radio][name=format]`)) { ui.addEventListener('input', async(event) => {  await gen.generate() }) }
    //for (const ui of document.querySelectorAll(`input[type=radio][name=format]`)) { ui.addEventListener('change', async(event) => { await gen.generate() }) }
    document.getElementById('src-id').addEventListener('change', async(event) => { await gen.generate() })

    document.getElementById('copy-to-clipboard').addEventListener('click', async(event) => { await gen.copy() })
    document.getElementById('download-zip').addEventListener('click', async(event) => {
        await downloader.download() 
        /*
        const selectedImgId = (document.getElementById('img-src').value) ? null : [...document.querySelectorAll(`input[type="radio"][name="img"]`)].filter(input=>input.checked)[0].id
        await zip.download(selectedImgId)
        */
    })

    document.getElementById('party-confetti').addEventListener('click', async(event) => {
        party.confetti(event.target,{
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
            //size: party.variation.range(1, 3),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti]`).checked = true
        gen.generate()
    })
    document.getElementById('party-confetti-star').addEventListener('click', async(event) => {
        party.confetti(event.target,{
            shapes: ['star'],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-star]`).checked = true
        gen.generate()
    })
    document.getElementById('party-confetti-hart').addEventListener('click', async(event) => {
        party.confetti(event.target,{
            shapes: ['hart'],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-hart]`).checked = true
        gen.generate()
    })
    document.getElementById('party-confetti-img').addEventListener('click', async(event) => {
        party.confetti(event.target,{
            shapes: [document.getElementById('party-src-id').value],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(30, 40),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-image]`).checked = true
        gen.generate()
    })
    document.getElementById('party-confetti-mix').addEventListener('click', async(event) => {
        party.confetti(event.target,{
            shapes: ['square', 'hart', document.getElementById('party-src-id').value],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-mix]`).checked = true
        gen.generate()
    })

    document.getElementById('party-sparkle-star').addEventListener('click', async(event) => {
        party.sparkles(event.target,{
            lifetime: party.variation.range(2, 3),
            count: party.variation.range(30, 40),
            speed: party.variation.range(100, 500),
        })
        document.querySelector(`input[type=radio][name=party][value=sparkle-star]`).checked = true
        gen.generate()
    })
    document.getElementById('party-sparkle-hart').addEventListener('click', async(event) => {
        PartySparkleHart.animate(event.target) 
        document.querySelector(`input[type=radio][name=party][value=sparkle-hart]`).checked = true
        gen.generate()
    })
    document.getElementById('party-src').addEventListener('change', async(event) => {
        if (event.target.value) {
            document.querySelector(`input[type=radio][name=party][value=sparkle-image] + img`).setAttribute('src', event.target.value)
            document.querySelector(`#party-sparkle-img > img`).setAttribute('src', event.target.value)
        } else {
            const id = document.getElementById('party-src-id').value
            document.querySelector(`#party-sparkle-img > img`).setAttribute('src', `./asset/image/monacoin/png/64/${id}.png`)
            document.querySelector(`input[type=radio][name=party][value=sparkle-image] + img`).setAttribute('src', `./asset/image/monacoin/png/64/${id}.png`)
        }
    })
    document.getElementById('party-src-id').addEventListener('change', async(event) => {
        document.querySelector(`#party-confetti-img > img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
        document.querySelector(`input[type=radio][name=party][value=confetti-image] + img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
        if (!document.getElementById('party-src').value) {
            document.querySelector(`#party-sparkle-img > img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
            document.querySelector(`input[type=radio][name=party][value=sparkle-image] + img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
        }
        gen.generate()
    })
    document.getElementById('party-sparkle-img').addEventListener('click', async(event) => {
        const src = document.getElementById('party-src').value
        let url = src
        const size = document.getElementById('party-size').value
        if (!url) {
            const id = document.getElementById('party-src-id').value
            const format = document.querySelector(`input[name=format][checked]`).value
            url = `./asset/image/monacoin/${format}${('png'==format) ? '/' + ((64 < size) ? 256 : 64) : ''}/${id}.${format}`
        }
        document.querySelector(`input[type=radio][name=party][value=sparkle-image]`).checked = true
        PartySparkleImage.animate(event.target, {src:url, size:size}) 
        gen.generate()
    })
    document.getElementById('party-size').addEventListener('change', async(event) => {
        const id = document.getElementById('party-src-id').value
        const format = document.querySelector(`input[name=format][checked]`).value
        const size = parseInt(event.target.value)
        PartySparkleImage.setup(format, size)
        gen.generate()
    })

    for (const ui of document.querySelectorAll(`input[type=radio][name=img-format]`)) { ui.addEventListener('input', async(event) => { imgSz.show(); }) }
    document.getElementById('img-file-sizes').addEventListener('change', async(event) => {
        imgSz.show();
    })
    for (const ui of document.querySelectorAll(`input[type=checkbox][name=img-files]`)) { ui.addEventListener('input', async(event) => { imgSz.show(); }) }

    const table = new ImageTableHorizon() 
    document.getElementById('image-table').innerHTML = await table.make(imgSz.Tsvs)
    /*
    document.getElementById('get-transaction').addEventListener('click', async(event) => {
        const address = document.getElementById('address').value
        if (address) {
            const client = new MonaTransactionClient()
            const json = await client.get(address)
            document.getElementById('response').value = JSON.stringify(json)
            console.debug(json)
            const gen = new MonaTransactionViewer(address)
            document.getElementById('export-transaction').innerHTML = await gen.generate(json)
        }
    });
    async function init(address=null) {
        if (window.hasOwnProperty('mpurse')) {
            document.getElementById('address').value = address || await window.mpurse.getAddress()
            document.getElementById('get-transaction').dispatchEvent(new Event('click'))
        }
    }
    document.getElementById('get-misskey-account-info').addEventListener('click', async(event) => {
        const domain = document.getElementById('misskey-instance').value
        if ('' == domain.trim()) { Toaster.toast(`?????????????????????????????????????????????URL??????????????????????????????`, true); return; }
        if (await MisskeyInstance.isExist(domain)) {
            console.debug('?????????????????????????????????????????????')
            const authorizer = await MisskeyAuthorizer.get(domain, 'read:account')
            console.debug(authorizer)
            await authorizer.authorize(['i'], null)
        } else {
            Toaster.toast('??????????????????????????????????????????????????????', true)
        }
    });
    init()
    // mpurse??????????????????????????????????????????????????????
    //initForm()
    */
    document.addEventListener('mastodon_redirect_approved', async(event) => {
        console.debug('===== mastodon_redirect_approved =====')
        console.debug(event.detail)
        // action??????????????????????????????????????????????????????
        for (let i=0; i<event.detail.actions.length; i++) {
            console.debug(event.detail.actions[i], (event.detail.params) ? event.detail.params[i] : null, event.detail.results[i])
            console.debug(`----- ${event.detail.actions[i]} -----`)
            console.debug((event.detail.params) ? event.detail.params[i] : null)
            console.debug(event.detail.results[i])
        }
        // ???????????????????????????????????????????????????????????????????????????????????????????????????client????????????API???????????????
        //const res = event.detail.client.toot(JSON.parse(event.detail.params[0]))
        // ??????????????????
        for (let i=0; i<event.detail.actions.length; i++) {
            /*
            if ('accounts' == event.detail.actions[i]) {
                const gen = new MastodonProfileGenerator(event.detail.domain)
                document.getElementById('export-mastodon').innerHTML = gen.generate(event.detail.results[i])
            }
            */
            if ('status' == event.detail.actions[i]) {
                const html = new Comment().mastodonResToComment(event.detail.results[i])
                const comment = document.querySelector(`mention-section`).shadowRoot.querySelector(`#web-mention-comment`)
                comment.innerHTML = html + comment.innerHTML
            }
        }
    });
    document.addEventListener('mastodon_redirect_rejected', async(event) => {
        console.debug('??????????????????????????????????????????????????????')
        console.debug(event.detail.error)
        console.debug(event.detail.error_description)
        Toaster.toast('???????????????????????????')
    });
    document.addEventListener('misskey_redirect_approved', async(event) => {
        console.debug('===== misskey_redirect_approved =====')
        console.debug(event.detail)
        // action??????????????????????????????????????????????????????
        for (let i=0; i<event.detail.actions.length; i++) {
            console.debug(event.detail.actions[i], (event.detail.params) ? event.detail.params[i] : null, event.detail.results[i])
            console.debug(`----- ${event.detail.actions[i]} -----`)
            console.debug((event.detail.params) ? event.detail.params[i] : null)
            console.debug(event.detail.results[i])
        }
        // ???????????????????????????????????????????????????????????????????????????????????????????????????client????????????API???????????????
        //const res = event.detail.client.toot(JSON.parse(event.detail.params[0]))
        // ????????????
        for (let i=0; i<event.detail.actions.length; i++) {
            /*
            if ('i' == event.detail.actions[i]) {
                const gen = new MisskeyProfileGenerator(event.detail.domain)
                document.getElementById('export-misskey').innerHTML = gen.generate(event.detail.results[i])
            }
            */
            if ('note' == event.detail.actions[i]) {
                const html = new Comment().misskeyResToComment(event.detail.results[i].createdNote, event.detail.domain)
                const comment = document.querySelector(`mention-section`).shadowRoot.querySelector(`#web-mention-comment`)
                comment.innerHTML = html + comment.innerHTML
            }
        }
    });
    document.addEventListener('misskey_redirect_rejected', async(event) => {
        console.debug('??????????????????????????????????????????????????????')
        console.debug(event.detail.error)
        console.debug(event.detail.error_description)
        Toaster.toast('???????????????????????????')
    });
    // ???????????????????????????
    const reciverMastodon = new MastodonRedirectCallbackReciver()
    await reciverMastodon.recive()
    const reciverMisskey = new MisskeyRedirectCallbackReciver()
    await reciverMisskey.recive()

    PartySparkleHart.setup()
    PartySparkleImage.setup()
    //await gen.generate()
    document.getElementById('get-address').dispatchEvent(new Event('click'))
    imgSz.show();
    //Loading.hide()
});
window.addEventListener('load', async(event) => {
    //Loading.hide()
})
