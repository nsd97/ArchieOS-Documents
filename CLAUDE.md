# ArchieOS Repository Guide

This monorepo contains the ArchieOS marketing landing page and documentation site.

## Repository Structure

```
addis/
├── archieos-landing/    # Next.js 16 landing page (port 3000)
├── docs/                # Nextra 4 documentation site (port 3001)
├── conductor.json       # Root scripts config
├── package.json         # Workspace scripts
└── CLAUDE.md           # This file
```

## Development Commands

```bash
# From repository root
npm run dev          # Run both landing + docs
npm run docs         # Docs only (port 3001)
npm run landing      # Landing only (port 3000)
npm run docs:build   # Build docs for production
npm run landing:build # Build landing for production
```

## Documentation System (Nextra)

All documentation lives in `docs/content/` using MDX files.

### File Structure

```
docs/content/
├── _meta.js              # Root sidebar navigation
├── index.mdx             # Home page (/)
├── investor/
│   ├── _meta.js          # Section navigation
│   ├── one-pager.mdx     # /investor/one-pager
│   └── pitch.mdx         # /investor/pitch
├── product/
│   ├── _meta.js
│   ├── vision.mdx
│   └── roadmap.mdx
└── [more categories...]
```

### Creating a New Page

1. **Create the MDX file** in the appropriate folder:
   ```
   docs/content/category/my-page.mdx
   ```

2. **Add frontmatter** (optional but recommended):
   ```mdx
   ---
   title: My Page Title
   description: Page description for SEO
   ---

   # My Page Title

   Content goes here...
   ```

3. **Register in _meta.js** - Edit `docs/content/category/_meta.js`:
   ```javascript
   export default {
     'existing-page': 'Existing Page',
     'my-page': 'My Page Title'  // Add this line
   }
   ```

### Creating a New Category/Folder

1. **Create the folder**:
   ```
   docs/content/new-category/
   ```

2. **Create _meta.js inside**:
   ```javascript
   // docs/content/new-category/_meta.js
   export default {
     'first-page': 'First Page',
     'second-page': 'Second Page'
   }
   ```

3. **Create MDX files**:
   ```
   docs/content/new-category/first-page.mdx
   docs/content/new-category/second-page.mdx
   ```

4. **Register in root _meta.js** - Edit `docs/content/_meta.js`:
   ```javascript
   export default {
     index: 'Home',
     investor: 'Investor',
     product: 'Product',
     'new-category': 'New Category',  // Add this line
     // ...
   }
   ```

### Editing Existing Pages

- Edit `.mdx` files directly - changes hot-reload automatically
- No server restart needed
- Use standard Markdown plus JSX components

### _meta.js Syntax Reference

```javascript
export default {
  // Simple: filename → display title
  'page-name': 'Display Title',

  // Folder: same pattern
  'folder-name': 'Folder Title',

  // Hidden from sidebar (still accessible via URL)
  'secret-page': {
    title: 'Secret',
    display: 'hidden'
  },

  // External link
  github: {
    title: 'GitHub',
    href: 'https://github.com/org/repo',
    newWindow: true
  },

  // Separator
  '---': {
    type: 'separator'
  }
}
```

### Current Documentation Categories

| Folder | Purpose | URL Path |
|--------|---------|----------|
| `investor/` | Pitch materials, one-pager | `/investor/*` |
| `product/` | Vision, roadmap, data model | `/product/*` |
| `specs/` | Technical specifications | `/specs/*` |
| `gtm/` | Go-to-market strategy | `/gtm/*` |
| `competitors/` | Competitive analysis | `/competitors/*` |
| `internal/` | Hidden internal docs | `/internal/*` |

## Key Configuration Files

| File | Purpose |
|------|---------|
| `docs/content/_meta.js` | Root sidebar navigation |
| `docs/content/*/_meta.js` | Section navigation |
| `docs/theme.config.tsx` | Logo, footer, theme settings |
| `docs/next.config.mjs` | Nextra plugin configuration |
| `docs/mdx-components.tsx` | Custom MDX components |

## Deployment

- **Docs**: https://docs.archieos.ai (Vercel)
- **Landing**: https://archieos.com (Vercel)

Deploy docs:
```bash
cd docs && vercel --prod
```

Deploy landing:
```bash
cd archieos-landing && vercel --prod
```

## Quick Reference

### Add a page to existing category
```bash
# 1. Create file
touch docs/content/product/new-feature.mdx

# 2. Edit _meta.js to add entry
# 3. Add content to the .mdx file
```

### Add a new category
```bash
# 1. Create folder
mkdir docs/content/research

# 2. Create _meta.js
echo "export default { 'market-analysis': 'Market Analysis' }" > docs/content/research/_meta.js

# 3. Create page
touch docs/content/research/market-analysis.mdx

# 4. Edit root _meta.js to add 'research': 'Research'
```

### Hide a page from sidebar
```javascript
// In _meta.js
'draft-page': {
  title: 'Draft',
  display: 'hidden'
}
```
