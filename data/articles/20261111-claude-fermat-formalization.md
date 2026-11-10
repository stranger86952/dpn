---
title: "フェルマーの最終定理をAIエージェント1000体が30時間で形式化 — Anthropic、Claude Fable 5.2を発表"
datetime: "2026-11-11T05:10:00+09:00"
tags:
  - math
  - tech
thumbnailAlt: "フェルマーの最終定理の式と古い原稿、コンピュータのイラスト"
---

Anthropicは2026年11月9日、新型モデル「Claude Fable 5.2」と「Claude Mythos 5.2」を発表しました。発表に合わせて同社は、Fable 5.2のエージェント1,000体がフェルマーの最終定理の証明を、定理証明支援系「Lean」でわずか30時間で形式化したと報告しました。

## 「形式化」とは何か

形式化とは、数学の証明をコンピュータが1行ずつ検証できる言語で書き直す作業です。フェルマーの最終定理は、1995年にアンドリュー・ワイルズ氏が証明した定理で、「$n$ が3以上の整数のとき、$a^n + b^n = c^n$ を満たす正の整数 $a, b, c$ は存在しない」というものです。今回の取り組みは新しい証明ではなく、ワイルズ氏の証明をコンピュータが検証できる形に書き直したものです。

形式化が難しいのは、証明のすべての行間を埋めなければならないからです。人間が「明らか」と飛ばす部分も、コンピュータには1つずつ示す必要があります。だからこそ、定理の形式化は長らく大規模な共同作業でした。

## 30時間で何が起きたのか

Anthropicによると、1,000体のFable 5.2エージェントがチームを組み、GitとSQLで作業を分担しながら、28.7時間で最終定理の形式化を完了しました。Leanの公式チェッカーが証明を通したといいます。9月に行われた初回の形式化では、未公開の研究モデルで11日間、約1,300万行のLeanコード、約60億トークンを要しました。今回は行動トークンが約3分の1になり、証明のテキストは7分の1の長さに短縮されたとされています。

同じ設定でClaude Opus 5.5に取り組ませたところ、18時間で26%しか進まず、その後はほとんど前進しなかったといいます。

## 注意すべき点

発表の数字をそのまま受け取るには注意が必要です。エージェントは白紙から始めたわけではなく、証明すべき60の命題と1文の道筋の概略、定義、そして初回の形式化で証明済みの47の補題を与えられていました。Anthropicの発表資料は「最小限の指示から始めた」とも説明していますが、詳細な技術記事を読むと、出発点は9月の取り組みとは異なっていたことが分かります。

また、形式化の成果はLeanのチェッカーを通っていますが、外部の数学者による独立した検証はまだ公表されていません。なお、この形式化は、インペリアル・カレッジ・ロンドンのケヴィン・バザード氏が率いる人間主導のプロジェクトの成果を土台にしています。

## モデル自体について

Fable 5.2とMythos 5.2は同じ基盤モデルで、Fableはサイバーセキュリティと生物学の安全対策を備えて全ユーザーに開放され、Mythosは審査を通過した組織に限定されます。料金は入力100万トークンあたり8ドル、出力100万トークンあたり40ドルです。ベンチマークでは、Artificial AnalysisのIntelligence Index v5で65点を記録し、首位となりました。

## 出典・参考

- [Claude Fable 5.2 and Mythos 5.2 Cut Prices（technology.org）](https://www.technology.org/2026/11/10/claude-fable-5-2-mythos-5-2-fermat-last-theorem-pricing/)
- [Claude Fable 5.2 AI Agents Rebuild Fermat's Last Theorem Proof in 30 Hours, Starting With 47 Lemmas（TechTimes）](https://www.techtimes.com/articles/330361/20261110/claude-fable-52-ai-agents-rebuild-fermats-last-theorem-proof-30-hours-starting-47-lemmas.htm)
- [Anthropic's 1,000 Fable 5.2 Agents Formalize Fermat in 30 Hours（AI Weekly）](https://aiweekly.co/alerts/anthropics-1000-fable-52-agents-formalize-fermat-in-30-hours)

（サムネイル：生成イラスト）
