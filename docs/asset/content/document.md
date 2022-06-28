# 投げモナボタン

　これは[Mpurse][]を使って暗号通貨モナコインを指定したアドレスに送金するためのボタンです。

[Mpurse]:https://github.com/tadajam/mpurse

## 作成元

　これは[Mpurseを使ったモナコイン送金ボタンを生成する][]で作成されました。

[Mpurseを使ったモナコイン送金ボタンを生成する]:https://ytyaru.github.io/Html.Mpurse.Send.Button.Generator.20220626095139/

　ダウンロードしたソースコードや画像ファイルはご自由にお使いください。

## 使用方法

### HTTPS

　このボタンで投げモナするにはHTTPSサーバにアップする必要があります。[Mpurse][] APIの仕様です。

### タグ

　`<mpurse-send-button>`タグで投げモナボタンを作れます。

属性|意味|例|補足
----|----|---|----
`to`|送金先アドレス|`MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu`|
`amount`|送金額|`0.11411400`|
`asset`|通貨|`MONA`, `XMP`|
`memo`|メモ|`Good job!`|
`ok`|送金後メッセージ|`投げモナしました！\nありがとうございます！（ ´∀｀）`|
`cancel`|送金中止メッセージ|`キャンセルしました(´・ω・｀)`|
`base-url`|画像参照ベースURL|`./asset/image/monacoin/`|`src`がないとき`src-id`で内蔵画像を参照するときに使う
`format`|画像フォーマット|`svg`, `png`|`src`がないとき`src-id`で内蔵画像を参照するときに使う
`src`|画像ソース|`https://img.png`|指定したURLを参照する。`src-id`より優先される
`src-id`|画像識別子|`coin-monar`|`src`がないとき`src-id`で内蔵画像を参照するときに使う
`size`|画像サイズ|`64`|
`title`|title属性値|`投げモナする`|
`alt`|alt属性値|`投げモナする`|
`party`|送金後アニメ|[party][]参照|[party.js][]を使用した
`party-src`|送金後アニメ画像|`https://img.png`|`party-src-id`より優先される。`sparkle-img`でのみ使用可能。`confetti-img`では使えない
`party-src-id`|送金後アニメ内蔵画像|`coin-monar`|
`party-size`|送金後アニメ画像サイズ|`32`|

[party.js]:https://party.js.org/
[party]:#party

<a id="party"></a>

#### [party](#party)

値|意味
---|----
`no`,`none`,`off`|アニメなし
`confetti`,`confetti-square`|クラッカー（デフォルト）
`confetti-star`|クラッカー（★）
`confetti-hart`|クラッカー（♥）
`confetti-img`|クラッカー（`party-src-id`,`party-size`で指定した画像）
`confetti-mix`|クラッカー（★♥指定画像の混合）
`sparkle`,`sparkle-star`|飛び散る（★）
`sparkle-hart`|飛び散る（♥）
`sparkle-img`|飛び散る（`party-src`,`party-src-id`,`party-size`で指定した画像）

<a id="inner-img"></a>

#### [内蔵画像](#inner-img)

//-----inner-img-table-----//

#### 他

　詳しくはHTMLソースコードをご覧ください。

