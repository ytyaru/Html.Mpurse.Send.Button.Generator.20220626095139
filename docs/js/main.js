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
    })
    document.getElementById('party-sparkle-star').addEventListener('click', async(event) => {
        console.debug(party)
        //party.sparkles(event.target)
        /*
        party.sparkles(event.target,{
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
            //size: party.variation.range(1, 3),
        })
        */
        party.sparkles(event.target,{
            lifetime: party.variation.range(2, 3),
            count: party.variation.range(30, 40),
            speed: party.variation.range(100, 500),
            //size: party.variation.range(1, 3),
        })
    })
    //PartySparkleHart.setup(document.getElementById('party-sparkle-hart')) 
    document.getElementById('party-sparkle-hart').addEventListener('click', async(event) => {
        PartySparkleHart.setup(event.target) 
    })
    document.getElementById('party-sparkle-monar').addEventListener('click', async(event) => {
        PartySparkleMonar.setup(event.target) 
    })

    /*
    //party.resolvableShapes["monar"] = `<img src="./asset/image/monacoin/svg/monar.svg" width="32" height="32"></img>`
    //party.resolvableShapes["monar"] = fetch(`./asset/image/monacoin/svg/monar.svg`).then(res=>res.text().then(txt=>txt))
    let res = await fetch(`./asset/image/monacoin/svg/monar.svg`)
    let svg = await res.text()
    party.resolvableShapes["monar"] = svg
    console.debug(party.resolvableShapes)
    document.getElementById('party-sparkle-monar').addEventListener('click', async(event) => {
        //PartySparkleMonar.setup(event.target) 
        party.confetti(event.target,{
            shapes: ['monar'],
            lifetime: party.variation.range(4, 5),
            count: party.variation.range(30, 40),
            speed: party.variation.range(100, 500),
            size: party.variation.range(0.2, 0.2),
        })
    })
    */

    /*
    document.getElementById('party-confetti-simple').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target)
    })
    document.getElementById('party-confetti-custom').addEventListener('click', async(event) => {
        console.debug(party)
        party.confetti(event.target,{
            lifetime: party.variation.range(5, 7),
            count: party.variation.range(80, 100),
            speed: party.variation.range(100, 700),
            //size: party.variation.range(1, 3),
        })
    })
    */
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
});

