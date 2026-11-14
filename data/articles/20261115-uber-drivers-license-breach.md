---
title: "Uber運転手の免許証情報が流出 — AIクラウドFireworks AIの認証情報が悪用され数千人分"
datetime: "2026-11-15T05:10:00+09:00"
tags:
  - tech
thumbnailAlt: "スマートフォンと鍵のアイコンで情報漏洩を表すイラスト"
---

配車サービス大手のUberは11月13日、運転手の個人情報が流出したと明らかにしました。Uberのシステムそのものではなく、Uberが利用していた外部のAIクラウド企業「Fireworks AI」の認証情報が悪用され、Uberのデータに不正にアクセスされたものです。流出した情報には運転免許証の情報が含まれています。

## 漏洩の経緯

カリフォルニア州司法長官のサイトに掲載されたUberの通知によると、経緯は次のとおりです。

- 10月7日：不正アクセスが発生（届け出上の漏洩日）
- 10月9日：Fireworks AIが、社内の認証情報が漏洩し、第三者がUberのアカウントにアクセスしたとUberに報告
- 10月13日：調査の結果、認証情報を使ってUberのデータにアクセスされたことが確認される
- 11月10日：Uberが通知書を提出、対象者への連絡を開始

UberはFireworks AIとのデータ接続を切断し、調査を進めています。Uberの広報は、関わった業者がFireworks AIであることをTechCrunchに認めました。Fireworks AIは、企業がオープンなAIモデルを動かしたり調整したりするためのプラットフォームを提供しています。

## 漏洩した情報と規模

TechCrunchが確認した通知によると、流出した情報には運転免許証の番号、氏名、生年月日などが含まれています。州ごとの届け出では、マサチューセッツ州で2,567人、サウスカロライナ州で3,430人、ロードアイランド州で約1,873人が対象で、判明しているだけでも少なくとも7,870人に上ります。カリフォルニア州やイリノイ州の対象者もいますが、全米での総数は公表されていません。

Uberは、現時点で情報の悪用は確認されていないとしています。対象者には、クレジットモニタリングと不正利用への対応支援を無料で提供するとしています。

## なぜ重要なのか

今回の件は、AIサービスを提供する外部業者に預けたデータが、その業者の認証情報の漏洩を通じて流出するという、サプライチェーン（供給網）型の情報漏洩です。攻撃者が狙ったのはソフトウェアの脆弱性ではなく、漏れたログイン情報でした。企業が外部サービスに機密データを預ける場合、その業者のセキュリティが自社のセキュリティと直結することを示す事例です。

出典：[Uber says US drivers' license data stolen in data breach — Reuters](https://www.reuters.com/business/uber-says-us-drivers-license-data-stolen-data-breach-2026-11-13/)、[Uber confirms data breach that stole thousands of drivers' information — Neowin](https://www.neowin.net/news/uber-confirms-data-breach-that-stole-thousands-of-drivers-information/)、[Uber Data Breach Exposes Thousands of Drivers' License Records in Fireworks AI Attack — CyberPress](https://cyberpress.org/uber-data-breach-fireworks-ai-attack/)
