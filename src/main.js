import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const e = React.createElement;
const stages = [
  { id: 'input', label: '输入需求', description: '描述目标、场景与限制条件' },
  { id: 'analysis', label: 'AI 分析', description: '提取意图、拆解任务与评估优先级' },
  { id: 'result', label: '输出方案', description: '生成可执行的产品方案' },
];
const starterPrompt = '我想为一家咖啡品牌设计会员增长活动，希望提升复购率，并能在两周内上线。';

function App() {
  const [step, setStep] = useState('input');
  const [requirement, setRequirement] = useState(starterPrompt);
  const result = useMemo(() => buildSolution(requirement), [requirement]);
  const currentIndex = stages.findIndex((item) => item.id === step);

  function startAnalysis() {
    if (!requirement.trim()) return;
    setStep('analysis');
    window.setTimeout(() => setStep('result'), 1800);
  }

  return e('main', { className: 'app-shell' },
    e('section', { className: 'hero-card' },
      e('div', { className: 'hero-copy' },
        e('p', { className: 'eyebrow' }, 'AI Product Flow Prototype'),
        e('h1', null, '从需求输入到方案输出的 AI 产品体验'),
        e('p', { className: 'subtitle' }, '用三步式页面展示用户提交需求、AI 分析处理、最终输出方案的完整闭环。')
      ),
      e('div', { className: 'progress-panel', 'aria-label': '流程进度' },
        stages.map((stage, index) => e('div', { className: `progress-item ${index <= currentIndex ? 'active' : ''}`, key: stage.id },
          e('span', null, index + 1),
          e('div', null, e('strong', null, stage.label), e('small', null, stage.description))
        ))
      )
    ),
    step === 'input' && e(InputPage, { requirement, setRequirement, startAnalysis }),
    step === 'analysis' && e(AnalysisPage),
    step === 'result' && e(ResultPage, { result, setStep })
  );
}

function InputPage({ requirement, setRequirement, startAnalysis }) {
  return e('section', { className: 'workspace input-page' },
    e('div', null,
      e('p', { className: 'section-kicker' }, '页面 1 / 输入页'),
      e('h2', null, '告诉 AI 你想解决什么问题'),
      e('p', null, '输入业务目标、用户场景、时间限制或资源约束，AI 将据此生成结构化建议。')
    ),
    e('label', { className: 'prompt-box' },
      e('span', null, '需求描述'),
      e('textarea', { value: requirement, onChange: (event) => setRequirement(event.target.value), rows: 8 })
    ),
    e('div', { className: 'actions' },
      e('button', { className: 'secondary', onClick: () => setRequirement(starterPrompt) }, '填入示例'),
      e('button', { className: 'primary', onClick: startAnalysis, disabled: !requirement.trim() }, '开始 AI 分析')
    )
  );
}

function AnalysisPage() {
  return e('section', { className: 'workspace analysis-page' },
    e('p', { className: 'section-kicker' }, '页面 2 / 分析加载页'),
    e('div', { className: 'orb', 'aria-hidden': 'true' }),
    e('h2', null, 'AI 正在理解你的需求'),
    e('p', null, '正在识别核心目标、用户动机、实施路径和潜在风险，请稍候。'),
    e('div', { className: 'analysis-list' }, e('span', null, '意图识别'), e('span', null, '方案拆解'), e('span', null, '优先级排序'))
  );
}

function ResultPage({ result, setStep }) {
  return e('section', { className: 'workspace result-page' },
    e('div', { className: 'result-header' },
      e('div', null, e('p', { className: 'section-kicker' }, '页面 3 / 结果页'), e('h2', null, result.title), e('p', null, result.summary)),
      e('button', { className: 'secondary', onClick: () => setStep('input') }, '重新输入')
    ),
    e('div', { className: 'cards-grid' }, result.cards.map((card) => e('article', { className: 'solution-card', key: card.title }, e('span', null, card.icon), e('h3', null, card.title), e('p', null, card.text)))),
    e('div', { className: 'roadmap' },
      e('h3', null, '建议执行节奏'),
      result.timeline.map((item, index) => e('div', { className: 'timeline-item', key: item }, e('b', null, `0${index + 1}`), e('span', null, item)))
    )
  );
}

function buildSolution(input) {
  const shortInput = input.trim().replace(/\s+/g, ' ').slice(0, 42) || '你的产品需求';
  return {
    title: 'AI 生成的产品方案',
    summary: `基于“${shortInput}${input.length > 42 ? '…' : ''}”，建议采用轻量验证、快速上线、持续优化的策略。`,
    cards: [
      { icon: '🎯', title: '核心目标', text: '将模糊需求转化为可衡量目标，优先锁定最能影响业务结果的关键动作。' },
      { icon: '🧭', title: '体验路径', text: '设计清晰入口、即时反馈和下一步指引，让用户在每个节点都知道该做什么。' },
      { icon: '📊', title: '衡量指标', text: '跟踪转化率、完成率、留存或复购等指标，用数据判断方案是否有效。' },
    ],
    timeline: ['第 1-2 天完成需求澄清与原型确认', '第 3-7 天实现核心流程并接入埋点', '第 8-14 天小流量验证并迭代优化'],
  };
}

createRoot(document.getElementById('root')).render(e(App));
