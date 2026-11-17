---
title: "Mistral Large 4、1兆パラメータの重みを公開 — 欧州発の最大級オープンウェイトモデルが正式版に"
datetime: "2026-11-18T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "巨大な人工知能モデルを表す、光る神経回路網のイラスト"
---

フランスのAI企業Mistral AIの旗艦モデル「Mistral Large 4」が正式版（GA）になりました。約1兆パラメータという規模のモデルとしては初めて重み（学習済みの数値データ）が公開され、誰でもダウンロードして自分のサーバーで動かすことができます。欧州の研究所によるオープンウェイトのモデルとしては過去最大です。

## どんなモデルか

Mistral Large 4は「Mixture-of-Experts（MoE）」という設計のAIモデルです。たくさんの「専門家」ネットワークを抱え、入力ごとに必要な専門家だけを使う仕組みで、全体は約1.05兆パラメータと巨大ですが、1トークン（単語のかけら）あたりに実際に働くのは約490億パラメータです。テキストと画像を読み取り、テキストを生成します。扱える文脈の長さは100万トークンです。

公開の経緯は次のとおりです。

- 2026年10月6日：APIのみの公開プレビューを開始
- 2026年10月29日：重みをHugging Faceで公開
- 2026年11月：追加の強化学習を経て正式版に

重みは「Mistral Ecosystem Open-Weight License」（MITライセンスを改変したもの）で提供され、商用利用や改変、ファインチューニングは自由です。ただし、モデル自体を他社向けの有料APIとして提供する事業には、別途の商用ライセンスが必要です。API価格は入力100万トークンあたり0.70ドル、出力は2.10ドルで、プレビュー時から約半額になりました。

## 性能と位置づけ

独立系の評価では、コーディングエージェントの指標で競合モデルと並ぶ成績を、約半分のトークン数で達成したとされています。一方、幅広い知能を測る指標では最上位ではなく、オープンウェイトのモデルの中で7番手程度の評価です。

自前で動かすには、公式の重みデータだけで約1TBあり、推奨される構成はGPU 8基のサーバーです。個人が手軽に動かすものではなく、実質的にはAPI経由での利用か、データセンターでの運用が中心になります。Mistralはフランスとスウェーデンのデータセンターに約40億ユーロを投じる計画も明らかにしています。

## なぜ重要か

モデルの「重み」が公開されるとは、AIの設計図だけでなく、学習済みの実物そのものが手に入るということです。企業の機密データを外部のAIサービスに送らずに自社内で動かせるため、政府や金融機関など、データを外に出せない組織にとっては大きな意味があります。1兆パラメータ級のモデルがオープンウェイトで出たことで、最先端のAIが少数の巨大企業だけのものではなくなりつつあります。

## 出典・参考

- [Mistral Large 4（ReviewRamble）](https://www.reviewramble.com/models/mistral-large-4)
- [Mistral's 1-Trillion-Parameter "Le Chonk" Is Now Open Weight（TechToday）](https://techtoday.space/blog/mistral-large-4-le-chonk-explained)
- [Mistral Large 4 (Le Chonk): What the Independent Benchmarks Actually Say（Lanexora）](https://lanexora.com/blog/mistral-large-4-open-weights-benchmarks-license)
- [AI News Today — Daily AI Briefing, 2026-11-17（AI Briefing）](https://aibriefing.dev/)

（サムネイル：生成イラスト）
