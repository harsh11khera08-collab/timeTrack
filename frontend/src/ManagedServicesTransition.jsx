/**
 * ManagedServicesTransition.jsx
 * ─────────────────────────────────────────────────────────────
 * Monk Radar — Project → Managed Services Transition Form
 *
 * Covers:
 *   Step 1 — Project overview & SLAs
 *   Step 2 — Access & environments
 *   Step 3 — Architecture & tech stack
 *   Step 4 — Documentation checklist
 *   Step 5 — Known issues & backlog
 *   Step 6 — Daily operations
 *   Step 7 — Team & escalation matrix
 *   Step 8 — Communication & reporting
 *   Step 9 — Risk & compliance
 *   Step 10 — Post-KT verification & sign-off
 *
 * Usage:
 *   import ManagedServicesTransition from './ManagedServicesTransition';
 *   <ManagedServicesTransition
 *     onSubmit={(data) => yourApiCall(data)}
 *     initialValues={{ projectName: 'Contoso D365' }}
 *   />
 *
 * Props:
 *   onSubmit(formData)   — called on final sign-off with full state
 *   initialValues        — optional partial pre-fill
 *
 * Dependencies: React 18+, no external UI libraries
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────

const TOTAL_STEPS = 10;

const STEP_META = [
  { label: 'Project overview',       sub: 'Status, scope & SLAs'           },
  { label: 'Access & environments',  sub: 'Logins, repos & portals'         },
  { label: 'Architecture & stack',   sub: 'Tech, infra & integrations'      },
  { label: 'Documentation',          sub: 'Specs, diagrams & runbooks'      },
  { label: 'Issues & backlog',       sub: 'Bugs, CRs & out-of-scope items'  },
  { label: 'Daily operations',       sub: 'Boards, tickets & monitoring'    },
  { label: 'Team & escalation',      sub: 'Contacts & escalation matrix'    },
  { label: 'Comms & reporting',      sub: 'Cadence & channels'              },
  { label: 'Risk & compliance',      sub: 'Data, security & flags'          },
  { label: 'Verification & sign-off',sub: 'Confirm readiness & go live'     },
];

const SEVERITY_ROWS = [
  { sev: 'P1 — Critical',          def: 'Production system down / data loss risk',         eg: 'App unavailable, login broken, data corruption',          response: '30 mins',      resolution: '4 hours',           path: 'MS L1 → MS Lead → Original Dev Team', color: '#fef2f2', border: '#fca5a5' },
  { sev: 'P2 — High',              def: 'Major feature broken, no workaround',             eg: 'Key module error, integration failure',                   response: '2 hours',      resolution: '1 business day',    path: 'MS L1 → MS Lead → MS L2',             color: '#fff7ed', border: '#fdba74' },
  { sev: 'P3 — Medium',            def: 'Feature degraded, workaround exists',             eg: 'Report error, slow performance, UI bug',                  response: '4 hours',      resolution: '3 business days',   path: 'MS L1 → MS L2',                        color: '#fefce8', border: '#fde047' },
  { sev: 'P4 — Low',               def: 'Minor issue, cosmetic or question',               eg: 'Label mismatch, how-to query, enhancement idea',          response: '1 business day', resolution: 'Next sprint',     path: 'MS L1',                                color: '#f0fdf4', border: '#86efac' },
  { sev: 'Enhancement — Minor',    def: 'Small config / low-effort change (<4 hrs)',       eg: 'Field rename, email tweak, view change',                  response: 'Scoped in 2 days', resolution: 'Agreed sprint',  path: 'MS L2 (MS team owns)',                 color: '#eff6ff', border: '#93c5fd' },
  { sev: 'Enhancement — Major',    def: 'New feature, data model change, integration',     eg: 'New entity, third-party connector, workflow redesign',    response: 'Scoped & estimated', resolution: 'Separate SOW', path: 'MS Lead → Original Dev Team involved', color: '#f5f3ff', border: '#c4b5fd' },
];

const ACCESS_SYSTEMS = [
  'Azure Portal',
  'Azure DevOps / Repo',
  'Dynamics 365 / D365',
  'Power Platform Admin',
  'Monitoring tool',
  'Jira / task tool',
  'SharePoint / docs',
  'Production DB (if any)',
];

// ─── Helpers ──────────────────────────────────────────────────

const toggle = (arr, val) =>
  arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

// ─── Default state ────────────────────────────────────────────

const DEFAULT_FORM = {
  // Step 1
  projectName:       '',
  clientName:        '',
  ktSource:          'dm_project',
  projectStatus:     '',
  msScope:           [],
  supportLevels:     [],
  monthlyBudget:     '',
  slas:              '',
  warrantyStart:     '',

  // Step 2
  accessItems: ACCESS_SYSTEMS.map(name => ({
    name,
    url:       '',
    accessType: '',
    sharedVia: '',
    confirmed: false,
  })),
  codeRepoUrl:  '',
  repoNotes:    '',

  // Step 3
  techStack:         [],
  otherTech:         '',
  archDiagram:       false,
  integrationsDocs:  false,
  deploymentExplained: false,
  serverDbDetails:   '',
  techNotes:         '',

  // Step 4
  docItems: [
    { label: 'Project documentation (SharePoint / Confluence / Drive)', done: false, link: '' },
    { label: 'Functional specifications / BRD',                         done: false, link: '' },
    { label: 'Technical design documents (TDD / SDD)',                  done: false, link: '' },
    { label: 'API documentation',                                       done: false, link: '' },
    { label: 'Process flowcharts / ERDs / data models',                 done: false, link: '' },
    { label: 'Runbook / SOPs for routine tasks',                        done: false, link: '' },
  ],

  // Step 5
  knownBugs:      '',
  openCRs:        '',
  outOfScopeItems:'',
  recurringIssues:'',

  // Step 6
  taskTool:       'Azure DevOps',
  ticketProcess:  '',
  monitoringTool: '',
  backupProcess:  false,
  standupSchedule:'',
  opsNotes:       '',

  // Step 7
  msTeamLead:     '',
  msEng1:         '',
  msEng2:         '',
  clientPrimary:  '',
  clientTech:     '',
  origDevLead:    '',
  origDev:        '',
  slaCustomised:  false,
  escalationNotes:'',

  // Step 8
  teamsGroup:     '',
  slackGroup:     '',
  emailGroup:     '',
  meetingCadence: [],
  reportingFreq:  'Weekly',
  incidentTemplate: false,
  commsNotes:     '',

  // Step 9
  compliance:     [],
  dataSensitivity:'',
  securityPolicies: false,
  clientSensitivities: '',
  riskFlags:      [],

  // Step 10
  msLoggedIn:       false,
  testTicketDone:   false,
  handoverSigned:   false,
  parallelRunStart: '',
  reviewMeetingDate:'',
  goLiveDate:       '',
  dmSignOff:        '',
  clientSignOff:    '',
  finalNotes:       '',
  confirmed:        false,
};

// ─── Shared UI primitives ─────────────────────────────────────

const s = {
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 14 },
  cardHead: { fontSize: 11, fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 },
  dot: { width: 5, height: 5, borderRadius: '50%', background: '#0891b2', flexShrink: 0 },
  input: { width: '100%', padding: '9px 12px', fontSize: 13, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', color: '#1e293b', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  textarea: { width: '100%', padding: '9px 12px', fontSize: 13, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', color: '#1e293b', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', minHeight: 80, lineHeight: 1.5 },
  select: { width: '100%', padding: '9px 12px', fontSize: 13, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', color: '#1e293b', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  label: { display: 'block', fontSize: 13, fontWeight: 500, color: '#64748b', marginBottom: 5 },
  field: { marginBottom: 14 },
  two: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  three: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
  infoBox: { background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 8, padding: '10px 13px', marginBottom: 13, fontSize: 12, color: '#0e7490', display: 'flex', gap: 8, lineHeight: 1.5 },
  warnBox: { background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: '10px 13px', marginBottom: 13, fontSize: 12, color: '#c2410c', display: 'flex', gap: 8, lineHeight: 1.5 },
  eyebrow: { fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#0891b2', fontWeight: 500, marginBottom: 5 },
  h2: { fontSize: 22, fontWeight: 500, color: '#0f172a', marginBottom: 6 },
  sub: { fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 22 },
  btnPrimary: { padding: '9px 22px', borderRadius: 8, border: 'none', background: '#0e7490', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' },
  btnBack: { padding: '9px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' },
  req: { color: '#dc2626', marginLeft: 2 },
};

function Card({ title, accent, children }) {
  return (
    <div style={s.card}>
      {title && <div style={s.cardHead}><div style={{ ...s.dot, background: accent || '#0891b2' }} />{title}</div>}
      {children}
    </div>
  );
}

function Field({ label, req, children, hint }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}{req && <span style={s.req}>*</span>}{hint && <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 5 }}>{hint}</span>}</label>
      {children}
    </div>
  );
}

function CheckItem({ label, checked, onChange, small }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: small ? '4px 9px' : '6px 11px', borderRadius: 8, border: `1px solid ${checked ? '#0891b2' : '#e2e8f0'}`, background: checked ? '#ecfeff' : '#f8fafc', cursor: 'pointer', fontSize: small ? 11 : 12, userSelect: 'none', color: checked ? '#0e7490' : '#374151' }} onClick={() => onChange(!checked)}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} onClick={e => e.stopPropagation()} style={{ accentColor: '#0891b2', width: 12, height: 12 }} />
      {label}
    </label>
  );
}

function RadioItem({ label, checked, onChange }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 8, border: `1px solid ${checked ? '#0891b2' : '#e2e8f0'}`, background: checked ? '#ecfeff' : '#f8fafc', cursor: 'pointer', fontSize: 12, userSelect: 'none', color: checked ? '#0e7490' : '#374151' }} onClick={onChange}>
      <input type="radio" checked={checked} onChange={() => {}} onClick={e => e.stopPropagation()} style={{ accentColor: '#0891b2', width: 12, height: 12 }} />
      {label}
    </label>
  );
}

function StatusPill({ value, onChange }) {
  const opts = [
    { v: 'Open',  bg: '#fefce8', border: '#fde047', color: '#713f12' },
    { v: 'Done',  bg: '#f0fdf4', border: '#86efac', color: '#14532d' },
    { v: 'N/A',   bg: '#f8fafc', border: '#cbd5e1', color: '#475569' },
  ];
  const cur = opts.find(o => o.v === value) || opts[0];
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {opts.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)} style={{ padding: '3px 9px', borderRadius: 20, border: `1px solid ${value === o.v ? o.border : '#e2e8f0'}`, background: value === o.v ? o.bg : '#fff', color: value === o.v ? o.color : '#94a3b8', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{o.v}</button>
      ))}
    </div>
  );
}

function ChecklistRow({ item, index, onUpdate }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200, fontSize: 13, color: '#374151' }}>{item.label}</div>
      <StatusPill value={item.status || 'Open'} onChange={v => onUpdate(index, 'status', v)} />
      <input style={{ ...s.input, width: 180, flexShrink: 0 }} type="text" value={item.link || ''} onChange={e => onUpdate(index, 'link', e.target.value)} placeholder="Doc link / evidence" />
    </div>
  );
}

function ProgressBar({ step }) {
  const pct = Math.round((step - 1) / (TOTAL_STEPS - 1) * 100);
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginBottom: 5 }}>
        <span>KT completion</span><span>{pct}%</span>
      </div>
      <div style={{ height: 3, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg,#0891b2,#06b6d4)', borderRadius: 2, transition: 'width .4s ease' }} />
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────

function Sidebar({ step, form }) {
  const groups = [
    { label: 'Handover prep',  steps: [1, 2, 3, 4, 5] },
    { label: 'Operations',     steps: [6, 7, 8]        },
    { label: 'Sign-off',       steps: [9, 10]          },
  ];
  return (
    <aside style={{ background: '#fff', borderRight: '1px solid #e2e8f0', padding: '20px 14px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', minWidth: 220 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>M</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>Monk Radar</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>MS Transition</div>
        </div>
      </div>

      {form.projectName && (
        <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 8, padding: '7px 10px', marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Project</div>
          <strong style={{ fontSize: 12, color: '#0e7490' }}>{form.projectName}</strong>
        </div>
      )}

      {groups.map(g => (
        <div key={g.label} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6, paddingLeft: 10 }}>{g.label}</div>
          {g.steps.map(i => {
            const m = STEP_META[i - 1];
            const isActive = i === step;
            const isDone   = i < step;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '8px 10px', borderRadius: 8, marginBottom: 2, background: isActive ? '#ecfeff' : isDone ? '#f8fafc' : 'transparent', opacity: i > step ? 0.35 : 1 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, border: `1px solid ${isActive ? '#0891b2' : isDone ? '#22c55e' : '#e2e8f0'}`, background: isDone ? '#f0fdf4' : isActive ? '#ecfeff' : 'transparent', color: isActive ? '#0891b2' : isDone ? '#16a34a' : '#94a3b8' }}>
                  {isDone ? '✓' : i}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: isActive ? '#0891b2' : '#374151' }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{m.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '10px 0' }} />
      <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.7, padding: '0 10px' }}>
        ✦ Original team fills steps 1–5<br />
        ✦ MS team confirms steps 6–9<br />
        ✦ Both sign off on step 10
      </div>
    </aside>
  );
}

// ─── Step 1: Project overview & SLAs ─────────────────────────

function Step1({ form, setForm }) {
  const platforms = ['D365 CRM', 'D365 F&O', 'Power Platform', 'Azure Services', 'M365 / SharePoint', 'Power BI'];
  return (
    <>
      <Card title="Project details">
        <div style={s.two}>
          <Field label="Project name" req><input style={s.input} type="text" value={form.projectName} onChange={e => setForm(f => ({ ...f, projectName: e.target.value }))} placeholder="e.g. Contoso D365 CRM" /></Field>
          <Field label="Client / organisation"><input style={s.input} type="text" value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} placeholder="e.g. Contoso Ltd." /></Field>
        </div>
        <div style={s.two}>
          <Field label="Handover source">
            <select style={s.select} value={form.ktSource} onChange={e => setForm(f => ({ ...f, ktSource: e.target.value }))}>
              <option value="dm_project">From a DM implementation project</option>
              <option value="internal_ip">Internal IP / team handover</option>
              <option value="external">Handover from another vendor</option>
              <option value="greenfield">Greenfield — no prior team</option>
            </select>
          </Field>
          <Field label="Current project status">
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {['In progress', 'Go-Live complete', 'Stabilised', 'On hold'].map(v => (
                <RadioItem key={v} label={v} checked={form.projectStatus === v} onChange={() => setForm(f => ({ ...f, projectStatus: v }))} />
              ))}
            </div>
          </Field>
        </div>
      </Card>

      <Card title="Managed Services scope">
        <Field label="Platforms under management">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {platforms.map(p => <CheckItem key={p} label={p} checked={form.msScope.includes(p)} onChange={() => setForm(f => ({ ...f, msScope: toggle(f.msScope, p) }))} />)}
          </div>
        </Field>
        <Field label="Support levels covered">
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['L1 Helpdesk', 'L2 Technical', 'L3 Deep dev'].map(l => <CheckItem key={l} label={l} checked={form.supportLevels.includes(l)} onChange={() => setForm(f => ({ ...f, supportLevels: toggle(f.supportLevels, l) }))} />)}
          </div>
        </Field>
        <div style={s.two}>
          <Field label="Monthly hours / ticket budget"><input style={s.input} type="text" value={form.monthlyBudget} onChange={e => setForm(f => ({ ...f, monthlyBudget: e.target.value }))} placeholder="e.g. 40 hrs/month or 50 tickets/month" /></Field>
          <Field label="Warranty / parallel-run start date"><input style={s.input} type="date" value={form.warrantyStart} onChange={e => setForm(f => ({ ...f, warrantyStart: e.target.value }))} /></Field>
        </div>
      </Card>

      <Card title="SLAs from agreement" accent="#dc2626">
        <div style={s.infoBox}><span>📋</span><span>Copy SLAs from the signed contract. These will populate the escalation matrix in Step 7.</span></div>
        {SEVERITY_ROWS.map(row => (
          <div key={row.sev} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 10px', borderRadius: 8, marginBottom: 6, background: row.color, border: `1px solid ${row.border}` }}>
            <div style={{ minWidth: 160, fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{row.sev}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <input style={{ ...s.input, fontSize: 12, padding: '5px 8px' }} type="text" defaultValue={row.response} placeholder="First response" />
                <input style={{ ...s.input, fontSize: 12, padding: '5px 8px' }} type="text" defaultValue={row.resolution} placeholder="Resolution target" />
              </div>
            </div>
          </div>
        ))}
        <Field label="Additional SLA notes or exceptions">
          <textarea style={s.textarea} rows={2} value={form.slas} onChange={e => setForm(f => ({ ...f, slas: e.target.value }))} placeholder="Any special clauses, exclusions, or penalty terms from the agreement..." />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 2: Access & environments ───────────────────────────

function Step2({ form, setForm }) {
  const updateAccess = useCallback((i, key, val) => {
    setForm(f => {
      const items = [...f.accessItems];
      items[i] = { ...items[i], [key]: val };
      return { ...f, accessItems: items };
    });
  }, [setForm]);

  const allConfirmed = form.accessItems.every(a => a.confirmed);

  return (
    <>
      <div style={s.warnBox}><span>⚠️</span><span>Credentials must be shared via a secure vault (e.g. 1Password, Azure Key Vault). Never paste passwords into this form.</span></div>
      <Card title="System access log">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 80px', gap: 8, padding: '0 0 8px', borderBottom: '1px solid #f1f5f9', marginBottom: 6 }}>
          {['System / tool', 'URL / location', 'Access type', 'Shared via', 'Confirmed'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</div>
          ))}
        </div>
        {form.accessItems.map((item, i) => (
          <div key={item.name} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 80px', gap: 8, padding: '6px 0', borderBottom: '1px solid #f8fafc', alignItems: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{item.name}</div>
            <input style={{ ...s.input, padding: '5px 8px', fontSize: 12 }} type="text" value={item.url} onChange={e => updateAccess(i, 'url', e.target.value)} placeholder="https://..." />
            <input style={{ ...s.input, padding: '5px 8px', fontSize: 12 }} type="text" value={item.accessType} onChange={e => updateAccess(i, 'accessType', e.target.value)} placeholder="e.g. Admin" />
            <input style={{ ...s.input, padding: '5px 8px', fontSize: 12 }} type="text" value={item.sharedVia} onChange={e => updateAccess(i, 'sharedVia', e.target.value)} placeholder="Vault / PAM" />
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', fontSize: 12, color: item.confirmed ? '#0e7490' : '#94a3b8', fontWeight: 500 }}>
              <input type="checkbox" checked={item.confirmed} onChange={e => updateAccess(i, 'confirmed', e.target.checked)} style={{ accentColor: '#0891b2' }} />
              {item.confirmed ? 'Done' : 'Pending'}
            </label>
          </div>
        ))}
        <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: allConfirmed ? '#f0fdf4' : '#fff7ed', border: `1px solid ${allConfirmed ? '#86efac' : '#fed7aa'}`, fontSize: 12, fontWeight: 500, color: allConfirmed ? '#14532d' : '#92400e' }}>
          {allConfirmed ? '✓ All system access confirmed' : `${form.accessItems.filter(a => a.confirmed).length} / ${form.accessItems.length} systems confirmed`}
        </div>
      </Card>

      <Card title="Code repository">
        <div style={s.two}>
          <Field label="Repository URL"><input style={s.input} type="text" value={form.codeRepoUrl} onChange={e => setForm(f => ({ ...f, codeRepoUrl: e.target.value }))} placeholder="https://dev.azure.com/org/project/_git/repo" /></Field>
          <Field label="Branch strategy / notes"><input style={s.input} type="text" value={form.repoNotes} onChange={e => setForm(f => ({ ...f, repoNotes: e.target.value }))} placeholder="e.g. main = production, dev = development" /></Field>
        </div>
      </Card>
    </>
  );
}

// ─── Step 3: Architecture & stack ────────────────────────────

function Step3({ form, setForm }) {
  const techOptions = ['Dynamics 365 (model-driven)', 'Power Apps (canvas)', 'Power Automate', 'Power BI', 'Power Pages', 'Azure Functions', 'Azure Logic Apps', 'Azure Service Bus', 'Azure SQL', 'Dataverse', 'SharePoint', 'React', 'C# / .NET', 'Node.js', 'REST APIs', 'Webhooks'];
  return (
    <>
      <Card title="Technology stack">
        <Field label="Technologies used">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {techOptions.map(t => <CheckItem key={t} label={t} checked={form.techStack.includes(t)} onChange={() => setForm(f => ({ ...f, techStack: toggle(f.techStack, t) }))} />)}
          </div>
        </Field>
        <Field label="Other / custom technologies"><input style={s.input} type="text" value={form.otherTech} onChange={e => setForm(f => ({ ...f, otherTech: e.target.value }))} placeholder="List any not covered above" /></Field>
      </Card>

      <Card title="Architecture sign-offs">
        {[
          ['archDiagram',          'Architecture diagram shared and reviewed by MS team'],
          ['integrationsDocs',     'All integration points documented (APIs, webhooks, data flows)'],
          ['deploymentExplained',  'Deployment pipeline explained end-to-end'],
        ].map(([key, label]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid #f8fafc' }}>
            <input type="checkbox" checked={!!form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))} style={{ accentColor: '#0891b2', width: 14, height: 14, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#374151' }}>{label}</span>
          </div>
        ))}
      </Card>

      <Card title="Infrastructure details">
        <Field label="Server / database details (hosting region, DB type, version)">
          <textarea style={s.textarea} rows={3} value={form.serverDbDetails} onChange={e => setForm(f => ({ ...f, serverDbDetails: e.target.value }))} placeholder="e.g. Azure SQL Managed Instance — UK South — SQL Server 2022 | Dataverse — default environment" />
        </Field>
        <Field label="Additional technical notes">
          <textarea style={s.textarea} rows={3} value={form.techNotes} onChange={e => setForm(f => ({ ...f, techNotes: e.target.value }))} placeholder="On-prem AD sync, custom Azure infra, legacy system constraints, security policies..." />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 4: Documentation ────────────────────────────────────

function Step4({ form, setForm }) {
  const updateDoc = (i, key, val) => {
    setForm(f => {
      const items = [...f.docItems];
      items[i] = { ...items[i], [key]: val };
      return { ...f, docItems: items };
    });
  };
  const done = form.docItems.filter(d => d.status === 'Done').length;

  return (
    <>
      <div style={s.infoBox}><span>📂</span><span>Mark each item Done once the document is shared and accessible to the MS team. Add a link wherever possible.</span></div>
      <Card title="Document checklist">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 200px', gap: 8, padding: '0 0 8px', borderBottom: '1px solid #f1f5f9', marginBottom: 4 }}>
          {['Document', 'Status', 'Link / location'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</div>
          ))}
        </div>
        {form.docItems.map((item, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 200px', gap: 8, padding: '8px 0', borderBottom: '1px solid #f8fafc', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#374151' }}>{item.label}</span>
            <StatusPill value={item.status || 'Open'} onChange={v => updateDoc(i, 'status', v)} />
            <input style={{ ...s.input, padding: '5px 8px', fontSize: 12 }} type="text" value={item.link || ''} onChange={e => updateDoc(i, 'link', e.target.value)} placeholder="Link or N/A" />
          </div>
        ))}
        <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: done === form.docItems.length ? '#f0fdf4' : '#fefce8', border: `1px solid ${done === form.docItems.length ? '#86efac' : '#fde047'}`, fontSize: 12, fontWeight: 500, color: done === form.docItems.length ? '#14532d' : '#713f12' }}>
          {done} / {form.docItems.length} documents confirmed
        </div>
      </Card>
    </>
  );
}

// ─── Step 5: Issues & backlog ─────────────────────────────────

function Step5({ form, setForm }) {
  return (
    <>
      <Card title="Known bugs">
        <Field label="List all known bugs (include severity & workaround if any)">
          <textarea style={s.textarea} rows={5} value={form.knownBugs} onChange={e => setForm(f => ({ ...f, knownBugs: e.target.value }))} placeholder={"Bug 1: [Description] | Severity: P3 | Workaround: [steps]\nBug 2: ..."} />
        </Field>
      </Card>
      <Card title="Change requests & backlog">
        <Field label="Outstanding change requests">
          <textarea style={s.textarea} rows={3} value={form.openCRs} onChange={e => setForm(f => ({ ...f, openCRs: e.target.value }))} placeholder="List open CRs with status and expected timeline..." />
        </Field>
        <Field label="Items explicitly OUT of MS team scope" hint="(critical — document clearly)">
          <textarea style={s.textarea} rows={3} value={form.outOfScopeItems} onChange={e => setForm(f => ({ ...f, outOfScopeItems: e.target.value }))} placeholder="e.g. New module builds, major data model changes, third-party negotiations..." />
        </Field>
      </Card>
      <Card title="Recurring issues">
        <Field label="Known recurring issues with documented troubleshooting steps">
          <textarea style={s.textarea} rows={4} value={form.recurringIssues} onChange={e => setForm(f => ({ ...f, recurringIssues: e.target.value }))} placeholder={"Issue: [Description]\nFrequency: [e.g. weekly]\nTroubleshooting steps: [steps]\nRoot cause: [if known]\n..."} />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 6: Daily operations ─────────────────────────────────

function Step6({ form, setForm }) {
  return (
    <>
      <Card title="Task management">
        <div style={s.two}>
          <Field label="Task management tool">
            <select style={s.select} value={form.taskTool} onChange={e => setForm(f => ({ ...f, taskTool: e.target.value }))}>
              {['Azure DevOps', 'Jira', 'Microsoft Planner', 'MS Project', 'Other / TBD'].map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Ticket intake process (how client raises issues)">
            <input style={s.input} type="text" value={form.ticketProcess} onChange={e => setForm(f => ({ ...f, ticketProcess: e.target.value }))} placeholder="e.g. Email to support@dm.com, Teams channel, ServiceNow" />
          </Field>
        </div>
        <div style={s.two}>
          <Field label="Monitoring & alerting tool">
            <input style={s.input} type="text" value={form.monitoringTool} onChange={e => setForm(f => ({ ...f, monitoringTool: e.target.value }))} placeholder="e.g. Azure Monitor, Application Insights, Datadog" />
          </Field>
          <Field label="Daily / weekly stand-up schedule">
            <input style={s.input} type="text" value={form.standupSchedule} onChange={e => setForm(f => ({ ...f, standupSchedule: e.target.value }))} placeholder="e.g. Daily 9:30 AM BST on Teams" />
          </Field>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0' }}>
          <input type="checkbox" checked={form.backupProcess} onChange={e => setForm(f => ({ ...f, backupProcess: e.target.checked }))} style={{ accentColor: '#0891b2', width: 14, height: 14 }} />
          <label style={{ fontSize: 13, color: '#374151' }}>Backup and recovery process has been documented and handed over</label>
        </div>
      </Card>
      <Card title="Operational walkthrough notes">
        <Field label="Notes from operations walkthrough session">
          <textarea style={s.textarea} rows={4} value={form.opsNotes} onChange={e => setForm(f => ({ ...f, opsNotes: e.target.value }))} placeholder="Anything specific the MS team needs to know about day-to-day operations..." />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 7: Team & escalation ────────────────────────────────

function Step7({ form, setForm }) {
  const contactFields = [
    ['msTeamLead',    'MS Team Lead',                    'Business hours',               'L2 / Escalation'],
    ['msEng1',        'MS Support Engineer 1',           'Business hours',               'L1'],
    ['msEng2',        'MS Support Engineer 2',           'Business hours',               'L1'],
    ['clientPrimary', 'Client — Primary Contact',        '',                             'Decision maker'],
    ['clientTech',    'Client — Technical Contact',      '',                             'Technical queries'],
    ['origDevLead',   'Original Dev Lead',               'P1 & Major Enhancements only', 'L3'],
    ['origDev',       'Original Developer',              'P1 & Major Enhancements only', 'L3'],
  ];

  return (
    <>
      <Card title="Team contacts">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1.2fr 140px', gap: 8, padding: '0 0 8px', borderBottom: '1px solid #f1f5f9', marginBottom: 6 }}>
          {['Role', 'Name + email', 'Availability', 'Level'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</div>
          ))}
        </div>
        {contactFields.map(([key, role, avail, level]) => (
          <div key={key} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1.2fr 140px', gap: 8, padding: '6px 0', borderBottom: '1px solid #f8fafc', alignItems: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{role}</div>
            <input style={{ ...s.input, padding: '5px 8px', fontSize: 12 }} type="text" value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder="Name + email / Teams" />
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{avail}</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: level.includes('L3') ? '#dc2626' : level.includes('L2') ? '#d97706' : level.includes('L1') ? '#0891b2' : '#64748b' }}>{level}</div>
          </div>
        ))}
      </Card>

      <Card title="Escalation matrix" accent="#dc2626">
        <div style={s.warnBox}><span>🔴</span><span>The original dev team is engaged <strong>only for P1 Critical</strong> and <strong>approved Major Enhancements</strong>. All other issues are handled by the MS team.</span></div>
        {SEVERITY_ROWS.map(row => (
          <div key={row.sev} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 12px', borderRadius: 8, marginBottom: 8, background: row.color, border: `1px solid ${row.border}` }}>
            <div style={{ minWidth: 160, flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{row.sev}</div>
              <div style={{ fontSize: 10, color: '#64748b' }}>{row.def}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 2 }}><strong>e.g.</strong> {row.eg}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>Response: <strong>{row.response}</strong></span>
                <span style={{ fontSize: 11, color: '#64748b' }}>Resolution: <strong>{row.resolution}</strong></span>
                <span style={{ fontSize: 11, color: '#1e40af', fontWeight: 500 }}>→ {row.path}</span>
              </div>
            </div>
          </div>
        ))}
        <Field label="Escalation customisations or additional notes">
          <textarea style={s.textarea} rows={2} value={form.escalationNotes} onChange={e => setForm(f => ({ ...f, escalationNotes: e.target.value }))} placeholder="Any client-specific SLA adjustments or escalation overrides..." />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 8: Comms & reporting ────────────────────────────────

function Step8({ form, setForm }) {
  const cadenceOptions = ['Daily Scrum', 'Weekly Status Review', 'Steering Committee (monthly)', 'Sprint Review', 'Monthly Executive Report'];
  return (
    <>
      <Card title="Communication channels">
        <div style={s.three}>
          <Field label="Microsoft Teams group"><input style={s.input} type="text" value={form.teamsGroup} onChange={e => setForm(f => ({ ...f, teamsGroup: e.target.value }))} placeholder="Team / channel link or name" /></Field>
          <Field label="Slack group (if used)"><input style={s.input} type="text" value={form.slackGroup} onChange={e => setForm(f => ({ ...f, slackGroup: e.target.value }))} placeholder="#channel name or N/A" /></Field>
          <Field label="Email distribution list"><input style={s.input} type="text" value={form.emailGroup} onChange={e => setForm(f => ({ ...f, emailGroup: e.target.value }))} placeholder="support@client.com / DL name" /></Field>
        </div>
      </Card>
      <Card title="Meeting cadence & reporting">
        <Field label="Recurring meetings agreed">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {cadenceOptions.map(m => <CheckItem key={m} label={m} checked={form.meetingCadence.includes(m)} onChange={() => setForm(f => ({ ...f, meetingCadence: toggle(f.meetingCadence, m) }))} />)}
          </div>
        </Field>
        <div style={s.two}>
          <Field label="Status report frequency">
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {['Weekly', 'Bi-weekly', 'Monthly', 'TBD'].map(v => <RadioItem key={v} label={v} checked={form.reportingFreq === v} onChange={() => setForm(f => ({ ...f, reportingFreq: v }))} />)}
            </div>
          </Field>
          <Field label="Incident communication template shared">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <input type="checkbox" checked={form.incidentTemplate} onChange={e => setForm(f => ({ ...f, incidentTemplate: e.target.checked }))} style={{ accentColor: '#0891b2', width: 14, height: 14 }} />
              <label style={{ fontSize: 13, color: '#374151' }}>Template confirmed and shared</label>
            </div>
          </Field>
        </div>
        <Field label="Additional comms notes">
          <textarea style={s.textarea} rows={2} value={form.commsNotes} onChange={e => setForm(f => ({ ...f, commsNotes: e.target.value }))} placeholder="Who speaks to client for what, any communication boundaries or protocols..." />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 9: Risk & compliance ────────────────────────────────

function Step9({ form, setForm }) {
  const complianceOpts = ['GDPR', 'HIPAA', 'ISO 27001', 'SOC 2', 'Cyber Essentials', 'NHS DSP Toolkit', 'FCA / Financial', 'None'];
  const riskFlags = ['Client has unrealistic SLA expectations', 'Key client contact unavailable for KT', 'Technical debt in codebase', 'Undocumented customisations', 'Stale / missing documentation', 'Complex third-party dependencies', 'Data sensitivity concerns', 'Resource gap on MS team side'];
  return (
    <>
      <Card title="Compliance requirements">
        <Field label="Applicable standards">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {complianceOpts.map(c => <CheckItem key={c} label={c} checked={form.compliance.includes(c)} onChange={() => setForm(f => ({ ...f, compliance: toggle(f.compliance, c) }))} />)}
          </div>
        </Field>
        <div style={s.two}>
          <Field label="Data sensitivity level">
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {['Public', 'Internal', 'Confidential', 'Highly confidential'].map(v => <RadioItem key={v} label={v} checked={form.dataSensitivity === v} onChange={() => setForm(f => ({ ...f, dataSensitivity: v }))} />)}
            </div>
          </Field>
          <Field label="Security policies documented & shared">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <input type="checkbox" checked={form.securityPolicies} onChange={e => setForm(f => ({ ...f, securityPolicies: e.target.checked }))} style={{ accentColor: '#0891b2', width: 14, height: 14 }} />
              <label style={{ fontSize: 13, color: '#374151' }}>Confirmed</label>
            </div>
          </Field>
        </div>
      </Card>
      <Card title="Risk flags">
        <Field label="Flag known risks for the MS team">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {riskFlags.map(r => <CheckItem key={r} label={r} checked={form.riskFlags.includes(r)} onChange={() => setForm(f => ({ ...f, riskFlags: toggle(f.riskFlags, r) }))} />)}
          </div>
        </Field>
        <Field label="Client sensitivities or special considerations">
          <textarea style={s.textarea} rows={3} value={form.clientSensitivities} onChange={e => setForm(f => ({ ...f, clientSensitivities: e.target.value }))} placeholder="e.g. Client is going through restructure, key stakeholder is risk-averse, NDAs in place..." />
        </Field>
      </Card>
    </>
  );
}

// ─── Step 10: Verification & sign-off ────────────────────────

function Step10({ form, setForm, onSubmit }) {
  const checks = [
    ['msLoggedIn',     'MS team has successfully logged into all environments'],
    ['testTicketDone', 'MS team has resolved at least one test ticket end-to-end'],
    ['handoverSigned', 'Handover document reviewed and ready for sign-off'],
  ];
  const allChecked = checks.every(([key]) => !!form[key]);

  return (
    <>
      <div style={s.infoBox}><span>✅</span><span>Complete the verification checklist, set the go-live date, and collect sign-offs from both sides before submitting.</span></div>

      <Card title="Verification checklist">
        {checks.map(([key, label]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
            <input type="checkbox" checked={!!form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))} style={{ accentColor: '#0891b2', width: 16, height: 16, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#374151' }}>{label}</span>
          </div>
        ))}
      </Card>

      <Card title="Key dates">
        <div style={s.three}>
          <Field label="Parallel-run start date"><input style={s.input} type="date" value={form.parallelRunStart} onChange={e => setForm(f => ({ ...f, parallelRunStart: e.target.value }))} /></Field>
          <Field label="MS Go-Live date"><input style={s.input} type="date" value={form.goLiveDate} onChange={e => setForm(f => ({ ...f, goLiveDate: e.target.value }))} /></Field>
          <Field label="2-week review meeting date"><input style={s.input} type="date" value={form.reviewMeetingDate} onChange={e => setForm(f => ({ ...f, reviewMeetingDate: e.target.value }))} /></Field>
        </div>
      </Card>

      <Card title="Sign-off" accent="#16a34a">
        <div style={s.two}>
          <Field label="DM Delivery Lead sign-off"><input style={s.input} type="text" value={form.dmSignOff} onChange={e => setForm(f => ({ ...f, dmSignOff: e.target.value }))} placeholder="Name + date" /></Field>
          <Field label="Client authorised sign-off"><input style={s.input} type="text" value={form.clientSignOff} onChange={e => setForm(f => ({ ...f, clientSignOff: e.target.value }))} placeholder="Name + date" /></Field>
        </div>
        <Field label="Final notes for MS team">
          <textarea style={s.textarea} rows={3} value={form.finalNotes} onChange={e => setForm(f => ({ ...f, finalNotes: e.target.value }))} placeholder="Last-minute context, gotchas, or anything the MS team should keep top of mind in week 1..." />
        </Field>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#1e293b', marginTop: 6 }} onClick={() => setForm(f => ({ ...f, confirmed: !f.confirmed }))}>
          <input type="checkbox" checked={!!form.confirmed} onChange={() => {}} onClick={e => e.stopPropagation()} style={{ accentColor: '#0891b2', width: 14, height: 14 }} />
          All information is accurate. Both parties are ready to proceed with the managed services handover.
        </label>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <div />
        <button onClick={onSubmit} style={{ ...s.btnPrimary, background: '#16a34a', padding: '10px 28px', fontSize: 14 }}>
          ✓ Complete handover & go live
        </button>
      </div>
    </>
  );
}

// ─── Success screen ───────────────────────────────────────────

function Success({ form, onReset }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f0fdf4', border: '1px solid #86efac', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✓</div>
      <h3 style={{ fontSize: 22, fontWeight: 500, color: '#0f172a', marginBottom: 8 }}>Handover complete</h3>
      <p style={{ color: '#64748b', fontSize: 14, maxWidth: 420, margin: '0 auto 24px', lineHeight: 1.7 }}>
        "{form.projectName || 'Project'}" has been successfully transitioned to Managed Services. The MS team lead and client have been notified. A 2-week check-in is scheduled.
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onReset} style={{ ...s.btnPrimary, background: '#16a34a', borderRadius: 20, fontSize: 12, padding: '7px 16px' }}>+ New transition</button>
        {['📋 Export KT report', '📤 Push to DevOps', '📧 Notify stakeholders', '📊 Open MS dashboard'].map(lbl => (
          <button key={lbl} style={{ padding: '7px 14px', borderRadius: 20, border: '1px solid #e2e8f0', background: '#fff', color: '#1e293b', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{lbl}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────

/**
 * @param {{ onSubmit?: (data: object) => void, initialValues?: object }} props
 */
