---
title: "OpenAIとCisco、Linux向けオープンソース防御ツール「Shirudo」を公開 — パッチが届くまでの間を守る"
datetime: "2026-11-25T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "盾で守られたLinuxサーバーのイラスト"
---

OpenAIとCiscoは11月23日、Linuxシステムを守るためのオープンソースのセキュリティツール「Shirudo（シルド）」を公開しました。重大な脆弱性が見つかってから正式なパッチが届くまでの「空白の期間」に、稼働中のシステムを止めずに一時的な防御を施すための仕組みです。日本語の「盾」が名前の由来です。

## 脆弱性が見つかってからパッチが届くまでの空白を埋める

脆弱性が公開されると、攻撃者はすぐにその欠陥を突こうとします。一方で、正式な修正パッチの作成・テスト・配布には時間がかかります。この間のシステムは無防備になりがちです。Shirudoは、Linuxカーネルの技術「eBPF」を使って、脆弱性のある処理だけを狙い撃ちでふさぐ小さな防御プログラム「シールド」を、サービスを再起動せずに読み込ませます。

シールドは暗号署名付きで配布され、TPM（ハードウェアのセキュリティチップ）で検証されてから読み込まれます。AIエージェントが脆弱性を調べ、シールドを作り、攻撃を防げるか検証する流れを想定して設計されており、最終的な適用は人間の管理者が判断します。

## 実証実験ではJava4Shellを阻止

公開時の実証では、AIが生成したシールドが、稼働中のElasticsearchサービスに対するJava4Shellの攻撃を、サービスを止めずに阻止できたとしています。Java4ShellはOpenJDKの脆弱性で、当サイトでも11月24日に記事化しています。ShirudoはCisco傘下のIsovalentが開発したTetragonを土台に、エージェント向けに作り直したもので、BSDライセンスでGitHubに公開されています。

## 出典・参考

- [New Shirudo tool uses AI to shield unpatched Linux systems from exploits（BleepingComputer）](https://www.bleepingcomputer.com/news/security/new-shirudo-tool-uses-ai-to-shield-unpatched-linux-systems-from-exploits/)
- [OpenAI and Cisco Unveil AI-Assisted Linux Security Tool to Block Exploits Before Patching（The Hacker News）](https://thehackernews.com/2026/11/openai-and-cisco-unveil-ai-assisted.html)

（サムネイル：生成イラスト）
