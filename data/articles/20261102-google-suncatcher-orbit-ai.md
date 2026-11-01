---
title: "Googleの衛星、軌道上で初のAI応答 — 「宇宙の俳句」がデータセンター宇宙構想の第一歩に"
datetime: "2026-11-02T05:04:35+09:00"
tags:
  - tech
thumbnailAlt: "地球の上を周回する衛星とデータの光を描いたイラスト"
---

Googleは2026年10月30日、同社の「プロジェクト・サンキャッチャー」の試作衛星が、軌道上で初めてAIへの指示（プロンプト）を処理し、応答を地球に送り返したと発表しました。衛星に搭載したデータセンター向けAIチップ「TPU」上で、公開モデル「Gemma 4」が俳句を詠んだもので、宇宙にAIデータセンターを置く構想の「Hello World」（最初の動作確認）にあたります。

## 軌道上のTPUが詠んだ俳句

衛星は2026年10月1日、スペースXのファルコン9ロケットによるライドシェアミッション「トランスポーター18」で打ち上げられました。衛星メーカーのプラネット社と共同で開発されたもので、4基のTPUを搭載しています。ただし電力は約1キロワットしかなく、一度に動かせるTPUは1基、連続稼働は20分程度に限られます。

打ち上げから約3週間かけて、衛星本体とTPUトレイの電源投入や各システムの点検、初期の機械学習テストが行われました。その後、地上局との交信の機会に、チームは搭載したGemma 4へ最初のプロンプトを送信しました。内容は「宇宙にいることをテーマにした俳句を書いてほしい」というものです。

衛星がノルウェーのスバールバル諸島上空を通過した際に送り返された応答は、次の3行でした。

> Blue marble below,
> Data streams in silent grace,
> Starlight feeds my core.

（青い大理石（地球）の下で、データの流れが静かな優雅さで流れ、星明かりが私の核を養う）

その後、チームは宇宙をテーマにしたリメリック（5行の滑稽詩）や、衛星自身の技術状態を報告させるプロンプトも試しています。

## なぜAIを宇宙に置くのか

プロジェクト・サンキャッチャーは、将来のAI計算需要を宇宙でまかなえるかを探る長期的な研究です。宇宙では太陽光発電をほぼ24時間利用でき、冷却のための水も不要で、地上のデータセンターが抱える電力と冷却の制約を回避できる可能性があります。Googleは、スペースXの打ち上げコスト低下が続けば、2035年ごろには宇宙データセンターが現実的になると見込んでいます。

次の段階では、TPUが宇宙の熱ストレスや放射線にどう耐えるかが試されます。地上の実験室では、67MeVの陽子線を照射する試験が行われ、通常のトランスフォーマー処理では約300万回の推論あたり1回程度の故障確率と見積もられています。Googleは2027年に、発電能力を高め衛星間光通信を備えた衛星をさらに2基打ち上げる計画です。

なお、今回の俳句そのものは約20トークンで、地上のクラウドAPIで生成すれば0.0012セント程度の計算量に相当します。価値があるのは詩そのものではなく、「データセンター級のチップが宇宙で実際に推論を行い、結果を返した」という事実です。

## 出典・参考

- [Google's AI satellite sends a very expensive haiku to Earth（The Register）](https://www.theregister.com/ai-and-ml/2026/10/31/googles-ai-satellite-sends-a-very-expensive-haiku-to-earth/5306818)
- [Google's space data center chip writes its first-ever poem in orbit（Interesting Engineering）](https://interestingengineering.com/ai-robotics/google-space-data-center-orbital-poem)
- [Google's Suncatcher satellite returns first AI response from orbit（TechWorthIt）](https://techworthit.com/news/google-s-suncatcher-satellite-returns-first-ai-response-from-orbit)

（サムネイル：生成イラスト）
