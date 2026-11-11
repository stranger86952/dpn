---
title: "AIが量子回路を設計、資源を最大39分の1に — ハーバード・Anthropic・QuEraの共同研究"
datetime: "2026-11-12T05:03:00+09:00"
tags:
  - tech
thumbnailAlt: "AIによって簡略化される量子回路のイラスト"
---

ハーバード大学、Anthropic、量子コンピューター企業のQuEra Computingは、AI（大規模言語モデル）を使って量子回路の設計を効率化する研究を発表しました。2026年11月10日にQuEraが公表したもので、化学計算や最適化などに使う基本的な計算ブロック8種類のうち7種類で、ゲート数と量子ビット数の両方を削減できました。最大の例では、資源の指標が約39分の1になりました。

## 量子回路の「資源」とは何か

量子コンピューターで計算をするには、「量子回路」と呼ばれる手順書が必要です。回路は量子ビット（量子の情報の単位）を操作する「ゲート」の集まりでできています。

実用的な量子コンピューターでは、誤りを訂正するために多数の物理量子ビットを組み合わせて1つの「論理量子ビット」を作る必要があり、ゲート数も量子ビット数も多いほど、計算は難しくなります。つまり、同じ計算をより少ないゲートと量子ビットで実行できれば、実用化がぐっと近づきます。

## 研究の内容

研究チームはAnthropicのClaudeに、回路を生成するプログラムを提案させ、自動評価プログラムが正しさを検証して資源量を採点する仕組みで探索を行いました。論文は「Discovering state-of-the-art quantum circuits with large language models」（arXiv:2610.22367）で、著者はAnthropicのSTEMフェローであるアンディ・グー氏らです。

最も大きな改善は「固定小数点ガウス関数」という計算ブロックで、トフォリゲート（量子計算の基本操作の一つ）が約2万4,000個から1,583個へ、量子ビットが362個から139個へと減り、両者を掛け合わせた資源指標は約39.5分の1になりました。

## 注意点

この成果は、あくまで個々の計算ブロックの「資源の見積もり」を改善したもので、実際の量子コンピューター上で計算が速くなったわけではありません。また、暗号の安全性が脅かされたわけでもありません。とはいえ、将来の誤り訂正型量子コンピューターで何ができるかを広げる、アルゴリズム設計の進展として注目されます。

## 出典・参考

- [Harvard, Anthropic and QuEra Reduce Quantum Circuit Resource Needs with AI（HPCwire）](https://www.hpcwire.com/off-the-wire/harvard-anthropic-and-quera-reduce-quantum-circuit-resource-needs-with-ai/)
- [Discovering state-of-the-art quantum circuits with large language models（arXiv:2610.22367）](https://arxiv.org/abs/2610.22367)
- [AI Quantum Circuits Cut Resource Estimates Up to 39×（BitcoinVersus.Tech）](https://bitcoinversus.tech/2026/11/11/harvard-anthropic-quera-ai-quantum-circuits-39x-resource-reduction-2026/)

（サムネイル：生成イラスト）
