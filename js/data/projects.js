/* Real repo data pulled from github.com/techifydev1, kept in its own file so
   updating your projects never means touching markup.

   - image:   full-width banner shown on the project card (or null → gradient art)
   - url:     the live product, when deployed (or null → falls back to the repo) */
window.PORTFOLIO_PROJECTS = [
    {
        slug: "onreco",
        title: "Onreco",
        type: "Fintech · Web",
        description: "Stablecoin accounting for people who think in debits and credits, not gas fees. Hook up QuickBooks or Xero over OAuth, add a wallet to watch, and your USDT/USDC settles in the books as a normal journal entry. Base, Solana, Tron. Live in production.",
        tags: ["TypeScript", "Next.js", "Java", "Spring", "OAuth"],
        url: "https://www.onreco.xyz",
        repo: null,
        image: "assets/images/onreco.png",
        cover: "linear-gradient(135deg, #2d2a45, #17143a 55%, #0e0b20)"
    },
    {
        slug: "postra",
        title: "Postra",
        type: "Web · Community",
        description: "A community web app that takes writing seriously: a TipTap editor with image upload and formatting, typed API clients that won’t let you typo an endpoint, and ISR feeds that revalidate hourly without making every visitor wait.",
        tags: ["Next.js", "React 19", "TypeScript", "Tailwind", "TipTap"],
        url: "https://postra-frontend.vercel.app",
        repo: "https://github.com/techifydev1/postra-frontend",
        image: "assets/images/postra.png",
        cover: "linear-gradient(135deg, #402328, #2c1619 55%, #190c0d)"
    },
    {
        slug: "trackr",
        title: "Trackr",
        type: "Mobile · Fintech",
        description: "A finance tracker that stops asking you to feel guilty: real-time expense categories, multiple cards, Google sign-in, and AI insights rendered as readable Markdown reports (LaTeX included), backed by Firestore.",
        tags: ["Dart", "Flutter", "Riverpod", "Firebase"],
        url: null,
        repo: "https://github.com/techifydev1/trackr",
        image: "assets/images/trackr.png",
        cover: "linear-gradient(135deg, #3d3223, #2b2418 55%, #1a150e)"
    },
    {
        slug: "valuta",
        title: "Valuta",
        type: "Mobile · Fintech",
        description: "Naira-first, device-honest money tools: convert NGN into twelve currencies with live rates, and log expenses against a budget that lives on your phone, not on somebody’s server.",
        tags: ["Expo", "React Native", "TypeScript", "expo-router"],
        url: null,
        repo: "https://github.com/techifydev1/valuta",
        image: null,
        cover: "linear-gradient(135deg, #1f4037, #14332a 55%, #0b1f19)"
    }
];

/* Smaller public experiments, shown as quick links below the grid. */
window.PORTFOLIO_EXTRA = [
    { name: "sync-mobile", repo: "https://github.com/techifydev1/sync-mobile" },
    { name: "wallet_mobile", repo: "https://github.com/techifydev1/wallet_mobile" },
    { name: "url-shortner", repo: "https://github.com/techifydev1/url-shortner" },
    { name: "scanr", repo: "https://github.com/techifydev1/scanr" }
];

window.PORTFOLIO_META = {
    github: "https://github.com/techifydev1",
    email: "yusufabdulqudus02@gmail.com",
    x: "https://x.com/techifydevx"
};