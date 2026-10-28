<!-- File: SPECIFICATION.md -->

# 仕様書

## 1. 構成

ソースと生成物を分離する。

### ソース

- `index.html`
- `article.html`
- `app/scripts/index.js`
- `app/scripts/article.js`
- `app/scripts/markdown.js`
- `app/scripts/common.js`
- `app/styles/index.css`
- `app/styles/article.css`
- `app/styles/common.css`
- `data/tags.json`
- `data/articles/YYYYMMDD-slug.md`
- `data/thumbnails/YYYYMMDD-slug.拡張子`
- `schemas/article.schema.json`
- `scripts/content.mjs`
- `scripts/build.mjs`
- `scripts/serve.mjs`
- `tests/site.test.mjs`
- `.github/workflows/pages.yml`

### 生成物

すべて`dist`配下へ出力する。

- `index.html`
- `article.html`
- `app/scripts`内のブラウザー用JavaScriptおよび共有チャンク
- `app/styles`内のCSS
- `data/index.json`
- `data/tags.json`
- `data/articles/ID.md`
- `assets/thumbnails/card/ID.webp`
- `assets/thumbnails/article/ID.webp`
- `assets/vendor/katex`内のCSS・フォント
- `assets/licenses`内の依存ライブラリのライセンス
- `.nojekyll`

生成後のMarkdownにはFront Matterを含めない。
記事メタデータは`data/index.json`へ集約する。
ブラウザーではYAMLを解析しない。

生成物はコミットせず、Pagesのアーティファクトとしてデプロイする。

## 2. 記事ファイルと識別子

- 記事は`data/articles`直下に置く。サブディレクトリは認めない。
- 拡張子は小文字の`.md`とする。
- ファイル名は`YYYYMMDD-slug.md`とする。
- slugは小文字ASCII英数字と、単語間のハイフンのみ。
- IDは拡張子を除いたファイル名そのものとする。
- IDの長さは120文字以内。
- ファイル名の日付は実在する日付でなければならない。
- ファイル名の日付は`datetime`を日本時間へ変換した日付と一致させる。
- 記事ファイルの上限は1 MiB。
- UTF-8を使用する。BOMとCRLFは読み込み時に正規化する。

### 重複の定義

以下はビルドエラーとする。

1. 同じID
2. 日付が異なるものも含む同じslug
3. 改行コード・Unicode NFC・本文前後の空白を正規化した本文の一致
4. 同じ記事IDに対応する複数のサムネイル

同じタイトルだけでは重複と判定しない。

意味的な重複はMuseが確認する。
既存ファイルを上書きした履歴は、現在のファイルだけでは検出できない。
したがって、Museには既存ファイルの無断上書きを禁止する。

## 3. Front Matter

ファイル先頭の`---`から、次の独立した`---`行までをYAMLとして解析する。

- YAML 1.2を使用する。
- 重複キー、未解決のタグ、エイリアス展開は認めない。
- 未定義のFront Matterプロパティは認めない。
- 本文は空にできない。

### title

- 必須の文字列
- 1〜200文字
- 空白のみは不可
- 前後の空白を除去して使用

### datetime

- 必須の文字列
- 秒まで含むRFC 3339形式
- タイムゾーンの明示が必須
- 小数秒は使用可能
- `Z`またはオフセットを使用する
- 表示と日付フィルターの基準は常に`Asia/Tokyo`
- ソートは日付文字列ではなく、実際の時刻で比較する
- 未来の日時も公開対象とする

### tags

- 省略、null、空文字列、空白文字列、空配列は`others`へ正規化する
- 非空の場合はタグIDの配列
- 配列内の同じIDの重複は禁止
- `data/tags.json`に存在しないIDは禁止
- タグの表示順は記事に記述した順序を維持する

### thumbnailAlt

- 任意の文字列またはnull
- 最大500文字
- 未指定・空白のみの場合は記事タイトルへフォールバックする
- 対応する画像がない場合は使用しない

### thumbnailプロパティ

使用しない。
画像はファイル名の一致によって自動検出する。

## 4. タグレジストリ

`data/tags.json`は、`id`と`label`だけを持つオブジェクトの配列とする。

- IDは小文字ASCII英字で始め、小文字英数字とハイフンのみを使用する
- IDは40文字以内
- labelは空白のみを認めず、80文字以内
- 同じIDの重複は禁止
- `others`は必須
- 画面上のタグ選択肢はレジストリの順序に従う

タグ追加時にスキーマやアプリのコードを変更する必要はない。
レジストリとの整合性はビルド時に動的に検証する。

