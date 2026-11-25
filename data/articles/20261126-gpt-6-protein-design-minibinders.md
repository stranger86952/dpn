---
title: "GPT-6.2が設計したタンパク質、実験室で結合を確認 — 322設計中35件、成功率10.9%"
datetime: "2026-11-26T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "AIが設計したタンパク質の立体構造を描いたイラスト"
---

OpenAIは11月24日、汎用AIモデル「GPT-6.2」が設計したタンパク質が、実験室での試験で標的に結合することを確認したと発表しました。がんや免疫疾患に関わる5つの標的に対し、322の設計のうち35件（10.9%）が結合を示しました。専門の生物学モデルを使わず、推論とコードだけでタンパク質を設計する汎用モデルの可能性を示す、初期の実験結果です。

## ミニバインダーとは何か

今回の主役は「ミニバインダー」と呼ばれる小さなタンパク質です。特定の標的タンパク質にくっつくよう設計されたもので、将来の医薬品の出発点になる可能性があります。OpenAIはGPT-6.2に5つの標的タンパク質の立体構造を与え、そこに結合するミニバインダーの形とアミノ酸配列を設計させました。

研究パートナーのOnavaが実際に322のミニバインダーを合成して試験した結果、35件が標的への結合を示しました。標的ごとの内訳は次のとおりです。

- IL-17A：18件
- VEGF-A：8件
- PD-L1：5件
- IL-7Rα：3件
- TrkA：1件

5つの標的すべてで、少なくとも1件の結合が確認されました。GPT-6.2は既存のミニバインダーや抗体の結合部分を書き換える実験でも、結合を保ったまま再設計できたとしています。

## どこまでがGPT-6.2の仕事か

ただし、この結果をそのまま「AIが一人で新薬の種を生み出した」と読むのは早計です。OpenAI自身が認めているとおり、実験では専門のモデルが候補の絞り込みや配列の生成を手伝っており、ゼロから最後までGPT-6.2だけで作り上げたわけではありません。また、結合が確認されただけでは薬にはならず、効き目や安全性、安定性などの検証はこれからです。発表は査読前のプレプリントに基づくもので、OpenAI自身の報告という点にも注意が必要です。

それでも、汎用モデルが生物学の設計作業にどこまで踏み込めるかを、実験室の数字で示した点は大きな意味があります。AIの科学への進出は、数学の証明に続いて、生物学の実験台にも届き始めています。

## 出典・参考

- [GPT-6 models demonstrate intrinsic protein-design capabilities（OpenAI）](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities)
- [GPT-6.2 Protein Design: What the Lab Binding Data Show（TechRepublic）](https://www.techrepublic.com/article/news-gpt-6-2-protein-design-lab-binding-results/)
- [OpenAI's GPT-6.2 hits 10.9% wet-lab rate on new minibinders（AI Weekly）](https://aiweekly.co/alerts/openais-gpt-62-hits-109-wet-lab-rate-on-new-minibinders)

（サムネイル：生成イラスト）
