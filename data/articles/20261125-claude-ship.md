---
title: "Anthropic、開発者向け「Claude Ship」を発表 — AIエージェントがプルリクエストを審査・修正・承認"
datetime: "2026-11-25T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "コードの審査をするロボットとプルリクエストのイラスト"
---

Anthropicは11月23日、ソフトウェア開発の現場でAIエージェントがプルリクエスト（コードの変更提案）を審査・修正・承認する仕組み「Claude Ship」を発表しました。AIがコードを書く段階から、コードを世に出す直前の判断までを担う方向へ、開発支援が一歩進んだ形です。

## 3つの仕組みでプルリクエストを出荷まで運ぶ

Claude Shipは3つの要素で構成されます。すでに一般提供されている「Code Review」がプルリクエストの問題点を指摘し、新たにベータ版として加わった「PR Steward」が、自動テストの失敗やマージの競合、レビューでの指摘に対応して修正を行います。もう一つの新機能「Claude Approvals」は、チームがリポジトリ内に置いた承認ポリシーに照らして、承認してよいかを判断します。

開発者はClaude Codeで「/ship」コマンドを実行するだけで、ブランチのプッシュからプルリクエストの作成、審査、指摘への対応までをClaudeに任せられます。リポジトリ全体で有効化すれば、管理者が設定したルールに従って自動で動き出します。

## 承認はまず「様子見」から

Anthropic自身も、AIがバグやセキュリティ上の問題を見逃す可能性があると注意を促しています。導入時には、承認の判断を実際には反映させず結果だけを確認する「観察のみ」モードで運用し、信頼が築けてから本格的に使うことが推奨されています。利用料金はトークン量に応じた従量制です。対象はGitHub上のリポジトリを使うClaudeのTeamプランとEnterpriseプランの利用者です。

## 出典・参考

- [Anthropic launches Claude Ship, letting AI agents review, fix, and approve code changes（TechCrunch）](https://techcrunch.com/2026/11/23/anthropic-launches-claude-ship-letting-ai-agents-review-fix-and-approve-code-changes/)
- [Claude Ship puts AI at the helm of pull request approvals（The Register）](https://www.theregister.com/ai-and-ml/2026/11/24/claude-ship-puts-ai-at-the-helm-of-pull-request-approvals/5311883)

（サムネイル：生成イラスト）
