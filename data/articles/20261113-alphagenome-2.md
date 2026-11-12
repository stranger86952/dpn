---
title: "DeepMind、細胞ごとに遺伝子変異の影響を予測する「AlphaGenome 2」を発表"
datetime: "2026-11-13T05:07:25+09:00"
tags:
  - tech
thumbnailAlt: "DNAの二重らせんと細胞を描いたイラスト"
---

Google DeepMindは11月11日、DNAの変異が遺伝子の働きにどう影響するかを、細胞の種類ごとに予測するAIモデル「AlphaGenome 2」を発表しました。組織全体の平均ではなく、個々の細胞タイプや細胞の状態に注目するのが特徴です。

## なぜ「細胞ごと」なのか

私たちの体は約37兆個の細胞からできていますが、すべての細胞はほぼ同じDNAを持っています。それでも皮膚の細胞と神経の細胞が違う働きをするのは、同じDNAでも「どの部分が読まれるか」が細胞ごとに違うからです。

遺伝子の変異（DNAの文字の違い）が病気に関わるかどうかも、細胞によって違います。ある変異は免疫細胞では問題を起こすのに、別の組織では何も起きない、ということがあります。従来のモデルは組織全体の平均で予測していたため、特定の細胞だけで起きる影響が見えにくくなっていました。

AlphaGenome 2は、最大100万文字のDNA配列と、調べたい組織・細胞タイプ・細胞の状態を入力すると、その条件での遺伝子発現（遺伝子がどれだけ働くか）や、DNAの読みやすさ（クロマチンアクセシビリティ）、ヒストン修飾、DNAメチル化などを予測します。研究者自身のシングルセル実験データに合わせて予測を調整することもできます。

## どれだけ性能が上がったのか

学習には、ヒトとマウスの68組織から集めた1億700万件超の個別細胞プロファイルが使われました。性能の目安として、28種類の免疫細胞を対象にしたベンチマーク（TenK10K）では、原因と考えられる遺伝子発現の変異を、精度90%の条件で30%見つけ出しました。初代AlphaGenome（シングルセル用に調整したもの）の16%と比べて、ほぼ2倍です。遺伝子への影響の向き（発現を上げるか下げるか）を正しく当てた割合も、23%から43%に上がりました。

## 利用方法と注意点

AlphaGenome 2は、非商用の研究向けにAlphaGenome APIを通じて提供されており、商用研究は招待制のプライベートプレビューです。DeepMindは、どちらのモデルも研究用であり、臨床や診断の目的では検証・承認されていないと明言しています。

また、数字はDeepMind自身の発表によるもので、技術論文は査読前のプレプリントです。精度が高くても、統計的に原因候補とされる変異のうち見つけられるのは一部にとどまる、という限界も論文に記されています。それでも、細胞レベルで遺伝子の読み方を予測できる道具が広く使えるようになったことは、病気の仕組みの解明や創薬の研究にとって大きな前進です。

## 出典・参考

- [AlphaGenome 2: Deciphering how cells read DNA to better understand disease（Google DeepMind）](https://deepmind.google/blog/alphagenome-2-deciphering-how-cells-read-dna-to-better-understand-disease/)
- [DeepMind's ultra-powerful AI for genome mapping wows scientists（Nature）](https://www.nature.com/articles/d41586-026-03673-0)
- [Google DeepMind releases AlphaGenome 2 to predict how DNA changes affect specific cell types and disease（MLQ.ai）](https://mlq.ai/news/google-deepmind-releases-alphagenome-2-to-predict-how-dna-changes-affect-specific-cell-types-and-disease/)

（サムネイル：生成イラスト）
