window.addEventListener('DOMContentLoaded', async(event) => {
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', async(isUnlocked) => { await init(); console.log(isUnlocked); })
          .on('addressChanged', async(address) => { await init(address); console.log(address); });
    } catch(e) { console.debug(e) }
    document.getElementById('party-confetti').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target,{
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
            //size: party.variation.range(1, 3),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti]`).checked = true
    })
    document.getElementById('party-confetti-star').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target,{
            shapes: ['star'],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-star]`).checked = true
    })
    document.getElementById('party-confetti-hart').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target,{
            shapes: ['hart'],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-hart]`).checked = true
    })
    document.getElementById('party-confetti-img').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target,{
            shapes: [document.getElementById('party-img-kind').value],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(30, 40),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-image]`).checked = true
    })
    document.getElementById('party-confetti-mix').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target,{
            shapes: ['square', 'hart', document.getElementById('party-img-kind').value],
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
        })
        document.querySelector(`input[type=radio][name=party][value=confetti-mix]`).checked = true
    })

    document.getElementById('party-sparkle-star').addEventListener('click', async(event) => {
        console.debug(party)
        party.sparkles(event.target,{
            lifetime: party.variation.range(2, 3),
            count: party.variation.range(30, 40),
            speed: party.variation.range(100, 500),
        })
        document.querySelector(`input[type=radio][name=party][value=sparkle-star]`).checked = true
    })
    document.getElementById('party-sparkle-hart').addEventListener('click', async(event) => {
        PartySparkleHart.animate(event.target) 
        document.querySelector(`input[type=radio][name=party][value=sparkle-hart]`).checked = true
    })
    document.getElementById('party-img-kind').addEventListener('change', async(event) => {
        document.querySelector(`#party-confetti-img > img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
        document.querySelector(`#party-sparkle-img > img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
        document.querySelector(`input[type=radio][name=party][value=confetti-image] + img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
        document.querySelector(`input[type=radio][name=party][value=sparkle-image] + img`).setAttribute('src', `./asset/image/monacoin/png/64/${event.target.value}.png`)
    })
    document.getElementById('party-sparkle-img').addEventListener('click', async(event) => {
        const kind = document.getElementById('party-img-kind').value
        const format = document.querySelector(`input[name=party-img-format][checked]`).value
        const size = document.getElementById('party-img-size').value
        const url = `./asset/image/monacoin/${format}${('png'==format) ? '/' + ((64 < size) ? 256 : 64) : ''}/${kind}.${format}`
        console.debug(kind, format, size, url)
        PartySparkleImage.animate(event.target, {src:url, size:size}) 
        document.querySelector(`input[type=radio][name=party][value=sparkle-image]`).checked = true
    })
    document.getElementById('party-img-size').addEventListener('change', async(event) => {
        const kind = document.getElementById('party-img-kind').value
        const format = document.querySelector(`input[name=party-img-format][checked]`).value
        const size = parseInt(event.target.value)
        PartySparkleImage.setup(format, size)
    })
    const table = new ImageTableHorizon() 
    document.getElementById('image-table').innerHTML = await table.make()
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
        if ('' == domain.trim()) { Toaster.toast(`インスタンスのドメイン名またはURLを入力してください。`, true); return; }
        if (await MisskeyInstance.isExist(domain)) {
            console.debug('指定したインスタンスは存在する')
            const authorizer = await MisskeyAuthorizer.get(domain, 'read:account')
            console.debug(authorizer)
            await authorizer.authorize(['i'], null)
        } else {
            Toaster.toast('指定したインスタンスは存在しません。', true)
        }
    });
    init()
    // mpurseアドレスのプロフィール情報を取得する
    //initForm()
    */
    document.addEventListener('mastodon_redirect_approved', async(event) => {
        console.debug('===== mastodon_redirect_approved =====')
        console.debug(event.detail)
        // actionを指定したときの入力と出力を表示する
        for (let i=0; i<event.detail.actions.length; i++) {
            console.debug(event.detail.actions[i], (event.detail.params) ? event.detail.params[i] : null, event.detail.results[i])
            console.debug(`----- ${event.detail.actions[i]} -----`)
            console.debug((event.detail.params) ? event.detail.params[i] : null)
            console.debug(event.detail.results[i])
        }
        // 認証リダイレクトで許可されたあとアクセストークンを生成して作成したclientを使ってAPIを発行する
        //const res = event.detail.client.toot(JSON.parse(event.detail.params[0]))
        // 独自処理（）
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
        console.debug('認証エラーです。認証を拒否しました。')
        console.debug(event.detail.error)
        console.debug(event.detail.error_description)
        Toaster.toast('キャンセルしました')
    });
    document.addEventListener('misskey_redirect_approved', async(event) => {
        console.debug('===== misskey_redirect_approved =====')
        console.debug(event.detail)
        // actionを指定したときの入力と出力を表示する
        for (let i=0; i<event.detail.actions.length; i++) {
            console.debug(event.detail.actions[i], (event.detail.params) ? event.detail.params[i] : null, event.detail.results[i])
            console.debug(`----- ${event.detail.actions[i]} -----`)
            console.debug((event.detail.params) ? event.detail.params[i] : null)
            console.debug(event.detail.results[i])
        }
        // 認証リダイレクトで許可されたあとアクセストークンを生成して作成したclientを使ってAPIを発行する
        //const res = event.detail.client.toot(JSON.parse(event.detail.params[0]))
        // 独自処理
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
        console.debug('認証エラーです。認証を拒否しました。')
        console.debug(event.detail.error)
        console.debug(event.detail.error_description)
        Toaster.toast('キャンセルしました')
    });
    // リダイレクト認証後
    const reciverMastodon = new MastodonRedirectCallbackReciver()
    await reciverMastodon.recive()
    const reciverMisskey = new MisskeyRedirectCallbackReciver()
    await reciverMisskey.recive()

    PartySparkleHart.setup()
    PartySparkleImage.setup()
});

