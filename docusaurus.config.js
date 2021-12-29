const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '小博小屋',
  tagline: 'wb is very cool',
  url: 'https://jstop1.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'wangbo person', // Usually your GitHub org/user name.
  projectName: 'wb Blog', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: '可爱的小博',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/blog', label: 'Blog', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'best friend',
          items: [
            {
              label: '老吉',
              to: 'https://jsfan.net/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'old Blog',
              to: 'https://jstop1.com'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wangbo122',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mr Wang, Person. Built with Docusaurus.`,
    },
    prism: {
      // theme: lightCodeTheme,
      // darkTheme: darkCodeTheme,
      theme: darkCodeTheme,
      lightTheme: lightCodeTheme
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All blog posts',
          // Please change this to your repo.
          // editUrl:
            // 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
