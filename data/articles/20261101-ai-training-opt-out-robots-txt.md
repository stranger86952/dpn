---
title: "AI学習の拒否が「共通の合図」1行に — OpenAI・Google・Microsoftが robots.txt の新信号に対応へ"
datetime: "2026-11-01T05:08:38+09:00"
tags:
  - tech
---

2026年10月30日、OpenAI、Google、Microsoftの3社が、ウェブサイトがAI学習への利用を拒否する意思を1つの共通の合図で伝えられる仕組みに対応すると発表した。これまで各社バラバラだった「学習に使わないでほしい」という意思表示が、共通の書き方にまとめられる。

## robots.txt とは何か

robots.txt は、ウェブサイトの管理者がクローラー（ウェブを巡回して情報を集めるプログラム）に対して希望を伝えるためのファイルである。たとえば「このページには来ないでほしい」「この会社のクローラーには学習に使わせたくない」といった意思を、決まった書式で書いておくものだ。

これまでは、OpenAIならGPTBot、GoogleならGoogle-Extendedというように、会社ごとに異なる名前で意思表示を書く必要があった。複数の会社に同じ希望を伝えるには、それぞれの名前を並べなければならず、手間がかかっていた。

## 新しい合図：__usage_ai-training

今回共通化されたのは、生成AIの学習にコンテンツを使うことへの意思表示である。提案の名前は「Machine-Readable Training Preference Signal」で、Anthropicの技術者ケビン・ケリー氏が起草し、インターネット技術の標準化団体IETFのAI Preferences作業部会にInternet-Draft（標準化への提案文書）として2026年10月30日に公開された。

サイト運営者は、robots.txt に次の2行を書くことで、参加する各社まとめて学習利用の拒否を伝えられる。

    User-agent: __usage_ai-training
    Disallow: /

フォルダ単位で「ここだけは除外する」「ここだけは許可する」といった細かい指定もできる。Googleは、この共通の合図だけが書かれていてGoogle-Extendedへの言及がない場合、それをGoogle-Extendedの拒否と同じ意味に解釈すると説明している。

## 効く範囲と、効かない範囲

この合図の効き目を正しく理解することが大切だ。

- 対象になるのは、生成AIの「学習」だけである。モデルの重み（パラメータ）を変えるための利用が対象で、それ以外の用途は含まれない。
- クロールそのものを止める指示ではない。ページの取得や検索結果への掲載は、この合図では止まらない。
- AIが回答を作るときにページを引用する「グラウンディング」も対象外である。学習を拒否しても、AIの回答にページが引用されなくなるわけではない。
- すでに集められたデータや、すでに学習済みのモデルから内容を取り除く効果はない。あくまで今後の学習への希望の表明である。

Microsoftは、この共通の合図とは別に、ページ単位でグラウンディングへの希望を指定する仕組みも用意するとしており、学習と回答への引用を分けて考えられるようにしている。

## 各社の対応時期はバラバラ

発表時点での対応時期は、会社ごとに異なる。

- Microsoft：2027年2月1日から、クロール時に新しい希望を尊重する。
- Google：2027年中の対応を目指すとしている。
- OpenAI：今後数か月以内の実装を目指すとしている。
- Anthropic：独自の発表は出していないが、起草者である同社技術者が実装を開始したと説明していると報じられている。

つまり、2026年10月30日時点では「共通の書き方が決まり、各社が対応を約束した」段階であり、実際に効き始めるのはこれからである。当面は、従来の各社向けの設定も併用しておくのが安全だ。

## まだ正式な標準ではない

注意点として、この提案はIETFが承認した完成済みの標準ではない。個人が提出したInternet-Draftの初版で、IETFとしての正式な地位はなく、2027年5月3日に失効する予定とされている。作業部会での議論が続けば更新される見込みだが、仕組み自体が「各社の善意による尊重」を前提とした任意のものである点も押さえておきたい。

それでも、AIの学習データの扱いをめぐって対立が続いてきた中で、主要なAI企業が同じ合図で意思を受け取る方向にそろったことは、ウェブサイト運営者とAI企業の関係における一つの転機といえる。

出典：

- [One robots.txt rule to opt out of AI training: how it works（Skimwire）](https://www.skimwire.com/ai-training-opt-out-robots-txt-openai-google-microsoft-anthropic/)
- [Opt out of AI training in robots.txt（RR Tech Pulse）](https://rrtechpulse.com/stories/robots-txt-ai-training-opt-out-signal/)
- [One shared robots.txt token to opt out of AI training（Derrington Collaborative AI）](https://www.derringtoncollaborativeai.com/briefing/shared-ai-training-opt-out-token)
- [AI学習を断る設定が共通化へ。robots.txtの新提案を読む（yomitoka / note）](https://note.com/yomitoka/n/n7dee4a1ea32f)
