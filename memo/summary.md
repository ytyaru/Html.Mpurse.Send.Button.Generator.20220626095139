# Mpurseを使ったモナコイン送金ボタンを生成する

## 前回まで

* https://ytyaru.github.io/Html.MonaCoin.Button.Component.Generator.Slim.20220531090526/

### 前回までの課題

* PNGしか使えない（SVGが使えない）
* SVGのCSSによるcolor-schemeでlight/dark変色ができない
* light/darkの使用是非を指定できない
* SVGの色を指定できない
* [他の画像候補][モナコインのアイコンを作った]が使えない
* 画像URL指定時に、Base64関連の不要コードが残ってしまう

[モナコインのアイコンを作った]:https://ytyaru.github.io/MonaCoin.Icon.20220521092535/

# 今回

```
アドレス          [          ]
金額              [          ]アセット[       ]
メモ              [          ]
失敗メッセージ    [          ]
成功メッセージ    [          ]
成功後Party       有／無
画像
　形式　PNG／SVG／両方（PNGをフォールバックにする）
　種別
　　デフォルト　　[           ]　サイズ　[       ]16,32,64,128,256
　　内蔵
        coin-mark-black
        coin-mark-gold
        mark-outline
        mark
        coin-monar-mouth-red
        coin-monar
        coin-mini-monar-mouth-red
        coin-mini-monar
        monar-mark-gold
        monar-mark
        monar-mouth-red
        monar
        monar-no-face
        monar-transparent
　　　サイズ：64,256,両方
　SVG
　　light/dark　有／無（`<object>`／`<img>`）
　パス
　　./asset/image/monacoin/
```

## 初期値をセットする

* アドレス
* 金額
* メモ
* アセット
* 成功メッセージ
* 失敗メッセージ
* 画像形式
* 画像種別
* 画像サイズ

　`<mpurse-send-button>`の属性で指定できる。省略すると、ここで指定した値がセットされる。自分のアドレスを指定しておくとデフォルトがそれになる。もし個別にセットしたければ各属性値を使う。

## 画像

### 形式

形式|戦略
----|----
PNG|表示できる環境が多い。
SVG|ファイルサイズが小さく、拡大縮小が綺麗
SVG+PNG|SVGで表示できる環境ならそれを使い、そうでないならPNGで表示する

### 種別

* どの画像をデフォルトにするか
* どの画像を内蔵するか

　内蔵画像は各種ファイルとしてダウンロードする。それを参照することで表示する。

## 画像サイズ

* デフォルト画像サイズ
* 内蔵する画像のファイル
    * 64
    * 256