export default function ManagedServicesTransition({ onSubmit, initialValues = {} }) {
  const [step,      setStep]      = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form,      setForm]      = useState({ ...DEFAULT_FORM, ...initialValues });

  const next  = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const back  = () => setStep(s => Math.max(s - 1, 1));
  const reset = () => { setStep(1); setSubmitted(false); setForm({ ...DEFAULT_FORM }); };

  const handleSubmit = () => {
    if (!form.confirmed) { alert('Please confirm both parties are ready before completing the handover.'); return; }
    setSubmitted(true);
    onSubmit?.(form);
  };

  const stepComponents = {
    1:  <Step1  form={form} setForm={setForm} />,
    2:  <Step2  form={form} setForm={setForm} />,
    3:  <Step3  form={form} setForm={setForm} />,
    4:  <Step4  form={form} setForm={setForm} />,
    5:  <Step5  form={form} setForm={setForm} />,
    6:  <Step6  form={form} setForm={setForm} />,
    7:  <Step7  form={form} setForm={setForm} />,
    8:  <Step8  form={form} setForm={setForm} />,
    9:  <Step9  form={form} setForm={setForm} />,
    10: <Step10 form={form} setForm={setForm} onSubmit={handleSubmit} />,
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc' }}>
      <Sidebar step={step} form={form} />
      <main style={{ padding: '28px 36px 60px', maxWidth: 820 }}>
        {submitted ? (
          <Success form={form} onReset={reset} />
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={s.eyebrow}>Step {step} of {TOTAL_STEPS} — {STEP_META[step - 1].label}</div>
              <h2 style={s.h2}>{STEP_META[step - 1].sub}</h2>
            </div>

            <ProgressBar step={step} />

            {stepComponents[step]}

            {step < TOTAL_STEPS && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                {step > 1
                  ? <button onClick={back} style={s.btnBack}>← Back</button>
                  : <div />
                }
                <button onClick={next} style={s.btnPrimary}>
                  {step === TOTAL_STEPS - 1 ? 'Review & sign off' : 'Continue →'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
