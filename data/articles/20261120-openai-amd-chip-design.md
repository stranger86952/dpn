---
title: "OpenAIのAIがAMDのGPU設計を改善、最大14%の効率向上 — 一部は製造段階の設計に採用"
datetime: "2026-11-20T05:06:00+09:00"
tags:
  - tech
thumbnailAlt: "半導体チップと回路設計を描いたイラスト"
---

OpenAIは11月18日、自社のAIモデルが半導体チップの設計を改善したとする研究報告「Advancing chip design with OpenAI models」を公開しました。AMDの次世代GPUの設計で、電力・性能・面積の総合指標が最大14%改善し、一部の変更は製造に送られた設計にすでに採用されています。AIが、AIを動かすチップそのものの設計に貢献し始めた事例です。

## 何ができたのか

チップの設計では、回路の働きを「RTL」と呼ばれるコード（SystemVerilogという言語）で記述します。OpenAIのモデルは、AMDのフラッグシップGPUのRTLを書き換え、同じ働きを保ったまま電力・性能・面積（PPA：Power, Performance, Area）のバランスを改善しました。改善幅は、AMDの技術者が長年かけて最適化してきた設計と比べて最大14%で、OpenAIはこれを「5か月足らずで得た、およそ1年分の進歩」と表現しています。

AMDは一部の変更を、製造に送った最新の設計に取り入れ、残りも将来の製品向けの設計ファイルに加えたといいます。次世代のフラッグシップCPUでも、主要なブロックで1桁台のパーセントのPPA改善がAMDによって確認されました。

## 自社チップ「Jalapeño」での成果

この取り組みは、OpenAIが自社のデータセンター向けに開発している推論用チップ「Jalapeño」から始まりました。モデルが提案した変更により、Jalapeñoのベクトル演算ユニットでは標準セルの面積が約13%、行列演算ユニットでは約10%削減され、実際に製造されたチップの動作確認でも効果が保たれました。

OpenAIはさらに、設計支援ソフトウェア大手のSynopsysと提携し、専門の設計ツールを使いこなすモデル「GPT-Synopsys」の開発を進めています。

## 注意点

この成果には、いくつか留保もあります。14%という数字はOpenAIの発表によるもので、AMD自身は数字を公表していません。また、14%が電力・性能・面積のどれによるものか、内訳は示されておらず、「GPUが14%速くなった」という意味ではありません。物理的な配置のあとのタイミング検証も行われていません。それでも、設計済みの回路をAIが書き換えて実製品に採用されたことは、AIによるチップ設計が実用段階に入りつつあることを示しています。

## 出典・参考

- [OpenAI Chip Design: 14% PPA Gains on AMD's GPU（i10X News）](https://i10x.ai/news/openai-chip-design-amd-gpu-14-percent-ppa-jalapeno)
- [OpenAI Reports Model-Driven Gains in AMD Flagship Chip Designs（Unite.AI）](https://www.unite.ai/openai-reports-model-driven-gains-in-amd-flagship-chip-designs/)
- [OpenAI says its models found a year's worth of AMD GPU design gains in under five months（MACCUS）](https://maccus.fr/en/openai-amd-chip-design/)
- [Deep Dive — OpenAI's models rewrote AMD's GPU code for 14% PPA（SiliconNoon）](https://siliconnoon.com/deep-dive-openais-models-rewrote-amds-gpu-code-for-14-ppa/)

（サムネイル：生成イラスト）
