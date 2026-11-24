---
title: "ClaudeとOpenAIのモデルが「VP≠VNP」の証明を主張 — 47年越しの予想、検証はこれから"
datetime: "2026-11-25T05:05:00+09:00"
tags:
  - math
thumbnailAlt: "行列と回路を描いた数学のイラスト"
---

AnthropicとOpenAIは11月23日から24日にかけて、計算量理論の未解決問題「VP≠VNP」について、AIモデルが導いたとする証明を相次いで公開しました。もし正しければ、1979年にレスリー・ヴァリアント氏が提唱して以来の大きな予想が解決します。ただし、どちらの証明もまだ人間の数学者が検証しておらず、あくまで「主張」の段階です。

## VPとVNPとは何か

VPとVNPは、有名な「P対NP問題」の代数版です。P対NPが「答えを判定する問題の難しさ」を問うのに対し、VP対VNPは「多項式を計算する回路の大きさ」を問います。具体的には、行列式に似た「パーマネント」という多項式が、小さな計算回路ではどうしても計算できないことを示す問題です。

- **VP**：変数の数・次数・回路の大きさがすべて多項式の範囲で収まる多項式の集まり
- **VNP**：VPの多項式を、証拠となるビット列について合計した形で表せる多項式の集まり

パーマネントはVNPに属し、その中で最も難しい問題の一つです。ヴァリアント予想は「パーマネントはVPには入らない」、つまりVPとVNPは違う、という主張です。

## AnthropicとOpenAI、それぞれの主張

Anthropicは11月23日、Claudeを唯一の著者とする70ページの論文「VP ≠ VNP over every field」と、証明支援言語Lean 4による形式化（324ファイル、約7万3,000行）をGitHubで公開しました。主張の中心は、$m \times m$ 行列のパーマネントを計算する回路には、$m$ が大きくなるにつれて $m^{c(\log m)^{1/3}}$（$c$ は正の定数）を超えるゲートが必要だという下限です。ただし公開したリポジトリ自身が「人間の数学者は誰も証明を検証していない」と明記しています。

OpenAIも約5時間後に、別のモデルが作成したとする論文「VP and VNP are different」とLean形式化を公開しました。こちらは $\exp(\Omega((\log n)^{5/4}))$ という形の、さらに強い下限を主張しています。OpenAIはこれらの原稿を「完成した論文ではなく、生の研究データのようなもの」と位置づけています。

## P対NPが解決したわけではない

両社とも、これはP対NP問題の解決ではないと明言しています。算術回路が多項式そのものを計算しなければならないのに対し、P対NPの世界では0と1の判定だけが求められるため、問題の性質が異なるからです。

なお、同じAnthropicのClaudeが関わったリーマン予想の証明は、11月20日の公開後、LeanとMathlibのコミュニティが11月21日に「命題も証明も正しい」と認証しました（当サイトでも11月22日に記事化）。VP≠VNPの主張は、その認証段階にはまだ達していません。数学者による検証の結果が、今後の焦点です。

## 出典・参考

- [Claude claims to prove VP ≠ VNP in Valiant's 47-year-old conjecture（Interesting Engineering）](https://interestingengineering.com/ai-robotics/claude-proves-vp-not-vnp-valiant-conjecture)
- [Anthropic and OpenAI Post Unverified VP ≠ VNP Proofs（TSN）](https://tsnmedia.org/anthropic-openai-vp-vnp-proofs/)
- [Claude's VP ≠ VNP proof, what it means and what's been checked（Anchor Terminal）](https://www.anchorterminal.com/blog/a-machine-that-says-vp-is-not-vnp)

（サムネイル：生成イラスト）
