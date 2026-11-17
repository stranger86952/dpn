---
title: "Optimizelyの脆弱性を突かれ、BBCやCNNなど178組織のサイトが来訪者にマルウェアを配信 — 「OPTIMJACK」"
datetime: "2026-11-18T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "ウェブサイトのコードに紛れ込んだ悪意あるスクリプトを警告する盾のイラスト"
---

ウェブサイトの表示テストなどに使われるサービス「Optimizely」の脆弱性が突かれ、11月16日、BBC、CNN、Zoom、セールスフォース、HSBCなど178の組織のウェブサイトが、訪れた人にマルウェアを配る状態になりました。セキュリティー企業のReport URIの調査で判明し、攻撃は「OPTIMJACK」と名付けられました。

## サプライチェーン攻撃とは

今回の手口は「サプライチェーン攻撃」と呼ばれるものです。攻撃者は標的のサイトそのものを直接破るのではなく、多くのサイトが共通して使っている外部サービスを乗っ取り、そこから悪意のあるコードをばらまきます。部品の供給元を汚染すれば、完成品すべてに毒が回るのと同じ仕組みです。

Optimizelyは、企業がウェブサイトの見た目や文言を試す「A/Bテスト」などに使うサービスで、顧客のサイトはOptimizelyのサーバーから配信されるJavaScript（`cdn.optimizely.com`）を読み込んでいます。攻撃者はOptimizelyの「Experimentation」アカウントの登録手続きの脆弱性を悪用し、顧客のプロジェクトに悪意のあるJavaScriptを書き込みました。コードはOptimizely自身の証明書付きで配信されたため、サイト側は正規のものとして受け入れてしまいました。

## 被害の規模と中身

Report URIの創設者スコット・ヘルム氏らの調査によると、調べた1,611件のOptimizelyのスクリプトのうち188件に悪意のあるコードが含まれ、178の組織に及びました。BBC、CNN、フォックス・ニュース、Zoom、セールスフォース、GitLab、IKEA、HSBC、エクイファックス、エールフランス-KLM、ハードウェアウォレット大手のLedger、Peacockなどが含まれ、Optimizely自身のサイトとログインページも汚染されていました。

悪意のあるコード（`track.js`、約30KB）は当日に26回も書き換えられ、次のような機能を持っていました。

- **仮想通貨の送金先すり替え**：8つのブロックチェーンで、送金先のウォレットアドレスを攻撃者のものに置き換える
- **カード情報の抜き取り**：サイトの決済フォームに入力されたカード情報を盗む
- **Cookieや画面スクリーンショットの窃取**
- **iPhone・iPadへの攻撃**：古いiOSには「Coruna」、iOS 18には「DarkSword」というエクスプロイトキット（脆弱性を突く攻撃ツール集）へ誘導する

最初の注入は11月16日4時21分（UTC）にBBCのスクリプトで確認され、コードは約13時間にわたって配信されました。ブロックチェーンの記録から確認された仮想通貨の被害は約7,000ドル（約110万円）でしたが、盗まれたカード情報などの全体像はまだ分かっていません。

## 対応と現状

Optimizelyは11月16日夜に障害情報を出し、脆弱性を修正し、注入されたコードを除去し、影響を受けたアカウントを保護したと発表しました。11月17日21時52分（UTC）までに、残っていたのはトークトーク（TalkTalk）1社のみとなりました。ただし、脆弱性の技術的な詳細や、登録手続きの弱点が既存の顧客プロジェクトへの書き込みにどうつながったかは公表されておらず、CVE番号もまだ割り当てられていません。攻撃者の特定もされていません。

16日にこれらのサイトを訪れた人は、iPhoneやiPadのOSを最新にすること、カードの利用明細を確認すること、仮想通貨の送金を行った場合は送金先アドレスが意図したものだったか確かめることが推奨されています。

## 出典・参考

- [Optimizely hack turns world's biggest websites into malware dispensers（The Register）](https://www.theregister.com/cyber-crime/2026/11/17/optimizely-hack-turns-worlds-biggest-websites-into-malware-dispensers/5310448)
- [Optimizely Supply Chain Attack: Anatomy of OPTIMJACK (2026)（The CyberSec Guru）](https://thecybersecguru.com/news/optimizely-supply-chain-attack-optimjack/)
- [Optimizely Supply Chain Attack Hits 178 Organizations' Sites（BreachNews）](https://breachnews.com/cyber-attacks/optimizely-supply-chain-attack-malicious-javascript/)
- [Optimizely hack turns 178 sites, including Ledger（Minrk）](https://www.minrk.com/article/optimizely-hack-hits-178-sites-including-ledger)

（サムネイル：生成イラスト）
