---
title: "AIが別のAIの「重み」を直接書き換える — MITの「重み空間プログラミング」、数学の成績が6倍に"
datetime: "2026-11-07T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "AIが別のAIの神経回路を直接編集する様子を描いたイラスト"
---

AIが別のAIを「訓練」するのではなく、その脳にあたる部分を直接書き換えて性能を上げる――。MITコンピューター科学・人工知能研究所（CSAIL）の研究チームが2026年11月2日に公開した研究ブログ「Sparks of Weight-Space Programming（重み空間プログラミングの火花）」が、AI研究の新しい方向性を示しています。

## 「重み」とは何か

AIモデル、とくに大規模言語モデルは、数億〜数千億個の「重み」と呼ばれる数値でできています。重みは、モデルが入力をどう処理するかを決める、いわば脳の配線の強さです。通常、モデルの性能を上げるには「訓練」が必要です。大量のデータを使って、少しずつ重みを調整していく作業で、計算量も時間もかかります。

今回の研究チーム（武井力也氏、ジェイデン・テオ氏、アレックス・チャン氏、オマー・カッターブ氏）は、訓練の代わりに、別のAIモデルに重みを直接読ませ、書き換えさせる方法を試しました。これを「重み空間プログラミング」と呼んでいます。

## 0.016％の書き換えで数学の成績が6倍に

実験の中心は、小型のオープンソースモデル「Qwen3.5-0.8B」（約8億個の重みを持つモデル）です。研究チームは、OpenAIの「GPT-6 Astra」にこのモデルの重みを調べさせ、数学の成績を上げるよう編集させました。

結果は次の通りです。

| 指標 | 編集前 | 編集後 |
| --- | --- | --- |
| MATH-500（数学ベンチマーク） | 7.9％ | 48.1％ |
| GSM8K（小学校レベルの算数） | 13.8％ | 67.1％ |
| IFEval（指示に従う能力） | 21.0％ | 62.3％ |

書き換えられた重みは131,072個で、全体の約0.016％にすぎません。Astraは、モデルが同じ言葉を繰り返してしまい、答えにたどり着く前に文字数の上限に達してしまう「繰り返しの癖」を発見しました。モデルの第15層と第19層にある、繰り返しに関わる方向の数値を取り除くことで、この癖を直したのです。編集前はMATH-500の回答の93.0％が文字数上限に達していましたが、編集後は33.1％まで減りました。

ほかにも、Astraはゲームのルールだけからブロック崩しをプレイする神経回路を直接作り出し、5億ステップ訓練したモデル（25.3点）を大きく上回る517.4点を記録しました。

## 「数学が得意になった」のではない

ただし、この結果の解釈には注意が必要です。成績の向上は、モデルに新しい数学の知識が入ったからではなく、繰り返しという「悪い癖」を直したことで、本来の能力が発揮できるようになったためです。研究チーム自身も「モデルの修復」だと説明しています。

また、繰り返しの癖がほとんどない小型モデル「Gemma 3 270M」では、編集による数学の成績向上は確認できませんでした。さらに、別の評価者が異なる条件で元のモデルを測り直したところ43.95％という結果も出ており、「6倍」という見出しの数字は評価の条件に依存します。編集後のモデルはHugging Faceで公開され、独立した再実行では51.0％が確認されています。

研究チームは、すべての結果を「非常に初期段階のもの」と位置づけており、実験の記録をすべて公開して、ほかの研究者による再現を求めています。重みを直接書き換える手法が、訓練に取って代わるものになるかは、まだ分かりません。しかし、AIが別のAIの内部を「読んで」「直す」という発想そのものが、AI開発の新しい扉を開いたことは確かです。

## 出典・参考

- ['Like gene editing for neural networks': MIT researchers used GPT-6 Astra to edit Qwen's open weights directly, boosting math performance（VentureBeat）](https://venturebeat.com/technology/like-gene-editing-for-neural-networks-mit-researchers-used-gpt-6-astra-to-edit-qwens-open-weights-directly-boosting-math-performance)
- [LLMs read and edit neural network weights directly, MIT researchers find（Complete AI Training）](https://completeaitraining.com/news/llms-read-and-edit-neural-network-weights-directly-mit/)
- [Weight-Space Programming: GPT-6 Astra Edits Qwen（Kingy）](https://kingy.ai/blog/weight-space-programming-ai-agent-model-weights/)
- [MIT Researchers Say GPT-6 Astra Lifted Qwen Math…（Asia Daily）](https://asiadaily.org/news/17751/)

（サムネイル：生成イラスト）
