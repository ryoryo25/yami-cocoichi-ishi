# 闇ココイチいし 🃏🍛

ココイチのトッピングをトランプでランダムに選ぶ、カジノ風セレクターサイトです。

## 特徴

- **トランプで選ぶ**: スペード・ハート・ダイヤ・クラブの52枚 + ジョーカー2枚の計54枚からトッピングを選びます。
- **最新データ**: ビルド時に公式サイトから最新のトッピング一覧を自動的にスクレイピングして取得します。
- **デッキ管理**: 全54枚を引き切るまでカードが重複しないように管理されています（ブラウザのLocalStorageを使用）。
- **マニュアル入力**: 手元のトランプに対応するトッピングを即座に確認できる機能も搭載。

## 開発スタック

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: [Cheerio](https://cheerio.js.org/) / [Axios](https://axios-http.com/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) (GitHub Actions)

## ローカル実行

```bash
npm install
npm run dev
```

## ビルド・デプロイ

```bash
# 静的ファイルのエクスポート (outディレクトリに出力)
npm run build
```

GitHubにプッシュすると、GitHub Actionsにより自動的にビルドされ、GitHub Pagesへデプロイされます。
