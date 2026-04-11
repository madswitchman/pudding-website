'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

function Section({ children, className = '', divider = true }: { children: React.ReactNode; className?: string; divider?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <>
      {divider && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="h-px bg-gradient-to-r from-transparent via-navy-600/50 to-transparent" />
        </div>
      )}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
        className={`relative py-16 md:py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}
      >
        {children}
      </motion.section>
    </>
  )
}

// Animated background particles
function ParticleField() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Animated code block with typing effect
function CodeBlock() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const lines = [
    { text: 'policy:', cls: 'token-key' },
    { text: '  name: ', cls: 'token-key', val: 'healthcare-agent', valCls: 'token-string' },
    { text: '  standard: ', cls: 'token-key', val: 'HIPAA', valCls: 'token-string' },
    { text: '  rules:', cls: 'token-key' },
    { text: '    - action: ', cls: 'token-key', val: 'block', valCls: 'token-string' },
    { text: '      condition: ', cls: 'token-key', val: 'contains_phi', valCls: 'token-string' },
    { text: '      targets: ', cls: 'token-key', val: '[external_llm, third_party_api]', valCls: 'token-bracket' },
    { text: '    - action: ', cls: 'token-key', val: 'redact', valCls: 'token-string' },
    { text: '      condition: ', cls: 'token-key', val: 'contains_pii', valCls: 'token-string' },
    { text: '      fields: ', cls: 'token-key', val: '[ssn, dob, address]', valCls: 'token-bracket' },
    { text: '      targets: ', cls: 'token-key', val: '[external_llm]', valCls: 'token-bracket' },
    { text: '    - action: ', cls: 'token-key', val: 'allow', valCls: 'token-string' },
    { text: '      condition: ', cls: 'token-key', val: 'sanitized', valCls: 'token-string' },
    { text: '      targets: ', cls: 'token-key', val: '[all]', valCls: 'token-bracket' },
    { text: '  audit:', cls: 'token-key' },
    { text: '    level: ', cls: 'token-key', val: 'full', valCls: 'token-string' },
    { text: '    retention: ', cls: 'token-key', val: '7_years', valCls: 'token-string' },
  ]

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-amber-500/10 to-transparent rounded-2xl blur-xl" />
      <div className="relative bg-navy-800 border border-navy-600/50 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-600/50 bg-navy-900/50">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-sm text-slate-500 font-mono">pudding-policy.yaml</span>
        </div>
        <pre className="p-4 md:p-6 font-mono text-xs md:text-base leading-relaxed overflow-x-auto">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <span className={line.cls}>{line.text}</span>
              {line.val && <span className={line.valCls}>{line.val}</span>}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  )
}

// Architecture diagram
function ArchitectureDiagram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const layers = [
    { label: 'AI Agents', items: ['LLM Agent', 'Code Agent', 'Data Agent', 'Custom Agent'], color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/30' },
    { label: 'PUDDING Gateway', items: ['Policy Engine', 'Data Sanitizer', 'Audit Logger', 'User Profiles', 'Secret Detection'], color: 'from-amber-400/20 to-amber-500/10', border: 'border-amber-400/40', highlight: true },
    { label: 'External Services', items: ['APIs', 'Databases', 'LLM Providers', 'Cloud Services'], color: 'from-slate-500/20 to-slate-600/10', border: 'border-slate-500/30' },
  ]

  return (
    <div ref={ref} className="space-y-4">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: i * 0.25, duration: 0.6 }}
          className={`relative bg-gradient-to-r ${layer.color} border ${layer.border} rounded-2xl p-6 ${layer.highlight ? 'glow-amber' : ''}`}
        >
          <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${layer.highlight ? 'text-amber-400' : 'text-slate-400'}`}>
            {layer.label}
          </h4>
          <div className="flex flex-wrap gap-3">
            {layer.items.map((item, j) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.25 + j * 0.1, duration: 0.4 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  layer.highlight
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                    : 'bg-navy-700/50 text-slate-300 border border-navy-600/50'
                }`}
              >
                {item}
              </motion.span>
            ))}
          </div>
          {i < layers.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: i * 0.25 + 0.4, duration: 0.4 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-amber-400/40 to-transparent origin-top"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const problemCards = [
    { icon: '🔓', title: 'No Data Sovereignty', desc: 'Sensitive data flows through third-party AI services with zero governance or control.' },
    { icon: '👻', title: 'No Audit Trail', desc: 'When something goes wrong, there is no provable record of what happened or why.' },
    { icon: '🧩', title: 'No Unified Standard', desc: 'Every organization reinvents compliance. There is no shared framework for agentic AI.' },
  ]

  const principles = [
    { icon: '🔒', title: 'Local-First', desc: 'Your data never leaves your infrastructure. Governance happens at the edge, not in the cloud.' },
    { icon: '🛡️', title: 'Provable Compliance', desc: 'Hash-chained audit logs create tamper-evident proof that policies were enforced.' },
    { icon: '🌍', title: 'Open Standard', desc: 'Community-driven, open-source framework. No vendor lock-in, no black boxes.' },
    { icon: '🔌', title: 'Agent Agnostic', desc: 'Works with any AI agent, any LLM provider, any orchestration framework.' },
  ]

  const features = [
    { title: 'Policy Engine', desc: 'Declarative YAML policies that define exactly what your AI agents can and cannot do. Versioned, auditable, hot-reloadable.', icon: '📋' },
    { title: 'Data Sanitizer', desc: 'Multi-layered PII and secret detection with pattern matching, entity recognition, entropy analysis, and service-specific credential scanning.', icon: '🧹' },
    { title: 'External User Profiles', desc: 'Define what each external entity can see about you. Trust levels control access at the identity layer, not just pattern matching.', icon: '👤' },
    { title: 'Audit Logger', desc: 'Tamper-evident, hash-chained logs with optional blockchain anchoring for maximum trust.', icon: '📝' },
    { title: 'Container Isolation', desc: 'Agents are sandboxed in their own network and can only communicate through the gateway. Backends stay fully internal.', icon: '🐳' },
    { title: 'RAG/Memory Layer', desc: 'Local vector store with governed memory. Full control over what your agents remember and who can access it.', icon: '🧠' },
  ]

  const frameworks = [
    'HIPAA', 'SOC 2', 'FedRAMP', 'GDPR', 'NIST AI RMF', 'PCI-DSS', 'FERPA', 'CCPA', 'CUI/ITAR', 'Custom',
  ]

  const roadmap = [
    { phase: 'Phase 1', time: 'Q1 2026', title: 'Gateway & Detection', desc: 'Gateway-first architecture with 5 detection backends, container isolation, agent lifecycle management. 332+ tests passing.', active: true, complete: true },
    { phase: 'Phase 2', time: 'Q2 2026', title: 'Policy Engine & CLI', desc: 'Policy engine MVP, CLI interface (pudding scan, pudding sanitize, pudding resolve), documentation, and early adopter program.' },
    { phase: 'Phase 3', time: 'Q3-Q4 2026', title: 'Premium Services', desc: 'Enterprise support, managed compliance, advanced analytics, and custom integrations.' },
    { phase: 'Phase 4', time: '2027', title: 'Standard Adoption', desc: 'Industry partnerships, certification programs, and regulatory body engagement.' },
  ]

  const team = [
    { name: 'Brett Ball', role: 'Security & Compliance Architecture' },
    { name: 'Keenan Tipton', role: 'Agent Orchestration & Platform' },
  ]

  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <ParticleField />
        <div className="mesh-gradient absolute inset-0" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight">
              <img src="/pudding-icon.svg" alt="" className="inline-block h-[1.15em] mr-3 align-bottom translate-y-[0.05em]" /><span className="gradient-text">PUDDING</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-amber-400/80 font-medium tracking-wide mb-4"
          >
            Provable Unified Data-Driven Intelligent Normative Governance
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 mb-3 max-w-3xl mx-auto"
          >
            Human-Owned AI Memory with Built-In Data Governance
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-lg text-slate-400 italic mb-10"
          >
            The proof is in the PUDDING.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://github.com/madswitchman/pudding"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-400 text-navy-900 font-bold rounded-xl hover:bg-amber-300 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-400/20"
            >
              View on GitHub
            </a>
            <a
              href="#whitepaper"
              className="px-8 py-4 border border-amber-400/30 text-amber-400 font-bold rounded-xl hover:bg-amber-400/10 transition-all hover:scale-105"
            >
              Read the White Paper
            </a>
          </motion.div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-500/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* The Problem */}
      <Section>
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">The Problem</h2>
        </motion.div>
        <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
          AI agents are proliferating.<br />
          <span className="text-slate-500">The governance layer is not.</span>
        </motion.h3>
        <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-12 max-w-2xl">
          Every day, thousands of AI agents are deployed with access to sensitive data, critical systems, and real-world actions.
          Most operate with zero compliance oversight.
        </motion.p>
        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
          {problemCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-navy-800/50 border border-navy-600/50 rounded-2xl p-8 hover:border-amber-400/20 transition-colors"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h4 className="text-xl font-bold mb-3">{card.title}</h4>
              <p className="text-slate-400">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* What is PUDDING? */}
      <Section>
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">What is PUDDING?</h2>
        </motion.div>
        <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-12">
          A governance layer that proves compliance,<br />
          <span className="text-slate-500">not just promises it.</span>
        </motion.h3>
        <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-b from-navy-700/50 to-navy-800/30 border border-navy-600/50 rounded-2xl p-8 hover:border-amber-400/20 transition-all group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h4 className="text-lg font-bold mb-3 text-amber-400/90">{p.title}</h4>
              <p className="text-slate-400 text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Architecture */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div variants={fadeUp}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Architecture</h2>
            </motion.div>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
              One layer between<br />
              <span className="text-slate-500">your agents and the world.</span>
            </motion.h3>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-6">
              PUDDING sits between your AI agents and external services, enforcing policies, sanitizing data,
              and creating tamper-evident audit trails for every interaction.
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <ArchitectureDiagram />
          </motion.div>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Features</h2>
        </motion.div>
        <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-12">
          Everything you need for<br />
          <span className="text-slate-500">agentic AI governance.</span>
        </motion.h3>
        <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-navy-800/50 border border-navy-600/50 rounded-2xl p-8 hover:border-amber-400/20 hover:glow-amber transition-all group cursor-default"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h4 className="text-lg font-bold mb-3">{f.title}</h4>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Code Example */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div variants={fadeUp}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Policy as Code</h2>
            </motion.div>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
              Declarative. Readable.<br />
              <span className="text-slate-500">Enforceable.</span>
            </motion.h3>
            <motion.p variants={fadeUp} className="text-lg text-slate-400">
              Define your compliance policies in simple YAML. PUDDING enforces them automatically
              across every agent interaction, every time, with full audit trails.
            </motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <CodeBlock />
          </motion.div>
        </div>
      </Section>

      {/* Regulatory Coverage */}
      <Section>
        <motion.div variants={fadeUp} className="text-center mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Regulatory Coverage</h2>
          <h3 className="text-3xl md:text-5xl font-bold">
            Designed to support<br />
            <span className="text-slate-500">the frameworks that matter.</span>
          </h3>
        </motion.div>
        <motion.p variants={fadeUp} className="text-center text-slate-400 mb-10 max-w-2xl mx-auto">
          PUDDING helps satisfy audit requirements for the following standards. It does not confer certification.
        </motion.p>
        <motion.div variants={stagger} className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {frameworks.map((fw) => (
            <motion.span
              key={fw}
              variants={fadeUp}
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              className="px-6 py-3 bg-navy-800/50 border border-navy-600/50 rounded-xl text-sm md:text-base font-semibold hover:border-amber-400/30 hover:text-amber-400 transition-all cursor-default"
            >
              {fw}
            </motion.span>
          ))}
        </motion.div>
      </Section>

      {/* Open Source */}
      <Section className="text-center">
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Open Source</h2>
        </motion.div>
        <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
          The proof is in the code.<br />
          <span className="text-slate-500">Every line is open for inspection.</span>
        </motion.h3>
        <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          PUDDING is licensed under AGPL-3.0. We believe compliance infrastructure should be transparent,
          auditable, and community-driven. No black boxes. No trust-us promises.
        </motion.p>
        <motion.div variants={fadeUp}>
          <a
            href="https://github.com/madswitchman/pudding"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy-800 border border-amber-400/30 text-amber-400 font-bold rounded-xl hover:bg-amber-400/10 transition-all hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View on GitHub
          </a>
        </motion.div>
      </Section>

      {/* Roadmap */}
      <Section>
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Roadmap</h2>
          <h3 className="text-3xl md:text-5xl font-bold">
            Where we are going.
          </h3>
        </motion.div>
        <motion.div variants={stagger} className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/40 via-amber-400/20 to-transparent" />
          {roadmap.map((item, i) => (
            <motion.div
              key={item.phase}
              variants={fadeUp}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
            >
              <div className={`absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full border-2 ${
                item.complete ? 'bg-green-400 border-green-400 shadow-lg shadow-green-400/40' : item.active ? 'bg-amber-400 border-amber-400 shadow-lg shadow-amber-400/40' : 'bg-navy-800 border-slate-500'
              }`} />
              <div className="text-sm text-amber-400 font-semibold mb-1">{item.phase} - {item.time}</div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Team */}
      <Section className="text-center">
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Team</h2>
        </motion.div>
        <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-12">
          Built by builders.
        </motion.h3>
        <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
          {team.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-navy-800/50 border border-navy-600/50 rounded-2xl p-8 min-w-[280px] hover:border-amber-400/20 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/10 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-amber-400">
                {t.name[0]}
              </div>
              <h4 className="text-lg font-bold mb-1">{t.name}</h4>
              <p className="text-slate-400 text-sm">{t.role}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} className="text-slate-500">
          Built in Huntsville, AL by 10X Foundation
        </motion.p>
      </Section>

      {/* Footer */}
      <footer className="border-t border-navy-600/50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold gradient-text mb-8">The proof is in the PUDDING.</p>
          <div className="flex justify-center gap-8 mb-8 text-sm">
            <a href="https://github.com/madswitchman/pudding" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">GitHub</a>
            <a href="#whitepaper" className="text-slate-400 hover:text-amber-400 transition-colors">White Paper</a>
            <a href="#contact" className="text-slate-400 hover:text-amber-400 transition-colors">Contact</a>
          </div>
          <p className="text-slate-600 text-sm">&copy; 2026 10X Foundation. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
