import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Дизайн для Amazon",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "uk-UA",
    baseUrl: "amzprofessional.github.io/design-amazon",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Poppins",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fcfaff",
          lightgray: "#ebe6f5",
          gray: "#b3aac4",
          darkgray: "#4a4458",
          dark: "#241c35",
          secondary: "#7A1FF0",
          tertiary: "#FF7A2A",
          highlight: "rgba(122, 31, 240, 0.08)",
          textHighlight: "#D752F133",
        },
        darkMode: {
          light: "#15121c",
          lightgray: "#2f2940",
          gray: "#6c6480",
          darkgray: "#d9d4e4",
          dark: "#f1eef7",
          secondary: "#B46BF7",
          tertiary: "#FF8F3A",
          highlight: "rgba(180, 107, 247, 0.12)",
          textHighlight: "#D752F155",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: (f1, f2) => {
          const t1 = f1.frontmatter?.title ?? f1.slug ?? ""
          const t2 = f2.frontmatter?.title ?? f2.slug ?? ""
          return t1.localeCompare(t2, undefined, { numeric: true, sensitivity: "base" })
        },
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