初期タグは以下とする。

- news / ニュース
- tech / 情報
- math / 数学
- geography / 地理
- trend / トレンド
- youtube / YouTube
- roots / ルーツ
- anime / アニメ
- others / その他

## 5. サムネイル

- `data/thumbnails`直下に置く
- 記事とstemを一致させる
- 対応する記事のない画像は禁止
- 対応拡張子はjpg、jpeg、png、webp、avif、gif、tif、tiff
- 画像拡張子の大文字・小文字は区別しない
- SVGは対象外
- 1ファイル20 MiB以下
- 展開時の入力画素数上限は40,000,000
- アニメーションは先頭フレームのみ使用する
- EXIF Orientationを適用する
- 出力時には元画像のメタデータを保持しない

### カード用

最大640×360、中央基準のcover、WebP品質80。
小さい画像を拡大しない。
画面上では16:9の枠にobject-fit: coverで表示する。

### 記事用

最大1600×1200、縦横比維持、トリミングなし、WebP品質86。
小さい画像を拡大しない。

### 画像なし

画像ファイルは生成しない。
HTMLとCSSによるプレースホルダーを表示する。
画像の読み込みが失敗した場合にもプレースホルダーへ切り替える。

## 6. 一覧画面

- 初期状態は全タグ・日付制限なし・新しい順
- ソートは新しい順と古い順の2種類だけ
- 同一時刻の場合はIDの昇順で順序を固定する
- 複数タグはOR検索
- タグ未選択の場合は全タグを対象とする
- タグ条件と日付条件はANDで結合する
- 開始日と終了日はそれぞれ省略可能
- 開始日・終了日は両端を含む
- 終了日の比較にブラウザーのタイムゾーンを使用しない
- 開始日が終了日より後の場合はエラーを表示する
- 一度のDOM追加は18件まで
- IntersectionObserverで追加表示し、ボタンによる追加表示も可能とする
- フィルター変更前の追加描画処理は無効化する
- 条件をURLのtag、from、to、sortへ反映する
- tagは同じクエリキーの繰り返しで表す
- URLの未知のタグや不正な日付は初期化時に無視する

## 7. 記事画面

- `article.html?id=ID`で記事を指定する
- IDの書式を検証し、生成済みインデックスとの一致を確認する
- IDから任意のパスを読み込ませない
- メタデータはtextContent等のDOM APIで表示する
- 本文のMarkdownだけを専用パーサーへ渡す
- 記事のタグから、そのタグで絞り込んだ一覧へ移動できる
- 不正ID、存在しないID、通信失敗を区別して表示する
- JavaScriptが無効な環境には説明を表示する

## 8. Markdownと安全性

- MarkedでMarkdownを解析する
- marked-katex-extensionとKaTeXを使用する
- インライン数式はドル記号1個で囲む
- ブロック数式は独立したドル記号2個の行で囲む
- コード内の数式表現は数式として変換しない
- 生HTMLは無効とする
- KaTeXのtrustはfalse
- KaTeXの展開回数とサイズに上限を設ける
- 変換結果をDOMPurifyでサニタイズする
- KaTeXに必要な安全なSVGとMathMLを維持する
- JavaScript URL、フォーム、iframe、実行可能な要素等を許可しない
- 本文画像は同一オリジンまたはHTTPSに限定する
- 外部画像にはno-referrerを指定する
- 外部HTTP/HTTPSリンクは別タブで開き、noopenerとnoreferrerを付ける
- 本文中の相対URLは公開ルートのarticle.htmlを基準とする

HTMLのCSPも設定する。
KaTeXが必要とするインラインスタイルのみ、CSP上は許容する。
生HTMLは無効なため、記事から任意のstyle属性を直接入力することはできない。

## 9. ビルドとデプロイ

- Node.js 24をCIで使用する
- npm ciでロックファイルに基づいて依存関係を導入する
- テスト後にビルドする
- 記事・タグ・画像に問題があれば非ゼロ終了する
- ビルドは一時ディレクトリで行い、成功後にdistへ置き換える
- JavaScriptはES Modulesとしてバンドルする
- 外部CDNには依存しない
- ソースマップは公開しない
- PRでは検証・ビルドだけを実行する
- mainへのpushまたはmain上での手動実行時だけデプロイする
- GitHub Pagesの公開元設定はGitHub Actionsとする

## 10. 対象外

- 全文検索
- コメント
- ログイン
- サーバー側処理
- 予約公開
- 記事別のサーバー生成OGP
- Markdownファイルへの任意の生HTML埋め込み
- 意味的重複の自動判定
