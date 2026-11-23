---
title: "OpenJDKの重大脆弱性「Java4Shell」 — 認証なしでリモートコード実行、Java 17以降が対象"
datetime: "2026-11-24T05:05:00+09:00"
tags:
  - tech
thumbnailAlt: "ひびの入ったコーヒーカップと警告シールドのイラスト"
---

Javaの実行環境OpenJDKに、認証なしでリモートからコードを実行できる重大な脆弱性が見つかりました。セキュリティ企業Califが発見し、11月17日に公開しました。「Java4Shell」と名付けられたこの脆弱性は、CVE-2026-114938として登録され、深刻度はCVSS 4.0で9.2（10段階中）に評価されています。Javaで動く多くの企業向け製品に影響が及ぶため、利用者は早急な対応が求められます。

## Base64の高速処理に潜んでいた欠陥

問題は、OpenJDKがBase64のデコード（復号）を高速化するために使っている、最適化されたアセンブリコードにありました。Base64は、画像や認証情報などのバイナリデータを、文字だけで表すための変換方式です。Javaのプログラムでは、利用者から送られてきたデータを処理する際に、日常的に使われています。

この高速化コードは、x86-64プロセッサのAVX-512 VBMIという命令セットを使っています。ところが、末尾に付く「=」という詰め物（パディング）の数が想定外だった場合に、出力先の配列の大きさを誤って計算してしまう欠陥がありました。たとえば「A」を64文字並べたあとに「=」を1つ付けた入力を処理すると、長さの計算結果が負の値に「あふれて」しまい、確保したメモリの範囲を越えて書き込みが起きます。これを「ヒープバッファオーバーフロー」と呼びます。攻撃者はこの欠陥を突いて、隣り合うメモリ上の情報を書き換え、任意のコードを実行できます。

## 影響範囲はJavaエコシステム全体

影響を受けるのは、OpenJDK 17.0.6以降のバージョン（17、21、25、27）で、Amazon Corretto、Eclipse Temurin、Azul Zulu、Microsoft Build of OpenJDK、Red Hat OpenJDK、Oracle Java SEなどの主要な配布版が含まれます。ただし、AVX-512 VBMIに対応したx86-64ハードウェアで動いている場合に限ります。ARM64プロセッサでは影響を受けません。

対象ハードウェアは、Intel Xeon（Ice Lake以降）や、AMD EPYC／Ryzen（Zen 4以降）などです。すでに、Atlassian JiraやConfluence、Keycloak、JFrog Artifactory、Jenkins、Apache Tomcatといった主要なJavaアプリケーションで、認証なしのリモートコード実行が実証されています。Spring BootやApache Struts、Kafka、Solr、Elasticsearchなどで作られた独自のアプリケーションも対象になりえます。

## 対応：修正版への更新が最優先

Oracleは11月17日に修正版を公開しました。セキュリティ企業Wizは、AIを使った脆弱性研究の仕組みで、詳細が公開される前に2時間で概念実証の攻撃コードを作れたとしており、攻撃者側も同様の手段を持つ可能性があります。利用者は、外部に公開されているJavaアプリケーションを優先して、修正版への更新か、公開範囲の制限を行うべきです。

すぐに更新できない場合は、JVMの起動オプションに `-XX:-UseBASE64Intrinsics` を付けてBase64の高速処理を無効化するか、`-XX:UseAVX=2` を付けてAVX-512の使用を抑えることで、脆弱性を無効化できます（性能に影響が出る場合があります）。

## 出典・参考

- [CVE-2026-114938 OpenJDK RCE (Java4Shell): Everything You Need to Know（Wiz）](https://www.wiz.io/blog/cve-2026-114938-rce-java4shell-openjdk)
- [Java4Shell: Critical OpenJDK Base64 Decoder Flaw Could Allow Unauthenticated Remote Code Execution（Orca Security）](https://orca.security/resources/research/java4shell-critical-openjdk-base64-decoder-flaw-could-allow-unauthenticated-remote-code-execution/)

（サムネイル：生成イラスト）
