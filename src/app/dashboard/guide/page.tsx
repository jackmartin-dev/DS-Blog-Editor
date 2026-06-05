"use client";

import { useState } from "react";
import {
  FiBook, FiEdit3, FiImage, FiLink, FiList, FiSearch,
  FiSave, FiEye, FiTag, FiFileText, FiAlertCircle, FiCheckCircle,
  FiChevronDown, FiChevronRight,
} from "react-icons/fi";
import {
  MdTableChart, MdAutoAwesome, MdOutlineSchema,
} from "react-icons/md";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function Badge({ children, color = "orange" }: { children: React.ReactNode; color?: "orange" | "green" | "blue" | "gray" }) {
  const cls = {
    orange: "bg-orange-100 text-[#F15C20] border-orange-200",
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  }[color];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${cls}`}>{children}</span>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-green-50 border border-green-200 rounded-xl p-4 my-4">
      <FiCheckCircle className="text-green-600 shrink-0 mt-0.5" size={16} />
      <p className="text-sm text-green-800">{children}</p>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
      <FiAlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
      <p className="text-sm text-amber-800">{children}</p>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 my-5">
      <div className="shrink-0 w-8 h-8 rounded-full bg-[#F15C20] text-white text-sm font-bold flex items-center justify-center">
        {number}
      </div>
      <div className="flex-1 pt-0.5">
        <p className="font-semibold text-gray-900 mb-1">{title}</p>
        <div className="text-sm text-gray-600 space-y-1">{children}</div>
      </div>
    </div>
  );
}

function KbdShortcut({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k, i) => (
        <kbd key={i} className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono text-gray-700">{k}</kbd>
      ))}
    </span>
  );
}

function Table({ rows }: { rows: [string, string, string?][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 my-4">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([a, b, c], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2.5 font-medium text-gray-800 border-r border-gray-200 w-1/3">{a}</td>
              <td className="px-4 py-2.5 text-gray-600 w-1/3">{b}</td>
              {c !== undefined && <td className="px-4 py-2.5 text-gray-500 border-l border-gray-200">{c}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Guide Sections ───────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    id: "overview",
    icon: <FiBook size={18} />,
    title: "Overview",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          The DS Blog Editor is a custom CMS built to replace WordPress + Yoast SEO. It gives you full control over blog content, SEO metadata, structured data, and publishing — all from one unified interface connected directly to the Dignite Studios website.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            ["Rich Editor", "TipTap-powered editor with formatting, tables, images, CTA banners and more"],
            ["Built-in SEO", "Meta tags, Open Graph, Twitter Cards, JSON-LD schema — all editable"],
            ["Live Sitemap", "Published posts are instantly added to /sitemap.xml — no manual steps"],
          ].map(([title, desc]) => (
            <div key={title} className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <p className="font-semibold text-[#F15C20] text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
        <Tip>All blog posts are stored in MongoDB and served directly on dignitestudios.com/blog — no re-deployment needed after publishing.</Tip>
      </div>
    ),
  },
  {
    id: "writing",
    icon: <FiEdit3 size={18} />,
    title: "Writing a Blog Post",
    content: (
      <div className="space-y-2">
        <Step number={1} title="Post Title">
          <p>Enter the title at the top of the left panel. This is the H1 of your blog and is also used to auto-generate the URL slug.</p>
          <Tip>Write a clear, keyword-rich title (50–65 characters ideal). The slug auto-generates — you can manually edit it below.</Tip>
        </Step>
        <Step number={2} title="URL Slug">
          <p>The slug field is below the title. It auto-fills from your title (lowercase, hyphens). Edit it if needed — keep it short and relevant.</p>
          <Warning>Once a post is published, avoid changing the slug as it will break existing links and SEO rankings.</Warning>
        </Step>
        <Step number={3} title="Write in the Editor">
          <p>The main content area supports full rich-text editing. Use the toolbar to format text, add headings, insert images, create tables, and more.</p>
        </Step>
        <Step number={4} title="Set Featured Image">
          <p>Upload a featured image in the right sidebar under <strong>Featured Image</strong>. This is <Badge color="orange">required</Badge> before publishing. The alt text auto-fills from the post title.</p>
        </Step>
        <Step number={5} title="Fill Post Details">
          <p>Set the post status, assign categories, add tags, and write a short excerpt in the right sidebar. The excerpt is shown on listing pages and used for meta descriptions.</p>
        </Step>
        <Step number={6} title="Save or Publish">
          <p>Use the <strong>Save Draft</strong> button at the top right. Set the status dropdown to <Badge color="green">Published</Badge> and save to make it live on the website.</p>
        </Step>
      </div>
    ),
  },
  {
    id: "toolbar",
    icon: <FiList size={18} />,
    title: "Editor Toolbar",
    content: (
      <div>
        <p className="text-gray-600 mb-4">The toolbar is always visible at the top of the editor. Here is what each group of buttons does:</p>
        <Table rows={[
          ["Undo / Redo", "Undo last action or redo it", ""],
          ["Bold / Italic / Underline / Strike", "Inline text formatting", ""],
          ["Headings (H1–H6)", "Set paragraph as a heading level", ""],
          ["Bullet List / Numbered List", "Create unordered or ordered lists", ""],
          ["Blockquote", "Indent text as a blockquote", ""],
          ["Code Block", "Insert a preformatted code snippet", ""],
          ["Text Align", "Left, center, or right alignment", ""],
          ["Text Color", "Change the color of selected text", ""],
          ["Font Size", "Increase or decrease font size", ""],
          ["Link", "Insert or edit a hyperlink on selected text", ""],
          ["Image", "Upload or embed an image by URL", ""],
          ["Table", "Insert a table. Edit rows/cols via toolbar when cursor is inside", ""],
          ["CTA Banner", "Insert an orange call-to-action block", ""],
        ]} />
        <div className="mt-4">
          <p className="font-semibold text-gray-800 mb-2">Keyboard Shortcuts</p>
          <Table rows={[
            ["Bold", "Ctrl + B", ""],
            ["Italic", "Ctrl + I", ""],
            ["Underline", "Ctrl + U", ""],
            ["Undo", "Ctrl + Z", ""],
            ["Redo", "Ctrl + Shift + Z", ""],
            ["Link", "Ctrl + K", ""],
          ]} />
        </div>
        <Tip>To edit a link: click the linked text first, then click the Link icon in the toolbar. Clicking linked text directly will NOT navigate — use Ctrl+Click or the external link icon to open it.</Tip>
      </div>
    ),
  },
  {
    id: "images",
    icon: <FiImage size={18} />,
    title: "Images",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Images in the editor support both upload and URL embedding. After inserting, click the image to see positioning and size controls.</p>
        <Table rows={[
          ["Insert Image", "Toolbar → Image icon → Upload file or paste URL", ""],
          ["Resize", "Click image → drag the resize handle at bottom-right corner", ""],
          ["Align Left / Center / Right", "Click image → alignment buttons appear above", ""],
          ["Float (wrap text)", "Click image → choose float left or float right", ""],
          ["Alt Text", "Set during upload dialog — important for SEO and accessibility", ""],
        ]} />
        <Tip>Always fill in the alt text — it is read by screen readers and indexed by Google Image Search. For the featured image, alt text auto-fills from the post title.</Tip>
        <Warning>Large images slow down page load. Resize images to max 1200px wide before uploading. The site uses WebP optimization automatically.</Warning>
      </div>
    ),
  },
  {
    id: "tables",
    icon: <MdTableChart size={18} />,
    title: "Tables",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Click the Table icon in the toolbar to insert a table. When your cursor is inside a table, additional table controls appear in the toolbar.</p>
        <Table rows={[
          ["Add Row Below", "Table toolbar → Add Row Below", ""],
          ["Add Row Above", "Table toolbar → Add Row Above", ""],
          ["Delete Row", "Table toolbar → Delete Row", ""],
          ["Add Column After", "Table toolbar → Add Column After", ""],
          ["Add Column Before", "Table toolbar → Add Column Before", ""],
          ["Delete Column", "Table toolbar → Delete Column", ""],
          ["Delete Table", "Table toolbar → Delete Table", ""],
          ["Max Columns", "10 columns maximum", ""],
        ]} />
        <Tip>Click inside any cell to position your cursor in the table. The table toolbar will appear automatically above the main toolbar.</Tip>
        <Warning>Text in table cells wraps automatically — it will not break the layout. Do not paste large blocks of text into tables as they are hard to read on mobile.</Warning>
      </div>
    ),
  },
  {
    id: "links",
    icon: <FiLink size={18} />,
    title: "Links",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">To add a link, select the text first, then click the Link icon in the toolbar.</p>
        <Step number={1} title="Select text">
          <p>Highlight the words you want to link.</p>
        </Step>
        <Step number={2} title="Click the Link icon">
          <p>The link dialog opens. Enter the URL, and choose whether to open in a new tab or follow (nofollow).</p>
        </Step>
        <Step number={3} title="Edit or remove an existing link">
          <p>Click on the linked text → click the Link icon again → edit or click Remove Link.</p>
        </Step>
        <Warning>Clicking linked text in the editor does NOT open the link (intentional). To open the URL use the external link icon that appears in the link dialog, or Ctrl+Click.</Warning>
        <Tip>For external links, always check "Open in new tab" and consider "nofollow" for sponsored or affiliate links.</Tip>
      </div>
    ),
  },
  {
    id: "cta",
    icon: <FiFileText size={18} />,
    title: "CTA Banner",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">The CTA Banner is a full-width orange call-to-action block. Insert it from the toolbar (last button). All text is editable inline — click any text to edit it directly inside the banner.</p>
        <Table rows={[
          ["Heading", "Click the heading text to edit it inline", ""],
          ["Paragraph", "Click the body text to edit it inline", ""],
          ["Button Text", "Click the button label to edit it inline", ""],
          ["Button URL (link type)", "Edit the URL field below the button", ""],
          ["Email Placeholder (subscribe type)", "Click the placeholder text to edit", ""],
        ]} />
        <Tip>Use CTA banners near the end of long articles or between sections to guide readers to contact or subscribe.</Tip>
      </div>
    ),
  },
  {
    id: "seo-basics",
    icon: <FiSearch size={18} />,
    title: "SEO Basics",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          SEO (Search Engine Optimization) is how Google and other search engines discover, understand, and rank your blog posts. The editor handles the technical SEO for you — your job is to fill in the fields correctly.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-blue-800 mb-2">What Google looks at (in order of importance):</p>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
            <li>Content quality and relevance to the search query</li>
            <li>Page title and meta description</li>
            <li>URL structure (slug)</li>
            <li>Headings (H1, H2, H3) structure</li>
            <li>Internal and external links</li>
            <li>Image alt texts</li>
            <li>Page load speed</li>
            <li>Structured data (JSON-LD schema)</li>
          </ol>
        </div>
        <p className="font-semibold text-gray-800">Focus Keyword</p>
        <p className="text-sm text-gray-600">The focus keyword is the primary search term you want the post to rank for. Enter it in the SEO dialog. The SEO analyzer will then check how well you have used it across the post.</p>
        <Tip>Choose one specific focus keyword per post. For example: <em>"mobile app development services"</em> is better than <em>"apps"</em>. Avoid targeting the same keyword on two different posts.</Tip>
      </div>
    ),
  },
  {
    id: "seo-dialog",
    icon: <FiSearch size={18} />,
    title: "SEO Dialog — Field by Field",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Open the SEO dialog by clicking the <strong>SEO Settings</strong> button at the top of the right sidebar. It contains two columns.</p>

        <p className="font-semibold text-gray-800 mt-4">Left Column</p>
        <Table rows={[
          ["Focus Keyword", "The main keyword you are targeting. Used by the SEO analyzer to score your post.", "Required"],
          ["SEO Title", "The title shown in Google search results. Max 60 characters. Different from the post title — make it keyword-rich and compelling.", "Required"],
          ["Meta Description", "The snippet shown under the title in search results. Max 160 characters. Summarize the post and include the keyword.", "Required"],
          ["Snippet Preview", "Live preview of how your post will appear in Google search results.", "Auto"],
          ["Canonical URL", "If this post exists at another URL, enter it here to avoid duplicate content issues. Leave blank normally.", "Optional"],
          ["Robots Index", "Leave checked (default). Uncheck only if you do not want Google to index this post.", "Default: ON"],
          ["Robots Follow", "Leave checked (default). Uncheck for pages with many outbound links you do not want to pass authority to.", "Default: ON"],
        ]} />

        <p className="font-semibold text-gray-800 mt-4">Right Column</p>
        <Table rows={[
          ["Meta Keywords", "Comma-separated keywords. Ignored by Google but still read by Bing and Yandex.", "Optional"],
          ["OG Title", "Title shown when the post is shared on Facebook/LinkedIn. Defaults to SEO title if blank.", "Optional"],
          ["OG Description", "Description shown in Facebook/LinkedIn share cards.", "Optional"],
          ["OG Image", "Image shown in Facebook/LinkedIn share cards. Defaults to featured image.", "Optional"],
          ["Twitter Title", "Title for Twitter (X) card previews.", "Optional"],
          ["Twitter Description", "Description for Twitter (X) card previews.", "Optional"],
          ["Twitter Image", "Image for Twitter (X) card previews.", "Optional"],
          ["Twitter Card Type", "summary_large_image shows a big image. summary shows a small thumbnail.", "Default: large"],
        ]} />

        <Tip>Use the <MdAutoAwesome className="inline text-[#F15C20]" size={14} /> AI button next to any SEO field to auto-generate optimized content. The AI is limited to 60 chars for titles and 160 chars for descriptions automatically.</Tip>
      </div>
    ),
  },
  {
    id: "seo-score",
    icon: <FiCheckCircle size={18} />,
    title: "SEO Score & Analysis",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">The SEO Analysis accordion in the right sidebar gives you a live score and actionable recommendations. Open it to see what to fix.</p>
        <Table rows={[
          ["Green (Good)", "The check has passed — nothing to do", ""],
          ["Amber (Improve)", "The check is acceptable but could be better", ""],
          ["Red (Fix)", "The check has failed — needs attention before publishing", ""],
        ]} />
        <p className="font-semibold text-gray-800 mt-4">Common checks explained:</p>
        <Table rows={[
          ["Focus keyword in title", "Your SEO title should contain the focus keyword", ""],
          ["Focus keyword in meta description", "Your meta description should contain the focus keyword", ""],
          ["Focus keyword in slug", "Your URL slug should contain the focus keyword", ""],
          ["Focus keyword in first paragraph", "Mention the keyword in the opening lines of the post", ""],
          ["Keyword density", "Aim for 1–3% — not too rare, not stuffed", ""],
          ["Meta description length", "Must be between 120–160 characters", ""],
          ["SEO title length", "Must be between 50–60 characters", ""],
          ["Post length", "Posts under 300 words are considered thin content", ""],
          ["Internal links", "Link to other pages on dignitestudios.com to improve crawlability", ""],
          ["Image alt text", "All images should have descriptive alt text", ""],
          ["Headings structure", "Use H2/H3 subheadings to break up the content", ""],
        ]} />
        <Tip>Aim for a score above 70 before publishing. You do not need a perfect 100 — focus on the red items first.</Tip>
      </div>
    ),
  },
  {
    id: "schema",
    icon: <MdOutlineSchema size={18} />,
    title: "JSON-LD Schema Generator",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          JSON-LD Schema is structured data that tells Google exactly what your content is — a blog post, an article, a how-to guide, etc. It enables <strong>rich results</strong> in Google Search (star ratings, breadcrumbs, article dates, author info).
        </p>
        <p className="font-semibold text-gray-800">How to use it:</p>
        <Step number={1} title="Open the Schema Generator">
          <p>In the right sidebar, click the <strong>JSON-LD Schema</strong> button.</p>
        </Step>
        <Step number={2} title="Select Article @type">
          <p><strong>BlogPosting</strong> is correct for most blog posts. Use <strong>Article</strong> for news-style posts and <strong>NewsArticle</strong> for press releases.</p>
        </Step>
        <Step number={3} title="Fill in the fields">
          <p>Headline, URL, Image URL, Description are auto-filled from the post. Set Author Name, Publisher, and dates.</p>
        </Step>
        <Step number={4} title="Use AI Fill">
          <p>Click <strong>AI Fill Fields</strong> to auto-populate all fields based on the post content.</p>
        </Step>
        <Step number={5} title="Validate & Save">
          <p>Use the <strong>Rich Results Test</strong> link in the preview to validate your schema with Google. Click <strong>Save Schema</strong>.</p>
        </Step>
        <Tip>Always set the Author name and Publisher name correctly. Google uses this to establish E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) — a key ranking factor for content sites.</Tip>
        <Warning>The schema is embedded in the page automatically when the post is published. You do not need to copy/paste the script tag anywhere.</Warning>
      </div>
    ),
  },
  {
    id: "publish",
    icon: <FiSave size={18} />,
    title: "Saving & Publishing",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Use the status selector and Save button at the top-right of the editor to manage post state.</p>
        <Table rows={[
          ["Draft", "Post is saved but not visible on the website. Safe to work on.", ""],
          ["Published", "Post is live on dignitestudios.com/blog and in the sitemap.", ""],
        ]} />
        <Step number={1} title="Save as Draft">
          <p>Select <Badge>Draft</Badge> from the status dropdown and click <strong>Save Draft</strong>. You can come back and edit it anytime.</p>
        </Step>
        <Step number={2} title="Publish">
          <p>Select <Badge color="green">Published</Badge> from the dropdown and click <strong>Save Draft</strong> (same button — the button label updates). The post goes live immediately.</p>
        </Step>
        <Step number={3} title="Unpublish">
          <p>Open the post, change status back to <Badge>Draft</Badge>, and save. It is removed from the website and sitemap immediately.</p>
        </Step>
        <Warning>A featured image is required before you can publish. The editor will show an error if it is missing.</Warning>
        <Tip>After publishing, verify the post is in the sitemap by visiting dignitestudios.com/sitemap.xml — your new post slug should appear there.</Tip>
      </div>
    ),
  },
  {
    id: "stats",
    icon: <FiEye size={18} />,
    title: "Post Statistics",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">The statistics panel in the right sidebar shows live metrics as you write.</p>
        <Table rows={[
          ["Word Count", "Total number of words in the post body", ""],
          ["Character Count", "Total characters including spaces", ""],
          ["Paragraphs", "Number of paragraph elements", ""],
          ["Headings", "Number of heading elements (H1–H6)", ""],
          ["Read Time", "Estimated at 265 WPM — updates live as you type", ""],
        ]} />
        <p className="font-semibold text-gray-800">Editing Read Time</p>
        <p className="text-sm text-gray-600">The read time field is editable. Click the number directly and type a custom value. An <strong>auto</strong> link appears — click it to reset back to the auto-calculated value.</p>
        <Tip>Aim for posts over 1,000 words for the best SEO performance. Posts between 1,500–2,500 words tend to rank highest for competitive keywords.</Tip>
      </div>
    ),
  },
  {
    id: "categories",
    icon: <FiTag size={18} />,
    title: "Categories & Tags",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Categories and tags help organize content and create topical relevance for SEO.</p>
        <p className="font-semibold text-gray-800">Categories</p>
        <p className="text-sm text-gray-600">Broad topics (e.g. "Mobile Development", "SEO", "Case Studies"). Assign at least one per post. Manage categories from <strong>Dashboard → Categories</strong>.</p>
        <p className="font-semibold text-gray-800">Tags</p>
        <p className="text-sm text-gray-600">Specific keywords related to the post (e.g. "React Native", "iOS", "App Store"). Type tags in the Tags field separated by commas. Tags are flexible — no need to pre-create them.</p>
        <Tip>Use 1–2 categories and 3–8 tags per post. Too many tags dilute topical focus.</Tip>
        <Warning>Avoid creating near-duplicate categories (e.g. "Mobile App" and "Mobile Apps"). Merge similar topics into one category to build topical authority.</Warning>
      </div>
    ),
  },
  {
    id: "sitemap",
    icon: <FiSearch size={18} />,
    title: "Sitemap",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">The sitemap at <strong>dignitestudios.com/sitemap.xml</strong> is fully dynamic — it updates automatically every time you publish or unpublish a post.</p>
        <Table rows={[
          ["Static pages", "Homepage, services, industries, locations — always present", "Monthly"],
          ["Blog index", "/blog — higher priority, daily refresh", "Daily"],
          ["Blog posts", "Each published post slug — added instantly on publish", "Weekly"],
        ]} />
        <Tip>After publishing a new post, submit the sitemap URL to Google Search Console to speed up indexing. Go to Search Console → Sitemaps → enter https://www.dignitestudios.com/sitemap.xml</Tip>
      </div>
    ),
  },
  {
    id: "best-practices",
    icon: <FiCheckCircle size={18} />,
    title: "SEO Best Practices",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            ["One H1 per post", "The post title is your H1. Do not add another H1 inside the editor."],
            ["Use H2 for sections", "Break up the content with H2 headings every 300–400 words."],
            ["First paragraph matters", "Include your focus keyword in the first 100 words of the post."],
            ["Internal linking", "Link to at least 2–3 other pages on the site in every post."],
            ["External links", "Link to credible sources (research, statistics). Adds trust signals."],
            ["Image optimization", "Compress images before upload. Use descriptive filenames."],
            ["Meta description = CTA", "Write it like an ad — make it compelling enough to click."],
            ["Avoid keyword stuffing", "Use synonyms and related terms naturally throughout the post."],
            ["Update old posts", "Refreshing content with new info signals freshness to Google."],
            ["Mobile-first writing", "Use short paragraphs (2–4 lines), clear headings, and bullet lists."],
          ].map(([title, desc]) => (
            <div key={title} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-gray-800 mb-0.5">{title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GuidePage() {
  const [activeId, setActiveId] = useState("overview");
  const active = SECTIONS.find((s) => s.id === activeId)!;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left nav */}
      <aside className="w-56 shrink-0 border-r border-gray-100 bg-white overflow-y-auto py-6">
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contents</p>
        <nav className="space-y-0.5 px-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                s.id === activeId
                  ? "bg-[#F15C20] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="shrink-0">{s.icon}</span>
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-[#F15C20] flex items-center justify-center text-white shrink-0">
              {active.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">User Guide</p>
              <h1 className="text-2xl font-bold text-gray-900">{active.title}</h1>
            </div>
          </div>

          {/* Section content */}
          <div className="prose-sm max-w-none">{active.content}</div>

          {/* Prev / Next */}
          <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
            {SECTIONS.findIndex((s) => s.id === activeId) > 0 ? (
              <button
                onClick={() => setActiveId(SECTIONS[SECTIONS.findIndex((s) => s.id === activeId) - 1].id)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <FiChevronRight className="rotate-180" size={16} />
                {SECTIONS[SECTIONS.findIndex((s) => s.id === activeId) - 1].title}
              </button>
            ) : <div />}
            {SECTIONS.findIndex((s) => s.id === activeId) < SECTIONS.length - 1 ? (
              <button
                onClick={() => setActiveId(SECTIONS[SECTIONS.findIndex((s) => s.id === activeId) + 1].id)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {SECTIONS[SECTIONS.findIndex((s) => s.id === activeId) + 1].title}
                <FiChevronRight size={16} />
              </button>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
}
