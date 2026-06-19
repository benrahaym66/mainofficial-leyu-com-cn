const contentMap = {
  sections: [
    { id: 'home', title: '首页', tags: ['体育', '赛事', '首页'], keywords: ['乐鱼体育', '体育直播', '首页导航'] },
    { id: 'live', title: '直播', tags: ['直播', '现场', '实时'], keywords: ['乐鱼体育直播', '现场赛事', '实时比分'] },
    { id: 'news', title: '新闻', tags: ['新闻', '资讯', '报道'], keywords: ['体育新闻', '乐鱼资讯', '赛事报道'] },
    { id: 'highlights', title: '集锦', tags: ['集锦', '精彩', '回放'], keywords: ['乐鱼集锦', '精彩瞬间', '比赛回放'] },
    { id: 'stats', title: '数据', tags: ['数据', '统计', '分析'], keywords: ['球队数据', '球员统计', '比赛分析'] }
  ],
  defaultSite: 'https://mainofficial-leyu.com.cn',
  fallbackTags: ['体育', '乐鱼', '赛事']
};

function filterSections(query) {
  const lowerQuery = query.toLowerCase().trim();
  if (lowerQuery === '') {
    return contentMap.sections;
  }
  return contentMap.sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const keywordMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    return titleMatch || tagMatch || keywordMatch;
  });
}

function getSectionById(id) {
  return contentMap.sections.find(section => section.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
    section.keywords.forEach(kw => tagSet.add(kw));
  });
  contentMap.fallbackTags.forEach(tag => tagSet.add(tag));
  return Array.from(tagSet);
}

function renderSectionList(sections) {
  return sections.map(section => {
    return `  <li data-section="${section.id}">${section.title} (标签: ${section.tags.join(', ')})</li>`;
  }).join('\n');
}

function searchAndRender(query) {
  const results = filterSections(query);
  if (results.length === 0) {
    return '<p>未找到相关分区，请尝试其他关键词。</p>';
  }
  return `<ul>\n${renderSectionList(results)}\n</ul>`;
}

// 示例：使用关联 URL 和核心关键词
const siteUrl = contentMap.defaultSite;
const coreKeyword = '乐鱼体育';
console.log(`站点: ${siteUrl}, 核心关键词: ${coreKeyword}`);

// 示例搜索
const sampleQuery = '乐鱼';
console.log(searchAndRender(sampleQuery));

// 导出供其他模块使用（如果环境支持）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { contentMap, filterSections, getSectionById, getAllTags, searchAndRender };
}