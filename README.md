<!-- File: README.md -->

# 記事帖

GitHub Pages向けの小さな記事サイトです。

フレームワークを使わず、HTML・CSS・JavaScriptで構成しています。
記事はYAML Front Matter付きMarkdownとして管理し、GitHub Actionsで検証・画像変換・静的サイト生成を行います。

## 主な機能

- 日時の新しい順・古い順による並べ替え
- タグのOR検索
- 日本時間の日付による開始日・終了日の絞り込み
- 18件ずつの段階的なDOM追加
- Markdown、KaTeXによる数式表示
- DOMPurifyによるサニタイズ
- カード用・記事用WebPサムネイルの生成
- サムネイルがない場合のCSSプレースホルダー
- 記事・タグ・画像のビルド時検証
- プロジェクト配下への配置に対応した相対パス

詳しい仕様は`SPECIFICATION.md`、Museへの指示は`AGENTS.md`を参照してください。

## 必要な環境

- Node.js 24以降
- npm
- GitHub Pagesを利用できるGitHubリポジトリ

ZIP作成用スクリプトを実行した場合、`package-lock.json`も生成されます。
このファイルはリポジトリへコミットしてください。

## GitHub Pagesへの公開

1. このディレクトリの中身を、リポジトリのルートへ配置します。
2. デフォルトブランチを`main`にします。異なる場合はワークフローを変更してください。
3. GitHubのリポジトリ設定で、PagesのSourceを「GitHub Actions」にします。
4. `main`へpushします。
5. `Build and deploy Pages`ワークフローの完了を確認します。

ユーザー名・リポジトリ名・公開URLの埋め込みは不要です。

`dist`はActions内で生成され、Pagesのアーティファクトとして直接デプロイされます。
生成物をコミットする必要はありません。

## ローカル確認

    npm ci
    npm test
    npm run build
    npm run preview

[ローカルプレビュー](http://127.0.0.1:4173/preview/)を開きます。

プレビューは意図的に`/preview/`配下で配信し、GitHub Pagesのプロジェクトサイトに近いパス条件を再現します。
ソースのHTMLをファイルとして直接開く方法には対応していません。

## 記事を追加する

`data/articles`へ、`YYYYMMDD-slug.md`という名前で追加します。

    ---
    title: "記事タイトル"
    datetime: "2026-10-28T18:00:00+09:00"
    tags:
      - tech
      - math
    thumbnailAlt: "画像の説明"
    ---
    ここからMarkdown本文。

同じstemの画像を`data/thumbnails`へ追加すると、サムネイルとして使用します。
例えば記事が`20261028-example.md`なら、画像は`20261028-example.png`などです。

タグ・画像・画像の説明は省略できます。

- タグが未指定・空の場合は`others`
- 画像がない場合はプレースホルダー
- 画像があり、説明が空の場合は記事タイトル

同じ記事に複数の画像拡張子を用意すると、曖昧さを避けるためビルドが失敗します。

追加・変更後は以下を実行してください。

    npm test
    npm run build

## タグを追加する

`data/tags.json`へ`id`と`label`の組を追加します。
スキーマやJavaScriptの変更は不要です。

内部識別には常に`id`を使用します。
既存記事が使っているタグを削除するとビルドが失敗します。
フォールバック用の`others`は削除できません。

## 数式

インライン数式はドル記号1個、独立した数式はドル記号2個で囲みます。

    インラインの例: $a^2 + b^2 = c^2$

    $$
    \int_0^1 x^2\,dx = \frac{1}{3}
    $$

独立した数式の開始・終了記号は、それぞれ単独の行へ記述してください。

Markdown内の生HTMLは無効です。
数式やMarkdownの変換結果にもサニタイズを適用します。
外部CDNは使わず、必要なJavaScript・CSS・フォントをビルド結果へ含めます。

## サイト名を変更する

`index.html`、`article.html`および`app/scripts/common.js`の`SITE_TITLE`を変更してください。

## 同梱サンプル

- `20261028-math-note.md`: 数式・画像あり。Alt省略時のタイトルへのフォールバックも確認できます。
- `20261027-first-note.md`: タグ・画像なし。

不要なら、対応する画像も含めて削除してください。

## 注意事項

- 記事日時が未来でも公開対象になります。予約公開機能はありません。
- 本文中の相対リンクは、公開サイトのルートにある`article.html`を基準に解決されます。
- 記事タイトルや本文はブラウザーで描画します。記事別のサーバー生成OGPはありません。
- 同一パスへの上書きが完了した後の作業ツリーだけでは、上書き前の内容は検出できません。
- 意味的な記事の重複は自動判定しません。Muse側の事前確認も必要です。
- 公開リポジトリへ認証情報や非公開情報を保存しないでください。

## 参考

- [GitHub Pagesでのカスタムワークフローの利用](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [KaTeXのオプション](https://katex.org/docs/options)
- [DOMPurify](https://github.com/cure53/DOMPurify)
